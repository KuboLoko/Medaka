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
            className="inline-block rounded bg-night px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-cream"
          >
            The challenger reframe
          </p>
          <SplitHeading
            id="gpt-title"
            text="Good SEO is necessary. It is no longer sufficient."
            className="font-display text-balance mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]"
          />
          <div data-reveal className="mt-10 space-y-8">
            <p className="text-pretty text-ink-600">
              Your firm spent years building organic search authority. But pages
              that rank well in search can still receive no citations from AI
              engines.
            </p>
            <p className="text-pretty text-ink-600">
              Traditional search measures keyword position. Generative engines
              weigh how well a page answers the question and whether other
              sources back it up. One discipline, not two.
            </p>
            <p className="text-pretty text-lg font-medium text-ink-900">
              Your SEO team is the right team. They are simply missing one
              measurement, and it is not one you can buy off a dashboard.
            </p>
          </div>
        </div>

        <div data-anchor="gpt" className="relative mx-auto mt-14 max-w-xl lg:mt-28">
          <div aria-hidden className="glow -inset-x-24 -inset-y-20 opacity-60" />
          <div className="relative">
            <ChatStream />
          </div>
        </div>
      </Container>
    </section>
  );
}
