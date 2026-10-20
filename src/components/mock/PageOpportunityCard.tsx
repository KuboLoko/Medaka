import { cn } from "@/lib/cn";

/** Illustrative page-level card: one card per page, with questions, keywords and a recommended fix. */
export function PageOpportunityCard({
  path,
  status,
  questions,
  keywords,
  fix,
  className,
}: {
  path: string;
  status: "Gaining" | "Stable" | "Losing";
  questions: string[];
  keywords: string[];
  fix: string;
  className?: string;
}) {
  return (
    <article
      className={cn("rounded-xl border border-line bg-white/60 p-5 text-sm sm:p-6", className)}
    >
      <header className="flex items-start justify-between gap-3">
        <h4 className="break-all font-mono text-xs text-ink-950">{path}</h4>
        <span
          className={cn(
            "shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-medium",
            status === "Gaining" && "bg-water-100 text-water-700",
            status === "Stable" && "bg-sand text-ink-700",
            status === "Losing" && "bg-copper-100 text-copper-700",
          )}
        >
          {status}
        </span>
      </header>

      <dl className="mt-5 space-y-5">
        <div>
          <dt className="text-xs font-medium text-ink-500">Buyer questions</dt>
          <dd className="mt-2 text-ink-800">
            <ul className="space-y-1">
              {questions.map((q) => (
                <li key={q}>“{q}”</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium text-ink-500">Keywords</dt>
          <dd className="mt-2 flex flex-wrap gap-1.5">
            {keywords.map((k) => (
              <span
                key={k}
                className="rounded-md border border-line bg-white px-2 py-0.5 text-xs text-ink-700"
              >
                {k}
              </span>
            ))}
          </dd>
        </div>
        <div className="rounded-lg border border-flame/30 bg-copper-100/50 px-4 py-3">
          <dt className="text-xs font-medium text-copper-700">Recommended fix</dt>
          <dd className="mt-1.5 leading-relaxed text-ink-800">{fix}</dd>
        </div>
      </dl>
    </article>
  );
}
