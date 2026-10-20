"use client";

import { useLayoutEffect, useRef } from "react";
import { DomainCheck } from "@/components/forms/DomainCheck";
import { Container } from "@/components/ui/Layout";
import { SplitHeading } from "@/components/ui/SplitHeading";
import { MedakaMark } from "@/components/brand/MedakaMark";
import { gsap, MOTION_ANY } from "@/lib/gsap";
import { publicPagesStatement } from "@/lib/site";

/**
 * The light close. A cream dome rises from the bottom edge of the section as it arrives:
 * a curved mask that widens until the whole panel is revealed, with a faint warm light
 * along its rim. The heading and the domain form then settle in. With reduced motion the
 * finished cream section is simply there.
 */
export function CheckSection() {
  const root = useRef<HTMLElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const rim = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || !bg.current || !content.current || !rim.current) return;
    const mm = gsap.matchMedia(el);
    mm.add(MOTION_ANY, () => {
      gsap.fromTo(
        bg.current,
        { clipPath: "ellipse(62% 0% at 50% 100%)" },
        {
          clipPath: "ellipse(150% 118% at 50% 100%)",
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 100%", end: "top 12%", scrub: true },
        },
      );
      gsap.fromTo(
        rim.current,
        { opacity: 0.9, scaleY: 0.2 },
        {
          opacity: 0,
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 100%", end: "top 12%", scrub: true },
        },
      );
      gsap.fromTo(
        content.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 62%", end: "top 24%", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      id="check"
      ref={root}
      aria-labelledby="check-title"
      className="relative flex min-h-[92vh] items-center overflow-hidden"
    >
      <div ref={bg} aria-hidden className="slate absolute inset-0" />
      <div
        ref={rim}
        aria-hidden
        className="glow inset-x-[-10%] bottom-0 h-[70%] origin-bottom"
        style={{ opacity: 0 }}
      />
      <div ref={content} className="slate relative w-full bg-transparent py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <SplitHeading
              id="check-title"
              text="Which answers name you?"
              className="font-display text-balance text-4xl leading-[1.04] sm:text-6xl"
            />
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
