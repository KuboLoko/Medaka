import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

/**
 * page: the plain page. raise: a soft warm-grey band. deep: a deep charcoal band with light text.
 * light: a pale panel (used to reset the scope inside a charcoal band).
 */
type Tone = "page" | "raise" | "deep" | "light";

const tones: Record<Tone, string> = {
  page: "",
  raise: "tone-raise",
  deep: "slate",
  light: "light",
};

export function Section({
  id,
  tone = "page",
  className,
  labelledBy,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("py-20 sm:py-28", tones[tone], className)}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  id,
  eyebrow,
  title,
  intro,
  as: Heading = "h2",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <header data-reveal className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-copper-600">
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className="font-display text-balance text-4xl leading-[1.06] sm:text-5xl lg:text-[3.5rem]"
      >
        {title}
      </Heading>
      {intro && (
        <p className="text-pretty mt-5 text-lg leading-relaxed text-ink-600">
          {intro}
        </p>
      )}
    </header>
  );
}

/** Generic page intro used by the secondary routes. */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-line pt-16 pb-16 sm:pt-24 sm:pb-20">
      <Container>
        <SectionHeader as="h1" eyebrow={eyebrow} title={title} intro={intro} />
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </div>
  );
}
