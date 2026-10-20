import { Container } from "@/components/ui/Layout";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ILLUSTRATIVE } from "@/lib/site";

/*
  The value summary: what comes out of each monthly run. Three plain cards. Every number is
  an example and says so; none of it is a client result or a price.
*/
const questions = [
  "Which UK firms would you recommend for [your service]?",
  "Who are the best firms for [your service] for a growing business?",
  "Which firm should a family office hire for [your service]?",
  "What should I look for in a [your service] provider?",
  "Is it worth paying for [your service] at our size?",
];

const winners = [
  ["Rivalfirm", "9 of 48", "Reddit, own site"],
  ["Another firm", "6 of 48", "LinkedIn, directory"],
  ["yourfirm.co.uk", "2 of 48", "Own site"],
];

const fixes = [
  "Services page: answer the buyer question in the first paragraph.",
  "About page: name the sectors you serve.",
  "Reply in the Reddit thread the engines keep citing.",
];

function Tag({ children }: { children: string }) {
  return (
    <p className="inline-block rounded bg-night px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-cream">
      {children}
    </p>
  );
}

function Foot() {
  return (
    <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-500">
      {ILLUSTRATIVE}
    </p>
  );
}

export function ValueSummary() {
  return (
    <section aria-labelledby="value-title" className="py-20 sm:py-28">
      <Container>
        <div data-reveal className="max-w-2xl">
          <SplitHeading
            id="value-title"
            text="What you get from each month’s run"
            className="font-display text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]"
          />
          <p className="text-pretty mt-5 text-lg text-ink-600">
            The questions that matter, who the engines named, and the pages to
            fix first. The same questions every month, so one month can be
            compared with the next.
          </p>
        </div>

        <ul data-reveal className="mt-12 grid gap-5 lg:grid-cols-3">
          <li data-spotlight className="light surface-light p-6">
            <Tag>With Medaka</Tag>
            <h3 className="font-display mt-4 text-2xl font-normal">The full question set</h3>
            <ul className="mt-5 space-y-1.5 text-xs text-ink-800">
              {questions.map((q) => (
                <li key={q} className="rounded-md bg-sand px-2.5 py-2">
                  {q}
                </li>
              ))}
            </ul>
            <Foot />
          </li>

          <li data-spotlight className="light surface-light p-6">
            <Tag>With Medaka</Tag>
            <h3 className="font-display mt-4 text-2xl font-normal">Who wins, and why</h3>
            <table className="mt-5 w-full text-left text-xs">
              <caption className="sr-only">
                Example: firms named and the sources the engines read
              </caption>
              <tbody className="divide-y divide-line">
                {winners.map(([firm, count, sources]) => (
                  <tr key={firm}>
                    <th scope="row" className="py-2.5 pr-2 font-medium text-ink-950">
                      {firm}
                    </th>
                    <td className="py-2.5 pr-2 text-ink-800">{count}</td>
                    <td className="py-2.5 text-ink-600">{sources}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Foot />
          </li>

          <li data-spotlight className="light surface-light p-6">
            <Tag>With Medaka</Tag>
            <h3 className="font-display mt-4 text-2xl font-normal">What to fix first</h3>
            <ol className="mt-5 list-decimal space-y-2.5 pl-5 text-xs text-ink-800 marker:text-ink-500">
              {fixes.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ol>
            <Foot />
          </li>
        </ul>
      </Container>
    </section>
  );
}
