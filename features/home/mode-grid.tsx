"use client";

import { ArrowUpRight, Brain, Code2, GraduationCap, ShieldHalf } from "lucide-react";

import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shared/section-heading";
import { useMode } from "@/features/modes/mode-context";
import { modes, type ModeConfig } from "@/features/modes/mode-config";
import type { ModeId } from "@/data/types";

const modeIcons: Record<ModeId, typeof Code2> = {
  developer: Code2,
  security: ShieldHalf,
  ai: Brain,
  teaching: GraduationCap,
};

/** "Choose your workspace" — entry points into the four identity modes. */
export function ModeGrid() {
  const { switchMode } = useMode();

  return (
    <section aria-labelledby="modes-heading" className="container py-24">
      <SectionHeading
        eyebrow="One person, four workspaces"
        title="Boot an identity"
        description="Each mode is a themed workspace with its own interface — switching feels like changing operating systems, not pages. Try keys 1–4."
        align="center"
      />

      <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {modes.map((mode) => (
          <StaggerItem key={mode.id}>
            <ModeCard mode={mode} onLaunch={() => switchMode(mode.id)} />
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
}

function ModeCard({
  mode,
  onLaunch,
}: {
  mode: ModeConfig;
  onLaunch: () => void;
}) {
  const Icon = modeIcons[mode.id];

  return (
    <button
      type="button"
      onClick={onLaunch}
      className="glass glass-hover group relative flex h-full w-full flex-col items-start gap-4 overflow-hidden rounded-2xl p-6 text-left"
      aria-label={`Launch ${mode.label}`}
    >
      <span
        aria-hidden
        className="absolute -right-16 -top-16 size-40 rounded-full opacity-[0.13] blur-2xl transition-opacity duration-500 group-hover:opacity-30"
        style={{ background: mode.color }}
      />

      <span className="flex items-center justify-between self-stretch">
        <span
          className="flex size-11 items-center justify-center rounded-xl"
          style={{ background: `${mode.color}22`, color: mode.color }}
        >
          <Icon className="size-5" aria-hidden />
        </span>
        <span className="flex items-center gap-2">
          <kbd className="kbd">{mode.shortcut}</kbd>
          <ArrowUpRight
            className="size-4 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground"
            aria-hidden
          />
        </span>
      </span>

      <span className="mt-2 block">
        <span className="block font-display text-lg font-semibold">
          {mode.label}
        </span>
        <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          {mode.tagline}
        </span>
      </span>

      <span className="block text-sm leading-relaxed text-muted">
        {mode.description}
      </span>

      <span className="mt-auto flex items-center gap-2 pt-2 font-mono text-[11px] text-muted">
        <span
          className="inline-block size-1.5 animate-pulse-soft rounded-full"
          style={{ background: mode.color }}
          aria-hidden
        />
        system ready
      </span>
    </button>
  );
}
