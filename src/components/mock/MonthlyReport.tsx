import { ArrowDownRight, ArrowUpRight, FilePlus2 } from "lucide-react";
import { MockFrame, StatTile } from "./MockFrame";
import { TrendChart } from "./TrendChart";
import { changes, monthly, pages } from "./data";

const icon = {
  gained: <ArrowUpRight aria-hidden className="h-4 w-4 text-water-700" />,
  lost: <ArrowDownRight aria-hidden className="h-4 w-4 text-copper-600" />,
  source: <FilePlus2 aria-hidden className="h-4 w-4 text-ink-600" />,
} as const;

/** Illustrative monthly report: what was tracked, what changed and what to do next. */
export function MonthlyReport() {
  return (
    <MockFrame title="Medaka · Monthly report" bodyClassName="space-y-5">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile label="Buyer questions tracked" value="24" />
        <StatTile label="AI engines monitored" value="5" />
        <StatTile label="Answers that changed" value="7" note="since last month" />
        <StatTile label="Sources cited" value="38" note="4 new this month" />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-4">
          <h4 className="text-sm font-medium text-ink-950">
            Answers that mention the firm
          </h4>
          <TrendChart
            values={monthly.values}
            labels={monthly.labels}
            ariaLabel="Illustrative line chart: answers that mention the firm increase across six months."
            className="mt-3"
          />
        </div>

        <div className="rounded-lg border border-line bg-white p-4">
          <h4 className="text-sm font-medium text-ink-950">
            Changes in AI answers
          </h4>
          <ul className="mt-3 space-y-2.5 text-sm text-ink-800">
            {changes.map((c) => (
              <li key={c.text} className="flex items-start gap-2.5">
                <span className="mt-0.5">{icon[c.kind as keyof typeof icon]}</span>
                {c.text}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-lg border border-line bg-white p-4">
          <h4 className="text-sm font-medium text-ink-950">
            Pages gaining or losing visibility
          </h4>
          <ul className="mt-3 divide-y divide-line text-sm">
            {pages.map((p) => (
              <li
                key={p.path}
                className="flex items-center justify-between gap-3 py-2"
              >
                <span className="break-all font-mono text-xs text-ink-800">
                  {p.path}
                </span>
                <span
                  className={
                    p.status === "Gaining"
                      ? "text-water-700"
                      : p.status === "Losing"
                        ? "text-copper-700"
                        : "text-ink-600"
                  }
                >
                  {p.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-line bg-white p-4">
          <h4 className="text-sm font-medium text-ink-950">Recommended actions</h4>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-ink-800 marker:text-ink-500">
            <li>Answer two uncovered buyer questions on the services page.</li>
            <li>Update the firm description on the about page.</li>
            <li>Add approved facts to the facts base before the next report.</li>
          </ol>
        </div>
      </div>
    </MockFrame>
  );
}
