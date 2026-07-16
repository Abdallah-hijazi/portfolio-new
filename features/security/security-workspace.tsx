"use client";

import { ShieldHalf } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { WorkspaceClock } from "./intel-panels";

/**
 * Heavy interactive panels are loaded lazily on the client — they are
 * purely decorative/simulated and shouldn't block first paint.
 */
const Terminal = dynamic(
  () => import("@/features/terminal/terminal").then((m) => m.Terminal),
  { ssr: false, loading: () => <PanelSkeleton label="main_shell" tall /> },
);
const SystemMonitor = dynamic(
  () => import("./system-monitor").then((m) => m.SystemMonitor),
  { ssr: false, loading: () => <PanelSkeleton label="system_monitor" /> },
);
const EventLog = dynamic(() => import("./event-log").then((m) => m.EventLog), {
  ssr: false,
  loading: () => <PanelSkeleton label="security_events" />,
});
const CapabilityPanel = dynamic(
  () => import("./intel-panels").then((m) => m.CapabilityPanel),
  { ssr: false, loading: () => <PanelSkeleton label="capabilities" /> },
);
const CredsPanel = dynamic(
  () => import("./intel-panels").then((m) => m.CredsPanel),
  { ssr: false, loading: () => <PanelSkeleton label="credentials" /> },
);

function PanelSkeleton({ label, tall }: { label: string; tall?: boolean }) {
  return (
    <div
      className={`animate-pulse-soft rounded-xl border border-terminal-dim/40 bg-[hsl(160_25%_4%)] p-4 ${
        tall ? "min-h-[24rem]" : "min-h-[10rem]"
      }`}
      aria-hidden
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-terminal-dim">
        {label} … loading
      </p>
    </div>
  );
}

/** eDEX-UI-inspired split-panel security workspace. */
export function SecurityWorkspace() {
  return (
    <div className="scanlines relative min-h-screen bg-[hsl(165_30%_3%)] pb-16 pt-16">
      {/* Ambient green glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 40% at 50% 0%, hsl(152 90% 45% / 0.07), transparent 70%)",
        }}
      />

      <div className="container relative">
        {/* Workspace top bar */}
        <header className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-terminal-dim/40 bg-[hsl(160_25%_4%)] px-4 py-3">
          <div className="flex items-center gap-3">
            <ShieldHalf className="size-4 text-terminal-green" aria-hidden />
            <h1 className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-terminal-green terminal-text-glow">
              Security Workspace
            </h1>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] text-terminal-dim">
            <span className="hidden items-center gap-1.5 sm:flex">
              <span className="size-1.5 rounded-full bg-terminal-green animate-pulse-soft" aria-hidden />
              all systems simulated
            </span>
            <WorkspaceClock />
          </div>
        </header>

        {/* Split panels: monitor rail / terminal / intel rail */}
        <div className="grid gap-4 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)_minmax(0,17rem)]">
          <div className="order-2 flex flex-col gap-4 lg:order-1">
            <SystemMonitor />
            <CapabilityPanel />
          </div>

          <div className="order-1 min-h-[28rem] lg:order-2 lg:min-h-[34rem]">
            <Terminal className="h-full" />
          </div>

          <div className="order-3 flex flex-col gap-4">
            <EventLog className="min-h-[16rem] flex-1" />
            <CredsPanel />
          </div>
        </div>

        {/* Hint row */}
        <footer className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-terminal-dim/40 bg-[hsl(160_25%_4%)] px-4 py-3 font-mono text-[11px] text-terminal-dim">
          <p>
            try:{" "}
            <span className="text-terminal-green">whoami</span> ·{" "}
            <span className="text-terminal-green">skills</span> ·{" "}
            <span className="text-terminal-green">projects</span> ·{" "}
            <span className="text-terminal-green">certs</span> ·{" "}
            <span className="text-terminal-green">contact</span>
          </p>
          <p className="flex items-center gap-3">
            <span>
              <kbd className="kbd">Tab</kbd> autocomplete
            </span>
            <span>
              <kbd className="kbd">↑</kbd> history
            </span>
            <span>
              <kbd className="kbd">Ctrl+L</kbd> clear
            </span>
          </p>
        </footer>

        <p className="mt-6 text-center font-mono text-xs text-terminal-dim">
          Everything on this screen runs locally in your browser.{" "}
          <Link
            href="/projects/security-assessments"
            className="text-terminal-green underline decoration-terminal-dim underline-offset-4 hover:text-terminal-amber"
          >
            Read the real security work →
          </Link>
        </p>
      </div>
    </div>
  );
}
