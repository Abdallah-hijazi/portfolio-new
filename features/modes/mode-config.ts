import type { ModeId } from "@/data/types";

export interface ModeConfig {
  id: ModeId;
  label: string;
  shortLabel: string;
  path: string;
  tagline: string;
  description: string;
  /** Static color used in mode switcher UI (matches CSS vars). */
  color: string;
  bootLines: string[];
  shortcut: string;
}

export const modes: ModeConfig[] = [
  {
    id: "developer",
    label: "Developer Mode",
    shortLabel: "DEV",
    path: "/developer",
    tagline: "Full-stack engineering",
    description:
      "React, Next.js, Laravel, Node — scalable platforms with premium frontends.",
    color: "hsl(220 14% 82%)",
    bootLines: [
      "mounting /dev/workspace",
      "loading design system … ok",
      "hydrating components … ok",
      "developer mode ready",
    ],
    shortcut: "1",
  },
  {
    id: "security",
    label: "Cybersecurity Mode",
    shortLabel: "SEC",
    path: "/security",
    tagline: "Offensive-minded defense",
    description:
      "Penetration testing, OWASP methodology, and a terminal-first workspace.",
    color: "hsl(152 90% 45%)",
    bootLines: [
      "init secure shell …",
      "loading OWASP modules … ok",
      "attaching monitors: cpu mem net",
      "access granted — security mode",
    ],
    shortcut: "2",
  },
  {
    id: "ai",
    label: "AI & Data Mode",
    shortLabel: "AI",
    path: "/ai-data",
    tagline: "Machine learning & analytics",
    description:
      "Azure ML solutions, Power BI analytics, and data-driven dashboards.",
    color: "hsl(192 92% 52%)",
    bootLines: [
      "spinning up compute …",
      "loading datasets … ok",
      "rendering visualizations … ok",
      "ai/data mode online",
    ],
    shortcut: "3",
  },
  {
    id: "teaching",
    label: "Teaching Mode",
    shortLabel: "EDU",
    path: "/teaching",
    tagline: "Training & mentorship",
    description:
      "Three years of teaching web development, security, and CS fundamentals.",
    color: "hsl(36 92% 55%)",
    bootLines: [
      "preparing classroom …",
      "loading curriculum … ok",
      "opening office hours … ok",
      "teaching mode ready",
    ],
    shortcut: "4",
  },
];

export const modeById = Object.fromEntries(modes.map((m) => [m.id, m])) as Record<
  ModeId,
  ModeConfig
>;

export function modeFromPath(pathname: string): ModeId | null {
  const clean = pathname.replace(/\/+$/, "") || "/";
  for (const mode of modes) {
    if (clean === mode.path || clean.startsWith(`${mode.path}/`)) return mode.id;
  }
  return null;
}
