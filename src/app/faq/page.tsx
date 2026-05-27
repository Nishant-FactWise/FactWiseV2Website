import type { Metadata } from 'next';
import FaqContent from './FaqContent';
import { faqJsonLd } from './faq-data';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about FactWise — the AI-powered source-to-pay platform for manufacturers. Learn about our modules, pricing, implementation, integrations, security, and support.',
  alternates: {
    canonical: 'https://factwise.io/faq',
  },
  openGraph: {
    title: 'FAQ | FactWise',
    description:
      'Answers to common questions about FactWise, the AI-powered source-to-pay platform for manufacturers.',
    url: 'https://factwise.io/faq',
    type: 'website',
  },
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <FaqContent />
    </>
  );
}
