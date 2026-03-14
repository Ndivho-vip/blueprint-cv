import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvFormSchema, type CVFormData } from "@/types/cv";
import { demoData } from "@/lib/demoData";
import { useCVContext } from "@/contexts/CVContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  HOBBY_SUGGESTIONS, SOFT_SKILL_SUGGESTIONS, HARD_SKILL_SUGGESTIONS,
  LANGUAGE_SUGGESTIONS, RESPONSIBILITY_SUGGESTIONS,
} from "@/lib/suggestions";
import {
  User, Briefcase, Mail, Phone, MapPin, Globe, GraduationCap,
  Plus, Trash2, Zap, Upload, ChevronDown, ChevronUp, Sparkles,
  IdCard, Heart, CalendarDays, Flag, Car, Users,
} from "lucide-react";

/** Clickable suggestion chip */
const Chip = ({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
      active
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-secondary/20 text-foreground border-border hover:bg-secondary/40"
    }`}
  >
    {active ? "✓ " : "+ "}{label}
  </button>
);

export default function IntakeForm() {
  const { setCvData } = useCVContext();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    personal: true, identity: false, summary: false, experience: false, education: false,
    skills: false, hobbies: false, languages: false, achievements: false, references: false,
  });
  const [showIdentity, setShowIdentity] = useState(false);

  const {
    register, handleSubmit, control, reset, watch, setValue, getValues, formState: { errors },
  } = useForm<CVFormData>({
    resolver: zodResolver(cvFormSchema),
    defaultValues: {
      name: "", title: "", tagline: "", phone: "", email: "", location: "", website: "",
      summary: "", technicalSkills: "",
      idNumber: "", gender: "", dateOfBirth: "", nationality: "", maritalStatus: "",
      driversLicense: "", ethnicity: "", showIdentity: false,
      hobbies: [],
      achievements: [], hardSkills: [{ label: "", level: 70 }],
      softSkills: [""], languages: [{ name: "", level: "" }],
      education: { degree: "", school: "", year: "", location: "", focus: "" },
      experience: [{ id: "1", title: "", org: "", period: "", location: "", bullets: [""], highlight: false }],
      references: [{ name: "", role: "", phone: "" }],
    },
  });

  const experienceFields = useFieldArray({ control, name: "experience" });
  const hardSkillFields = useFieldArray({ control, name: "hardSkills" });
  const achievementFields = useFieldArray({ control, name: "achievements" });
  const referenceFields = useFieldArray({ control, name: "references" });
  const languageFields = useFieldArray({ control, name: "languages" });

  const currentSoftSkills = watch("softSkills") || [];
  const currentHobbies = watch("hobbies") || [];

  const toggle = (key: string) =>
    setExpandedSections((p) => ({ ...p, [key]: !p[key] }));

  const toggleSoftSkill = (skill: string) => {
    const current = getValues("softSkills").filter(Boolean);
    if (current.includes(skill)) {
      setValue("softSkills", current.filter((s) => s !== skill));
    } else {
      setValue("softSkills", [...current, skill]);
    }
  };

  const toggleHobby = (hobby: string) => {
    const current = getValues("hobbies") || [];
    if (current.includes(hobby)) {
      setValue("hobbies", current.filter((h) => h !== hobby));
    } else {
      setValue("hobbies", [...current, hobby]);
    }
  };

  const addHardSkill = (label: string) => {
    const existing = getValues("hardSkills");
    if (!existing.find((s) => s.label === label)) {
      hardSkillFields.append({ label, level: 75 });
    }
  };

  const addLanguage = (name: string) => {
    const existing = getValues("languages");
    if (!existing.find((l) => l.name === name)) {
      languageFields.append({ name, level: "Conversational" });
    }
  };

  const onSubmit = (data: CVFormData) => {
    data.softSkills = data.softSkills.filter(Boolean);
    data.hobbies = (data.hobbies || []).filter(Boolean);
    data.experience = data.experience.filter((e) => e.title || e.org);
    data.experience.forEach((e) => { e.bullets = e.bullets.filter(Boolean); });
    data.hardSkills = data.hardSkills.filter((s) => s.label);
    data.achievements = data.achievements.filter((a) => a.title);
    data.references = data.references.filter((r) => r.name);
    data.languages = data.languages.filter((l) => l.name);
    data.showIdentity = showIdentity;
    setCvData(data);
  };

  const autofill = () => {
    reset(demoData);
    setShowIdentity(true);
    setExpandedSections(Object.fromEntries(Object.keys(expandedSections).map((k) => [k, true])));
  };

  const SectionHeader = ({ id, label, icon: Icon, badge }: { id: string; label: string; icon: React.ElementType; badge?: number }) => (
    <button
      type="button"
      onClick={() => toggle(id)}
      className="w-full flex items-center justify-between py-3 px-4 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors"
    >
      <span className="flex items-center gap-2 font-semibold text-foreground font-[Oswald]">
        <Icon className="w-5 h-5 text-primary" />
        {label}
        {badge && badge > 0 && (
          <span className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-bold">{badge}</span>
        )}
      </span>
      {expandedSections[id] ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
    </button>
  );

  const FieldError = ({ msg }: { msg?: string }) =>
    msg ? <p className="text-destructive text-xs mt-1">{msg}</p> : null;

  return (
    <div className="min-h-screen bg-background flex items-start justify-center p-4 md:p-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" /> CV Builder
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground font-[Oswald] tracking-tight">
            Build Your Professional CV
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Fill in your details below. Click suggestions to add info fast — less typing, more skills!
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap gap-3 mb-6">
          <Button type="button" variant="outline" onClick={autofill} className="gap-2 text-sm h-12 px-5">
            <Zap className="w-4 h-4" /> Demo Autofill
          </Button>
          <Button type="button" variant="outline" className="gap-2 text-sm h-12 px-5 opacity-60 cursor-not-allowed" disabled>
            <Upload className="w-4 h-4" /> Upload CV (Coming Soon)
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* === PERSONAL INFO === */}
          <SectionHeader id="personal" label="Personal Information *" icon={User} />
          {expandedSections.personal && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-card">
              <div className="md:col-span-2">
                <Label className="text-xs font-medium">Full Name *</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input {...register("name")} placeholder="e.g. Mudau Ndivho" className="pl-10 h-12" />
                </div>
                <FieldError msg={errors.name?.message} />
              </div>
              <div>
                <Label className="text-xs font-medium">Job Title *</Label>
                <div className="relative mt-1">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input {...register("title")} placeholder="e.g. IT Technician" className="pl-10 h-12" />
                </div>
                <FieldError msg={errors.title?.message} />
              </div>
              <div>
                <Label className="text-xs font-medium">Tagline</Label>
                <Input {...register("tagline")} placeholder="Short professional tagline" className="h-12 mt-1" />
              </div>
              <div>
                <Label className="text-xs font-medium">Phone *</Label>
                <div className="relative mt-1">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input {...register("phone")} placeholder="+27..." className="pl-10 h-12" />
                </div>
                <FieldError msg={errors.phone?.message} />
              </div>
              <div>
                <Label className="text-xs font-medium">Email *</Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input {...register("email")} placeholder="you@email.com" className="pl-10 h-12" />
                </div>
                <FieldError msg={errors.email?.message} />
              </div>
              <div>
                <Label className="text-xs font-medium">Location *</Label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input {...register("location")} placeholder="City, Province" className="pl-10 h-12" />
                </div>
                <FieldError msg={errors.location?.message} />
              </div>
              <div>
                <Label className="text-xs font-medium">Website / Business</Label>
                <div className="relative mt-1">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input {...register("website")} placeholder="Business name or URL" className="pl-10 h-12" />
                </div>
              </div>
            </div>
          )}

          {/* === SA IDENTITY (TOGGLE) === */}
          <SectionHeader id="identity" label="Identity Details (SA CV)" icon={IdCard} />
          {expandedSections.identity && (
            <div className="p-4 border border-border rounded-lg bg-card space-y-4">
              <div className="flex items-center justify-between p-3 rounded-md bg-secondary/10">
                <div>
                  <p className="text-sm font-semibold text-foreground">Show identity on CV</p>
                  <p className="text-xs text-muted-foreground">Toggle ON to include these details on your printed CV</p>
                </div>
                <Switch checked={showIdentity} onCheckedChange={(v) => { setShowIdentity(v); setValue("showIdentity", v); }} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs font-medium flex items-center gap-1"><IdCard className="w-3 h-3" /> SA ID Number</Label>
                  <Input {...register("idNumber")} placeholder="13-digit ID number" maxLength={13} className="h-10 mt-1" />
                </div>
                <div>
                  <Label className="text-xs font-medium flex items-center gap-1"><Users className="w-3 h-3" /> Gender</Label>
                  <select {...register("gender")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1">
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs font-medium flex items-center gap-1"><CalendarDays className="w-3 h-3" /> Date of Birth</Label>
                  <Input {...register("dateOfBirth")} type="date" className="h-10 mt-1" />
                </div>
                <div>
                  <Label className="text-xs font-medium flex items-center gap-1"><Flag className="w-3 h-3" /> Nationality</Label>
                  <Input {...register("nationality")} placeholder="e.g. South African" className="h-10 mt-1" />
                </div>
                <div>
                  <Label className="text-xs font-medium flex items-center gap-1"><Heart className="w-3 h-3" /> Marital Status</Label>
                  <select {...register("maritalStatus")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1">
                    <option value="">Select...</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs font-medium flex items-center gap-1"><Car className="w-3 h-3" /> Driver's License</Label>
                  <select {...register("driversLicense")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1">
                    <option value="">None</option>
                    <option value="Code A (Motorcycle)">Code A (Motorcycle)</option>
                    <option value="Code B (Light Vehicle)">Code B (Light Vehicle)</option>
                    <option value="Code C1 (Heavy Vehicle)">Code C1 (Heavy Vehicle)</option>
                    <option value="Code C (Extra Heavy)">Code C (Extra Heavy)</option>
                    <option value="Code EB (Articulated)">Code EB (Articulated)</option>
                    <option value="Code EC1">Code EC1</option>
                    <option value="Learner's License">Learner's License</option>
                  </select>
                </div>
                <div>
                  <Label className="text-xs font-medium">Ethnicity (optional, for EE purposes)</Label>
                  <select {...register("ethnicity")} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1">
                    <option value="">Prefer not to say</option>
                    <option value="Black">Black</option>
                    <option value="Coloured">Coloured</option>
                    <option value="Indian">Indian</option>
                    <option value="White">White</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* === PROFESSIONAL SUMMARY === */}
          <SectionHeader id="summary" label="Professional Summary" icon={Briefcase} />
          {expandedSections.summary && (
            <div className="p-4 border border-border rounded-lg bg-card">
              <Label className="text-xs font-medium">Summary</Label>
              <Textarea {...register("summary")} placeholder="Write a brief professional summary or leave blank for AI generation later..." className="mt-1 min-h-[100px]" />
            </div>
          )}

          {/* === WORK EXPERIENCE === */}
          <SectionHeader id="experience" label="Work Experience" icon={Briefcase} />
          {expandedSections.experience && (
            <div className="space-y-4 p-4 border border-border rounded-lg bg-card">
              {experienceFields.fields.map((field, idx) => (
                <div key={field.id} className="p-3 border border-border rounded-md bg-background space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-muted-foreground">Position {idx + 1}</span>
                    {experienceFields.fields.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => experienceFields.remove(idx)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <Label className="text-xs">Job Title *</Label>
                      <Input {...register(`experience.${idx}.title`)} placeholder="Job title" className="h-10 mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Organization *</Label>
                      <Input {...register(`experience.${idx}.org`)} placeholder="Company name" className="h-10 mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Period</Label>
                      <Input {...register(`experience.${idx}.period`)} placeholder="2024 – Present" className="h-10 mt-1" />
                    </div>
                    <div>
                      <Label className="text-xs">Location</Label>
                      <Input {...register(`experience.${idx}.location`)} placeholder="City" className="h-10 mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs">Key Responsibilities (one per line)</Label>
                    <Textarea
                      defaultValue={field.bullets?.join("\n")}
                      onChange={(e) => {
                        const bullets = e.target.value.split("\n");
                        experienceFields.update(idx, { ...experienceFields.fields[idx], bullets });
                      }}
                      placeholder="One responsibility per line..."
                      className="mt-1 min-h-[60px] text-sm"
                    />
                    <p className="text-xs text-muted-foreground mt-1">💡 Quick add:</p>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {RESPONSIBILITY_SUGGESTIONS.slice(0, 6).map((r) => (
                        <Chip key={r} label={r} onClick={() => {
                          const current = getValues(`experience.${idx}.bullets`) || [];
                          if (!current.includes(r)) {
                            const updated = [...current.filter(Boolean), r];
                            experienceFields.update(idx, { ...experienceFields.fields[idx], bullets: updated });
                          }
                        }} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
              <Button
                type="button" variant="outline" size="sm"
                onClick={() => experienceFields.append({ id: Date.now().toString(), title: "", org: "", period: "", location: "", bullets: [""], highlight: false })}
                className="gap-1"
              >
                <Plus className="w-4 h-4" /> Add Position
              </Button>
            </div>
          )}

          {/* === EDUCATION === */}
          <SectionHeader id="education" label="Education" icon={GraduationCap} />
          {expandedSections.education && (
            <div className="p-4 border border-border rounded-lg bg-card">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="md:col-span-2">
                  <Label className="text-xs">Degree / Certificate *</Label>
                  <Input {...register("education.degree")} placeholder="e.g. National Senior Certificate" className="h-10 mt-1" />
                  <FieldError msg={errors.education?.degree?.message} />
                </div>
                <div>
                  <Label className="text-xs">School *</Label>
                  <Input {...register("education.school")} placeholder="School name" className="h-10 mt-1" />
                  <FieldError msg={errors.education?.school?.message} />
                </div>
                <div>
                  <Label className="text-xs">Year</Label>
                  <Input {...register("education.year")} placeholder="2022" className="h-10 mt-1" />
                </div>
                <div>
                  <Label className="text-xs">Location</Label>
                  <Input {...register("education.location")} placeholder="Province, Country" className="h-10 mt-1" />
                </div>
                <div>
                  <Label className="text-xs">Focus / Major Subjects</Label>
                  <Input {...register("education.focus")} placeholder="Subjects or specialization" className="h-10 mt-1" />
                </div>
              </div>
            </div>
          )}

          {/* === SKILLS with suggestions === */}
          <SectionHeader id="skills" label="Skills" icon={Zap} badge={(currentSoftSkills.filter(Boolean).length + (getValues("hardSkills")?.filter(s => s.label).length || 0))} />
          {expandedSections.skills && (
            <div className="p-4 border border-border rounded-lg bg-card space-y-5">
              {/* Hard Skills */}
              <div>
                <Label className="text-xs font-semibold">Hard Skills</Label>
                <div className="space-y-2 mt-2">
                  {hardSkillFields.fields.map((field, idx) => (
                    <div key={field.id} className="flex gap-2 items-center">
                      <Input {...register(`hardSkills.${idx}.label`)} placeholder="Skill name" className="h-10 flex-1" />
                      <Input {...register(`hardSkills.${idx}.level`, { valueAsNumber: true })} type="number" min={0} max={100} className="h-10 w-20" />
                      {hardSkillFields.fields.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => hardSkillFields.remove(idx)}>
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" size="sm" onClick={() => hardSkillFields.append({ label: "", level: 70 })} className="gap-1">
                    <Plus className="w-3 h-3" /> Add Skill
                  </Button>
                </div>
                {/* Hard skill category suggestions */}
                {Object.entries(HARD_SKILL_SUGGESTIONS).map(([cat, skills]) => (
                  <div key={cat} className="mt-3">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{cat}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {skills.slice(0, 8).map((s) => (
                        <Chip key={s} label={s} onClick={() => addHardSkill(s)} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Soft Skills */}
              <div>
                <Label className="text-xs font-semibold">Soft Skills — tap to add</Label>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {SOFT_SKILL_SUGGESTIONS.map((skill) => (
                    <Chip
                      key={skill}
                      label={skill}
                      active={currentSoftSkills.includes(skill)}
                      onClick={() => toggleSoftSkill(skill)}
                    />
                  ))}
                </div>
              </div>

              {/* Technical Skills */}
              <div>
                <Label className="text-xs font-semibold">Technical Skills (free text)</Label>
                <Textarea {...register("technicalSkills")} placeholder="List all technical skills..." className="mt-1 min-h-[60px] text-sm" />
              </div>
            </div>
          )}

          {/* === HOBBIES & INTERESTS with suggestions === */}
          <SectionHeader id="hobbies" label="Hobbies & Interests" icon={Heart} badge={currentHobbies.length} />
          {expandedSections.hobbies && (
            <div className="p-4 border border-border rounded-lg bg-card space-y-3">
              <p className="text-xs text-muted-foreground">Hobbies show personality! Employers love seeing them. Tap to add:</p>
              <div className="flex flex-wrap gap-1.5">
                {HOBBY_SUGGESTIONS.map((hobby) => (
                  <Chip
                    key={hobby}
                    label={hobby}
                    active={currentHobbies.includes(hobby)}
                    onClick={() => toggleHobby(hobby)}
                  />
                ))}
              </div>
              <div>
                <Label className="text-xs">Add custom hobby</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="custom-hobby"
                    placeholder="Type a hobby and press Add"
                    className="h-10 flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val) { toggleHobby(val); (e.target as HTMLInputElement).value = ""; }
                      }
                    }}
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => {
                    const input = document.getElementById("custom-hobby") as HTMLInputElement;
                    if (input?.value.trim()) { toggleHobby(input.value.trim()); input.value = ""; }
                  }}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              {currentHobbies.length > 0 && (
                <div className="pt-2 border-t border-border">
                  <p className="text-xs font-semibold text-foreground mb-1">Selected ({currentHobbies.length}):</p>
                  <div className="flex flex-wrap gap-1.5">
                    {currentHobbies.map((h) => (
                      <Chip key={h} label={h} active onClick={() => toggleHobby(h)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* === LANGUAGES with suggestions === */}
          <SectionHeader id="languages" label="Languages" icon={Globe} />
          {expandedSections.languages && (
            <div className="p-4 border border-border rounded-lg bg-card space-y-3">
              {languageFields.fields.map((field, idx) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input {...register(`languages.${idx}.name`)} placeholder="Language" className="h-10 flex-1" />
                  <select {...register(`languages.${idx}.level`)} className="flex h-10 w-40 rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="">Level...</option>
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Professional">Professional</option>
                    <option value="Conversational">Conversational</option>
                    <option value="Basic">Basic</option>
                  </select>
                  {languageFields.fields.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => languageFields.remove(idx)}>
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
              <p className="text-xs text-muted-foreground">💡 Quick add SA languages:</p>
              <div className="flex flex-wrap gap-1.5">
                {LANGUAGE_SUGGESTIONS.map((lang) => (
                  <Chip key={lang} label={lang} onClick={() => addLanguage(lang)} />
                ))}
              </div>
            </div>
          )}

          {/* === ACHIEVEMENTS === */}
          <SectionHeader id="achievements" label="Key Achievements" icon={Sparkles} />
          {expandedSections.achievements && (
            <div className="p-4 border border-border rounded-lg bg-card space-y-2">
              {achievementFields.fields.map((field, idx) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input {...register(`achievements.${idx}.title`)} placeholder="Achievement title" className="h-10 flex-1" />
                  <Input {...register(`achievements.${idx}.description`)} placeholder="Brief description" className="h-10 flex-1" />
                  <Button type="button" variant="ghost" size="sm" onClick={() => achievementFields.remove(idx)}>
                    <Trash2 className="w-3 h-3 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => achievementFields.append({ icon: "Trophy", title: "", description: "" })} className="gap-1">
                <Plus className="w-3 h-3" /> Add Achievement
              </Button>
            </div>
          )}

          {/* === REFERENCES === */}
          <SectionHeader id="references" label="References" icon={User} />
          {expandedSections.references && (
            <div className="p-4 border border-border rounded-lg bg-card space-y-2">
              {referenceFields.fields.map((field, idx) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input {...register(`references.${idx}.name`)} placeholder="Name" className="h-10 flex-1" />
                  <Input {...register(`references.${idx}.role`)} placeholder="Role" className="h-10 flex-1" />
                  <Input {...register(`references.${idx}.phone`)} placeholder="Phone" className="h-10 w-36" />
                  {referenceFields.fields.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => referenceFields.remove(idx)}>
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => referenceFields.append({ name: "", role: "", phone: "" })} className="gap-1">
                <Plus className="w-3 h-3" /> Add Reference
              </Button>
            </div>
          )}

          {/* Submit */}
          <div className="pt-4 pb-8">
            <Button type="submit" className="w-full h-14 text-lg font-semibold gap-2">
              <Sparkles className="w-5 h-5" /> Generate My CV
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
