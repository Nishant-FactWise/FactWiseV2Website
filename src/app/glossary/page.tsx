import type { Metadata } from 'next';
import { FlickeringFooter } from '@/components/ClientOnlySections';
import GlossaryContent from './GlossaryContent';

export const metadata: Metadata = {
  title: 'Procurement Glossary | Key Terms Explained',
  description:
    'Definitions of key procurement and manufacturing terms — Source-to-Pay, 4-Way Invoice Matching, Requisition-to-PO, BOM Costing, Landed Cost Analysis, AI Negotiation, and more. From FactWise.',
  keywords: [
    'procurement glossary',
    'procurement terms explained',
    'source-to-pay definition',
    '4-way invoice matching definition',
    'BOM costing definition',
    'landed cost analysis meaning',
    'requisition to PO meaning',
    'procurement terminology',
    'AP automation terms',
  ],
  alternates: { canonical: 'https://factwise.io/glossary' },
  openGraph: {
    title: 'Procurement Glossary | FactWise',
    description:
      'Definitions of key procurement and manufacturing procurement terms — Source-to-Pay, 4-Way Invoice Matching, BOM Costing, Landed Cost, and more.',
    url: 'https://factwise.io/glossary',
    type: 'website',
    images: [{ url: '/logo.png', width: 1200, height: 630, alt: 'FactWise Procurement Glossary' }],
  },
};

const terms = [
  {
    id: 'source-to-pay',
    term: 'Source-to-Pay (S2P)',
    definition:
      'Source-to-Pay (S2P) is the complete procurement lifecycle that spans from identifying and sourcing suppliers, issuing RFQs, evaluating vendor quotes, generating purchase orders, receiving goods, matching and verifying vendor invoices, and processing payments. FactWise automates the entire source-to-pay cycle in a single connected platform for manufacturing companies.',
    seeAlso: 'https://factwise.io',
  },
  {
    id: 'requisition-to-po',
    term: 'Requisition-to-PO (Req-to-PO)',
    definition:
      'Requisition-to-PO (Req-to-PO), also called PR-to-PO (Purchase Request to Purchase Order), is the internal procurement process that begins when an employee raises a purchase requisition and ends when a purchase order is generated and dispatched to a vendor. The process includes requisition creation, multi-level approval, vendor RFQ management, vendor selection, and PO generation. FactWise automates this workflow for manufacturers.',
    seeAlso: 'https://factwise.io/requisitions-to-po',
  },
  {
    id: '4-way-invoice-matching',
    term: '4-Way Invoice Matching',
    definition:
      '4-Way Invoice Matching is an accounts payable process that automatically reconciles a vendor invoice against four source documents: (1) the Purchase Order (PO), (2) the Goods Receipt Note (GRN), (3) the Quality Check (QC) report, and (4) the Contract. Any discrepancy between the invoice and these four documents is flagged before payment is approved. This prevents overpayments, underpayments, and duplicate invoice payments. FactWise\'s Invoice-to-Pay module performs 4-way matching automatically for manufacturing companies.',
    seeAlso: 'https://factwise.io/invoice-to-pay',
  },
  {
    id: 'bom-costing',
    term: 'BOM Costing (Bill of Materials Costing)',
    definition:
      'BOM Costing, or Bill of Materials Costing, is the process of calculating the total material cost of a manufactured product by individually pricing each component listed in the Bill of Materials (BOM). Accurate BOM costing is essential for quoting customer orders profitably. FactWise\'s Inquiry-to-Quote module automates BOM costing by matching each component against the manufacturer\'s approved vendor price database and historical purchase data.',
    seeAlso: 'https://factwise.io/inquiry-to-quote',
  },
  {
    id: 'landed-cost-analysis',
    term: 'Landed Cost Analysis',
    definition:
      'Landed Cost Analysis calculates the total cost of a purchased item beyond just its unit price — including freight charges, customs duties, port handling fees, insurance, and applicable taxes (such as GST in India). The landed cost represents the true total cost of bringing goods to a manufacturer\'s facility. Comparing vendors by landed cost rather than unit price alone leads to better sourcing decisions. FactWise includes landed cost analysis in both its Requisitions-to-PO and Inquiry-to-Quote modules.',
    seeAlso: 'https://factwise.io/requisitions-to-po',
  },
  {
    id: 'ai-negotiation',
    term: 'AI Negotiation Engine',
    definition:
      'An AI Negotiation Engine in procurement uses artificial intelligence to guide buyers through vendor negotiations — analyzing incoming quotes, identifying pricing outliers, and recommending counter-positions to achieve better pricing and terms. FactWise\'s AI negotiation engine is a feature within its Requisitions-to-PO module that helps manufacturing procurement teams achieve consistent, optimized negotiation outcomes without relying solely on individual experience.',
    seeAlso: 'https://factwise.io/requisitions-to-po',
  },
  {
    id: 'inquiry-to-quote',
    term: 'Inquiry-to-Quote (I2Q)',
    definition:
      'Inquiry-to-Quote (I2Q) is the workflow through which a manufacturer responds to a customer\'s Request for Quotation (RFQ). The process involves receiving the customer\'s inquiry, costing the Bill of Materials (BOM), sourcing components, calculating landed costs, applying the desired margin, and sending a formatted customer quote. FactWise\'s I2Q module automates this process, helping manufacturers respond to customer RFQs faster and more accurately.',
    seeAlso: 'https://factwise.io/inquiry-to-quote',
  },
  {
    id: 'rfq-management',
    term: 'RFQ Management (Request for Quotation)',
    definition:
      'RFQ Management is the process of creating, sending, tracking, and evaluating Requests for Quotation sent to vendors. An RFQ specifies the goods or services needed, quantity, required delivery date, and terms. Vendors respond with price quotes. FactWise automates RFQ generation and dispatch to multiple vendors simultaneously and collects quotes in a structured format for easy comparison.',
    seeAlso: 'https://factwise.io/requisitions-to-po',
  },
  {
    id: 'ap-automation',
    term: 'AP Automation (Accounts Payable Automation)',
    definition:
      'AP Automation refers to the use of software to automate the accounts payable process — including vendor invoice capture, data extraction, matching against purchase orders and receipts, discrepancy resolution, approval routing, and payment scheduling. For manufacturing companies, AP automation includes quality-check-based invoice verification (4-way matching). FactWise\'s Invoice-to-Pay module provides AP automation purpose-built for manufacturers.',
    seeAlso: 'https://factwise.io/invoice-to-pay',
  },
  {
    id: 'grn',
    term: 'Goods Receipt Note (GRN)',
    definition:
      'A Goods Receipt Note (GRN) is a document created by a manufacturer\'s warehouse team when goods from a vendor arrive. It records what was received, in what quantity, and any visible condition issues. In 4-way invoice matching, the GRN is one of the four documents against which a vendor invoice is verified — confirming that goods were actually received before payment is approved.',
    seeAlso: 'https://factwise.io/invoice-to-pay',
  },
];

