'use client';

import { useRef, useEffect, useLayoutEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

const LENIS_ROUTES = ['/about', '/careers', '/inquiry-to-quote', '/requisitions-to-po', '/invoice-to-pay', '/platform', '/supplier'];

function isLenisRoute(pathname: string) {
  return LENIS_ROUTES.some((route) => pathname === route || pathname.endsWith(route));
}

// Global so ScrollReveal can read smoother scroll position reliably
export let activeSmoother: { kill: () => void; scrollTo: (target: number, smooth?: boolean) => void } | null = null;

/**
 * Aggressively strip every GSAP-applied inline style from the scroll containers.
 * Called synchronously (useLayoutEffect) on route change so that the very first
 * paint of a Lenis route never sees a stale `transform` on #smooth-content.
 * CSS `position: sticky` breaks inside a transformed ancestor — this is the root
 * cause of the "huge gap below the horizontal-scroll feature section" bug.
 */
function purgeGSAPStyles() {
  const content = document.getElementById('smooth-content');
  const wrapper = document.getElementById('smooth-wrapper');
  if (content) {
    content.style.transform = '';
    content.style.willChange = '';
    content.style.position = 'relative';
    // GSAP may also set these
    content.style.removeProperty('width');
    content.style.removeProperty('height');
  }
  if (wrapper) {
    wrapper.style.transform = '';
    wrapper.style.willChange = '';
    wrapper.style.removeProperty('position');
    wrapper.style.removeProperty('overflow');
    wrapper.style.removeProperty('height');
  }
  document.documentElement.style.overflow = '';
  document.documentElement.style.height = '';
  document.body.style.overflow = '';
  document.body.style.height = '';
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const usesLenis = isLenisRoute(pathname);

  /*
   * useLayoutEffect fires synchronously BEFORE the browser paints.
   * On Lenis routes we must clear GSAP transforms immediately so that
   * position:sticky containers never see a transformed ancestor.
   */
  useLayoutEffect(() => {
    if (usesLenis) {
      // Kill the smoother instance immediately if it exists
      if (activeSmoother) {
        try { activeSmoother.kill(); } catch { /* already dead */ }
        activeSmoother = null;
      }
      purgeGSAPStyles();
    }
  }, [pathname, usesLenis]);

  useEffect(() => {
    let cancelled = false;

    if (typeof window !== 'undefined') {
      window.history.scrollRestoration = 'manual';
    }

    if (usesLenis) return;

    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
      import('gsap/ScrollSmoother'),
    ]).then(([gsapModule, scrollTriggerModule, scrollSmootherModule]) => {
      if (cancelled) return;

      const gsap = gsapModule.gsap;
      const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
      const ScrollSmoother = scrollSmootherModule.ScrollSmoother;

      gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
      ScrollTrigger.clearScrollMemory();

      activeSmoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 0.8,
        effects: true,
        ignoreMobileResize: true,
      });

      ScrollTrigger.refresh();
    });

    return () => {
      cancelled = true;
      if (activeSmoother) {
        activeSmoother.kill();
        activeSmoother = null;
      }
      purgeGSAPStyles();
    };
  }, [pathname, usesLenis]);

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
