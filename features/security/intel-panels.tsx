"use client";

import { useEffect, useState } from "react";

import { certifications } from "@/data/certifications";
import { skillCategories } from "@/data/skills";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

/** Live UTC clock in the workspace top bar. */
export function WorkspaceClock() {
  const mounted = useMounted();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    if (!mounted) return;
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, [mounted]);

  return (
    <time
      className="font-mono text-xs text-terminal-green terminal-text-glow tabular-nums"
      dateTime={now?.toISOString()}
      suppressHydrationWarning
    >
      {now
        ? now.toLocaleTimeString("en-GB", { hour12: false, timeZone: "UTC" })
        : "--:--:--"}{" "}
      UTC
    </time>
  );
}

/** Security capability readout, driven by real skill data. */
export function CapabilityPanel({ className }: { className?: string }) {
  const security = skillCategories.find((c) => c.id === "security");
  if (!security) return null;

  return (
    <section
      aria-label="Security capabilities"
      className={cn(
        "rounded-xl border border-terminal-dim/40 bg-[hsl(160_25%_4%)] p-4",
        className,
      )}
    >
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-terminal-dim">
        capabilities
      </p>
      <ul className="space-y-2.5">
        {security.skills.map((skill) => (
          <li key={skill.name}>
            <div className="mb-1 flex items-center justify-between font-mono text-[11px]">
              <span className="text-terminal-green/90">{skill.name}</span>
              <span className="text-terminal-dim">{skill.level}</span>
            </div>
            <div
              className="h-1 overflow-hidden rounded-full bg-terminal-dim/20"
              role="meter"
              aria-label={`${skill.name} proficiency`}
              aria-valuenow={skill.score}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-full rounded-full bg-terminal-green/70"
                style={{ width: `${skill.score}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Compact credential list for the right rail. */
export function CredsPanel({ className }: { className?: string }) {
  const securityCerts = certifications.filter((c) => c.category === "Security");

  return (
    <section
      aria-label="Security certifications"
      className={cn(
        "rounded-xl border border-terminal-dim/40 bg-[hsl(160_25%_4%)] p-4",
        className,
      )}
    >
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-terminal-dim">
        credentials
      </p>
      <ul className="space-y-2 font-mono text-[12px]">
        {securityCerts.map((cert) => (
          <li key={cert.id} className="flex items-baseline gap-2">
            <span className="text-terminal-dim">{cert.year}</span>
            <span className="text-terminal-green/90">{cert.title}</span>
          </li>
        ))}
        <li className="flex items-baseline gap-2">
          <span className="text-terminal-dim">meth</span>
          <span className="text-terminal-green/90">OWASP Top 10 · Burp Suite</span>
        </li>
        <li className="flex items-baseline gap-2">
          <span className="text-terminal-dim">stat</span>
          <span className="text-terminal-amber">15+ findings reported</span>
        </li>
      </ul>
    </section>
  );
}
