import { cvData as defaultCvData } from "@/data/cvData";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-5 mb-2">
    <h2 className="text-[13px] font-bold text-foreground underline underline-offset-4 tracking-wide uppercase">
      {children}
    </h2>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div className="flex text-[10px] leading-[2] pl-8">
      <span className="w-[160px] text-foreground/80 shrink-0">{label}</span>
      <span className="text-foreground">: {value}</span>
    </div>
  );
};

const FormalTemplate = ({ formData }: { formData?: any }) => {
  const d = formData || defaultCvData;
  const contact = d.contact || { phone: d.phone, email: d.email, location: d.location };
  const {
    achievements = [], education = {}, experience = [],
    technicalSkills = "", hobbies = [], references = [],
    hardSkills = [], softSkills = [], languages = [],
  } = d;

  const allSkills = [
    ...hardSkills.map((s: any) => s.label),
    ...softSkills,
  ];

  return (
    <div className="a4-page bg-card px-10 py-8 flex flex-col text-foreground font-serif">
      {/* Header */}
      <div className="text-center mb-4 border-y border-foreground/30 py-2">
        <h1 className="text-[16px] font-bold tracking-[0.2em] uppercase">
          CURRICULUM VITAE OF: {d.name}
        </h1>
      </div>

      {/* Personal Details */}
      {d.showIdentity !== false && (
        <>
          <SectionTitle>Personal Details</SectionTitle>
          <div>
            {d.name && (() => {
              const parts = d.name.trim().split(/\s+/);
              const surname = parts[0] || "";
              const firstNames = parts.slice(1).join(" ") || "";
              return (
                <>
                  <DetailRow label="Surname" value={surname} />
                  <DetailRow label="First Names" value={firstNames} />
                </>
              );
            })()}
            <DetailRow label="Date of birth" value={d.dateOfBirth} />
            <DetailRow label="ID Number" value={d.idNumber} />
            <DetailRow label="Nationality" value={d.nationality} />
            <DetailRow label="Gender" value={d.gender} />
            <DetailRow label="Health status" value={d.healthStatus || "Excellent"} />
            <DetailRow label="Marital status" value={d.maritalStatus} />
            <DetailRow label="Home language" value={languages?.[0]?.name} />
            <DetailRow label="Criminal offence" value={d.criminalOffence || "None"} />
            <DetailRow label="Driver's licence" value={d.driversLicense} />
            <DetailRow label="Ethnicity" value={d.ethnicity} />
            {hobbies.length > 0 && (
              <DetailRow label="Hobbies" value={hobbies.join(", ")} />
            )}
          </div>
        </>
      )}

      {/* Contact Details */}
      <SectionTitle>Contact Details</SectionTitle>
      <div>
        <DetailRow label="Contact number" value={contact.phone} />
        <DetailRow label="Email address" value={contact.email} />
        {contact.location && <DetailRow label="Address" value={contact.location} />}
      </div>

      {/* Summary */}
      {d.summary && (
        <>
          <SectionTitle>Professional Profile</SectionTitle>
          <p className="text-[10px] text-foreground/80 leading-[1.8] pl-8">{d.summary}</p>
        </>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-3">
            {experience.map((exp: any, idx: number) => (
              <div key={idx}>
                <p className="text-[11px] pl-0">
                  <span className="font-bold">{exp.title}</span>
                  <span className="text-foreground/70"> – {exp.org}{exp.period ? `, ${exp.period}` : ""}</span>
                </p>
                {exp.bullets?.length > 0 && (
                  <p className="text-[10px] text-foreground/80 leading-[1.8] pl-8 mt-0.5">
                    {exp.bullets.join(" ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Education */}
      <SectionTitle>Educational Background</SectionTitle>
      <div className="mt-1">
        <h3 className="text-[11px] font-bold underline underline-offset-2 pl-0 mb-1">
          Secondary education
        </h3>
        <DetailRow label="Name of school" value={education.school} />
        <DetailRow label="Highest grade passed" value={education.degree} />
        <DetailRow label="Subjects" value={education.focus} />
        <DetailRow label="Year obtained" value={education.year} />
      </div>

      {/* Skills */}
      {allSkills.length > 0 && (
        <>
          <SectionTitle>Skills</SectionTitle>
          <p className="text-[10px] text-foreground/80 leading-[1.8] pl-8">
            {allSkills.join(" · ")}
          </p>
        </>
      )}

      {/* Technical Skills */}
      {technicalSkills && (
        <>
          <SectionTitle>Technical Skills</SectionTitle>
          <p className="text-[10px] text-foreground/80 leading-[1.8] pl-8">{technicalSkills}</p>
        </>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <>
          <SectionTitle>Languages</SectionTitle>
          <div className="pl-8">
            {languages.map((l: any) => (
              <DetailRow key={l.name} label={l.name} value={l.level} />
            ))}
          </div>
        </>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <>
          <SectionTitle>Achievements</SectionTitle>
          <div className="pl-8 space-y-0.5">
            {achievements.map((a: any) => (
              <p key={a.title} className="text-[10px] text-foreground/80 leading-[1.8]">
                <span className="font-semibold">{a.title}</span> – {a.description}
              </p>
            ))}
          </div>
        </>
      )}

      {/* References */}
      {references.length > 0 && (
        <>
          <SectionTitle>References</SectionTitle>
          <div className="space-y-2">
            {references.map((r: any) => (
              <div key={r.name}>
                <p className="text-[10px] font-semibold pl-0">{r.name}</p>
                <DetailRow label="Position" value={r.role} />
                <DetailRow label="Contacts" value={r.phone} />
              </div>
            ))}
          </div>
        </>
      )}

      {/* Next of Kin */}
      {d.nextOfKinName && (
        <>
          <div className="mt-5 mb-2">
            <h2 className="text-[13px] font-bold text-foreground tracking-wide uppercase">
              Next of Kin
            </h2>
          </div>
          <div>
            <p className="text-[10px] font-semibold pl-0">{d.nextOfKinName}</p>
            <DetailRow label="Relationship" value={d.nextOfKinRelationship} />
            <DetailRow label="Contacts" value={d.nextOfKinPhone} />
          </div>
        </>
      )}

      {/* Declaration */}
      <div className="mt-auto pt-6">
        <p className="text-[9px] text-foreground/60 leading-[1.8] italic">
          I hereby declare that the information provided in this CV is true, complete, and accurate to the
          best of my knowledge. I understand that any false statements or omissions may result in
          disqualification from the recruitment process or termination of employment.
        </p>
        <p className="text-[10px] text-foreground/60 mt-4">Signature: .......................................</p>
      </div>
    </div>
  );
};

export default FormalTemplate;
