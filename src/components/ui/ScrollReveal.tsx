'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

type RevealType = 'fade' | 'split-chars' | 'split-words' | 'split-lines' | 'kinetic';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  start?: string;
  type?: RevealType;
}

export default function ScrollReveal({
  children,
  className,
  y = 24,
  delay = 0,
  duration = 0.7,
  stagger = 0.035,
  once = true,
  start = 'top 85%',
  type = 'fade',
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = containerRef.current;
    if (!el) return;

    // Reduced motion — show immediately, no animation.
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    let split: SplitText | null = null;
    let observer: IntersectionObserver | null = null;

    const run = () => {
      let targets: Element[] | HTMLCollection;

      if (type === 'fade') {
        targets = el.children;
      } else {
        const splitMode =
          type === 'split-chars' || type === 'kinetic'
            ? 'chars,words'
            : type === 'split-words'
              ? 'words'
              : 'lines';

        split = new SplitText(el, { type: splitMode });
        targets =
          type === 'split-chars' || type === 'kinetic'
            ? split.chars
            : type === 'split-words'
              ? split.words
              : split.lines;
      }

      gsap.set(targets, { y, opacity: 0, force3D: true });

      // ScrollSmoother uses transform to move #smooth-content, so
      // getBoundingClientRect() already returns the correct visual position.
      // We just need to compare against the right threshold.
      const rect = el.getBoundingClientRect();
      const threshold = parseFloat(start.split(' ')[1] ?? '85') / 100;
      const alreadyVisible = rect.top < window.innerHeight * threshold;

      const reveal = () => gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        clearProps: 'transform,will-change',
      });

      if (alreadyVisible) {
        reveal();
        return;
      }

      // Native observation avoids stale ScrollTrigger positions after mobile
      // viewport resizing and reveals content on the first downward pass.
      if (window.matchMedia('(max-width: 1023px)').matches) {
        observer = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            reveal();
            observer?.disconnect();
          },
          { rootMargin: '0px 0px -8% 0px', threshold: 0.01 },
        );
        observer.observe(el);
        return;
      }

      gsap.to(targets, {
        y: 0,
        opacity: 1,
        duration,
        delay,
        stagger,
        ease: 'power3.out',
        clearProps: 'transform,will-change',
        scrollTrigger: {
          trigger: el,
          start,
          once,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
          invalidateOnRefresh: true,
          fastScrollEnd: true,
        },
      });
    };

    const fonts = typeof document !== 'undefined' ? document.fonts : null;

    if (fonts && fonts.status !== 'loaded') {
      gsap.set(el, { opacity: 0 });
      fonts.ready.then(() => {
        gsap.set(el, { opacity: 1 });
        // Double rAF: first lets the browser paint the opacity restore,
        // second ensures ScrollSmoother has updated its transform so
        // getBoundingClientRect() returns the correct visual position.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            run();
            ScrollTrigger.refresh();
          });
        });
      });
    } else {
      run();
    }

    return () => {
      observer?.disconnect();
      split?.revert();
    };
  }, { scope: containerRef, dependencies: [type, once] });

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
