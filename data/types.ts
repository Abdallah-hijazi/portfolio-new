export type ModeId = "developer" | "security" | "ai" | "teaching";

export type ProjectCategory =
  | "Web Application"
  | "E-Commerce"
  | "Backend & APIs"
  | "Security"
  | "Data & AI"
  | "Portfolio";

export type ProjectStatus = "Production" | "In Progress" | "Delivered" | "Ongoing";

export interface ProjectScreenshot {
  /** Path under /public. Leave undefined to render a styled placeholder. */
  src?: string;
  alt: string;
  caption?: string;
}

export interface ProjectWebsiteLink {
  label: string;
  url: string;
}

export interface ProjectLinks {
  github?: string;
  live?: string;
  websites?: ProjectWebsiteLink[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured: boolean;
  year: number;
  role: string;
  technologies: string[];
  overview: string;
  problem: string;
  solution: string;
  architecture: string[];
  challenges: { title: string; detail: string }[];
  lessons: string[];
  metrics?: { label: string; value: string }[];
  links: ProjectLinks;
  /** Shown when there are no public URLs (e.g. private CMS, pre-launch). */
  linksNote?: string;
  screenshots: ProjectScreenshot[];
  modes: ModeId[];
}

export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  type: "Full-time" | "Contract" | "Freelance" | "Independent";
  start: string;
  end?: string;
  location: string;
  summary: string;
  achievements: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
  modes: ModeId[];
}

export type SkillLevel = "Expert" | "Advanced" | "Proficient" | "Foundational";

export interface Skill {
  name: string;
  level: SkillLevel;
  /** 0–100, drives the visualizations. */
  score: number;
  note?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string;
  skills: Skill[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  category: "Development" | "Security" | "Data & AI";
  highlight?: string;
  credentialUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  detail: string;
  icon: string;
}

export interface EducationEntry {
  degree: string;
  institution: string;
  years: string;
  detail: string;
}

export interface TeachingItem {
  id: string;
  title: string;
  audience: string;
  period: string;
  description: string;
  topics: string[];
}
