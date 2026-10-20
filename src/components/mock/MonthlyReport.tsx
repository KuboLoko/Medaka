import { ArrowDownRight, ArrowUpRight, FilePlus2 } from "lucide-react";
import { MockFrame, Panel, StatTile } from "./MockFrame";
import { TrendChart } from "./TrendChart";
import { changes, kpis, pages, trend } from "./data";

const icon = {
  gained: <ArrowUpRight aria-hidden className="h-4 w-4 text-water-700" />,
  lost: <ArrowDownRight aria-hidden className="h-4 w-4 text-copper-600" />,
  source: <FilePlus2 aria-hidden className="h-4 w-4 text-ink-600" />,
} as const;

/** Illustrative monthly report: what was tracked, what changed and what to do next. */
export function MonthlyReport() {
  return (
    <MockFrame title="Monthly report · Month 6" bodyClassName="space-y-8 p-6 sm:p-8">
      <div className="grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-4">
        <StatTile label="Buyer questions tracked" value={kpis.questions.value} note={kpis.questions.note} />
        <StatTile label="AI engines monitored" value="5" note="ChatGPT to AI Overviews" />
        <StatTile label="Answers that changed" value={kpis.changed.value} note="since last month" />
        <StatTile label="Sources cited" value={kpis.sources.value} note={kpis.sources.note} tone="good" />
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-2">
        <Panel title="Answers naming the firm" sub="Share of tracked answers, by month">
          <TrendChart
            values={trend.values}
            labels={trend.labels}
            unit={trend.unit}
            ariaLabel="Illustrative line chart: the share of tracked answers that name the firm rises across six months."
          />
        </Panel>

        <Panel title="Changes in AI answers" sub="This month">
          <ul className="divide-y divide-line text-sm text-ink-800">
            {changes.map((c) => (
              <li key={c.text} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                <span className="mt-0.5">{icon[c.kind as keyof typeof icon]}</span>
                {c.text}
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-2">
        <Panel title="Pages gaining or losing visibility">
          <ul className="divide-y divide-line text-sm">
            {pages.map((p) => (
              <li key={p.path} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <span className="break-all font-mono text-xs text-ink-800">{p.path}</span>
                <span
                  className={
                    p.status === "Gaining"
                      ? "rounded-full bg-water-100 px-2.5 py-0.5 text-[11px] font-medium text-water-700"
                      : p.status === "Losing"
                        ? "rounded-full bg-copper-100 px-2.5 py-0.5 text-[11px] font-medium text-copper-700"
                        : "rounded-full bg-sand px-2.5 py-0.5 text-[11px] font-medium text-ink-700"
                  }
                >
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Recommended actions">
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-relaxed text-ink-800 marker:text-ink-500">
            <li>Answer two uncovered buyer questions on the services page.</li>
            <li>Update the firm description on the about page.</li>
            <li>Add approved facts to the facts base before the next report.</li>
          </ol>
        </Panel>
      </div>
    </MockFrame>
  );
}
