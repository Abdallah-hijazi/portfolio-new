import { ArrowLeft, TerminalSquare } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Particles } from "@/components/magic/particles";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 — Route not found",
  description: "The requested path does not exist on this system.",
};

export default function NotFound() {
  return (
    <div className="scanlines relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      <Particles quantity={70} />

      <div className="container relative z-10 max-w-2xl py-20">
        <div className="glass overflow-hidden rounded-2xl font-mono text-sm">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 text-xs text-muted">
            <TerminalSquare className="size-3.5" aria-hidden />
            visitor@ah — route_handler
          </div>
          <div className="space-y-2 p-6">
            <p className="text-muted">
              <span className="text-terminal-green">$</span> resolve --path
              requested_url
            </p>
            <p className="text-terminal-red">
              error 404: route not found in filesystem
            </p>
            <p className="text-muted"># suggestions:</p>
            <ul className="space-y-1 pl-4 text-foreground/80">
              <li>· check the URL for typos</li>
              <li>
                · press <kbd className="kbd">Ctrl</kbd>+<kbd className="kbd">K</kbd>{" "}
                and search instead
              </li>
              <li>· return to a known-good route below</li>
            </ul>
            <p className="pt-2 text-muted">
              <span className="text-terminal-green">$</span>{" "}
              <span className="animate-blink">▌</span>
            </p>
          </div>
        </div>

        <h1 className="mt-10 text-center font-display text-6xl font-bold tracking-tight sm:text-7xl">
          4<span className="text-foreground/50">0</span>4
        </h1>
        <p className="mt-4 text-center text-muted">
          This page doesn&apos;t exist — but the rest of the system is fully
          operational.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/">
              <ArrowLeft aria-hidden /> Back home
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/projects">Browse projects</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
