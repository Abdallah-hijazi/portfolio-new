import { ArrowRight, Award, BriefcaseBusiness } from "lucide-react";
import Link from "next/link";

import { Marquee } from "@/components/magic/marquee";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { certifications } from "@/data/certifications";
import { recentExperience } from "@/data/experience";
import { profile } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { ProjectCard } from "@/features/projects/project-card";
import { formatDateRange } from "@/lib/utils";

export function StatsSection() {
  return (
    <section id="stats" aria-label="Key numbers" className="border-y border-line/60 bg-surface/40">
      <div className="container grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
        {profile.stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.06} className="text-center">
            <p className="font-display text-4xl font-bold text-foreground sm:text-5xl">
              <AnimatedCounter value={stat.value} suffix={stat.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{stat.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const stackRows = [
  ["React", "Next.js", "TypeScript", "Tailwind CSS", "React Query", "Zustand", "Redux Toolkit", "Material UI", "Ant Design", "next-intl", "Vite", "Framer Motion"],
  ["Node.js", "Fastify", "Express", "Laravel", "Sequelize", "MySQL", "PostgreSQL", "Redis", "Socket.io", "OpenAI API", "Firebase", "Elasticsearch"],
  ["Burp Suite", "OWASP Top 10", "nuclei", "subfinder", "httpx", "Semgrep", "CodeQL", "Playwright", "Scapy", "Nmap", "Python", "CVSS v3.1"],
];

export function StackMarquee() {
  return (
    <section aria-label="Technologies I work with" className="py-14">
      <p className="mb-6 text-center font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
        Build · Ship · Break
      </p>
      <div className="space-y-3">
        {stackRows.map((row, i) => (
          <Marquee key={i} reverse={i % 2 === 1} duration={45 + i * 8}>
            {row.map((tech) => (
              <span
                key={tech}
                className="whitespace-nowrap rounded-full border border-line/80 bg-surface/40 px-4 py-1.5 font-mono text-xs text-muted transition-colors hover:border-foreground/30 hover:text-foreground"
              >
                {tech}
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}

export function FeaturedProjectsSection() {
  const order = ["security-assessments", "ai-voice-ordering", "automotive-digital-ecosystem"];
  const projects = [
    ...order
      .map((slug) => featuredProjects.find((p) => p.slug === slug))
      .filter((p): p is (typeof featuredProjects)[number] => Boolean(p)),
    ...featuredProjects.filter((p) => !order.includes(p.slug)),
  ].slice(0, 3);
  return (
    <section aria-labelledby="featured-projects" className="container py-24">
      <SectionHeading
        eyebrow="Selected work"
        title="Featured projects"
        description="Security research, AI-powered products and production platforms — each with a full case study."
        actions={
          <Button asChild variant="outline">
            <Link href="/projects">
              All projects <ArrowRight aria-hidden />
            </Link>
          </Button>
        }
      />
      <Stagger className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <StaggerItem key={project.slug} className="h-full">
            <ProjectCard project={project} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export function RecentExperienceSection() {
  return (
    <section
      aria-labelledby="recent-experience"
      className="border-y border-line/60 bg-surface/40 py-24"
    >
      <div className="container">
        <SectionHeading
          eyebrow="Career"
          title="Recent experience"
          actions={
            <Button asChild variant="outline">
              <Link href="/experience">
                Full timeline <ArrowRight aria-hidden />
              </Link>
            </Button>
          }
        />
        <Stagger className="grid gap-4 lg:grid-cols-3">
          {recentExperience.map((entry) => (
            <StaggerItem key={entry.id} className="h-full">
              <Link
                href={`/experience/#${entry.id}`}
                className="glass glass-hover flex h-full flex-col gap-3 rounded-2xl p-6"
              >
                <span className="flex items-center gap-2 font-mono text-xs text-muted">
                  <BriefcaseBusiness className="size-3.5" aria-hidden />
                  {formatDateRange(entry.start, entry.end)}
                </span>
                <span className="font-display text-lg font-semibold leading-snug">
                  {entry.role}
                </span>
                <span className="text-sm text-accent-strong">{entry.company}</span>
                <span className="text-sm leading-relaxed text-muted">
                  {entry.summary}
                </span>
                <span className="mt-auto flex flex-wrap gap-1.5 pt-2">
                  {entry.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

export function LatestCertificationsSection() {
  const latest = certifications.slice(0, 4);
  return (
    <section aria-labelledby="latest-certifications" className="container py-24">
      <SectionHeading
        eyebrow="Credentials"
        title="Latest certifications"
        actions={
          <Button asChild variant="outline">
            <Link href="/certifications">
              All credentials <ArrowRight aria-hidden />
            </Link>
          </Button>
        }
      />
      <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {latest.map((cert) => (
          <StaggerItem key={cert.id} className="h-full">
            <Link
              href="/certifications"
              className="glass glass-hover flex h-full flex-col gap-3 rounded-2xl p-6"
            >
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                <Award className="size-5" aria-hidden />
              </span>
              <span className="font-display font-semibold leading-snug">
                {cert.title}
              </span>
              <span className="text-sm text-muted">{cert.issuer}</span>
              {cert.highlight && (
                <Badge className="w-fit">{cert.highlight}</Badge>
              )}
              <span className="mt-auto pt-1 font-mono text-xs text-muted">
                {cert.year}
              </span>
            </Link>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

export function ContactCtaSection() {
  return (
    <section aria-label="Get in touch" className="container pb-28">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
          <div
            aria-hidden
            className="absolute inset-0 opacity-40"
            style={{
              background:
                "radial-gradient(ellipse 55% 65% at 50% 110%, hsl(var(--accent) / 0.35), transparent 70%)",
            }}
          />
          <p className="relative font-mono text-xs uppercase tracking-[0.25em] text-accent-strong">
            Available for new work
          </p>
          <h2 className="relative mx-auto mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
            Let&apos;s build something fast, secure, and worth shipping.
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-muted text-balance">
            {profile.availability}
          </p>
          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/contact">
                Get in touch <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/resume">View resume</Link>
            </Button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
