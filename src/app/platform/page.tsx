import { FinalCta } from "@/components/home/FinalCta";
import { Monitoring } from "@/components/home/Monitoring";
import { PlatformPoints } from "@/components/home/PlatformSection";
import { PlatformDashboard } from "@/components/mock/PlatformDashboard";
import { PageHero, Section } from "@/components/ui/Layout";
import { engineSentence, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Platform and monthly monitoring",
  description:
    "Each month Medaka re-asks the buyer questions that matter, tracks changes in AI answers and sources, and turns findings into page-level actions.",
  path: "/platform",
});

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="Platform"
        title="Monthly monitoring, with the evidence behind it."
        intro={`The members area holds your results, the work covered, a facts base and a card for every page. ${engineSentence}`}
      />
      <Section labelledBy="platform-demo-title">
        <h2 data-reveal id="platform-demo-title" className="font-display text-3xl sm:text-4xl">
          The members area
        </h2>
        <p data-reveal className="mt-3 max-w-2xl text-ink-600">
          Select a section to see an example.
        </p>
        <div className="mt-10">
          <PlatformDashboard />
        </div>
        <div className="mt-14">
          <PlatformPoints />
        </div>
      </Section>
      <Monitoring />
      <FinalCta />
    </>
  );
}
