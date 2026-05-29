'use client';

import React, { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinnedRef  = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Reduced-motion path:
  // - GSAP pin + smooth fade is skipped (any motion is opt-out).
  // - Use `visibility` instead of `opacity` to hide the text: Stawan's
  //   globals.css rule at b6dec5b force-overrides any inline `opacity: 0`
  //   to 1 on reduced-motion machines, which used to keep our copy
  //   permanently visible. `visibility` isn't caught by that selector.
  // - Toggle visibility on a tiny scroll threshold so the UX flow still
  //   matches: bare video first, then text snaps in once the user starts
  //   scrolling, then the hero scrolls past normally (text "disappears"
  //   with the section). No transition — instant snap is fine under WCAG
  //   reduced-motion guidance because visibility changes aren't motion.
  const reducedMotion = useReducedMotion();

  // `visible` gates the inline `visibility` style. CSS can't override
  // `visibility`, so starting `false` guarantees no first-paint flash
  // regardless of media-query state.
  //
  // The ScrollTrigger below drives the flip:
  //   normal motion  -> onUpdate fades opacity 0->1 across the pinned
  //                     scroll; we just flip visible to true on mount so
  //                     opacity is what's gating the reveal.
  //   reduced motion -> onUpdate flips visible at 10% of pin progress.
  //                     No transitions, no scrub — just an instant snap
  //                     inside the still-pinned hero.
  const [visible, setVisible] = useState(false);

  // 2-stage hero behaviour:
  //   1st scroll  -> wordmark + paragraph fade up inside the visually
  //                   pinned video (rest of the page does not move yet).
  //   2nd scroll  -> pin releases, page continues into the next section.
  //
  // Pattern mirrors Methodology: the pinned element is an INNER div of the
  // section (not the section itself), wrapped in a compositing-layer hack
  // so the ScrollTrigger pin counter-transform and the ScrollSmoother
  // parent transform share the same sub-pixel rounding origin (eliminates
  // 1-px flicker on Windows / 125 % DPI). pinType: 'transform' is required
  // because we're inside the ScrollSmoother content wrapper.
  useGSAP(() => {
    if (reducedMotion === null) return; // wait for matchMedia
    const trigger = pinnedRef.current;
    const content = contentRef.current;
    if (!trigger || !content) return;

    // Unblock visibility for both paths once we know the preference.
    // Reduced-motion users will get re-hidden inside onUpdate below until
    // they cross the 10 % pin-progress threshold.
    setVisible(true);

    const st = ScrollTrigger.create({
      trigger,
      start: "top top",
      end: "+=100%",
      pin: true,
      pinType: "transform",
      // Scrub only when the user is OK with smooth motion. Pinning by
      // itself doesn't animate anything — it just holds the section in
      // place — so it stays on for both paths and keeps the reveal effect
      // feeling like "text appears on the hero", not "page is scrolling".
      scrub: reducedMotion ? false : 0.3,
      anticipatePin: 1,
      onUpdate(self) {
        if (reducedMotion) {
          // Instant snap: visible once we've scrolled past 10 % of the
          // pinned distance, hidden again if the user scrolls back.
          setVisible(self.progress >= 0.1);
          return;
        }
        // Smooth path: opacity 0 -> 1 + translateY 36 -> 0 between
        // 5 % and 60 % of the pinned distance.
        const t = Math.max(0, Math.min(1, (self.progress - 0.05) / 0.55));
        content.style.opacity = `${t}`;
        content.style.transform = `translate3d(0, ${(1 - t) * 36}px, 0)`;
      },
    });
    return () => st.kill();
  }, { scope: sectionRef, dependencies: [reducedMotion] });

  return (
    <section ref={sectionRef} className="bg-black relative">
      <div
        ref={pinnedRef}
        className="relative h-screen w-full overflow-hidden"
        // backfaceVisibility + translate3d gives this element its own
        // stable compositing layer so the ScrollTrigger pin counter-
        // transform and the ScrollSmoother parent transform share the
        // same sub-pixel rounding origin (no flicker).
        style={{ backfaceVisibility: "hidden", transform: "translate3d(0,0,0)" }}
      >

        {/* Background video — same compressed sources as before. */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/factwise-hero-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/factwise-hero.webm" type="video/webm" />
          <source src="/factwise-hero.mp4"  type="video/mp4" />
        </video>

        {/* Soft bottom gradient — keeps the eventual text legible without
            polluting the initial "bare video" state. */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/55" />

        {/* Hero copy — opacity + translateY driven by ScrollTrigger onUpdate.
            Initial inline styles match the at-rest (hidden) state so there's
            no flash of visible text before GSAP attaches. */}
        <div
          ref={contentRef}
          className="absolute bottom-0 left-0 right-0 px-4 pb-4 sm:px-6 md:px-10 md:pb-0 lg:pb-0 will-change-transform"
          style={{
            // Always start hidden via `visibility` (which globals.css's
            // opacity rule doesn't touch). `visible` flips true once
            // useEffect knows the reduced-motion preference.
            visibility: visible ? "visible" : "hidden",
            // For the smooth-motion path the GSAP onUpdate above overrides
            // these as it scrubs; this is just the at-rest initial.
            opacity: reducedMotion ? 1 : 0,
            transform: reducedMotion ? "none" : "translate3d(0, 36px, 0)",
          }}
        >
          <div className="flex items-end justify-between gap-4 md:grid md:grid-cols-12 md:items-end md:gap-6">

            <div className="col-span-12 lg:col-span-8 min-w-0">
              <h1
                className="font-medium leading-[0.8] tracking-[-0.05em] text-[11vw] sm:text-[13vw] md:text-[11vw] lg:text-[10vw] xl:text-[9vw] mb-2 md:mb-20 relative translate-y-0 md:translate-y-2"
                style={{ color: "#E1E0CC", fontFamily: "var(--font-display)" }}
              >
                FactWise
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-6 pb-0 md:pb-4 lg:col-span-4 lg:pb-4 md:pl-4 lg:pl-8">
              <p
                className="hidden md:block text-sm text-[#E1E0CC]/80 sm:text-base md:text-lg max-w-[380px]"
                style={{ lineHeight: 1.4, fontFamily: "var(--font-inter)" }}
              >
                Procurement is just the beginning. FactWise connects every workflow — from customer quotes and vendor RFQs to POs, payments, and beyond — in one platform built for manufacturers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
