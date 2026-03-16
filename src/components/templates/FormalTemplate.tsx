import { cvData as defaultCvData } from "@/data/cvData";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-6 mb-2 page-break-inside-avoid">
    <h2 className="text-[13px] font-bold text-foreground underline underline-offset-4 tracking-wide uppercase">
      {children}
    </h2>
  </div>
);

const DetailRow = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div className="flex text-[11px] leading-[2.2] pl-8">
      <span className="w-[180px] text-foreground/80 shrink-0">{label}</span>
      <span className="text-foreground">: {value}</span>
    </div>
  );
};

const FormalTemplate = ({ formData }: { formData?: any }) => {
  const d = formData || defaultCvData;
  const contact = d.contact || { phone: d.phone, email: d.email, location: d.location };
  const {
    achievements = [], experience = [],
    technicalSkills = "", hobbies = [], references = [],
    hardSkills = [], softSkills = [], languages = [],
  } = d;
  const educationList = Array.isArray(d.education) ? d.education : d.education ? [d.education] : [];

  const allSkills = [
    ...hardSkills.map((s: any) => s.label),
    ...softSkills,
  ];

  return (
    <div className="a4-multipage bg-card px-12 py-10 flex flex-col text-foreground" style={{ fontFamily: "'Times New Roman', 'Georgia', serif" }}>
      {/* Header */}
      <div className="text-center mb-6 border-y border-foreground/30 py-3">
        <h1 className="text-[16px] font-bold tracking-[0.25em] uppercase">
          CURRICULUM VITAE OF: {d.name}
        </h1>
      </div>

      {/* Personal Details */}
      {d.showIdentity !== false && (
        <div className="page-break-inside-avoid">
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
        </div>
      )}

      {/* Contact Details */}
      <div className="page-break-inside-avoid">
        <SectionTitle>Contact Details</SectionTitle>
        <div>
          <DetailRow label="Contact number" value={contact.phone} />
          <DetailRow label="Email address" value={contact.email} />
          {contact.location && <DetailRow label="Address" value={contact.location} />}
        </div>
      </div>

      {/* Summary */}
      {d.summary && (
        <div className="page-break-inside-avoid">
          <SectionTitle>Professional Profile</SectionTitle>
          <p className="text-[11px] text-foreground/80 leading-[1.9] pl-0">{d.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <>
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-4">
            {experience.map((exp: any, idx: number) => (
              <div key={idx} className="page-break-inside-avoid">
                <p className="text-[12px]">
                  <span className="font-bold">{exp.title}</span>
                  <span className="text-foreground/70"> – {exp.org}{exp.period ? `, ${exp.period}` : ""}</span>
                </p>
                {exp.bullets?.length > 0 && (
                  <p className="text-[11px] text-foreground/80 leading-[1.9] mt-1">
                    {exp.bullets.join(" ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Education */}
      <div className="page-break-inside-avoid">
        <SectionTitle>Educational Background</SectionTitle>
        <div className="mt-2">
          <h3 className="text-[12px] font-bold underline underline-offset-2 mb-2">
            Secondary education
          </h3>
          <DetailRow label="Name of school" value={education.school} />
          <DetailRow label="Highest grade passed" value={education.degree} />
          <DetailRow label="Subjects" value={education.focus} />
          <div className="text-[11px] leading-[2.2] pl-0 mt-1">
            <span className="font-bold">Year obtained: {education.year}</span>
          </div>
        </div>
      </div>

      {/* Skills */}
      {allSkills.length > 0 && (
        <div className="page-break-inside-avoid">
          <SectionTitle>Skills</SectionTitle>
          <p className="text-[11px] text-foreground/80 leading-[1.9]">
            {allSkills.join(" · ")}
          </p>
        </div>
      )}

      {/* Technical Skills */}
      {technicalSkills && (
        <div className="page-break-inside-avoid">
          <SectionTitle>Technical Skills</SectionTitle>
          <p className="text-[11px] text-foreground/80 leading-[1.9]">{technicalSkills}</p>
        </div>
      )}

      {/* Languages */}
      {languages.length > 0 && (
        <div className="page-break-inside-avoid">
          <SectionTitle>Languages</SectionTitle>
          <div>
            {languages.map((l: any) => (
              <DetailRow key={l.name} label={l.name} value={l.level} />
            ))}
          </div>
        </div>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <div className="page-break-inside-avoid">
          <SectionTitle>Achievements</SectionTitle>
          <div className="space-y-0.5">
            {achievements.map((a: any) => (
              <p key={a.title} className="text-[11px] text-foreground/80 leading-[1.9]">
                <span className="font-semibold">{a.title}</span> – {a.description}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* References */}
      {references.length > 0 && (
        <div className="page-break-inside-avoid">
          <SectionTitle>References</SectionTitle>
          <div className="space-y-3">
            {references.map((r: any) => (
              <div key={r.name}>
                <p className="text-[11px] font-semibold">{r.name}</p>
                <DetailRow label="Position" value={r.role} />
                <DetailRow label="Contacts" value={r.phone} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next of Kin */}
      {d.nextOfKinName && (
        <div className="page-break-inside-avoid">
          <div className="mt-6 mb-2">
            <h2 className="text-[13px] font-bold text-foreground tracking-wide uppercase">
              Next of Kin
            </h2>
          </div>
          <div>
            <p className="text-[11px] font-semibold">{d.nextOfKinName}</p>
            <DetailRow label="Relationship" value={d.nextOfKinRelationship} />
            <DetailRow label="Contacts" value={d.nextOfKinPhone} />
          </div>
        </div>
      )}

      {/* Declaration */}
      <div className="mt-8 pt-4 page-break-inside-avoid">
        <p className="text-[10px] text-foreground/70 leading-[1.9]">
          I hereby declare that the information provided in this CV is true, complete, and accurate to the
          best of my knowledge. I understand that any false statements or omissions may result in
          disqualification from the recruitment process or termination of employment.
        </p>
        <p className="text-[11px] text-foreground/70 mt-6">Signature: .......................................</p>
      </div>
    </div>
  );
};

export default FormalTemplate;
