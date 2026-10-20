import { AnswerCard } from "./AnswerCard";
import { EngineBars } from "./EngineBars";
import { MockFrame, Panel, StatTile } from "./MockFrame";
import { TrendChart } from "./TrendChart";
import { kpis, sampleAnswer, sampleQuestion, trend } from "./data";

/** A dashboard preview: key numbers, one captured answer, engine by engine, and the trend. */
export function HeroPreview() {
  return (
    <MockFrame
      title="Medaka · Free check for yourfirm.co.uk"
      label="Example interface. Illustrative data."
      bodyClassName="space-y-8 p-6 sm:p-8"
    >
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-3">
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
      </dl>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
        <Panel title="One captured answer" sub="Buyer question to answer">
          <AnswerCard
            question={sampleQuestion}
            intro={sampleAnswer.intro}
            shortlist={sampleAnswer.shortlist}
            sources={sampleAnswer.sources}
          />
        </Panel>
        <div className="min-w-0 space-y-6">
          <Panel title="By engine" sub="24 buyer questions each">
            <EngineBars />
          </Panel>
          <Panel title="Answers naming the firm" sub="Share of tracked answers, by month">
            <TrendChart
              values={trend.values}
              labels={trend.labels}
              unit={trend.unit}
              ariaLabel="Illustrative line chart: the share of tracked answers that name the firm rises from 8 per cent to 25 per cent over six months."
            />
          </Panel>
        </div>
      </div>
    </MockFrame>
  );
}
