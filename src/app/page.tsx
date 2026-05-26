'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import LazySection from '@/components/ui/LazySection';

// Each section is its own bundle chunk. With { ssr: false } the chunk is
// normally fetched right after hydration, so ~10 animation bundles race
// for bandwidth as soon as the page boots. Wrapping each below-fold
// section in LazySection holds the mount (and therefore the chunk fetch)
// until the section is within ~600 px of the viewport, so chunks load
// in scroll order and only when actually needed.
const ProblemSection       = dynamic(() => import('@/components/ProblemSection'),        { ssr: false });
const MethodologySection   = dynamic(() => import('@/components/Methodology'),            { ssr: false });
const ProductHubAnimation  = dynamic(() => import('@/components/ProductFlowCombined'),            { ssr: false });
const ProcurementModules   = dynamic(() => import('@/components/ProcurementModules'),     { ssr: false });
const ImplementationRoadmap = dynamic(() => import('@/components/ImplementationRoadmap'), { ssr: false });
const IntegrationsShowcase = dynamic(() => import('@/components/IntegrationsShowcase'),   { ssr: false });
const Testimonials         = dynamic(() => import('@/components/testimonials'),           { ssr: false });
const ModernCaseStudies    = dynamic(() => import('@/components/ModernCaseStudies'),      { ssr: false });
const ExpandingIndustrySection = dynamic(
  () => import('@/components/ExpandingIndustryCards').then(m => ({ default: m.ExpandingIndustrySection })),
  { ssr: false }
);
const FlickeringFooter     = dynamic(
  () => import('@/components/ui/flickering-footer').then(m => ({ default: m.FlickeringFooter })),
  { ssr: false }
);

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        overflowX: 'clip',
        background: '#FFFFFF',
        maxWidth: '100%',
        margin: '0',
      }}
    >
      {/* Above fold — loaded eagerly */}
      <Hero />
      <StatsStrip />

      {/* Below fold — viewport-deferred chunk fetch + mount */}
      <LazySection minHeight="70vh"><ProblemSection /></LazySection>
      <LazySection minHeight="100vh"><MethodologySection /></LazySection>
      <LazySection minHeight="80vh"><ProductHubAnimation /></LazySection>
      <LazySection minHeight="60vh"><ProcurementModules /></LazySection>
      <LazySection minHeight="80vh"><ImplementationRoadmap /></LazySection>
      <LazySection minHeight="80vh"><IntegrationsShowcase /></LazySection>
      <LazySection minHeight="50vh"><Testimonials /></LazySection>
      <LazySection minHeight="60vh"><ModernCaseStudies /></LazySection>
      <LazySection minHeight="60vh"><ExpandingIndustrySection /></LazySection>
      <LazySection minHeight="40vh"><FlickeringFooter /></LazySection>
    </main>
  );
}
