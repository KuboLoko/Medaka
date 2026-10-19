import { Sparkles } from "lucide-react";
import { SourceChip } from "./SourceChip";
import { cn } from "@/lib/cn";

type Source = {
  label: string;
  kind?: "site" | "page" | "article" | "directory";
  highlight?: boolean;
};

/**
 * An illustrative AI answer with numbered source references.
 * Always rendered inside a MockFrame so the "illustrative" label is present.
 */
export function AnswerCard({
  engine = "AI engine",
  question,
  intro,
  shortlist,
  sources,
  className,
}: {
  engine?: string;
  question: string;
  intro: string;
  shortlist: Array<{ name: string; note: string; ref: number; you?: boolean }>;
  sources: Source[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-lg border border-line bg-paper px-3.5 py-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">
          Buyer question
        </p>
        <p className="mt-1 text-sm font-medium text-ink-950">{question}</p>
      </div>

      <div className="rounded-lg border border-line bg-white px-3.5 py-3.5">
        <p className="mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">
          <Sparkles aria-hidden className="h-3 w-3" />
          {engine} answer
        </p>
        <p className="text-sm leading-relaxed text-ink-800">{intro}</p>
        <ul className="mt-3 space-y-2">
          {shortlist.map((item) => (
            <li
              key={item.name}
              className={cn(
                "rounded-md border px-3 py-2 text-sm",
                item.you
                  ? "border-copper-500/50 bg-copper-100/60"
                  : "border-line bg-paper-soft",
              )}
            >
              <span className="font-medium text-ink-950">{item.name}</span>{" "}
              <span className="font-mono text-[10px] text-ink-600">
                [{item.ref}]
              </span>
              <span className="block text-xs text-ink-600">{item.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink-500">
          Sources cited
        </p>
        <div className="flex flex-wrap gap-1.5">
          {sources.map((s, i) => (
            <SourceChip
              key={s.label}
              index={i + 1}
              kind={s.kind}
              label={s.label}
              highlight={s.highlight}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
