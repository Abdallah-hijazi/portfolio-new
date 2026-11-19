"use client";

import type { FigurePointer } from "./use-figure-pointer";
import { hair } from "./iso";

/**
 * Security figure — a padlock whose dial turns with the pointer and whose
 * shackle swings open as you get close. Drawn as hairline 2.5D strokes.
 */
export function PadlockFigure({ p }: { p: FigurePointer }) {
  const open = p.a;
  const dial = (p.x - 0.5) * 220 * p.a;
  const lift = open * 11;
  const swing = -open * 32;
  const ticks = Array.from({ length: 24 }, (_, i) => i * 15);

  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" aria-hidden>
      {/* back face (depth) */}
      <rect x={70} y={68} width={76} height={64} rx={9} className="fig-low" fill="none" {...hair} />
      {[
        [64, 74, 70, 68],
        [140, 74, 146, 68],
        [140, 138, 146, 132],
      ].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="fig-low" {...hair} />
      ))}

      {/* shackle */}
      <g transform={`translate(0 ${-lift}) rotate(${swing} 80 76)`}>
        <path d="M80 76 V52 A22 22 0 0 1 124 52 V76" className="fig-lit" fill="none" {...hair} />
        <path d="M86 76 V52 A16 16 0 0 1 118 52 V76" className="fig-mid" fill="none" {...hair} />
      </g>

      {/* body */}
      <rect x={64} y={74} width={76} height={64} rx={9} className="fig-plate fig-lit" {...hair} />
      <line x1={64} y1={84} x2={140} y2={84} className="fig-low" {...hair} />

      {/* dial */}
      <g transform={`rotate(${dial} 102 110)`}>
        <circle cx={102} cy={110} r={17} className="fig-mid" fill="none" {...hair} />
        {ticks.map((deg) => {
          const r1 = deg % 90 === 0 ? 12 : 14;
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={102 + Math.cos(rad) * r1}
              y1={110 + Math.sin(rad) * r1}
              x2={102 + Math.cos(rad) * 16}
              y2={110 + Math.sin(rad) * 16}
              className={deg === 270 ? "fig-lit" : "fig-low"}
              {...hair}
            />
          );
        })}
      </g>
      <circle cx={102} cy={107} r={3.2} className="fig-lit" fill="none" {...hair} />
      <path d="M100.6 109.5 L99.6 117 H104.4 L103.4 109.5" className="fig-lit" fill="none" {...hair} />

      {/* status bits */}
      <g opacity={0.4 + open * 0.6}>
        {[0, 1, 2, 3, 4].map((i) => (
          <circle key={i} cx={156 + (i % 2) * 6} cy={92 + i * 7} r={1.1} className={i < Math.round(open * 5) ? "fig-ok" : "fig-low"} {...hair} />
        ))}
      </g>
    </svg>
  );
}
