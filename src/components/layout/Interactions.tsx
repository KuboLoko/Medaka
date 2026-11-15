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
      // A firm settle with no overshoot: this is a site for finance buyers, so the pull
      // eases back to rest instead of bouncing.
      const SETTLE = { duration: 0.6, ease: "power3.out" } as const;
      const movers = new WeakMap<
        HTMLElement,
        { x: (v: number) => void; y: (v: number) => void; on: boolean }
      >();
      const moverFor = (el: HTMLElement) => {
        let m = movers.get(el);
        if (!m) {
          m = {
            x: gsap.quickTo(el, "x", SETTLE),
            y: gsap.quickTo(el, "y", SETTLE),
            on: false,
          };
          movers.set(el, m);
        }
        return m;
      };

      let frame = 0;
      let last: PointerEvent | null = null;

      // Reused every frame, so the pointer handler allocates nothing.
      const fishVals: number[] = [];
      const magVals: number[] = [];

      const run = () => {
        frame = 0;
        const e = last;
        if (!e) return;

        const card = (e.target as Element | null)?.closest<HTMLElement>("[data-spotlight]");
        const fishes = document.querySelectorAll<SVGElement>("svg[data-fish-eyes]");
        const magnets = document.querySelectorAll<HTMLElement>("[data-magnetic]");

        // Read first, write after. Every measurement happens before any style is changed,
        // so the browser works out layout once per frame instead of once per element.
        const cardRect = card ? card.getBoundingClientRect() : null;

        fishVals.length = 0;
        for (let i = 0; i < fishes.length; i++) {
          const r = fishes[i].getBoundingClientRect();
          if (r.bottom < 0 || r.top > window.innerHeight) {
            fishVals.push(NaN, NaN);
            continue;
          }
          const dx = e.clientX - (r.left + r.width * 0.25);
          const dy = e.clientY - (r.top + r.height * 0.37);
          const dist = Math.hypot(dx, dy) || 1;
          // The pupil can travel about 3 units inside the eye before it leaves the white.
          const reach = Math.min(1, dist / 220) * 3;
          fishVals.push((dx / dist) * reach, (dy / dist) * reach);
        }

        magVals.length = 0;
        for (let i = 0; i < magnets.length; i++) {
          const r = magnets[i].getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          const near =
            Math.abs(dx) < r.width / 2 + MAGNET_RADIUS &&
            Math.abs(dy) < r.height / 2 + MAGNET_RADIUS;
          magVals.push(
            near ? 1 : 0,
            Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, dx * MAGNET_PULL)),
            Math.max(-MAGNET_MAX, Math.min(MAGNET_MAX, dy * MAGNET_PULL)),
          );
        }

        // Writes.
        if (card && cardRect) {
          card.style.setProperty("--mx", `${e.clientX - cardRect.left}px`);
          card.style.setProperty("--my", `${e.clientY - cardRect.top}px`);
        }

        // The fish watches the cursor. The pupil moves a hair's breadth towards it.
        for (let i = 0; i < fishes.length; i++) {
          const ex = fishVals[i * 2];
          if (Number.isNaN(ex)) continue;
          fishes[i].style.setProperty("--ex", `${ex}px`);
          fishes[i].style.setProperty("--ey", `${fishVals[i * 2 + 1]}px`);
        }

        for (let i = 0; i < magnets.length; i++) {
          const m = moverFor(magnets[i]);
          if (magVals[i * 3] === 1) {
            m.on = true;
            m.x(magVals[i * 3 + 1]);
            m.y(magVals[i * 3 + 2]);
          } else if (m.on) {
            m.on = false;
            m.x(0);
            m.y(0);
          }
        }
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
