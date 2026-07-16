import { ExternalLink, Github } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { ProjectLinks as ProjectLinksType } from "@/data/types";

function hasPublicLinks(links: ProjectLinksType): boolean {
  return !!(
    links.github ||
    links.live ||
    (links.websites && links.websites.length > 0)
  );
}

/** Header / sidebar link actions for a project case study. */
export function ProjectLinks({
  links,
  linksNote,
  variant = "header",
}: {
  links: ProjectLinksType;
  linksNote?: string;
  variant?: "header" | "sidebar";
}) {
  if (!hasPublicLinks(links)) {
    if (variant === "header") {
      return linksNote ? (
        <span className="font-mono text-xs text-muted">{linksNote}</span>
      ) : null;
    }
    return null;
  }

  if (variant === "sidebar") {
    return (
      <div className="glass rounded-2xl p-6">
        <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
          Links
        </h2>
        <ul className="mt-4 space-y-2">
          {links.websites?.map((site) => (
            <li key={site.url}>
              <a
                href={site.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-accent-strong hover:underline"
              >
                <ExternalLink className="size-3.5 shrink-0" aria-hidden />
                {site.label}
              </a>
            </li>
          ))}
          {links.live && (
            <li>
              <a
                href={links.live}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-accent-strong hover:underline"
              >
                <ExternalLink className="size-3.5 shrink-0" aria-hidden />
                Live demo
              </a>
            </li>
          )}
          {links.github && (
            <li>
              <a
                href={links.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-accent-strong hover:underline"
              >
                <Github className="size-3.5 shrink-0" aria-hidden />
                Source code
              </a>
            </li>
          )}
        </ul>
      </div>
    );
  }

  return (
    <>
      {links.websites?.map((site) => (
        <Button key={site.url} asChild size="sm">
          <a href={site.url} target="_blank" rel="noreferrer">
            <ExternalLink aria-hidden /> {site.label}
          </a>
        </Button>
      ))}
      {links.live && (
        <Button asChild size="sm">
          <a href={links.live} target="_blank" rel="noreferrer">
            <ExternalLink aria-hidden /> Live demo
          </a>
        </Button>
      )}
      {links.github && (
        <Button asChild variant="secondary" size="sm">
          <a href={links.github} target="_blank" rel="noreferrer">
            <Github aria-hidden /> Source
          </a>
        </Button>
      )}
    </>
  );
}

export { hasPublicLinks };
