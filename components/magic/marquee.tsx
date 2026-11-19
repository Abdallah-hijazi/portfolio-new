import { cn } from "@/lib/utils";

/** Infinite horizontal marquee with faded edges (Magic UI "Marquee"). */
export function Marquee({
  children,
  reverse = false,
  className,
  duration = 40,
}: {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
  duration?: number;
}) {
  return (
    <div
      className={cn("marquee-mask group flex overflow-hidden [--gap:0.75rem] gap-[var(--gap)]", className)}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          aria-hidden={copy === 1}
          className="flex shrink-0 animate-marquee-x gap-[var(--gap)] group-hover:[animation-play-state:paused]"
          style={{
            animationDirection: reverse ? "reverse" : "normal",
            animationDuration: `${duration}s`,
          }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
