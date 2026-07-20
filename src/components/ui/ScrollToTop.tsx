'use client';

import { useEffect, useLayoutEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { activeSmoother } from './SmoothScroll';

const LENIS_ROUTES = ['/about', '/careers', '/inquiry-to-quote', '/requisitions-to-po', '/invoice-to-pay', '/platform', '/supplier'];

/**
 * Reset scroll to the top of the page on every client-side route change.
 *
 * Next scrolls the window to the top on navigation, but most routes are driven
 * by GSAP ScrollSmoother (see SmoothScroll.tsx), which fakes scrolling by
 * translating #smooth-content — so a plain window.scrollTo(0,0) leaves the
 * smoother (and the visible page) wherever it was. Clicking a footer link from
 * the bottom of one page would otherwise open the next page part-way down.
 *
 * This resets the active smoother as well as native/Lenis scroll. Hash links
 * (e.g. /page#section) are left alone so in-page anchors still work.
 */
export default function ScrollToTop() {
  const pathname = usePathname();
  const isLenisRoute = LENIS_ROUTES.includes(pathname);

  /*
   * useLayoutEffect fires synchronously before paint.
   * We must purge GSAP transforms BEFORE the browser renders the new route,
   * otherwise position:sticky containers break due to transformed ancestors.
   */
  useLayoutEffect(() => {
    if (typeof window === 'undefined' || window.location.hash) return;

    // Kill ALL lingering ScrollTriggers from the previous route.
    ScrollTrigger.getAll().forEach(st => st.kill());

    // On Lenis routes, aggressively clear transforms from scroll containers
    if (isLenisRoute) {
      const content = document.getElementById('smooth-content');
      const wrapper = document.getElementById('smooth-wrapper');
      if (content) {
        content.style.transform = '';
        content.style.willChange = '';
      }
      if (wrapper) {
        wrapper.style.transform = '';
      }
    }

    // Reset scroll position
    try {
      activeSmoother?.scrollTo(0, false);
    } catch {
      /* smoother torn down mid-transition */
    }
    window.scrollTo(0, 0);
  }, [pathname, isLenisRoute]);

  /*
   * Deferred refreshes — as SPA client navigation hydrates, elements
   * take several hundred ms to reach their final settled DOM height.
   * Refresh ScrollTrigger silently as layout settles.
   */
  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash) return;

    const refreshAndScroll = () => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    };
    const refreshOnly = () => {
      ScrollTrigger.refresh();
    };

    const raf = requestAnimationFrame(refreshAndScroll);
    const t1 = setTimeout(refreshAndScroll, 150);
    const t2 = setTimeout(refreshOnly, 500);
    const t3 = setTimeout(refreshOnly, 1200);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  return null;
}

