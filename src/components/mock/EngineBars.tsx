import { cn } from "@/lib/cn";
import { Status } from "@/components/story/Status";
import { engineStats } from "./data";

/**
 * Answers naming the firm, engine by engine: a monogram, a bar scaled to the share of
 * answers, the count, and a status badge. Illustrative data only.
 */
export function EngineBars({ className }: { className?: string }) {
  return (
    <ul aria-label="Answers naming the firm, by engine" className={cn("divide-y divide-line", className)}>
      {engineStats.map((e) => (
        <li
          key={e.name}
          className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2.5 py-3.5 sm:grid-cols-[11.5rem_1fr_auto]"
        >
          <span className="flex min-w-0 items-center gap-3 text-sm text-ink-900 sm:order-1">
            <span
              aria-hidden
              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-night font-mono text-[9px] text-cream"
            >
              {e.mark}
            </span>
            <span className="truncate">{e.name}</span>
          </span>
          <span className="order-3 col-span-2 flex items-center gap-3 sm:order-2 sm:col-span-1">
            <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-900/[0.07]">
              <span
                className="block h-full rounded-full bg-flame"
                style={{ width: `${(e.named / e.total) * 100}%` }}
              />
            </span>
            <span className="w-[4.5rem] shrink-0 text-right font-mono text-xs text-ink-700">
              {e.named} of {e.total}
            </span>
          </span>
          <span className="order-2 sm:order-3">
            <Status state={e.named > 0 ? "Named" : "Not named"} />
          </span>
        </li>
      ))}
    </ul>
  );
}
