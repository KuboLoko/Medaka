import { Container } from "@/components/ui/Layout";
import { MockFrame } from "@/components/mock/MockFrame";
import { SourceChip } from "@/components/mock/SourceChip";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { Status, type SourceState } from "./Status";

type Row = { engine: string; mark: string; question: string; state: SourceState };

/* Neutral two-letter marks, not logos. They glow when their row is hovered. */
const rows: Row[] = [
  { engine: "ChatGPT", mark: "CG", question: "Which UK firms would you recommend for [your service]?", state: "Named" },
  { engine: "Claude", mark: "CL", question: "Which UK firms would you recommend for [your service]?", state: "Not named" },
  { engine: "Gemini", mark: "GM", question: "Who are the best firms for [your service] for a growing business?", state: "Not named" },
  { engine: "Perplexity", mark: "PX", question: "Who are the best firms for [your service] for a growing business?", state: "Cited" },
  { engine: "ChatGPT", mark: "CG", question: "What should I look for in a [your service] provider?", state: "Not named" },
  { engine: "Google AI Overviews", mark: "AO", question: "What should I look for in a [your service] provider?", state: "Not named" },
];

const totals = [
  { label: "Answers", value: 6 },
  { label: "Engines", value: 5 },
  { label: "Questions", value: 3 },
];

export function AnswerSection() {
  return (
    <>
      <section
        data-section="answer"
        aria-labelledby="answer-title"
        className="pb-16 pt-4 sm:pb-24"
      >
        <Container>
          <div className="h-0 lg:h-40" />
          <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
            <div data-anchor="merge" className="relative">
              <div aria-hidden className="glow -inset-x-20 -inset-y-16" />
              <div className="relative">
                <MockFrame title="ChatGPT" label="Example. Illustrative data.">
                  <p className="text-sm text-ink-700">
                    Firms that come up for this question:
                  </p>
                  <ol className="mt-3 space-y-1.5 text-sm text-ink-950">
                    <li>
                      1. Rivalfirm <sup className="font-mono text-[10px]">1</sup>
                    </li>
                    <li>
                      2. Another firm <sup className="font-mono text-[10px]">2</sup>
                    </li>
                    <li>
                      3. yourfirm.co.uk <sup className="font-mono text-[10px]">3</sup>
                    </li>
                  </ol>
                  <div className="mt-4 flex flex-wrap items-center gap-1.5">
                    <span className="text-xs text-ink-600">Sources</span>
                    <SourceChip kind="site" label="rivalfirm.co.uk" />
                    <SourceChip kind="page" label="reddit.com" />
                    <SourceChip kind="site" label="yourfirm.co.uk" highlight />
                  </div>
                  <p className="font-display mt-6 text-4xl leading-none text-ink-950 sm:text-5xl">
                    Named in 2 of 12 answers
                  </p>
                  <p className="mt-3 text-xs text-ink-600">
                    Example result. Four states per answer: named and cited, named
                    not cited, cited not named, neither.
                  </p>
                </MockFrame>
              </div>
            </div>

            <div data-reveal>
              <Status state="Named" className="!bg-night !text-cream" />
              <SplitHeading
                id="answer-title"
                text="The answer is written."
                className="font-display mt-4 text-3xl leading-[1.08] sm:text-4xl"
              />
              <p className="mt-3 text-ink-600">
                The engine writes one answer and names a few firms. Whether
                yours is among them is what the check measures.
              </p>
              <h3 className="mt-8 text-lg font-medium text-ink-900">
                Citations are attached.
              </h3>
              <p className="mt-2 text-ink-600">
                Each named firm points back to the sources it came from. Each
                source reads Named, Cited or Not chosen.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section data-section="report" aria-labelledby="report-title" className="pb-20 sm:pb-28">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
            <div data-reveal className="min-w-0">
              <Status state="Named" className="!bg-night !text-cream" />
              <h2
                id="report-title"
                data-count
                className="font-display mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl"
              >
                Named in 1 of 6 answers
              </h2>
              <p className="mt-4 text-ink-600">
                Cited in 1. This is the free check: six answers, three buyer
                questions, five engines. Example figures until your run completes.
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
                {totals.map((t) => (
                  <div key={t.label} className="flex flex-col-reverse">
                    <dt className="mt-2 text-xs text-ink-600">{t.label}</dt>
                    <dd className="font-display text-4xl leading-none text-ink-900" data-tick={t.value}>
                      {t.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div data-reveal data-anchor="report" className="min-w-0">
              <MockFrame
                title="yourfirm.co.uk · Free check"
                label="Example. Named means your name appears in the answer. Cited means your website is one of its sources."
                bodyClassName="p-0 sm:p-0"
              >
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[30rem] text-left text-sm">
                    <caption className="sr-only">
                      Example answers by engine and question. Illustrative data.
                    </caption>
                    <thead className="bg-sand/60 text-xs text-ink-600">
                      <tr>
                        <th scope="col" className="px-4 py-2 font-medium">Engine</th>
                        <th scope="col" className="px-4 py-2 font-medium">Question</th>
                        <th scope="col" className="px-4 py-2 text-right font-medium">yourfirm.co.uk</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {rows.map((r, i) => (
                        <tr
                          key={`${r.engine}-${i}`}
                          className="group transition-colors duration-200 hover:bg-[#f06a25]/10"
                        >
                          <th scope="row" className="px-4 py-2.5 text-xs font-medium text-ink-800">
                            <span className="flex items-center gap-2">
                              <span
                                aria-hidden
                                className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-night font-mono text-[9px] text-cream transition-shadow duration-300 group-hover:shadow-[0_0_0_2px_rgb(240_106_37/0.55),0_0_16px_rgb(240_106_37/0.7)]"
                              >
                                {r.mark}
                              </span>
                              {r.engine}
                            </span>
                          </th>
                          <td className="px-4 py-2.5 text-xs text-ink-700">{r.question}</td>
                          <td className="px-4 py-2.5 text-right">
                            <Status state={r.state} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </MockFrame>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
