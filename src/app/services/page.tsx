import { FinalCta } from "@/components/home/FinalCta";
import { ServiceGrid } from "@/components/home/ServicesSection";
import { PageHero, Section } from "@/components/ui/Layout";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "SEOptimist is the expert partner behind Medaka: audits, buyer-question research, content improvements, a facts base and ongoing reporting.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="The people behind the monitoring."
        intro="Medaka shows what AI engines say about your firm. SEOptimist helps you decide what to do about it, and does the work with you."
      />
      <Section labelledBy="services-list-title">
        <h2 id="services-list-title" className="sr-only">
          Services
        </h2>
        <ServiceGrid />
        <p className="mt-8 max-w-2xl text-sm text-ink-600">
          Scope, deliverables and timings are agreed with each firm. Get in touch
          to talk through what would be useful.
        </p>
      </Section>
      <FinalCta />
    </>
  );
}
