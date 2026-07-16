import { ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Styled placeholder for screenshots/photos that have not been added yet.
 * Keeps layout honest without fabricating imagery.
 */
export function PlaceholderVisual({
  label,
  className,
  icon: Icon = ImageIcon,
}: {
  label: string;
  className?: string;
  icon?: typeof ImageIcon;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "relative flex items-center justify-center overflow-hidden rounded-2xl border border-dashed border-line bg-surface",
        className,
      )}
    >
      <div className="grid-bg absolute inset-0 opacity-60" aria-hidden />
      <div className="relative z-10 flex flex-col items-center gap-3 p-8 text-center">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-accent-soft text-accent-strong">
          <Icon className="size-5" aria-hidden />
        </span>
        <p className="max-w-[24ch] font-mono text-xs leading-relaxed text-muted">
          {label}
        </p>
      </div>
    </div>
  );
}
