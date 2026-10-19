"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, MOTION_ANY } from "@/lib/gsap";
import { setupReveals } from "@/lib/reveals";

/**
 * Sits around every page and runs the scroll reveals for the elements inside it.
 * It runs again on each navigation, because the layout (and this component) stays mounted
 * while the page inside it changes. Nothing is hidden for reduced motion.
 */
export function Reveals({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(MOTION_ANY, () => setupReveals(el));
    const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(frame);
      mm.revert();
    };
  }, [pathname]);

  return <div ref={root}>{children}</div>;
}
