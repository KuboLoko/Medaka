"use client";

import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type Errors = Partial<Record<"email" | "domain" | "consent", string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const domainRe = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/.*)?$/i;

const field =
  "mt-1.5 w-full rounded-md border border-ink-900/25 bg-white px-3.5 py-2.5 text-base text-ink-950 placeholder:text-ink-500 aria-[invalid=true]:border-copper-600";

/**
 * UI-only for now. It validates, then says plainly that nothing was sent.
 * Wire it to a server action when the delivery route is agreed.
 */
export function AuditForm() {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const next: Errors = {};
    if (!emailRe.test(String(data.get("email") ?? "").trim()))
      next.email = "Enter a valid work email address.";
    if (!domainRe.test(String(data.get("domain") ?? "").trim()))
      next.domain = "Enter your company domain, for example yourfirm.co.uk.";
    if (!data.get("consent"))
      next.consent = "Please confirm you have read the privacy policy.";
    setErrors(next);
    setDone(Object.keys(next).length === 0);
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor={`${id}-email`} className="text-sm font-medium text-ink-950">
          Work email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          className={field}
          placeholder="name@yourfirm.co.uk"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? `${id}-email-err` : undefined}
        />
        {errors.email && (
          <p id={`${id}-email-err`} className="mt-1.5 text-sm text-copper-700">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-domain`} className="text-sm font-medium text-ink-950">
          Company domain
        </label>
        <input
          id={`${id}-domain`}
          name="domain"
          type="text"
          inputMode="url"
          autoComplete="url"
          required
          className={field}
          placeholder="yourfirm.co.uk"
          aria-invalid={!!errors.domain}
          aria-describedby={errors.domain ? `${id}-domain-err` : undefined}
        />
        {errors.domain && (
          <p id={`${id}-domain-err`} className="mt-1.5 text-sm text-copper-700">
            {errors.domain}
          </p>
        )}
      </div>

      <div>
        <label htmlFor={`${id}-area`} className="text-sm font-medium text-ink-950">
          Main service or product area{" "}
          <span className="font-normal text-ink-600">(optional)</span>
        </label>
        <input
          id={`${id}-area`}
          name="area"
          type="text"
          className={field}
          placeholder="For example, corporate pensions"
        />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={`${id}-consent`}
            name="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 accent-copper-600"
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? `${id}-consent-err` : undefined}
          />
          <label htmlFor={`${id}-consent`} className="text-sm text-ink-700">
            I have read the{" "}
            <Link href="/legal/privacy" className="underline underline-offset-4 hover:text-copper-600">
              privacy policy
            </Link>{" "}
            and agree that Medaka may use these details to prepare and send my audit.
          </label>
        </div>
        {errors.consent && (
          <p id={`${id}-consent-err`} className="mt-1.5 text-sm text-copper-700">
            {errors.consent}
          </p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Request your free audit
      </Button>

      <div aria-live="polite">
        {done && (
          <p
            role="status"
            className="rounded-md border border-line bg-sand px-4 py-3 text-sm text-ink-800"
          >
            Thank you. This form is not connected yet, so nothing has been sent.
            It will be connected before launch.
          </p>
        )}
      </div>
    </form>
  );
}
