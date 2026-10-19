import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Gently sways the tail. Respects reduced motion via CSS. */
  animated?: boolean;
  /** Draws the fish in light tones for dark backgrounds. */
  inverse?: boolean;
  title?: string;
};

/**
 * The medaka: a simple line fish whose eye sits high on the head.
 * Drawn on a 100 x 60 grid so the tail can pivot at (68, 30).
 */
export function MedakaMark({ className, animated, inverse, title }: Props) {
  const line = inverse ? "var(--color-paper)" : "var(--color-ink-900)";
  return (
    <svg
      viewBox="0 0 100 60"
      className={cn(animated && "fish-live", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      fill="none"
    >
      <path
        d="M8 32 C 20 12, 52 10, 70 30 C 52 52, 20 52, 8 32 Z"
        stroke={line}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        className="fish-tail"
        d="M68 30 L 94 14 C 91 24, 91 38, 94 48 Z"
        stroke={line}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M30 20 C 38 15, 48 16, 54 21"
        stroke={line}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="23" cy="23" r="4.2" fill="var(--color-copper-500)" />
    </svg>
  );
}
