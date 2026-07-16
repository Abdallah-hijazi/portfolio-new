import type { ExperienceEntry } from "./types";

/** Work history from CV (2025) and previous portfolio. */
export const experience: ExperienceEntry[] = [
  {
    id: "compu-vision",
    role: "Web Developer",
    company: "Compu-vision",
    type: "Full-time",
    start: "Dec 2024",
    location: "Lebanon",
    summary:
      "Building backend services and modern frontend applications for automotive digital platforms.",
    achievements: [
      "Develop backend services using PHP and JavaScript for automotive digital platforms.",
      "Build modern frontend applications with React.js and Next.js, improving maintainability and responsiveness.",
      "Design and implement RESTful APIs enabling scalable communication between services.",
      "Integrate secure payment systems to ensure reliable online transactions.",
      "Support debugging, testing, and production deployment, improving system reliability.",
    ],
    technologies: ["PHP", "JavaScript", "React", "Next.js", "REST APIs", "MySQL"],
    modes: ["developer"],
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
    role: "Freelance Penetration Tester & Bug Bounty Hunter",
    company: "Independent",
    type: "Independent",
    start: "2024",
    location: "Remote",
    summary:
      "Security assessments of web applications, aligned with the OWASP Top 10.",
    achievements: [
      "Reported 15+ vulnerabilities across engagements and bug bounty programs.",
      "Performed manual web application testing with Burp Suite: auth flows, session handling, access control, and injection.",
      "Produced reproducible findings with severity ratings and clear remediation guidance.",
    ],
    technologies: ["Burp Suite", "OWASP Top 10", "Python", "TLS/SSL", "JWT"],
    metrics: [{ label: "Findings", value: "15+" }],
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

export const recentExperience = experience.slice(0, 3);
