"use client";

import { motion } from "framer-motion";
import { Award, BadgeCheck, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { certifications } from "@/data/certifications";
import type { Certification } from "@/data/types";
import { cn } from "@/lib/utils";

const categories = ["All", "Development", "Security", "Data & AI"] as const;
type CategoryFilter = (typeof categories)[number];

const categoryIcons: Record<Certification["category"], typeof Award> = {
  Development: BadgeCheck,
  Security: ShieldCheck,
  "Data & AI": Sparkles,
};

export function CertificationsView() {
  const [filter, setFilter] = useState<CategoryFilter>("All");

  const visible =
    filter === "All"
      ? certifications
      : certifications.filter((c) => c.category === filter);

  return (
    <div>
      {/* Filter pills */}
      <div
        role="group"
        aria-label="Filter certifications by category"
        className="mb-8 flex flex-wrap gap-2"
      >
        {categories.map((category) => {
          const active = filter === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              aria-pressed={active}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                active
                  ? "text-background"
                  : "glass text-muted hover:text-foreground",
              )}
            >
              {active && (
                <motion.span
                  layoutId="cert-filter-pill"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 38 }}
                  aria-hidden
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          );
        })}
      </div>

      <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" key={filter}>
        {visible.map((cert) => {
          const Icon = categoryIcons[cert.category];
          return (
            <StaggerItem key={cert.id} className="h-full">
              <article className="glass glass-hover group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl p-6">
                <div
                  aria-hidden
                  className="absolute -right-10 -top-10 size-32 rounded-full bg-accent/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <div className="flex items-start justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <Badge variant="subtle">{cert.year}</Badge>
                </div>

                <div>
                  <h2 className="font-display text-lg font-semibold leading-snug">
                    {cert.title}
                  </h2>
                  <p className="mt-1 text-sm text-muted">{cert.issuer}</p>
                </div>

                {cert.highlight && <Badge className="w-fit">{cert.highlight}</Badge>}

                <div className="mt-auto flex items-center justify-between border-t border-line/60 pt-4">
                  <Badge variant="outline">{cert.category}</Badge>
                  {cert.credentialUrl ? (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs text-accent-strong hover:underline"
                    >
                      View trophy <ExternalLink className="size-3" aria-hidden />
                    </a>
                  ) : (
                    <span className="font-mono text-[10px] text-muted">
                      PDF available on request
                    </span>
                  )}
                </div>
              </article>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
