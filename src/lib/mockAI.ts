import type { ToneStyle } from "@/types/cv";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const summaryByTone: Record<ToneStyle, (name: string, title: string) => string> = {
  formal: (name, title) =>
    `${name} is a dedicated ${title} with extensive experience delivering high-quality technical solutions. Possesses a strong foundation in hardware diagnostics, software development, and client relationship management.`,
  modern: (name, title) =>
    `${name} — a hands-on ${title} who bridges hardware and software to create real-world impact. Building practical tech solutions for growing businesses.`,
  "hustle-forward": (name, title) =>
    `From fixing phones in the township to founding a tech business — ${name} is a self-taught ${title} who turns complex problems into working products. No manual needed.`,
  "community-friendly": (name, title) =>
    `${name} is a trusted ${title} in the community, helping local businesses and families with technology solutions. Whether it's fixing a laptop or building a POS system, ${name} is the go-to tech person.`,
};

export async function generateSummary(name: string, title: string, tone: ToneStyle): Promise<string> {
  await delay(800);
  return summaryByTone[tone](name, title);
}

export async function expandBullet(shortText: string): Promise<string> {
  await delay(600);
  const expansions: Record<string, string> = {
    "fix phones": "Diagnosed and repaired mobile devices at component level, including screen replacements, battery swaps, and motherboard soldering.",
    "build pos": "Designed and developed custom Point of Sale systems with inventory tracking, receipt printing, and real-time sales analytics.",
    "teach tech": "Conducted technology literacy workshops for community members, covering smartphone setup, internet safety, and digital banking.",
  };
  const key = Object.keys(expansions).find((k) => shortText.toLowerCase().includes(k));
  return key ? expansions[key] : `Successfully ${shortText.toLowerCase()}, delivering measurable results and contributing to team objectives.`;
}

export async function suggestSkills(title: string): Promise<{ hard: string[]; soft: string[] }> {
  await delay(700);
  const techSkills = [
    "Hardware Diagnostics", "Soldering & Rework", "Mobile Device Repair",
    "POS System Development", "Network Configuration", "Python Programming",
    "Firmware Flashing", "Data Recovery", "Inventory Management Software",
  ];
  const softSkills = [
    "Problem Solving", "Client Communication", "Technical Leadership",
    "Time Management", "Adaptability", "Community Engagement",
  ];
  return { hard: techSkills.slice(0, 5), soft: softSkills.slice(0, 3) };
}

export async function atsOptimize(text: string, jobTitle: string): Promise<{ optimized: string; score: number; keywords: string[] }> {
  await delay(1000);
  const keywords = [
    "troubleshooting", "hardware repair", "software development", "POS systems",
    "inventory management", "customer service", "technical support", "network setup",
    "project management", "team leadership",
  ];
  const found = keywords.filter((k) => text.toLowerCase().includes(k.toLowerCase()));
  const missing = keywords.filter((k) => !text.toLowerCase().includes(k.toLowerCase()));
  const score = Math.min(95, 40 + found.length * 8);
  let optimized = text;
  if (missing.length > 0) {
    optimized += ` Demonstrated expertise in ${missing.slice(0, 3).join(", ")}.`;
  }
  return { optimized, score, keywords: found.concat(missing.slice(0, 3)) };
}

export async function generateCoverLetter(
  name: string,
  currentTitle: string,
  company: string,
  targetPosition: string,
  skills: string[] = [],
  experience: string[] = [],
): Promise<string> {
  await delay(1200);
  const skillText = skills.length > 0
    ? `My key competencies include ${skills.slice(0, 5).join(", ")}, which directly align with the requirements of the ${targetPosition} role.`
    : `My diverse skill set positions me well to make an immediate impact in the ${targetPosition} role.`;
  const expText = experience.length > 0
    ? `In my most recent role as ${experience[0]}, I have gained valuable experience that is directly transferable to this position.`
    : `Throughout my career, I have consistently delivered results that exceed expectations.`;
  return `Dear Hiring Manager,

RE: APPLICATION FOR ${targetPosition.toUpperCase()} POSITION

I am writing to express my keen interest in the ${targetPosition} position at ${company}. As a dedicated ${currentTitle}, I bring hands-on experience and a proven track record that I believe makes me an ideal candidate for this opportunity.

${expText}

${skillText}

I am passionate about contributing to ${company}'s success and am confident that my background, combined with my strong work ethic and eagerness to learn, will allow me to add value to your team from day one.

I have attached my CV for your review and would welcome the opportunity to discuss how my qualifications align with your needs. I am available for an interview at your earliest convenience.

Thank you for considering my application. I look forward to hearing from you.

Yours faithfully,
${name}`;
}


export async function generateLinkedInSummary(name: string, title: string, summary: string): Promise<string> {
  await delay(800);
  return `🔧 ${title} | Hardware Specialist | Software Developer\n\n${summary}\n\n💡 Open to opportunities in IT support, POS development, and technical consulting.\n\n📍 Based in Limpopo, South Africa | Available for remote and on-site work.`;
}
