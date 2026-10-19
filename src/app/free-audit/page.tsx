import { AuditForm } from "@/components/forms/AuditForm";
import { FreeAuditList } from "@/components/home/FreeAudit";
import { HeroPreview } from "@/components/mock/HeroPreview";
import { PageHero, Section } from "@/components/ui/Layout";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Free AI visibility audit",
  description:
    "Enter your domain. Medaka tests how five AI engines answer relevant buyer questions and reports where your firm appears, how it is described and which sources are used.",
  path: "/free-audit",
});

const reports = [
  ["Where the firm appears", "Which answers mention your firm, and which do not."],
  ["How it is described", "The wording the engines use about your firm and its services."],
  ["Which sources are used", "The pages and articles the engines cite, including your own."],
  ["Practical opportunities", "Pages to improve and buyer questions your content does not yet answer."],
];

export default function FreeAuditPage() {
  return (
    <>
      <PageHero
        eyebrow="Free audit"
        title="A free look at how AI engines describe your firm."
        intro="Give us your domain. We test how five AI engines respond to the buyer questions relevant to your firm, then report what we found."
      />

      <Section labelledBy="audit-form-title">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 id="audit-form-title" className="font-display text-3xl">
              What the audit does
            </h2>
            <div className="mt-6">
              <FreeAuditList />
            </div>
            <p className="mt-8 max-w-xl border-l-2 border-copper-600 pl-4 text-sm leading-relaxed text-ink-700">
              The audit does not promise rankings, traffic, revenue or any other
              outcome. It reports what was found at the time it was run.
            </p>
          </div>
          <div className="light rounded-[var(--radius-card)] border border-line bg-paper-soft p-6 shadow-[var(--shadow-card)] sm:p-8">
            <h2 className="font-display text-2xl">Request your free audit</h2>
            <p className="mb-6 mt-1 text-sm text-ink-600">
              Two details are needed. The third is optional.
            </p>
            <AuditForm />
          </div>
        </div>
      </Section>

      <Section tone="raise" labelledBy="audit-reports-title">
        <h2 id="audit-reports-title" className="font-display text-3xl sm:text-4xl">
          What the audit reports
        </h2>
        <dl className="mt-10 grid gap-x-10 gap-y-6 sm:grid-cols-2">
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
