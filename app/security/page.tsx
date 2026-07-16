import type { Metadata } from "next";

import { SecurityWorkspace } from "@/features/security/security-workspace";

export const metadata: Metadata = {
  title: "Cybersecurity Mode",
  description:
    "Terminal-first security workspace: penetration testing background, OWASP methodology, certifications, and an interactive simulated shell.",
  alternates: { canonical: "/security/" },
};

export default function SecurityPage() {
  return <SecurityWorkspace />;
}
