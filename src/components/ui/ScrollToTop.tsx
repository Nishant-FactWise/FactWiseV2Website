'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
      ScrollTrigger.refresh();
    };

    // Reset now, and again next frame once the route's smoother has re-initialized.
    toTop();
    const raf = requestAnimationFrame(toTop);

    // As SPA client navigation hydrates, elements (mockups, Framer Motion entrance animations, fonts)
    // take several hundred milliseconds to reach their final settled DOM height.
    // Refresh ScrollTrigger silently as layout settles so pinned pin-spacer calculations are accurate.
    const refresh = () => ScrollTrigger.refresh();
    const t1 = setTimeout(refresh, 150);
    const t2 = setTimeout(refresh, 500);
    const t3 = setTimeout(refresh, 1200);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [pathname]);

  return null;
}
