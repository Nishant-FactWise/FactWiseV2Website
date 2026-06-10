'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SplashLoaderDoor from './SplashLoaderDoor';

export default function ConditionalSplashLoader() {
  const pathname = usePathname();
  
  // 1. Initialize state synchronously matching the server exactly.
  // By defaulting to `true` on the home page, the server renders the Splash Loader immediately.
  // This physically covers the screen, completely preventing the 0.2s flash of the website content.
  const [shouldPlay, setShouldPlay] = useState(pathname === '/');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 2. Now that we are safely on the client, we check sessionStorage
    let isReload = false;
    try {
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        isReload = (navEntries[0] as PerformanceNavigationTiming).type === 'reload';
      }
    } catch (e) {
      isReload = window.performance && window.performance.navigation && window.performance.navigation.type === 1;
    }

    const hasPlayed = sessionStorage.getItem('hasPlayedSplash');

    if (pathname === '/') {
      if (isReload) {
        // If it's a reload, we MUST play it. It's already mounted from the initial state, so we just let it run.
        sessionStorage.setItem('hasPlayedSplash', 'true');
      } else if (!hasPlayed) {
        // First visit to home page in this session. Play it.
        setShouldPlay(true);
        sessionStorage.setItem('hasPlayedSplash', 'true');
      } else {
        // It's a new tab in the same session, or a client-side navigation. Abort the splash!
        setShouldPlay(false);
      }
    } else {
      // Visited a sub-page (e.g. /about). Mark splash as played so it doesn't trigger if they go Home later.
      sessionStorage.setItem('hasPlayedSplash', 'true');
      setShouldPlay(false);
    }
  }, [pathname]);

  if (!shouldPlay) return null;

  return <SplashLoaderDoor />;
}
