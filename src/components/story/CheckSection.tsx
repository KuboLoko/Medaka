"use client";

import { useLayoutEffect, useRef } from "react";
import { DomainCheck } from "@/components/forms/DomainCheck";
import { Container } from "@/components/ui/Layout";
import { MedakaMark } from "@/components/brand/MedakaMark";
import { gsap, MOTION_ANY } from "@/lib/gsap";
import { publicPagesStatement } from "@/lib/site";

/**
 * The light close. The cream panel opens out as the section arrives,
 * then the domain form fades in. With reduced motion it is simply there.
 */
export function CheckSection() {
  const root = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || !bg.current || !content.current) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_ANY, () => {
      gsap.fromTo(
        bg.current,
        { clipPath: "inset(16% 7% 0% 7% round 40px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 95%", end: "top 30%", scrub: true },
        },
      );
      gsap.fromTo(
        content.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 65%", end: "top 30%", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section id="check" ref={root} aria-labelledby="check-title" className="relative">
      <div ref={bg} aria-hidden className="light absolute inset-0" />
      <div ref={content} className="light relative bg-transparent py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="check-title"
              className="font-display text-balance text-4xl leading-[1.04] sm:text-6xl"
            >
              Which answers name you?
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-ink-600">
              We read only your public pages. We keep your domain for your audit.
            </p>
            <DomainCheck className="mx-auto mt-9 max-w-lg text-left" />
            <p className="mx-auto mt-4 max-w-lg text-sm text-ink-600">
              {publicPagesStatement}
            </p>
            <div className="mt-14 border-t border-line pt-8 text-sm text-ink-600">
              <p className="flex items-center justify-center gap-2.5">
                <MedakaMark className="h-3.5 w-6" />
                <span>
                  medaka means “high eyes”. It sees what the engines see.
                </span>
              </p>
              <p className="mt-3">James Finlayson, AI visibility engineer.</p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
