import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { cvData as defaultCvData } from "@/data/cvData";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-oswald text-[11px] font-bold uppercase tracking-[0.15em] text-primary mb-2 border-b border-sidebar-border pb-1">
    {children}
  </h3>
);

const SkillBar = ({ label, level }: { label: string; level: number }) => (
  <div className="mb-1.5">
    <span className="text-[8.5px] text-sidebar-foreground/90 block mb-0.5">{label}</span>
    <div className="w-full h-1 bg-sidebar-accent rounded-full overflow-hidden">
      <div className="h-full bg-primary rounded-full" style={{ width: `${level}%` }} />
    </div>
  </div>
);

const CVSidebar = ({ data }: { data?: any }) => {
  const d = data || defaultCvData;
  const contact = d.contact || { phone: d.phone, email: d.email, location: d.location, website: d.website };
  const { hardSkills = [], softSkills = [], languages = [], references = [] } = d;
  const educationList = Array.isArray(d.education) ? d.education : d.education ? [d.education] : [];

  return (
    <div
      className="h-full px-4 py-5 text-sidebar-foreground flex flex-col gap-4"
      style={{ backgroundColor: "hsl(215, 25%, 18%)" }}
    >
      <div>
        <SectionTitle>Contact</SectionTitle>
        <div className="space-y-1.5 text-[8.5px]">
          <div className="flex items-center gap-2"><Phone className="w-3 h-3 text-primary shrink-0" /><span>{contact.phone}</span></div>
          <div className="flex items-center gap-2"><Mail className="w-3 h-3 text-primary shrink-0" /><span className="break-all">{contact.email}</span></div>
          <div className="flex items-center gap-2"><MapPin className="w-3 h-3 text-primary shrink-0" /><span>{contact.location}</span></div>
          <div className="flex items-center gap-2"><Globe className="w-3 h-3 text-primary shrink-0" /><span>{contact.website}</span></div>
        </div>
      </div>

      <div>
        <SectionTitle>Hard Skills</SectionTitle>
        {hardSkills.map((s: any) => <SkillBar key={s.label} label={s.label} level={s.level} />)}
      </div>

      <div>
        <SectionTitle>Soft Skills</SectionTitle>
        <div className="space-y-1 text-[8.5px]">
          {softSkills.map((s: string) => (
            <div key={s} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>Languages</SectionTitle>
        <div className="text-[8.5px] space-y-0.5">
          {languages.map((l: any) => (
            <div key={l.name} className="flex justify-between"><span>{l.name}</span><span className="text-sidebar-foreground/60">{l.level}</span></div>
          ))}
        </div>
      </div>

      <div>
        <SectionTitle>Education</SectionTitle>
        <div className="text-[8.5px]">
          <p className="font-semibold text-[9px]">{education.degree}</p>
          <p className="text-sidebar-foreground/70">{education.school}</p>
          <p className="text-sidebar-foreground/50 text-[7.5px] mt-0.5">{education.year}</p>
          <p className="text-sidebar-foreground/70 mt-0.5">Focus: {education.focus}</p>
        </div>
      </div>

      <div>
        <SectionTitle>References</SectionTitle>
        {references.map((r: any) => (
          <div key={r.name} className="text-[8.5px]">
            <p className="font-semibold">{r.name}</p>
            <p className="text-sidebar-foreground/60">{r.role}</p>
            <div className="flex items-center gap-1.5 mt-0.5"><Phone className="w-2.5 h-2.5 text-primary" /><span>{r.phone}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CVSidebar;
