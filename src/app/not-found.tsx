import { MedakaMark } from "@/components/brand/MedakaMark";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Layout";

export const metadata = { title: "Page not found" };

/** A plain, precise empty state. The fish is here, but it does not speak. */
export default function NotFound() {
  return (
    <div className="py-24 sm:py-32">
      <Container>
        <div className="max-w-xl">
          <MedakaMark eyes className="h-10 w-16" />
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.14em] text-copper-600">
            404
          </p>
          <h1 className="font-display mt-3 text-balance text-4xl leading-[1.06] sm:text-6xl">
            This page is not here.
          </h1>
          <p className="mt-5 text-lg text-ink-600">
            The link may be old, or the address may have a typo.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" size="lg">
              Back to the homepage
            </ButtonLink>
            <ButtonLink href="/free-audit" variant="secondary" size="lg">
              Run a free audit
            </ButtonLink>
          </div>
        </div>
      </Container>
    </div>
  );
}
