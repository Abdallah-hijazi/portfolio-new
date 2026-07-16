import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { ExperienceTimeline } from "@/features/experience/experience-timeline";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Interactive career timeline: Compu-vision, Cutting Edge, Interphase, freelance full-stack work, security research, and developer training.",
  alternates: { canonical: "/experience/" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Experience" }]}
        eyebrow="Career"
        title="Experience"
        description="From frontend performance work to backend architecture and independent security research — expand any entry for achievements, metrics, and stack."
      />
      <div className="container max-w-4xl pb-28">
        <ExperienceTimeline />
      </div>
    </>
  );
}
