import { DomainCheck } from "@/components/forms/DomainCheck";
import { MockFrame } from "@/components/mock/MockFrame";
import { Container } from "@/components/ui/Layout";

const searches = [
  "best UK firms for [your service]",
  "[your service] firm reviews",
  "recommended [your service] UK reddit",
];

export function GptSection() {
  return (
    <section
      id="how-it-works"
      data-section="gpt"
      aria-labelledby="gpt-title"
      className="py-16 sm:py-24"
    >
      <Container>
        <div data-reveal className="mx-auto max-w-xl text-center">
          <p className="inline-block rounded bg-cream px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#0e2918]">
            ChatGPT
          </p>
          <h2
            id="gpt-title"
            className="font-display text-balance mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]"
          >
            How an AI answer is made
          </h2>
          <div className="mt-10 space-y-8">
            <div>
              <h3 className="text-lg font-medium text-ink-900">A buyer asks a question.</h3>
              <p className="text-pretty mt-2 text-ink-600">
                A finance director types: Which UK firms would you recommend for
                [your service]? This is the kind of question a buyer can now put
                to an assistant.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-ink-900">
                The engine searches the live web.
              </h3>
              <p className="text-pretty mt-2 text-ink-600">
                When web search is on, it runs real searches at the moment of
                asking, the way a person would.
              </p>
            </div>
          </div>
        </div>

        <div data-anchor="gpt" className="mx-auto mt-14 max-w-xl lg:mt-28">
          <MockFrame title="ChatGPT · Web search on" label="Example. Illustrative data.">
            <div className="space-y-4">
              <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-sand px-3.5 py-2 text-sm text-ink-800">
                Which UK firms would you recommend for [your service]?
              </p>
              <div>
                <p className="flex items-center gap-2 text-sm text-ink-600">
                  <span aria-hidden className="flex gap-1">
                    <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-copper-600" />
                    <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-copper-600" />
                    <i className="pulse-dot h-1.5 w-1.5 rounded-full bg-copper-600" />
                  </span>
                  Searching the web
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {searches.map((s) => (
                    <li
                      key={s}
                      className="rounded-full border border-line bg-paper px-2.5 py-1 text-xs text-ink-700"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-line pt-4">
                <p aria-hidden className="mb-2 text-xs text-ink-600">
                  Enter your domain name
                </p>
                <DomainCheck buttonLabel="Ask" tone="light" />
              </div>
            </div>
          </MockFrame>
        </div>
      </Container>
    </section>
  );
}
