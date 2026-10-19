import { FishIllustration } from "@/components/brand/FishIllustration";
import { Section } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

export function NameSection() {
  return (
    <Section tone="deep" labelledBy="name-title">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-copper-600">
            The name
          </p>
          <h2
            id="name-title"
            className="font-display text-balance text-4xl leading-[1.06] sm:text-5xl lg:text-[3.5rem]"
          >
            Medaka means “high eyes”. It sees what the engines see.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
            The medaka is a small fish whose eyes sit high on its head, so it
            watches the surface as well as the water. That is the job: to look
            at the same sources and answers the engines look at, and report what
            is there.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <FishIllustration className="h-auto w-full" />
        </Reveal>
      </div>
    </Section>
  );
}
