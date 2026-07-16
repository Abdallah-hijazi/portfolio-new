"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useState } from "react";

import { useInterval } from "@/hooks/use-interval";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

const HISTORY_LENGTH = 40;

/** Deterministic seed so server and first client render agree. */
function seededSeries(seed: number, base: number, spread: number): number[] {
  const series: number[] = [];
  let value = base;
  for (let i = 0; i < HISTORY_LENGTH; i++) {
    // Simple LCG for stable pseudo-randomness.
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const delta = ((seed / 4294967296) - 0.5) * spread;
    value = Math.min(95, Math.max(5, value + delta));
    series.push(value);
  }
  return series;
}

function nextValue(prev: number, spread: number): number {
  const delta = (Math.random() - 0.5) * spread;
  return Math.min(95, Math.max(5, prev + delta));
}

function Sparkline({
  data,
  className,
  strokeClass,
}: {
  data: number[];
  className?: string;
  strokeClass: string;
}) {
  const width = 100;
  const height = 32;
  const step = width / (data.length - 1);
  const points = data
    .map((v, i) => `${(i * step).toFixed(2)},${(height - (v / 100) * height).toFixed(2)}`)
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn("h-10 w-full", className)}
      aria-hidden
    >
      <polyline
        points={points}
        fill="none"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        className={strokeClass}
      />
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        className="fill-terminal-green/10"
        stroke="none"
      />
    </svg>
  );
}

interface MonitorRowProps {
  label: string;
  unit: string;
  seed: number;
  base: number;
  spread: number;
  intervalMs: number;
}

function MonitorRow({ label, unit, seed, base, spread, intervalMs }: MonitorRowProps) {
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();
  const [series, setSeries] = useState(() => seededSeries(seed, base, spread));

  const tick = useCallback(() => {
    setSeries((prev) => [...prev.slice(1), nextValue(prev[prev.length - 1], spread)]);
  }, [spread]);

  useInterval(tick, reduceMotion || !mounted ? null : intervalMs);

  const current = series[series.length - 1];

  return (
    <div>
      <div className="flex items-baseline justify-between font-mono text-[11px] uppercase tracking-wider">
        <span className="text-terminal-dim">{label}</span>
        <span className="text-terminal-green terminal-text-glow">
          {current.toFixed(0)}
          {unit}
        </span>
      </div>
      <Sparkline data={series} strokeClass="stroke-terminal-green/80" />
    </div>
  );
}

/** Simulated system vitals panel (clearly fictional, purely client-side). */
export function SystemMonitor({ className }: { className?: string }) {
  return (
    <section
      aria-label="Simulated system monitor"
      className={cn(
        "rounded-xl border border-terminal-dim/40 bg-[hsl(160_25%_4%)] p-4",
        className,
      )}
    >
      <p className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-terminal-dim">
        system_monitor
        <span className="text-terminal-green/70">sim</span>
      </p>
      <div className="space-y-4">
        <MonitorRow label="cpu" unit="%" seed={42} base={34} spread={18} intervalMs={900} />
        <MonitorRow label="memory" unit="%" seed={1337} base={58} spread={8} intervalMs={1400} />
        <MonitorRow label="network" unit=" mb/s" seed={2024} base={42} spread={26} intervalMs={700} />
      </div>
    </section>
  );
}
