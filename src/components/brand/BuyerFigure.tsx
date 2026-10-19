import { ILLUSTRATIVE } from "@/lib/site";

/** The start of the story: a buyer and the question they put to an AI engine. */
export function BuyerFigure() {
  return (
    <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-forest-raise">
      <svg
        viewBox="0 0 300 230"
        className="block h-auto w-full"
        aria-hidden
        focusable="false"
      >
        <rect width="300" height="230" fill="var(--color-forest-raise)" />
        <rect x="36" y="0" width="228" height="126" fill="var(--color-forest-deep)" opacity="0.55" />
        <circle cx="150" cy="70" r="36" fill="var(--color-cream)" />
        <path
          d="M62 230 C 62 160, 100 124, 150 124 C 200 124, 238 160, 238 230 Z"
          fill="var(--color-cream)"
        />
        <path d="M143 128 L157 128 L163 230 L137 230 Z" fill="var(--color-forest-deep)" />
        <rect x="178" y="170" width="64" height="44" rx="4" fill="var(--color-forest-raise)" stroke="var(--color-forest-deep)" strokeWidth="3" />
      </svg>
      <figcaption className="space-y-2 p-5">
        <p className="inline-block rounded bg-cream px-2 py-0.5 font-mono text-[11px] uppercase tracking-[0.08em] text-[#0e2918]">
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
