import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Gently sways the tail. Respects reduced motion via CSS. */
  animated?: boolean;
  /** The pupil follows the cursor (mouse only, no reduced motion). Wordless, so the fish never has to speak. */
  eyes?: boolean;
  title?: string;
};

/**
 * The medaka: a small orange fish whose eye sits high on the head.
 * Drawn on a 100 x 60 grid so the tail can pivot at (68, 30).
 */
export function MedakaMark({ className, animated, eyes, title }: Props) {
  return (
    <svg
      viewBox="0 0 100 60"
      className={cn(animated && "fish-live", className)}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...(eyes ? { "data-fish-eyes": "" } : {})}
    >
      <path
        d="M6 32 C 20 11, 52 9, 70 30 C 52 53, 20 53, 6 32 Z"
        fill="var(--color-flame)"
      />
      <path
        className="fish-tail"
        d="M66 30 L 96 12 C 92 24, 92 36, 96 48 Z"
        fill="var(--color-flame)"
      />
      <circle cx="24" cy="22" r="6.4" fill="#f2f2ea" />
      <circle className="fish-pupil" cx="25.5" cy="21.5" r="3" fill="#0e1620" />
    </svg>
  );
}
