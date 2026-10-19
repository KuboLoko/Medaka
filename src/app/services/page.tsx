import { ArrowRight } from "lucide-react";
import { FinalCta } from "@/components/home/FinalCta";
import { ServiceGrid } from "@/components/home/ServicesSection";
import { PageHero, Section, SectionHeader } from "@/components/ui/Layout";
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
        <p data-reveal className="mt-8 max-w-2xl text-sm text-ink-600">
          Scope, deliverables and timings are agreed with each firm. Get in touch
          to talk through what would be useful.
        </p>
      </Section>

      {/* Belief and working relationship: from James Finlayson's Brand DNA workbook, 2026-10-18. */}
      <Section tone="raise" labelledBy="belief-title">
        <SectionHeader
          id="belief-title"
          eyebrow="What we believe"
          title="Good SEO is necessary, but not sufficient for AI."
          intro="It is one discipline, not a replacement. Your existing team is the right team, and is missing one measurement."
        />
        <p data-reveal className="mt-8 max-w-2xl text-lg text-ink-800">
          You deal with James Finlayson directly.
        </p>
      </Section>

      {/*
        TODO(client) before publishing: add the year to "May to July", and confirm Spendesk may be
        named. The figure comes from Spendesk's own dashboard, as recorded in the proof inventory.
        The workbook's German-mentions figure (0% to 98%) has no period or metric yet, so it is left out.
      */}
      <Section labelledBy="evidence-title">
        <SectionHeader
          id="evidence-title"
          eyebrow="Evidence"
          title="One result, with its source."
          intro="From our work with Spendesk. One client, one period."
        />
        <figure data-reveal data-spotlight className="surface-glass mt-10 max-w-3xl p-6 sm:p-8">
          <figcaption className="text-sm text-ink-600">
            Category mentions across the EU, bottom of the funnel
          </figcaption>
          <p className="font-display mt-3 flex flex-wrap items-center gap-x-4 text-5xl leading-none sm:text-6xl">
            17.7%
            <ArrowRight aria-hidden className="h-8 w-8 text-copper-600" />
            34.5%
          </p>
          <dl className="mt-6 grid gap-x-6 gap-y-4 border-t border-line pt-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-medium text-ink-900">Metric</dt>
              <dd className="mt-1 text-ink-600">
                Mention rate for the category, bottom of the funnel, across the EU.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-ink-900">Period</dt>
              <dd className="mt-1 text-ink-600">
                May to July, as shown in the dashboard.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-ink-900">Source</dt>
              <dd className="mt-1 text-ink-600">
                Spendesk’s own dashboard, which credits the content work.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-ink-900">Behind it</dt>
              <dd className="mt-1 text-ink-600">
                50 new articles across four markets, and 39 refreshed.
              </dd>
            </div>
          </dl>
          <p className="no-halo mt-6 rounded-lg border border-copper-600/40 bg-copper-600/10 px-4 py-3 text-sm font-medium text-ink-900">
            Not a guarantee of identical outcomes.
          </p>        </figure>
      </Section>
      <FinalCta />
    </>
  );
}
