'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const LENIS_ROUTES = ['/about', '/careers', '/inquiry-to-quote', '/requisitions-to-po', '/invoice-to-pay', '/platform', '/supplier'];

// Global so ScrollReveal can read smoother scroll position reliably
export let activeSmoother: ScrollSmoother | null = null;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const usesLenis = LENIS_ROUTES.includes(pathname);

  useGSAP(() => {
    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
      ScrollTrigger.clearScrollMemory();
    }

    if (usesLenis) return;

    activeSmoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 0.8,
      effects: true,
      ignoreMobileResize: true,
    });

    ScrollTrigger.refresh();

    return () => {
      if (activeSmoother) {
        activeSmoother.kill();
        activeSmoother = null;
        if (typeof window !== 'undefined') {
          window.scrollTo(0, 0);
          ScrollTrigger.refresh();
        }
        if (typeof document !== 'undefined') {
          document.documentElement.style.overflow = '';
          document.documentElement.style.height = '';
          document.body.style.overflow = '';
          document.body.style.height = '';
        }
      }
    };
  }, { scope: wrapperRef, dependencies: [pathname] });

  return (
    <div 
      id="smooth-wrapper" 
      ref={wrapperRef} 
      style={usesLenis ? { width: '100%' } : { overflow: 'hidden', width: '100%' }}
    >
      {/* Do NOT add willChange:'transform' here. GSAP ScrollSmoother manages its
          own GPU-layer lifecycle internally. A static willChange hint permanently
          promotes #smooth-content to a compositing layer whose sub-pixel rounding
          is independent of the ScrollTrigger pin's counter-transform layer — the
          mismatch causes 1-px flicker on Windows at 125 % display scaling. */}
      <div id="smooth-content" style={{ width: '100%', position: 'relative' }}>
        {children}
      </div>
    </div>
  );
}
