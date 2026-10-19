import { PageHero, Section } from "@/components/ui/Layout";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: "Medaka privacy policy. Placeholder pending legal review.",
  path: "/legal/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy policy"
        intro="Placeholder. This page will be replaced with a policy reviewed by SEOptimist’s advisers before launch."
      />
      <Section>
        <div className="max-w-2xl space-y-4 text-ink-700">
          <p>
            The final policy should cover who is responsible for personal data,
            what is collected through the audit and contact forms, why it is
            used, how long it is kept, where it is stored and how to exercise
            data rights.
          </p>
          <p>No legal text has been written here yet.</p>
        </div>
      </Section>
    </>
  );
}
