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

type Tone = "paper" | "sand" | "ink";

const tones: Record<Tone, string> = {
  paper: "bg-paper text-ink-900",
  sand: "bg-sand text-ink-900",
  ink: "on-ink bg-ink-950 text-paper",
};

export function Section({
  id,
  tone = "paper",
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
  tone = "paper",
  as: Heading = "h2",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: Tone;
  as?: "h1" | "h2";
  className?: string;
}) {
  const dark = tone === "ink";
  return (
    <header className={cn("max-w-3xl", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 font-mono text-xs uppercase tracking-[0.14em]",
            dark ? "text-copper-100" : "text-copper-600",
          )}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className="font-display text-balance text-4xl font-normal leading-[1.08] sm:text-5xl"
      >
        {title}
      </Heading>
      {intro && (
        <p
          className={cn(
            "text-pretty mt-5 text-lg leading-relaxed",
            dark ? "text-ink-200" : "text-ink-600",
          )}
        >
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
    <div className="border-b border-line bg-paper pt-16 pb-16 sm:pt-24 sm:pb-20">
      <Container>
        <SectionHeader as="h1" eyebrow={eyebrow} title={title} intro={intro} />
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </div>
  );
}
