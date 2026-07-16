import { BookOpen, GraduationCap, Presentation, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { teachingPrinciples, teachingTimeline } from "@/data/teaching";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Teaching Mode",
  description:
    "Training and mentorship: three years teaching web development, cybersecurity fundamentals, and computer science — from private tutoring to junior developer mentorship.",
  alternates: { canonical: "/teaching/" },
};

const focusAreas = [
  {
    icon: BookOpen,
    title: "Web development curriculum",
    detail:
      "Frontend frameworks, backend architecture, and API-driven development — taught project-first.",
  },
  {
    icon: Users,
    title: "Mentorship",
    detail:
      "Code reviews, pair debugging, and career guidance for junior developers entering the field.",
  },
  {
    icon: Presentation,
    title: "Security awareness",
    detail:
      "OWASP-aligned secure coding habits, taught with live attack/defense demonstrations.",
  },
  {
    icon: GraduationCap,
    title: "Academic tutoring",
    detail:
      "Programming fundamentals, Java, Python, and databases for university and school students.",
  },
];

export default function TeachingPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Teaching Mode" }]}
        eyebrow="edu.workspace"
        title="Teaching developers to build — and break — with intent"
        description="Three years of training and tutoring: modern web development, security fundamentals, and computer science, delivered one-on-one and in groups."
      >
        <Reveal delay={0.15} className="mt-8">
          <Button asChild>
            <a href={`mailto:${site.email}?subject=Training%20inquiry`}>
              Book a training session
            </a>
          </Button>
        </Reveal>
      </PageHeader>

      <section aria-labelledby="focus-areas" className="container pb-8">
        <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {focusAreas.map((area) => (
            <StaggerItem key={area.title} className="h-full">
              <div className="glass glass-hover flex h-full flex-col gap-4 rounded-2xl p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                  <area.icon className="size-5" aria-hidden />
                </span>
                <h2 className="font-display text-lg font-semibold">{area.title}</h2>
                <p className="text-sm leading-relaxed text-muted">{area.detail}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Teaching timeline */}
      <section aria-labelledby="teaching-timeline" className="container py-20">
        <SectionHeading
          eyebrow="Track record"
          title="Teaching timeline"
        />
        <ol className="relative ml-3 space-y-10 border-l border-line pl-8 sm:ml-6">
          {teachingTimeline.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 0.05} className="relative">
              <span
                className="absolute -left-[41px] top-1.5 flex size-5 items-center justify-center rounded-full border-2 border-accent bg-background"
                aria-hidden
              >
                <span className="size-1.5 rounded-full bg-accent" />
              </span>
              <p className="font-mono text-xs uppercase tracking-wider text-accent-strong">
                {item.period}
              </p>
              <h3 className="mt-2 font-display text-xl font-semibold">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted">{item.audience}</p>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                {item.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {item.topics.map((topic) => (
                  <Badge key={topic} variant="outline">
                    {topic}
                  </Badge>
                ))}
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* Teaching philosophy */}
      <section
        aria-labelledby="philosophy"
        className="border-t border-line/60 bg-surface/40 py-24"
      >
        <div className="container">
          <SectionHeading eyebrow="Approach" title="How I teach" align="center" />
          <div className="grid gap-4 md:grid-cols-3">
            {teachingPrinciples.map((principle, i) => (
              <Reveal key={principle.title} delay={i * 0.07}>
                <div className="glass h-full rounded-2xl p-8 text-center">
                  <p className="font-display text-4xl font-bold text-gradient">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {principle.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 text-center">
            <p className="mx-auto max-w-xl text-muted">
              Want a workshop for your team, a bootcamp session, or one-on-one
              mentorship?
            </p>
            <Button asChild className="mt-6">
              <Link href="/contact">Get in touch</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
