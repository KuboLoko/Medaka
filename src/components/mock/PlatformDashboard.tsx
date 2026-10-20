"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  FilePlus2,
  FileText,
  LayoutDashboard,
  Link2,
  MessagesSquare,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnswerCard } from "./AnswerCard";
import { EngineBars } from "./EngineBars";
import { MockFrame, Panel, StatTile } from "./MockFrame";
import { PageOpportunityCard } from "./PageOpportunityCard";
import { SourceChip } from "./SourceChip";
import { TrendChart } from "./TrendChart";
import { changes, facts, kpis, pages, sampleAnswer, sampleQuestion, sourceStats, trend } from "./data";
import { cn } from "@/lib/cn";

const tabs: Array<{ name: string; icon: LucideIcon; sub: string }> = [
  { name: "Overview", icon: LayoutDashboard, sub: "How the firm appears across the five engines this month." },
  { name: "Engine responses", icon: MessagesSquare, sub: "One captured answer, with the sources it cited." },
  { name: "Sources", icon: Link2, sub: "The pages the engines cited most, and how often." },
  { name: "Pages", icon: FileText, sub: "A card for every page: questions, keywords and the recommended fix." },
  { name: "Facts base", icon: BookOpen, sub: "Approved facts used to ground any writing." },
  { name: "Monthly changes", icon: TrendingUp, sub: "What moved since the last report." },
];

type Tab = (typeof tabs)[number]["name"];

const changeIcon = {
  gained: <ArrowUpRight aria-hidden className="h-4 w-4 text-water-700" />,
  lost: <ArrowDownRight aria-hidden className="h-4 w-4 text-copper-600" />,
  source: <FilePlus2 aria-hidden className="h-4 w-4 text-ink-600" />,
} as const;

/** Illustrative members area. Tabs are keyboard operable (arrow keys, Home, End). */
export function PlatformDashboard() {
  const [active, setActive] = useState<Tab>("Overview");
  const base = useId();
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const current = tabs.find((t) => t.name === active) ?? tabs[0];

  function onKeyDown(e: KeyboardEvent, i: number) {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;
    e.preventDefault();
    setActive(tabs[next].name);
    refs.current[next]?.focus();
  }

  return (
    <MockFrame title="Members area · yourfirm.co.uk" bodyClassName="p-0 sm:p-0">
      <div className="grid grid-cols-[minmax(0,1fr)] md:grid-cols-[14.5rem_minmax(0,1fr)]">
        <div
          role="tablist"
          aria-label="Members area sections"
          aria-orientation="vertical"
          className="flex gap-1 overflow-x-auto border-b border-line p-3 md:flex-col md:overflow-visible md:border-r md:border-b-0 md:p-4"
        >
          {tabs.map((t, i) => {
            const Icon = t.icon;
            const on = active === t.name;
            return (
              <button
                key={t.name}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                role="tab"
                id={`${base}-tab-${i}`}
                aria-selected={on}
                aria-controls={`${base}-panel`}
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(t.name)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "flex shrink-0 items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors",
                  on
                    ? "border-line bg-white font-medium text-ink-950"
                    : "border-transparent text-ink-600 hover:bg-ink-900/[0.04] hover:text-ink-900",
                )}
              >
                <Icon aria-hidden className={cn("h-4 w-4 shrink-0", on ? "text-copper-600" : "text-ink-500")} />
                {t.name}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${base}-panel`}
          aria-labelledby={`${base}-tab-${tabs.indexOf(current)}`}
          tabIndex={0}
          className="min-h-[34rem] min-w-0 p-6 sm:p-8"
        >
          <header className="mb-8">
            <h3 className="font-display text-3xl font-normal leading-tight text-ink-950">{current.name}</h3>
            <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-ink-600">{current.sub}</p>
          </header>

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
            <div className="grid gap-5 lg:grid-cols-2">
              {pages.slice(0, 2).map((p) => (
                <PageOpportunityCard key={p.path} {...p} />
              ))}
            </div>
          )}
          {active === "Facts base" && <Facts />}
          {active === "Monthly changes" && (
            <ul className="divide-y divide-line rounded-xl border border-line bg-white/60 text-sm text-ink-800">
              {changes.map((c) => (
                <li key={c.text} className="flex items-start gap-3.5 px-5 py-4">
                  <span className="mt-0.5">{changeIcon[c.kind as keyof typeof changeIcon]}</span>
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
    <div className="space-y-8">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4">
        <StatTile
          label="Answers naming the firm"
          value={kpis.answersNamed.value}
          suffix={kpis.answersNamed.suffix}
          note={kpis.answersNamed.note}
          tone="good"
        />
        <StatTile label="Share of answers" value={kpis.share.value} note={kpis.share.note} tone="good" />
        <StatTile
          label="Engines naming the firm"
          value={kpis.engines.value}
          suffix={kpis.engines.suffix}
          note={kpis.engines.note}
          tone="good"
        />
        <StatTile label="Questions tracked" value={kpis.questions.value} note={kpis.questions.note} />
      </dl>

      <Panel as="h4" title="Answers naming the firm" sub="Share of tracked answers, by month">
        <TrendChart
          values={trend.values}
          labels={trend.labels}
          unit={trend.unit}
          ariaLabel="Illustrative line chart: the share of tracked answers that name the firm rises from 8 per cent to 25 per cent over six months."
        />
      </Panel>

      <Panel as="h4" title="By engine" sub="24 buyer questions each">
        <EngineBars />
      </Panel>
    </div>
  );
}

function Sources() {
  const max = Math.max(...sourceStats.map((s) => s.n));
  return (
    <Panel as="h4" title="Most cited sources" sub="Answers citing each source, out of 120">
      <ul className="divide-y divide-line">
        {sourceStats.map((s) => (
          <li
            key={s.label}
            className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2.5 py-3.5 first:pt-0 last:pb-0 sm:grid-cols-[17rem_1fr_auto]"
          >
            <SourceChip kind={s.kind} label={s.label} highlight={s.you} className="sm:order-1" />
            <span className="order-3 col-span-2 h-1.5 overflow-hidden rounded-full bg-ink-900/[0.07] sm:order-2 sm:col-span-1">
              <span
                className="block h-full rounded-full bg-flame"
                style={{ width: `${(s.n / max) * 100}%` }}
              />
            </span>
            <span className="order-2 w-8 text-right font-mono text-xs text-ink-700 sm:order-3">{s.n}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function Facts() {
  return (
    <ul className="divide-y divide-line rounded-xl border border-line bg-white/60">
      {facts.map((f) => (
        <li key={f.fact} className="flex items-center justify-between gap-4 px-5 py-4 text-sm text-ink-800">
          <span>{f.fact}</span>
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
              f.state === "Confirmed" ? "bg-water-100 text-water-700" : "bg-copper-100 text-copper-700",
            )}
          >
            {f.state}
          </span>
        </li>
      ))}
    </ul>
  );
}
