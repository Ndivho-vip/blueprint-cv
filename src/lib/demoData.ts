import type { CVFormData } from "@/types/cv";

export const demoData: CVFormData = {
  name: "MUDAU NDIVHO",
  title: "Founder & Lead Technician",
  tagline: "Specializing in POS Solutions, Mobile Hardware Architecture, and Reverse Engineering.",
  phone: "+27798889298",
  email: "MRNDIVHO@GMAIL.COM",
  location: "Makhado, Limpopo, South Africa",
  website: "Geekaz Solutions",
  summary:
    "Technically proficient Developer and Hardware Specialist with a proven track record in diagnosing complex mobile/PC hardware faults and developing custom software solutions. Founder of Geekaz Solutions, focusing on Point of Sale (POS) systems and administrative dashboards. Blends hands-on engineering skills with software logic to build practical business tools.",
  achievements: [
    { icon: "Trophy", title: "Successful Business Venture", description: "Founded and managed IT business" },
    { icon: "Trophy", title: "Robotics Competition Win", description: "Led team to win R1,000,000 school competition prize." },
    { icon: "Trophy", title: "Point Of Sale Success", description: "Developed POS systems reducing inventory errors by 30%." },
  ],
  hardSkills: [
    { label: "Hardware Repair (Component Level)", level: 95 },
    { label: "Mobile Rooting & Unlocking (ADB/Fastboot)", level: 90 },
    { label: "POS System Architecture", level: 85 },
    { label: "Reverse Engineering (.exe/APK)", level: 80 },
    { label: "Soldering & Circuit Diagnostics", level: 90 },
  ],
  softSkills: ["Technical Leadership", "Complex Problem Solving", "Strategic Planning"],
  technicalSkills:
    "Microsoft Office Suite · Digital Literacy · Troubleshooting Windows 10/11 · Virus Removal · PC Repair · Mobile Phone Repair · Screen Replacement · Phone Unlocking · Rooting · FRP Bypass · Firmware Flashing · Python · C++ · Graphic Design · Network Setup",
  languages: [
    { name: "Tshivenda", level: "Native" },
    { name: "English", level: "Professional" },
  ],
  education: {
    degree: "National Senior Certificate (Grade 12)",
    school: "Ozias Davhana Secondary School",
    year: "2022",
    location: "Limpopo, South Africa",
    focus: "Major Subjects: Mathematical Literacy, Life Sciences, English.",
  },
  experience: [
    {
      id: "1",
      title: "Founder & Lead Technician",
      org: "Geekaz Solutions",
      period: "2024 – Present",
      location: "Makhado",
      bullets: [
        "Developing custom POS software for local businesses, focusing on inventory management and UI efficiency.",
        "Performing advanced hardware repairs including bootloader unlocking and component-level fixes.",
        "Repairing smartphones and computers for community members.",
      ],
    },
    {
      id: "2",
      title: "Robotics & Coding Assistant",
      org: "Ozias Davhana Secondary School",
      period: "2023",
      location: "Limpopo",
      highlight: true,
      bullets: [
        "Mentored a student team in building and programming autonomous robots.",
        "Led the team to win a R1,000,000 voucher in a provincial school competition.",
      ],
    },
    {
      id: "3",
      title: "Freelance ICT & Creative Assistant",
      org: "Freelance Projects",
      period: "2022 – Present",
      location: "Limpopo",
      bullets: [
        "Providing specialized technical support: OS cloning, driver troubleshooting, and network setup.",
        "Designed digital media and managed video editing workflows for local youth programs.",
      ],
    },
    {
      id: "4",
      title: "Digital Support",
      org: "Self Employed",
      period: "2022",
      location: "",
      bullets: [
        "Assisting elders and youth with setting up smartphones (WhatsApp, Banking Apps).",
        "Teaching people how to use the internet safely and access learning websites.",
      ],
    },
  ],
  references: [{ name: "Lucky Mashele", role: "Community Leader", phone: "071 154 4103" }],
};
