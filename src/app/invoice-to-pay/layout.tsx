import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Invoice to Pay Automation | 4-Way Invoice Matching",
  description:
    "Automate invoice capture, 4-way matching across PO, GR, QC, and contract, and payment processing. Every invoice verified, every discrepancy caught, every rupee accounted for.",
  keywords: [
    "invoice automation software",
    "4-way invoice matching",
    "accounts payable automation",
    "invoice processing software",
    "payment automation",
    "invoice to pay",
    "AP automation manufacturing",
    "goods receipt verification",
    "invoice discrepancy management",
    "overpayment prevention",
  ],
  openGraph: {
    title: "Invoice to Pay Automation | 4-Way Matching | FactWise",
    description:
      "Automate invoice capture, 4-way matching across PO, GR, QC, and contract, and payment processing. Every invoice verified, every discrepancy caught.",
    url: "https://factwise.io/invoice-to-pay",
    type: "website",
  },
  twitter: {
    title: "Invoice to Pay Automation | FactWise",
    description:
      "4-way validation across PO, GR, QC, and contract — every discrepancy caught before a single payment moves.",
  },
  alternates: { canonical: "https://factwise.io/invoice-to-pay" },
};



const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://factwise.io" },
    { "@type": "ListItem", position: 2, name: "Invoice to Pay", item: "https://factwise.io/invoice-to-pay" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Automate Invoice Processing with 4-Way Matching",
  description: "A step-by-step guide to automating vendor invoice capture, verification, and payment using FactWise's Invoice-to-Pay module.",
  totalTime: "PT3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Capture the Vendor Invoice",
      text: "FactWise captures vendor invoices automatically from PDF uploads, email, or vendor portal submissions. AI extracts invoice data so no manual keying is required.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Run 4-Way Matching",
      text: "FactWise automatically matches each invoice line against the Purchase Order, the Goods Receipt, the Quality Check report, and the Contract. Any discrepancy is flagged immediately.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Resolve Discrepancies",
      text: "When mismatches are detected, FactWise routes them to the right team for resolution — procurement, warehouse, or finance — with full context available in one screen.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Approve and Schedule Payment",
      text: "Once verified, invoices move through your approval workflow and are scheduled for payment on the agreed terms. The full audit trail is preserved for every transaction.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is 4-way invoice matching?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "4-way invoice matching automatically reconciles a vendor invoice against four documents: the Purchase Order (PO), the Goods Receipt (GR), the Quality Check (QC) report, and the Contract. This catches discrepancies before payment is approved, preventing overpayments and duplicate invoices. FactWise performs 4-way matching automatically.",
      },
    },
    {
      "@type": "Question",
      name: "How does invoice automation software work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Invoice automation software captures vendor invoices digitally (from PDF, email, or portals), extracts the data using AI or OCR, matches them against purchase orders and receipts, flags discrepancies, routes approvals, and schedules payments — all without manual data entry. FactWise handles this full cycle.",
      },
    },
    {
      "@type": "Question",
      name: "How do I prevent duplicate invoice payments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most reliable way to prevent duplicate invoice payments is automated 4-way matching — checking each invoice against the PO, goods receipt, quality check, and contract before approving payment. FactWise's Invoice-to-Pay module catches duplicates, quantity mismatches, and price discrepancies automatically.",
      },
    },
    {
      "@type": "Question",
      name: "What is AP automation for manufacturing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Accounts Payable (AP) automation for manufacturing refers to software that automates vendor invoice processing in manufacturing environments — capturing invoices, matching them to POs and goods receipts (including quality checks unique to manufacturing), routing approvals, and processing payments. FactWise's Invoice-to-Pay module is designed specifically for this use case.",
      },
    },
  ],
};

export default function InvoiceToPayLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="llms-context" href="/llms-invoice-to-pay.txt" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
