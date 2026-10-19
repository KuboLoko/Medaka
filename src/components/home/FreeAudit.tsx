import { Check } from "lucide-react";
import { AuditForm } from "@/components/forms/AuditForm";
import { Section, SectionHeader } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

/** Short version, used on the homepage. */
export const auditSummary = [
  "You enter your domain. Medaka reads only your public pages.",
  "You can correct what it gets wrong about your firm and its competitors before the run.",
  "It asks ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews your buyers’ questions, live.",
  "It shows which answers named your firm, which competitors were named instead and which websites were cited.",
];

/** The full process, used on the free audit page. */
export const auditSteps = [
  "You enter your domain.",
  "Medaka reads only public pages.",
  "It identifies what your firm sells and its likely competitors, from your own pages.",
  "You can correct anything it gets wrong before the run.",
  "It identifies your buyers’ real questions. If there are not enough real questions, additional likely questions are added and clearly marked.",
  "It asks ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews live, in the way a real buyer would.",
  "It shows which answers named your firm, which competitors were named instead and which websites were cited as sources.",
];

export function FreeAuditList({ variant = "summary" }: { variant?: "summary" | "steps" }) {
  if (variant === "steps") {
    return (
      <ol className="space-y-4">
        {auditSteps.map((d, i) => (
          <li key={d} className="flex items-start gap-4 text-lg leading-snug">
            <span className="mt-0.5 font-mono text-xs leading-6 text-copper-600">
              {String(i + 1).padStart(2, "0")}
            </span>
            {d}
          </li>
        ))}
      </ol>
    );
  }
  return (
    <ul className="space-y-3">
      {auditSummary.map((d) => (
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
