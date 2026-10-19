import { AnswerCard } from "./AnswerCard";
import { MockFrame, StatTile } from "./MockFrame";
import { TrendChart } from "./TrendChart";
import { engines, monthly, sampleAnswer, sampleQuestion } from "./data";

/** The hero product visual: one AI answer, source references, visibility status and monthly change. */
export function HeroPreview() {
  return (
    <MockFrame
      title="Medaka · Answer capture"
      label="Example interface. Illustrative data."
      bodyClassName="grid gap-5 md:grid-cols-5"
    >
      <div className="md:col-span-3">
        <AnswerCard
          question={sampleQuestion}
          intro={sampleAnswer.intro}
          shortlist={sampleAnswer.shortlist}
          sources={sampleAnswer.sources}
        />
      </div>

      <div className="space-y-3 md:col-span-2">
        <StatTile
          label="Visibility status"
          value="3 of 5"
          note="engines mention the firm"
        />
        <StatTile
          label="Change since last month"
          value="+1"
          note="engine now mentions the firm"
          tone="good"
        />
        <div className="rounded-lg border border-line bg-paper p-3.5">
          <p className="text-xs text-ink-600">Engines mentioning the firm, by month</p>
          <TrendChart
            values={monthly.values}
            labels={monthly.labels}
            ariaLabel="Illustrative line chart: number of buyer-question answers mentioning the firm rises over six months."
            className="mt-2"
          />
        </div>
        <ul className="space-y-1.5 text-xs text-ink-700" aria-label="Engines">
          {engines.map((e) => (
            <li
              key={e.name}
              className="flex items-center justify-between rounded border border-line bg-white px-2.5 py-1.5"
            >
              <span>{e.name}</span>
              <span
                className={
                  e.level > 0 ? "font-medium text-water-700" : "text-ink-500"
                }
              >
                {e.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </MockFrame>
  );
}
