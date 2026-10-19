"use client";

import { useLayoutEffect, useRef } from "react";
import { DomainCheck } from "@/components/forms/DomainCheck";
import { MockFrame } from "@/components/mock/MockFrame";
import { gsap, MOTION_ANY } from "@/lib/gsap";

const PROMPT = "Which UK firms would you recommend for [your service]?";

const searches = [
  "best UK firms for [your service]",
  "[your service] firm reviews",
  "recommended [your service] UK reddit",
];

const answer = [
  { name: "Rivalfirm", ref: 1 },
  { name: "Another firm", ref: 2 },
  { name: "yourfirm.co.uk", ref: 3 },
];

/**
 * The ChatGPT module. As the card scrolls into view the prompt types itself, the search
 * chips appear, and the answer streams in word by word. The motion is scrubbed by scroll,
 * and every state is plain text, so with reduced motion the finished card is simply shown.
 * Always illustrative: the frame carries "Example. Illustrative data."
 */
export function ChatStream() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(MOTION_ANY, () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top 88%", end: "top 28%", scrub: true },
      });
      tl.from(".pchar", { opacity: 0, duration: 0.05, stagger: 0.05 })
        .from("[data-searching]", { opacity: 0, y: 6, duration: 0.4 })
        .from(".chip", { opacity: 0, y: 6, duration: 0.3, stagger: 0.15 })
        .from("[data-resp]", { opacity: 0, y: 10, duration: 0.4 })
        .from(".tok", { opacity: 0, y: 4, filter: "blur(3px)", duration: 0.2, stagger: 0.08 });
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root}>
      <MockFrame title="ChatGPT · Web search on" label="Example. Illustrative data.">
        <div className="space-y-4">
          <p className="ml-auto w-fit max-w-[88%] rounded-2xl rounded-br-sm bg-sand px-3.5 py-2 text-sm text-ink-800">
            {Array.from(PROMPT).map((ch, i) => (
              <span key={i} className="pchar">
                {ch}
              </span>
            ))}
          </p>

          <div>
            <p data-searching className="flex items-center gap-2 text-sm text-ink-600">
              <span aria-hidden className="flex gap-1">
                <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-copper-600" />
                <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-copper-600" />
                <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-copper-600" />
              </span>
              Searching the web
            </p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {searches.map((s) => (
                <li
                  key={s}
                  className="chip rounded-full border border-line bg-paper px-2.5 py-1 text-xs text-ink-700"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          <div data-resp className="rounded-lg border border-line bg-white px-3.5 py-3 text-sm text-ink-800">
            <p>
              {"Firms that come up for this question:".split(" ").map((w, i) => (
                <span key={i} className="tok inline-block pr-1">
                  {w}
                </span>
              ))}
            </p>
            <ol className="mt-2 space-y-1">
              {answer.map((a, i) => (
                <li key={a.name}>
                  <span className="tok inline-block pr-1">{i + 1}.</span>
                  <span className="tok inline-block pr-1 font-medium text-ink-950">{a.name}</span>
                  <sup className="tok inline-block font-mono text-[10px] text-ink-600">{a.ref}</sup>
                </li>
              ))}
            </ol>
          </div>

          <div className="border-t border-line pt-4">
            <p aria-hidden className="mb-2 text-xs text-ink-600">
              Enter your domain name
            </p>
            <DomainCheck buttonLabel="Ask" tone="light" />
          </div>
        </div>
      </MockFrame>
    </div>
  );
}
