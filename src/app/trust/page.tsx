import { StandardsGrid, TrustGrid } from "@/components/home/TrustSection";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero, Section } from "@/components/ui/Layout";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Trust",
  description:
    "What the Medaka audit reads, what it needs from you and how its findings are shown. Plain statements, no exaggerated claims.",
  path: "/trust",
});

export default function TrustPage() {
  return (
    <>
      <PageHero
        eyebrow="Trust"
        title="Plain about what the audit reads and shows."
        intro="Finance firms need to know what is read, and how conclusions are reached. This page sets out what we can state."
      />
      <Section labelledBy="trust-principles-title">
        <h2 data-reveal id="trust-principles-title" className="font-display text-3xl sm:text-4xl">
          How the audit works
        </h2>
        <div className="mt-10">
          <TrustGrid />
        </div>
      </Section>
      <Section tone="raise" labelledBy="trust-standards-title">
        <h2 data-reveal id="trust-standards-title" className="font-display text-3xl sm:text-4xl">
          Standards we hold
        </h2>
        <div className="mt-10">
          <StandardsGrid />
        </div>
      </Section>
      <Section labelledBy="trust-limits-title">
        <div data-reveal className="max-w-3xl">
          <h2 id="trust-limits-title" className="font-display text-3xl sm:text-4xl">
            What we do not claim
          </h2>
          <ul className="mt-6 space-y-3 text-lg text-ink-800">
            <li>We do not claim to control what AI engines say.</li>
            <li>We do not promise rankings, traffic or revenue.</li>
            <li>
              This page states how the audit works. It makes no claims about
              certifications or compliance frameworks.
            </li>
          </ul>
          <p className="mt-8 text-ink-600">
            Questions about how the audit works? Get in touch.
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
