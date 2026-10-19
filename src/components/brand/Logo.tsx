import Link from "next/link";
import { MedakaMark } from "./MedakaMark";
import { cn } from "@/lib/cn";

type Props = { inverse?: boolean; className?: string };

export function Logo({ inverse, className }: Props) {
  return (
    <Link
      href="/"
      aria-label="Medaka, home"
      className={cn(
        "fish-hover group inline-flex items-center gap-2.5",
        inverse ? "text-paper" : "text-ink-900",
        className,
      )}
    >
      <MedakaMark className="h-6 w-10" inverse={inverse} />
      <span className="font-display text-[1.45rem] font-medium leading-none tracking-tight">
        Medaka
      </span>
    </Link>
  );
}
