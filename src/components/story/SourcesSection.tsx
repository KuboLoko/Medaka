import { Container } from "@/components/ui/Layout";
import { ILLUSTRATIVE } from "@/lib/site";
import { Status, type SourceState } from "./Status";

type Card = { source: string; state: SourceState; body: React.ReactNode };

const cards: Card[] = [
  {
    source: "Your website",
    state: "Named",
    body: (
      <>
        <p className="font-mono text-[10px] text-ink-600">yourfirm.co.uk</p>
        <p className="mt-1 flex gap-2 text-[10px] text-ink-500">
          <span>Services</span>
          <span>Sectors</span>
          <span>About</span>
          <span>Contact</span>
        </p>
        <p className="mt-3 text-sm font-medium leading-snug text-ink-950">
          Audit and advisory for growing firms
        </p>
      </>
    ),
  },
  {
    source: "Reddit",
    state: "Cited",
    body: (
      <>
        <p className="font-mono text-[10px] text-ink-600">r/UKPersonalFinance</p>
        <p className="mt-2 text-sm font-medium leading-snug text-ink-950">
          Which accountants would you recommend for a growing firm?
        </p>
        <p className="mt-2 text-[10px] text-ink-500">124 · 38 comments</p>
      </>
    ),
  },
  {
    source: "LinkedIn",
    state: "Not chosen",
    body: (
      <>
        <p className="flex items-center gap-2 text-[11px] text-ink-700">
          <span aria-hidden className="h-6 w-6 rounded-full bg-sand" />
          <span>
            <span className="font-medium text-ink-950">A. Patel</span> · Finance director
          </span>
        </p>
        <p className="mt-2 text-xs leading-snug text-ink-700">
          We changed firms this year. Three names kept coming up when I asked
          around.
        </p>
      </>
    ),
  },
  {
    source: "A rival",
    state: "Not chosen",
    body: (
      <>
        <p className="font-mono text-[10px] text-ink-600">rivalfirm.co.uk</p>
        <p className="mt-1 flex gap-2 text-[10px] text-ink-500">
          <span>What we do</span>
          <span>Who we help</span>
          <span>Insights</span>
        </p>
        <p className="mt-3 text-sm font-medium leading-snug text-ink-950">
          Accountants for ambitious businesses
        </p>
      </>
    ),
  },
];

export function SourcesSection() {
  return (
    <section
      data-section="sources"
      aria-labelledby="sources-title"
      className="pb-16 pt-8 sm:pb-24"
    >
      <Container>
        <div data-reveal className="max-w-md">
          <h2
            id="sources-title"
            className="font-display text-balance text-3xl leading-[1.08] sm:text-4xl"
          >
            It reads sources, not only your website.
          </h2>
          <p className="mt-4 text-ink-600">
            Reddit threads, LinkedIn pages and the sites of your rivals are read
            next to yours.
          </p>
          <p className="mt-4 font-medium text-ink-900">Each fish is one question.</p>
        </div>

        <div className="relative h-0 lg:h-48">
          <span data-anchor="split" className="absolute left-1/2 top-0 block h-0 w-0" />
        </div>

        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-0 lg:grid-cols-4">
          {cards.map((c, i) => (
            <li
              key={c.source}
              data-anchor={`src-${i + 1}`}
              className="light rounded-[var(--radius-card)] border border-line bg-paper-soft p-4 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-center justify-between gap-2 border-b border-line pb-2.5">
                <p className="text-xs font-medium text-ink-700">{c.source}</p>
                <Status state={c.state} />
              </div>
              <div className="pt-3">{c.body}</div>
            </li>
          ))}
        </ul>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-500">
          {ILLUSTRATIVE}
        </p>
      </Container>
    </section>
  );
}
