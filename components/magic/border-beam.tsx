import { cn } from "@/lib/utils";

/**
 * A short light beam that travels around the border of its parent
 * (Magic UI "Border Beam"). Parent must be `relative` + rounded.
 */
export function BorderBeam({
  className,
  duration = 9,
  delay = 0,
  size = 140,
}: {
  className?: string;
  duration?: number;
  delay?: number;
  size?: number;
}) {
  return (
    <span
      aria-hidden
      className={cn("border-beam pointer-events-none absolute inset-0 rounded-[inherit]", className)}
      style={
        {
          "--beam-size": `${size}px`,
          "--beam-duration": `${duration}s`,
          "--beam-delay": `-${delay}s`,
        } as React.CSSProperties
      }
    />
  );
}
