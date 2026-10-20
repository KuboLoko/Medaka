import { Sparkles } from "lucide-react";
import { SourceChip } from "./SourceChip";
import { cn } from "@/lib/cn";

type Source = {
  label: string;
  kind?: "site" | "page" | "article" | "directory";
  highlight?: boolean;
};

/**
 * An illustrative AI answer with numbered source references, laid out with room to breathe.
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
    <div className={cn("space-y-6", className)}>
      <div>
        <p className="text-xs font-medium text-ink-500">Buyer question</p>
        <p className="mt-2 text-base font-medium leading-snug text-ink-950">“{question}”</p>
      </div>

      <div className="rounded-xl border border-line bg-white/70 p-5 sm:p-6">
        <p className="flex items-center gap-1.5 text-xs font-medium text-ink-600">
          <Sparkles aria-hidden className="h-3.5 w-3.5 text-copper-600" />
          {engine} answer
        </p>
        <p className="mt-3 text-sm leading-relaxed text-ink-800">{intro}</p>
        <ol className="mt-5 space-y-2.5">
          {shortlist.map((item, i) => (
            <li
              key={item.name}
              className={cn(
                "flex items-start gap-3.5 rounded-lg border px-4 py-3 text-sm",
                item.you ? "border-flame/40 bg-copper-100/60" : "border-transparent bg-sand/60",
              )}
            >
              <span className="mt-0.5 font-mono text-xs text-ink-500">{i + 1}</span>
              <span className="min-w-0">
                <span className="font-medium text-ink-950">{item.name}</span>{" "}
                <sup className="font-mono text-[10px] text-ink-600">[{item.ref}]</sup>
                <span className="mt-0.5 block text-xs leading-relaxed text-ink-600">{item.note}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <p className="text-xs font-medium text-ink-500">Sources cited</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
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
