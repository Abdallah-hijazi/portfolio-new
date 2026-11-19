"use client";

import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  Flag,
  Github,
  Linkedin,
  Mail,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BorderBeam } from "@/components/magic/border-beam";
import { Particles } from "@/components/magic/particles";
import { ShinyText } from "@/components/magic/shiny-text";
import { BlurInText } from "@/components/magic/text-animate";
import { WordRotate } from "@/components/magic/word-rotate";
import { profile } from "@/data/profile";
import { site } from "@/lib/site";

const socials = [
  { href: site.social.github, label: "GitHub", icon: Github, external: true },
  { href: site.social.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
  { href: `mailto:${site.email}`, label: "Email", icon: Mail, external: false },
];

const proof = [
  {
    icon: ShieldCheck,
    label: "High-severity finding resolved",
    detail: "HackerOne · DoD DIB-VDP",
    href: site.social.hackeroneBadges,
  },
  {
    icon: Flag,
    label: "Top 15 in Lebanon",
    detail: "National CTF 2026",
    href: "/achievements",
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.7, delay, ease: easeOut },
});

/**
 * Monochrome hero: a drifting particle field, a blur-in name, rotating
 * roles, and a portrait card with a travelling border beam.
 */
export function Hero() {
  const [first, last] = site.name.split(" ");

  return (
    <section
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      <Particles quantity={110} />

      {/* Hairline rulers — a quiet frame, not a grid */}
      <span aria-hidden className="hero-rule absolute inset-x-0 top-[22%] h-px" />
      <span aria-hidden className="hero-rule absolute inset-x-0 bottom-[18%] h-px" />

      <div className="container relative z-10 grid items-center gap-14 py-20 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <motion.p
            {...fadeUp(0)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 font-mono text-xs backdrop-blur"
          >
            <span
              className="size-1.5 animate-pulse-soft rounded-full bg-terminal-green"
              aria-hidden
            />
            <ShinyText>{profile.availability}</ShinyText>
          </motion.p>

          <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl xl:text-7xl">
            <BlurInText text={first} delay={0.1} />{" "}
            <BlurInText text={last} delay={0.35} className="text-foreground/55" />
          </h1>

          <motion.p
            {...fadeUp(0.55)}
            className="mt-5 flex min-h-9 items-center gap-2 font-mono text-lg text-foreground/90 sm:text-xl"
          >
            <span className="text-terminal-green" aria-hidden>
              &gt;
            </span>
            <WordRotate words={profile.roles} />
          </motion.p>

          <motion.p
            {...fadeUp(0.65)}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-balance"
          >
            {profile.shortBio} Based in {site.location}, shipping production
            platforms with React, Next.js, Node.js and Laravel — and testing the
            same stacks for vulnerabilities on HackerOne.
          </motion.p>

          <motion.div {...fadeUp(0.75)} className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="shimmer-btn inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-7 text-base font-medium text-background transition-transform duration-300 hover:-translate-y-0.5"
            >
              View projects
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/resume"
              className="inline-flex h-12 items-center rounded-full border border-line px-7 text-base font-medium text-foreground transition-colors duration-300 hover:border-foreground/40"
            >
              Resume
            </Link>

            <ul className="flex items-center gap-2" aria-label="Social links">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    {...(social.external
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                    aria-label={social.label}
                    className="flex size-11 items-center justify-center rounded-full border border-line text-muted transition-colors duration-300 hover:border-foreground/40 hover:text-foreground"
                  >
                    <social.icon className="size-5" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Proof strip */}
          <motion.ul
            {...fadeUp(0.9)}
            className="mt-10 flex flex-wrap gap-3"
            aria-label="Recent recognition"
          >
            {proof.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...(item.href.startsWith("http")
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="flex items-center gap-3 rounded-xl border border-line/80 bg-surface/50 px-4 py-2.5 backdrop-blur transition-colors hover:border-foreground/30"
                >
                  <item.icon className="size-4 text-terminal-green" aria-hidden />
                  <span className="flex flex-col leading-tight">
                    <span className="text-sm font-medium">{item.label}</span>
                    <span className="font-mono text-[11px] text-muted">{item.detail}</span>
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Portrait panel */}
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
          className="relative mx-auto hidden w-full max-w-sm lg:block"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-line bg-surface">
            <Image
              src="/images/portrait.jpg"
              alt={`Portrait of ${site.name}`}
              fill
              priority
              sizes="(max-width: 1024px) 80vw, 384px"
              className="object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 border-t border-line/60 bg-background/70 p-4 backdrop-blur-md">
              <p className="font-mono text-xs text-muted">
                <span className="text-terminal-green">$</span> whoami
              </p>
              <p className="mt-1 font-mono text-sm text-foreground">
                {site.role.toLowerCase()}
              </p>
            </div>
            <BorderBeam size={160} duration={10} />
            <BorderBeam size={160} duration={10} delay={5} />
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
