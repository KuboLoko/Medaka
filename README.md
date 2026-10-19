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

- Exact legal wording for "Medaka is a trading name/product of SEOptimist." (`src/lib/site.ts`).
- Trust copy (`src/components/home/TrustSection.tsx`): each statement describes approach. Check each against how the service will really work, especially data location, data handling and human review.
- The five AI engines to name in the audit (the copy says "five AI engines" without naming them).
- Direct contact details for `/contact`.
- Privacy policy and terms text.
