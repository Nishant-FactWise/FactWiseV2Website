import type { Metadata } from 'next';
import DocumentationContent from './DocumentationContent';

export const metadata: Metadata = {
  title: 'Documentation | FactWise Source-to-Pay Platform',
  description:
    'FactWise documentation — setup guides, how-to references, and integration docs for Requisitions-to-PO, Invoice-to-Pay, Inquiry-to-Quote, vendor management, and security on the AI-powered source-to-pay platform for manufacturers.',
  keywords: [
    'FactWise documentation',
    'source-to-pay software guide',
    'procurement software setup',
    'invoice-to-pay documentation',
    'requisitions-to-PO guide',
    'inquiry-to-quote setup',
    'procurement platform integration guide',
    'FactWise help',
  ],
  alternates: {
    canonical: 'https://factwise.io/documentation',
  },
  openGraph: {
    title: 'Documentation | FactWise',
    description:
      'Guides and references for getting the most out of FactWise — the AI-powered source-to-pay platform for manufacturers. Setup, integrations, and feature walkthroughs.',
    url: 'https://factwise.io/documentation',
    type: 'website',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'FactWise Documentation' }],
  },
};

// TechArticle schema — correct schema type for documentation pages
const techArticleSchema = {
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  '@id': 'https://factwise.io/documentation',
  headline: 'FactWise Documentation — Source-to-Pay Platform Guides',
  description:
    'Setup guides, how-to references, and integration documentation for FactWise — the AI-powered source-to-pay procurement platform for manufacturers.',
  url: 'https://factwise.io/documentation',
  publisher: { '@id': 'https://factwise.io/#organization' },
  author: { '@id': 'https://factwise.io/#organization' },
  inLanguage: 'en-US',
  about: { '@id': 'https://factwise.io/#software' },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://factwise.io' },
      { '@type': 'ListItem', position: 2, name: 'Documentation', item: 'https://factwise.io/documentation' },
    ],
  },
};

// FAQ schema for common documentation questions
const docFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I get started with FactWise?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start by booking a demo at factwise.io/demo. After onboarding, your FactWise team will set up your account, help migrate existing vendor and PO data, and guide you through activating your first module. Most teams go live on their first workflow within weeks.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does FactWise integrate with existing ERP systems?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FactWise connects with common ERP and accounting systems including SAP, Oracle, Microsoft Dynamics, Tally, and Zoho Books via RESTful API and data connectors. The specific integration approach depends on your ERP setup — book a demo to discuss your environment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I migrate existing vendor, PO, and contract data into FactWise?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Migrating existing vendor records, purchase orders, and contracts is part of the FactWise onboarding process. The FactWise team provides data migration templates and support to ensure a smooth transition.',
      },
    },
    {
      '@type': 'Question',
      name: 'What training and support does FactWise provide?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'FactWise provides onboarding training for your procurement team, plus ongoing customer support via email at support@factwise.io. This documentation covers platform setup, feature walkthroughs, and integration guides.',
      },
    },
  ],
};

export default function DocumentationPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(docFaqSchema) }} />
      <DocumentationContent />
    </>
  );
}

