/** Isometric helpers shared by the hairline figures. */
export const COS = Math.cos(Math.PI / 6);
export const SIN = 0.5;

export type Pt = [number, number];

/** World (x, y, z) → screen, with the origin at (ox, oy). */
export function iso(x: number, y: number, z: number, ox: number, oy: number): Pt {
  return [ox + (x - y) * COS, oy + (x + y) * SIN - z];
}

export const pts = (list: Pt[]) =>
  list.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ");

/** SVG transform mapping a flat (u, v) plane onto the isometric floor at height z. */
export const planeMatrix = (ox: number, oy: number, z: number) =>
  `matrix(${COS} ${SIN} ${-COS} ${SIN} ${ox} ${oy - z})`;

/** Shared stroke props: thin hairline that ignores the plane transform scale. */
export const hair = {
  vectorEffect: "non-scaling-stroke" as const,
  strokeWidth: 0.9,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};
