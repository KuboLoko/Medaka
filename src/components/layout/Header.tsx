"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { buttonClasses } from "@/components/ui/Button";
import { nav } from "@/lib/site";
import { cn } from "@/lib/cn";

type NavItem = { label: string; href: string };

/** The homepage tells one story, so its header is kept to three anchors and one action. */
const homeNav: NavItem[] = [
  { label: "How it works", href: "#how-it-works" },
  { label: "The loop", href: "#loop" },
  { label: "By SEOptimist", href: "/services" },
];

export function Header() {
  // The menu is open only for the page it was opened on, so navigating closes it.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const pathname = usePathname();
  const open = openAt === pathname;
  const setOpen = (next: boolean) => setOpenAt(next ? pathname : null);

  const isHome = pathname === "/";
  const items: NavItem[] = isHome ? homeNav : [...nav];
  const cta = isHome
    ? { label: "Check your domain", href: "#check" }
    : { label: "Run a free audit", href: "/free-audit" };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenAt(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const pill = cn(buttonClasses({ variant: "primary" }), "rounded-full px-5");

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-8">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((item) => {
              const current = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={cn(
                      "rounded-md px-3 py-2 text-sm transition-colors hover:text-copper-600",
                      current ? "font-medium text-ink-950" : "text-ink-700",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {!isHome && (
            <Link
              href="/#how-it-works"
              className={cn(buttonClasses({ variant: "quiet" }), "hidden px-2 text-sm xl:inline-flex")}
            >
              See how it works
            </Link>
          )}
          <Link href={cta.href} className={pill}>
            {cta.label}
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-ink-900/20 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-paper lg:hidden">
          <nav aria-label="Mobile" className="mx-auto max-w-[1200px] px-5 py-4 sm:px-8">
            <ul className="divide-y divide-line">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="block py-3 text-base text-ink-900"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              <Link
                href={cta.href}
                onClick={() => setOpen(false)}
                className={cn(buttonClasses({ variant: "primary", size: "lg" }), "rounded-full")}
              >
                {cta.label}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
