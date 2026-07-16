import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/motion/reveal";
import { profile } from "@/data/profile";
import { ContactForm } from "@/features/contact/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Abdallah Hijazi for full-stack roles, security work, or developer training — email, LinkedIn, or GitHub.",
  alternates: { canonical: "/contact/" },
};

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    hint: "Fastest response",
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
    hint: "Lebanon (UTC+3)",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "abdallah-hijazi",
    href: site.social.linkedin,
    hint: "Professional network",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "Abdallah-hijazi",
    href: site.social.github,
    hint: "Code & activity",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: "Contact" }]}
        eyebrow="Say hello"
        title="Let's talk"
        description={profile.availability}
      />

      <div className="container grid gap-10 pb-28 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Reveal className="glass rounded-3xl p-8 sm:p-10">
          <h2 className="font-display text-xl font-semibold">Send a message</h2>
          <p className="mb-8 mt-1 text-sm text-muted">
            Tell me about your project, role, or training needs.
          </p>
          <ContactForm />
        </Reveal>

        <div className="space-y-4">
          {channels.map((channel, i) => (
            <Reveal key={channel.label} delay={i * 0.06}>
              <a
                href={channel.href}
                {...(channel.href.startsWith("http")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="glass glass-hover flex items-center gap-4 rounded-2xl p-5"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent-strong">
                  <channel.icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium">{channel.label}</span>
                  <span className="block truncate text-sm text-muted">
                    {channel.value}
                  </span>
                  <span className="block text-xs text-muted/70">{channel.hint}</span>
                </span>
              </a>
            </Reveal>
          ))}

          <Reveal delay={0.25}>
            <div className="glass rounded-2xl p-5">
              <p className="flex items-center gap-2 text-sm font-medium">
                <MapPin className="size-4 text-accent-strong" aria-hidden />
                {site.location}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                Working remotely with clients and teams worldwide. Languages:{" "}
                {profile.languages.map((l) => l.name).join(", ")}.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
