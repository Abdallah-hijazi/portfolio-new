"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { figureForCategory, figures, useFigurePointer } from "@/components/figures";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";

const statusVariant: Record<Project["status"], "success" | "default" | "subtle"> = {
  Production: "success",
  "In Progress": "default",
  Delivered: "subtle",
  Ongoing: "default",
};

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  const Figure = figures[figureForCategory(project.category)];
  const { value, handlers } = useFigurePointer();
  return (
    <Link
      href={`/projects/${project.slug}`}
      {...handlers}
      className={cn(
        "glass glass-hover group relative flex h-full flex-col overflow-hidden rounded-2xl",
        className,
      )}
      aria-label={`${project.title} — view case study`}
    >
      {/* Visual header */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-line/60 bg-background/40">
        <div aria-hidden className="h-full">
          <Figure p={value} />
        </div>
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-foreground/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        {project.featured && (
          <Badge className="absolute left-4 top-4">Featured</Badge>
        )}
        <Badge
          variant={statusVariant[project.status]}
          className="absolute right-4 top-4"
        >
          {project.status}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold leading-snug">
            {project.title}
          </h3>
          <ArrowUpRight
            className="mt-1 size-4 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
            aria-hidden
          />
        </div>

        <p className="text-sm leading-relaxed text-muted">{project.tagline}</p>

        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <Badge key={tech} variant="outline">
              {tech}
            </Badge>
          ))}
          {project.technologies.length > 4 && (
            <Badge variant="outline">+{project.technologies.length - 4}</Badge>
          )}
        </div>

        <p className="flex items-center justify-between border-t border-line/60 pt-3 font-mono text-[11px] uppercase tracking-wider text-muted">
          <span>{project.category}</span>
          <span>{project.year}</span>
        </p>
      </div>
    </Link>
  );
}
