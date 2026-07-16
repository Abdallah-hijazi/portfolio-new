"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Building2, ChevronDown, MapPin } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { experience } from "@/data/experience";
import type { ExperienceEntry } from "@/data/types";
import { cn, formatDateRange } from "@/lib/utils";

/** Interactive vertical timeline with expandable entries. */
export function ExperienceTimeline() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null);

  return (
    <ol className="relative ml-3 space-y-6 border-l border-line pl-8 sm:ml-6">
      {experience.map((entry, index) => (
        <TimelineItem
          key={entry.id}
          entry={entry}
          index={index}
          open={openId === entry.id}
          onToggle={() =>
            setOpenId((current) => (current === entry.id ? null : entry.id))
          }
        />
      ))}
    </ol>
  );
}

function TimelineItem({
  entry,
  index,
  open,
  onToggle,
}: {
  entry: ExperienceEntry;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const isCurrent = !entry.end;
  const panelId = `experience-panel-${entry.id}`;
  const buttonId = `experience-button-${entry.id}`;

  return (
    <motion.li
      id={entry.id}
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="relative scroll-mt-28"
    >
      {/* Timeline node */}
      <span
        className={cn(
          "absolute -left-[41px] top-6 flex size-5 items-center justify-center rounded-full border-2 bg-background",
          isCurrent ? "border-accent" : "border-line",
        )}
        aria-hidden
      >
        <span
          className={cn(
            "size-1.5 rounded-full",
            isCurrent ? "animate-pulse-soft bg-accent" : "bg-muted",
          )}
        />
      </span>

      <div className="glass glass-hover overflow-hidden rounded-2xl">
        <button
          type="button"
          id={buttonId}
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full flex-wrap items-center gap-x-6 gap-y-2 p-6 text-left"
        >
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted">
              {formatDateRange(entry.start, entry.end)}
              {isCurrent && <Badge variant="success">Current</Badge>}
              <Badge variant="subtle">{entry.type}</Badge>
            </span>
            <span className="mt-2 block font-display text-xl font-semibold">
              {entry.role}
            </span>
            <span className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <span className="flex items-center gap-1.5">
                <Building2 className="size-3.5" aria-hidden />
                <span className="text-accent-strong">{entry.company}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5" aria-hidden />
                {entry.location}
              </span>
            </span>
          </span>
          <ChevronDown
            className={cn(
              "size-5 shrink-0 text-muted transition-transform duration-300",
              open && "rotate-180",
            )}
            aria-hidden
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              animate={
                reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }
              }
              exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-line/60 p-6 pt-5">
                <p className="max-w-3xl leading-relaxed text-muted">
                  {entry.summary}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {entry.achievements.map((achievement) => (
                    <li key={achievement} className="flex gap-3 text-sm leading-relaxed">
                      <span
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                      <span className="text-foreground/85">{achievement}</span>
                    </li>
                  ))}
                </ul>

                {entry.metrics && (
                  <dl className="mt-6 flex flex-wrap gap-3">
                    {entry.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="rounded-xl border border-line bg-surface-2/60 px-4 py-2.5"
                      >
                        <dt className="text-[11px] uppercase tracking-wider text-muted">
                          {metric.label}
                        </dt>
                        <dd className="font-display text-lg font-bold text-accent-strong">
                          {metric.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                <div className="mt-6 flex flex-wrap gap-1.5">
                  {entry.technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}
