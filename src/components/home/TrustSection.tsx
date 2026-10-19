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

export function TrustGrid() {
  return (
    <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
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
