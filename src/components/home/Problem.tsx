import { Section, SectionHeader } from "@/components/ui/Layout";
import { Reveal } from "@/components/ui/Reveal";

const risks = [
  "AI may describe the firm inaccurately.",
  "AI may leave the firm out of relevant answers.",
  "Competitors may be cited more often.",
  "Website content may not answer the questions buyers actually ask.",
  "Teams may not know which pages need improvement.",
];

export function Problem() {
  return (
    <Section tone="sand" labelledBy="problem-title">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal>
          <SectionHeader
            id="problem-title"
            eyebrow="The situation"
            title="Your next client may ask AI before they ask you."
            intro="Buyers increasingly ask AI engines before they visit a website, compare providers or contact sales. What those engines say about your firm shapes the shortlist. Most firms cannot see it."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mb-4 text-sm font-medium text-ink-700">
            This can mean:
          </p>
          <ul className="divide-y divide-line border-y border-line">
            {risks.map((r, i) => (
              <li key={r} className="flex gap-4 py-4 text-ink-900">
                <span className="font-mono text-xs leading-7 text-copper-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg leading-snug">{r}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
