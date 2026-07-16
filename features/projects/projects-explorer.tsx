"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDownWideNarrow, FilterX, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  allCategories,
  allStatuses,
  allTechnologies,
  projects,
} from "@/data/projects";
import type { Project } from "@/data/types";
import { cn } from "@/lib/utils";

import { ProjectCard } from "./project-card";

type SortKey = "featured" | "newest" | "oldest" | "alphabetical";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured first" },
  { key: "newest", label: "Newest" },
  { key: "oldest", label: "Oldest" },
  { key: "alphabetical", label: "A → Z" },
];

function sortProjects(list: Project[], sort: SortKey): Project[] {
  const copy = [...list];
  switch (sort) {
    case "newest":
      return copy.sort((a, b) => b.year - a.year);
    case "oldest":
      return copy.sort((a, b) => a.year - b.year);
    case "alphabetical":
      return copy.sort((a, b) => a.title.localeCompare(b.title));
    case "featured":
    default:
      return copy.sort(
        (a, b) => Number(b.featured) - Number(a.featured) || b.year - a.year,
      );
  }
}

/**
 * Client-side project explorer: text search, category/status/technology
 * filters, and sorting. Deep-linkable via the ?tech= query param.
 */
export function ProjectsExplorer() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [tech, setTech] = useState<string | null>(null);
  const [sort, setSort] = useState<SortKey>("featured");

  // Adopt ?tech= deep links (e.g. from global search).
  useEffect(() => {
    const param = searchParams.get("tech");
    if (param && allTechnologies.includes(param)) setTech(param);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = projects.filter((p) => {
      if (category && p.category !== category) return false;
      if (status && p.status !== status) return false;
      if (tech && !p.technologies.includes(tech)) return false;
      if (!q) return true;
      const haystack = [
        p.title,
        p.tagline,
        p.overview,
        p.category,
        ...p.technologies,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
    return sortProjects(list, sort);
  }, [query, category, status, tech, sort]);

  const hasFilters = query || category || status || tech;

  return (
    <div>
      {/* Controls */}
      <div className="glass rounded-2xl p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects by name, tech, or keyword…"
              aria-label="Search projects"
              className="pl-10"
            />
          </div>

          <div className="flex items-center gap-2">
            <ArrowDownWideNarrow className="size-4 shrink-0 text-muted" aria-hidden />
            <label htmlFor="project-sort" className="sr-only">
              Sort projects
            </label>
            <select
              id="project-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-10 rounded-xl border border-line bg-surface-2 px-3 text-sm text-foreground focus-visible:border-accent/60 focus-visible:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>

            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setQuery("");
                  setCategory(null);
                  setStatus(null);
                  setTech(null);
                }}
              >
                <FilterX aria-hidden /> Clear
              </Button>
            )}
          </div>
        </div>

        {/* Filter rows */}
        <FilterRow
          label="Category"
          options={allCategories}
          active={category}
          onSelect={setCategory}
        />
        <FilterRow
          label="Status"
          options={allStatuses}
          active={status}
          onSelect={setStatus}
        />
        <FilterRow
          label="Technology"
          options={allTechnologies}
          active={tech}
          onSelect={setTech}
          collapsible
        />
      </div>

      {/* Result count */}
      <p className="mt-6 font-mono text-xs text-muted" role="status">
        {filtered.length} project{filtered.length === 1 ? "" : "s"}
        {hasFilters ? " matching filters" : ""}
      </p>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <motion.ul layout className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((project) => (
            <motion.li
              layout
              key={project.slug}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.li>
          ))}
        </motion.ul>
      </AnimatePresence>

      {filtered.length === 0 && (
        <div className="glass mt-4 rounded-2xl p-12 text-center">
          <p className="font-display text-lg font-semibold">No matches</p>
          <p className="mt-2 text-sm text-muted">
            Try clearing a filter or searching for a different keyword.
          </p>
        </div>
      )}
    </div>
  );
}

function FilterRow({
  label,
  options,
  active,
  onSelect,
  collapsible = false,
}: {
  label: string;
  options: readonly string[];
  active: string | null;
  onSelect: (value: string | null) => void;
  collapsible?: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = collapsible && !expanded ? options.slice(0, 8) : options;

  return (
    <div className="mt-4 flex flex-wrap items-center gap-1.5 border-t border-line/60 pt-4">
      <span className="mr-2 w-20 shrink-0 font-mono text-[11px] uppercase tracking-wider text-muted">
        {label}
      </span>
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={cn("focus-visible:outline-none")}
        aria-pressed={active === null}
      >
        <Badge variant={active === null ? "solid" : "outline"} className="cursor-pointer">
          All
        </Badge>
      </button>
      {visible.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onSelect(active === option ? null : option)}
          aria-pressed={active === option}
          className="focus-visible:outline-none"
        >
          <Badge
            variant={active === option ? "solid" : "outline"}
            className="cursor-pointer"
          >
            {option}
          </Badge>
        </button>
      ))}
      {collapsible && options.length > 8 && (
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="ml-1 font-mono text-[11px] text-accent-strong hover:underline"
        >
          {expanded ? "show less" : `+${options.length - 8} more`}
        </button>
      )}
    </div>
  );
}
