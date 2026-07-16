"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Brain,
  Cloud,
  Database,
  Layout,
  Server,
  Shield,
  Wrench,
} from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { RadarChart } from "@/features/ai/charts";
import { skillCategories } from "@/data/skills";
import type { Skill, SkillLevel } from "@/data/types";
import { cn } from "@/lib/utils";

const categoryIcons: Record<string, typeof Layout> = {
  layout: Layout,
  server: Server,
  database: Database,
  cloud: Cloud,
  shield: Shield,
  brain: Brain,
  wrench: Wrench,
};

const levelDescriptions: Record<SkillLevel, string> = {
  Expert: "daily production use, deep knowledge",
  Advanced: "production-proven, self-sufficient",
  Proficient: "comfortable, regularly applied",
  Foundational: "working knowledge, growing",
};

const SEGMENTS = 5;

/**
 * Five-segment signal indicator — reads as a precision instrument
 * rather than a progress bar. Fully labeled for screen readers.
 */
function SkillSignal({ skill, delay }: { skill: Skill; delay: number }) {
  const reduceMotion = useReducedMotion();
  const filled = Math.round((skill.score / 100) * SEGMENTS);

  return (
    <div
      className="flex items-center justify-between gap-4 py-2.5"
      role="meter"
      aria-valuenow={skill.score}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${skill.name}: ${skill.level} (${levelDescriptions[skill.level]})`}
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground/90">
          {skill.name}
        </p>
        <p className="text-[11px] text-muted">
          {skill.level}
          {skill.note ? ` · ${skill.note}` : ""}
        </p>
      </div>
      <div className="flex shrink-0 items-end gap-1" aria-hidden>
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <motion.span
            key={i}
            initial={reduceMotion ? { scaleY: 1, opacity: 1 } : { scaleY: 0.25, opacity: 0.3 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.4, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: `${8 + i * 3}px`, transformOrigin: "bottom" }}
            className={cn(
              "w-1.5 rounded-full",
              i < filled ? "bg-accent" : "bg-surface-2",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function SkillsView() {
  const radarData = skillCategories.map((cat) => ({
    label: cat.label.split(" ")[0],
    value: Math.round(
      cat.skills.reduce((sum, s) => sum + s.score, 0) / cat.skills.length,
    ),
  }));

  return (
    <div className="space-y-14">
      {/* Overview radar */}
      <Reveal className="glass mx-auto max-w-xl rounded-3xl p-8">
        <h2 className="text-center font-display text-lg font-semibold">
          Capability overview
        </h2>
        <p className="mt-1 text-center text-sm text-muted">
          Average proficiency per category
        </p>
        <RadarChart data={radarData} />
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          <Badge variant="subtle">Expert 90+</Badge>
          <Badge variant="subtle">Advanced 75+</Badge>
          <Badge variant="subtle">Proficient 55+</Badge>
          <Badge variant="subtle">Foundational &lt;55</Badge>
        </div>
      </Reveal>

      {/* Category cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((category, catIndex) => {
          const Icon = categoryIcons[category.icon] ?? Layout;
          return (
            <Reveal
              key={category.id}
              delay={catIndex * 0.05}
              className="glass glass-hover rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 border-b border-line/60 pb-4">
                <span className="flex size-10 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <h2 className="font-display font-semibold">{category.label}</h2>
                  <p className="font-mono text-[11px] text-muted">
                    {category.skills.length} skills
                  </p>
                </div>
              </div>
              <div className="mt-2 divide-y divide-line/40">
                {category.skills.map((skill, i) => (
                  <SkillSignal key={skill.name} skill={skill} delay={i * 0.03} />
                ))}
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
