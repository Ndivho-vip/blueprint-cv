import { Phone, Mail, MapPin, Globe, Zap, GraduationCap, Users } from "lucide-react";
import { cvData } from "@/data/cvData";

const BoldTemplate = () => {
  const { contact, hardSkills, softSkills, languages, education, experience, references } = cvData;

  return (
    <div className="a4-page bg-foreground text-card-foreground overflow-hidden flex flex-col">
      {/* Bold header band */}
      <div className="px-7 py-5" style={{ background: "hsl(224, 76%, 53%)" }}>
        <h1 className="font-oswald text-[34px] font-bold tracking-tight text-primary-foreground leading-none">
          {cvData.name}
        </h1>
        <p className="text-[11px] text-primary-foreground/80 mt-1 font-medium tracking-wide uppercase">
          {cvData.title}
        </p>
        <div className="flex gap-4 mt-3 text-[8px] text-primary-foreground/70">
          <span className="flex items-center gap-1"><Phone className="w-2.5 h-2.5" />{contact.phone}</span>
          <span className="flex items-center gap-1"><Mail className="w-2.5 h-2.5" />{contact.email}</span>
          <span className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5" />{contact.location}</span>
          <span className="flex items-center gap-1"><Globe className="w-2.5 h-2.5" />{contact.website}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 bg-card px-7 py-4 flex flex-col">
        {/* Summary */}
        <div className="mb-4 bg-muted rounded p-3">
          <p className="text-[8.5px] text-foreground/80 leading-[1.6]">{cvData.summary}</p>
        </div>

        {/* Experience */}
        <div className="mb-4 flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-3.5 h-3.5 text-primary" />
            <h2 className="font-oswald text-[12px] font-bold uppercase tracking-[0.12em] text-foreground">
              Experience
            </h2>
          </div>

          {experience.map((exp) => (
            <div key={exp.title} className="mb-3 last:mb-0 pl-4 border-l-[3px] border-primary">
              <div className="flex items-baseline justify-between">
                <h4 className="text-[9.5px] font-bold text-foreground">{exp.title}</h4>
                <span className="text-[7.5px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded-sm font-medium">
                  {exp.period}
                </span>
              </div>
              <p className="text-[8px] text-primary font-semibold">{exp.org}</p>
              <ul className="mt-1 space-y-0.5">
                {exp.bullets.map((b, i) => (
                  <li key={i} className="text-[8px] text-muted-foreground leading-[1.4] flex gap-1">
                    <span className="text-primary font-bold shrink-0">▸</span>
                    <span>
                      {exp.highlight && b.includes("R1,000,000") ? (
                        <>{b.split("R1,000,000")[0]}<strong className="text-foreground font-bold">R1,000,000</strong>{b.split("R1,000,000")[1]}</>
                      ) : b}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-3 gap-4 border-t border-border pt-3">
          <div>
            <h3 className="font-oswald text-[10px] font-bold uppercase text-foreground mb-1.5 flex items-center gap-1">
              <Zap className="w-2.5 h-2.5 text-primary" /> Hard Skills
            </h3>
            {hardSkills.map((s) => (
              <div key={s.label} className="mb-1">
                <div className="flex justify-between text-[7.5px]">
                  <span className="text-foreground/80">{s.label}</span>
                  <span className="text-primary font-bold">{s.level}%</span>
                </div>
                <div className="w-full h-1 bg-muted rounded-full mt-0.5">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${s.level}%` }} />
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="font-oswald text-[10px] font-bold uppercase text-foreground mb-1.5 flex items-center gap-1">
              <GraduationCap className="w-2.5 h-2.5 text-primary" /> Education
            </h3>
            <div className="text-[8px] text-foreground/70">
              <p className="font-semibold text-foreground">{education.degree}</p>
              <p>{education.school}</p>
              <p className="text-muted-foreground text-[7.5px] mt-0.5">{education.year}</p>
              <p className="mt-0.5">Focus: {education.focus}</p>
            </div>
            <h3 className="font-oswald text-[10px] font-bold uppercase text-foreground mt-2.5 mb-1 flex items-center gap-1">
              Languages
            </h3>
            <div className="text-[8px] space-y-0.5">
              {languages.map((l) => (
                <div key={l.name} className="flex justify-between text-foreground/70">
                  <span>{l.name}</span><span className="text-muted-foreground">{l.level}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-oswald text-[10px] font-bold uppercase text-foreground mb-1.5 flex items-center gap-1">
              Soft Skills
            </h3>
            <div className="space-y-1 text-[8px]">
              {softSkills.map((s) => (
                <div key={s} className="bg-primary/10 text-primary px-2 py-0.5 rounded text-center font-medium">{s}</div>
              ))}
            </div>
            <h3 className="font-oswald text-[10px] font-bold uppercase text-foreground mt-2.5 mb-1 flex items-center gap-1">
              <Users className="w-2.5 h-2.5 text-primary" /> References
            </h3>
            {references.map((r) => (
              <div key={r.name} className="text-[8px] text-foreground/70">
                <p className="font-semibold text-foreground">{r.name}</p>
                <p>{r.role} — {r.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoldTemplate;
