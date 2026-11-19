"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/layout/breadcrumbs";
import { InteractiveFigure, type FigureKind } from "@/components/figures";
import { Particles } from "@/components/magic/particles";
import { BlurInText } from "@/components/magic/text-animate";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
  /** Hairline figure shown beside the title on large screens. */
  figure?: FigureKind;
}

const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * Inner-page header: particle field, hairline ruler, blur-in title and an
 * optional cursor-reactive hairline figure. Matches the home hero.
 */
export function PageHeader({
  crumbs,
  eyebrow,
  title,
  description,
  children,
  className,
  figure,
}: PageHeaderProps) {
  return (
    <div className={cn("relative overflow-hidden pb-12 pt-28 sm:pt-32", className)}>
      <Particles quantity={55} className="-z-10" />
      <span aria-hidden className="hero-rule absolute inset-x-0 bottom-0 h-px" />
      <div className="container">
        <Breadcrumbs items={crumbs} className="mb-8" />
        <div className={cn(figure && "grid items-center gap-10 lg:grid-cols-[1fr_320px]")}>
          <div>
            {eyebrow && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: easeOut }}
                className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-muted"
              >
                <span className="text-terminal-green">/</span> {eyebrow}
              </motion.p>
            )}
            <h1 className="max-w-3xl font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
              <BlurInText text={title} by="word" stagger={0.07} delay={0.05} />
            </h1>
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.25, ease: easeOut }}
                className="mt-5 max-w-2xl text-lg leading-relaxed text-muted text-balance"
              >
                {description}
              </motion.p>
            )}
          </div>
          {figure && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
              className="hidden rounded-2xl border border-line/70 bg-background/40 backdrop-blur-sm lg:block"
            >
              <InteractiveFigure kind={figure} />
            </motion.div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}
