"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

import { useInterval } from "@/hooks/use-interval";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";

type LogLevel = "info" | "warn" | "block";

interface LogEvent {
  id: number;
  time: string;
  level: LogLevel;
  message: string;
}

/**
 * Fictional but realistic-looking security events. All IPs are from
 * TEST-NET / documentation ranges (RFC 5737) — nothing here is real traffic.
 */
const TEMPLATES: { level: LogLevel; message: string }[] = [
  { level: "info", message: "tls handshake ok · cipher TLS_AES_256_GCM_SHA384" },
  { level: "info", message: "session token rotated for visitor" },
  { level: "block", message: "blocked sqli probe on /login · 203.0.113.42" },
  { level: "warn", message: "rate limit warning · 198.51.100.17" },
  { level: "block", message: "dropped xss payload in query param · 192.0.2.99" },
  { level: "info", message: "csp report-only: no violations in last window" },
  { level: "warn", message: "outdated user-agent fingerprint flagged" },
  { level: "block", message: "denied path traversal ../etc/passwd · 203.0.113.7" },
  { level: "info", message: "integrity check passed · static bundle sha256 ok" },
  { level: "block", message: "jwt tamper attempt rejected · signature mismatch" },
  { level: "info", message: "owasp ruleset v4.2 loaded (simulated)" },
  { level: "warn", message: "burst of 404s from 198.51.100.88 · watching" },
];

const levelStyles: Record<LogLevel, string> = {
  info: "text-terminal-dim",
  warn: "text-terminal-amber",
  block: "text-terminal-red",
};

let eventId = 0;

function makeEvent(index: number, withTime: boolean): LogEvent {
  const template = TEMPLATES[index % TEMPLATES.length];
  eventId += 1;
  return {
    id: eventId,
    time: withTime
      ? new Date().toLocaleTimeString("en-GB", { hour12: false })
      : "--:--:--",
    level: template.level,
    message: template.message,
  };
}

/** Animated feed of simulated security events. */
export function EventLog({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const mounted = useMounted();
  const counter = useRef(4);
  const [events, setEvents] = useState<LogEvent[]>(() =>
    [0, 1, 2, 3].map((i) => makeEvent(i, false)),
  );

  const tick = useCallback(() => {
    counter.current += 1;
    setEvents((prev) => [...prev.slice(-11), makeEvent(counter.current, true)]);
  }, []);

  useInterval(tick, reduceMotion || !mounted ? null : 2600);

  return (
    <section
      aria-label="Simulated security event log"
      className={cn(
        "flex min-h-0 flex-col rounded-xl border border-terminal-dim/40 bg-[hsl(160_25%_4%)] p-4",
        className,
      )}
    >
      <p className="mb-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-terminal-dim">
        security_events
        <span className="text-terminal-green/70">tail -f</span>
      </p>
      <ul className="min-h-0 flex-1 space-y-1.5 overflow-hidden font-mono text-[11px] leading-relaxed">
        {events.map((event) => (
          <li key={event.id} className="flex gap-2 animate-fade-up">
            <span className="shrink-0 text-terminal-dim/70">{event.time}</span>
            <span
              className={cn(
                "shrink-0 uppercase",
                levelStyles[event.level],
              )}
            >
              [{event.level}]
            </span>
            <span className="truncate text-terminal-green/80">{event.message}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 border-t border-terminal-dim/30 pt-2 font-mono text-[10px] text-terminal-dim/70">
        simulated feed — IPs from RFC 5737 documentation ranges
      </p>
    </section>
  );
}
