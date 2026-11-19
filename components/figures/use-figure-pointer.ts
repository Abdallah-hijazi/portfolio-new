"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export interface FigurePointer {
  /** 0..1 across the element */
  x: number;
  /** 0..1 down the element */
  y: number;
  /** 0 = idle, 1 = pointer inside (eased) */
  a: number;
}

const REST: FigurePointer = { x: 0.5, y: 0.5, a: 0 };

/**
 * Spring-eased pointer tracking for the hairline figures. Re-renders only
 * while values are settling, so idle figures cost nothing.
 */
export function useFigurePointer(k = 0.12) {
  const reduceMotion = useReducedMotion();
  const target = useRef<FigurePointer>({ ...REST });
  const current = useRef<FigurePointer>({ ...REST });
  const raf = useRef<number | null>(null);
  const [value, setValue] = useState<FigurePointer>(REST);

  const tick = useCallback(() => {
    const c = current.current;
    const t = target.current;
    c.x += (t.x - c.x) * k;
    c.y += (t.y - c.y) * k;
    c.a += (t.a - c.a) * k;
    setValue({ ...c });
    const moving =
      Math.abs(t.x - c.x) > 0.001 ||
      Math.abs(t.y - c.y) > 0.001 ||
      Math.abs(t.a - c.a) > 0.001;
    raf.current = moving ? requestAnimationFrame(tick) : null;
  }, [k]);

  const kick = useCallback(() => {
    if (raf.current == null) raf.current = requestAnimationFrame(tick);
  }, [tick]);

  useEffect(
    () => () => {
      if (raf.current != null) cancelAnimationFrame(raf.current);
    },
    [],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduceMotion) return;
      const r = e.currentTarget.getBoundingClientRect();
      target.current = {
        x: Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
        y: Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)),
        a: 1,
      };
      kick();
    },
    [kick, reduceMotion],
  );

  const onPointerLeave = useCallback(() => {
    target.current = { ...REST };
    kick();
  }, [kick]);

  return { value, handlers: { onPointerMove, onPointerLeave } };
}
