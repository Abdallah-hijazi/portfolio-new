import type { Achievement, Certification } from "./types";

export const certifications: Certification[] = [
  {
    id: "azure-ml",
    title: "Microsoft Azure Machine Learning",
    issuer: "Microsoft",
    year: "2024",
    category: "Data & AI",
    highlight: "5 badges + ML Solution Design Trophy",
    credentialUrl:
      "https://learn.microsoft.com/api/achievements/share/en-us/AbdallahHijazi-1731/3R73NB6H?sharingId=660A499A7F0F4D9",
  },
  {
    id: "advanced-cybersecurity",
    title: "Advanced Cyber Security",
    issuer: "Youbee.ai",
    year: "2023",
    category: "Security",
  },
  {
    id: "cybersecurity-fundamentals",
    title: "Fundamentals of Cyber Security",
    issuer: "Youbee.ai",
    year: "2024",
    category: "Security",
  },
  {
    id: "power-bi",
    title: "Data Analysis with Power BI",
    issuer: "Khawarizmi & LASeR",
    year: "2024",
    category: "Data & AI",
  },
  {
    id: "junior-web-dev",
    title: "Junior Web Developer",
    issuer: "CNAM University",
    year: "2024",
    category: "Development",
  },
];

export const achievements: Achievement[] = [
  {
    id: "dib-vdp-high",
    title: "High-Severity Vulnerability — U.S. DoD DIB-VDP",
    subtitle: "HackerOne · DoD Cyber Crime Center (DC3)",
    year: "2026",
    detail:
      "Reported a vulnerability on an in-scope Defense Industrial Base asset through the DoD's coordinated disclosure program. Triaged as High severity and closed as resolved in November 2026. Technical details stay private under the program's disclosure policy.",
    icon: "shield-check",
    href: "https://hackerone.com/abdallah-hijazi",
    hrefLabel: "HackerOne profile",
  },
  {
    id: "hackerone-badges",
    title: "4 HackerOne Badges",
    subtitle: "Broken Access Control · Insecticide · TrailBlazer · Good Samaritan",
    year: "2026",
    detail:
      "OWASP A5 Broken Access Control (valid report), Insecticide (first report resolved), TrailBlazer (first of multiple reporters to find the issue) and Good Samaritan (resolved with a non-bounty program).",
    icon: "award",
    href: "https://hackerone.com/abdallah-hijazi/badges?type=user",
    hrefLabel: "View badges on HackerOne",
  },
  {
    id: "ctf-2026",
    title: "Lebanon CTF 2026 — Top 15 Nationally",
    subtitle: "Capture the Flag, Lebanon",
    year: "2026",
    detail:
      "Placed between 5th and 13th nationally (official leaderboard pending). Web exploitation work included an ORDER BY SQL injection behind a WAF, client-side path traversal and cache-deception analysis.",
    icon: "flag",
  },
  {
    id: "ieee-xtreme",
    title: "IEEE Xtreme V17 — Top 5 National Finalist",
    subtitle: "Competitive programming, Lebanon",
    year: "2024",
    detail:
      "Placed in the top 5 nationally in the IEEE Xtreme 24-hour programming competition — algorithmic problem solving under pressure.",
    icon: "trophy",
  },
  {
    id: "azure-trophy",
    title: "Azure ML Solution Design Trophy",
    subtitle: "Microsoft Azure Machine Learning program",
    year: "2024",
    detail:
      "Awarded for designing an end-to-end machine learning solution, on top of five completed Azure ML badge tracks.",
    icon: "award",
  },
  {
    id: "gpa",
    title: "GPA 3.8 — B.Sc. Computer Science",
    subtitle: "CNAM University, 2022–2025",
    year: "2025",
    detail:
      "Graduated with a 3.8 GPA while working in production development roles in parallel.",
    icon: "graduation-cap",
  },
  {
    id: "vulns",
    title: "15+ Vulnerabilities Reported",
    subtitle: "Penetration testing & bug bounty",
    year: "2024",
    detail:
      "Independent security research across freelance engagements and bug bounty programs, with reproducible reports and remediation guidance.",
    icon: "shield-check",
  },
  {
    id: "delivery",
    title: "25+ Projects Delivered",
    subtitle: "Freelance & employment, 2020–present",
    year: "2025",
    detail:
      "Web applications delivered across e-commerce, competition management, automotive, and research platforms for 20+ clients.",
    icon: "rocket",
  },
];
