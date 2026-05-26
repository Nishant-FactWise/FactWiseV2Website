'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { useGSAP } from '@gsap/react';
import { usePathname } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const LENIS_ROUTES = ['/about', '/careers'];

// Global so ScrollReveal can read smoother scroll position reliably
export let activeSmoother: ScrollSmoother | null = null;

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const usesLenis = LENIS_ROUTES.includes(pathname);

  useGSAP(() => {
    if (usesLenis) return;

    activeSmoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 0.8,
      effects: true,
      ignoreMobileResize: true,
    });

    let refreshTimer: ReturnType<typeof setTimeout> | null = null;
    const scheduleRefresh = () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
    };

    const content = document.querySelector('#smooth-content');
    const ro = content ? new ResizeObserver(scheduleRefresh) : null;
    if (content && ro) ro.observe(content);

    window.addEventListener('load', scheduleRefresh);

    return () => {
      if (refreshTimer) clearTimeout(refreshTimer);
      ro?.disconnect();
      window.removeEventListener('load', scheduleRefresh);
      activeSmoother?.kill();
      activeSmoother = null;
    };
  }, { scope: wrapperRef, dependencies: [pathname] });

  if (usesLenis) return <>{children}</>;

  return (
    <div id="smooth-wrapper" ref={wrapperRef} style={{ overflow: 'hidden', width: '100%' }}>
      <div id="smooth-content" style={{ width: '100%', position: 'relative', willChange: 'transform' }}>
        {children}
      </div>
    </div>
  );
}