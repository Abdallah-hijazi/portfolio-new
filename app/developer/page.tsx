import { ArrowRight, Blocks, Github, Rocket, ShieldCheck, Workflow } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { ProjectCard } from "@/features/projects/project-card";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Developer Mode",
  description:
    "Full-stack engineering workspace: React, Next.js, Laravel, Node.js — scalable platforms, REST APIs, and payment integrations.",
  alternates: { canonical: "/developer/" },
};

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Vue.js",
  "Laravel",
  "PHP",
  "Node.js",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "REST APIs",
  "Tailwind CSS",
  "Docker",
  "Git",
];

const principles = [
  {
    icon: Blocks,
    title: "Architecture before code",
    detail:
      "Clear API contracts and domain boundaries first — the UI and services stay independently shippable.",
  },
  {
    icon: Rocket,
    title: "Performance is a feature",
    detail:
      "Measured, not guessed: a 25% load-time cut at Interphase came from profiling, budgets, and discipline.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    detail:
      "OWASP-aligned habits in every build — auth flows, payments, and inputs treated as attack surface.",
  },
  {
    icon: Workflow,
    title: "Production-ready delivery",
    detail:
      "Clean, maintainable code with structured testing and deployment workflows — shipped on schedule.",
  },
];

export default function DeveloperPage() {
  const devProjects = projects.filter((p) => p.modes.includes("developer"));
  const devExperience = experience.filter((e) => e.modes.includes("developer"));

  return (
    <>
      <PageHeader
        crumbs={[{ label: "Developer Mode" }]}
        eyebrow="dev.workspace"
        title="Full-stack engineering, from schema to pixel"
        description="3+ years building scalable platforms across e-commerce, competition management, and enterprise — React and Next.js on the front, Laravel and Node behind, with APIs designed first."
      >
        <Reveal delay={0.15} className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/projects">
              Browse projects <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <a href={site.social.github} target="_blank" rel="noreferrer">
              <Github aria-hidden /> GitHub
            </a>
          </Button>
        </Reveal>
      </PageHeader>

      {/* Tech marquee */}
      <section aria-label="Technology stack" className="border-y border-line/60 bg-surface/40 py-5">
        <div className="relative overflow-hidden">
          <div
            className="flex w-max animate-marquee gap-3 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:justify-center"
            aria-hidden={false}
          >
            {[...stack, ...stack].map((tech, i) => (
              <Badge
                key={`${tech}-${i}`}
                variant="outline"
                className="shrink-0 px-4 py-1.5 text-sm"
                aria-hidden={i >= stack.length}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="principles" className="container py-24">
        <SectionHeading
          eyebrow="How I work"
          title="Engineering principles"
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {principles.map((principle) => (
            <StaggerItem key={principle.title} className="h-full">
              <div className="glass glass-hover flex h-full flex-col gap-4 rounded-2xl p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                  <principle.icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-display text-lg font-semibold">
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {principle.detail}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section
        aria-labelledby="dev-projects"
        className="border-y border-line/60 bg-surface/40 py-24"
      >
        <div className="container">
          <SectionHeading
            eyebrow="Shipped"
            title="Development projects"
            actions={
              <Button asChild variant="outline">
                <Link href="/projects">
                  All projects <ArrowRight aria-hidden />
                </Link>
              </Button>
            }
          />
          <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {devProjects.slice(0, 6).map((project) => (
              <StaggerItem key={project.slug} className="h-full">
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section aria-labelledby="dev-roles" className="container py-24">
        <SectionHeading eyebrow="Where" title="Development roles" />
        <div className="grid gap-4 lg:grid-cols-2">
          {devExperience.map((entry, i) => (
            <Reveal key={entry.id} delay={i * 0.05}>
              <Link
                href={`/experience/#${entry.id}`}
                className="glass glass-hover flex h-full flex-col gap-2 rounded-2xl p-6"
              >
                <span className="font-mono text-xs text-muted">
                  {entry.start} — {entry.end ?? "Present"}
                </span>
                <span className="font-display text-lg font-semibold">
                  {entry.role}
                </span>
                <span className="text-sm text-accent-strong">{entry.company}</span>
                <span className="text-sm leading-relaxed text-muted">
                  {entry.summary}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
