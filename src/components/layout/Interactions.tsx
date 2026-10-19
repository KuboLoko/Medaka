"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

const MAGNET_RADIUS = 90;
const MAGNET_PULL = 0.32;
const MAGNET_MAX = 12;

/**
 * Pointer interactions for the whole site, from one pair of listeners:
 *
 *   [data-spotlight]  a soft light follows the cursor across the card
 *   [data-magnetic]   the element leans toward the cursor and springs back
 *
 * Mouse only, and skipped entirely for reduced motion. Everything is created inside
 * a gsap.context and the listeners are removed on unmount.
 */
export function Interactions() {
  useEffect(() => {
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    if (!motionOk.matches) return;

    const ctx = gsap.context(() => {
      const movers = new WeakMap<
        HTMLElement,
        { x: (v: number) => void; y: (v: number) => void; on: boolean }
      >();
      const moverFor = (el: HTMLElement) => {
        let m = movers.get(el);
        if (!m) {
          m = {
            x: gsap.quickTo(el, "x", { duration: 0.9, ease: "elastic.out(1, 0.45)" }),
            y: gsap.quickTo(el, "y", { duration: 0.9, ease: "elastic.out(1, 0.45)" }),
            on: false,
          };
          movers.set(el, m);
        }
        return m;
      };

      let frame = 0;
      let last: PointerEvent | null = null;

      const run = () => {
        frame = 0;
        const e = last;
        if (!e) return;

        const card = (e.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        }

        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          const r = el.getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const cy = r.top + r.height / 2;
          const dx = e.clientX - cx;
          const dy = e.clientY - cy;
          const near =
            Math.abs(dx) < r.width / 2 + MAGNET_RADIUS &&
            Math.abs(dy) < r.height / 2 + MAGNET_RADIUS;
          const m = moverFor(el);
          if (near) {
            m.on = true;
            m.x(Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, dx * MAGNET_PULL)));
            m.y(Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, dy * MAGNET_PULL)));
          } else if (m.on) {
            m.on = false;
            m.x(0);
            m.y(0);
          }
        });
      };

      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        last = e;
        if (!frame) frame = requestAnimationFrame(run);
      };

      const onLeave = () => {
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          const m = movers.get(el);
          if (m?.on) {
            m.on = false;
            m.x(0);
            m.y(0);
          }
        });
      };

      document.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);

      return () => {
        document.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        if (frame) cancelAnimationFrame(frame);
      };
    });

    return () => ctx.revert();
  }, []);

  return null;
}
