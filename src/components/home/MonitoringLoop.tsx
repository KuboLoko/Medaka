const stages = [
  { name: "Find", text: "Identify the buyer questions that matter for your firm." },
  { name: "Measure", text: "Ask the engines each month and record the answers." },
  { name: "Fix", text: "Act on the pages, content and facts that need work." },
  { name: "Check", text: "Re-ask the same questions and see what changed." },
];

/** The monthly loop: find, measure, fix, check. */
export function MonitoringLoop() {
  return (
    <ol aria-label="The monthly loop" className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {stages.map((s, i) => (
        <li key={s.name} className="bg-paper-soft p-5">
          <p className="font-mono text-xs text-copper-600">0{i + 1}</p>
          <p className="font-display mt-1 text-2xl font-normal">{s.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-600">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
