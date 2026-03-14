// Curated suggestion lists for quick-add chips — minimise typing, maximise CV content

export const HOBBY_SUGGESTIONS = [
  "Reading Books", "Playing Chess", "Community Volunteering", "Gaming", "Cooking",
  "Gardening", "Music", "Photography", "Traveling", "Fitness & Gym",
  "Building Robots", "Coding Side Projects", "Reading Tech Blogs", "Hiking",
  "Football", "Running", "Drawing & Art", "Watching Documentaries", "Mentoring Youth",
  "Church Activities", "Dance", "Writing", "Fishing", "DIY Projects",
];

export const SOFT_SKILL_SUGGESTIONS = [
  "Communication", "Teamwork", "Problem Solving", "Leadership", "Time Management",
  "Adaptability", "Critical Thinking", "Work Ethic", "Attention to Detail", "Creativity",
  "Conflict Resolution", "Customer Service", "Emotional Intelligence", "Decision Making",
  "Stress Management", "Negotiation", "Public Speaking", "Collaboration",
  "Self-Motivation", "Flexibility", "Patience", "Reliability",
];

export const HARD_SKILL_SUGGESTIONS: Record<string, string[]> = {
  "IT / Tech": [
    "Hardware Repair", "Software Installation", "Network Setup", "Python", "JavaScript",
    "C++", "Graphic Design", "Video Editing", "POS Systems", "Data Recovery",
    "Troubleshooting", "Firmware Flashing", "Mobile Repair", "Soldering", "3D Printing",
    "Web Development", "Database Management", "Cyber Security", "Cloud Computing",
  ],
  "Admin / Office": [
    "Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Data Entry",
    "Filing & Record Keeping", "Typing", "Reception Duties", "Email Management",
    "Scheduling", "Report Writing", "Bookkeeping", "Invoicing",
  ],
  "Trade / Hands-on": [
    "Welding", "Plumbing", "Carpentry", "Electrical Wiring", "Painting",
    "Bricklaying", "Driving (Code 10/14)", "Forklift Operation", "Machine Operation",
    "Auto Mechanics", "Tiling", "Plastering",
  ],
  "Creative": [
    "Canva", "Photoshop", "Illustrator", "Photography", "Video Production",
    "Social Media Management", "Content Writing", "Copywriting", "Blogging",
  ],
};

export const LANGUAGE_SUGGESTIONS = [
  "Tshivenda", "English", "Afrikaans", "Zulu", "Xhosa", "Sotho", "Tswana",
  "Tsonga", "Swati", "Ndebele", "Sepedi", "French", "Portuguese",
];

export const ACHIEVEMENT_SUGGESTIONS = [
  "Started own business", "Won a competition", "Received an award",
  "Trained/mentored others", "Completed a major project", "Published work",
  "Community service recognition", "Promoted at work",
];

export const RESPONSIBILITY_SUGGESTIONS = [
  "Managed team of employees", "Handled customer inquiries and complaints",
  "Maintained inventory and stock levels", "Prepared reports and documents",
  "Trained new staff members", "Operated cash register / POS system",
  "Performed quality control checks", "Liaised with suppliers and vendors",
  "Maintained clean and safe work environment", "Assisted with marketing and social media",
  "Provided technical support to clients", "Managed daily operations",
];
