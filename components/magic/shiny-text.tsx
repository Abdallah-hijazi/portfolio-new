import { cn } from "@/lib/utils";

/** Neutral light sweep across text (Magic UI "Animated Shiny Text"). */
export function ShinyText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <span className={cn("shiny-text", className)}>{children}</span>;
}
