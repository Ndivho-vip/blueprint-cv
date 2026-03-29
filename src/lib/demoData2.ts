import type { CVFormData } from "@/types/cv";

export const demoData2: CVFormData = {
  name: "Mulalo Maphangwa",
  title: "Teacher & Community Volunteer",
  tagline: "Dedicated educator and community builder committed to hygiene, safety, and positive societal impact.",
  targetJobId: "security-guard",
  targetCompany: "",
  phone: "+27 822299385",
  email: "mulalo94maphangwa@gmail.com",
  location: "Elim Hospital 0960, Limpopo, South Africa",
  website: "",
  summary:
    "Community-driven and highly professional individual with a commitment to ongoing professional development and self-improvement. A strong leader and multilingual communicator (English, Tshivenda, Tsonga), dedicated to positive societal impact, especially in the fields of education and community maintenance, cleanliness, and hygiene. Proven experience in both educational settings and community-oriented cleaning initiatives. Holds a PSiRA Grade C Certificate for the private security industry.",

  // SA Identity
  idNumber: "",
  gender: "Female",
  dateOfBirth: "",
  nationality: "South African",
  maritalStatus: "",
  driversLicense: "",
  ethnicity: "Black",
  healthStatus: "Good",
  criminalOffence: "None",
  homeLanguage: "Tshivenda",
  showIdentity: true,

  // Hobbies
  hobbies: [
    "Reading books",
    "Traveling",
    "Dancing",
    "Reading security industry publications",
    "Practicing physical fitness and self-defense",
  ],

  achievements: [
    { icon: "Trophy", title: "PSiRA Grade C Certificate", description: "Registered Security Service Provider (Reg: 4922244), valid until May 2027." },
    { icon: "Trophy", title: "CPTD Credits Earned", description: "Earned 15 Continuing Professional Teacher Development credits (2023)." },
    { icon: "Trophy", title: "Nelson Mandela Day Volunteer", description: "Key participant in Nelson Mandela Commemoration community initiatives." },
  ],

  hardSkills: [
    { label: "Basic Computer Skills", level: 70 },
    { label: "Cleaning & Hygiene Management", level: 90 },
    { label: "Security Operations (Grade C)", level: 75 },
    { label: "Painting & Maintenance", level: 80 },
    { label: "Play-Based Learning (Gr 1-3)", level: 85 },
  ],

  softSkills: ["Communication", "Teamwork", "Leadership", "Self-development", "Attention to Detail"],

  technicalSkills:
    "Microsoft Office Suite · Basic Computer Operations · Cleaning & Sanitation · Painting · Community Event Coordination · Classroom Management · Play-Based Learning Methodology",

  languages: [
    { name: "Tshivenda", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Tsonga", level: "Conversational" },
  ],

  education: [
    {
      degree: "National Senior Certificate",
      school: "Tshivhidzo Masiagwala Secondary School",
      year: "2011 – 2016",
      location: "Limpopo, South Africa",
      focus: "",
    },
    {
      degree: "Basic Computer Skills Certificate",
      school: "Avuxeni Computer Academy",
      year: "2019 – 2020",
      location: "Limpopo, South Africa",
      focus: "Computer literacy and office applications.",
    },
  ],

  experience: [
    {
      id: "1",
      title: "Teacher (Grade 1-3 Play-Based Learning)",
      org: "Education Sector",
      period: "2023",
      location: "Limpopo",
      bullets: [
        "Completed the Grade 1-3 Play-Based Learning Course, earning 15 CPTD credits.",
        "Applied play-based pedagogical methods to improve early childhood learning outcomes.",
        "Demonstrated dedication to ongoing professional growth within education.",
      ],
    },
    {
      id: "2",
      title: "Volunteer – Cleaning & Community",
      org: "Elim Hospital / Community",
      period: "2019",
      location: "Elim",
      highlight: true,
      bullets: [
        "Key volunteer in Nelson Mandela Commemoration event — cleaning, painting, and debussing.",
        "Maintained cleanliness and hygiene standards across community facilities.",
        "Passionate about creating clean, healthy environments for the community.",
      ],
    },
  ],

  references: [
    { name: "Available on Request", role: "", phone: "" },
  ],
};
