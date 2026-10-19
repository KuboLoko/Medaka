"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnswerCard } from "./AnswerCard";
import { MockFrame, StatTile } from "./MockFrame";
import { PageOpportunityCard } from "./PageOpportunityCard";
import { SourceChip } from "./SourceChip";
import { TrendChart } from "./TrendChart";
import {
  changes,
  engines,
  facts,
  monthly,
  pages,
  sampleAnswer,
  sampleQuestion,
} from "./data";
import { cn } from "@/lib/cn";

const tabs = [
  "Overview",
  "Engine responses",
  "Sources",
  "Pages",
  "Facts base",
  "Monthly changes",
] as const;

type Tab = (typeof tabs)[number];

/** Illustrative members area. Tabs are keyboard operable (arrow keys, Home, End). */
export function PlatformDashboard() {
  const [active, setActive] = useState<Tab>("Overview");
  const base = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function onKeyDown(e: KeyboardEvent, i: number) {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(tabs[next]);
    refs.current[next]?.focus();
  }

  return (
    <MockFrame title="Medaka · Members area" bodyClassName="p-0 sm:p-0">
      <div className="grid md:grid-cols-[13rem_1fr]">
        <div
          role="tablist"
          aria-label="Members area sections"
          aria-orientation="vertical"
          className="flex gap-1 overflow-x-auto border-b border-line bg-sand/40 p-2 md:flex-col md:border-r md:border-b-0"
        >
          {tabs.map((t, i) => (
            <button
              key={t}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`${base}-tab-${i}`}
              aria-selected={active === t}
              aria-controls={`${base}-panel`}
              tabIndex={active === t ? 0 : -1}
              onClick={() => setActive(t)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={cn(
                "shrink-0 rounded-md px-3 py-2 text-left text-sm transition-colors",
                active === t
                  ? "bg-ink-900 text-paper"
                  : "text-ink-700 hover:bg-ink-900/5",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`${base}-panel`}
          aria-labelledby={`${base}-tab-${tabs.indexOf(active)}`}
          tabIndex={0}
          className="min-h-[26rem] p-4 sm:p-5"
        >
          {active === "Overview" && <Overview />}
          {active === "Engine responses" && (
            <AnswerCard
              question={sampleQuestion}
              intro={sampleAnswer.intro}
              shortlist={sampleAnswer.shortlist}
              sources={sampleAnswer.sources}
            />
          )}
          {active === "Sources" && <Sources />}
          {active === "Pages" && (
            <div className="grid gap-3 lg:grid-cols-2">
              {pages.slice(0, 2).map((p) => (
                <PageOpportunityCard key={p.path} {...p} />
              ))}
            </div>
          )}
          {active === "Facts base" && <Facts />}
          {active === "Monthly changes" && (
            <ul className="space-y-2 text-sm text-ink-800">
              {changes.map((c) => (
                <li
                  key={c.text}
                  className="rounded-lg border border-line bg-white px-3.5 py-3"
                >
                  {c.text}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </MockFrame>
  );
}

function Overview() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatTile label="Visibility status" value="3 of 5" note="engines" />
        <StatTile label="Questions tracked" value="24" />
        <StatTile label="Change this month" value="+1" tone="good" note="engine" />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-4">
          <h4 className="text-sm font-medium text-ink-950">Trend</h4>
          <TrendChart
            values={monthly.values}
            labels={monthly.labels}
            ariaLabel="Illustrative line chart: answers mentioning the firm rise over six months."
            className="mt-3"
          />
        </div>
        <ul className="space-y-1.5 text-sm" aria-label="Visibility by engine">
          {engines.map((e) => (
            <li
              key={e.name}
              className="flex items-center justify-between rounded-lg border border-line bg-white px-3.5 py-2.5"
            >
              <span>{e.name}</span>
              <span className={e.level ? "font-medium text-water-700" : "text-ink-500"}>
                {e.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Sources() {
  const rows = [
    { s: "Your site, about page", kind: "site" as const, n: 6, you: true },
    { s: "Industry comparison article", kind: "article" as const, n: 9 },
    { s: "Sector directory listing", kind: "directory" as const, n: 4 },
    { s: "Firm A, services page", kind: "page" as const, n: 7 },
  ];
  return (
    <div className="overflow-hidden rounded-lg border border-line bg-white">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">Illustrative sources cited in answers</caption>
        <thead className="bg-sand/50 text-xs text-ink-600">
          <tr>
            <th scope="col" className="px-3.5 py-2 font-medium">Source</th>
            <th scope="col" className="px-3.5 py-2 text-right font-medium">Answers citing it</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((r) => (
            <tr key={r.s}>
              <td className="px-3.5 py-2.5">
                <SourceChip kind={r.kind} label={r.s} highlight={r.you} />
              </td>
              <td className="px-3.5 py-2.5 text-right font-mono text-xs">{r.n}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Facts() {
  return (
    <div>
      <p className="mb-3 text-sm text-ink-700">
        Approved facts used to ground writing. Each item has a status.
      </p>
      <ul className="space-y-2">
        {facts.map((f) => (
          <li
            key={f.fact}
            className="flex items-center justify-between gap-3 rounded-lg border border-line bg-white px-3.5 py-2.5 text-sm"
          >
            <span>{f.fact}</span>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
                f.state === "Confirmed"
                  ? "bg-water-100 text-water-700"
                  : "bg-copper-100 text-copper-700",
              )}
            >
              {f.state}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
