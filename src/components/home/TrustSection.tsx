import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeader } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

/*
  TODO(client): every statement here is a statement of approach.
  Verify each one with SEOptimist before publishing. See README, "Claims to verify".
*/
export const trustPoints = [
  {
    title: "Data sovereignty",
    text: "We will say plainly where data is stored and processed, and who can access it.",
  },
  {
    title: "Responsible data handling",
    text: "Medaka works from public AI answers and public web sources, plus facts you approve.",
  },
  {
    title: "Transparency about what is monitored",
    text: "You can see the questions asked, the engines used and the answers recorded.",
  },
  {
    title: "No exaggerated claims",
    text: "Reports describe what was found. They do not promise rankings, traffic or revenue.",
  },
  {
    title: "A clear account of how insights are produced",
    text: "Each finding links back to the answer and the sources behind it.",
  },
  {
    title: "Human review where appropriate",
    text: "People at SEOptimist review findings and recommendations before they reach you.",
  },
];

export function TrustGrid({ dark }: { dark?: boolean }) {
  return (
    <dl className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
      {trustPoints.map((p) => (
        <div
          key={p.title}
          className={dark ? "border-t border-ink-700 pt-5" : "border-t border-line pt-5"}
        >
          <dt className="font-display text-2xl leading-tight">{p.title}</dt>
          <dd
            className={
              dark
                ? "mt-2 text-sm leading-relaxed text-ink-200"
                : "mt-2 text-sm leading-relaxed text-ink-600"
            }
          >
            {p.text}
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function TrustSection() {
  return (
    <Section id="trust" tone="ink" labelledBy="trust-title">
      <Reveal>
        <SectionHeader
          id="trust-title"
          tone="ink"
          eyebrow="Trust and data sovereignty"
          title="Careful with data. Plain about method."
          intro="Finance firms need to know what is collected, why, and how conclusions are reached. We set that out without embellishment."
        />
      </Reveal>
      <Reveal delay={0.1} className="mt-12">
        <TrustGrid dark />
        <div className="mt-10">
          <ButtonLink href="/trust" variant="inverse">
            Read about trust
          </ButtonLink>
        </div>
      </Reveal>
    </Section>
  );
}
