"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback } from "react";

import { Typewriter } from "@/components/motion/typewriter";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { site } from "@/lib/site";

const socials = [
  { href: site.social.github, label: "GitHub", icon: Github, external: true },
  { href: site.social.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
  { href: `mailto:${site.email}`, label: "Email", icon: Mail, external: false },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

/**
 * Hero with a pointer-reactive glow field. The glow is a single blurred
 * element moved with hardware-accelerated transforms — cheap to animate.
 */
const GLOW_SIZE_PX = 672; // matches size-[42rem]

export function Hero() {
  const reduceMotion = useReducedMotion();
  // Pointer position in px within the section; animated via transforms only.
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 50, damping: 20 });
  const springY = useSpring(rawY, { stiffness: 50, damping: 20 });
  const glowX = useTransform(springX, (v) => v - GLOW_SIZE_PX / 2);
  const glowY = useTransform(springY, (v) => v - GLOW_SIZE_PX / 2);

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (reduceMotion) return;
      const rect = e.currentTarget.getBoundingClientRect();
      rawX.set(e.clientX - rect.left);
      rawY.set(e.clientY - rect.top);
    },
    [rawX, rawY, reduceMotion],
  );

  return (
    <section
      aria-label="Introduction"
      onPointerMove={onPointerMove}
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      <div className="grid-bg absolute inset-0" aria-hidden />

      {/* Pointer-follow glow — positioned purely with transforms */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 size-[42rem] rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--accent)) 0%, transparent 65%)",
          x: glowX,
          y: glowY,
        }}
      />

      <div className="container relative z-10 grid items-center gap-14 py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 font-mono text-xs text-muted"
          >
            <span
              className="size-1.5 animate-pulse-soft rounded-full bg-terminal-green"
              aria-hidden
            />
            {profile.availability}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: easeOut }}
            className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl"
          >
            {site.name.split(" ")[0]}{" "}
            <span className="text-gradient">{site.name.split(" ")[1]}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: easeOut }}
            className="mt-5 min-h-8 font-mono text-lg text-accent-strong sm:text-xl"
          >
            <Typewriter phrases={profile.roles} />
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: easeOut }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-balance"
          >
            {profile.shortBio} Based in {site.location}, building with React,
            Next.js, Laravel, and Node — and probing the same stacks for
            vulnerabilities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease: easeOut }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button asChild size="lg">
              <Link href="/projects">
                View projects
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/resume">Resume</Link>
            </Button>

            <ul className="flex items-center gap-2" aria-label="Social links">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    {...(social.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    aria-label={social.label}
                    className="glass glass-hover flex size-11 items-center justify-center rounded-full text-muted hover:text-foreground"
                  >
                    <social.icon className="size-5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Portrait panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
          className="relative mx-auto hidden w-full max-w-sm lg:block"
        >
          <div className="glass relative aspect-[4/5] overflow-hidden rounded-3xl">
            <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />
            <Image
              src="/images/portrait.jpg"
              alt={`Portrait of ${site.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 384px"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 border-t border-line/60 bg-background/60 p-4 backdrop-blur-md">
              <p className="font-mono text-xs text-muted">
                <span className="text-terminal-green">$</span> whoami
              </p>
              <p className="mt-1 font-mono text-sm text-foreground">
                {site.role.toLowerCase()}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <a
        href="#stats"
        aria-label="Scroll to content"
        className="print-hidden absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-foreground"
      >
        <ArrowDown className="size-5 animate-bounce" aria-hidden />
      </a>
    </section>
  );
}
