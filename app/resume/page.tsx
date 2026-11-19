import { Download, Github, Linkedin, Mail, MapPin, Phone, Printer } from "lucide-react";
import type { Metadata } from "next";

import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { certifications } from "@/data/certifications";
import { experience } from "@/data/experience";
import { education, profile } from "@/data/profile";
import { skillCategories } from "@/data/skills";
import { PrintButton } from "@/features/resume/print-button";
import { site } from "@/lib/site";
import { formatDateRange, withBasePath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Abdallah Hijazi — full-stack developer with 3+ years of experience. View on the web, print, or download the PDF.",
  alternates: { canonical: "/resume/" },
};

export default function ResumePage() {
  return (
    <div className="pt-28">
      <div className="container max-w-4xl pb-8">
        <Breadcrumbs items={[{ label: "Resume" }]} className="mb-8" />

        <div className="print-hidden mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl font-bold tracking-tight">Resume</h1>
            <p className="mt-2 text-muted">
              Web version below — grab the PDF or print it.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={withBasePath(site.securityCvPath)} download>
                <Download aria-hidden /> Security CV
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={withBasePath(site.cvPath)} download>
                <Download aria-hidden /> Developer CV
              </a>
            </Button>
            <PrintButton>
              <Printer aria-hidden /> Print
            </PrintButton>
          </div>
        </div>

        {/* Resume sheet */}
        <article className="glass rounded-3xl p-8 sm:p-12 print:border-none print:bg-white print:p-0 print:shadow-none">
          {/* Header */}
          <header className="border-b border-line pb-8">
            <h2 className="font-display text-3xl font-bold">{site.name}</h2>
            <p className="mt-1 text-lg text-accent-strong print:text-black">
              {site.role}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <li className="flex items-center gap-1.5">
                <MapPin className="size-3.5" aria-hidden /> {site.location}
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-1.5 hover:text-foreground"
                >
                  <Mail className="size-3.5" aria-hidden /> {site.email}
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <Phone className="size-3.5" aria-hidden /> {site.phone}
              </li>
              <li>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground"
                >
                  <Github className="size-3.5" aria-hidden /> Abdallah-hijazi
                </a>
              </li>
              <li>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-foreground"
                >
                  <Linkedin className="size-3.5" aria-hidden /> LinkedIn
                </a>
              </li>
            </ul>
          </header>

          {/* Summary */}
          <ResumeSection title="Summary">
            <p className="leading-relaxed text-muted print:text-black">
              {profile.summary}
            </p>
          </ResumeSection>

          {/* Experience */}
          <ResumeSection title="Experience">
            <div className="space-y-7">
              {experience.map((entry) => (
                <div key={entry.id} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h4 className="font-display text-lg font-semibold">
                      {entry.role}
                    </h4>
                    <p className="font-mono text-xs text-muted">
                      {formatDateRange(entry.start, entry.end)}
                    </p>
                  </div>
                  <p className="text-sm text-accent-strong print:text-black">
                    {entry.company} · {entry.type}
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {entry.achievements.map((achievement) => (
                      <li
                        key={achievement}
                        className="flex gap-2.5 text-sm leading-relaxed text-muted print:text-black"
                      >
                        <span
                          className="mt-2 size-1 shrink-0 rounded-full bg-accent print:bg-black"
                          aria-hidden
                        />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ResumeSection>

          {/* Skills */}
          <ResumeSection title="Technical skills">
            <dl className="space-y-3">
              {skillCategories.map((category) => (
                <div key={category.id} className="flex flex-wrap gap-x-3 text-sm">
                  <dt className="w-32 shrink-0 font-medium">{category.label}:</dt>
                  <dd className="flex-1 text-muted print:text-black">
                    {category.skills.map((s) => s.name).join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </ResumeSection>

          {/* Education */}
          <ResumeSection title="Education">
            {education.map((entry) => (
              <div
                key={entry.degree}
                className="flex flex-wrap items-baseline justify-between gap-2"
              >
                <div>
                  <h4 className="font-display font-semibold">{entry.degree}</h4>
                  <p className="text-sm text-muted print:text-black">
                    {entry.institution} · {entry.detail}
                  </p>
                </div>
                <p className="font-mono text-xs text-muted">{entry.years}</p>
              </div>
            ))}
          </ResumeSection>

          {/* Certifications */}
          <ResumeSection title="Certifications & achievements">
            <ul className="space-y-2">
              {certifications.map((cert) => (
                <li
                  key={cert.id}
                  className="flex flex-wrap items-baseline justify-between gap-2 text-sm"
                >
                  <span>
                    {cert.title}{" "}
                    <span className="text-muted print:text-black">
                      — {cert.issuer}
                    </span>
                    {cert.highlight && (
                      <Badge className="ml-2 print:hidden">{cert.highlight}</Badge>
                    )}
                  </span>
                  <span className="font-mono text-xs text-muted">{cert.year}</span>
                </li>
              ))}
              <li className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
                <span>IEEE Xtreme V17 — Top 5 National Finalist</span>
                <span className="font-mono text-xs text-muted">2024</span>
              </li>
            </ul>
          </ResumeSection>

          {/* Languages */}
          <ResumeSection title="Languages" last>
            <p className="text-sm text-muted print:text-black">
              {profile.languages.map((l) => `${l.name} (${l.level})`).join(" · ")}
            </p>
          </ResumeSection>
        </article>
      </div>
    </div>
  );
}

function ResumeSection({
  title,
  children,
  last = false,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section
      className={`pt-8 ${last ? "" : "border-b border-line pb-8"} print:border-gray-300`}
    >
      <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent-strong print:text-black">
        {title}
      </h3>
      {children}
    </section>
  );
}
