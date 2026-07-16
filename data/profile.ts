import type { EducationEntry } from "./types";

export const profile = {
  name: "Abdallah Hijazi",
  headline: "Full-Stack Developer & Security Practitioner",
  roles: [
    "Full-Stack Web Developer",
    "Cybersecurity Practitioner",
    "AI & Data Enthusiast",
    "Developer Trainer",
  ],
  summary:
    "Full-stack developer with 3+ years of experience building scalable web platforms and backend systems with JavaScript, TypeScript, React, Next.js, Laravel, and Node.js. I design RESTful APIs, optimize relational databases, and ship secure authentication flows that follow OWASP best practices — and I enjoy teaching all of it to other developers.",
  shortBio:
    "I build fast, secure web platforms — and break them on purpose to make them safer.",
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Professional" },
    { name: "French", level: "Intermediate (B1)" },
  ],
  stats: [
    { label: "Years of experience", value: 3, suffix: "+" },
    { label: "Projects completed", value: 25, suffix: "+" },
    { label: "Happy clients", value: 20, suffix: "+" },
    { label: "Vulnerabilities reported", value: 15, suffix: "+" },
  ],
  availability:
    "Open to full-stack roles, security work, and developer training engagements.",
} as const;

export const education: EducationEntry[] = [
  {
    degree: "B.Sc. in Computer Science",
    institution: "CNAM University",
    years: "2022 — 2025",
    detail: "GPA 3.8 / 4.0",
  },
];
