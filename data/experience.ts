import type { ExperienceEntry } from "./types";

/** Work history from CV (2025) and previous portfolio. */
export const experience: ExperienceEntry[] = [
  {
    id: "compu-vision",
    role: "Full-Stack Web Developer",
    company: "Compu-vision",
    type: "Full-time",
    start: "Dec 2024",
    location: "Lebanon (clients in Lebanon & Qatar)",
    summary:
      "Full-stack delivery across 30 client codebases — automotive dealer sites, clinic billing, garage accounting, e-commerce, and an AI ordering platform.",
    achievements: [
      "Committed to 30 production repositories in the company's GitHub organisation, spanning APIs, admin CMSs and public websites.",
      "Built Node.js APIs on Fastify and Express with Sequelize (MySQL/PostgreSQL), JWT and Passport OAuth (Google, Apple, Facebook), Swagger docs, Redis and Socket.io real-time events.",
      "Built React admin CMSs with role-based access control (CASL), Redux Toolkit, Material UI / Ant Design, and Arabic–English (RTL) i18n.",
      "Shipped multilingual Next.js sites with next-intl, React Query and Zustand for automotive brands in Qatar — including test-drive booking, maps and offer management.",
      "Developed an AI voice-ordering platform: OpenAI-powered order parsing, speech-to-text / text-to-speech, FFmpeg audio processing, Firebase push and live chat.",
      "Built clinic billing (invoices, signed manual receipts, recurring charges, multi-currency income-split reports) and Laravel garage accounting (job/supplier invoices, vouchers, exchange rates).",
      "Extended a Laravel/Bagisto e-commerce store with Elasticsearch search, cart/checkout redesign, promotions and delivery-charge logic.",
    ],
    technologies: [
      "Node.js",
      "Fastify",
      "Express",
      "Sequelize",
      "React",
      "Next.js",
      "TypeScript",
      "Laravel",
      "MySQL",
      "PostgreSQL",
      "Socket.io",
      "OpenAI API",
    ],
    metrics: [
      { label: "Client codebases", value: "30" },
      { label: "Stacks", value: "Node · React · Laravel" },
    ],
    modes: ["developer", "ai"],
  },
  {
    id: "cutting-edge",
    role: "Backend Developer",
    company: "Cutting Edge",
    type: "Contract",
    start: "Apr 2025",
    end: "Jul 2025",
    location: "Lebanon",
    summary:
      "Designed the Laravel backend for a gymnastics competition management platform.",
    achievements: [
      "Designed backend architecture using Laravel and MySQL for a competition management system.",
      "Developed APIs handling athlete registration, scoring algorithms, and real-time ranking updates.",
      "Optimized relational database queries, improving performance and scalability.",
      "Implemented a custom CMS enabling administrators to manage events and results efficiently.",
      "Delivered production-ready backend features on schedule with clean, maintainable code.",
    ],
    technologies: ["Laravel", "PHP", "MySQL", "REST APIs"],
    metrics: [{ label: "Delivery", value: "On schedule" }],
    modes: ["developer"],
  },
  {
    id: "interphase",
    role: "Front-End Developer",
    company: "Interphase",
    type: "Full-time",
    start: "Oct 2023",
    end: "Mar 2024",
    location: "Lebanon",
    summary:
      "Owned frontend performance and design fidelity across the product.",
    achievements: [
      "Reduced page load time by 25% through front-end optimization techniques.",
      "Converted Figma designs into responsive production interfaces, increasing user engagement by 15%.",
      "Collaborated with QA teams, reducing post-launch bugs by 30%.",
      "Improved UI consistency across devices and browsers.",
    ],
    technologies: ["JavaScript", "HTML5", "CSS3", "Figma", "Responsive Design"],
    metrics: [
      { label: "Page load", value: "−25%" },
      { label: "Engagement", value: "+15%" },
      { label: "Post-launch bugs", value: "−30%" },
    ],
    modes: ["developer"],
  },
  {
    id: "freelance-fullstack",
    role: "Freelance Full-Stack Developer",
    company: "Independent",
    type: "Freelance",
    start: "2020",
    location: "Remote",
    summary:
      "Delivering full-stack web applications for clients — from multilingual e-commerce to research platforms.",
    achievements: [
      "Developed 10+ full-stack web applications, including multilingual e-commerce platforms.",
      "Built scalable APIs and backend services using Laravel and Node.js.",
      "Designed optimized SQL queries and database structures for high-traffic use cases.",
      "Integrated third-party APIs including payment services and authentication providers.",
    ],
    technologies: ["Laravel", "Node.js", "MySQL", "PostgreSQL", "MongoDB", "REST APIs"],
    metrics: [
      { label: "Applications", value: "10+" },
      { label: "Clients", value: "20+" },
    ],
    modes: ["developer"],
  },
  {
    id: "pentesting",
    role: "Security Researcher (HackerOne) & Freelance Penetration Tester",
    company: "Independent",
    type: "Independent",
    start: "2024",
    location: "Remote",
    summary:
      "Policy-bound vulnerability research on authorized HackerOne programs, plus freelance web application assessments.",
    achievements: [
      "Reported an unauthenticated SSRF to the U.S. DoD Cyber Crime Center's DIB-VDP — triaged as High severity and resolved (Nov 2026).",
      "Earned four HackerOne badges from that report: OWASP A5 Broken Access Control, Insecticide (first resolved report), TrailBlazer (first of multiple reporters) and Good Samaritan.",
      "Researched HPE VDP, CoinMate and DIB-VDP scopes: OSINT asset discovery, two-account (A vs B) authorization testing, and documented false-positive analysis for every rejected lead.",
      "Authorized black-box assessment with 19 validated findings — broken object-level authorization, privilege escalation, missing session invalidation and predictable identifiers.",
      "Write submission-ready reports with CVSS v3.1, CWE, reproduction steps and remediation; respect rate limits and rules of engagement.",
    ],
    technologies: ["Burp Suite", "OWASP Top 10", "Python", "Node.js", "nuclei", "Semgrep", "Playwright"],
    metrics: [
      { label: "DIB-VDP", value: "High · Resolved" },
      { label: "HackerOne badges", value: "4" },
    ],
    modes: ["security"],
  },
  {
    id: "tutoring",
    role: "Private Tutor & Developer Trainer",
    company: "Independent",
    type: "Independent",
    start: "2021",
    location: "Tripoli, Lebanon & Remote",
    summary:
      "Teaching modern web development and cybersecurity fundamentals to students and junior developers.",
    achievements: [
      "3 years teaching web development — frontend frameworks, backend architecture, and API-driven development.",
      "Mentored junior developers on code quality, Git workflows, and debugging practice.",
      "Delivered cybersecurity fundamentals training covering OWASP-aligned secure coding.",
    ],
    technologies: ["JavaScript", "React", "Laravel", "Node.js", "OWASP"],
    modes: ["teaching"],
  },
];

export const recentExperience = ["compu-vision", "pentesting", "cutting-edge"]
  .map((id) => experience.find((e) => e.id === id))
  .filter((e): e is ExperienceEntry => Boolean(e));
