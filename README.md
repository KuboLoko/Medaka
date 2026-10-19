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
