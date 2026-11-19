"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  /** How strongly particles drift toward the pointer (0 = ignore pointer). */
  ease?: number;
  staticity?: number;
}

interface Dot {
  x: number;
  y: number;
  tx: number;
  ty: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  dx: number;
  dy: number;
  magnetism: number;
}

/**
 * Monochrome drifting particle field (Magic UI "Particles" pattern).
 * Canvas-based, pointer-reactive, DPR aware, paused when off-screen.
 */
export function Particles({
  className,
  quantity = 90,
  ease = 60,
  staticity = 45,
}: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    const mouse = { x: 0, y: 0 };
    let raf = 0;
    let visible = true;
    const rgb = getComputedStyle(document.documentElement)
      .getPropertyValue("--foreground")
      .trim();

    const make = (): Dot => ({
      x: Math.random() * w,
      y: Math.random() * h,
      tx: 0,
      ty: 0,
      size: Math.random() * 1.4 + 0.3,
      alpha: 0,
      targetAlpha: Math.random() * 0.5 + 0.08,
      dx: (Math.random() - 0.5) * 0.12,
      dy: (Math.random() - 0.5) * 0.12,
      magnetism: 0.1 + Math.random() * 4,
    });

    const resize = () => {
      w = parent.offsetWidth;
      h = parent.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = Array.from({ length: quantity }, make);
    };

    const draw = (d: Dot) => {
      ctx.beginPath();
      ctx.arc(d.x + d.tx, d.y + d.ty, d.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsl(${rgb} / ${d.alpha})`;
      ctx.fill();
    };

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i];
        // fade near edges
        const edge = Math.min(d.x, w - d.x, d.y, h - d.y);
        const fade = Math.max(0, Math.min(1, edge / 40));
        d.alpha += (d.targetAlpha * fade - d.alpha) * 0.05;
        d.x += d.dx;
        d.y += d.dy;
        if (ease > 0) {
          d.tx += (mouse.x / (staticity / d.magnetism) - d.tx) / ease;
          d.ty += (mouse.y / (staticity / d.magnetism) - d.ty) / ease;
        }
        if (d.x < -10 || d.x > w + 10 || d.y < -10 || d.y > h + 10) {
          dots[i] = make();
          continue;
        }
        draw(d);
      }
      if (visible) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left - w / 2;
      mouse.y = e.clientY - rect.top - h / 2;
    };

    resize();
    if (reduceMotion) {
      dots.forEach((d) => {
        d.alpha = d.targetAlpha;
        draw(d);
      });
      return;
    }

    const io = new IntersectionObserver(([entry]) => {
      const was = visible;
      visible = entry.isIntersecting;
      if (visible && !was) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);
    raf = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [quantity, ease, staticity, reduceMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
    />
  );
}
