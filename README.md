# Abdallah Hijazi — Portfolio OS

A multi-identity portfolio built like an operating system: four themed
workspaces (Developer, Cybersecurity, AI & Data, Teaching) with OS-style
boot transitions, a simulated terminal, a data dashboard, global search,
and full keyboard navigation.

**Stack:** Next.js 15 (App Router, static export) · TypeScript (strict) ·
Tailwind CSS · Framer Motion · shadcn/ui-style primitives · Fuse.js ·
Lucide React. No backend, no database — everything is typed data compiled
to static HTML.

## Editing content

| File                     | Contents                                  |
| ------------------------ | ----------------------------------------- |
| `data/profile.ts`        | Bio, roles, stats, languages, education   |
| `data/projects.ts`       | Projects & case studies                   |
| `data/experience.ts`     | Work history, achievements, metrics       |
| `data/skills.ts`         | Skill categories & proficiency            |
| `data/certifications.ts` | Certifications & achievements             |
| `data/teaching.ts`       | Training / mentorship timeline            |
| `lib/site.ts`            | Name, URL, email, socials, CV path        |

### Adding assets

- **Portrait:** `public/images/portrait.jpg`, then swap the placeholder in
  `features/home/hero.tsx`.
- **CV:** `public/cv/Abdallah_Hijazi_CV.pdf` (already wired to the resume
  page and terminal `resume` command).
- **Screenshots:** add files under `public/images/projects/` and set
  `screenshots[].src` in `data/projects.ts`.

## Architecture

```
app/          Routes (App Router, all statically exported)
components/   Reusable UI: primitives (ui/), layout, motion, shared
features/     Feature slices: modes, search, terminal, security, ai,
              home, projects, experience, skills, certifications, …
data/         Typed content (single source of truth)
hooks/        Shared hooks (interval, mounted)
lib/          Site config, search index, utilities
public/       Static assets (og.png, cv/, .nojekyll)
styles/       Tailwind globals + design tokens
```

### Mode system

`features/modes` owns the identity system. Each mode sets a `data-mode`
attribute on `<html>`, which swaps CSS custom properties (accent palette).
An inline script applies the persisted mode before first paint (no theme
flash), and `ModeTransition` plays a boot-sequence overlay on switches.
Keyboard: `1`–`4` switch modes, `Ctrl/Cmd+K` opens search, `?` shows all
shortcuts.

### Accessibility & performance

- Every animation respects `prefers-reduced-motion`.
- Simulated panels (terminal, monitors) lazy-load client-side via
  `next/dynamic` and pause when the tab is hidden.
- Semantic HTML, ARIA labels, focus-visible rings, skip link, keyboard
  operable throughout.
