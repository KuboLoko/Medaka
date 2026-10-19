"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { MedakaMark } from "./MedakaMark";

/**
 * A thin thread down the left edge. A small medaka swims down it as the page scrolls.
 * Decorative only, desktop only, and omitted entirely for reduced motion.
 */
export function ScrollThread() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  const top = useTransform(progress, (v) => `${v * 100}%`);

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-6 left-1.5 top-20 z-30 hidden w-5 lg:block"
    >
      <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink-900/15" />
      <motion.div
        style={{ scaleY: progress, transformOrigin: "top" }}
        className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-ink-900/45"
      />
      <motion.div
        style={{ top }}
        className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90"
      >
        <MedakaMark animated className="h-3.5 w-6" />
      </motion.div>
    </div>
  );
}
