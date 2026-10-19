import { PlaceholderForm } from "@/components/forms/PlaceholderForm";
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
        intro="Tell us a little about your firm and what you would like to know. A person will reply."
      />
      <Section labelledBy="contact-form-title">
        <div className="light max-w-xl rounded-[var(--radius-card)] border border-line bg-paper-soft p-6 shadow-[var(--shadow-card)] sm:p-8">
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
          {/* TODO(client): add direct contact details once confirmed. */}
        </div>
      </Section>
    </>
  );
}
