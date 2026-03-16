// Built-in job role presets that drive smart suggestions across the app

export interface JobRole {
  id: string;
  label: string;
  category: string;
  hardSkills: string[];
  softSkills: string[];
  responsibilities: string[];
  keywords: string[]; // ATS keywords
}

export const JOB_CATEGORIES = [
  "IT / Tech",
  "Admin / Office",
  "Trade / Hands-on",
  "Creative / Design",
  "Sales / Retail",
  "Hospitality / Food",
  "Healthcare",
  "Education",
  "Finance / Accounting",
  "Security / Law",
] as const;

export const JOB_ROLES: JobRole[] = [
  // IT / Tech
  {
    id: "it-technician",
    label: "IT Technician",
    category: "IT / Tech",
    hardSkills: ["Hardware Repair", "Troubleshooting", "Network Setup", "Windows OS", "Software Installation", "Virus Removal", "Data Recovery", "Printer Setup"],
    softSkills: ["Problem Solving", "Patience", "Communication", "Attention to Detail"],
    responsibilities: [
      "Diagnosed and resolved hardware and software issues for clients",
      "Installed and configured operating systems and applications",
      "Set up and maintained network infrastructure",
      "Provided technical support to end users",
      "Performed routine maintenance and system backups",
    ],
    keywords: ["troubleshooting", "hardware repair", "technical support", "network setup", "IT infrastructure"],
  },
  {
    id: "software-developer",
    label: "Software Developer",
    category: "IT / Tech",
    hardSkills: ["JavaScript", "Python", "React", "Node.js", "SQL", "Git", "REST APIs", "TypeScript"],
    softSkills: ["Problem Solving", "Critical Thinking", "Teamwork", "Self-Motivation"],
    responsibilities: [
      "Developed and maintained web applications using modern frameworks",
      "Wrote clean, testable code following best practices",
      "Collaborated with team members using version control (Git)",
      "Designed and implemented RESTful APIs",
      "Debugged and resolved software defects",
    ],
    keywords: ["software development", "programming", "web development", "full-stack", "agile"],
  },
  {
    id: "mobile-technician",
    label: "Mobile Phone Technician",
    category: "IT / Tech",
    hardSkills: ["Mobile Repair", "Screen Replacement", "Soldering", "Firmware Flashing", "FRP Bypass", "Data Recovery", "Battery Replacement"],
    softSkills: ["Attention to Detail", "Patience", "Customer Service", "Problem Solving"],
    responsibilities: [
      "Performed component-level repairs on smartphones and tablets",
      "Replaced screens, batteries, and charging ports",
      "Flashed firmware and performed software recovery",
      "Managed customer intake and repair tracking",
    ],
    keywords: ["mobile repair", "screen replacement", "soldering", "firmware", "hardware diagnostics"],
  },
  // Admin / Office
  {
    id: "office-administrator",
    label: "Office Administrator",
    category: "Admin / Office",
    hardSkills: ["Microsoft Word", "Microsoft Excel", "Email Management", "Filing", "Data Entry", "Report Writing", "Scheduling", "Bookkeeping"],
    softSkills: ["Communication", "Time Management", "Reliability", "Attention to Detail"],
    responsibilities: [
      "Managed daily office operations and correspondence",
      "Maintained filing systems and organized records",
      "Scheduled appointments and coordinated meetings",
      "Prepared reports and presentations for management",
      "Handled incoming calls and customer inquiries",
    ],
    keywords: ["office administration", "data entry", "scheduling", "correspondence", "record keeping"],
  },
  {
    id: "receptionist",
    label: "Receptionist",
    category: "Admin / Office",
    hardSkills: ["Microsoft Office", "Switchboard", "Data Entry", "Filing", "Email Management", "Typing"],
    softSkills: ["Communication", "Customer Service", "Reliability", "Patience", "Flexibility"],
    responsibilities: [
      "Greeted visitors and directed them to appropriate departments",
      "Answered and transferred phone calls on multi-line switchboard",
      "Managed appointment bookings and meeting room schedules",
      "Handled incoming and outgoing mail and deliveries",
    ],
    keywords: ["reception", "front desk", "customer service", "switchboard", "scheduling"],
  },
  // Trade / Hands-on
  {
    id: "electrician",
    label: "Electrician",
    category: "Trade / Hands-on",
    hardSkills: ["Electrical Wiring", "Circuit Testing", "Conduit Installation", "Reading Blueprints", "Safety Compliance", "Panel Installation"],
    softSkills: ["Attention to Detail", "Problem Solving", "Reliability", "Physical Fitness"],
    responsibilities: [
      "Installed and maintained electrical wiring and systems",
      "Read and interpreted electrical blueprints and schematics",
      "Tested circuits and components for proper functioning",
      "Ensured compliance with electrical safety codes",
    ],
    keywords: ["electrical installation", "wiring", "circuit testing", "safety compliance", "maintenance"],
  },
  {
    id: "general-worker",
    label: "General Worker",
    category: "Trade / Hands-on",
    hardSkills: ["Manual Labour", "Cleaning", "Stock Management", "Packing", "Driving", "Machine Operation"],
    softSkills: ["Reliability", "Physical Fitness", "Teamwork", "Flexibility", "Work Ethic"],
    responsibilities: [
      "Performed general cleaning and maintenance duties",
      "Loaded and offloaded stock and materials",
      "Operated basic machinery and equipment",
      "Assisted skilled tradespeople with tasks as required",
    ],
    keywords: ["general worker", "manual labour", "cleaning", "stock handling", "maintenance"],
  },
  // Sales / Retail
  {
    id: "cashier",
    label: "Cashier / Till Operator",
    category: "Sales / Retail",
    hardSkills: ["POS Systems", "Cash Handling", "Stock Taking", "Customer Service", "Basic Math", "Product Knowledge"],
    softSkills: ["Customer Service", "Reliability", "Patience", "Communication", "Stress Management"],
    responsibilities: [
      "Operated cash register and processed customer transactions",
      "Balanced cash drawer at the start and end of each shift",
      "Assisted customers with product inquiries and returns",
      "Maintained clean and organized checkout area",
    ],
    keywords: ["cashier", "point of sale", "cash handling", "retail", "customer service"],
  },
  {
    id: "sales-assistant",
    label: "Sales Assistant",
    category: "Sales / Retail",
    hardSkills: ["Product Knowledge", "POS Systems", "Stock Management", "Visual Merchandising", "Customer Service"],
    softSkills: ["Communication", "Negotiation", "Customer Service", "Teamwork", "Self-Motivation"],
    responsibilities: [
      "Assisted customers in selecting products and completing purchases",
      "Achieved and exceeded monthly sales targets",
      "Maintained product displays and restocked shelves",
      "Processed payments and handled returns/exchanges",
    ],
    keywords: ["sales", "retail", "customer service", "merchandising", "target achievement"],
  },
  // Hospitality
  {
    id: "waiter",
    label: "Waiter / Waitress",
    category: "Hospitality / Food",
    hardSkills: ["Food Service", "POS Systems", "Menu Knowledge", "Table Setting", "Beverage Service", "Cash Handling"],
    softSkills: ["Customer Service", "Teamwork", "Stress Management", "Communication", "Flexibility"],
    responsibilities: [
      "Greeted and seated customers in a professional manner",
      "Took food and beverage orders accurately",
      "Served meals and cleared tables efficiently",
      "Processed payments and handled tips",
    ],
    keywords: ["food service", "hospitality", "customer service", "restaurant", "table service"],
  },
  // Healthcare
  {
    id: "caregiver",
    label: "Caregiver / Home-Based Care",
    category: "Healthcare",
    hardSkills: ["Patient Care", "First Aid", "Medication Administration", "Vital Signs", "Hygiene Assistance", "Record Keeping"],
    softSkills: ["Empathy", "Patience", "Reliability", "Communication", "Emotional Intelligence"],
    responsibilities: [
      "Provided daily care and support to patients in home setting",
      "Assisted with personal hygiene, feeding, and mobility",
      "Monitored and recorded patient vital signs",
      "Administered prescribed medication on schedule",
    ],
    keywords: ["patient care", "home-based care", "healthcare", "medication", "vital signs"],
  },
  // Education
  {
    id: "tutor",
    label: "Tutor / Teaching Assistant",
    category: "Education",
    hardSkills: ["Lesson Planning", "Subject Knowledge", "Microsoft Office", "Assessment", "Classroom Management"],
    softSkills: ["Communication", "Patience", "Leadership", "Creativity", "Adaptability"],
    responsibilities: [
      "Prepared and delivered lessons to students",
      "Assessed student progress and provided feedback",
      "Created learning materials and resources",
      "Maintained discipline and a positive learning environment",
    ],
    keywords: ["teaching", "education", "lesson planning", "assessment", "mentoring"],
  },
  // Security
  {
    id: "security-guard",
    label: "Security Guard",
    category: "Security / Law",
    hardSkills: ["Access Control", "CCTV Monitoring", "Report Writing", "First Aid", "Patrol", "Fire Safety"],
    softSkills: ["Alertness", "Reliability", "Communication", "Stress Management", "Physical Fitness"],
    responsibilities: [
      "Monitored premises via CCTV and physical patrols",
      "Controlled access and verified visitor credentials",
      "Wrote incident reports and maintained log books",
      "Responded to alarms and emergency situations",
    ],
    keywords: ["security", "access control", "CCTV", "patrol", "incident response"],
  },
  // Creative
  {
    id: "graphic-designer",
    label: "Graphic Designer",
    category: "Creative / Design",
    hardSkills: ["Canva", "Photoshop", "Illustrator", "Typography", "Branding", "Social Media Design", "Video Editing"],
    softSkills: ["Creativity", "Attention to Detail", "Communication", "Time Management"],
    responsibilities: [
      "Designed visual content for print and digital platforms",
      "Created brand identity materials including logos and style guides",
      "Produced social media graphics and marketing collateral",
      "Collaborated with clients to understand design requirements",
    ],
    keywords: ["graphic design", "branding", "visual design", "adobe", "layout"],
  },
  // Finance
  {
    id: "bookkeeper",
    label: "Bookkeeper / Accounts Clerk",
    category: "Finance / Accounting",
    hardSkills: ["Pastel Accounting", "Excel", "Invoicing", "Bank Reconciliation", "VAT Returns", "Payroll", "Data Entry"],
    softSkills: ["Attention to Detail", "Reliability", "Critical Thinking", "Time Management"],
    responsibilities: [
      "Maintained accurate financial records and ledgers",
      "Processed invoices, receipts, and payments",
      "Performed monthly bank reconciliations",
      "Prepared VAT returns and payroll documents",
    ],
    keywords: ["bookkeeping", "accounting", "invoicing", "reconciliation", "financial records"],
  },
];

export function getRoleById(id: string): JobRole | undefined {
  return JOB_ROLES.find((r) => r.id === id);
}

export function getRolesByCategory(category: string): JobRole[] {
  return JOB_ROLES.filter((r) => r.category === category);
}
