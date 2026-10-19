import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <Section tone="light" labelledBy="final-title" className="text-center">
      <Reveal>
        <h2
          id="final-title"
          className="font-display text-balance mx-auto max-w-3xl text-4xl leading-[1.04] sm:text-6xl"
        >
          Understand how AI engines see your firm.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-ink-600">
          Start with a free audit. You will see what the engines said and where
          the opportunities are.
        </p>
        <div className="mt-9 flex justify-center">
          <ButtonLink href="/free-audit" size="lg">
            Run a free audit
            <ArrowRight aria-hidden className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
