import { achievements, certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { allSkills } from "@/data/skills";

export type SearchRecordType =
  | "Project"
  | "Experience"
  | "Skill"
  | "Certification"
  | "Achievement"
  | "Technology"
  | "Page";

export interface SearchRecord {
  id: string;
  type: SearchRecordType;
  title: string;
  subtitle: string;
  keywords: string[];
  href: string;
}

function projectRecords(): SearchRecord[] {
  return projects.map((p) => ({
    id: `project-${p.slug}`,
    type: "Project",
    title: p.title,
    subtitle: p.tagline,
    keywords: [...p.technologies, p.category, p.status, String(p.year)],
    href: `/projects/${p.slug}/`,
  }));
}

function experienceRecords(): SearchRecord[] {
  return experience.map((e) => ({
    id: `exp-${e.id}`,
    type: "Experience",
    title: `${e.role} — ${e.company}`,
    subtitle: e.summary,
    keywords: [...e.technologies, e.type, e.start, e.end ?? "Present"],
    href: `/experience/#${e.id}`,
  }));
}

function skillRecords(): SearchRecord[] {
  return allSkills.map((s) => ({
    id: `skill-${s.category}-${s.name}`,
    type: "Skill",
    title: s.name,
    subtitle: `${s.category} — ${s.level}`,
    keywords: [s.category, s.level],
    href: "/skills/",
  }));
}

function certificationRecords(): SearchRecord[] {
  return certifications.map((c) => ({
    id: `cert-${c.id}`,
    type: "Certification",
    title: c.title,
    subtitle: `${c.issuer} · ${c.year}`,
    keywords: [c.category, c.issuer, c.highlight ?? ""],
    href: "/certifications/",
  }));
}

function achievementRecords(): SearchRecord[] {
  return achievements.map((a) => ({
    id: `achievement-${a.id}`,
    type: "Achievement",
    title: a.title,
    subtitle: a.subtitle,
    keywords: [a.year, a.detail],
    href: "/achievements/",
  }));
}

function technologyRecords(): SearchRecord[] {
  const techs = new Set<string>(projects.flatMap((p) => p.technologies));
  return [...techs].sort().map((t) => ({
    id: `tech-${t}`,
    type: "Technology",
    title: t,
    subtitle: "Filter projects using this technology",
    keywords: ["technology", "stack"],
    href: `/projects/?tech=${encodeURIComponent(t)}`,
  }));
}

const pageRecords: SearchRecord[] = [
  { id: "page-home", type: "Page", title: "Home", subtitle: "Start screen", keywords: ["landing"], href: "/" },
  { id: "page-developer", type: "Page", title: "Developer Mode", subtitle: "Full-stack engineering workspace", keywords: ["dev", "mode"], href: "/developer/" },
  { id: "page-security", type: "Page", title: "Cybersecurity Mode", subtitle: "Terminal workspace", keywords: ["security", "terminal", "hacking"], href: "/security/" },
  { id: "page-ai", type: "Page", title: "AI & Data Mode", subtitle: "Analytics dashboard", keywords: ["ml", "azure", "data"], href: "/ai-data/" },
  { id: "page-teaching", type: "Page", title: "Teaching Mode", subtitle: "Training & mentorship", keywords: ["trainer", "tutor", "mentor"], href: "/teaching/" },
  { id: "page-projects", type: "Page", title: "Projects", subtitle: "All projects with filters", keywords: ["work", "portfolio"], href: "/projects/" },
  { id: "page-experience", type: "Page", title: "Experience", subtitle: "Interactive timeline", keywords: ["career", "jobs"], href: "/experience/" },
  { id: "page-skills", type: "Page", title: "Skills", subtitle: "Categorized skill matrix", keywords: ["stack", "abilities"], href: "/skills/" },
  { id: "page-certifications", type: "Page", title: "Certifications", subtitle: "Credentials & badges", keywords: ["certs"], href: "/certifications/" },
  { id: "page-achievements", type: "Page", title: "Achievements", subtitle: "Awards & milestones", keywords: ["awards", "trophies"], href: "/achievements/" },
  { id: "page-resume", type: "Page", title: "Resume", subtitle: "Printable CV", keywords: ["cv", "download"], href: "/resume/" },
  { id: "page-contact", type: "Page", title: "Contact", subtitle: "Get in touch", keywords: ["email", "hire"], href: "/contact/" },
];

export const searchRecords: SearchRecord[] = [
  ...pageRecords,
  ...projectRecords(),
  ...experienceRecords(),
  ...skillRecords(),
  ...certificationRecords(),
  ...achievementRecords(),
  ...technologyRecords(),
];
