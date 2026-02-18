import { Phone, Mail, MapPin, Globe } from "lucide-react";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-oswald text-[11px] font-bold uppercase tracking-[0.15em] text-primary mb-2 border-b border-sidebar-border pb-1">
    {children}
  </h3>
);

const SkillBar = ({ label, level }: { label: string; level: number }) => (
  <div className="mb-1.5">
    <span className="text-[8.5px] text-sidebar-foreground/90 block mb-0.5">{label}</span>
    <div className="w-full h-1 bg-sidebar-accent rounded-full overflow-hidden">
      <div
        className="h-full bg-primary rounded-full"
        style={{ width: `${level}%` }}
      />
    </div>
  </div>
);

const CVSidebar = () => {
  return (
    <div
      className="h-full px-4 py-5 text-sidebar-foreground flex flex-col gap-4"
      style={{ backgroundColor: "hsl(215, 25%, 18%)" }}
    >
      {/* Contact */}
      <div>
        <SectionTitle>Contact</SectionTitle>
        <div className="space-y-1.5 text-[8.5px]">
          <div className="flex items-center gap-2">
            <Phone className="w-3 h-3 text-primary shrink-0" />
            <span>079 888 9298</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3 h-3 text-primary shrink-0" />
            <span className="break-all">MRNDIVHO@GMAIL.COM</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3 h-3 text-primary shrink-0" />
            <span>Makhado, Limpopo</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe className="w-3 h-3 text-primary shrink-0" />
            <span>Geekaz Solutions</span>
          </div>
        </div>
      </div>

      {/* Hard Skills */}
      <div>
        <SectionTitle>Hard Skills</SectionTitle>
        <SkillBar label="Hardware Repair (Component Level)" level={95} />
        <SkillBar label="Mobile Rooting & Unlocking (ADB/Fastboot)" level={90} />
        <SkillBar label="POS System Architecture" level={85} />
        <SkillBar label="Reverse Engineering (.exe/APK)" level={80} />
        <SkillBar label="Soldering & Circuit Diagnostics" level={90} />
      </div>

      {/* Soft Skills */}
      <div>
        <SectionTitle>Soft Skills</SectionTitle>
        <div className="space-y-1 text-[8.5px]">
          {["Technical Leadership", "Complex Problem Solving", "Strategic Planning"].map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div>
        <SectionTitle>Languages</SectionTitle>
        <div className="text-[8.5px] space-y-0.5">
          <div className="flex justify-between">
            <span>Tshivenda</span>
            <span className="text-sidebar-foreground/60">Native</span>
          </div>
          <div className="flex justify-between">
            <span>English</span>
            <span className="text-sidebar-foreground/60">Professional</span>
          </div>
        </div>
      </div>

      {/* Education */}
      <div>
        <SectionTitle>Education</SectionTitle>
        <div className="text-[8.5px]">
          <p className="font-semibold text-[9px]">National Senior Certificate</p>
          <p className="text-sidebar-foreground/70">Ozias Davhana Secondary School</p>
          <p className="text-sidebar-foreground/50 text-[7.5px] mt-0.5">2022</p>
          <p className="text-sidebar-foreground/70 mt-0.5">
            Focus: Mathematical Literacy, Life Sciences, English.
          </p>
        </div>
      </div>

      {/* References */}
      <div>
        <SectionTitle>References</SectionTitle>
        <div className="text-[8.5px]">
          <p className="font-semibold">Lucky Mashele</p>
          <p className="text-sidebar-foreground/60">Community Leader</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Phone className="w-2.5 h-2.5 text-primary" />
            <span>071 154 4103</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVSidebar;
