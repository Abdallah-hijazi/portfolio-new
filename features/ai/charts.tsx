"use client";

import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Lightweight, dependency-free SVG charts animated with Framer Motion */
/* ------------------------------------------------------------------ */

export interface BarDatum {
  label: string;
  value: number;
}

/** Horizontal bar chart with animated fills. */
export function BarChart({
  data,
  max = 100,
  className,
  unit = "",
}: {
  data: BarDatum[];
  max?: number;
  className?: string;
  unit?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("space-y-3.5", className)}>
      {data.map((d, i) => (
        <div key={d.label}>
          <div className="mb-1.5 flex items-baseline justify-between text-sm">
            <span className="text-foreground/90">{d.label}</span>
            <span className="font-mono text-xs text-muted">
              {d.value}
              {unit}
            </span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-surface-2"
            role="meter"
            aria-label={d.label}
            aria-valuenow={d.value}
            aria-valuemin={0}
            aria-valuemax={max}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, hsl(var(--accent) / 0.65), hsl(var(--accent-strong)))",
              }}
              initial={{ width: reduceMotion ? `${(d.value / max) * 100}%` : "0%" }}
              whileInView={{ width: `${(d.value / max) * 100}%` }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Animated radial gauge (0–100). */
export function RadialGauge({
  value,
  label,
  sublabel,
  className,
}: {
  value: number;
  label: string;
  sublabel?: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const target = circumference * (1 - value / 100);

  return (
    <figure
      className={cn("flex flex-col items-center gap-3", className)}
      role="img"
      aria-label={`${label}: ${value} out of 100`}
    >
      <div className="relative size-28">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="6"
            className="stroke-surface-2"
          />
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            strokeWidth="6"
            strokeLinecap="round"
            stroke="hsl(var(--accent))"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: reduceMotion ? target : circumference }}
            whileInView={{ strokeDashoffset: target }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-bold">
          {value}
        </span>
      </div>
      <figcaption className="text-center">
        <span className="block text-sm font-medium">{label}</span>
        {sublabel && <span className="block text-xs text-muted">{sublabel}</span>}
      </figcaption>
    </figure>
  );
}

export interface RadarDatum {
  label: string;
  value: number; // 0–100
}

/** Radar / spider chart for multi-axis skill overviews. */
export function RadarChart({
  data,
  className,
  size = 300,
}: {
  data: RadarDatum[];
  className?: string;
  size?: number;
}) {
  const reduceMotion = useReducedMotion();
  const center = size / 2;
  const maxRadius = size * 0.36;
  const angleStep = (Math.PI * 2) / data.length;

  const pointFor = (index: number, ratio: number): [number, number] => {
    const angle = -Math.PI / 2 + index * angleStep;
    return [
      center + Math.cos(angle) * maxRadius * ratio,
      center + Math.sin(angle) * maxRadius * ratio,
    ];
  };

  const polygonPoints = data
    .map((d, i) => pointFor(i, d.value / 100).join(","))
    .join(" ");

  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <figure
      className={cn("mx-auto", className)}
      role="img"
      aria-label={`Skill radar: ${data.map((d) => `${d.label} ${d.value}`).join(", ")}`}
    >
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full max-w-md">
        {rings.map((ring) => (
          <polygon
            key={ring}
            points={data.map((_, i) => pointFor(i, ring).join(",")).join(" ")}
            fill="none"
            className="stroke-line"
            strokeWidth="1"
          />
        ))}
        {data.map((_, i) => {
          const [x, y] = pointFor(i, 1);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              className="stroke-line"
              strokeWidth="1"
            />
          );
        })}

        <motion.polygon
          points={polygonPoints}
          fill="hsl(var(--accent) / 0.18)"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={reduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {data.map((d, i) => {
          const [x, y] = pointFor(i, d.value / 100);
          return (
            <circle key={d.label} cx={x} cy={y} r="3.5" fill="hsl(var(--accent-strong))" />
          );
        })}

        {data.map((d, i) => {
          const [x, y] = pointFor(i, 1.22);
          return (
            <text
              key={d.label}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-muted text-[11px] font-medium"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
    </figure>
  );
}

/** Animated area/line chart from a static series. */
export function AreaChart({
  data,
  className,
  labels,
}: {
  data: number[];
  labels?: string[];
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const width = 320;
  const height = 120;
  const pad = 8;
  const max = Math.max(...data);
  const step = (width - pad * 2) / (data.length - 1);

  const points = data.map((v, i) => [
    pad + i * step,
    height - pad - (v / max) * (height - pad * 2),
  ]);
  const path = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${path} L${points[points.length - 1][0].toFixed(1)},${height - pad} L${pad},${height - pad} Z`;

  return (
    <figure className={className} role="img" aria-label="Trend chart">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
        <defs>
          <linearGradient id="area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--accent) / 0.35)" />
            <stop offset="100%" stopColor="hsl(var(--accent) / 0)" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#area-fill)" />
        <motion.path
          d={path}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
        {points.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="hsl(var(--accent-strong))" />
        ))}
      </svg>
      {labels && (
        <figcaption className="mt-1 flex justify-between px-1 font-mono text-[10px] text-muted">
          {labels.map((l) => (
            <span key={l}>{l}</span>
          ))}
        </figcaption>
      )}
    </figure>
  );
}
