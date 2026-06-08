'use client';

import { usePathname } from 'next/navigation';
import SplashLoaderDoor from './SplashLoaderDoor';

export default function ConditionalSplashLoader() {
  const pathname = usePathname();
  
  // Only render the splash loader on the root landing page
  if (pathname !== '/') return null;
  
  return <SplashLoaderDoor />;
}
