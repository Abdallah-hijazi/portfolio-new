import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { KeyboardShortcuts } from "@/components/layout/keyboard-shortcuts";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/shared/json-ld";
import { ModeProvider } from "@/features/modes/mode-context";
import { ModeTransition } from "@/features/modes/mode-transition";
import { CommandPaletteProvider } from "@/features/search/command-palette";
import { certifications } from "@/data/certifications";
import { site } from "@/lib/site";

import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Abdallah Hijazi",
    "full-stack developer",
    "web developer",
    "cybersecurity",
    "penetration testing",
    "React",
    "Next.js",
    "Laravel",
    "Lebanon",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a10",
  width: "device-width",
  initialScale: 1,
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.role,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Tripoli",
    addressCountry: "LB",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "CNAM University",
  },
  sameAs: [site.social.github, site.social.linkedin],
  knowsAbout: [
    "Web Development",
    "Cybersecurity",
    "Machine Learning",
    "React",
    "Next.js",
    "Laravel",
    "Penetration Testing",
  ],
  hasCredential: certifications.map((c) => ({
    "@type": "EducationalOccupationalCredential",
    name: c.title,
    credentialCategory: "certification",
    recognizedBy: { "@type": "Organization", name: c.issuer },
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${site.name} — Portfolio`,
  url: site.url,
  description: site.description,
  author: { "@type": "Person", name: site.name },
};

/**
 * Applies the persisted (or route-implied) identity mode before first paint
 * to avoid a theme flash. Must stay dependency-free and tiny.
 */
const modeInitScript = `(function(){try{var m=localStorage.getItem("portfolio-mode");var p=location.pathname;if(p.indexOf("/security")>-1)m="security";else if(p.indexOf("/ai-data")>-1)m="ai";else if(p.indexOf("/teaching")>-1)m="teaching";else if(p.indexOf("/developer")>-1)m="developer";if(["developer","security","ai","teaching"].indexOf(m)<0)m="developer";document.documentElement.setAttribute("data-mode",m);}catch(e){document.documentElement.setAttribute("data-mode","developer");}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-mode="developer"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Plain inline script: must run before first paint to avoid a theme flash. */}
        <script dangerouslySetInnerHTML={{ __html: modeInitScript }} />
        <JsonLd data={personJsonLd} />
        <JsonLd data={websiteJsonLd} />
      </head>
      <body>
        <ModeProvider>
          <CommandPaletteProvider>
            <SiteHeader />
            <main id="main" className="min-h-screen">
              {children}
            </main>
            <SiteFooter />
            <ModeTransition />
            <KeyboardShortcuts />
          </CommandPaletteProvider>
        </ModeProvider>
      </body>
    </html>
  );
}
