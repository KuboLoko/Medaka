import { ArrowDown } from "lucide-react";
import type { ReactNode } from "react";
import { Section, SectionHeader } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { SourceChip } from "@/components/mock/SourceChip";
import { River } from "@/components/brand/River";
import { ILLUSTRATIVE } from "@/lib/site";

const questions = [
  "Which firms specialise in X?",
  "Who should we speak to about Y?",
  "What are the strongest options for Z?",
];

type Step = { title: string; text: string; visual: ReactNode };

const sourceStates = [
  { kind: "site" as const, label: "Your website", state: "Named", highlight: true },
  { kind: "article" as const, label: "Industry article", state: "Cited" },
  { kind: "directory" as const, label: "Directory listing", state: "Not chosen" },
  { kind: "page" as const, label: "Competitor page", state: "Not chosen" },
];

const steps: Step[] = [
  {
    title: "Buyer question",
    text: "A prospective client has a need and puts it into words.",
    visual: (
      <ul className="space-y-1.5">
        {questions.map((q) => (
          <li
            key={q}
            className="rounded-lg rounded-bl-sm border border-line bg-white px-3 py-2 text-xs text-ink-800"
          >
            “{q}”
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "AI engine",
    text: "They ask an AI engine, such as ChatGPT, about firms, products or options.",
    visual: (
      <div className="space-y-2">
        <div className="rounded-lg border border-ink-900/25 bg-white px-3 py-2.5 text-xs text-ink-800">
          Which firms specialise in X?
          <span aria-hidden className="ml-0.5 inline-block h-3 w-px translate-y-0.5 bg-ink-900" />
        </div>
        <p className="flex items-center gap-2 text-xs text-ink-600">
          Reviewing sources
          <span aria-hidden className="flex gap-1">
            <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-copper-600" />
            <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-copper-600" />
            <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-copper-600" />
          </span>
        </p>
      </div>
    ),
  },
  {
    title: "Sources",
    text: "The engine reviews web sources, including your website and others.",
    visual: (
      <ul className="space-y-1.5">
        {sourceStates.map((s) => (
          <li key={s.label} className="flex items-center justify-between gap-2">
            <SourceChip kind={s.kind} label={s.label} highlight={s.highlight} />
            <span className="shrink-0 font-mono text-[10px] uppercase text-ink-600">
              {s.state}
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "AI answer",
    text: "It returns an answer, a recommendation or a shortlist.",
    visual: (
      <ul className="space-y-1.5 text-xs text-ink-800">
        {["Firm A [1]", "Your firm [2]", "Firm C [3]"].map((f) => (
          <li key={f} className="rounded-md border border-line bg-white px-3 py-2">
            {f}
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: "Medaka",
    text: "Medaka records how your firm appears, what was cited and what to do next.",
    visual: (
      <div className="space-y-2">
        <p className="font-display text-3xl leading-none text-ink-950">2 of 12</p>
        <p className="text-xs text-ink-600">answers name the firm</p>
        <dl className="space-y-1.5 text-xs">
          {[
            ["Gaps found", "2"],
            ["Actions suggested", "3"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="flex justify-between rounded-md border border-line bg-white px-3 py-1.5"
            >
              <dt className="text-ink-600">{k}</dt>
              <dd className="font-medium text-ink-950">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works" labelledBy="how-title">
      <Reveal>
        <SectionHeader
          id="how-title"
          eyebrow="How Medaka works"
          title="From a buyer’s question to a clear picture of your firm."
          intro="Five steps. The first four describe what happens when a buyer asks. The fifth is what Medaka adds."
        />
      </Reveal>

      <div className="relative mt-14">
        <River className="absolute inset-x-0 top-12 z-0 hidden lg:block" />
        <ol className="relative z-10 grid gap-y-12 lg:grid-cols-5 lg:gap-x-8">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.12} className="relative">
              <div
                className={
                  i === steps.length - 1
                    ? "light h-full rounded-[var(--radius-card)] border-2 border-flame bg-paper-soft p-4"
                    : "light h-full rounded-[var(--radius-card)] border border-line bg-paper-soft p-4"
                }
              >
                <p className="font-mono text-xs text-copper-600">Step {i + 1}</p>
                <h3 className="font-display mt-1 text-2xl font-normal">{s.title}</h3>
                <p className="mt-2 text-sm lg:min-h-[4.5rem] leading-relaxed text-ink-600">
                  {s.text}
                </p>
                <div className="mt-4">{s.visual}</div>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-500">
                  {ILLUSTRATIVE}
                </p>
              </div>
              {i < steps.length - 1 && (
                <ArrowDown
                  aria-hidden
                  className="absolute -bottom-9 left-1/2 h-5 w-5 -translate-x-1/2 text-ink-500 lg:hidden"
                />
              )}
            </Reveal>
          ))}
        </ol>
      </div>
    </Section>
  );
}
