'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { activeSmoother } from './SmoothScroll';

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

  useEffect(() => {
    if (typeof window === 'undefined' || window.location.hash) return;

    const toTop = () => {
      // GSAP ScrollSmoother (active on most routes). false = jump, don't animate.
      try {
        activeSmoother?.scrollTo(0, false);
      } catch {
        /* smoother torn down mid-transition — native reset below still applies */
      }
      window.scrollTo(0, 0);
    };

    // Reset now, and again next frame once the route's smoother has re-initialized.
    toTop();
    const raf = requestAnimationFrame(toTop);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return null;
}
