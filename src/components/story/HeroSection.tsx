import { MedakaMark } from "@/components/brand/MedakaMark";
import { BuyerFigure } from "@/components/brand/BuyerFigure";
import { Container } from "@/components/ui/Layout";
import { SplitHeading } from "@/components/ui/SplitHeading";

export function HeroSection() {
  return (
    <section data-section="hero" aria-labelledby="hero-title">
      <Container className="pb-24 pt-12 sm:pt-20 lg:pb-44">
        <div className="grid items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <SplitHeading
              as="h1"
              id="hero-title"
              text="Do your buyers see you when they ask AI?"
              mode="chars"
              trigger="load"
              className="font-display text-balance text-[2.7rem] leading-[1.03] sm:text-6xl lg:text-[4.4rem]"
            />
            <p className="text-pretty mt-6 max-w-md text-lg leading-relaxed text-ink-600 sm:text-xl">
              Ask ChatGPT who to hire in your field and see who it names. Then run
              a free audit to see how five AI engines answer for your firm.
            </p>
            <div className="mt-14">
              <p className="font-display text-[4.5rem] leading-none sm:text-[6.5rem]">
                medaka
              </p>
              <p className="mt-4 flex items-center gap-2.5 text-sm font-medium text-ink-800">
                <MedakaMark animated eyes className="h-4 w-7" />
                AI visibility monitoring, by SEOptimist
              </p>
            </div>
          </div>
          <div data-anchor="start" className="mx-auto w-full max-w-md lg:max-w-none">
            <BuyerFigure />
          </div>
        </div>
      </Container>
    </section>
  );
}
