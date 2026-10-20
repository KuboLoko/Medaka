import { gsap } from "@/lib/gsap";

/**
 * Scroll reveals. Call inside a gsap.matchMedia() callback that is already limited to
 * "no reduced motion", so nothing here runs for people who asked for none and the
 * markup stays in its final state.
 *
 *   [data-reveal]  fades in and settles 10px, once, with a gentle ease-out. No sideways
 *                  movement, no bounce and no lag behind the scroll.
 *   [data-split]   a heading from <SplitHeading>, revealed the same way as a whole.
 *   [data-tick]    counts up to its own value once, e.g. data-tick="6"
 */

const RISE = 10; // px the block settles by
const DURATION = 0.6;

export function setupReveals(root: HTMLElement) {
  const settle = (node: Element) => {
    gsap.from(node, {
      opacity: 0,
      y: RISE,
      duration: DURATION,
      ease: "power2.out",
      clearProps: "transform,opacity",
      scrollTrigger: { trigger: node, start: "top 90%", once: true },
    });
  };

  gsap.utils.toArray<HTMLElement>("[data-reveal]", root).forEach(settle);
  gsap.utils.toArray<HTMLElement>("[data-split]", root).forEach(settle);

  gsap.utils.toArray<HTMLElement>("[data-tick]", root).forEach((node) => {
    const target = Number(node.getAttribute("data-tick"));
    if (!Number.isFinite(target)) return;
    const state = { v: 0 };
    const write = () => {
      node.textContent = String(Math.round(state.v));
    };
    write();
    gsap.to(state, {
      v: target,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: write,
      scrollTrigger: { trigger: node, start: "top 90%", once: true },
    });
  });
}
