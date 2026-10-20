
export const platformPoints = [
  {
    title: "Monthly results",
    text: "Each month’s findings in one place, with changes since the last report.",
  },
  {
    title: "What the work covers",
    text: "A clear record of what has been reviewed and what has been actioned.",
  },
  {
    title: "A facts base",
    text: "Approved facts about the firm, used to ground any writing.",
  },
  {
    title: "A card for every page",
    text: "Each page lists its buyer questions, keywords and recommended fixes.",
  },
];

export function PlatformPoints() {
  return (
    <dl data-reveal className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
      {platformPoints.map((p) => (
        <div key={p.title} className="border-t border-line pt-4">
          <dt className="font-display text-xl">{p.title}</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-ink-600">{p.text}</dd>
        </div>
      ))}
    </dl>
  );
}
