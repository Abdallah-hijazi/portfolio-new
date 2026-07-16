import type { SkillCategory } from "./types";

/**
 * Skill levels derived from CV wording:
 * - "strong expertise" → Expert (90+)
 * - core stack in daily production use → Advanced (75–89)
 * - regularly used, secondary → Proficient (55–74)
 * - "foundational / basic" per CV → Foundational (<55)
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend",
    icon: "layout",
    skills: [
      { name: "React", level: "Expert", score: 92 },
      { name: "Next.js", level: "Expert", score: 90 },
      { name: "TypeScript", level: "Advanced", score: 86 },
      { name: "JavaScript (ES6+)", level: "Expert", score: 93 },
      { name: "HTML5 & CSS3", level: "Expert", score: 92 },
      { name: "Vue.js", level: "Proficient", score: 68 },
      { name: "Responsive Design", level: "Expert", score: 90 },
      { name: "React Native", level: "Foundational", score: 45, note: "Foundational" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "server",
    skills: [
      { name: "Laravel", level: "Expert", score: 90 },
      { name: "PHP", level: "Advanced", score: 87 },
      { name: "Node.js", level: "Advanced", score: 84 },
      { name: "RESTful APIs", level: "Expert", score: 91 },
      { name: "MVC Architecture", level: "Advanced", score: 85 },
      { name: "Auth (OAuth, JWT)", level: "Advanced", score: 82 },
      { name: "Payment Integration", level: "Advanced", score: 80 },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "database",
    skills: [
      { name: "MySQL", level: "Advanced", score: 87 },
      { name: "PostgreSQL", level: "Proficient", score: 72 },
      { name: "MongoDB", level: "Proficient", score: 68 },
      { name: "Query Optimization", level: "Advanced", score: 83 },
      { name: "Schema Design", level: "Advanced", score: 84 },
    ],
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    icon: "cloud",
    skills: [
      { name: "Git & GitHub", level: "Expert", score: 90 },
      { name: "Azure ML", level: "Proficient", score: 70, note: "5 badges + trophy" },
      { name: "Docker", level: "Foundational", score: 50, note: "Foundational" },
      { name: "CI/CD Concepts", level: "Proficient", score: 62 },
      { name: "AWS / GCP", level: "Foundational", score: 45, note: "Basic" },
    ],
  },
  {
    id: "security",
    label: "Security",
    icon: "shield",
    skills: [
      { name: "OWASP Top 10", level: "Advanced", score: 84 },
      { name: "Penetration Testing", level: "Proficient", score: 74 },
      { name: "Burp Suite", level: "Proficient", score: 72 },
      { name: "TLS/SSL", level: "Proficient", score: 70 },
      { name: "Secure Auth Design", level: "Advanced", score: 80 },
    ],
  },
  {
    id: "ai",
    label: "AI & Data",
    icon: "brain",
    skills: [
      { name: "Python", level: "Proficient", score: 72 },
      { name: "Machine Learning (Azure)", level: "Proficient", score: 68 },
      { name: "Power BI", level: "Proficient", score: 70 },
      { name: "Data Analysis", level: "Proficient", score: 70 },
      { name: "SQL for Analytics", level: "Advanced", score: 80 },
    ],
  },
  {
    id: "tools",
    label: "Tools & Practices",
    icon: "wrench",
    skills: [
      { name: "Figma", level: "Advanced", score: 82 },
      { name: "Adobe XD", level: "Proficient", score: 65 },
      { name: "Postman", level: "Advanced", score: 84 },
      { name: "Agile Development", level: "Advanced", score: 80 },
      { name: "Java", level: "Proficient", score: 60 },
      { name: "AI-assisted Dev (Copilot)", level: "Advanced", score: 80 },
    ],
  },
];

export const allSkills = skillCategories.flatMap((c) =>
  c.skills.map((s) => ({ ...s, category: c.label })),
);
