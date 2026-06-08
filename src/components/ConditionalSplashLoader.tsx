'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SplashLoaderDoor from './SplashLoaderDoor';

export default function ConditionalSplashLoader() {
  const pathname = usePathname();
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect if this is a manual browser reload/refresh
    let isReload = false;
    try {
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        isReload = (navEntries[0] as PerformanceNavigationTiming).type === 'reload';
      }
    } catch (e) {
      // Fallback for older browsers
      isReload = window.performance && window.performance.navigation && window.performance.navigation.type === 1;
    }

    // If it's a manual refresh, reset the splash session state
    if (isReload) {
      sessionStorage.removeItem('hasPlayedSplash');
    }

    const hasPlayed = sessionStorage.getItem('hasPlayedSplash');

    if (pathname === '/') {
      if (!hasPlayed) {
        setShouldPlay(true);
        sessionStorage.setItem('hasPlayedSplash', 'true');
      } else {
        setShouldPlay(false);
      }
    } else {
      setShouldPlay(false);
      sessionStorage.setItem('hasPlayedSplash', 'true');
    }
  }, [pathname]);

  if (!shouldPlay) return null;

  return <SplashLoaderDoor />;
}
