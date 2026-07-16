"use client";

import { motion } from "framer-motion";

import { useMode } from "@/features/modes/mode-context";
import { modes } from "@/features/modes/mode-config";
import { cn } from "@/lib/utils";

/**
 * OS-style identity switcher. Renders one pill per mode; the active pill
 * carries an animated highlight that follows selection between modes.
 * `instanceId` keeps Framer Motion layoutIds unique when the switcher is
 * mounted more than once (desktop header + mobile menu).
 */
export function ModeSwitcher({
  className,
  instanceId = "default",
}: {
  className?: string;
  instanceId?: string;
}) {
  const { mode: activeMode, switchMode } = useMode();

  return (
    <div
      role="group"
      aria-label="Switch identity mode"
      className={cn(
        "glass flex items-center gap-0.5 rounded-full p-1",
        className,
      )}
    >
      {modes.map((mode) => {
        const isActive = mode.id === activeMode;
        return (
          <button
            key={mode.id}
            type="button"
            onClick={() => switchMode(mode.id)}
            aria-pressed={isActive}
            aria-label={`${mode.label} (press ${mode.shortcut})`}
            title={`${mode.label} — press ${mode.shortcut}`}
            className={cn(
              "relative rounded-full px-2.5 py-1.5 font-mono text-[11px] font-semibold tracking-wider transition-colors",
              isActive ? "text-background" : "text-muted hover:text-foreground",
            )}
          >
            {isActive && (
              <motion.span
                layoutId={`mode-pill-${instanceId}`}
                className="absolute inset-0 rounded-full"
                style={{ background: mode.color }}
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
                aria-hidden
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  isActive ? "bg-background/70" : "",
                )}
                style={isActive ? undefined : { background: mode.color }}
                aria-hidden
              />
              {mode.shortLabel}
            </span>
          </button>
        );
      })}
    </div>
  );
}
