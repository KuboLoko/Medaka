import { Check } from "lucide-react";
import { AuditForm } from "@/components/forms/AuditForm";
import { Section, SectionHeader } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

export const auditDoes = [
  "Takes your company domain.",
  "Tests how five AI engines respond to relevant buyer questions.",
  "Shows where your firm appears, how it is described and which sources are used.",
  "Identifies practical opportunities to improve.",
];

export function FreeAuditList() {
  return (
    <ul className="space-y-3">
      {auditDoes.map((d) => (
        <li key={d} className="flex items-start gap-3 text-lg leading-snug">
          <Check aria-hidden className="mt-1 h-5 w-5 shrink-0 text-water-700" />
          {d}
        </li>
      ))}
    </ul>
  );
}

export function FreeAudit() {
  return (
    <Section id="free-audit" tone="raise" labelledBy="audit-title">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <SectionHeader
            id="audit-title"
            eyebrow="Free audit"
            title="Start with a clear picture."
            intro="The free audit reports what the engines said. It is a snapshot, so you can see where you stand before deciding anything."
          />
          <div className="mt-8">
            <FreeAuditList />
          </div>
          <p className="mt-8 max-w-xl border-l-2 border-copper-600 pl-4 text-sm leading-relaxed text-ink-700">
            The audit does not promise rankings, traffic, revenue or any other
            outcome. It describes what was found.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="light rounded-[var(--radius-card)] border border-line bg-paper-soft p-6 shadow-[var(--shadow-card)] sm:p-8">
            <h3 className="font-display text-2xl">Request your free audit</h3>
            <p className="mb-6 mt-1 text-sm text-ink-600">
              Two details are needed. The third is optional.
            </p>
            <AuditForm />
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
