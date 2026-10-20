"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { MedakaMark } from "@/components/brand/MedakaMark";
import { gsap, ScrollTrigger, MOTION_ANY, MOTION_DESKTOP } from "@/lib/gsap";

type Dot = { el: SVGCircleElement; t: number };

type Seg = {
  path: SVGPathElement;
  fish: HTMLElement;
  tail: SVGElement | null;
  kind: "lead" | "tip" | "merge";
  index: number;
  len: number;
  p: number;
  dots: Dot[];
  pulse: SVGGElement | null;
  // Target pose from the path, before the organic movement is added.
  x: number;
  y: number;
  tx: number;
  ty: number;
  /** Rotation in degrees, measured from the fish's own heading and kept within a half turn. */
  angle: number;
  smooth: number;
  /** 1 faces left (as drawn), -1 is mirrored to face right. Mirroring keeps the dorsal side up. */
  face: 1 | -1;
  visible: boolean;
  phase: number;
  tailPhase: number;
  reached: boolean;
};

const FOUR = [1, 2, 3, 4] as const;
const SVG_NS = "http://www.w3.org/2000/svg";
const DOT_SPACING = 58;

/**
 * Wraps the first part of the homepage story.
 *
 * - Any screen with motion allowed: scroll reveals, split headings, counters, and the
 *   "2 of 12" to "1 of 6" counter.
 * - Large screens with motion allowed: one cream thread from the hero to the ChatGPT card,
 *   four branches to the sources, then a merge into the answer. A medaka swims it, turning
 *   with the curve, drifting a little and beating its tail faster when you scroll faster.
 *   Dots along the line light up as the fish passes. Once a branch arrives, light pulses
 *   run along it, a ripple leaves the card and its status badge pops in.
 * - Reduced motion, or small screens: nothing is hidden or pinned and the overlay stays
 *   empty, so the sections read as a plain stacked page.
 *
 * Everything is created inside gsap.matchMedia(), which scopes selectors to this element and
 * reverts tweens, triggers and set values on cleanup. Listeners and the ticker are removed there too.
 */
