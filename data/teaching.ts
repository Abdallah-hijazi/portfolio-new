import type { TeachingItem } from "./types";

export const teachingTimeline: TeachingItem[] = [
  {
    id: "web-dev-training",
    title: "Web Development Teaching",
    audience: "Students & junior developers",
    period: "2021 — Present",
    description:
      "Three years of hands-on teaching: frontend frameworks, backend architecture, and API-driven development, from first HTML page to deployed full-stack apps.",
    topics: ["HTML/CSS/JS", "React", "Laravel", "REST APIs", "Git"],
  },
  {
    id: "cybersecurity-training",
    title: "Cybersecurity Training",
    audience: "Developers & students",
    period: "2024 — Present",
    description:
      "Security fundamentals for builders: the OWASP Top 10, secure authentication patterns, and how attackers actually approach a web application.",
    topics: ["OWASP Top 10", "Secure Auth", "Web App Attacks", "Defense Basics"],
  },
  {
    id: "private-tutoring",
    title: "Private Tutoring",
    audience: "University & school students",
    period: "Ongoing",
    description:
      "One-on-one mentorship in programming and computer science coursework, tailored to each student's pace and goals.",
    topics: ["Programming Fundamentals", "Java", "Python", "Databases"],
  },
  {
    id: "mentorship",
    title: "Junior Developer Mentorship",
    audience: "Early-career developers",
    period: "Ongoing",
    description:
      "Code reviews, pairing sessions, and career guidance — explaining complex technical concepts in a way juniors can apply immediately.",
    topics: ["Code Review", "Debugging", "Career Guidance", "Best Practices"],
  },
];

export const teachingPrinciples = [
  {
    title: "Build first, theory second",
    detail: "Every concept lands through a working project, not a slide deck.",
  },
  {
    title: "Explain the why",
    detail:
      "Frameworks change; understanding trade-offs is what survives the churn.",
  },
  {
    title: "Security from day one",
    detail:
      "Students learn OWASP-aligned habits before they learn shortcuts.",
  },
];
