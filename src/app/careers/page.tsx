import React from 'react';
import { ReactLenis } from 'lenis/react';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import { 
  CareersHero,
  CareersCulture,
  CareersOpenings,
  CareersTestimonials,
} from '@/components/careers';

export default function CareersPage() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="min-h-screen bg-white [&_p]:text-justify">
        <CareersHero />
        <CareersCulture />
        <CareersOpenings />
        <CareersTestimonials />
        <FlickeringFooter />
      </main>
    </ReactLenis>
  );
}
