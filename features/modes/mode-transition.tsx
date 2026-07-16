"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useMode } from "./mode-context";
import { modeById } from "./mode-config";

const LINE_INTERVAL_MS = 260;
const HOLD_AFTER_MS = 420;

/**
 * Full-screen "OS boot" overlay played when switching identity modes:
 * terminal boot lines + scanline sweep + a glitch flash, tinted with the
 * target mode's accent. Skipped entirely under prefers-reduced-motion
 * (the context navigates immediately in that case).
 */
export function ModeTransition() {
  const { bootingMode, finishTransition } = useMode();
  const [visibleLines, setVisibleLines] = useState(0);

  const target = bootingMode ? modeById[bootingMode] : null;

  useEffect(() => {
    if (!bootingMode || !target) return;
    setVisibleLines(0);

    const total = target.bootLines.length;
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 1; i <= total; i++) {
      timers.push(setTimeout(() => setVisibleLines(i), i * LINE_INTERVAL_MS));
    }
    timers.push(
      setTimeout(
        () => finishTransition(),
        total * LINE_INTERVAL_MS + HOLD_AFTER_MS,
      ),
    );

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bootingMode]);

  return (
    <AnimatePresence>
      {target && (
        <motion.div
          key={target.id}
          role="status"
          aria-live="polite"
          aria-label={`Switching to ${target.label}`}
          className="scanlines fixed inset-0 z-[100] flex items-center justify-center bg-background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35 } }}
          transition={{ duration: 0.18 }}
        >
          {/* Accent glow field */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(ellipse 60% 45% at 50% 55%, ${target.color}33, transparent 70%)`,
            }}
          />
          {/* Scan sweep */}
          <motion.div
            aria-hidden
            className="absolute inset-x-0 h-24 opacity-40"
            style={{
              background: `linear-gradient(180deg, transparent, ${target.color}55, transparent)`,
            }}
            initial={{ top: "-15%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 0.9, ease: "linear", repeat: Infinity }}
          />

          <div className="animate-glitch-x w-full max-w-md px-8 font-mono text-sm">
            <div className="mb-4 flex items-center gap-2">
              <span
                className="inline-block size-2 rounded-full animate-pulse-soft"
                style={{ background: target.color }}
                aria-hidden
              />
              <span className="uppercase tracking-[0.3em] text-muted">
                {target.shortLabel} // boot
              </span>
            </div>

            <div className="space-y-2">
              {target.bootLines.slice(0, visibleLines).map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-foreground/90"
                >
                  <span className="mr-2 text-muted" aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {line}
                  {i === visibleLines - 1 && (
                    <span className="ml-1 animate-blink" aria-hidden>
                      ▌
                    </span>
                  )}
                </motion.p>
              ))}
            </div>

            {/* Progress rail */}
            <div className="mt-6 h-px w-full overflow-hidden rounded bg-line">
              <motion.div
                className="h-full"
                style={{ background: target.color }}
                initial={{ width: "0%" }}
                animate={{
                  width: `${(visibleLines / target.bootLines.length) * 100}%`,
                }}
                transition={{ ease: "easeOut", duration: 0.25 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
