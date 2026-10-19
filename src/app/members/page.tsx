import Link from "next/link";
import { PlaceholderForm } from "@/components/forms/PlaceholderForm";
import { Container } from "@/components/ui/Layout";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Members",
  description: "Sign in to the Medaka members area.",
  path: "/members",
  noindex: true,
});

export default function MembersPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-md">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-copper-600">
            Members
          </p>
          <h1 className="font-display text-4xl leading-tight sm:text-5xl">
            Sign in to Medaka.
          </h1>
          <p className="mt-4 text-ink-600">
            For clients with a monthly monitoring plan. Sign-in is not switched
            on yet.
          </p>
          <div className="mt-8 light rounded-[var(--radius-card)] border border-line bg-paper-soft p-6 shadow-[var(--shadow-card)] sm:p-8">
            <PlaceholderForm
              fields={[
                { name: "email", label: "Work email", type: "email", autoComplete: "email", required: true },
                { name: "password", label: "Password", type: "password", autoComplete: "current-password", required: true },
              ]}
              submitLabel="Sign in"
              notice="Sign-in is not available yet. Nothing has been sent or stored."
            />
          </div>
          <p className="mt-6 text-sm text-ink-600">
            Not a member yet?{" "}
            <Link href="/free-audit" className="underline underline-offset-4 hover:text-copper-600">
              Start with a free audit
            </Link>
            .
          </p>
        </div>
      </Container>
    </div>
  );
}
