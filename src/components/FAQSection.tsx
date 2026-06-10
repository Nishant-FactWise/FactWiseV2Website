'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { GLOBAL_LAYOUT } from './LayoutConfig';

const DEFAULT_CATEGORIES = ['All', 'Product', 'Sourcing', 'Payments', 'Integration', 'Security', 'Pricing'] as const;

export interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Product',
    q: 'What is FactWise?',
    a: 'FactWise is an end-to-end source-to-pay platform covering the entire operational lifecycle -- from requisitions and RFQs to purchase orders, goods receipt, invoice matching, and payments. It replaces fragmented spreadsheets and email-based workflows with a single connected system, giving every team real-time visibility into spend, suppliers, and approvals.',
  },
  {
    category: 'Product',
    q: 'Who is FactWise built for?',
    a: 'FactWise is built for mid-to-large manufacturing and enterprise companies with active sourcing and supply chain operations. Operations leaders get end-to-end visibility, finance teams get spend control, sourcing teams get advanced bidding tools, and IT gets a secure, API-first platform -- all in one place.',
  },
  {
    category: 'Product',
    q: 'How long does onboarding take?',
    a: 'Most teams are fully live within 4-6 weeks. FactWise includes guided onboarding, vendor master migration support, and pre-built ERP connectors. There is no months-long implementation cycle -- a dedicated customer success manager works alongside your team from day one.',
  },
  {
    category: 'Sourcing',
    q: 'How does the RFQ and bidding process work?',
    a: 'You create an RFQ event, define line items and bid criteria, then invite vendors. FactWise sends secure, time-limited bid links -- vendors respond without needing an account. You can run multiple negotiation rounds, compare bids using a landed cost breakdown (base rate + freight + taxes + duties), and award to one or split across multiple vendors. POs are auto-generated from the award.',
  },
  {
    category: 'Sourcing',
    q: 'Can vendors bid without creating a FactWise account?',
    a: 'Yes. Vendors receive a secure, tokenised bid link via email. They can submit bids, attach supporting documents, and respond to clarification queries without registering on the platform. This maximises vendor participation and keeps response rates high.',
  },
  {
    category: 'Payments',
    q: 'What is 3-way matching and how does it work?',
    a: 'Three-way matching automatically cross-checks the Purchase Order, the Goods Receipt Note (GRN), and the Supplier Invoice across price, quantity, tax, and payment terms. If any of 7 defined mismatch conditions are detected -- such as a price deviation or missing GRN -- the invoice is automatically held and flagged for review before payment is released. This eliminates overpayments and reduces fraud risk.',
  },
  {
    category: 'Payments',
    q: 'How are credits, prepayments, and deductions handled?',
    a: 'FactWise tracks prepayments, QC rejection credits, and netting across invoices in a unified credit ledger. Deductions from quality rejections can be linked directly to the affected GRN and netted against the corresponding invoice -- no manual reconciliation needed.',
  },
  {
    category: 'Integration',
    q: 'Does FactWise integrate with our ERP or accounting system?',
    a: 'Yes. FactWise provides a REST API with webhooks for real-time bi-directional sync. Pre-built connectors are available for SAP, Oracle, Tally, and other common ERPs. Your master data (vendor masters, item codes, cost centres) can be imported and kept in sync automatically. Custom integrations can be built using the documented API.',
  },
  {
    category: 'Security',
    q: 'How does FactWise handle data security and compliance?',
    a: 'FactWise is SOC 2 Type II certified. All data is encrypted with AES-256 at rest and in transit. Role-based access controls (RBAC), field-level permissions, and audit logs are built in. Single Sign-On (SAML 2.0 / OAuth 2.0) integrates with your identity provider. Data residency options are available for enterprise customers.',
  },
  {
    category: 'Pricing',
    q: 'How is FactWise priced?',
    a: 'FactWise is priced by module and scales with your transaction volume -- not by per-seat headcount. You activate the modules your team needs (Sourcing, Purchase Orders, Invoice Matching, Analytics) and pay based on usage. Contact us for a quote tailored to your operational volume and team structure.',
  },
  {
    category: 'Pricing',
    q: 'Is there a free trial or product demo?',
    a: 'We offer a guided live demo built around your actual use cases -- not a generic slide deck. A product specialist walks your team through the workflows most relevant to you, with sample data from your industry. Reach out to schedule a 45-minute session.',
  },
];

interface FAQSectionProps {
  faqs?: FAQItem[];
  title?: React.ReactNode;
  description?: string;
}

export default function FAQSection({ faqs = FAQS, title, description }: FAQSectionProps) {
  // If we are using default FAQs, default to 'Product', else default to 'All'
  const isDefault = faqs === FAQS;
  const [activeCategory, setActiveCategory] = useState<string>(isDefault ? 'Product' : 'All');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Compute dynamic categories based on provided faqs
  const dynamicCategories = ['All', ...Array.from(new Set(faqs.map(f => f.category)))];

  const filtered = faqs.filter(
    (f) => activeCategory === 'All' || f.category === activeCategory
  );

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <section
      style={{
        width: '100%',
        background: '#ffffff',
        padding: `96px ${GLOBAL_LAYOUT.paddingX}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 600,
          height: 400,
          background: 'radial-gradient(ellipse, rgba(54,102,255,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <SectionHeader
          label="Support"
          title={
            title || (
              <>
                Frequently Asked <span className="italic" style={{ color: '#3666ff' }}>Questions</span>
              </>
            )
          }
          description={description || "Everything you need to know about FactWise -- how it works, how it fits your stack, and what it takes to get started."}
          align="center"
        />

        {/* Category filter pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'center',
            marginBottom: 48,
          }}
        >
          {dynamicCategories.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                style={{
                  padding: '8px 24px',
                  borderRadius: 100,
                  border: 'none',
                  background: isActive ? '#3666ff' : '#f0f4ff',
                  color: isActive ? '#ffffff' : '#3666ff',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontFamily: 'inherit',
                  boxShadow: isActive ? '0 4px 12px rgba(54,102,255,0.25)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#e6eeff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = '#f0f4ff';
                  }
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <motion.div
                  key={`${activeCategory}-${faq.q}`}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, delay: i * 0.04 }}
                  style={{
                    background: isOpen ? '#eef4ff' : '#ffffff',
                    border: 'none',
                    borderRadius: 16,
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    marginBottom: 12,
                    boxShadow: isOpen ? 'none' : '0 4px 20px rgba(0,0,0,0.03)',
                  }}
                >
                  {/* Question row */}
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      padding: '18px 20px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'inherit',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <span
                        style={{
                          fontSize: 17,
                          fontWeight: 700,
                          color: isOpen ? '#3666ff' : '#000000',
                          letterSpacing: '-0.01em',
                          lineHeight: 1.4,
                          transition: 'color 0.3s ease',
                        }}
                      >
                        {faq.q}
                      </span>
                    </div>

                    {/* Toggle icon */}
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {isOpen
                        ? <Minus size={20} color={isOpen ? "#3666ff" : "#000000"} strokeWidth={2.5} />
                        : <Plus size={20} color="#000000" strokeWidth={2.5} />
                      }
                    </div>
                  </button>

                  {/* Answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.25, 0, 0.25, 1] }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div
                          style={{
                            padding: '0px 20px 24px 20px',
                            fontSize: 15,
                            color: '#4b5563',
                            lineHeight: 1.6,
                            fontWeight: 500,
                          }}
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
