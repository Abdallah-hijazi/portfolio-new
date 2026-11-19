"use client";

import { InteractiveFigure, type FigureKind } from "@/components/figures";
import { Particles } from "@/components/magic/particles";
import { cn } from "@/lib/utils";

/**
 * Visual block for projects without public screenshots: a cursor-reactive
 * hairline figure over a quiet particle field. Never fabricates imagery.
 */
export function PlaceholderVisual({
  label,
  className,
  kind = "exploded",
  note,
}: {
  label: string;
  className?: string;
  kind?: FigureKind;
  note?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface/60",
        className,
      )}
    >
      <Particles quantity={40} />
      <InteractiveFigure kind={kind} className="relative z-10 h-full max-h-[22rem]" />
      {note && (
        <p className="absolute bottom-3 left-4 z-10 font-mono text-[11px] text-muted">{note}</p>
      )}
    </div>
  );
}
