"use client";

import { useState } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { cn } from "@/lib/cn";

/*
  EXAMPLE PRICING. Taken from the medaka-v3 reference. Not an offer.
  Every figure here must be confirmed by the client before launch.
*/
const plans = [
  {
    id: "firm",
    segment: "Small or mid-size firm",
    name: "Firm",
    prefix: "",
    price: "£149",
    features: [
      "One domain",
      "The full buyer question set for your services",
      "Five engines, named and cited per answer",
      "What to fix first, each month",
      "The monthly re-ask",
    ],
    cta: "Start monitoring",
    href: "/free-audit",
  },
  {
    id: "agency",
    segment: "Agency or consultancy",
    name: "Agency",
    prefix: "",
    price: "£399",
    features: [
      "Up to ten client domains",
      "The same report per client",
      "The check on your own website",
      "A monthly summary across clients",
      "Your name on the report",
    ],
    cta: "Start monitoring",
    href: "/free-audit",
  },
  {
    id: "enterprise",
    segment: "Several brands or markets",
    name: "Enterprise",
    prefix: "from ",
    price: "£1,200",
    features: [
      "Several brands and markets",
      "More questions per market",
      "A named person",
      "Reports on your schedule",
      "Data export",
    ],
    cta: "Talk to us",
    href: "/contact",
  },
] as const;

type PlanId = (typeof plans)[number]["id"];

export function PricingSection() {
  const [selected, setSelected] = useState<PlanId>("firm");

  return (
    <section id="monitoring" aria-labelledby="keep-title" className="py-20 sm:py-28">
      <Container>
        <div data-reveal className="max-w-2xl">
          <h2
            id="keep-title"
            className="font-display text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]"
          >
            Keep watching, every month
          </h2>
          <p className="text-pretty mt-5 text-lg text-ink-600">
            The free check answers one question once. Monitoring asks the full
            set of buyer questions every month, shows who was named instead of
            you, and tells you which page to fix next.
          </p>
        </div>

        <div data-reveal className="mt-10">
          <p id="company-type" className="text-sm font-medium text-ink-800">
            What type of company are you?
          </p>
          <div
            role="group"
            aria-labelledby="company-type"
            className="mt-3 flex flex-wrap gap-2"
          >
            {plans.map((p) => (
              <button
                key={p.id}
                type="button"
                aria-pressed={selected === p.id}
                onClick={() => setSelected(p.id)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  selected === p.id
                    ? "border-cream bg-cream text-[#0e2918]"
                    : "border-ink-900/30 text-ink-900 hover:border-ink-900",
                )}
              >
                {p.segment}
              </button>
            ))}
          </div>
        </div>

        <ul data-reveal className="mt-8 grid gap-5 lg:grid-cols-3">
          {plans.map((p) => (
            <li
              key={p.id}
              className={cn(
                "light flex flex-col rounded-[var(--radius-card)] border bg-paper-soft p-6 shadow-[var(--shadow-card)] transition-shadow",
                selected === p.id ? "border-flame ring-2 ring-flame" : "border-line",
              )}
            >
              <p className="text-xs text-ink-600">{p.segment}</p>
              <h3 className="font-display mt-3 text-2xl font-normal">{p.name}</h3>
              <p className="font-display mt-2 text-5xl leading-none text-ink-950">
                <span className="text-2xl">{p.prefix}</span>
                {p.price}
              </p>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-500">
                a month, example
              </p>
              <ul className="mt-6 flex-1 space-y-2 text-sm text-ink-800">
                {p.features.map((f) => (
                  <li key={f} className="border-t border-line pt-2">
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <ButtonLink href={p.href}>{p.cta}</ButtonLink>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs text-ink-500">
          All three show a price so you can choose by what you need, not by what
          we guess about you. Prices are examples until set.
        </p>

        <ul data-reveal className="mt-14 grid gap-5 lg:grid-cols-3">
          <li className="light rounded-[var(--radius-card)] border border-line bg-paper-soft p-5">
            <p className="inline-block rounded bg-[#0e2918] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-[#f4f2eb]">
              With Medaka
            </p>
            <h3 className="font-display mt-3 text-2xl font-normal">The full question set</h3>
            <ul className="mt-4 space-y-1.5 text-xs text-ink-800">
              {[
                "Which UK firms would you recommend for [your service]?",
                "Who are the best firms for [your service] for a growing business?",
                "Which firm should a family office hire for [your service]?",
                "What should I look for in a [your service] provider?",
                "Is it worth paying for [your service] at our size?",
              ].map((q) => (
                <li key={q} className="rounded bg-sand px-2.5 py-1.5">
                  {q}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-500">
              Example. Illustrative data.
            </p>
          </li>

          <li className="light rounded-[var(--radius-card)] border border-line bg-paper-soft p-5">
            <p className="inline-block rounded bg-[#0e2918] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-[#f4f2eb]">
              With Medaka
            </p>
            <h3 className="font-display mt-3 text-2xl font-normal">Who wins, and why</h3>
            <table className="mt-4 w-full text-left text-xs">
              <caption className="sr-only">Example: firms named and the sources the engines read</caption>
              <tbody className="divide-y divide-line">
                {[
                  ["Rivalfirm", "9 of 48", "Reddit, own site"],
                  ["Another firm", "6 of 48", "LinkedIn, directory"],
                  ["yourfirm.co.uk", "2 of 48", "Own site"],
                ].map(([firm, count, sources]) => (
                  <tr key={firm}>
                    <th scope="row" className="py-2 pr-2 font-medium text-ink-950">{firm}</th>
                    <td className="py-2 pr-2 text-ink-800">{count}</td>
                    <td className="py-2 text-ink-600">{sources}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-500">
              Example. Named count and the sources the engines read.
            </p>
          </li>

          <li className="light rounded-[var(--radius-card)] border border-line bg-paper-soft p-5">
            <p className="inline-block rounded bg-[#0e2918] px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-[#f4f2eb]">
              With Medaka
            </p>
            <h3 className="font-display mt-3 text-2xl font-normal">What to fix first</h3>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-xs text-ink-800 marker:text-ink-500">
              <li>Services page: answer the buyer question in the first paragraph.</li>
              <li>About page: name the sectors you serve.</li>
              <li>Reply in the Reddit thread the engines keep citing.</li>
            </ol>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-500">
              Example. Illustrative data.
            </p>
          </li>
        </ul>
      </Container>
    </section>
  );
}
