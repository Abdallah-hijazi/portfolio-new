"use client";

import { cn } from "@/lib/utils";

import { ExplodedFigure } from "./exploded-figure";
import { PadlockFigure } from "./padlock-figure";
import { PlotFigure } from "./plot-figure";
import { TerminalFigure } from "./terminal-figure";
import { useFigurePointer, type FigurePointer } from "./use-figure-pointer";

import type { FigureKind } from "./figure-kind";

export type { FigureKind };

export const figures: Record<FigureKind, (props: { p: FigurePointer }) => React.ReactNode> = {
  exploded: ExplodedFigure,
  padlock: PadlockFigure,
  plot: PlotFigure,
  terminal: TerminalFigure,
};

/** A hairline figure that tracks the pointer over its own box. */
export function InteractiveFigure({
  kind,
  className,
}: {
  kind: FigureKind;
  className?: string;
}) {
  const Figure = figures[kind];
  const { value, handlers } = useFigurePointer();
  return (
    <div aria-hidden className={cn("aspect-[5/4]", className)} {...handlers}>
      <Figure p={value} />
    </div>
  );
}

