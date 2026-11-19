import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { SkillsView } from "@/features/skills/skills-view";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Categorized skill matrix: frontend, backend, databases, cloud, security, AI & data, and tooling — with honest proficiency levels.",
  alternates: { canonical: "/skills/" },
};

export default function SkillsPage() {
  return (
    <>
      <PageHeader
        figure="plot"
        crumbs={[{ label: "Skills" }]}
        eyebrow="Capabilities"
        title="Skills"
        description="Honest levels over inflated percentages: Expert means daily production use, Foundational means working knowledge that's actively growing."
      />
      <div className="container pb-28">
        <SkillsView />
      </div>
    </>
  );
}
