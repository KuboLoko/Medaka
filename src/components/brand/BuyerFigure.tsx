import { ILLUSTRATIVE } from "@/lib/site";

/**
 * The start of the story: a finance director and the question they put to an AI engine.
 * A geometric figure in deep slate on a frosted card, with one orange accent.
 */
export function BuyerFigure() {
  return (
    <figure data-spotlight className="surface-glass overflow-hidden">
      <svg
        viewBox="0 0 300 230"
        className="block h-auto w-full"
        aria-hidden
        focusable="false"
      >
        <defs>
          <linearGradient id="bf-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe7d9" />
            <stop offset="1" stopColor="#f7f5f0" />
          </linearGradient>
        </defs>
        <rect width="300" height="230" fill="url(#bf-sky)" />
        <circle cx="236" cy="52" r="26" fill="var(--color-flame)" opacity="0.9" />
        <circle cx="150" cy="70" r="36" fill="var(--color-ink-900)" />
        <path
          d="M62 230 C 62 160, 100 124, 150 124 C 200 124, 238 160, 238 230 Z"
          fill="var(--color-ink-900)"
        />
        <path d="M143 128 L157 128 L163 230 L137 230 Z" fill="var(--color-flame)" />
        <rect
          x="178"
          y="170"
          width="64"
          height="44"
          rx="4"
          fill="#ffffff"
          stroke="var(--color-ink-900)"
          strokeWidth="3"
        />
        <path d="M188 186 H232 M188 196 H220" stroke="var(--color-ink-300)" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <figcaption className="space-y-2 p-5">
        <p className="inline-block rounded bg-night px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-cream">
          Finance director
        </p>
        <p className="text-lg leading-snug text-ink-900">
          Which UK firms would you recommend for [your service]?
        </p>
        <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-500">
          {ILLUSTRATIVE}
        </p>
      </figcaption>
    </figure>
  );
}
