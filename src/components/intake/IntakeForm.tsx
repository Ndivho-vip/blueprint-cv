import { useState, useRef, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvFormSchema, type CVFormData } from "@/types/cv";
import { demoData } from "@/lib/demoData";
import { useCVContext } from "@/contexts/CVContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import AppShell from "@/components/AppShell";
import {
  HOBBY_SUGGESTIONS, SOFT_SKILL_SUGGESTIONS, HARD_SKILL_SUGGESTIONS,
  LANGUAGE_SUGGESTIONS, RESPONSIBILITY_SUGGESTIONS,
} from "@/lib/suggestions";
import {
  User, Briefcase, Mail, Phone, MapPin, Globe, GraduationCap,
  Plus, Trash2, Zap, Upload, Sparkles,
  IdCard, Heart, CalendarDays, Flag, Car, Users,
  ChevronRight, Play,
} from "lucide-react";

/** Clickable suggestion chip */
const Chip = ({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) => (
  <button
    type="button"
    onClick={onClick}
    className={`px-2.5 py-1 rounded text-[11px] font-medium transition-all border ${
      active
        ? "bg-primary text-primary-foreground border-primary"
        : "bg-muted text-foreground border-border hover:bg-accent hover:text-accent-foreground"
    }`}
  >
    {active ? "✓ " : "+ "}{label}
  </button>
);

const SECTIONS = [
  { id: "personal", label: "Personal Info", icon: User, required: true },
  { id: "identity", label: "Identity (SA)", icon: IdCard },
  { id: "summary", label: "Summary", icon: Briefcase },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "skills", label: "Skills", icon: Zap },
  { id: "hobbies", label: "Hobbies", icon: Heart },
  { id: "languages", label: "Languages", icon: Globe },
  { id: "achievements", label: "Achievements", icon: Sparkles },
  { id: "references", label: "References", icon: User },
] as const;

