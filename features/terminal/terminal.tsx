"use client";

import { useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

import { commandNames, executeCommand } from "./commands";

interface TerminalLine {
  id: number;
  content: ReactNode;
}

const BOOT_LINES = [
  "ah-sec v1.0 — simulated shell (client-side only, no server)",
  "loading profile data … ok",
  "mounting /data/projects /data/skills /data/certs … ok",
  'type "help" to list commands',
];

let lineId = 0;
function nextId(): number {
  lineId += 1;
  return lineId;
}

/**
 * Fully client-side terminal emulator. Commands run against the same typed
 * data files that power the rest of the site — no backend involved.
 */
export function Terminal({ className }: { className?: string }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Boot sequence: type lines one at a time (instant under reduced motion).
  useEffect(() => {
    if (reduceMotion) {
      setLines(
        BOOT_LINES.map((text) => ({
          id: nextId(),
          content: <p className="text-terminal-dim">{text}</p>,
        })),
      );
      setBooted(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    BOOT_LINES.forEach((text, i) => {
      timers.push(
        setTimeout(() => {
          setLines((prev) => [
            ...prev,
            {
              id: nextId(),
              content: <p className="text-terminal-dim">{text}</p>,
            },
          ]);
          if (i === BOOT_LINES.length - 1) setBooted(true);
        }, 350 * (i + 1)),
      );
    });
    return () => timers.forEach(clearTimeout);
  }, [reduceMotion]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const runCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      const promptLine: TerminalLine = {
        id: nextId(),
        content: (
          <p>
            <span className="text-terminal-dim">visitor@ah-sec</span>
            <span className="text-terminal-green"> $ </span>
            <span className="text-foreground">{trimmed || ""}</span>
          </p>
        ),
      };

      if (!trimmed) {
        setLines((prev) => [...prev, promptLine]);
        return;
      }

      const result = executeCommand(trimmed);
      setHistory((prev) =>
        prev[prev.length - 1] === trimmed ? prev : [...prev, trimmed],
      );
      setHistoryIndex(-1);

      if (result.action === "clear") {
        setLines([]);
        return;
      }

      setLines((prev) => [
        ...prev,
        promptLine,
        ...(result.output != null
          ? [{ id: nextId(), content: result.output }]
          : []),
      ]);

      if (result.action && typeof result.action === "object") {
        if ("navigate" in result.action) {
          const target = result.action.navigate;
          setTimeout(() => router.push(target), 450);
        } else if ("openExternal" in result.action) {
          const url = result.action.openExternal;
          setTimeout(() => window.open(url, "_blank", "noopener,noreferrer"), 250);
        }
      }
    },
    [router],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
        runCommand(input);
        setInput("");
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHistoryIndex((prev) => {
          const next = prev === -1 ? history.length - 1 : Math.max(0, prev - 1);
          setInput(history[next] ?? "");
          return next;
        });
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHistoryIndex((prev) => {
          if (prev === -1) return -1;
          const next = prev + 1;
          if (next >= history.length) {
            setInput("");
            return -1;
          }
          setInput(history[next] ?? "");
          return next;
        });
        return;
      }
      if (e.key === "Tab") {
        e.preventDefault();
        const fragment = input.trim().toLowerCase();
        if (!fragment) return;
        const match = commandNames.find((c) => c.startsWith(fragment));
        if (match) setInput(match + " ");
        return;
      }
      if (e.key === "l" && e.ctrlKey) {
        e.preventDefault();
        setLines([]);
      }
    },
    [input, history, runCommand],
  );

  return (
    <div
      className={cn(
        "flex h-full min-h-0 flex-col overflow-hidden rounded-xl border border-terminal-dim/40 bg-[hsl(160_25%_4%)] font-mono text-[13px]",
        className,
      )}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-terminal-dim/30 px-4 py-2">
        <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-terminal-dim">
          <span className="size-1.5 rounded-full bg-terminal-green animate-pulse-soft" aria-hidden />
          main_shell — visitor@ah-sec
        </p>
        <p className="text-[11px] text-terminal-dim" aria-hidden>
          bash · simulated
        </p>
      </div>

      {/* Output */}
      <div
        ref={scrollRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        className="min-h-0 flex-1 space-y-1.5 overflow-y-auto p-4 text-terminal-green/90"
      >
        {lines.map((line) => (
          <div key={line.id}>{line.content}</div>
        ))}
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 border-t border-terminal-dim/30 px-4 py-3">
        <label htmlFor="terminal-input" className="sr-only">
          Terminal command input
        </label>
        <span className="shrink-0 text-terminal-dim" aria-hidden>
          visitor@ah-sec
        </span>
        <span className="shrink-0 text-terminal-green" aria-hidden>
          $
        </span>
        <input
          id="terminal-input"
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={!booted}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          placeholder={booted ? 'try "help"' : "booting …"}
          className="w-full bg-transparent text-terminal-green caret-terminal-green outline-none placeholder:text-terminal-dim/60"
        />
      </div>
    </div>
  );
}
