"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, MOTION_ANY } from "@/lib/gsap";

/** Fades `[data-reveal]` blocks in once as they arrive. Nothing is hidden for reduced motion. */
export function Reveals({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_ANY, () => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]", el).forEach((node) => {
        gsap.from(node, {
          opacity: 0,
          y: 28,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 88%", once: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return <div ref={root}>{children}</div>;
}
