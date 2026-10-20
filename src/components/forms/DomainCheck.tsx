"use client";

import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { cn } from "@/lib/cn";

const domainRe = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;

export const DOMAIN_KEY = "medaka:domain";

/**
 * A single domain field that hands off to the free audit page.
 * The domain is passed through sessionStorage, not the URL, and nothing is sent anywhere.
 */
export function DomainCheck({
  buttonLabel = "Check your domain",
  tone = "light",
  className,
}: {
  buttonLabel?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const router = useRouter();
  const id = useId();
  const [error, setError] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("domain") ?? "").trim();
    if (!domainRe.test(value)) {
      setError("Enter a domain, for example yourfirm.co.uk.");
      return;
    }
    setError("");
    try {
      sessionStorage.setItem(DOMAIN_KEY, value);
    } catch {
      // Storage can be blocked. The audit page then simply opens empty.
    }
    router.push("/free-audit#request");
  }

  return (
    <form onSubmit={onSubmit} noValidate className={className}>
      <label htmlFor={`${id}-domain`} className="sr-only">
        Company domain
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={`${id}-domain`}
          name="domain"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="yourfirm.co.uk"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={cn(
            "h-12 min-w-0 flex-1 rounded-md border px-4 text-base",
            tone === "light"
              ? "border-[#131c27]/25 bg-white text-[#0e1620] placeholder:text-[#5b6a7e]"
              : "border-[#131c27]/20 bg-[#f4f2eb] text-[#0e1620] placeholder:text-[#5b6a7e]",
          )}
        />
        <button
          type="submit"
          data-magnetic
          className="inline-flex h-12 items-center justify-center rounded-md bg-cta px-6 text-base font-medium text-white transition-colors hover:bg-cta-hover"
        >
          {buttonLabel}
        </button>
      </div>
      {error && (
        <p id={`${id}-err`} role="alert" className="mt-2 text-sm text-copper-700">
          {error}
        </p>
      )}
    </form>
  );
}
