import Link from "next/link";
import { MedakaMark } from "./MedakaMark";
import { cn } from "@/lib/cn";

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="medaka, home"
      className={cn(
        "fish-hover group inline-flex items-center gap-2.5 text-ink-900",
        className,
      )}
    >
      <MedakaMark className="h-5 w-8" />
      <span className="font-display text-[1.7rem] font-normal leading-none">
        medaka
      </span>
    </Link>
  );
}
