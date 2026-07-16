"use client";

import { Command } from "cmdk";
import Fuse from "fuse.js";
import {
  Award,
  Braces,
  Briefcase,
  FileText,
  FolderKanban,
  GraduationCap,
  Layers,
  Mail,
  Medal,
  MonitorCog,
  Search,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useMode } from "@/features/modes/mode-context";
import { modes } from "@/features/modes/mode-config";
import { searchRecords, type SearchRecord, type SearchRecordType } from "@/lib/search-index";

interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export function useCommandPalette(): CommandPaletteContextValue {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx)
    throw new Error("useCommandPalette must be used within CommandPaletteProvider");
  return ctx;
}

const typeIcons: Record<SearchRecordType, typeof Search> = {
  Project: FolderKanban,
  Experience: Briefcase,
  Skill: Layers,
  Certification: GraduationCap,
  Achievement: Medal,
  Technology: Braces,
  Page: FileText,
};

const typeOrder: SearchRecordType[] = [
  "Page",
  "Project",
  "Experience",
  "Skill",
  "Certification",
  "Achievement",
  "Technology",
];

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const value = useMemo(() => ({ open, setOpen }), [open]);

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      <CommandPaletteDialog />
    </CommandPaletteContext.Provider>
  );
}

function CommandPaletteDialog() {
  const { open, setOpen } = useCommandPalette();
  const { switchMode } = useMode();
  const router = useRouter();
  const [query, setQuery] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse<SearchRecord>(searchRecords, {
        keys: [
          { name: "title", weight: 0.55 },
          { name: "subtitle", weight: 0.2 },
          { name: "keywords", weight: 0.25 },
        ],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [],
  );

  const results = useMemo(() => {
    if (!query.trim()) return searchRecords.filter((r) => r.type === "Page");
    return fuse.search(query, { limit: 24 }).map((r) => r.item);
  }, [query, fuse]);

  const grouped = useMemo(() => {
    const map = new Map<SearchRecordType, SearchRecord[]>();
    for (const record of results) {
      const list = map.get(record.type) ?? [];
      list.push(record);
      map.set(record.type, list);
    }
    return typeOrder
      .filter((t) => map.has(t))
      .map((t) => ({ type: t, records: map.get(t) as SearchRecord[] }));
  }, [results]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      setQuery("");
      router.push(href);
    },
    [router, setOpen],
  );

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="top-[18%] max-w-xl translate-y-0 gap-0 overflow-hidden p-0">
        <DialogTitle className="sr-only">Global search</DialogTitle>
        <Command shouldFilter={false} label="Global search">
          <div className="flex items-center gap-3 border-b border-line px-4">
            <Search className="size-4 shrink-0 text-muted" aria-hidden />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Search projects, skills, certifications…"
              className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted/70"
            />
            <kbd className="kbd shrink-0">ESC</kbd>
          </div>

          <Command.List className="max-h-[55vh] overflow-y-auto p-2">
            <Command.Empty className="px-4 py-10 text-center text-sm text-muted">
              No results for “{query}”.
            </Command.Empty>

            {!query.trim() && (
              <Command.Group
                heading="Switch mode"
                className="mb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted"
              >
                {modes.map((mode) => (
                  <Command.Item
                    key={mode.id}
                    value={`mode-${mode.id}`}
                    onSelect={() => {
                      setOpen(false);
                      switchMode(mode.id);
                    }}
                    className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-surface-2 aria-selected:text-foreground"
                  >
                    <MonitorCog className="size-4 text-muted" aria-hidden />
                    <span className="flex-1">{mode.label}</span>
                    <span
                      className="size-2 rounded-full"
                      style={{ background: mode.color }}
                      aria-hidden
                    />
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {grouped.map(({ type, records }) => (
              <Command.Group
                key={type}
                heading={type === "Page" ? "Navigate" : `${type}s`}
                className="mb-1 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted"
              >
                {records.map((record) => {
                  const Icon = typeIcons[record.type];
                  return (
                    <Command.Item
                      key={record.id}
                      value={record.id}
                      onSelect={() => go(record.href)}
                      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-foreground/90 aria-selected:bg-surface-2 aria-selected:text-foreground"
                    >
                      <Icon className="size-4 shrink-0 text-muted" aria-hidden />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{record.title}</span>
                        <span className="block truncate text-xs text-muted">
                          {record.subtitle}
                        </span>
                      </span>
                    </Command.Item>
                  );
                })}
              </Command.Group>
            ))}

            {!query.trim() && (
              <div className="mt-2 flex items-center gap-4 border-t border-line px-3 py-2.5 text-[11px] text-muted">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="size-3" aria-hidden /> Tip
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="kbd">↑↓</kbd> navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="kbd">↵</kbd> open
                </span>
                <span className="ml-auto flex items-center gap-1">
                  <Mail className="size-3" aria-hidden />
                  <Award className="size-3" aria-hidden />
                  fully static — no tracking
                </span>
              </div>
            )}
          </Command.List>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
