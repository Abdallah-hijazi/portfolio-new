import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers,
  Lightbulb,
  Target,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { figureForCategory } from "@/components/figures/figure-kind";
import { PageHeader } from "@/components/shared/page-header";
import { PlaceholderVisual } from "@/components/shared/placeholder-visual";
import { JsonLd } from "@/components/shared/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProject, projects } from "@/data/projects";
import { ProjectLinks } from "@/features/projects/project-links";
import { site } from "@/lib/site";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}/` },
    openGraph: {
      title: `${project.title} · ${site.name}`,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.overview,
    author: { "@type": "Person", name: site.name },
    dateCreated: String(project.year),
    keywords: project.technologies.join(", "),
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      <PageHeader
        figure={figureForCategory(project.category)}
        crumbs={[{ label: "Projects", href: "/projects" }, { label: project.title }]}
        eyebrow={`${project.category} · ${project.year}`}
        title={project.title}
        description={project.tagline}
      >
        <Reveal delay={0.12} className="mt-8 flex flex-wrap items-center gap-3">
          <Badge variant="success">{project.status}</Badge>
          <Badge variant="subtle">{project.role}</Badge>
          <ProjectLinks links={project.links} linksNote={project.linksNote} />
        </Reveal>
      </PageHeader>

      <div className="container grid gap-12 pb-28 lg:grid-cols-[minmax(0,1fr)_280px]">
        <article className="min-w-0 space-y-16">
          {/* Screenshots */}
          <Reveal>
            <section aria-label="Screenshots">
              <PlaceholderVisual
                kind={figureForCategory(project.category)}
                label={project.screenshots[0]?.alt ?? project.title}
                note={project.linksNote ? "client work · visuals kept private" : undefined}
                className="aspect-video"
              />
            </section>
          </Reveal>

          <ProjectSection icon={Layers} title="Overview">
            <p>{project.overview}</p>
          </ProjectSection>

          <ProjectSection icon={Target} title="The problem">
            <p>{project.problem}</p>
          </ProjectSection>

          <ProjectSection icon={CheckCircle2} title="The solution">
            <p>{project.solution}</p>
          </ProjectSection>

          <ProjectSection icon={Layers} title="Architecture">
            <ul className="space-y-3">
              {project.architecture.map((item) => (
                <li key={item} className="flex gap-3">
                  <span
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ProjectSection>

          <ProjectSection icon={AlertTriangle} title="Challenges">
            <div className="grid gap-4 sm:grid-cols-2">
              {project.challenges.map((challenge) => (
                <div key={challenge.title} className="glass rounded-2xl p-5">
                  <h3 className="font-display font-semibold">{challenge.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {challenge.detail}
                  </p>
                </div>
              ))}
            </div>
          </ProjectSection>

          <ProjectSection icon={Lightbulb} title="Lessons learned">
            <ul className="space-y-3">
              {project.lessons.map((lesson) => (
                <li key={lesson} className="flex gap-3">
                  <Lightbulb className="mt-1 size-4 shrink-0 text-accent-strong" aria-hidden />
                  <span>{lesson}</span>
                </li>
              ))}
            </ul>
          </ProjectSection>

          {/* Prev/next navigation */}
          <nav
            aria-label="Project navigation"
            className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8"
          >
            <Button asChild variant="ghost">
              <Link href="/projects">
                <ArrowLeft aria-hidden /> All projects
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href={`/projects/${next.slug}`}>
                Next: {next.title} <ArrowRight aria-hidden />
              </Link>
            </Button>
          </nav>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:h-fit">
          <div className="glass rounded-2xl p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Stack
            </h2>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {project.metrics && (
            <div className="glass rounded-2xl p-6">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Key numbers
              </h2>
              <dl className="mt-4 space-y-4">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dt className="text-xs text-muted">{metric.label}</dt>
                    <dd className="font-display text-xl font-bold text-accent-strong">
                      {metric.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <div className="glass rounded-2xl p-6">
            <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Role
            </h2>
            <p className="mt-3 text-sm leading-relaxed">{project.role}</p>
          </div>

          <ProjectLinks
            links={project.links}
            linksNote={project.linksNote}
            variant="sidebar"
          />
        </aside>
      </div>
    </>
  );
}

function ProjectSection({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Layers;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal as="section">
      <h2 className="mb-5 flex items-center gap-3 font-display text-2xl font-bold">
        <span className="flex size-9 items-center justify-center rounded-lg bg-accent-soft text-accent-strong">
          <Icon className="size-4" aria-hidden />
        </span>
        {title}
      </h2>
      <div className="leading-relaxed text-foreground/85 [&>p]:max-w-3xl">
        {children}
      </div>
    </Reveal>
  );
}
