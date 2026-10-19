import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "quiet";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium whitespace-nowrap transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-cta text-white hover:bg-cta-hover",
  secondary:
    "border border-ink-900/30 text-ink-900 hover:border-ink-900 hover:bg-ink-900/10",
  quiet: "text-ink-900 hover:text-copper-600 underline-offset-4 hover:underline",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

type StyleProps = { variant?: Variant; size?: Size; className?: string };

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: StyleProps) {
  return cn(base, variants[variant], variant !== "quiet" && sizes[size], className);
}

export function ButtonLink({
  href,
  children,
  ...style
}: StyleProps & { href: string; children: ReactNode }) {
  return (
    <Link href={href} className={buttonClasses(style)}>
      {children}
    </Link>
  );
}

export function Button({
  variant,
  size,
  className,
  children,
  ...rest
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={buttonClasses({ variant, size, className })}
      {...rest}
    >
      {children}
    </button>
  );
}