export function ThreadStory({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);

    mm.add(MOTION_ANY, () => {
      // "Named in 2 of 12 answers" becomes "Named in 1 of 6 answers" as the report arrives.
      const counter = el.querySelector<HTMLElement>("[data-count]");
      if (!counter) return undefined;
      const state = { a: 2, b: 12 };
      const write = () => {
        counter.textContent = `Named in ${Math.round(state.a)} of ${Math.round(state.b)} answers`;
      };
      write();
      gsap.to(state, {
        a: 1,
        b: 6,
        ease: "none",
        onUpdate: write,
        scrollTrigger: { trigger: counter, start: "top 92%", end: "top 45%", scrub: true },
      });
      return () => {
        counter.textContent = "Named in 1 of 6 answers";
      };
    });

    mm.add(MOTION_DESKTOP, () => {
      const svg = el.querySelector<SVGSVGElement>("[data-thread]");
      if (!svg) return undefined;
      const section = (name: string) =>
        el.querySelector<HTMLElement>(`[data-section="${name}"]`);
      const pick = <T extends Element>(sel: string) => el.querySelector<T>(sel);

      // Position inside the story, from layout offsets so reveal transforms do not skew it.
      const at = (name: string, edge: "top" | "bottom") => {
        const node = el.querySelector<HTMLElement>(`[data-anchor="${name}"]`);
        if (!node) return { x: 0, y: 0 };
        let x = 0;
        let y = 0;
        let n: HTMLElement | null = node;
        while (n && n !== el) {
          x += n.offsetLeft;
          y += n.offsetTop;
          n = n.offsetParent as HTMLElement | null;
        }
        return { x: x + node.offsetWidth / 2, y: y + (edge === "bottom" ? node.offsetHeight : 0) };
      };

      const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => {
        const dy = Math.max(60, (b.y - a.y) * 0.55);
        return `C ${a.x} ${a.y + dy}, ${b.x} ${b.y - dy}, ${b.x} ${b.y}`;
      };

      const segs: Seg[] = [];
      const make = (
        path: SVGPathElement | null,
        fish: HTMLElement | null,
        kind: Seg["kind"],
        index: number,
      ) => {
        if (!path || !fish) return;
        segs.push({
          path,
          fish,
          tail: fish.querySelector<SVGElement>(".fish-tail"),
          kind,
          index,
          len: 0,
          p: 0,
          dots: [],
          pulse: null,
          x: 0,
          y: 0,
          tx: 1,
          ty: 0,
          angle: 0,
          smooth: Number.NaN,
          face: 1,
          visible: false,
          phase: Math.random() * Math.PI * 2,
          tailPhase: Math.random() * Math.PI * 2,
          reached: false,
        });
      };
      make(pick('[data-path="main"]'), pick('[data-fish="lead"]'), "lead", 0);
      FOUR.forEach((i) => {
        make(pick(`[data-path="branch-${i}"]`), pick(`[data-fish="branch-${i}"]`), "tip", i);
        make(pick(`[data-path="merge-${i}"]`), pick(`[data-fish="merge-${i}"]`), "merge", i);
      });

      const dotLayer = document.createElementNS(SVG_NS, "g");
      svg.appendChild(dotLayer);

      // ---- source cards: ripple and status badge ----
      const cards = FOUR.map((i) => {
        const card = pick<HTMLElement>(`[data-anchor="src-${i}"]`);
        return {
          card,
          ring: card?.querySelector<HTMLElement>("[data-ripple]") ?? null,
          badge: card?.querySelector<HTMLElement>("[data-badge]") ?? null,
        };
      });
      cards.forEach(({ badge, ring }) => {
        if (badge) gsap.set(badge, { scale: 0.4, opacity: 0, transformOrigin: "100% 50%" });
        if (ring) gsap.set(ring, { opacity: 0 });
      });

      const ripple = (i: number) => {
        const { ring } = cards[i - 1];
        if (!ring) return;
        gsap.fromTo(
          ring,
          { scale: 0.3, opacity: 0.9 },
          { scale: 4.5, opacity: 0, duration: 1, ease: "power2.out", overwrite: true },
        );
      };
      const reveal = (i: number) => {
        const { badge } = cards[i - 1];
        ripple(i);
        if (badge)
          gsap.to(badge, { scale: 1, opacity: 1, duration: 0.55, delay: 0.12, ease: "back.out(2.6)", overwrite: true });
      };
      const hide = (i: number) => {
        const { badge } = cards[i - 1];
        if (badge) gsap.to(badge, { scale: 0.4, opacity: 0, duration: 0.25, overwrite: true });
      };

      const hoverHandlers = cards.map(({ card }, idx) => {
        const handler = () => {
          const tip = segs.find((s) => s.kind === "tip" && s.index === idx + 1);
          if (tip?.reached) ripple(idx + 1);
        };
        card?.addEventListener("pointerenter", handler);
        return { card, handler };
      });

      // ---- per-segment drawing ----
      const apply = (s: Seg) => {
        s.path.style.strokeDashoffset = `${s.len * (1 - s.p)}`;
        const d = s.len * s.p;
        const a = s.path.getPointAtLength(d);
        // A window either side of the fish, so the heading is never zero at the ends of the path.
        const before = s.path.getPointAtLength(Math.max(0, d - 3));
        const after = s.path.getPointAtLength(Math.min(s.len, d + 3));
        const dx = after.x - before.x;
        const dy = after.y - before.y;
        const mag = Math.hypot(dx, dy) || 1;
        s.x = a.x;
        s.y = a.y;
        s.tx = dx / mag;
        s.ty = dy / mag;

        // Face the way it is swimming. A mirrored fish is rotated from "facing right",
        // an unmirrored one from "facing left", so it is never turned upside down.
        const theta = (Math.atan2(dy, dx) * 180) / Math.PI;
        let face = s.face;
        if (dx > 0.2 * mag) face = -1;
        else if (dx < -0.2 * mag) face = 1;
        const turn = (v: number) => ((((v + 180) % 360) + 360) % 360) - 180;
        s.angle = face === 1 ? turn(theta - 180) : turn(theta);
        if (Number.isNaN(s.smooth) || face !== s.face) s.smooth = s.angle;
        s.face = face;
        s.visible =
          s.kind === "lead" ? s.p < 0.999 : s.kind === "tip" ? s.p > 0.001 : s.p > 0.001 && s.p < 0.999;
        if (!s.visible) gsap.set(s.fish, { opacity: 0 });

        // Dots light up behind the fish and settle to a faint trail.
        s.dots.forEach(({ el: dot, t }) => {
          const behind = s.p - t;
          const glow = behind < 0 ? 0 : Math.max(0, 1 - behind * 5);
          dot.setAttribute("r", String(2.2 + glow * 2.4));
          dot.setAttribute("fill", glow > 0.02 ? "var(--color-flame)" : "var(--color-ink-900)");
          dot.setAttribute("fill-opacity", String(behind < 0 ? 0.2 : 0.3 + glow * 0.7));
        });
      };

      const build = () => {
        svg.setAttribute("viewBox", `0 0 ${el.offsetWidth} ${el.offsetHeight}`);
        const start = at("start", "bottom");
        const gptTop = at("gpt", "top");
        const gptBottom = at("gpt", "bottom");
        const split = at("split", "top");
        const merge = at("merge", "top");

        // Drop down the right-hand margin, clear of the copy, and only turn in
        // towards the card in the gap just above it. Then run behind the card to its base.
        const turn = gptTop.y - 70;
        pick<SVGPathElement>('[data-path="main"]')?.setAttribute(
          "d",
          `M ${start.x} ${start.y} L ${start.x} ${turn} C ${start.x} ${gptTop.y - 30}, ${gptTop.x} ${gptTop.y - 40}, ${gptTop.x} ${gptTop.y} L ${gptBottom.x} ${gptBottom.y} ${curve(gptBottom, split)}`,
        );
        FOUR.forEach((i) => {
          // Stop just clear of the cards so each tip fish stays visible above its card.
          const top = at(`src-${i}`, "top");
          top.y -= 12;
          const bottom = at(`src-${i}`, "bottom");
          bottom.y += 12;
          pick<SVGPathElement>(`[data-path="branch-${i}"]`)?.setAttribute("d", `M ${split.x} ${split.y} ${curve(split, top)}`);
          pick<SVGPathElement>(`[data-path="merge-${i}"]`)?.setAttribute("d", `M ${bottom.x} ${bottom.y} ${curve(bottom, merge)}`);
        });

        while (dotLayer.firstChild) dotLayer.removeChild(dotLayer.firstChild);
        segs.forEach((s) => {
          s.len = s.path.getTotalLength();
          s.path.style.strokeDasharray = `${s.len}`;

          s.dots = [];
          const count = Math.max(2, Math.floor(s.len / DOT_SPACING));
          for (let k = 0; k < count; k += 1) {
            const t = (k + 0.5) / count;
            const pt = s.path.getPointAtLength(s.len * t);
            const dot = document.createElementNS(SVG_NS, "circle");
            dot.setAttribute("cx", String(pt.x));
            dot.setAttribute("cy", String(pt.y));
            dotLayer.appendChild(dot);
            s.dots.push({ el: dot, t });
          }

          if (s.kind !== "lead") {
            const g = document.createElementNS(SVG_NS, "g");
            g.setAttribute("visibility", "hidden");
            const halo = document.createElementNS(SVG_NS, "circle");
            halo.setAttribute("r", "10");
            halo.setAttribute("fill", "var(--color-flame)");
            halo.setAttribute("fill-opacity", "0.28");
            const core = document.createElementNS(SVG_NS, "circle");
            core.setAttribute("r", "3.4");
            core.setAttribute("fill", "#ffd9c4");
            g.append(halo, core);
            dotLayer.appendChild(g);
            s.pulse = g;
          }
          apply(s);
        });
      };

      build();
      ScrollTrigger.addEventListener("refreshInit", build);

      const trigger = (s: Seg, self: ScrollTrigger) => {
        s.p = self.progress;
        apply(s);
        if (s.kind === "tip") {
          if (s.p >= 0.98 && !s.reached) {
            s.reached = true;
            reveal(s.index);
          } else if (s.p < 0.9 && s.reached) {
            s.reached = false;
            hide(s.index);
          }
        }
      };

      const gpt = section("gpt");
      const sources = section("sources");
      const answer = section("answer");

      const lead = segs.find((x) => x.kind === "lead");
      if (lead && gpt && sources)
        ScrollTrigger.create({
          trigger: gpt,
          start: "top 85%",
          endTrigger: sources,
          end: "top 45%",
          scrub: true,
          onUpdate: (self) => trigger(lead, self),
        });

      if (sources)
        segs
          .filter((x) => x.kind === "tip")
          .forEach((s, i) => {
            ScrollTrigger.create({
              trigger: sources,
              start: `top ${58 - i * 2}%`,
              end: `top ${12 - i * 2}%`,
              scrub: true,
              onUpdate: (self) => trigger(s, self),
            });
          });

      if (answer)
        segs
          .filter((x) => x.kind === "merge")
          .forEach((s) => {
            ScrollTrigger.create({
              trigger: answer,
              start: "top 92%",
              end: "top 42%",
              scrub: true,
              onUpdate: (self) => trigger(s, self),
            });
          });

      // ---- the living part: drift, turning, tail beat and light pulses ----
      let velocity = 0;
      const watchScroll = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          velocity = Math.abs(self.getVelocity());
        },
      });

      let active = false;
      const inView = ScrollTrigger.create({
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          active = self.isActive;
        },
      });

      const shortest = (from: number, to: number) => ((((to - from) % 360) + 540) % 360) - 180;

      const tick = (time: number, deltaMs: number) => {
        if (!active) return;
        const dt = Math.min(0.05, deltaMs / 1000);
        velocity *= 0.92;
        const speed = Math.min(2.4, velocity / 700);

        segs.forEach((s) => {
          if (s.visible) {
            s.smooth += shortest(s.smooth, s.angle) * 0.16;
            const swim = s.kind === "lead" ? 4.5 : 2.2;
            const off = Math.sin(time * 1.9 + s.phase) * swim;
            const roll = Math.sin(time * 1.9 + s.phase + 0.9) * (s.kind === "lead" ? 5 : 3);
            s.tailPhase += dt * (7 + speed * 7);
            gsap.set(s.fish, {
              x: s.x - s.ty * off,
              y: s.y + s.tx * off,
              rotation: s.smooth + roll * s.face * -1,
              scaleX: s.face,
              xPercent: -50,
              yPercent: -50,
              opacity: 1,
            });
            if (s.tail)
              gsap.set(s.tail, { rotation: Math.sin(s.tailPhase) * (9 + speed * 5), svgOrigin: "68 30" });
          }

          if (s.pulse) {
            const arrived = s.p >= 0.985;
            s.pulse.setAttribute("visibility", arrived ? "visible" : "hidden");
            if (arrived) {
              const f = (time * 0.32 + s.index * 0.23 + (s.kind === "merge" ? 0.5 : 0)) % 1;
              const pt = s.path.getPointAtLength(s.len * f);
              s.pulse.setAttribute("transform", `translate(${pt.x} ${pt.y})`);
            }
          }
        });
      };
      gsap.ticker.add(tick);

      return () => {
        gsap.ticker.remove(tick);
        ScrollTrigger.removeEventListener("refreshInit", build);
        watchScroll.kill();
        inView.kill();
        hoverHandlers.forEach(({ card, handler }) => card?.removeEventListener("pointerenter", handler));
        while (dotLayer.firstChild) dotLayer.removeChild(dotLayer.firstChild);
        dotLayer.remove();
      };
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden lg:block">
        <svg
          data-thread
          className="absolute inset-0 h-full w-full"
          fill="none"
          preserveAspectRatio="none"
          focusable="false"
        >
          {["main", ...FOUR.map((i) => `branch-${i}`), ...FOUR.map((i) => `merge-${i}`)].map((id) => (
            <path
              key={id}
              data-path={id}
              stroke="var(--color-ink-900)"
              strokeOpacity="0.6"
              strokeWidth={id === "main" ? 3 : 2.5}
              strokeLinecap="round"
              fill="none"
            />
          ))}
        </svg>
        <div data-fish="lead" className="will-move absolute left-0 top-0 opacity-0">
          <MedakaMark className="h-7 w-12" />
        </div>
        {FOUR.map((i) => (
          <div key={`b${i}`} data-fish={`branch-${i}`} className="will-move absolute left-0 top-0 opacity-0">
            <MedakaMark className="h-3.5 w-6" />
          </div>
        ))}
        {FOUR.map((i) => (
          <div key={`m${i}`} data-fish={`merge-${i}`} className="will-move absolute left-0 top-0 opacity-0">
            <MedakaMark className="h-3.5 w-6" />
          </div>
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
