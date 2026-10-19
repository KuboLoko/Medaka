import { LegalNotice } from "@/components/layout/LegalNotice";
import { PageHero, Section } from "@/components/ui/Layout";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms",
  description: "Medaka terms of use. The full terms are being prepared.",
  path: "/legal/terms",
  noindex: true,
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms"
        intro="Full privacy policy and terms are being prepared."
      />
      <Section>
        <div className="max-w-2xl space-y-6 text-ink-600">
          <p>This page is a placeholder. It is not a set of terms.</p>
          <LegalNotice className="text-sm" />
        </div>
      </Section>
    </>
  );
}
