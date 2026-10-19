import { ArrowRight, Globe, MessageSquare, Sparkles, FileText, Fish } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { HeroPreview } from "@/components/mock/HeroPreview";
import { BuyerFigure } from "@/components/brand/BuyerFigure";

const flow = [
  { icon: MessageSquare, label: "Buyer question" },
  { icon: Sparkles, label: "AI engine" },
  { icon: Globe, label: "Websites and sources" },
  { icon: FileText, label: "AI answer" },
  { icon: Fish, label: "Medaka monitoring and actions" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title">
      <Container className="pt-12 pb-16 sm:pt-20 sm:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.14em] text-copper-600">
                AI visibility monitoring for UK finance firms
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1
                id="hero-title"
                className="font-display text-balance text-[2.9rem] leading-[1.02] sm:text-6xl lg:text-[4.6rem]"
              >
                See how AI engines describe your firm.
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="text-pretty mt-6 max-w-xl text-lg leading-relaxed text-ink-600 sm:text-xl">
                Medaka monitors how AI engines answer the questions your buyers
                ask — then shows you what to improve.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/free-audit" size="lg">
                  Run a free audit
                  <ArrowRight aria-hidden className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="#how-it-works" variant="secondary" size="lg">
                  See how it works
                </ButtonLink>
              </div>
              <p className="mt-4 text-sm text-ink-500">Built by SEOptimist.</p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <BuyerFigure />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mt-16">
          <ol
            aria-label="How Medaka fits the buying journey"
            className="grid gap-2 sm:grid-cols-5"
          >
            {flow.map(({ icon: Icon, label }, i) => (
              <li
                key={label}
                className="relative flex items-center gap-3 rounded-lg border border-line bg-paper-soft px-3.5 py-3 text-sm text-ink-800"
              >
                <Icon aria-hidden className="h-4 w-4 shrink-0 text-copper-600" />
                <span>{label}</span>
                {i < flow.length - 1 && (
                  <ArrowRight
                    aria-hidden
                    className="absolute -right-[1.15rem] top-1/2 z-10 hidden h-4 w-4 -translate-y-1/2 text-ink-500 sm:block"
                  />
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
          <HeroPreview />
        </Reveal>
      </Container>
    </section>
  );
}
