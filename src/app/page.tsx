// Homepage — server component so we can inject JSON-LD schema server-side
// All interactive/animated components are loaded as client-only dynamic imports below
import dynamic from 'next/dynamic';
import Hero from '@/components/Hero';
import StatsStrip from '@/components/StatsStrip';
import CompanyMarquee from '@/components/CompanyMarquee';
import HomeLocalizedMain from '@/components/HomeLocalizedMain';

// ssr:false dynamic imports must live inside a Client Component — see ClientOnlySections.tsx
import {
  ProductHubAnimation,
  ImplementationRoadmap,
  IntegrationsShowcase,
  FlickeringFooter,
} from '@/components/ClientOnlySections';

const ProblemSection = dynamic(() => import('@/components/ProblemSection'));
const MethodologySection = dynamic(() => import('@/components/Methodology'));
const ProcurementModules = dynamic(() => import('@/components/ProcurementModules'));
const Testimonials = dynamic(() => import('@/components/testimonials'));
const ModernCaseStudies = dynamic(() => import('@/components/ModernCaseStudies'));
const ExpandingIndustrySection = dynamic(
  () => import('@/components/ExpandingIndustryCards').then(m => ({ default: m.ExpandingIndustrySection }))
);
const ComplianceSection = dynamic(() => import('@/components/ComplianceSection'));


// ── Homepage-level JSON-LD schemas ─────────────────────────────────────────
// These live here (not in layout.tsx) so they apply specifically to the homepage
// URL and don't conflict with page-level schemas on product/blog pages.

const homepageFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://factwise.io/#faqpage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is FactWise?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FactWise is an AI-powered source-to-pay (S2P) procurement platform built for manufacturers. It automates the complete procurement cycle — from requisitions, RFQ management, and AI-powered vendor negotiation to purchase orders, invoice matching, and payments — all in one connected platform.',
      },
    },
    {
      '@type': 'Question',
      name: 'What does FactWise do for manufacturers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FactWise helps manufacturers reduce procurement costs by up to 31%, cut manual effort by 80%, and speed up their purchase order cycle 3x. It does this by automating three core workflows: Requisition to Purchase Order (Req-to-PO), Invoice to Pay with 4-way matching, and Inquiry to Quote (I2Q) for responding to customer RFQs faster.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is FactWise different from SAP Ariba, Coupa, or other procurement software?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Unlike SAP Ariba and Coupa which target large enterprises with long implementations and high costs, FactWise is purpose-built for manufacturing companies — modular, faster to deploy, and priced for SMBs and mid-market manufacturers. It includes manufacturer-specific features like BOM costing, landed cost analysis, and quality-check-based 4-way invoice matching that generic platforms lack.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best procurement software for small manufacturers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FactWise is a top choice for small manufacturers because it is modular — you start with just one workflow (like automating purchase orders) without paying for features you do not need. It replaces error-prone spreadsheet-based procurement with a structured digital system that enforces approvals, automates vendor communication, prevents overpayments, and provides real-time spend visibility.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is source-to-pay (S2P) automation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Source-to-pay (S2P) automation is software that digitizes the entire procurement process from sourcing vendors and issuing RFQs, to generating purchase orders, receiving goods, matching invoices, and processing payments. FactWise automates this full cycle in a single platform built specifically for manufacturers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does FactWise use artificial intelligence?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. FactWise uses AI in three areas: an AI negotiation engine that helps procurement teams secure better pricing from vendors; AI-powered invoice capture that reads and extracts vendor invoice data automatically; and BOM cost intelligence that identifies sourcing opportunities by matching bill-of-materials components against vendor pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is FactWise located and who does it serve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FactWise Technologies Private Limited is headquartered in Mumbai, Maharashtra, India. It serves manufacturing companies across India, the United States, and the Asia region — including industries like automotive, chemicals, electronics, MRO, contract manufacturing, and food and beverage.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I get started with FactWise?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Book a personalized demo at factwise.io/demo. The FactWise team will review your current procurement workflows, identify where automation will have the biggest impact, and recommend which module to start with. Most teams go live on their first workflow within weeks.',
      },
    },
  ],
};

export default function Home() {
  return (
    <>
      {/* Homepage FAQ schema — feeds Google AI Overviews, ChatGPT, Perplexity */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />
      <HomeLocalizedMain>
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
      </HomeLocalizedMain>
    </>
  );
}
