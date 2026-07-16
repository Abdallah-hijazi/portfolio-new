import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

import { site } from "@/lib/site";

const footerLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/certifications", label: "Certifications" },
  { href: "/achievements", label: "Achievements" },
  { href: "/resume", label: "Resume" },
];

const modeLinks = [
  { href: "/developer", label: "Developer" },
  { href: "/security", label: "Cybersecurity" },
  { href: "/ai-data", label: "AI & Data" },
  { href: "/teaching", label: "Teaching" },
];

export function SiteFooter() {
  return (
    <footer className="print-hidden border-t border-line/70">
      <div className="container grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="max-w-xs">
          <p className="font-mono text-sm font-bold">
            AH<span className="text-accent">://</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            {site.description}
          </p>
          <div className="mt-5 flex items-center gap-2">
            <a
              href={site.social.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="glass glass-hover flex size-9 items-center justify-center rounded-full text-muted hover:text-foreground"
            >
              <Github className="size-4" aria-hidden />
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="glass glass-hover flex size-9 items-center justify-center rounded-full text-muted hover:text-foreground"
            >
              <Linkedin className="size-4" aria-hidden />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label={`Email ${site.email}`}
              className="glass glass-hover flex size-9 items-center justify-center rounded-full text-muted hover:text-foreground"
            >
              <Mail className="size-4" aria-hidden />
            </a>
          </div>
        </div>

        <nav aria-label="Footer — pages">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5">
            {footerLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Footer — modes">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Workspaces
          </p>
          <ul className="mt-4 space-y-2.5">
            {modeLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Shortcuts
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li className="flex items-center gap-2">
              <kbd className="kbd">Ctrl</kbd>
              <kbd className="kbd">K</kbd>
              <span>Command palette</span>
            </li>
            <li className="flex items-center gap-2">
              <kbd className="kbd">1</kbd>–<kbd className="kbd">4</kbd>
              <span>Switch modes</span>
            </li>
            <li className="flex items-center gap-2">
              <kbd className="kbd">?</kbd>
              <span>All shortcuts</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line/70">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}.
          </p>
          <p className="font-mono">
            {site.location} · <a className="hover:text-foreground" href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
