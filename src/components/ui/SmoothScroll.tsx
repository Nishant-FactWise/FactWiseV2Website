'use client';

import { useRef, useSyncExternalStore } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

// Routes that run their own smooth scrolling via Lenis (ReactLenis root) —
// ScrollSmoother must stand down there or the two libraries fight over the scroll.
const LENIS_ROUTES = ['/about', '/careers'];

// Client-mount detector. Server snapshot is `false`, client is `true`, so the
// first client render matches the server HTML (no hydration mismatch) and only
// then do we mount ScrollSmoother's wrapper divs. No subscription is needed —
// the value never changes after mount.
const NOOP_SUBSCRIBE = () => () => {};

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const usesLenis = LENIS_ROUTES.includes(pathname);
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const isClient = useSyncExternalStore(NOOP_SUBSCRIBE, () => true, () => false);

  useGSAP(() => {
    if (!isClient || usesLenis) return;

    smootherRef.current = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.0, // catch-up time (s). Lower = tighter response, higher = floatier.
      effects: true, // honours data-speed / data-lag (e.g. the hero subtext parallax)
      ignoreMobileResize: true,
    });

    // Most homepage sections are dynamically imported with ssr:false, so they mount
    // *after* the smoother is created and grow the page height. Without a refresh,
    // ScrollSmoother's scroll length stays stuck at the initial (short) height and
    // scrolling breaks near the bottom. Watch the content box and refresh on growth.
    let refreshTimer: ReturnType<typeof setTimeout> | null = null;
    const scheduleRefresh = () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    const content = document.querySelector('#smooth-content');
    const ro = content ? new ResizeObserver(scheduleRefresh) : null;
    if (content && ro) ro.observe(content);

    // Late-loading media (hero video, images) can also change layout height.
    window.addEventListener('load', scheduleRefresh);

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      ro?.disconnect();
      window.removeEventListener('load', scheduleRefresh);
      smootherRef.current?.kill();
      smootherRef.current = null;
    };
  }, { scope: wrapperRef, dependencies: [isClient, pathname] });

  // On server (and the first client render before hydration) render children directly
  // so server HTML === initial client HTML → no hydration mismatch. Lenis routes also
  // render plain so ScrollSmoother never wraps them.
  if (!isClient || usesLenis) {
    return <>{children}</>;
  }

  return (
    <div
      id="smooth-wrapper"
      ref={wrapperRef}
      style={{ overflow: 'hidden', width: '100%' }}
    >
      <div
        id="smooth-content"
        style={{ width: '100%', position: 'relative', willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  );
}
