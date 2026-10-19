"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, MOTION_ANY } from "@/lib/gsap";
import { setupReveals } from "@/lib/reveals";

/** Runs the shared scroll reveals for everything inside. Nothing is hidden for reduced motion. */
export function Reveals({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(MOTION_ANY, () => setupReveals(el));
    return () => mm.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
