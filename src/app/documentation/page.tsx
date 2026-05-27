import type { Metadata } from 'next';
import DocumentationContent from './DocumentationContent';

export const metadata: Metadata = {
  title: 'Documentation',
  description:
    'FactWise documentation — guides and references for setup, Requisitions-to-PO, Invoice-to-Pay, Inquiry-to-Quote, vendor management, integrations, and security on the AI-powered source-to-pay platform for manufacturers.',
  alternates: {
    canonical: 'https://factwise.io/documentation',
  },
  openGraph: {
    title: 'Documentation | FactWise',
    description:
      'Guides and references for getting the most out of FactWise, the AI-powered source-to-pay platform for manufacturers.',
    url: 'https://factwise.io/documentation',
    type: 'website',
  },
};

export default function DocumentationPage() {
  return <DocumentationContent />;
}
