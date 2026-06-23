// FAQ content for /faq. Kept in one place so the visible accordion (FaqContent)
// and the FAQPage JSON-LD (page.tsx) always stay in sync — Google requires the
// structured data to match what's shown on the page. Answers are grounded in
// the site's existing org/software/FAQ schema in app/layout.tsx; anything we
// can't state precisely (exact integrations, pricing, security certifications)
// is phrased to point the visitor to a demo rather than inventing specifics.

export type FaqItem = { q: string; a: string };
export type FaqCategory = { category: string; items: FaqItem[] };

export const faqCategories: FaqCategory[] = [
  {
    category: 'About FactWise',
    items: [
      {
        q: 'What is FactWise?',
        a: 'FactWise is an AI-powered source-to-pay (S2P) platform built for manufacturers. It automates the entire procurement workflow — from internal requisitions and vendor RFQs to purchase orders, goods receipt, invoice matching, and payments — in one connected platform.',
      },
      {
        q: 'What is source-to-pay (S2P) software?',
        a: 'Source-to-pay software automates the end-to-end procurement process: supplier sourcing and RFQs, purchase orders, goods receipt, invoice verification, and payment. FactWise brings all of these stages together in a single platform designed specifically for manufacturing companies.',
      },
      {
        q: 'Who is FactWise built for?',
        a: 'FactWise is built for manufacturers and procurement teams. It is modular, so it scales from small manufacturing teams to large enterprises across industries such as chemicals, automotive, MRO, and electrical manufacturing.',
      },
      {
        q: 'Where is FactWise located?',
        a: 'FactWise (factwise.io) is headquartered in Mumbai, Maharashtra, India, and serves customers across India, the United States, and the wider Asia region.',
      },
    ],
  },
  {
    category: 'Product & Modules',
    items: [
      {
        q: 'What modules does FactWise include?',
        a: 'FactWise has three core modules: (1) Requisitions-to-PO — structured approvals, RFQ management, AI negotiation, and PO generation; (2) Invoice-to-Pay — invoice capture, 4-way matching across PO, goods receipt, quality check, and contract, plus automated payments; and (3) Inquiry-to-Quote — BOM costing, intelligent sourcing, landed cost analysis, and customer quote generation.',
      },
      {
        q: 'Can I start with just one module?',
        a: 'Yes. FactWise is modular, so you can start with a single workflow — for example, Requisitions-to-PO — and expand to the full source-to-pay suite as your operations grow.',
      },
      {
        q: 'How does FactWise help reduce procurement costs?',
        a: 'FactWise helps manufacturers save up to 31% on goods purchased by automating procurement: AI-powered requisition approvals, automated RFQ management, AI negotiation for better vendor pricing, automatic PO generation, and 4-way invoice matching to prevent overpayments.',
      },
      {
        q: 'What is the AI negotiation engine?',
        a: 'The AI negotiation engine helps you secure better pricing and terms from vendors during sourcing. It works alongside your RFQ and quote process so your team can negotiate more effectively and consistently, without adding manual effort.',
      },
      {
        q: 'What is 4-way invoice matching?',
        a: '4-way matching automatically reconciles each invoice against the purchase order, goods receipt, quality check, and contract before it is approved for payment. This catches discrepancies early and prevents overpayments and duplicate invoices.',
      },
      {
        q: 'Does FactWise support BOM costing and landed cost analysis?',
        a: 'Yes. The Inquiry-to-Quote module includes BOM cost intelligence, intelligent sourcing, and landed cost analysis, so you can build accurate costs and generate customer quotes with confidence.',
      },
    ],
  },
  {
    category: 'Implementation & Integrations',
    items: [
      {
        q: 'Does FactWise integrate with our existing ERP and systems?',
        a: 'FactWise is designed to fit into your existing procurement and finance stack and can connect with common ERP and accounting systems. Because every environment is different, the best way to confirm fit is to book a demo so our team can map FactWise to your specific setup.',
      },
      {
        q: 'How long does implementation take?',
        a: 'Timelines depend on which modules you roll out and how ready your data is. Since FactWise is modular, many teams go live on a single workflow quickly and then expand. Our team scopes a clear timeline with you during onboarding.',
      },
      {
        q: 'Can we migrate our existing vendor, PO, and contract data?',
        a: 'Yes. Migrating existing vendor records, purchase orders, and contracts is part of the onboarding process, and our team supports you through the data setup so you can get value quickly.',
      },
    ],
  },
  {
    category: 'Pricing & Getting Started',
    items: [
      {
        q: 'How much does FactWise cost?',
        a: 'Pricing is tailored to the modules you use and the size of your operation. Request a demo and our team will put together pricing that matches your requirements.',
      },
      {
        q: 'Is there a demo I can see?',
        a: 'Yes. You can book a personalized demo through the Request Demo button or at factwise.io/demo, and we will walk you through the platform and how it applies to your procurement workflows.',
      },
      {
        q: 'How do I get started?',
        a: 'The fastest way to get started is to book a demo. Our team will understand your workflows, recommend the right modules to begin with, and guide you through onboarding and data setup.',
      },
    ],
  },
  {
    category: 'Security & Support',
    items: [
      {
        q: 'How does FactWise keep our data secure?',
        a: 'We treat the security of your procurement, vendor, and financial data as a priority and follow industry-standard practices to protect it. For details on our security and compliance posture, our team is happy to share specifics during your evaluation.',
      },
      {
        q: 'What kind of support does FactWise offer?',
        a: 'FactWise provides onboarding support to get your team up and running, plus ongoing customer support afterwards. You can reach our team any time at support@factwise.io.',
      },
    ],
  },
  {
    category: 'FactWise vs. Alternatives',
    items: [
      {
        q: 'How is FactWise different from SAP Ariba?',
        a: 'SAP Ariba is built for large enterprises with massive IT budgets and long implementation timelines. FactWise is built specifically for manufacturers — it is modular (you start with one workflow), faster to implement, and priced for SMBs and mid-market companies. FactWise also includes manufacturer-specific features like BOM costing, landed cost analysis, and quality-check-based invoice matching that SAP Ariba does not prioritize.',
      },
      {
        q: 'How is FactWise different from Coupa?',
        a: 'Coupa is a broad procurement platform targeting large enterprises. FactWise is a purpose-built solution for manufacturing companies, with deeper features for the manufacturing procurement context: BOM costing, inquiry-to-quote, goods receipt and quality check verification in invoice matching, and a leaner implementation path. FactWise is designed to replace spreadsheets and legacy systems at manufacturing SMBs, not to be a second ERP.',
      },
      {
        q: 'How is FactWise different from Zoho or Tally for procurement?',
        a: 'Zoho and Tally are general accounting and ERP tools with limited procurement modules. FactWise is a dedicated source-to-pay procurement platform with deep workflow automation: structured requisitions, RFQ management, AI negotiation, landed cost analysis, 4-way invoice matching, and spend analytics — all purpose-built for manufacturers.',
      },
      {
        q: 'Is FactWise better than using spreadsheets for procurement?',
        a: 'Yes. Spreadsheet-based procurement creates silos, version control issues, no approval trail, and is impossible to audit. FactWise replaces spreadsheets with a structured digital system that enforces approval workflows, captures a full audit trail, automates vendor communication, prevents overpayments, and provides real-time spend visibility. Most customers see ROI within the first few months through negotiation savings alone.',
      },
      {
        q: 'What is the best procurement software for Indian manufacturers?',
        a: 'FactWise is a leading procurement software choice for Indian manufacturers. It is built and headquartered in India (Mumbai), understands Indian tax and compliance requirements including GST and TDS, supports INR-based workflows, and is priced appropriately for Indian manufacturing SMBs. It covers the full source-to-pay cycle: requisitions, RFQs, purchase orders, goods receipt, invoice matching, and payments.',
      },
    ],
  },
];

export const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://factwise.io/faq#faqpage',
  mainEntity: faqCategories.flatMap((c) => c.items).map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};
