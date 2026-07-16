/**
 * Global site configuration.
 *
 * TODO: replace the url once it's live.
 */
export const site = {
  name: "Abdallah Hijazi",
  initials: "AH",
  role: "Full-Stack Developer & Security Practitioner",
  url: "https://abdallah-hijazi.github.io",
  description:
    "Portfolio of Abdallah Hijazi — full-stack web developer, cybersecurity practitioner, AI & data enthusiast, and trainer based in Tripoli, Lebanon.",
  location: "Tripoli, Lebanon",
  email: "hijaziboudi0@gmail.com",
  phone: "+961 79 314 855",
  social: {
    github: "https://github.com/Abdallah-hijazi",
    linkedin: "https://www.linkedin.com/in/abdallahhijazi",
  },
  cvPath: "/cv/Abdallah_Hijazi_CV.pdf",
} as const;

export type Site = typeof site;
