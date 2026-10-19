import { AlternativesTable } from "@/components/story/AlternativesTable";
import { AnswerSection } from "@/components/story/AnswerSection";
import { CheckSection } from "@/components/story/CheckSection";
import { GptSection } from "@/components/story/GptSection";
import { HeroSection } from "@/components/story/HeroSection";
import { LoopSection } from "@/components/story/LoopSection";
import { PricingSection } from "@/components/story/PricingSection";
import { Reveals } from "@/components/story/Reveals";
import { SourcesSection } from "@/components/story/SourcesSection";
import { ThreadStory } from "@/components/story/ThreadStory";
import { pageMetadata, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Medaka | AI visibility monitoring for UK finance firms",
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <ThreadStory>
        <HeroSection />
        <GptSection />
        <SourcesSection />
        <AnswerSection />
      </ThreadStory>
      <Reveals>
        <PricingSection />
        <AlternativesTable />
      </Reveals>
      <LoopSection />
      <CheckSection />
    </>
  );
}
