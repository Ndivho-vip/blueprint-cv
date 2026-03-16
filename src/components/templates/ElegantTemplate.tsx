import { Phone, Mail, MapPin, Globe } from "lucide-react";
import { cvData as defaultCvData } from "@/data/cvData";

const ElegantTemplate = ({ formData }: { formData?: any }) => {
  const d = formData || defaultCvData;
  const contact = d.contact || { phone: d.phone, email: d.email, location: d.location, website: d.website };
  const { hardSkills = [], softSkills = [], languages = [], experience = [], references = [] } = d;
  const educationList = Array.isArray(d.education) ? d.education : d.education ? [d.education] : [];

  return (
    <div className="a4-page bg-card grid grid-cols-[65%_35%]">
      <div className="px-6 py-6 flex flex-col border-r border-border">
        <div className="mb-4">
          <p className="text-[9px] text-primary font-semibold uppercase tracking-[0.4em] mb-1">Curriculum Vitae</p>
          <h1 className="font-oswald text-[30px] font-bold text-foreground leading-none tracking-tight">{d.name}</h1>
          <div className="w-12 h-[2px] bg-primary mt-2" />
          <p className="text-[10px] text-muted-foreground mt-2 tracking-wide">{d.title}</p>
        </div>

        <div className="mb-4">
          <h2 className="font-oswald text-[11px] font-bold uppercase tracking-[0.15em] text-foreground mb-1.5">Profile</h2>
          <p className="text-[8.5px] text-muted-foreground leading-[1.6]">{d.summary}</p>
        </div>

        <div className="flex-1">
          <h2 className="font-oswald text-[11px] font-bold uppercase tracking-[0.15em] text-foreground mb-2">Experience</h2>
          {experience.map((exp: any, idx: number) => (
            <div key={exp.title + exp.org} className="mb-3 last:mb-0">
              <div className="flex items-center gap-2 mb-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <h4 className="text-[9.5px] font-semibold text-foreground">{exp.title}</h4>
              </div>
              <div className="ml-4">
                <div className="flex items-baseline justify-between">
                  <p className="text-[8px] text-primary font-medium italic">{exp.org}</p>
                  <span className="text-[7.5px] text-muted-foreground">{exp.period}</span>
                </div>
                <ul className="mt-1 space-y-0.5">
                  {(exp.bullets || []).map((b: string, i: number) => (
                    <li key={i} className="text-[8px] text-muted-foreground leading-[1.4]">
                      <span className="text-primary mr-1">—</span>
                      {exp.highlight && b.includes("R1,000,000") ? (<>{b.split("R1,000,000")[0]}<strong className="text-foreground font-bold">R1,000,000</strong>{b.split("R1,000,000")[1]}</>) : b}
                    </li>
                  ))}
                </ul>
              </div>
              {idx < experience.length - 1 && <div className="border-b border-border/50 mt-2.5" />}
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 py-6 bg-muted flex flex-col gap-4">
        <div>
          <h3 className="font-oswald text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-2">Contact</h3>
          <div className="space-y-1.5 text-[8px] text-foreground/70">
            <div className="flex items-center gap-2"><Phone className="w-2.5 h-2.5 text-primary" /><span>{contact.phone}</span></div>
            <div className="flex items-center gap-2"><Mail className="w-2.5 h-2.5 text-primary" /><span className="break-all">{contact.email}</span></div>
            <div className="flex items-center gap-2"><MapPin className="w-2.5 h-2.5 text-primary" /><span>{contact.location}</span></div>
            <div className="flex items-center gap-2"><Globe className="w-2.5 h-2.5 text-primary" /><span>{contact.website}</span></div>
          </div>
        </div>

        <div>
          <h3 className="font-oswald text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-2">Expertise</h3>
          {hardSkills.map((s: any) => (
            <div key={s.label} className="mb-1.5">
              <span className="text-[7.5px] text-foreground/70 block mb-0.5">{s.label}</span>
              <div className="flex gap-[2px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`h-1 flex-1 rounded-sm ${i < Math.round(s.level / 20) ? "bg-primary" : "bg-border"}`} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h3 className="font-oswald text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-1.5">Qualities</h3>
          <div className="space-y-1 text-[8px] text-foreground/70">
            {softSkills.map((s: string) => (
              <div key={s} className="flex items-center gap-1.5"><div className="w-1 h-1 bg-primary shrink-0" /><span>{s}</span></div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-oswald text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-1.5">Languages</h3>
          <div className="text-[8px] text-foreground/70 space-y-0.5">
            {languages.map((l: any) => (<div key={l.name} className="flex justify-between"><span>{l.name}</span><span className="text-muted-foreground">{l.level}</span></div>))}
          </div>
        </div>

        <div>
          <h3 className="font-oswald text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-1.5">Education</h3>
          <div className="text-[8px] text-foreground/70">
            <p className="font-semibold text-foreground text-[8.5px]">{education.degree}</p>
            <p>{education.school}</p>
            <p className="text-muted-foreground text-[7.5px] mt-0.5">{education.year}</p>
            <p className="mt-0.5">Focus: {education.focus}</p>
          </div>
        </div>

        <div>
          <h3 className="font-oswald text-[10px] font-bold uppercase tracking-[0.2em] text-foreground mb-1.5">References</h3>
          {references.map((r: any) => (
            <div key={r.name} className="text-[8px] text-foreground/70">
              <p className="font-semibold text-foreground">{r.name}</p>
              <p>{r.role}</p>
              <div className="flex items-center gap-1 mt-0.5"><Phone className="w-2 h-2 text-primary" /><span>{r.phone}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElegantTemplate;
