import { Briefcase, FolderOpen, Award } from "lucide-react";

const SectionHeader = ({ icon: Icon, title }: { icon: React.ElementType; title: string }) => (
  <div className="flex items-center gap-2 mb-2 border-b border-border pb-1">
    <Icon className="w-3.5 h-3.5 text-primary" />
    <h2 className="font-oswald text-[12px] font-bold uppercase tracking-[0.12em] text-foreground">
      {title}
    </h2>
  </div>
);

const TimelineItem = ({
  title,
  org,
  period,
  bullets,
  highlight,
}: {
  title: string;
  org: string;
  period: string;
  bullets: string[];
  highlight?: boolean;
}) => (
  <div className="mb-2.5 relative pl-3 border-l-2 border-primary/20 last:mb-0">
    <div className="absolute left-[-5px] top-[3px] w-2 h-2 rounded-full bg-primary" />
    <div className="flex items-baseline justify-between gap-2">
      <h4 className="text-[9.5px] font-semibold text-foreground leading-tight">{title}</h4>
      <span className="text-[7.5px] text-muted-foreground whitespace-nowrap font-medium">{period}</span>
    </div>
    <p className="text-[8px] text-primary font-medium">{org}</p>
    <ul className="mt-1 space-y-0.5">
      {bullets.map((b, i) => (
        <li key={i} className="text-[8px] text-muted-foreground leading-[1.4] flex gap-1">
          <span className="text-primary mt-[2px] shrink-0">›</span>
          <span>
            {highlight && b.includes("R1,000,000") ? (
              <>
                {b.split("R1,000,000")[0]}
                <strong className="text-foreground font-bold">R1,000,000</strong>
                {b.split("R1,000,000")[1]}
              </>
            ) : (
              b
            )}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

const CVMain = () => {
  return (
    <div className="px-5 py-5 bg-card h-full flex flex-col">
      {/* Header */}
      <div className="mb-3">
        <h1 className="font-oswald text-[28px] font-bold tracking-tight text-foreground leading-none">
          NDIVHO MUDAU
        </h1>
        <p className="text-[11px] font-semibold text-primary mt-0.5 tracking-wide uppercase">
          Hardware Technician & Software Developer
        </p>
        <p className="text-[8px] text-muted-foreground mt-1 italic leading-snug">
          "Specializing in POS Solutions, Mobile Hardware Architecture, and Reverse Engineering."
        </p>
      </div>

      {/* Professional Summary */}
      <div className="mb-3">
        <SectionHeader icon={FolderOpen} title="Professional Summary" />
        <p className="text-[8.5px] text-muted-foreground leading-[1.5]">
          Technically proficient Developer and Hardware Specialist with a proven track record in
          diagnosing complex mobile/PC hardware faults and developing custom software solutions.
          Founder of Geekaz Solutions, focusing on Point of Sale (POS) systems and administrative
          dashboards. Blends hands-on engineering skills with software logic to build practical
          business tools.
        </p>
      </div>

      {/* Work Experience */}
      <div className="mb-3 flex-1">
        <SectionHeader icon={Briefcase} title="Work Experience" />

        <TimelineItem
          title="Founder & Lead Technician"
          org="Geekaz Solutions"
          period="2024 – Present"
          bullets={[
            "Developing custom Point of Sale (POS) software for local businesses, focusing on inventory management and UI efficiency.",
            "Performing advanced hardware repairs, including bootloader unlocking, partition patching, and component-level fixes on Samsung and Dell devices.",
          ]}
        />

        <TimelineItem
          title="Robotics & Coding Assistant"
          org="Ozias Davhana Secondary"
          period="2023"
          highlight
          bullets={[
            "Mentored a student team in building and programming autonomous robots.",
            "Led the team to win a R1,000,000 voucher in a provincial school competition through strategic coding and design.",
          ]}
        />

        <TimelineItem
          title="Freelance ICT & Creative Assistant"
          org="Self-Employed"
          period="2022 – Present"
          bullets={[
            "Providing specialized technical support: OS cloning, driver troubleshooting, and network setup for community members.",
            "Designed digital media and managed video editing workflows for local youth programs.",
          ]}
        />
      </div>

      {/* Footer line */}
      <div className="border-t border-border pt-1.5 flex items-center gap-1.5">
        <Award className="w-3 h-3 text-primary" />
        <span className="text-[7px] text-muted-foreground uppercase tracking-widest">
          Built with precision — Geekaz Solutions
        </span>
      </div>
    </div>
  );
};

export default CVMain;
