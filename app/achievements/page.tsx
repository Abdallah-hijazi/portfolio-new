import {
  Award,
  GraduationCap,
  Rocket,
  ShieldCheck,
  Trophy,
} from "lucide-react";
import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/motion/reveal";
import { AnimatedCounter } from "@/components/motion/animated-counter";
import { Badge } from "@/components/ui/badge";
import { achievements } from "@/data/certifications";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Awards and milestones: IEEE Xtreme V17 top-5 national finalist, Azure ML Solution Design trophy, 3.8 GPA, 15+ security findings, 25+ delivered projects.",
  alternates: { canonical: "/achievements/" },
};

const icons: Record<string, typeof Trophy> = {
  trophy: Trophy,
  award: Award,
  "graduation-cap": GraduationCap,
  "shield-check": ShieldCheck,
  rocket: Rocket,
};

export default function AchievementsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Achievements" }]}
        eyebrow="Milestones"
        title="Achievements"
        description="Competition results, awards, and the numbers behind three years of shipping."
      />

      {/* Stat band */}
      <section aria-label="Key numbers" className="border-y border-line/60 bg-surface/40">
        <div className="container grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
          {profile.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.06} className="text-center">
              <p className="font-display text-4xl font-bold text-gradient">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="container max-w-4xl py-20 pb-28">
        <ol className="space-y-5">
          {achievements.map((achievement, i) => {
            const Icon = icons[achievement.icon] ?? Trophy;
            return (
              <Reveal as="li" key={achievement.id} delay={i * 0.05}>
                <article className="glass glass-hover flex gap-5 rounded-2xl p-6 sm:p-8">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-display text-xl font-semibold leading-snug">
                        {achievement.title}
                      </h2>
                      <Badge variant="subtle">{achievement.year}</Badge>
                    </div>
                    <p className="mt-1 text-sm text-accent-strong">
                      {achievement.subtitle}
                    </p>
                    <p className="mt-3 leading-relaxed text-muted">
                      {achievement.detail}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </>
  );
}
