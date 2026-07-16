import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Prefixes a public asset path with the configured base path so static
 * assets resolve correctly on GitHub Pages project sites.
 */
export function withBasePath(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}

export function formatDateRange(start: string, end?: string): string {
  return `${start} — ${end ?? "Present"}`;
}
