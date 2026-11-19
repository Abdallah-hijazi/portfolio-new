import type { Metadata } from "next";
import { Suspense } from "react";

import { PageHeader } from "@/components/shared/page-header";
import { ProjectsExplorer } from "@/features/projects/projects-explorer";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Web platforms, security research, and data work — filterable by category, status, and technology, each with a full case study.",
  alternates: { canonical: "/projects/" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        figure="exploded"
        crumbs={[{ label: "Projects" }]}
        eyebrow="Case studies"
        title="Projects"
        description="Production platforms, freelance builds, and security research. Filter by category, status, or technology — every project links to a full case study."
      />
      <div className="container pb-28">
        <Suspense fallback={null}>
          <ProjectsExplorer />
        </Suspense>
      </div>
    </>
  );
}
