import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

/*
  Only the statements verified against the SEOptimist website belong here.
  Do not add claims about data storage location, encryption, certifications,
  compliance frameworks or human review unless the client approves them.
*/
export const trustPoints = [
  {
    title: "Public pages only",
    text: "The audit reads public website pages only.",
  },
  {
    title: "No logins or customer data",
    text: "It does not require logins, analytics access or customer data.",
  },
  {
    title: "Real questions first",
    text: "Buyer questions are based on real questions where available. Additional likely questions are clearly marked.",
  },
  {
    title: "Results you can see",
    text: "Results show AI answers, named firms and cited sources.",
  },
  {
    title: "Practical recommendations",
    text: "Recommendations focus on making pages easier for AI engines to find, read and quote.",
  },
];

/*
  Standards from James Finlayson's Brand DNA workbook (2026-10-18), "What principle will you
  not compromise on?". They describe how results are reported, so they are stated as practice,
  not as outcomes. No claim here is about data location, security or compliance.
*/
export const standards = [
  {
    title: "Show the evidence",
    text: "Every number carries its metric, its period and its source.",
  },
  {
    title: "Report the full result",
    text: "If mentions rise and citations fall, we say both.",
  },
  {
    title: "No invention",
    text: "Real keywords and real prompts only. Nothing is made up to fill a gap.",
  },
  {
    title: "Proof before promise",
    text: "We re-test the same buyer prompts before and after each change.",
  },
  {
    title: "Tested code where it can be tested",
    text: "AI is used where judgment is needed, and tested code everywhere else.",
  },
];

export function StandardsGrid() {
  return (
    <ol data-reveal className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {standards.map((s, i) => (
        <li key={s.title} className="border-t border-line pt-5">
          <p className="font-mono text-xs text-copper-600">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="font-display mt-1 text-2xl font-normal leading-tight">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function TrustGrid() {
  return (
    <dl data-reveal className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {trustPoints.map((p) => (
        <div key={p.title} className="border-t border-line pt-5">
          <dt className="font-display text-2xl font-normal leading-tight">{p.title}</dt>
          <dd className="mt-2 text-sm leading-relaxed text-ink-600">{p.text}</dd>
        </div>
      ))}
    </dl>
  );
}

export function TrustSection() {
  return (
    <Section id="trust" tone="deep" labelledBy="trust-title">
      <Reveal>
        <SectionHeader
          id="trust-title"
          eyebrow="Trust"
          title="Plain about what the audit reads and shows."
          intro="Finance firms need to know what is read, and how conclusions are reached. Here is what we can state."
        />
      </Reveal>
      <Reveal delay={0.1} className="mt-12">
        <TrustGrid />
        <div className="mt-10">
          <ButtonLink href="/trust" variant="secondary">
            Read about trust
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
