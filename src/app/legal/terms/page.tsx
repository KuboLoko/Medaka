import { PageHero, Section } from "@/components/ui/Layout";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms",
  description: "Medaka terms of use. Placeholder pending legal review.",
  path: "/legal/terms",
  noindex: true,
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms"
        intro="Placeholder. This page will be replaced with terms reviewed by SEOptimist’s advisers before launch."
      />
      <Section>
        <div className="max-w-2xl space-y-4 text-ink-700">
          <p>
            The final terms should cover use of the website, the free audit, the
            members area and any monthly service, and should name the legal
            entity that provides them.
          </p>
          <p>No legal text has been written here yet.</p>
        </div>
      </Section>
    </>
  );
}
