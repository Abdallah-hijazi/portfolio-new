/** Shared (server-safe) figure identifiers. */
export type FigureKind = "exploded" | "padlock" | "plot" | "terminal";

/** Picks a figure that fits a project category. */
export function figureForCategory(category: string): FigureKind {
  switch (category) {
    case "Security":
      return "padlock";
    case "Data & AI":
      return "plot";
    case "Backend & APIs":
    case "Portfolio":
      return "terminal";
    default:
      return "exploded";
  }
}
