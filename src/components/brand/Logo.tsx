import Link from "next/link";
import { MedakaMark } from "./MedakaMark";
import { cn } from "@/lib/cn";

/**
 * Brand lockup. House rule from the client: the name is never shown without its descriptor
 * and the fish, so all three always travel together.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="medaka, AI visibility monitoring, home"
      className={cn(
        "fish-hover group inline-flex items-center gap-2.5 text-ink-900",
        className,
      )}
    >
      <MedakaMark eyes className="h-5 w-8 shrink-0" />
      <span className="flex flex-col">
        <span className="font-display text-[1.7rem] font-normal leading-none">
          medaka
        </span>
        <span className="mt-1.5 font-mono text-[8.5px] uppercase leading-none tracking-[0.15em] text-ink-600">
          AI visibility monitoring
        </span>
      </span>
    </Link>
  );
}
