import { PlaceholderForm } from "@/components/forms/PlaceholderForm";
import { LegalNotice } from "@/components/layout/LegalNotice";
import { PageHero, Section } from "@/components/ui/Layout";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Request a free AI visibility audit or ask a question about Medaka and SEOptimist.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Ask a question or request an audit."
        intro="Tell us a little about your firm and what you would like to know."
      />
      <Section labelledBy="contact-form-title">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,36rem)_1fr] lg:gap-20">
          <div className="light self-start surface-light p-6 sm:p-8">
            <h2 id="contact-form-title" className="sr-only">
              Contact form
            </h2>
            <PlaceholderForm
              fields={[
                { name: "name", label: "Name", autoComplete: "name", required: true },
                { name: "email", label: "Work email", type: "email", autoComplete: "email", required: true },
                { name: "domain", label: "Company domain", autoComplete: "url" },
                { name: "message", label: "How can we help?", textarea: true },
              ]}
              submitLabel="Send message"
              notice="This form is not connected yet, so nothing has been sent."
            />
          </div>

          <div data-reveal role="group" aria-label="Who to contact" className="max-w-sm">
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-copper-600">
              Medaka by SEOptimist
            </p>
            <p className="font-display mt-3 text-2xl font-normal leading-snug">
              James Finlayson, AI visibility engineer.
            </p>
            <LegalNotice className="mt-8 text-sm leading-relaxed text-ink-600" />
          </div>
        </div>
      </Section>
    </>
  );
}
