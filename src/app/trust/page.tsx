import { TrustGrid } from "@/components/home/TrustSection";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero, Section } from "@/components/ui/Layout";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Data sovereignty, security and trust",
  description:
    "How Medaka handles data, what it monitors and how its findings are produced. Plain statements, no exaggerated claims.",
  path: "/trust",
});

export default function TrustPage() {
  return (
    <>
      <PageHero
        eyebrow="Trust"
        title="Careful with data. Plain about method."
        intro="Finance firms need to know what is collected, why, and how conclusions are reached. This page sets that out."
      />
      <Section labelledBy="trust-principles-title">
        <h2 id="trust-principles-title" className="font-display text-3xl sm:text-4xl">
          How we work
        </h2>
        <div className="mt-10">
          <TrustGrid />
        </div>
      </Section>
      <Section tone="raise" labelledBy="trust-limits-title">
        <div className="max-w-3xl">
          <h2 id="trust-limits-title" className="font-display text-3xl sm:text-4xl">
            What we do not claim
          </h2>
          <ul className="mt-6 space-y-3 text-lg text-ink-800">
            <li>We do not claim to control what AI engines say.</li>
            <li>We do not promise rankings, traffic or revenue.</li>
            <li>
              We do not claim certifications or compliance status that we have
              not stated here.
            </li>
            <li>AI answers vary. Every report shows when it was run.</li>
          </ul>
          <p className="mt-8 text-ink-600">
            Questions about data handling? Ask us before you share anything.
          </p>
          <div className="mt-6">
            <ButtonLink href="/contact" variant="secondary">
              Contact us
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}
