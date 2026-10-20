import type { Metadata } from "next";

/** Explicit URL first, then the Vercel deployment host, then local development. */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const host =
    process.env.VERCEL_ENV === "production"
      ? (process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL)
      : process.env.VERCEL_URL;
  return host ? `https://${host}` : "http://localhost:3000";
}

export const site = {
  name: "Medaka",
  tagline: "AI visibility monitoring for UK finance firms",
  description:
    "Medaka monitors how AI engines answer your buyers' questions, shows how your firm appears and turns the findings into actions. By SEOptimist.",
  url: resolveSiteUrl(),
  /** Preview deployments must not be indexed; everything else (production, local build) may be. */
  indexable: !process.env.VERCEL_ENV || process.env.VERCEL_ENV === "production",
} as const;

/** Company wording, as published on the SEOptimist website. */
export const legal = {
  product: "Medaka is a product by SEOptimist.",
  company:
    "SEOptimist is a trading name of Web Pebble Ltd, registered in England and Wales, company number 07926157.",
  office: "Registered office: 26 Hertingfordbury Road, Hertford, SG14 1JX.",
} as const;

/** The five AI engines tested in the free audit. */
export const engineNames = [
  "ChatGPT",
  "Claude",
  "Gemini",
  "Perplexity",
  "Google AI Overviews",
] as const;

export const engineSentence =
  "Medaka asks ChatGPT, Claude, Gemini, Perplexity and Google AI Overviews the questions your buyers ask.";

export const publicPagesStatement =
  "Medaka reads only your public pages: no logins, no analytics access and nothing about your customers.";

export const nav = [
  { label: "Free audit", href: "/free-audit" },
  { label: "Platform", href: "/platform" },
  { label: "Services", href: "/services" },
  { label: "Trust", href: "/trust" },
  { label: "Members", href: "/members" },
] as const;

export const footerLinks = {
  explore: [
    { label: "Free audit", href: "/free-audit" },
    { label: "Platform", href: "/platform" },
    { label: "Services", href: "/services" },
    { label: "Trust", href: "/trust" },
    { label: "Members", href: "/members" },
  ],
  company: [
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
  ],
} as const;

export const routes = [
  "/",
  "/free-audit",
  "/platform",
  "/services",
  "/trust",
  "/members",
  "/contact",
  "/legal/privacy",
  "/legal/terms",
] as const;

/** Pages kept out of search results and the sitemap. */
export const noindexRoutes: readonly string[] = ["/members", "/legal/privacy", "/legal/terms"];

export const ILLUSTRATIVE = "Example. Illustrative data.";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  noindex,
}: PageMeta): Metadata {
  const shareTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: site.name,
      title: shareTitle,
      description,
      url: path,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.tagline }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: ["/opengraph-image"],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
