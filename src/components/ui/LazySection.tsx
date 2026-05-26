'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

interface LazySectionProps {
  children: ReactNode;
  /** Distance ahead of viewport at which to start mounting (e.g. "600px") */
  rootMargin?: string;
  /** Minimum reserved height so the page doesn't jump as sections mount */
  minHeight?: string;
  /** Mount immediately if true (escape hatch for above-the-fold use) */
  eager?: boolean;
}

// Defers mounting children until they're near the viewport.
// next/dynamic with { ssr: false } only delays SSR — the JS chunk still
// fetches right after hydration. This wrapper holds the mount entirely
// until IntersectionObserver fires, so 10 below-fold animation chunks
// don't all race for bandwidth on first paint.
export default function LazySection({
  children,
  rootMargin = '600px 0px',
  minHeight = '60vh',
  eager = false,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(eager);

  useEffect(() => {
    if (mounted) return;
    const el = ref.current;
    if (!el) return;

    // Older browsers / SSR — fall through to mounting immediately.
    if (typeof IntersectionObserver === 'undefined') {
      setMounted(true);
      return;
    }

    const io = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div ref={ref} style={{ minHeight: mounted ? undefined : minHeight }}>
      {mounted ? children : null}
    </div>
  );
}
