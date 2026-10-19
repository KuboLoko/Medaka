import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";
import { PlatformDashboard } from "@/components/mock/PlatformDashboard";

export const platformPoints = [
  {
    title: "Monthly results",
    text: "Each month’s findings in one place, with changes since the last report.",
  },
  {
    title: "What the work covers",
    text: "A clear record of what has been reviewed and what has been actioned.",
  },
  {
    title: "A facts base",
    text: "Approved facts about the firm, used to ground any writing.",
  },
  {
    title: "A card for every page",
    text: "Each page lists its buyer questions, keywords and recommended fixes.",
  },
];

export function PlatformPoints() {
  return (
    <dl className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      {platformPoints.map((p) => (
        <div key={p.title} className="border-t border-line pt-4">
          <dt className="font-display text-xl">{p.title}</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-ink-600">{p.text}</dd>
        </div>
      ))}
    </dl>
  );
}

export function PlatformSection() {
  return (
    <Section id="platform" tone="raise" labelledBy="platform-title">
      <Reveal>
        <SectionHeader
          id="platform-title"
          eyebrow="Platform"
          title="One place for results, evidence and next steps."
          intro="The members area holds the reports, the facts base and the page-by-page work. Select a section below to see an example."
        />
      </Reveal>
      <Reveal delay={0.1} className="mt-12">
        <PlatformDashboard />
      </Reveal>
      <Reveal className="mt-14">
        <PlatformPoints />
        <div className="mt-10">
          <ButtonLink href="/platform" variant="secondary">
            More about the platform
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
