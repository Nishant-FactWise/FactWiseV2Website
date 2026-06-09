'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import CompanyMarquee from '@/components/CompanyMarquee';
import LazySection from '@/components/ui/LazySection';

// Each section is its own bundle chunk. With { ssr: false } the chunk is
// normally fetched right after hydration, so ~10 animation bundles race
// for bandwidth as soon as the page boots. Wrapping each below-fold
// section in LazySection holds the mount (and therefore the chunk fetch)
// until the section is within ~600 px of the viewport, so chunks load
// in scroll order and only when actually needed.
const ProblemSection = dynamic(() => import('@/components/ProblemSection'));
const MethodologySection = dynamic(() => import('@/components/Methodology'));
const ProductHubAnimation = dynamic(() => import('@/components/ProductFlowCombined'), { ssr: false });
const ProcurementModules = dynamic(() => import('@/components/ProcurementModules'));
const ImplementationRoadmap = dynamic(() => import('@/components/ImplementationRoadmap'), { ssr: false });
const IntegrationsShowcase = dynamic(() => import('@/components/IntegrationsShowcase'), { ssr: false });
const Testimonials = dynamic(() => import('@/components/testimonials'));
const ModernCaseStudies = dynamic(() => import('@/components/ModernCaseStudies'));
const ExpandingIndustrySection = dynamic(
  () => import('@/components/ExpandingIndustryCards').then(m => ({ default: m.ExpandingIndustrySection }))
);
const FlickeringFooter = dynamic(
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

      <div className="relative z-10 bg-white w-full hero-overlap-content" style={{ background: '#FFFFFF', zIndex: 10 }}>
        <CompanyMarquee />
        <StatsStrip />

        {/* Below fold — viewport-deferred chunk fetch + mount */}
        {/* First few sections loaded eagerly to prevent scroll-jump when mounting during active scroll */}
        <LazySection eager={true} minHeight="70vh"><ProblemSection /></LazySection>
        <LazySection eager={true} minHeight="100vh"><MethodologySection /></LazySection>
        <LazySection minHeight="80vh"><ProductHubAnimation /></LazySection>
        <LazySection minHeight="60vh"><ProcurementModules /></LazySection>
        <LazySection minHeight="80vh"><ImplementationRoadmap /></LazySection>
        <LazySection minHeight="80vh"><IntegrationsShowcase /></LazySection>
        <LazySection minHeight="50vh"><Testimonials /></LazySection>
        <LazySection minHeight="60vh"><ModernCaseStudies /></LazySection>
        <LazySection minHeight="60vh"><ExpandingIndustrySection /></LazySection>
        <LazySection minHeight="40vh"><FlickeringFooter /></LazySection>
      </div>
    </main>
  );
}
