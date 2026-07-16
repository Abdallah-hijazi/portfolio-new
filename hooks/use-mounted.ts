"use client";

import { useEffect, useState } from "react";

/** True after the first client render — for hydration-sensitive UI. */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
