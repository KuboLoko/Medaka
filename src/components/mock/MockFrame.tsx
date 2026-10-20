import { ArrowUpRight } from "lucide-react";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ILLUSTRATIVE } from "@/lib/site";

/**
 * Wrapper for every illustrative interface: a flat, bordered panel with a quiet header.
 * It always carries the "illustrative" label so no mock can be mistaken for real data.
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
  const titleId = useId();
  return (
    <figure
      aria-labelledby={titleId}
      className={cn("light surface-light overflow-hidden text-ink-900", className)}
    >
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5 sm:px-6">
        <span className="flex min-w-0 items-center gap-2.5 text-sm font-medium text-ink-800">
          <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-flame" />
          <span id={titleId} className="truncate">{title}</span>
        </span>
        <span className="shrink-0 rounded-full border border-line px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.1em] text-ink-500">
          Example
        </span>
      </div>
      <div className={cn("p-5 sm:p-6", bodyClassName)}>{children}</div>
      <figcaption className="border-t border-line px-5 py-3 font-mono text-[10.5px] uppercase tracking-[0.1em] text-ink-500 sm:px-6">
        {label}
      </figcaption>
    </figure>
  );
}

type Tone = "neutral" | "good" | "watch";

/** A small change indicator: a pill, with an arrow when the change is good. */
export function Delta({ children, tone = "neutral" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium leading-snug",
        tone === "good" && "bg-water-100 text-water-700",
        tone === "watch" && "bg-copper-100 text-copper-700",
        tone === "neutral" && "bg-sand text-ink-700",
      )}
    >
      {tone === "good" && <ArrowUpRight aria-hidden className="h-3 w-3" />}
      {children}
    </span>
  );
}

/** A clean metric: label, a large number, and an optional change pill. Render inside a `dl`. */
export function StatTile({
  label,
  value,
  suffix,
  note,
  tone = "neutral",
}: {
  label: string;
  value: string;
  suffix?: string;
  note?: string;
  tone?: Tone;
}) {
  return (
    <div className="min-w-0">
      <dt className="text-sm text-ink-600">{label}</dt>
      <dd className="font-display mt-2 flex items-baseline gap-1.5 text-[2.5rem] leading-none text-ink-950">
        {value}
        {suffix && <span className="font-sans text-sm text-ink-500">{suffix}</span>}
      </dd>
      {note && (
        <dd className="mt-3">
          <Delta tone={tone}>{note}</Delta>
        </dd>
      )}
    </div>
  );
}

/** A flat panel for a chart or list inside a dashboard. */
export function Panel({
  title,
  sub,
  as: Heading = "h3",
  className,
  children,
}: {
  title: string;
  sub?: string;
  as?: "h3" | "h4";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("min-w-0 rounded-xl border border-line bg-white/60 p-5 sm:p-6", className)}>
      <header className="mb-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <Heading className="text-sm font-medium text-ink-950">{title}</Heading>
        {sub && <p className="text-xs text-ink-500">{sub}</p>}
      </header>
      {children}
    </section>
  );
}
