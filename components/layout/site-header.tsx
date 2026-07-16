"use client";

import { Menu, Search, Terminal, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ModeSwitcher } from "@/components/layout/mode-switcher";
import { Button } from "@/components/ui/button";
import { useCommandPalette } from "@/features/search/command-palette";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];

function isActivePath(pathname: string, href: string): boolean {
  const clean = pathname.replace(/\/+$/, "") || "/";
  return clean === href || clean.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const { setOpen } = useCommandPalette();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled || mobileOpen
          ? "border-b border-line/70 bg-background/75 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-background"
      >
        Skip to content
      </a>

      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-2 font-mono text-sm font-bold tracking-tight"
          aria-label="Abdallah Hijazi — home"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-accent-soft text-accent-strong transition-colors group-hover:bg-accent group-hover:text-background">
            <Terminal className="size-4" aria-hidden />
          </span>
          <span className="hidden sm:inline">
            AH<span className="text-accent">://</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-sm transition-colors",
                      active
                        ? "bg-surface-2 text-foreground"
                        : "text-muted hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="glass glass-hover hidden h-9 items-center gap-2.5 rounded-full pl-3.5 pr-2 text-sm text-muted sm:flex"
            aria-label="Open global search (Ctrl+K)"
          >
            <Search className="size-3.5" aria-hidden />
            <span className="hidden md:inline">Search</span>
            <kbd className="kbd">⌘K</kbd>
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="sm:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open global search"
          >
            <Search aria-hidden />
          </Button>

          <ModeSwitcher instanceId="header" className="hidden md:flex" />

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X aria-hidden /> : <Menu aria-hidden />}
          </Button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-nav"
        className={cn(
          "lg:hidden",
          mobileOpen
            ? "block border-t border-line/70 bg-background/95 backdrop-blur-xl"
            : "hidden",
        )}
      >
        <nav aria-label="Mobile" className="container flex h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto py-6">
          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "rounded-xl px-4 py-3 text-lg font-medium transition-colors",
                  active ? "bg-surface-2 text-foreground" : "text-muted",
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="mt-4 border-t border-line pt-6">
            <p className="mb-3 px-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              Identity mode
            </p>
            <ModeSwitcher instanceId="mobile" className="mx-4 w-fit" />
          </div>
        </nav>
      </div>
    </header>
  );
}
