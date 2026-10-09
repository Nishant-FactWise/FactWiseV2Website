'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import SplashLoaderDoor from './SplashLoaderDoor';

export default function ConditionalSplashLoader() {
  const pathname = usePathname();
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  // 1. Initialize state synchronously matching the server exactly.
  // By defaulting to `true` on the home page, the server renders the Splash Loader immediately.
  // This physically covers the screen, completely preventing the 0.2s flash of the website content.
  // Keep the behavior identical in development and production so the loader
  // can be tested accurately through `npm run dev` as well.
  const [shouldPlay, setShouldPlay] = useState(pathname === '/');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let stateTimer: number | undefined;
    const updateShouldPlay = (value: boolean) => {
      stateTimer = window.setTimeout(() => setShouldPlay(value), 0);
    };

    // Respect the user's OS/browser motion preference. The CSS also hides the
    // server-rendered splash immediately, while this removes it after hydration.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      try {
        sessionStorage.setItem('hasPlayedSplash', 'true');
      } catch {
        // Storage can be unavailable in strict privacy modes; skipping the
        // splash must not depend on it.
      }
      updateShouldPlay(false);
      return () => window.clearTimeout(stateTimer);
    }

    // 2. Now that we are safely on the client, we check sessionStorage
    let isReload = false;
    try {
      const navEntries = performance.getEntriesByType('navigation');
      if (navEntries.length > 0) {
        isReload = (navEntries[0] as PerformanceNavigationTiming).type === 'reload';
      }
    } catch {
      isReload = window.performance && window.performance.navigation && window.performance.navigation.type === 1;
    }

    const hasPlayed = sessionStorage.getItem('hasPlayedSplash');

    if (pathname === '/') {
      if (isDevelopment) {
        // Development must remain visually testable. Hot reloads and direct
        // dev navigations are not consistently reported as `reload`, so do
        // not let a stale sessionStorage flag suppress the splash here.
        updateShouldPlay(true);
        sessionStorage.setItem('hasPlayedSplash', 'true');
      } else if (isReload) {
        // If it's a reload, we MUST play it. It's already mounted from the initial state, so we just let it run.
        sessionStorage.setItem('hasPlayedSplash', 'true');
      } else if (!hasPlayed) {
        // First visit to home page in this session. Play it.
        updateShouldPlay(true);
        sessionStorage.setItem('hasPlayedSplash', 'true');
      } else {
        // It's a new tab in the same session, or a client-side navigation. Abort the splash!
        updateShouldPlay(false);
      }
    } else {
      // Visited a sub-page (e.g. /about). Mark splash as played so it doesn't trigger if they go Home later.
      sessionStorage.setItem('hasPlayedSplash', 'true');
      updateShouldPlay(false);
    }

    return () => window.clearTimeout(stateTimer);
  }, [isDevelopment, pathname]);

  if (!shouldPlay) return null;

  return <SplashLoaderDoor />;
}
