import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Hanken_Grotesk } from "next/font/google";
import { ScrollThread } from "@/components/brand/ScrollThread";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
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
  openGraph: {
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
  themeColor: "#133620",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en-GB"
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
    >
      <body className="forest flex min-h-screen flex-col bg-paper text-ink-900 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-cream focus:px-4 focus:py-2 focus:text-[#0e2918]"
        >
          Skip to content
        </a>
        <Header />
        <ScrollThread />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
