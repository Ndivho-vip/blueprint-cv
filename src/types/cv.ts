import { z } from "zod";

export const experienceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Job title is required"),
  org: z.string().min(1, "Organization is required"),
  period: z.string(),
  location: z.string(),
  bullets: z.array(z.string()),
  highlight: z.boolean().optional(),
});

export const educationSchema = z.object({
  degree: z.string().min(1, "Degree/certificate is required"),
  school: z.string().min(1, "School name is required"),
  year: z.string(),
  location: z.string(),
  focus: z.string(),
});

export const referenceSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string(),
  phone: z.string(),
});

export const achievementSchema = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

export const hardSkillSchema = z.object({
  label: z.string().min(1, "Skill name is required"),
  level: z.number().min(0).max(100),
});

export const languageSchema = z.object({
  name: z.string().min(1),
  level: z.string(),
});

export const cvFormSchema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(100),
  title: z.string().trim().min(1, "Job title is required").max(100),
  tagline: z.string().max(200).optional(),
  phone: z.string().trim().min(1, "Phone number is required").max(30),
  email: z.string().trim().email("Valid email required").max(255),
  location: z.string().trim().min(1, "Location is required").max(100),
  website: z.string().max(100).optional(),
  summary: z.string().max(2000).optional(),

  // SA Identity fields (all optional, toggled on/off)
  idNumber: z.string().max(13).optional(),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  nationality: z.string().optional(),
  maritalStatus: z.string().optional(),
  driversLicense: z.string().optional(),
  ethnicity: z.string().optional(),

  // Toggle visibility for identity fields on CV
  showIdentity: z.boolean().optional(),

  // Hobbies & Interests
  hobbies: z.array(z.string()).optional(),

  achievements: z.array(achievementSchema),
  hardSkills: z.array(hardSkillSchema),
  softSkills: z.array(z.string()),
  technicalSkills: z.string().optional(),
  languages: z.array(languageSchema),
  education: educationSchema,
  experience: z.array(experienceSchema),
  references: z.array(referenceSchema),
});

export type CVFormData = z.infer<typeof cvFormSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type Reference = z.infer<typeof referenceSchema>;
export type Achievement = z.infer<typeof achievementSchema>;
export type HardSkill = z.infer<typeof hardSkillSchema>;
export type Language = z.infer<typeof languageSchema>;

export type ToneStyle = "formal" | "modern" | "hustle-forward" | "community-friendly";

export type ExportFormat = "pdf" | "docx" | "txt" | "html";
