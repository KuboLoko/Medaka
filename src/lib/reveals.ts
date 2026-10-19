import { gsap } from "@/lib/gsap";

/**
 * Scroll reveals shared by the homepage wrappers. Call inside a gsap.matchMedia()
 * callback that is already limited to "no reduced motion", so that nothing here ever
 * runs for people who asked for none, and the markup stays in its final state.
 *
 *   [data-reveal]  fades up once as it arrives
 *   [data-split]   staggers the words or characters made by <SplitHeading>
 *   [data-tick]    counts up to its own value once, e.g. data-tick="6"
 */
export function setupReveals(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>("[data-reveal]", root).forEach((node) => {
    gsap.from(node, {
      opacity: 0,
      y: 28,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: node, start: "top 88%", once: true },
    });
  });

  gsap.utils.toArray<HTMLElement>("[data-split]", root).forEach((node) => {
    const inners = node.querySelectorAll(".split-inner");
    if (!inners.length) return;
    const chars = node.getAttribute("data-split") === "chars";
    gsap.from(inners, {
      yPercent: 108,
      opacity: 0,
      duration: 0.95,
      ease: "power4.out",
      stagger: chars ? 0.022 : 0.045,
      scrollTrigger: { trigger: node, start: "top 86%", once: true },
    });
  });

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
      duration: 1.4,
      ease: "power2.out",
      onUpdate: write,
      scrollTrigger: { trigger: node, start: "top 90%", once: true },
    });
  });
}
