import { AuditForm } from "@/components/forms/AuditForm";
import { FreeAuditList } from "@/components/home/FreeAudit";
import { HeroPreview } from "@/components/mock/HeroPreview";
import { PageHero, Section } from "@/components/ui/Layout";
import { engineSentence, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Free AI visibility audit",
  description:
    "Enter your domain. Medaka asks ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews the questions your buyers ask, then shows which answers named your firm, which competitors were named instead and which websites were cited.",
  path: "/free-audit",
});

const reports = [
  [
    "Which answers named your firm",
    "Across the questions asked, which engines named your firm and which did not.",
  ],
  [
    "Which competitors were named instead",
    "The other firms the engines named in answers where yours was not.",
  ],
  [
    "Which websites were cited",
    "The websites the engines cited as sources, including your own.",
  ],
  [
    "Which questions were real",
    "Real buyer questions, and any additional likely questions, clearly marked as such.",
  ],
];

export default function FreeAuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Free audit"
        title="A free look at how AI engines describe your firm."
        intro={`Enter your domain. ${engineSentence}`}
      />

      <Section labelledBy="audit-form-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div data-reveal>
            <h2 id="audit-form-title" className="font-display text-3xl">
              How the audit works
            </h2>
            <div className="mt-6">
              <FreeAuditList variant="steps" />
            </div>
            <p className="mt-8 max-w-xl border-l-2 border-copper-600 pl-4 text-sm leading-relaxed text-ink-700">
              The audit does not promise rankings, traffic, revenue or any other
              outcome. It reports what was found at the time it was run.
            </p>
          </div>
          <div
            id="request"
            className="light self-start surface-light p-6 sm:p-8"
          >
            <h2 className="font-display text-2xl">Request your free audit</h2>
            <p className="mb-6 mt-1 text-sm text-ink-600">
              Two details are needed. The third is optional.
            </p>
            <AuditForm />
          </div>
        </div>
      </Section>

      <Section tone="raise" labelledBy="audit-reports-title">
        <h2 data-reveal id="audit-reports-title" className="font-display text-3xl sm:text-4xl">
          What the audit shows
        </h2>
        <dl data-reveal className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
          {reports.map(([t, d]) => (
            <div key={t} className="border-t border-line pt-4">
              <dt className="font-display text-xl">{t}</dt>
              <dd className="mt-1.5 text-sm text-ink-600">{d}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-12">
          <HeroPreview />
        </div>
      </Section>
    </>
  );
}
