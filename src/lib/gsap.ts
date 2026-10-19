import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };

/** Large screens that have not asked for reduced motion. */
export const MOTION_DESKTOP =
  "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

/** Any screen that has not asked for reduced motion. */
export const MOTION_ANY = "(prefers-reduced-motion: no-preference)";
