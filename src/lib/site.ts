import type { Metadata } from "next";

export const site = {
  name: "Medaka",
  tagline: "AI visibility monitoring for UK finance firms",
  description:
    "Medaka monitors how AI engines answer the questions your buyers ask, shows how your firm appears, and turns the findings into practical actions. Built by SEOptimist.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // TODO(client): confirm exact legal wording before publishing.
  legalNote: "Medaka is a trading name/product of SEOptimist.",
} as const;

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
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path },
    twitter: { title, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
