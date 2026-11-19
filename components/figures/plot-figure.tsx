"use client";

import type { FigurePointer } from "./use-figure-pointer";
import { hair, iso, pts, planeMatrix } from "./iso";

const BASE = [
  [14, 22, 18, 30, 26],
  [10, 16, 26, 20, 34],
  [6, 12, 14, 24, 18],
];

/**
 * AI & data figure — an isometric bar field. Columns rise toward the
 * pointer, like a model re-weighting its features.
 */
export function PlotFigure({ p }: { p: FigurePointer }) {
  const ox = 104;
  const oy = 62;
  const size = 10;
  const step = 15;
  const cols = 5;
  const rows = 3;

  const bars: { x: number; y: number; h: number; key: string }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const near = 1 - Math.min(1, Math.abs(c / (cols - 1) - p.x) * 2.2);
      const h = BASE[r][c] + near * p.a * 26;
      bars.push({ x: c * step, y: r * step, h, key: `${r}-${c}` });
    }
  }
  // Painter's order: far → near
  bars.sort((a, b) => a.x + a.y - (b.x + b.y));

  return (
    <svg viewBox="0 0 200 160" className="h-full w-full" aria-hidden>
      <g transform={planeMatrix(ox, oy + 6, 0)}>
        <rect x={-6} y={-6} width={cols * step + 2} height={rows * step + 2} rx={3} className="fig-plate fig-mid" {...hair} />
        {Array.from({ length: cols + 1 }, (_, i) => (
          <line key={i} x1={-6 + i * step} y1={-6} x2={-6 + i * step} y2={rows * step - 4} className="fig-low" {...hair} />
        ))}
      </g>
      {bars.map(({ x, y, h, key }) => {
        const top = [iso(x, y, h, ox, oy), iso(x + size, y, h, ox, oy), iso(x + size, y + size, h, ox, oy), iso(x, y + size, h, ox, oy)];
        const left = [iso(x, y + size, 0, ox, oy), iso(x + size, y + size, 0, ox, oy), iso(x + size, y + size, h, ox, oy), iso(x, y + size, h, ox, oy)];
        const right = [iso(x + size, y, 0, ox, oy), iso(x + size, y + size, 0, ox, oy), iso(x + size, y + size, h, ox, oy), iso(x + size, y, h, ox, oy)];
        return (
          <g key={key}>
            <polygon points={pts(left)} className="fig-plate fig-mid" {...hair} />
            <polygon points={pts(right)} className="fig-plate-2 fig-mid" {...hair} />
            <polygon points={pts(top)} className="fig-plate fig-lit" {...hair} />
          </g>
        );
      })}
      {/* trend line riding above the back row */}
      <polyline
        points={pts(
          [0, 1, 2, 3, 4].map((c) => {
            const near = 1 - Math.min(1, Math.abs(c / 4 - p.x) * 2.2);
            return iso(c * step + 5, 5, BASE[0][c] + near * p.a * 26 + 10, ox, oy);
          }),
        )}
        className="fig-lit fig-dash"
        fill="none"
        {...hair}
      />
    </svg>
  );
}
