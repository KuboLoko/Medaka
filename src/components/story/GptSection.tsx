import { Container } from "@/components/ui/Layout";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { ChatStream } from "./ChatStream";

export function GptSection() {
  return (
    <section
      id="how-it-works"
      data-section="gpt"
      aria-labelledby="gpt-title"
      className="py-16 sm:py-24"
    >
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <p
            data-reveal
            className="inline-block rounded bg-cream px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#0e2918]"
          >
            ChatGPT
          </p>
          <SplitHeading
            id="gpt-title"
            text="How an AI answer is made"
            className="font-display text-balance mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]"
          />
          <div data-reveal className="mt-10 space-y-8">
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

        <div data-anchor="gpt" className="relative mx-auto mt-14 max-w-xl lg:mt-28">
          <div aria-hidden className="glow -inset-x-24 -inset-y-20 opacity-70" />
          <div className="relative">
            <ChatStream />
          </div>
        </div>
      </Container>
    </section>
  );
}
