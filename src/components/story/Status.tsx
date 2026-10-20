import { cn } from "@/lib/cn";

export type SourceState = "Named" | "Cited" | "Not chosen" | "Not named";

/** Status badge. Use inside a light panel. */
export function Status({ state, className }: { state: SourceState; className?: string }) {
  return (
    <span
      className={cn(
        "inline-block shrink-0 rounded px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.06em]",
        state === "Named" && "bg-flame text-[#0e1620]",
        state === "Cited" && "border border-flame text-copper-700",
        (state === "Not chosen" || state === "Not named") && "bg-sand text-ink-600",
        className,
      )}
    >
      {state}
    </span>
  );
}
