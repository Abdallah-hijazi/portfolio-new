import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { Hero } from "@/features/home/hero";
import {
  ContactCtaSection,
  FeaturedProjectsSection,
  LatestCertificationsSection,
  RecentExperienceSection,
  StackMarquee,
  StatsSection,
} from "@/features/home/home-sections";
import { ModeGrid } from "@/features/home/mode-grid";

export const metadata: Metadata = {
  title: "Abdallah Hijazi — Full-Stack Developer & Security Researcher",
  description:
    "Full-stack web developer and cybersecurity practitioner in Tripoli, Lebanon. React, Next.js, Laravel, penetration testing, Azure ML, and developer training.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsSection />
      <StackMarquee />
      <ModeGrid />
      <FeaturedProjectsSection />
      <RecentExperienceSection />
      <LatestCertificationsSection />
      <ContactCtaSection />
      <Analytics />
      <SpeedInsights />
    </>
  );
}
