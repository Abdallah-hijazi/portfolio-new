"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";

import type { FigurePointer } from "./use-figure-pointer";
import { hair, planeMatrix } from "./iso";

const ROWS = [38, 22, 46, 30, 52, 18, 40, 26, 48, 34, 20, 44];
const ROW_H = 7;

/**
 * Teaching figure — an isometric terminal whose lesson scrolls by.
 * Hovering speeds the session up and lifts the window.
 */
export function TerminalFigure({ p }: { p: FigurePointer }) {
  const reduceMotion = useReducedMotion();
  const [offset, setOffset] = useState(0);
  const speed = useRef(4);
  speed.current = 4 + p.a * 22;
  const ref = useRef<SVGSVGElement>(null);
  const clipId = `term-clip-${useId().replace(/:/g, "")}`;

  useEffect(() => {
    if (reduceMotion) return;
    let raf = 0;
    let last = performance.now();
    let visible = true;
    const loop = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      setOffset((o) => (o + dt * speed.current) % (ROWS.length * ROW_H));
      if (visible) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting;
      if (visible && !was) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    });
    if (ref.current) io.observe(ref.current);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [reduceMotion]);

  const W = 84;
  const D = 64;
  const z = 6 + p.a * 10;
  const lines = [...ROWS, ...ROWS];

  return (
    <svg ref={ref} viewBox="0 0 200 160" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id={clipId}>
          <rect x={4} y={13} width={W - 8} height={D - 17} />
        </clipPath>
      </defs>
      {/* shadow plate */}
      <g transform={planeMatrix(102, 54, 0)}>
        <rect width={W} height={D} rx={5} className="fig-low" fill="none" strokeDasharray="2 3" {...hair} />
      </g>
      <g transform={planeMatrix(102, 54, z)}>
        <rect width={W} height={D} rx={5} className="fig-plate fig-lit" {...hair} />
        <line x1={0} y1={10} x2={W} y2={10} className="fig-lit" {...hair} />
        {[6, 11, 16].map((cx) => (
          <circle key={cx} cx={cx} cy={5} r={1.5} className="fig-lit" fill="none" {...hair} />
        ))}
        <g clipPath={`url(#${clipId})`}>
          <g transform={`translate(0 ${-offset})`}>
            {lines.map((len, i) => (
              <g key={i}>
                <line x1={8} y1={18 + i * ROW_H} x2={11} y2={18 + i * ROW_H} className="fig-ok" {...hair} />
                <line x1={14} y1={18 + i * ROW_H} x2={14 + len} y2={18 + i * ROW_H} className={i % 3 === 0 ? "fig-lit" : "fig-mid"} {...hair} />
              </g>
            ))}
          </g>
        </g>
        <rect x={8} y={D - 7} width={4} height={3} className="fig-cursor" />
      </g>
    </svg>
  );
}
