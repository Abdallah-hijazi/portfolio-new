import type { EducationEntry } from "./types";

export const profile = {
  name: "Abdallah Hijazi",
  headline: "Full-Stack Developer & Security Researcher",
  roles: [
    "Full-Stack Web Developer",
    "Security Researcher · HackerOne",
    "CTF Player",
    "AI & Data Enthusiast",
    "Developer Trainer",
  ],
  summary:
    "Full-stack developer and security researcher with 3+ years of production experience. At Compu-vision I've shipped across 30 client codebases — Fastify/Express and Laravel APIs, React admin CMSs with role-based access control, Next.js multilingual sites, and an AI voice-ordering platform built on the OpenAI API. On HackerOne I hunt for vulnerabilities in authorized programs, with a High-severity finding resolved by the U.S. DoD's DIB-VDP, and I placed in the national top 15 at Lebanon CTF 2026. I enjoy teaching all of it to other developers.",
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
