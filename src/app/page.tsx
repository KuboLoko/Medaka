import { FinalCta } from "@/components/home/FinalCta";
import { FreeAudit } from "@/components/home/FreeAudit";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Monitoring } from "@/components/home/Monitoring";
import { NameSection } from "@/components/home/NameSection";
import { PlatformSection } from "@/components/home/PlatformSection";
import { Problem } from "@/components/home/Problem";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TrustSection } from "@/components/home/TrustSection";
import { pageMetadata, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Medaka | AI visibility monitoring for UK finance firms",
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Problem />
      <HowItWorks />
      <FreeAudit />
      <Monitoring />
      <PlatformSection />
      <ServicesSection />
      <TrustSection />
      <NameSection />
      <FinalCta />
    </>
  );
}
