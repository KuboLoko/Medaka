import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Layout";
import { footerLinks } from "@/lib/site";
import { LegalNotice } from "./LegalNotice";

function LinkList({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <nav aria-label={title}>
      <h2 className="font-mono text-xs uppercase tracking-[0.14em] text-ink-500">
        {title}
      </h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-sm text-ink-900 hover:underline underline-offset-4">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="tone-deep py-16">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-ink-600">
              Medaka by SEOptimist. AI visibility monitoring for UK finance firms.
            </p>
          </div>
          <LinkList title="Explore" links={footerLinks.explore} />
          <LinkList title="Company" links={footerLinks.company} />
        </div>
        <div className="mt-14 border-t border-line pt-6 text-xs leading-relaxed text-ink-500">
          <LegalNotice />
          <p className="mt-2">
            © {new Date().getFullYear()} SEOptimist. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
