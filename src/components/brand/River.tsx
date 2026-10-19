"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MedakaMark } from "./MedakaMark";

/**
 * The thread that links the five steps, with one medaka following it left to right.
 * Sits behind the step cards, so it shows only in the gaps. Desktop only.
 */
export function River({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className={className}>
      <div className="relative h-8">
        <svg
          viewBox="0 0 1000 32"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          focusable="false"
        >
          <path
            className="sight-line"
            d="M0 16 C 125 2, 125 30, 250 16 S 375 2, 500 16 S 625 30, 750 16 S 875 2, 1000 16"
            fill="none"
            stroke="var(--color-ink-900)"
            strokeOpacity="0.55"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {!reduce && (
          <motion.div
            className="absolute top-1/2 -translate-y-1/2"
            initial={{ left: "0%" }}
            animate={{ left: "96%", y: [0, -6, 6, -6, 6, 0] }}
            transition={{
              duration: 10,
              ease: "linear",
              repeat: Infinity,
              repeatDelay: 1.5,
            }}
          >
            <MedakaMark animated className="h-4 w-7 -translate-y-1/2" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
