# Medaka website

First version of the Medaka marketing site. Medaka is AI visibility monitoring for UK finance firms, built by SEOptimist.

Static-first Next.js (App Router), TypeScript and Tailwind CSS 4. No backend, database, authentication or AI integrations yet.

## Run locally

Requires Node 20 or later.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage: the full story, from buyer question to monitoring |
| `/free-audit` | Free audit explanation and form |
| `/platform` | Platform, monthly monitoring, members area example |
| `/services` | SEOptimist services |
| `/trust` | Data sovereignty, security and trust |
| `/members` | Sign-in placeholder (UI only, noindex) |
| `/contact` | Contact form (UI only) |
| `/legal/privacy`, `/legal/terms` | Placeholders pending legal review |

`sitemap.xml`, `robots.txt`, an Open Graph image and a favicon are generated from `src/app`.

## Structure

```
src/
  app/                 Routes, metadata, sitemap, robots, OG image
  components/
    brand/             MedakaMark (the fish), Logo, FishIllustration
    layout/            Header, Footer
    ui/                Button, Container/Section/SectionHeader/PageHero, Reveal (motion)
    mock/              Illustrative interfaces: MockFrame, AnswerCard, SourceChip,
                       TrendChart, PageOpportunityCard, HeroPreview, MonthlyReport,
                       PlatformDashboard, plus data.ts (all sample content)
    home/              Homepage sections
    forms/             AuditForm, PlaceholderForm (UI only)
  lib/                 site config, helpers
```

## Design system

Direction follows the medaka-v3 reference video: deep forest green, cream text, a single orange accent, a lowercase wordmark and light, tightly tracked headlines (Hanken Grotesk). Tokens live in `src/app/globals.css`. Two scopes share the same token names: `.forest` (page default) and `.light` (pale cards and panels), so components use the same classes in both.

Every mock interface is rendered inside `MockFrame`, which always shows an "Illustrative data" label. Sample content is in `src/components/mock/data.ts` and uses generic placeholders such as "Firm A", never real firm names.

Motion is restrained: scroll reveals (Framer Motion) and a small CSS tail sway on the fish. Both honour `prefers-reduced-motion`.

## Depth and motion

Atmosphere: a tiled SVG film grain on one fixed layer (`body::after`, no blend mode), warm `.glow` blooms behind the answer box, the ChatGPT card, the loop cards and the selected pricing plan, layered card shadows (`--shadow-card`), `.surface-light` for pale cards and `.surface-glass` (translucent, `backdrop-filter`) for dark ones. Inside `.forest`, `--color-line` is a translucent white, so every hairline reads as a glass edge.

Background: two fixed layers of faint wave lines (vector tiles, about 14 KB, sharp at any pixel density) slide sideways in opposite directions at about 24 and 16 px a second (60 s and 90 s per tile) (`.waves` in `globals.css`). Only `transform` is animated, and each tile loops seamlessly. The tinted bands (`tone-raise`, `tone-deep`) are translucent so the waves show through, and the light sections stay clean. Headings and copy carry a soft halo in the band's own colour (`--scrim`) so the lines fade out right behind the text. Panels and chips with their own background opt out with `no-halo`, `.light` or `.surface-glass`. With reduced motion the waves stay still.

Choreography (`src/components/story/`, `src/lib/reveals.ts`, `src/components/layout/Interactions.tsx`):

- Floating reveal (`[data-reveal]`, `src/lib/reveals.ts`): blocks rise through a short drift, sway from side to side with a swing that dies away, and settle exactly in place. The motion is tied to the scroll with a little lag and plays once. A layout-level `Reveals` runs it on every page, again on each navigation.
- `SplitHeading`: words or characters wrapped for a staggered rise. The hero plays as pure CSS at load. Section titles are revealed by GSAP on scroll. The heading keeps an `aria-label` and the spans are `aria-hidden`.
- `ThreadStory`: the medaka turns with the curve, drifts, and beats its tail faster when you scroll faster. Dots along the thread light up as it passes. Once a branch arrives, light pulses run along it, a ripple leaves the card and its status badge pops in. Hovering a card repeats the ripple.
- `ChatStream`: the prompt types, the search chips appear and the answer streams in word by word, scrubbed by scroll.
- Engine table: row highlight and a glow on the engine mark on hover, and counters that tick up (`data-tick`).
- `CheckSection`: a curved cream mask (an ellipse clip-path) rises over the forest canvas.
- `Interactions`: one pair of listeners gives every `[data-spotlight]` card a cursor-following light and every `[data-magnetic]` button a spring-back pull. Mouse only.

Rules kept: every effect lives in `gsap.matchMedia()` or `gsap.context()`, so tweens, triggers, set values, the ticker and listeners are reverted on unmount. Reduced motion gets the finished state with nothing hidden or animated. The thread overlay, pin and particles are desktop only. `will-change` is used only on the moving fish.
## Forms

The audit, contact and members forms are UI only. They validate, then state plainly that nothing was sent or stored. Connect them to a server action or email provider in a later phase.

## Environment

Copy `.env.example` to `.env.local` if needed. Never commit a real `.env`. `NEXT_PUBLIC_SITE_URL` sets the canonical URL for metadata and the sitemap.

## Deployment (not done yet)

The project is ready for Vercel: import the GitHub repository, set `NEXT_PUBLIC_SITE_URL`, deploy. Nothing has been deployed.

## To confirm before publishing

Verified against the SEOptimist website and already applied: the five engines, company and registered-office wording (`src/lib/site.ts`), the free audit process, the public-pages statement, the five trust statements and the James Finlayson attribution.

Homepage scrollytelling (`src/components/story/`): GSAP ScrollTrigger draws one thread from the hero to the ChatGPT card, splits it into four source branches and merges them into the answer, led by a small medaka. The monthly loop is pinned and scrubbed on large screens. Everything uses `gsap.matchMedia()`: below 1024px, or with `prefers-reduced-motion: reduce`, the page is a plain stacked layout with no overlay, no pin and nothing hidden. Triggers are cleaned up on unmount.

Must be verified before publishing (copied from the medaka-v3 reference, all marked as examples on the page):

- Pricing (Firm £149, Agency £399, Enterprise from £1,200) and the feature lists under each plan. The "Start monitoring" buttons go to `/free-audit`; there is no checkout.
- The competitor comparison (`src/components/story/AlternativesTable.tsx`): AirOps, Lumar and the agency retainer rows have unverified prices and descriptions. Each needs the supplier's own published price, the source page and the date read, or the row should be removed.
- Hero copy "Free, about a minute, no sign-up": the audit form asks for a work email, so "no sign-up" and "about a minute" need confirming.
- "When web search is on, it runs real searches at the moment of asking" (ChatGPT section) is a claim about third-party behaviour.
- "We keep your domain for your audit" (closing section) is a data-handling statement.
- The homepage no longer shows the Platform, Services, Trust or name sections. They remain at their own routes and in the footer.

Still open:

- Trust: nothing is stated about data storage location, encryption, certifications, compliance frameworks or human review. Add only what the client explicitly approves (`src/components/home/TrustSection.tsx`).
- Monthly monitoring copy names the same five engines as the audit. Confirm the monitored engines match.
- Direct contact details for `/contact` (email, phone, booking link). None have been invented.
- Privacy policy and terms: placeholders only, marked "Full privacy policy and terms are being prepared."
- Mock dashboards name the five engines with example statuses, all labelled "Example. Illustrative data."
