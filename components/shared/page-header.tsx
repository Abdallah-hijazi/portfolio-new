import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

/** Standard header block for inner pages: breadcrumbs, title, intro. */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  description,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn("relative pb-12 pt-28 sm:pt-32", className)}>
      <div className="grid-bg absolute inset-0 -z-10" aria-hidden />
      <div className="container">
        <Breadcrumbs items={crumbs} className="mb-8" />
        <Reveal>
          {eyebrow && (
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-accent-strong">
              {eyebrow}
            </p>
          )}
          <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted text-balance">
              {description}
            </p>
          )}
        </Reveal>
        {children}
      </div>
    </div>
  );
}
