"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import type { ModeId } from "@/data/types";

import { modeById, modeFromPath, modes } from "./mode-config";

export const MODE_STORAGE_KEY = "portfolio-mode";

interface ModeContextValue {
  mode: ModeId;
  /** Mode currently booting via the transition overlay, if any. */
  bootingMode: ModeId | null;
  /** Apply a mode theme without navigation (used on route sync). */
  setMode: (mode: ModeId) => void;
  /** Play the boot transition, then navigate to the mode workspace. */
  switchMode: (mode: ModeId) => void;
  finishTransition: () => void;
}

const ModeContext = createContext<ModeContextValue | null>(null);

function applyModeToDocument(mode: ModeId) {
  document.documentElement.dataset.mode = mode;
  try {
    localStorage.setItem(MODE_STORAGE_KEY, mode);
  } catch {
    // Storage may be unavailable (private browsing) — theming still works.
  }
}

export function ModeProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  // Always start with the server-rendered default so hydration is
  // deterministic; the effects below converge on the real mode.
  const [mode, setModeState] = useState<ModeId>("developer");
  const [bootingMode, setBootingMode] = useState<ModeId | null>(null);
  const pendingPath = useRef<string | null>(null);

  const setMode = useCallback((next: ModeId) => {
    setModeState(next);
    applyModeToDocument(next);
  }, []);

  // Adopt the mode applied pre-paint by the inline <head> script
  // (persisted preference or route-implied).
  useEffect(() => {
    const current = document.documentElement.dataset.mode;
    if (current && current in modeById) {
      setModeState(current as ModeId);
    }
  }, []);

  // Entering a mode workspace by URL (deep link, back button) adopts its theme.
  useEffect(() => {
    const routeMode = modeFromPath(pathname);
    if (routeMode && routeMode !== mode) setMode(routeMode);
  }, [pathname, mode, setMode]);

  const switchMode = useCallback(
    (next: ModeId) => {
      const target = modeById[next];
      if (!target) return;
      const alreadyThere = modeFromPath(pathname) === next;
      if (alreadyThere) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        setMode(next);
        router.push(target.path);
        return;
      }

      pendingPath.current = target.path;
      setBootingMode(next);
    },
    [pathname, router, setMode],
  );

  const finishTransition = useCallback(() => {
    if (bootingMode) setMode(bootingMode);
    if (pendingPath.current) {
      router.push(pendingPath.current);
      pendingPath.current = null;
    }
    setBootingMode(null);
  }, [bootingMode, router, setMode]);

  const value = useMemo(
    () => ({ mode, bootingMode, setMode, switchMode, finishTransition }),
    [mode, bootingMode, setMode, switchMode, finishTransition],
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export function useMode(): ModeContextValue {
  const ctx = useContext(ModeContext);
  if (!ctx) throw new Error("useMode must be used within ModeProvider");
  return ctx;
}

export { modeById, modeFromPath, modes };