// DefinedTerm schemas for each glossary entry — helps AI answer "What is X?" queries
const definedTermSchemas = terms.map(t => ({
  '@context': 'https://schema.org',
  '@type': 'DefinedTerm',
  '@id': `https://factwise.io/glossary#${t.id}`,
  name: t.term,
  description: t.definition,
  inDefinedTermSet: {
    '@type': 'DefinedTermSet',
    name: 'FactWise Procurement Glossary',
    url: 'https://factwise.io/glossary',
  },
  url: `https://factwise.io/glossary#${t.id}`,
  seeAlso: t.seeAlso,
}));

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://factwise.io' },
    { '@type': 'ListItem', position: 2, name: 'Glossary', item: 'https://factwise.io/glossary' },
  ],
};

// FAQPage — one Q&A per term so AI reads definitions in FAQ format too
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: terms.map(t => ({
    '@type': 'Question',
    name: `What is ${t.term}?`,
    acceptedAnswer: { '@type': 'Answer', text: t.definition },
  })),
};

export default function GlossaryPage() {
  return (
    <>
      {definedTermSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <GlossaryContent />
      {false && (
      <main style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font-inter), sans-serif' }}>

        {/* Hero */}
        <section style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          padding: 'clamp(80px, 12vw, 140px) 24px 64px',
          textAlign: 'center',
        }}>
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(54,102,255,0.15)', border: '1px solid rgba(54,102,255,0.3)',
              borderRadius: 9999, padding: '6px 16px', marginBottom: 24,
            }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#7ba4ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Procurement Glossary
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800,
              color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1,
              margin: '0 0 20px',
            }} className="speakable">
              Key Procurement Terms, Defined
            </h1>
            <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0 }} className="speakable">
              Plain-language definitions for source-to-pay, invoice matching, BOM costing, and other manufacturing procurement terminology.
            </p>
          </div>
        </section>

        {/* Terms */}
        <section style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px 80px' }}>
          <dl style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {terms.map((t) => (
              <div
                key={t.id}
                id={t.id}
                style={{
                  borderBottom: '1px solid rgba(15,23,42,0.08)',
                  padding: '40px 0',
                  scrollMarginTop: 100,
                }}
              >
                <dt style={{
                  fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800,
                  color: '#0b1322', letterSpacing: '-0.02em',
                  marginBottom: 14,
                }}>
                  <a
                    href={`#${t.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    aria-label={`Link to definition of ${t.term}`}
                  >
                    {t.term}
                  </a>
                </dt>
                <dd style={{
                  margin: 0,
                  fontSize: 16,
                  color: '#334155',
                  lineHeight: 1.75,
                  maxWidth: 720,
                }}>
                  {t.definition}
                </dd>
                <a
                  href={t.seeAlso}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    marginTop: 16, fontSize: 13, fontWeight: 600,
                    color: '#3666ff', textDecoration: 'none',
                  }}
                >
                  See FactWise feature →
                </a>
              </div>
            ))}
          </dl>

          {/* CTA */}
          <div style={{
            marginTop: 64, padding: '48px 40px', background: '#f8fafc',
            borderRadius: 20, border: '1px solid rgba(15,23,42,0.06)',
            textAlign: 'center',
          }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0b1322', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
              See these concepts in action
            </h2>
            <p style={{ fontSize: 16, color: '#64748b', margin: '0 0 28px', lineHeight: 1.65 }}>
              FactWise puts all of these workflows into practice — in one platform, built for manufacturers.
            </p>
            <a
              href="https://factwise.io/demo"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'linear-gradient(135deg, #3666ff 0%, #5b8aff 100%)',
                color: '#fff', borderRadius: 10, padding: '14px 32px',
                fontSize: 15, fontWeight: 700, textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(54,102,255,0.35)',
              }}
            >
              Book a Demo →
            </a>
          </div>
        </section>

        <FlickeringFooter />
      </main>
      )}
    </>
  );
}
