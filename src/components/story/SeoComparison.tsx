import { Container } from "@/components/ui/Layout";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { engineNames } from "@/lib/site";

/*
  A descriptive comparison, with no third-party names and no prices. Nothing here is data,
  so it needs no "illustrative" label: each row states what a method looks at, and every
  Medaka row restates what the audit and the monthly report already do.
  Framing follows James Finlayson's workbook: good SEO is necessary but not sufficient for AI,
  one discipline and not a replacement, so this is "what each looks at", never "SEO versus".
*/
const rows = [
  {
    topic: "What it looks at",
    seo: "How pages rank for keywords in search results.",
    ai: "Which answers name your firm when buyers ask an AI engine, and which sources those answers cite.",
  },
  {
    topic: "Where it looks",
    seo: "Search results pages.",
    ai: `The answers from ${engineNames.slice(0, -1).join(", ")} and ${engineNames[engineNames.length - 1]}.`,
  },
  {
    topic: "What it starts from",
    seo: "Keywords people type.",
    ai: "The questions buyers put to AI engines. Real questions come first, and any added question is marked.",
  },
  {
    topic: "How it tracks change",
    seo: "Positions and traffic over time.",
    ai: "The same buyer questions, asked again each month, so one month can be compared with the next.",
  },
  {
    topic: "What a fix is built on",
    seo: "Keyword research and page optimisation.",
    ai: "A facts base of approved facts about your firm, used to ground what is written.",
  },
  {
    topic: "How results are reported",
    seo: "Rankings, visits and conversions.",
    ai: "Answers, named firms and cited sources, with the metric, the period and the source for each number.",
  },
];

export function SeoComparison() {
  return (
    <section aria-labelledby="compare-title" className="pb-20 sm:pb-28">
      <Container>
        <div data-reveal className="max-w-2xl">
          <SplitHeading
            id="compare-title"
            text="What SEO looks at, and what this adds"
            className="font-display text-balance text-4xl leading-[1.05] sm:text-5xl"
          />
          <p className="text-pretty mt-4 text-ink-600">
            Good SEO is still necessary. It is one discipline, and AI visibility
            monitoring adds the measurement it does not cover.
          </p>
        </div>

        <div
          data-reveal
          className="light surface-light mt-10 overflow-x-auto"
        >
          <table className="w-full min-w-[44rem] text-left text-sm">
            <caption className="sr-only">
              How search optimisation and AI visibility monitoring differ in what they look at
            </caption>
            <thead className="text-xs text-ink-600">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">
                  <span className="sr-only">Topic</span>
                </th>
                <th scope="col" className="px-4 py-3 font-medium">Search optimisation</th>
                <th scope="col" className="px-4 py-3 font-medium text-copper-700">
                  AI visibility monitoring (Medaka)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((r) => (
                <tr key={r.topic}>
                  <th scope="row" className="w-44 px-4 py-3.5 align-top font-medium text-ink-950">
                    {r.topic}
                  </th>
                  <td className="px-4 py-3.5 align-top text-ink-700">{r.seo}</td>
                  <td className="bg-sand/60 px-4 py-3.5 align-top text-ink-900">{r.ai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  );
}
