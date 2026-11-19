import { Award, BarChart3, Braces, Database, LineChart, Medal, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AreaChart, BarChart, RadarChart, RadialGauge } from "@/features/ai/charts";
import { certifications } from "@/data/certifications";
import { skillCategories } from "@/data/skills";

export const metadata: Metadata = {
  title: "AI & Data Mode",
  description:
    "Machine learning and analytics workspace: Azure ML badges and solution-design trophy, Power BI analytics, and data-focused skills.",
  alternates: { canonical: "/ai-data/" },
};

const kpis = [
  { icon: Medal, label: "Azure ML badges", value: "5", detail: "Microsoft Learn program" },
  { icon: Award, label: "Solution Design", value: "Trophy", detail: "End-to-end ML design" },
  { icon: BarChart3, label: "Power BI", value: "Certified", detail: "Khawarizmi & LASeR" },
  { icon: Sparkles, label: "IEEE Xtreme V17", value: "Top 5", detail: "National finalist" },
];

/**
 * Azure ML badge track — five completed badges from the Microsoft program.
 * Values represent completion (all finished), not invented scores.
 */
const azureTrack = [
  { label: "Explore ML fundamentals", value: 100 },
  { label: "Prepare & explore data", value: 100 },
  { label: "Train & evaluate models", value: 100 },
  { label: "Build with Azure ML tooling", value: 100 },
  { label: "Design an ML solution", value: 100 },
];

export default function AiDataPage() {
  const aiSkills = skillCategories.find((c) => c.id === "ai");
  const dataCerts = certifications.filter((c) => c.category === "Data & AI");

  const radarData =
    aiSkills?.skills.map((s) => ({ label: shortLabel(s.name), value: s.score })) ?? [];

  return (
    <>
      <PageHeader
        figure="plot"
        crumbs={[{ label: "AI & Data Mode" }]}
        eyebrow="ai.workspace"
        title="Data-driven, model-aware engineering"
        description="Machine learning through the Microsoft Azure program — five badges and a solution-design trophy — plus Power BI analytics and SQL-heavy data work from production systems."
      />

      {/* KPI band */}
      <section aria-label="Key achievements" className="container pb-8">
        <Stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {kpis.map((kpi) => (
            <StaggerItem key={kpi.label} className="h-full">
              <div className="glass glass-hover flex h-full items-center gap-4 rounded-2xl p-5">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                  <kpi.icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block font-display text-xl font-bold">
                    {kpi.value}
                  </span>
                  <span className="block text-sm text-muted">{kpi.label}</span>
                  <span className="block text-xs text-muted/80">{kpi.detail}</span>
                </span>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Dashboard grid */}
      <section aria-labelledby="dashboard" className="container py-16">
        <SectionHeading
          eyebrow="Analytics"
          title="Capability dashboard"
          description="Everything below is rendered from the same typed data files that power the rest of the site — no chart library, just SVG and motion."
        />

        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal className="glass rounded-2xl p-6">
            <h3 className="mb-1 flex items-center gap-2 font-display text-lg font-semibold">
              <Braces className="size-4 text-accent-strong" aria-hidden />
              AI & data skill radar
            </h3>
            <p className="mb-4 text-sm text-muted">
              Proficiency across the data stack (0–100).
            </p>
            <RadarChart data={radarData} />
          </Reveal>

          <div className="flex flex-col gap-5">
            <Reveal className="glass rounded-2xl p-6" delay={0.05}>
              <h3 className="mb-1 flex items-center gap-2 font-display text-lg font-semibold">
                <Medal className="size-4 text-accent-strong" aria-hidden />
                Azure ML badge track
              </h3>
              <p className="mb-4 text-sm text-muted">
                Five completed badge tracks, capped by the solution-design trophy.
              </p>
              <BarChart data={azureTrack} unit="%" />
            </Reveal>

            <Reveal className="glass rounded-2xl p-6" delay={0.1}>
              <h3 className="mb-1 flex items-center gap-2 font-display text-lg font-semibold">
                <LineChart className="size-4 text-accent-strong" aria-hidden />
                Data skill growth
              </h3>
              <p className="mb-4 text-sm text-muted">
                Cumulative data & AI credentials and coursework by year.
              </p>
              {/* 2021: coursework starts · 2023: security cert year · 2024: Azure + Power BI + IEEE · 2025: degree */}
              <AreaChart data={[1, 2, 4, 7, 8]} labels={["2021", "2022", "2023", "2024", "2025"]} />
            </Reveal>
          </div>
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-3">
          <Reveal className="glass rounded-2xl p-6" delay={0.05}>
            <RadialGauge value={80} label="SQL for analytics" sublabel="Production query design" />
          </Reveal>
          <Reveal className="glass rounded-2xl p-6" delay={0.1}>
            <RadialGauge value={70} label="Power BI" sublabel="Certified 2024" />
          </Reveal>
          <Reveal className="glass rounded-2xl p-6" delay={0.15}>
            <RadialGauge value={68} label="Azure ML" sublabel="5 badges + trophy" />
          </Reveal>
        </div>
      </section>

      {/* Credentials */}
      <section
        aria-labelledby="data-credentials"
        className="border-t border-line/60 bg-surface/40 py-24"
      >
        <div className="container">
          <SectionHeading
            eyebrow="Verified"
            title="Data & AI credentials"
            actions={
              <Button asChild variant="outline">
                <Link href="/certifications">All certifications</Link>
              </Button>
            }
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {dataCerts.map((cert, i) => (
              <Reveal key={cert.id} delay={i * 0.06}>
                <div className="glass glass-hover flex h-full items-start gap-4 rounded-2xl p-6">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                    <Database className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold">
                      {cert.title}
                    </span>
                    <span className="block text-sm text-muted">
                      {cert.issuer} · {cert.year}
                    </span>
                    {cert.highlight && (
                      <Badge className="mt-2">{cert.highlight}</Badge>
                    )}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function shortLabel(name: string): string {
  const map: Record<string, string> = {
    "Machine Learning (Azure)": "Azure ML",
    "SQL for Analytics": "SQL",
    "Data Analysis": "Analysis",
  };
  return map[name] ?? name;
}
