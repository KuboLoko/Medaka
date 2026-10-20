import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Hanken_Grotesk } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Interactions } from "@/components/layout/Interactions";
import { Reveals } from "@/components/story/Reveals";
import { site } from "@/lib/site";
import "./globals.css";

const sans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const display = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Medaka | AI visibility monitoring for UK finance firms",
    template: "%s | Medaka",
  },
  description: site.description,
  applicationName: "Medaka",
  authors: [{ name: "SEOptimist" }],
  alternates: { canonical: "/" },
  ...(site.indexable ? {} : { robots: { index: false, follow: false } }),
  openGraph: {
    url: "/",
    type: "website",
    locale: "en_GB",
    siteName: "Medaka",
    title: "Medaka | AI visibility monitoring for UK finance firms",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Medaka | AI visibility monitoring for UK finance firms",
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: "SEOptimist",
      legalName: "Web Pebble Ltd",
      url: site.url,
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      description: site.description,
      url: site.url,
      inLanguage: "en-GB",
      publisher: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
    >
      <body className="flex min-h-screen flex-col text-ink-900 antialiased">
        <div aria-hidden className="waves" />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-night focus:px-4 focus:py-2 focus:text-cream"
        >
          Skip to content
        </a>
        <Header />
        <Interactions />
        <main id="main" tabIndex={-1} className="flex-1 overflow-x-clip outline-none">
          <Reveals>{children}</Reveals>
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
