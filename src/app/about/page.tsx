'use client';

import React from 'react';
import { ReactLenis } from 'lenis/react';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import { 
  Hero, 
  ImpactMission, 
  FounderSection, 
  StorySection, 
  MarqueeSection, 
  ValuesGrid
} from '@/components/about';

export default function AboutPage() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="min-h-screen bg-white [&_p]:text-justify">
        <Hero />
        <ImpactMission />
        <StorySection />
        <MarqueeSection />
        <FounderSection />
        <ValuesGrid />
        <FlickeringFooter />
      </main>
    </ReactLenis>
  );
}
