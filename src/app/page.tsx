'use client';

import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import CompanyMarquee from '@/components/CompanyMarquee';

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
const ComplianceSection = dynamic(() => import('@/components/ComplianceSection'));
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
      <Hero />

      <div className="relative z-10 bg-white w-full hero-overlap-content" style={{ background: '#FFFFFF', zIndex: 10 }}>
        <CompanyMarquee />
        <StatsStrip />
        <ProblemSection />
        <MethodologySection />
        <ProductHubAnimation />
        <ProcurementModules />
        <ImplementationRoadmap />
        <IntegrationsShowcase />
        <Testimonials />
        <ModernCaseStudies />
        <ExpandingIndustrySection />
        <ComplianceSection />
        <FlickeringFooter />
      </div>
    </main>
  );
}
