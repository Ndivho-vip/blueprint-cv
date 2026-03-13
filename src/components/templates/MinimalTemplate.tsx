import { Phone, Mail, MapPin, Trophy } from "lucide-react";
import { cvData as defaultCvData } from "@/data/cvData";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="text-center mb-2 mt-4">
    <h2 className="font-oswald text-[15px] font-bold text-foreground tracking-wide">{children}</h2>
    <div className="h-[2px] bg-foreground/20 mt-1" />
  </div>
);

const MinimalTemplate = ({ formData }: { formData?: any }) => {
  const d = formData || defaultCvData;
  const contact = d.contact || { phone: d.phone, email: d.email, location: d.location, website: d.website };
  const { achievements = [], education = {}, experience = [], technicalSkills = "" } = d;

  return (
    <div className="a4-page bg-card px-8 py-6 flex flex-col text-foreground">
      <div className="text-center mb-1">
        <h1 className="font-oswald text-[28px] font-bold tracking-[0.15em] uppercase leading-none">{d.name}</h1>
        <p className="text-[11px] text-muted-foreground mt-0.5">{d.title}</p>
        <div className="flex items-center justify-center gap-2 mt-1.5 text-[9px] text-muted-foreground">
          <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{contact.phone}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><Mail className="w-3 h-3" />{contact.email}</span>
          <span>•</span>
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{contact.location}</span>
        </div>
      </div>

      <SectionTitle>Summary</SectionTitle>
      <p className="text-[8.5px] text-foreground/80 leading-[1.6] text-center">{d.summary}</p>

      <SectionTitle>Key Achievements</SectionTitle>
      <div className="grid grid-cols-3 gap-4 mt-1">
        {achievements.map((a: any) => (
          <div key={a.title} className="text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Trophy className="w-3.5 h-3.5 text-primary" />
              <span className="text-[9px] font-semibold">{a.title}</span>
            </div>
            <p className="text-[8px] text-muted-foreground leading-[1.4]">{a.description}</p>
          </div>
        ))}
      </div>

      <SectionTitle>Experience</SectionTitle>
      <div className="space-y-2.5 mt-1">
        {experience.map((exp: any) => (
          <div key={exp.org + exp.title}>
            <div className="flex items-baseline justify-between">
              <h3 className="text-[11px] font-oswald text-foreground/80">{exp.org}</h3>
              <span className="text-[8px] text-muted-foreground">{exp.location}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <h4 className="text-[9px] font-bold text-foreground">{exp.title}</h4>
              <span className="text-[8px] text-muted-foreground">{exp.period || "Date period"}</span>
            </div>
            {exp.bullets?.length > 0 && (
              <ul className="mt-0.5 space-y-0.5 pl-3">
                {exp.bullets.map((b: string, i: number) => (
                  <li key={i} className="text-[8px] text-foreground/70 leading-[1.5] list-disc">
                    {exp.highlight && b.includes("R1,000,000") ? (
                      <>{b.split("R1,000,000")[0]}<strong className="text-foreground font-bold">R1,000,000</strong>{b.split("R1,000,000")[1]}</>
                    ) : b}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <SectionTitle>Education</SectionTitle>
      <div className="mt-1">
        <div className="flex items-baseline justify-between">
          <h3 className="text-[11px] font-oswald text-foreground/80">{education.school}</h3>
          <span className="text-[8px] text-muted-foreground">{education.location}</span>
        </div>
        <div className="flex items-baseline justify-between">
          <h4 className="text-[9px] font-bold text-foreground">{education.degree}</h4>
          <span className="text-[8px] text-muted-foreground">{education.year}</span>
        </div>
        <ul className="mt-0.5 pl-3">
          <li className="text-[8px] text-foreground/70 leading-[1.5] list-disc">{education.focus}</li>
        </ul>
      </div>

      <SectionTitle>Skills</SectionTitle>
      <div className="mt-1">
        <p className="text-[8px] font-semibold text-foreground mb-0.5">Technical & Hardware Repair:</p>
        <p className="text-[8px] text-foreground/70 leading-[1.6]">{technicalSkills}</p>
      </div>
    </div>
  );
};

export default MinimalTemplate;