export default function IntakeForm() {
  const { setCvData } = useCVContext();
  const [activeSection, setActiveSection] = useState("personal");
  const [showIdentity, setShowIdentity] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

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

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleSoftSkill = (skill: string) => {
    const current = getValues("softSkills").filter(Boolean);
    setValue("softSkills", current.includes(skill) ? current.filter((s) => s !== skill) : [...current, skill]);
  };

  const toggleHobby = (hobby: string) => {
    const current = getValues("hobbies") || [];
    setValue("hobbies", current.includes(hobby) ? current.filter((h) => h !== hobby) : [...current, hobby]);
  };

  const addHardSkill = (label: string) => {
    const existing = getValues("hardSkills");
    if (!existing.find((s) => s.label === label)) hardSkillFields.append({ label, level: 75 });
  };

  const addLanguage = (name: string) => {
    const existing = getValues("languages");
    if (!existing.find((l) => l.name === name)) languageFields.append({ name, level: "Conversational" });
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
  };

  const FieldError = ({ msg }: { msg?: string }) =>
    msg ? <p className="text-destructive text-[11px] mt-0.5">{msg}</p> : null;

  const completedSections = () => {
    const name = watch("name");
    const title = watch("title");
    const done: string[] = [];
    if (name && title) done.push("personal");
    if (watch("summary")) done.push("summary");
    if (watch("experience")?.some(e => e.title)) done.push("experience");
    if (watch("education.degree")) done.push("education");
    if (watch("hardSkills")?.some(s => s.label) || currentSoftSkills.filter(Boolean).length > 0) done.push("skills");
    if (currentHobbies.length > 0) done.push("hobbies");
    if (watch("languages")?.some(l => l.name)) done.push("languages");
    if (watch("achievements")?.some(a => a.title)) done.push("achievements");
    if (watch("references")?.some(r => r.name)) done.push("references");
    if (watch("idNumber") || watch("nationality")) done.push("identity");
    return done;
  };

  const done = completedSections();

  return (
    <AppShell
      statusText={`${done.length}/${SECTIONS.length} sections completed`}
      actions={
        <div className="flex items-center gap-1">
          <Button type="button" variant="ghost" size="sm" onClick={autofill} className="h-7 text-[11px] text-secondary-foreground/80 gap-1 px-2 hover:bg-secondary-foreground/10">
            <Zap className="w-3 h-3" /> Demo
          </Button>
          <Button type="button" variant="ghost" size="sm" disabled className="h-7 text-[11px] text-secondary-foreground/40 gap-1 px-2">
            <Upload className="w-3 h-3" /> Import
          </Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full">
        {/* ─── Sidebar Nav ─── */}
        <aside className="w-52 bg-card border-r border-border flex flex-col shrink-0">
          <div className="px-3 py-2 border-b border-border">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Sections</p>
          </div>
          <ScrollArea className="flex-1">
            <nav className="py-1">
              {SECTIONS.map((s) => {
                const isActive = activeSection === s.id;
                const isDone = done.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => scrollToSection(s.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary border-l-2 border-primary"
                        : "text-foreground/70 hover:bg-muted border-l-2 border-transparent"
                    }`}
                  >
                    <s.icon className={`w-3.5 h-3.5 shrink-0 ${isDone ? "text-green-500" : ""}`} />
                    <span className="flex-1 truncate">{s.label}</span>
                    {isDone && <span className="text-green-500 text-[10px]">✓</span>}
                    {"required" in s && s.required && !isDone && <span className="text-destructive text-[10px]">*</span>}
                  </button>
                );
              })}
            </nav>
          </ScrollArea>

          {/* Generate Button in sidebar */}
          <div className="p-3 border-t border-border">
            <Button type="submit" className="w-full h-9 text-xs font-semibold gap-1.5">
              <Play className="w-3.5 h-3.5" /> Generate CV
            </Button>
          </div>
        </aside>

        {/* ─── Main Form Content ─── */}
        <ScrollArea className="flex-1">
          <div className="max-w-2xl mx-auto p-6 space-y-6">

            {/* === PERSONAL INFO === */}
            <div ref={(el) => { sectionRefs.current.personal = el; }}>
              <SectionLabel icon={User} label="Personal Information" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 p-4 border border-border rounded bg-card">
                <div className="md:col-span-2">
                  <Label className="text-[11px] font-medium">Full Name *</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input {...register("name")} placeholder="e.g. Mudau Ndivho" className="pl-8 h-9 text-sm" />
                  </div>
                  <FieldError msg={errors.name?.message} />
                </div>
                <div>
                  <Label className="text-[11px] font-medium">Job Title *</Label>
                  <div className="relative mt-1">
                    <Briefcase className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input {...register("title")} placeholder="e.g. IT Technician" className="pl-8 h-9 text-sm" />
                  </div>
                  <FieldError msg={errors.title?.message} />
                </div>
                <div>
                  <Label className="text-[11px] font-medium">Tagline</Label>
                  <Input {...register("tagline")} placeholder="Short professional tagline" className="h-9 text-sm mt-1" />
                </div>
                <div>
                  <Label className="text-[11px] font-medium">Phone *</Label>
                  <div className="relative mt-1">
                    <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input {...register("phone")} placeholder="+27..." className="pl-8 h-9 text-sm" />
                  </div>
                  <FieldError msg={errors.phone?.message} />
                </div>
                <div>
                  <Label className="text-[11px] font-medium">Email *</Label>
                  <div className="relative mt-1">
                    <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input {...register("email")} placeholder="you@email.com" className="pl-8 h-9 text-sm" />
                  </div>
                  <FieldError msg={errors.email?.message} />
                </div>
                <div>
                  <Label className="text-[11px] font-medium">Location *</Label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input {...register("location")} placeholder="City, Province" className="pl-8 h-9 text-sm" />
                  </div>
                  <FieldError msg={errors.location?.message} />
                </div>
                <div>
                  <Label className="text-[11px] font-medium">Website / Business</Label>
                  <div className="relative mt-1">
                    <Globe className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                    <Input {...register("website")} placeholder="Business name or URL" className="pl-8 h-9 text-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* === SA IDENTITY === */}
            <div ref={(el) => { sectionRefs.current.identity = el; }}>
              <SectionLabel icon={IdCard} label="Identity Details (SA CV)" />
              <div className="mt-3 p-4 border border-border rounded bg-card space-y-3">
                <div className="flex items-center justify-between p-2 rounded bg-muted">
                  <div>
                    <p className="text-xs font-semibold text-foreground">Show identity on CV</p>
                    <p className="text-[10px] text-muted-foreground">Toggle ON to include on printed CV</p>
                  </div>
                  <Switch checked={showIdentity} onCheckedChange={(v) => { setShowIdentity(v); setValue("showIdentity", v); }} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[11px] font-medium flex items-center gap-1"><IdCard className="w-3 h-3" /> SA ID Number</Label>
                    <Input {...register("idNumber")} placeholder="13-digit ID number" maxLength={13} className="h-9 text-sm mt-1" />
                  </div>
                  <div>
                    <Label className="text-[11px] font-medium flex items-center gap-1"><Users className="w-3 h-3" /> Gender</Label>
                    <select {...register("gender")} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm mt-1">
                      <option value="">Select...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Non-binary">Non-binary</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-[11px] font-medium flex items-center gap-1"><CalendarDays className="w-3 h-3" /> Date of Birth</Label>
                    <Input {...register("dateOfBirth")} type="date" className="h-9 text-sm mt-1" />
                  </div>
                  <div>
                    <Label className="text-[11px] font-medium flex items-center gap-1"><Flag className="w-3 h-3" /> Nationality</Label>
                    <Input {...register("nationality")} placeholder="e.g. South African" className="h-9 text-sm mt-1" />
                  </div>
                  <div>
                    <Label className="text-[11px] font-medium flex items-center gap-1"><Heart className="w-3 h-3" /> Marital Status</Label>
                    <select {...register("maritalStatus")} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm mt-1">
                      <option value="">Select...</option>
                      <option value="Single">Single</option>
                      <option value="Married">Married</option>
                      <option value="Divorced">Divorced</option>
                      <option value="Widowed">Widowed</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-[11px] font-medium flex items-center gap-1"><Car className="w-3 h-3" /> Driver's License</Label>
                    <select {...register("driversLicense")} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm mt-1">
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
                    <Label className="text-[11px] font-medium">Ethnicity (optional, for EE purposes)</Label>
                    <select {...register("ethnicity")} className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1.5 text-sm mt-1">
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
            </div>

            {/* === PROFESSIONAL SUMMARY === */}
            <div ref={(el) => { sectionRefs.current.summary = el; }}>
              <SectionLabel icon={Briefcase} label="Professional Summary" />
              <div className="mt-3 p-4 border border-border rounded bg-card">
                <Textarea {...register("summary")} placeholder="Brief professional summary or leave blank for AI later..." className="min-h-[80px] text-sm" />
              </div>
            </div>

            {/* === WORK EXPERIENCE === */}
            <div ref={(el) => { sectionRefs.current.experience = el; }}>
              <SectionLabel icon={Briefcase} label="Work Experience" />
              <div className="mt-3 space-y-3">
                {experienceFields.fields.map((field, idx) => (
                  <div key={field.id} className="p-3 border border-border rounded bg-card space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Position {idx + 1}</span>
                      {experienceFields.fields.length > 1 && (
                        <Button type="button" variant="ghost" size="sm" onClick={() => experienceFields.remove(idx)} className="h-6 w-6 p-0">
                          <Trash2 className="w-3 h-3 text-destructive" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div>
                        <Label className="text-[11px]">Job Title *</Label>
                        <Input {...register(`experience.${idx}.title`)} placeholder="Job title" className="h-9 text-sm mt-0.5" />
                      </div>
                      <div>
                        <Label className="text-[11px]">Organization *</Label>
                        <Input {...register(`experience.${idx}.org`)} placeholder="Company name" className="h-9 text-sm mt-0.5" />
                      </div>
                      <div>
                        <Label className="text-[11px]">Period</Label>
                        <Input {...register(`experience.${idx}.period`)} placeholder="2024 – Present" className="h-9 text-sm mt-0.5" />
                      </div>
                      <div>
                        <Label className="text-[11px]">Location</Label>
                        <Input {...register(`experience.${idx}.location`)} placeholder="City" className="h-9 text-sm mt-0.5" />
                      </div>
                    </div>
                    <div>
                      <Label className="text-[11px]">Key Responsibilities</Label>
                      <Textarea
                        defaultValue={field.bullets?.join("\n")}
                        onChange={(e) => {
                          const bullets = e.target.value.split("\n");
                          experienceFields.update(idx, { ...experienceFields.fields[idx], bullets });
                        }}
                        placeholder="One per line..."
                        className="mt-0.5 min-h-[50px] text-sm"
                      />
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {RESPONSIBILITY_SUGGESTIONS.slice(0, 6).map((r) => (
                          <Chip key={r} label={r} onClick={() => {
                            const current = getValues(`experience.${idx}.bullets`) || [];
                            if (!current.includes(r)) {
                              experienceFields.update(idx, { ...experienceFields.fields[idx], bullets: [...current.filter(Boolean), r] });
                            }
                          }} />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => experienceFields.append({ id: Date.now().toString(), title: "", org: "", period: "", location: "", bullets: [""], highlight: false })} className="gap-1 h-8 text-xs">
                  <Plus className="w-3 h-3" /> Add Position
                </Button>
              </div>
            </div>

            {/* === EDUCATION === */}
            <div ref={(el) => { sectionRefs.current.education = el; }}>
              <SectionLabel icon={GraduationCap} label="Education" />
              <div className="mt-3 p-4 border border-border rounded bg-card">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div className="md:col-span-2">
                    <Label className="text-[11px]">Degree / Certificate *</Label>
                    <Input {...register("education.degree")} placeholder="e.g. National Senior Certificate" className="h-9 text-sm mt-0.5" />
                    <FieldError msg={errors.education?.degree?.message} />
                  </div>
                  <div>
                    <Label className="text-[11px]">School *</Label>
                    <Input {...register("education.school")} placeholder="School name" className="h-9 text-sm mt-0.5" />
                    <FieldError msg={errors.education?.school?.message} />
                  </div>
                  <div>
                    <Label className="text-[11px]">Year</Label>
                    <Input {...register("education.year")} placeholder="2022" className="h-9 text-sm mt-0.5" />
                  </div>
                  <div>
                    <Label className="text-[11px]">Location</Label>
                    <Input {...register("education.location")} placeholder="Province, Country" className="h-9 text-sm mt-0.5" />
                  </div>
                  <div>
                    <Label className="text-[11px]">Focus / Major Subjects</Label>
                    <Input {...register("education.focus")} placeholder="Subjects or specialization" className="h-9 text-sm mt-0.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* === SKILLS === */}
            <div ref={(el) => { sectionRefs.current.skills = el; }}>
              <SectionLabel icon={Zap} label="Skills" badge={currentSoftSkills.filter(Boolean).length + (getValues("hardSkills")?.filter(s => s.label).length || 0)} />
              <div className="mt-3 p-4 border border-border rounded bg-card space-y-4">
                {/* Hard Skills */}
                <div>
                  <Label className="text-[11px] font-semibold">Hard Skills</Label>
                  <div className="space-y-1.5 mt-1.5">
                    {hardSkillFields.fields.map((field, idx) => (
                      <div key={field.id} className="flex gap-1.5 items-center">
                        <Input {...register(`hardSkills.${idx}.label`)} placeholder="Skill name" className="h-8 text-sm flex-1" />
                        <Input {...register(`hardSkills.${idx}.level`, { valueAsNumber: true })} type="number" min={0} max={100} className="h-8 text-sm w-16" />
                        {hardSkillFields.fields.length > 1 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => hardSkillFields.remove(idx)} className="h-6 w-6 p-0">
                            <Trash2 className="w-3 h-3 text-destructive" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={() => hardSkillFields.append({ label: "", level: 70 })} className="gap-1 h-7 text-[11px]">
                      <Plus className="w-3 h-3" /> Add
                    </Button>
                  </div>
                  {Object.entries(HARD_SKILL_SUGGESTIONS).map(([cat, skills]) => (
                    <div key={cat} className="mt-2">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{cat}</p>
                      <div className="flex flex-wrap gap-1">
                        {skills.slice(0, 8).map((s) => (
                          <Chip key={s} label={s} onClick={() => addHardSkill(s)} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Soft Skills */}
                <div>
                  <Label className="text-[11px] font-semibold">Soft Skills — tap to add</Label>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {SOFT_SKILL_SUGGESTIONS.map((skill) => (
                      <Chip key={skill} label={skill} active={currentSoftSkills.includes(skill)} onClick={() => toggleSoftSkill(skill)} />
                    ))}
                  </div>
                </div>
                {/* Technical Skills */}
                <div>
                  <Label className="text-[11px] font-semibold">Technical Skills (free text)</Label>
                  <Textarea {...register("technicalSkills")} placeholder="List all technical skills..." className="mt-1 min-h-[50px] text-sm" />
                </div>
              </div>
            </div>

            {/* === HOBBIES === */}
            <div ref={(el) => { sectionRefs.current.hobbies = el; }}>
              <SectionLabel icon={Heart} label="Hobbies & Interests" badge={currentHobbies.length} />
              <div className="mt-3 p-4 border border-border rounded bg-card space-y-3">
                <p className="text-[11px] text-muted-foreground">Tap to add — employers love seeing personality!</p>
                <div className="flex flex-wrap gap-1">
                  {HOBBY_SUGGESTIONS.map((hobby) => (
                    <Chip key={hobby} label={hobby} active={currentHobbies.includes(hobby)} onClick={() => toggleHobby(hobby)} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="custom-hobby"
                    placeholder="Custom hobby..."
                    className="h-8 text-sm flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const val = (e.target as HTMLInputElement).value.trim();
                        if (val) { toggleHobby(val); (e.target as HTMLInputElement).value = ""; }
                      }
                    }}
                  />
                  <Button type="button" variant="outline" size="sm" className="h-8" onClick={() => {
                    const input = document.getElementById("custom-hobby") as HTMLInputElement;
                    if (input?.value.trim()) { toggleHobby(input.value.trim()); input.value = ""; }
                  }}>
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            {/* === LANGUAGES === */}
            <div ref={(el) => { sectionRefs.current.languages = el; }}>
              <SectionLabel icon={Globe} label="Languages" />
              <div className="mt-3 p-4 border border-border rounded bg-card space-y-2">
                {languageFields.fields.map((field, idx) => (
                  <div key={field.id} className="flex gap-1.5 items-center">
                    <Input {...register(`languages.${idx}.name`)} placeholder="Language" className="h-8 text-sm flex-1" />
                    <select {...register(`languages.${idx}.level`)} className="flex h-8 w-36 rounded-md border border-input bg-background px-2 py-1 text-sm">
                      <option value="">Level...</option>
                      <option value="Native">Native</option>
                      <option value="Fluent">Fluent</option>
                      <option value="Professional">Professional</option>
                      <option value="Conversational">Conversational</option>
                      <option value="Basic">Basic</option>
                    </select>
                    {languageFields.fields.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => languageFields.remove(idx)} className="h-6 w-6 p-0">
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
                <p className="text-[10px] text-muted-foreground">Quick add:</p>
                <div className="flex flex-wrap gap-1">
                  {LANGUAGE_SUGGESTIONS.map((lang) => (
                    <Chip key={lang} label={lang} onClick={() => addLanguage(lang)} />
                  ))}
                </div>
              </div>
            </div>

            {/* === ACHIEVEMENTS === */}
            <div ref={(el) => { sectionRefs.current.achievements = el; }}>
              <SectionLabel icon={Sparkles} label="Key Achievements" />
              <div className="mt-3 p-4 border border-border rounded bg-card space-y-1.5">
                {achievementFields.fields.map((field, idx) => (
                  <div key={field.id} className="flex gap-1.5 items-center">
                    <Input {...register(`achievements.${idx}.title`)} placeholder="Title" className="h-8 text-sm flex-1" />
                    <Input {...register(`achievements.${idx}.description`)} placeholder="Description" className="h-8 text-sm flex-1" />
                    <Button type="button" variant="ghost" size="sm" onClick={() => achievementFields.remove(idx)} className="h-6 w-6 p-0">
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => achievementFields.append({ icon: "Trophy", title: "", description: "" })} className="gap-1 h-7 text-[11px]">
                  <Plus className="w-3 h-3" /> Add Achievement
                </Button>
              </div>
            </div>

            {/* === REFERENCES === */}
            <div ref={(el) => { sectionRefs.current.references = el; }}>
              <SectionLabel icon={User} label="References" />
              <div className="mt-3 p-4 border border-border rounded bg-card space-y-1.5">
                {referenceFields.fields.map((field, idx) => (
                  <div key={field.id} className="flex gap-1.5 items-center">
                    <Input {...register(`references.${idx}.name`)} placeholder="Name" className="h-8 text-sm flex-1" />
                    <Input {...register(`references.${idx}.role`)} placeholder="Role" className="h-8 text-sm flex-1" />
                    <Input {...register(`references.${idx}.phone`)} placeholder="Phone" className="h-8 text-sm w-32" />
                    {referenceFields.fields.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => referenceFields.remove(idx)} className="h-6 w-6 p-0">
                        <Trash2 className="w-3 h-3 text-destructive" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button type="button" variant="outline" size="sm" onClick={() => referenceFields.append({ name: "", role: "", phone: "" })} className="gap-1 h-7 text-[11px]">
                  <Plus className="w-3 h-3" /> Add Reference
                </Button>
              </div>
            </div>

            <div className="h-8" />
          </div>
        </ScrollArea>
      </form>
    </AppShell>
  );
}

function SectionLabel({ icon: Icon, label, badge }: { icon: React.ElementType; label: string; badge?: number }) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4 text-primary" />
      <h2 className="text-sm font-bold text-foreground font-[Oswald] uppercase tracking-wide">{label}</h2>
      {badge !== undefined && badge > 0 && (
        <span className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-bold">{badge}</span>
      )}
    </div>
  );
}
