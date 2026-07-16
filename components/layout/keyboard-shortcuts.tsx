"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMode } from "@/features/modes/mode-context";
import { modes } from "@/features/modes/mode-config";

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  );
}

/**
 * Global, non-modal shortcuts:
 *  1–4  switch identity mode
 *  ?    open the shortcut reference
 * (Ctrl/Cmd+K is registered by the command palette provider.)
 */
export function KeyboardShortcuts() {
  const { switchMode } = useMode();
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (isTypingTarget(e.target)) return;

      if (e.key === "?") {
        e.preventDefault();
        setHelpOpen((v) => !v);
        return;
      }

      const mode = modes.find((m) => m.shortcut === e.key);
      if (mode) {
        e.preventDefault();
        switchMode(mode.id);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [switchMode]);

  return (
    <Dialog open={helpOpen} onOpenChange={setHelpOpen}>
      <DialogContent className="max-w-md">
        <DialogTitle>Keyboard shortcuts</DialogTitle>
        <DialogDescription>
          The whole portfolio is keyboard-navigable.
        </DialogDescription>
        <ul className="mt-2 space-y-3 text-sm">
          <li className="flex items-center justify-between gap-4">
            <span className="text-muted">Command palette / search</span>
            <span className="flex gap-1">
              <kbd className="kbd">Ctrl</kbd>
              <kbd className="kbd">K</kbd>
            </span>
          </li>
          {modes.map((mode) => (
            <li key={mode.id} className="flex items-center justify-between gap-4">
              <span className="text-muted">{mode.label}</span>
              <kbd className="kbd">{mode.shortcut}</kbd>
            </li>
          ))}
          <li className="flex items-center justify-between gap-4">
            <span className="text-muted">This reference</span>
            <kbd className="kbd">?</kbd>
          </li>
          <li className="flex items-center justify-between gap-4">
            <span className="text-muted">Close dialogs</span>
            <kbd className="kbd">Esc</kbd>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}
