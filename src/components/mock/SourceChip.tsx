import { FileText, Globe, Newspaper, Library } from "lucide-react";
import { cn } from "@/lib/cn";

const icons = {
  site: Globe,
  page: FileText,
  article: Newspaper,
  directory: Library,
} as const;

export function SourceChip({
  kind = "page",
  label,
  index,
  highlight,
  className,
}: {
  kind?: keyof typeof icons;
  label: string;
  index?: number;
  /** Marks a source that belongs to the firm being monitored. */
  highlight?: boolean;
  className?: string;
}) {
  const Icon = icons[kind];
  return (
    <span
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs",
        highlight
          ? "border-copper-500/50 bg-copper-100 text-copper-700"
          : "border-line bg-paper text-ink-700",
        className,
      )}
    >
      {index !== undefined && (
        <span className="font-mono text-[10px] text-ink-600">[{index}]</span>
      )}
      <Icon aria-hidden className="h-3 w-3 shrink-0" />
      <span className="truncate">{label}</span>
    </span>
  );
}
