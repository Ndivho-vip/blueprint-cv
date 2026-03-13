import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cvFormSchema, type CVFormData } from "@/types/cv";
import { demoData } from "@/lib/demoData";
import { useCVContext } from "@/contexts/CVContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  User, Briefcase, Mail, Phone, MapPin, Globe, GraduationCap,
  Plus, Trash2, Zap, Upload, ChevronDown, ChevronUp, Sparkles
} from "lucide-react";

export default function IntakeForm() {
  const { setCvData } = useCVContext();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    personal: true, summary: false, experience: false, education: false,
    skills: false, languages: false, achievements: false, references: false,
  });

  const {
    register, handleSubmit, control, reset, formState: { errors },
  } = useForm<CVFormData>({
    resolver: zodResolver(cvFormSchema),
    defaultValues: {
      name: "", title: "", tagline: "", phone: "", email: "", location: "", website: "",
      summary: "", technicalSkills: "",
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

  const toggle = (key: string) =>
    setExpandedSections((p) => ({ ...p, [key]: !p[key] }));

  const onSubmit = (data: CVFormData) => {
    // Filter out empty entries
    data.softSkills = data.softSkills.filter(Boolean);
    data.experience = data.experience.filter((e) => e.title || e.org);
    data.experience.forEach((e) => { e.bullets = e.bullets.filter(Boolean); });
    data.hardSkills = data.hardSkills.filter((s) => s.label);
    data.achievements = data.achievements.filter((a) => a.title);
    data.references = data.references.filter((r) => r.name);
    data.languages = data.languages.filter((l) => l.name);
    setCvData(data);
  };

  const autofill = () => {
    reset(demoData);
    setExpandedSections(Object.fromEntries(Object.keys(expandedSections).map((k) => [k, true])));
  };

  const SectionHeader = ({ id, label, icon: Icon }: { id: string; label: string; icon: React.ElementType }) => (
    <button
      type="button"
      onClick={() => toggle(id)}
      className="w-full flex items-center justify-between py-3 px-4 rounded-lg bg-secondary/10 hover:bg-secondary/20 transition-colors"
    >
      <span className="flex items-center gap-2 font-semibold text-foreground font-[Oswald]">
        <Icon className="w-5 h-5 text-primary" />
        {label}
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
            Fill in your details below. All required fields must be completed.
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

          {/* === SKILLS === */}
          <SectionHeader id="skills" label="Skills" icon={Zap} />
          {expandedSections.skills && (
            <div className="p-4 border border-border rounded-lg bg-card space-y-4">
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
              </div>
              {/* Soft Skills */}
              <div>
                <Label className="text-xs font-semibold">Soft Skills (comma-separated)</Label>
                <Input
                  defaultValue=""
                  {...register("softSkills")}
                  placeholder="Leadership, Problem Solving, Communication"
                  className="h-10 mt-1"
                  onChange={() => {}}
                />
                <p className="text-xs text-muted-foreground mt-1">Separate with commas</p>
              </div>
              {/* Technical Skills */}
              <div>
                <Label className="text-xs font-semibold">Technical Skills</Label>
                <Textarea {...register("technicalSkills")} placeholder="List all technical skills..." className="mt-1 min-h-[60px] text-sm" />
              </div>
            </div>
          )}

          {/* === LANGUAGES === */}
          <SectionHeader id="languages" label="Languages" icon={Globe} />
          {expandedSections.languages && (
            <div className="p-4 border border-border rounded-lg bg-card space-y-2">
              {languageFields.fields.map((field, idx) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <Input {...register(`languages.${idx}.name`)} placeholder="Language" className="h-10 flex-1" />
                  <Input {...register(`languages.${idx}.level`)} placeholder="Native / Professional" className="h-10 flex-1" />
                  {languageFields.fields.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => languageFields.remove(idx)}>
                      <Trash2 className="w-3 h-3 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => languageFields.append({ name: "", level: "" })} className="gap-1">
                <Plus className="w-3 h-3" /> Add Language
              </Button>
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
