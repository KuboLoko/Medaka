import { LegalNotice } from "@/components/layout/LegalNotice";
import { PageHero, Section } from "@/components/ui/Layout";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: "Medaka privacy policy. The full policy is being prepared.",
  path: "/legal/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        intro="Full privacy policy and terms are being prepared."
      />
      <Section>
        <div className="max-w-2xl space-y-6 text-ink-600">
          <p>This page is a placeholder. It is not a privacy policy.</p>
          <LegalNotice className="text-sm" />
        </div>
      </Section>
    </>
  );
}
