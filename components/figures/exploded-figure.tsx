"use client";

import type { FigurePointer } from "./use-figure-pointer";
import { hair, planeMatrix } from "./iso";

/**
 * Developer figure — an app window exploded into its layers
 * (data → API → components → chrome). Layers spread as the pointer nears.
 */
export function ExplodedFigure({ p }: { p: FigurePointer }) {
  const W = 72;
  const D = 72;
  const ox = 100;
  const oy = 70;
  const gap = 6 + p.a * 11 + (1 - p.y) * p.a * 4;

  const layers = [
    // 0 — data: table rows
    <g key="data">
      {Array.from({ length: 6 }, (_, i) => (
        <line key={i} x1={8} y1={12 + i * 9} x2={W - 8} y2={12 + i * 9} className="fig-mid" {...hair} />
      ))}
      <line x1={26} y1={8} x2={26} y2={D - 8} className="fig-low" {...hair} />
    </g>,
    // 1 — API: endpoint nodes and links
    <g key="api">
      {[
        [18, 18],
        [54, 18],
        [36, 36],
        [18, 54],
        [54, 54],
      ].map(([cx, cy], i) => (
        <rect key={i} x={cx - 5} y={cy - 5} width={10} height={10} rx={2} className="fig-plate fig-lit" {...hair} />
      ))}
      <path d="M23 18 H49 M18 23 V49 M54 23 V49 M23 54 H49 M22 22 L32 32 M50 22 L40 32 M22 50 L32 40 M50 50 L40 40" className="fig-dash fig-mid" fill="none" {...hair} />
    </g>,
    // 2 — components: cards
    <g key="ui">
      <rect x={8} y={8} width={26} height={30} rx={3} className="fig-plate fig-lit" {...hair} />
      <rect x={38} y={8} width={26} height={30} rx={3} className="fig-plate fig-lit" {...hair} />
      <rect x={8} y={42} width={56} height={22} rx={3} className="fig-plate fig-lit" {...hair} />
      <line x1={13} y1={47} x2={44} y2={47} className="fig-mid" {...hair} />
      <line x1={13} y1={52} x2={34} y2={52} className="fig-low" {...hair} />
    </g>,
    // 3 — window chrome
    <g key="chrome">
      <line x1={0} y1={12} x2={W} y2={12} className="fig-lit" {...hair} />
      {[6, 11, 16].map((cx) => (
        <circle key={cx} cx={cx} cy={6} r={1.6} className="fig-lit" fill="none" {...hair} />
      ))}
      <rect x={24} y={3.5} width={36} height={5} rx={2.5} className="fig-mid" fill="none" {...hair} />
    </g>,
  ];

  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" aria-hidden>
      {layers.map((content, i) => {
        const z = i * gap;
        return (
          <g key={i} transform={planeMatrix(ox, oy, z)}>
            <rect
              width={W}
              height={D}
              rx={4}
              className="fig-plate fig-lit"
              style={i === 3 ? { fillOpacity: 0.35 } : undefined}
              {...hair}
            />
            {content}
          </g>
        );
      })}
    </svg>
  );
}
