import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CertificationsView } from "@/features/certifications/certifications-view";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Credentials across development, security, and data: Azure ML badges and trophy, Youbee.ai security certifications, Power BI, and CNAM.",
  alternates: { canonical: "/certifications/" },
};

export default function CertificationsPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Certifications" }]}
        eyebrow="Credentials"
        title="Certifications"
        description="Verified learning across three tracks — development, security, and data. Filter by category."
      />
      <div className="container pb-16">
        <CertificationsView />
      </div>
      <div className="container pb-28">
        <Reveal className="glass flex flex-col items-center gap-4 rounded-3xl p-10 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h2 className="font-display text-xl font-bold">
              Awards & competition results
            </h2>
            <p className="mt-1 text-sm text-muted">
              IEEE Xtreme national finalist, Azure ML trophy, and more.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/achievements">View achievements</Link>
          </Button>
        </Reveal>
      </div>
    </>
  );
}
