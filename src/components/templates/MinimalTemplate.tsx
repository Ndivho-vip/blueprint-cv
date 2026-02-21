import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { cvData } from "@/data/cvData";

const MinimalTemplate = () => {
  const { contact, hardSkills, softSkills, languages, education, experience, references } = cvData;

  return (
    <div className="a4-page bg-card px-10 py-8 flex flex-col">
      {/* Header - centered, clean */}
      <div className="text-center mb-5 pb-4 border-b-2 border-foreground">
        <h1 className="font-oswald text-[32px] font-bold tracking-[0.2em] text-foreground uppercase leading-none">
          {cvData.name}
        </h1>
        <p className="text-[10px] text-muted-foreground mt-1 tracking-[0.3em] uppercase">{cvData.title}</p>
        <div className="flex items-center justify-center gap-4 mt-3 text-[8px] text-muted-foreground">
          <span className="flex items-center gap-1"><Phone className="w-2.5 h-2.5" />{contact.phone}</span>
          <span className="flex items-center gap-1"><Mail className="w-2.5 h-2.5" />{contact.email}</span>
          <span className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{contact.location}</span>
          <span className="flex items-center gap-1"><Globe className="w-2.5 h-2.5" />{contact.website}</span>
        </div>
      </div>

      {/* Summary */}
      <div className="mb-4">
        <p className="text-[8.5px] text-muted-foreground leading-[1.6] text-center italic">"{cvData.tagline}"</p>
        <p className="text-[8.5px] text-foreground/80 leading-[1.6] mt-2">{cvData.summary}</p>
      </div>

      {/* Experience */}
      <div className="mb-4 flex-1">
        <h2 className="font-oswald text-[11px] font-bold uppercase tracking-[0.2em] text-foreground mb-2 border-b border-border pb-1">
          Experience
        </h2>
        {experience.map((exp) => (
          <div key={exp.title} className="mb-3 last:mb-0">
            <div className="flex items-baseline justify-between">
              <h4 className="text-[9.5px] font-semibold text-foreground">{exp.title}</h4>
              <span className="text-[7.5px] text-muted-foreground">{exp.period}</span>
            </div>
            <p className="text-[8px] text-muted-foreground italic">{exp.org}</p>
            <ul className="mt-1 space-y-0.5">
              {exp.bullets.map((b, i) => (
                <li key={i} className="text-[8px] text-foreground/70 leading-[1.4] pl-2 border-l border-muted-foreground/30">
                  {exp.highlight && b.includes("R1,000,000") ? (
                    <>{b.split("R1,000,000")[0]}<strong className="text-foreground font-bold">R1,000,000</strong>{b.split("R1,000,000")[1]}</>
                  ) : b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Two-column bottom section */}
      <div className="grid grid-cols-2 gap-6 border-t border-border pt-3">
        <div>
          <h2 className="font-oswald text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-1.5">Skills</h2>
          <div className="space-y-0.5 text-[8px] text-foreground/70">
            {hardSkills.map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-foreground/40 shrink-0" />
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 space-y-0.5 text-[8px] text-foreground/70">
            {softSkills.map((s) => (
              <div key={s} className="flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-foreground/20 shrink-0" />
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="font-oswald text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-1.5">Education</h2>
          <div className="text-[8px] text-foreground/70">
            <p className="font-semibold text-foreground">{education.degree}</p>
            <p>{education.school} — {education.year}</p>
            <p className="mt-0.5">Focus: {education.focus}</p>
          </div>

          <h2 className="font-oswald text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mt-3 mb-1.5">Languages</h2>
          <div className="text-[8px] text-foreground/70 space-y-0.5">
            {languages.map((l) => (
              <div key={l.name} className="flex justify-between">
                <span>{l.name}</span>
                <span className="text-muted-foreground">{l.level}</span>
              </div>
            ))}
          </div>

          <h2 className="font-oswald text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mt-3 mb-1.5">References</h2>
          {references.map((r) => (
            <div key={r.name} className="text-[8px] text-foreground/70">
              <span className="font-semibold text-foreground">{r.name}</span> — {r.role} — {r.phone}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MinimalTemplate;
