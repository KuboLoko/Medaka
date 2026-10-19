"use client";

import { useLayoutEffect, useRef } from "react";
import { Container } from "@/components/ui/Layout";
import { MedakaMark } from "@/components/brand/MedakaMark";
import { MockFrame } from "@/components/mock/MockFrame";
import { Status } from "./Status";
import { gsap, ScrollTrigger, MOTION_DESKTOP } from "@/lib/gsap";

const stages = [
  {
    key: "Find",
    title: "First we find the questions.",
    text: "Medaka reads your public pages, works out what you sell and who you compete with, and lists the questions your buyers ask.",
    card: (
      <MockFrame title="Questions to ask">
        <ul className="space-y-1.5 text-sm text-ink-800">
          {[
            "Which UK firms would you recommend for [your service]?",
            "Who are the best firms for [your service] for a growing business?",
            "Which firm should a family office hire for [your service]?",
            "What should I look for in a [your service] provider?",
          ].map((q, i) => (
            <li key={q} className={i === 3 ? "rounded bg-[#0e2918] px-3 py-2 text-[#f4f2eb]" : "rounded bg-sand px-3 py-2"}>
              {q}
            </li>
          ))}
        </ul>
      </MockFrame>
    ),
  },
  {
    key: "Measure",
    title: "Then we measure the answers.",
    text: "Each question goes to ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews, live. We record who was named and which websites were cited.",
    card: (
      <MockFrame title="Answers, this month">
        <ul className="space-y-1.5 text-sm">
          {[
            ["ChatGPT", "Named"],
            ["Claude", "Not named"],
            ["Gemini", "Not named"],
            ["Perplexity", "Cited"],
            ["Google AI Overviews", "Not named"],
          ].map(([engine, state]) => (
            <li key={engine} className="flex items-center justify-between rounded bg-sand px-3 py-2">
              <span className="text-ink-800">{engine}</span>
              <Status state={state as "Named" | "Cited" | "Not named"} />
            </li>
          ))}
        </ul>
      </MockFrame>
    ),
  },
  {
    key: "Fix",
    title: "Then we show what to fix first.",
    text: "Where your firm is missing, the report points to the pages and questions to work on first.",
    card: (
      <MockFrame title="What to fix first">
        <ol className="list-decimal space-y-2 pl-5 text-sm text-ink-800 marker:text-ink-500">
          <li>Services page: answer the buyer question in the first paragraph.</li>
          <li>About page: name the sectors you serve.</li>
          <li>Reply in the Reddit thread the engines keep citing.</li>
        </ol>
      </MockFrame>
    ),
  },
  {
    key: "Prove",
    title: "Then we ask again.",
    text: "Each month the same questions go back to the same engines, so you can see what changed.",
    card: (
      <MockFrame title="Month on month">
        <div className="grid grid-cols-2 gap-3 text-center">
          {[
            ["Month 1", "1 of 6"],
            ["Month 2", "2 of 6"],
          ].map(([m, v]) => (
            <div key={m} className="rounded-lg border border-line bg-white p-4">
              <p className="text-xs text-ink-600">{m}</p>
              <p className="font-display mt-1 text-3xl text-ink-950">{v}</p>
              <p className="text-xs text-ink-600">answers name the firm</p>
            </div>
          ))}
        </div>
      </MockFrame>
    ),
  },
];

/**
 * The monthly loop. On large screens the section is pinned and four stages play in turn
 * as the page scrolls, with a progress bar. Otherwise the four stages are a plain list.
 */
export function LoopSection() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add(MOTION_DESKTOP, () => {
      const stage = el.querySelector<HTMLElement>(".loop-stage");
      const items = Array.from(el.querySelectorAll<HTMLElement>(".loop-item"));
      const labels = Array.from(el.querySelectorAll<HTMLElement>("[data-loop-label]"));
      const fill = el.querySelector<HTMLElement>("[data-loop-fill]");
      const marker = el.querySelector<HTMLElement>("[data-loop-marker]");
      if (!stage || !fill || !marker) return;

      el.setAttribute("data-loop", "pinned");
      let active = -1;
      const setActive = (i: number) => {
        if (i === active) return;
        active = i;
        items.forEach((n, idx) => n.classList.toggle("is-active", idx === i));
        labels.forEach((n, idx) => {
          n.toggleAttribute("data-active", idx <= i);
          if (idx === i) n.setAttribute("aria-current", "step");
          else n.removeAttribute("aria-current");
        });
      };
      setActive(0);

      ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "+=320%",
        pin: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          setActive(Math.min(stages.length - 1, Math.floor(self.progress * stages.length)));
          gsap.set(fill, { scaleX: self.progress });
          gsap.set(marker, { left: `${self.progress * 100}%` });
        },
      });

      return () => {
        el.setAttribute("data-loop", "static");
        items.forEach((n) => n.classList.remove("is-active"));
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="loop"
      ref={root}
      data-loop="static"
      aria-labelledby="loop-title"
      className="tone-deep"
    >
      <div className="loop-stage py-20 sm:py-28">
        <Container>
          <h2 id="loop-title" className="sr-only">
            The monthly loop: find, measure, fix, prove
          </h2>
          <ol className="loop-list space-y-16 lg:space-y-0">
            {stages.map((s, i) => (
              <li key={s.key} className="loop-item grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div>
                  <p className="no-halo inline-block rounded bg-cream px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#0e2918]">
                    {s.key}
                  </p>
                  <h3 className="font-display text-balance mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]">
                    {s.title}
                  </h3>
                  <p className="text-pretty mt-5 max-w-lg text-lg text-ink-600">{s.text}</p>
                  <span className="sr-only">Step {i + 1} of {stages.length}</span>
                </div>
                <div className="relative max-w-xl">
                  <div aria-hidden className="glow -inset-x-16 -inset-y-14 opacity-60" />
                  <div className="relative">{s.card}</div>
                </div>
              </li>
            ))}
          </ol>

          <div className="loop-bar mt-14" aria-label="Loop progress">
            <div className="relative h-px bg-line">
              <div
                data-loop-fill
                className="absolute inset-y-0 left-0 w-full origin-left bg-flame"
                style={{ transform: "scaleX(0)" }}
              />
              <div
                data-loop-marker
                className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{ left: "0%" }}
              >
                {/* The fish is drawn facing left. The bar runs left to right, so mirror it. */}
                <MedakaMark animated className="h-4 w-7 -scale-x-100" />
              </div>
            </div>
            <ol className="mt-4 flex justify-between text-sm text-ink-500">
              {stages.map((s) => (
                <li
                  key={s.key}
                  data-loop-label
                  className="[&[data-active]]:font-medium [&[data-active]]:text-ink-900"
                >
                  {s.key}
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </div>
    </section>
  );
}
