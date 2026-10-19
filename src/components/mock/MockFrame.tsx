import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ILLUSTRATIVE } from "@/lib/site";

/**
 * Wrapper for every illustrative interface.
 * Always carries the "illustrative" label so no mock can be mistaken for real data.
 */
export function MockFrame({
  title,
  label = ILLUSTRATIVE,
  className,
  bodyClassName,
  children,
}: {
  title: string;
  label?: string;
  className?: string;
  bodyClassName?: string;
  children: ReactNode;
}) {
  return (
    <figure
      className={cn(
        "light surface-light overflow-hidden text-ink-900",
        className,
      )}
    >
      <div className="flex items-center gap-3 border-b border-line bg-sand/70 px-4 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <i className="h-2 w-2 rounded-full bg-ink-300/70" />
          <i className="h-2 w-2 rounded-full bg-ink-300/70" />
          <i className="h-2 w-2 rounded-full bg-ink-300/70" />
        </span>
        <span className="truncate font-mono text-[11px] uppercase tracking-[0.12em] text-ink-600">
          {title}
        </span>
      </div>
      <div className={cn("p-4 sm:p-5", bodyClassName)}>{children}</div>
      <figcaption className="border-t border-line bg-sand/50 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-600">
        {label}
      </figcaption>
    </figure>
  );
}

export function StatTile({
  label,
  value,
  note,
  tone = "neutral",
}: {
  label: string;
  value: string;
  note?: string;
  tone?: "neutral" | "good" | "watch";
}) {
  return (
    <div className="rounded-lg border border-line bg-paper p-3.5">
      <p className="text-xs text-ink-600">{label}</p>
      <p className="font-display mt-1 text-3xl leading-none text-ink-950">
        {value}
      </p>
      {note && (
        <p
          className={cn(
            "mt-2 text-xs font-medium",
            tone === "good" && "text-water-700",
            tone === "watch" && "text-copper-700",
            tone === "neutral" && "text-ink-600",
          )}
        >
          {note}
        </p>
      )}
    </div>
  );
}
