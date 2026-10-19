"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import { MedakaMark } from "@/components/brand/MedakaMark";
import { gsap, ScrollTrigger, MOTION_ANY, MOTION_DESKTOP } from "@/lib/gsap";

type Seg = {
  path: SVGPathElement;
  fish: HTMLElement;
  kind: "lead" | "tip" | "merge";
  len: number;
  p: number;
};

const FOUR = [1, 2, 3, 4] as const;

/**
 * Wraps the first part of the homepage story.
 *
 * - Fades blocks in as they arrive (any screen, motion allowed).
 * - On large screens, draws one cream thread from the hero to the ChatGPT card,
 *   splits it into four branches, one per source, then merges them into the answer.
 *   A small medaka leads the thread. Everything is scrubbed by scroll.
 * - With reduced motion, or on small screens, nothing is hidden or pinned and the
 *   overlay stays empty: the sections read as a plain stacked page.
 */
export function ThreadStory({ children }: { children: ReactNode }) {
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
      const section = (name: string) =>
        el.querySelector<HTMLElement>(`[data-section="${name}"]`);
      const pick = <T extends Element>(sel: string) => el.querySelector<T>(sel);
      if (!svg) return;

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
      const lead = pick<HTMLElement>('[data-fish="lead"]');
      const mainPath = pick<SVGPathElement>('[data-path="main"]');
      if (lead && mainPath) segs.push({ path: mainPath, fish: lead, kind: "lead", len: 0, p: 0 });
      FOUR.forEach((i) => {
        const bp = pick<SVGPathElement>(`[data-path="branch-${i}"]`);
        const bf = pick<HTMLElement>(`[data-fish="branch-${i}"]`);
        const mp = pick<SVGPathElement>(`[data-path="merge-${i}"]`);
        const mf = pick<HTMLElement>(`[data-fish="merge-${i}"]`);
        if (bp && bf) segs.push({ path: bp, fish: bf, kind: "tip", len: 0, p: 0 });
        if (mp && mf) segs.push({ path: mp, fish: mf, kind: "merge", len: 0, p: 0 });
      });

      const apply = (s: Seg) => {
        s.path.style.strokeDashoffset = `${s.len * (1 - s.p)}`;
        const d = s.len * s.p;
        const a = s.path.getPointAtLength(d);
        const b = s.path.getPointAtLength(Math.min(s.len, d + 2));
        const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI + 180;
        const visible =
          s.kind === "lead" ? s.p < 0.999 : s.kind === "tip" ? s.p > 0.001 : s.p > 0.001 && s.p < 0.999;
        gsap.set(s.fish, { x: a.x, y: a.y, rotation: angle, xPercent: -50, yPercent: -50, opacity: visible ? 1 : 0 });
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
        mainPath?.setAttribute(
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
        segs.forEach((s) => {
          s.len = s.path.getTotalLength();
          s.path.style.strokeDasharray = `${s.len}`;
          apply(s);
        });
      };

      build();
      ScrollTrigger.addEventListener("refreshInit", build);

      const gpt = section("gpt");
      const sources = section("sources");
      const answer = section("answer");

      if (gpt && sources) {
        const s = segs.find((x) => x.kind === "lead");
        if (s)
          ScrollTrigger.create({
            trigger: gpt,
            start: "top 85%",
            endTrigger: sources,
            end: "top 45%",
            scrub: true,
            onUpdate: (self) => {
              s.p = self.progress;
              apply(s);
            },
          });
      }

      if (sources) {
        segs
          .filter((x) => x.kind === "tip")
          .forEach((s, i) => {
            ScrollTrigger.create({
              trigger: sources,
              start: `top ${58 - i * 2}%`,
              end: `top ${12 - i * 2}%`,
              scrub: true,
              onUpdate: (self) => {
                s.p = self.progress;
                apply(s);
              },
            });
          });
      }

      if (answer) {
        segs
          .filter((x) => x.kind === "merge")
          .forEach((s) => {
            ScrollTrigger.create({
              trigger: answer,
              start: "top 92%",
              end: "top 42%",
              scrub: true,
              onUpdate: (self) => {
                s.p = self.progress;
                apply(s);
              },
            });
          });
      }

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", build);
      };
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);

    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
      >
        <svg
          data-thread
          className="absolute inset-0 h-full w-full"
          fill="none"
          preserveAspectRatio="none"
          focusable="false"
        >
          {["main", ...FOUR.map((i) => `branch-${i}`), ...FOUR.map((i) => `merge-${i}`)].map(
            (id) => (
              <path
                key={id}
                data-path={id}
                stroke="var(--color-ink-900)"
                strokeOpacity="0.9"
                strokeWidth={id === "main" ? 3 : 2.5}
                strokeLinecap="round"
                fill="none"
              />
            ),
          )}
        </svg>
        <div data-fish="lead" className="absolute left-0 top-0 opacity-0">
          <MedakaMark animated className="h-7 w-12" />
        </div>
        {FOUR.map((i) => (
          <div key={`b${i}`} data-fish={`branch-${i}`} className="absolute left-0 top-0 opacity-0">
            <MedakaMark animated className="h-3.5 w-6" />
          </div>
        ))}
        {FOUR.map((i) => (
          <div key={`m${i}`} data-fish={`merge-${i}`} className="absolute left-0 top-0 opacity-0">
            <MedakaMark animated className="h-3.5 w-6" />
          </div>
        ))}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
