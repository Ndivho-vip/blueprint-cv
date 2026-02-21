export const cvData = {
  name: "NDIVHO MUDAU",
  title: "Hardware Technician & Software Developer",
  tagline:
    "Specializing in POS Solutions, Mobile Hardware Architecture, and Reverse Engineering.",

  contact: {
    phone: "079 888 9298",
    email: "MRNDIVHO@GMAIL.COM",
    location: "Makhado, Limpopo",
    website: "Geekaz Solutions",
  },

  summary:
    "Technically proficient Developer and Hardware Specialist with a proven track record in diagnosing complex mobile/PC hardware faults and developing custom software solutions. Founder of Geekaz Solutions, focusing on Point of Sale (POS) systems and administrative dashboards. Blends hands-on engineering skills with software logic to build practical business tools.",

  hardSkills: [
    { label: "Hardware Repair (Component Level)", level: 95 },
    { label: "Mobile Rooting & Unlocking (ADB/Fastboot)", level: 90 },
    { label: "POS System Architecture", level: 85 },
    { label: "Reverse Engineering (.exe/APK)", level: 80 },
    { label: "Soldering & Circuit Diagnostics", level: 90 },
  ],

  softSkills: [
    "Technical Leadership",
    "Complex Problem Solving",
    "Strategic Planning",
  ],

  languages: [
    { name: "Tshivenda", level: "Native" },
    { name: "English", level: "Professional" },
  ],

  education: {
    degree: "National Senior Certificate",
    school: "Ozias Davhana Secondary School",
    year: "2022",
    focus: "Mathematical Literacy, Life Sciences, English.",
  },

  experience: [
    {
      title: "Founder & Lead Technician",
      org: "Geekaz Solutions",
      period: "2024 – Present",
      bullets: [
        "Developing custom Point of Sale (POS) software for local businesses, focusing on inventory management and UI efficiency.",
        "Performing advanced hardware repairs, including bootloader unlocking, partition patching, and component-level fixes on Samsung and Dell devices.",
      ],
    },
    {
      title: "Robotics & Coding Assistant",
      org: "Ozias Davhana Secondary",
      period: "2023",
      highlight: true,
      bullets: [
        "Mentored a student team in building and programming autonomous robots.",
        "Led the team to win a R1,000,000 voucher in a provincial school competition through strategic coding and design.",
      ],
    },
    {
      title: "Freelance ICT & Creative Assistant",
      org: "Self-Employed",
      period: "2022 – Present",
      bullets: [
        "Providing specialized technical support: OS cloning, driver troubleshooting, and network setup for community members.",
        "Designed digital media and managed video editing workflows for local youth programs.",
      ],
    },
  ],

  references: [
    {
      name: "Lucky Mashele",
      role: "Community Leader",
      phone: "071 154 4103",
    },
  ],
};

export type CVData = typeof cvData;
