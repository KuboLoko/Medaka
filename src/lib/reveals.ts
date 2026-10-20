import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Scroll reveals. Call inside a gsap.matchMedia() callback that is already limited to
 * "no reduced motion", so nothing here runs for people who asked for none and the
 * markup stays in its final state.
 *
 *   [data-reveal]  floats in as it arrives, like something drifting up through water:
 *                  it rises, sways from side to side with a swing that dies away, and
 *                  settles exactly in place. The motion is tied to the scroll and eased
 *                  with a little lag, and it plays once, so what has arrived stays put.
 *   [data-split]   staggers the words or characters made by <SplitHeading>
 *   [data-tick]    counts up to its own value once, e.g. data-tick="6"
 */

const RISE = 52; // px the block starts below its place
const SWAY = 14; // px of side-to-side swing at the start

export function setupReveals(root: HTMLElement) {
  gsap.utils.toArray<HTMLElement>("[data-reveal]", root).forEach((node, i) => {
    const side = i % 2 === 0 ? 1 : -1;
    const state = { p: 0 };
    // A block that is already in place when the page loads can finish while it is still being
    // set up, so completion must not depend on the tween variable existing yet.
    let done = false;
    const handle: { trigger?: ScrollTrigger } = {};

    const apply = () => {
      if (done) return;
      const p = state.p;
      const rise = 1 - Math.pow(1 - p, 3); // power3.out: quick at first, then it slows to a stop
      const x = SWAY * side * (1 - p) * Math.cos(p * Math.PI * 2.5); // swings, and the swing fades to nothing
      gsap.set(node, {
        x,
        y: (1 - rise) * RISE,
        rotation: x * 0.06,
        opacity: Math.min(1, p * 2.4),
      });
    };

    apply();
    const tween = gsap.to(state, {
      p: 1,
      ease: "none",
      onUpdate: apply,
      onComplete: () => {
        done = true;
        gsap.set(node, { clearProps: "transform,opacity" });
        handle.trigger?.kill();
      },
      scrollTrigger: { trigger: node, start: "top 98%", end: "top 60%", scrub: 0.9 },
    });
    handle.trigger = tween.scrollTrigger;
    if (done) handle.trigger?.kill();
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
