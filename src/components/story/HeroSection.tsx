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
              text="Do your buyers see you?"
              mode="chars"
              trigger="load"
              className="font-display text-balance text-[3.2rem] leading-[0.98] sm:text-7xl lg:text-[5.5rem]"
            />
            <p className="text-pretty mt-6 max-w-md text-lg leading-relaxed text-ink-600 sm:text-xl">
              Ask ChatGPT who to hire in your field and see who it names. Free,
              about a minute, no sign-up.
            </p>
            <div className="mt-14">
              <p className="font-display text-[4.5rem] leading-none sm:text-[6.5rem]">
                medaka
              </p>
              <p className="mt-4 flex items-center gap-2.5 text-sm font-medium text-ink-800">
                <MedakaMark animated className="h-4 w-7" />
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
