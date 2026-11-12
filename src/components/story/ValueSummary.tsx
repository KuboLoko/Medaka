import { Container } from "@/components/ui/Layout";
import { SplitHeading } from "@/components/ui/SplitHeading";

/*
  The three core needs, one card each. Copy follows the Option 2 homepage brief (frame 5).
*/
const needs = [
  {
    tag: "Marketing & BD",
    title: "AI Visibility & Reputation",
    body: "Defend rankings, monitor generative answers, fix inaccuracies, and expand high-intent buyer coverage.",
  },
  {
    tag: "Compliance & Legal",
    title: "Data Sovereignty & Private AI",
    body: "Website data flow audits and private, self-hosted AI environments that keep confidential client data out of public models.",
  },
  {
    tag: "CFO & Operations",
    title: "Finance Team Automation",
    body: "Practical workflows for financial document extraction, reconciliation, and fractional AI advisory.",
  },
];

function Tag({ children }: { children: string }) {
  return (
    <p className="inline-block rounded bg-night px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] text-cream">
      {children}
    </p>
  );
}

export function ValueSummary() {
  return (
    <section aria-labelledby="value-title" className="py-20 sm:py-28">
      <Container>
        <div data-reveal className="max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-copper-600">
            Three core needs
          </p>
          <SplitHeading
            id="value-title"
            text="Engineered for the operational realities of finance."
            className="font-display text-balance text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]"
          />
        </div>

        <ul data-reveal className="mt-12 grid gap-5 lg:grid-cols-3">
          {needs.map((n) => (
            <li key={n.title} data-spotlight className="light surface-light p-6">
              <Tag>{n.tag}</Tag>
              <h3 className="font-display mt-4 text-2xl font-normal">{n.title}</h3>
              <p className="text-pretty mt-5 text-sm leading-relaxed text-ink-800">{n.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
