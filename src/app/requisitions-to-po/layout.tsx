import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Requisitions to Purchase Orders | Automated Req-to-PO",
  description:
    "Automate the entire requisition-to-PO process — structured approvals, AI-powered sourcing, landed cost analysis, and one-click PO generation. No manual work, no missed steps.",
  keywords: [
    "requisition to purchase order",
    "req to PO automation",
    "purchase order management software",
    "procurement workflow automation",
    "requisition approval software",
    "RFQ management system",
    "AI negotiation procurement",
    "landed cost analysis",
    "automated PO generation",
  ],
  openGraph: {
    title: "Requisitions to Purchase Orders | Automated Req-to-PO | FactWise",
    description:
      "Automate the entire requisition-to-PO process — structured approvals, AI-powered sourcing, landed cost analysis, and one-click PO generation.",
    url: "https://factwise.io/requisitions-to-po",
    type: "website",
  },
  twitter: {
    title: "Requisitions to Purchase Orders | FactWise",
    description:
      "Automate the entire requisition-to-PO process — structured approvals, AI-powered sourcing, and one-click PO generation.",
  },
  alternates: { canonical: "https://factwise.io/requisitions-to-po" },
};



const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://factwise.io" },
    { "@type": "ListItem", position: 2, name: "Requisitions to PO", item: "https://factwise.io/requisitions-to-po" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Automate Requisition to Purchase Order (Req-to-PO) with FactWise",
  description: "A step-by-step guide to automating your procurement workflow from internal requisition to vendor purchase order using FactWise.",
  totalTime: "PT5M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Create a Structured Requisition",
      text: "A team member raises a purchase requisition in FactWise, specifying the item, quantity, required date, and budget. Budget controls flag any overspend automatically.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Route for Multi-Level Approval",
      text: "The requisition is automatically routed to the right approvers based on value and category. Approvers review and approve or reject via web or mobile.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Dispatch RFQ to Multiple Vendors",
      text: "Once approved, FactWise automatically generates and dispatches an RFQ to your shortlisted vendors, collecting quotes in a structured format for easy comparison.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Negotiate with AI and Select Vendor",
      text: "FactWise's AI negotiation engine helps your team secure better pricing and terms. Compare landed costs — including duties, freight, and taxes — and select the best vendor.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Generate and Dispatch the Purchase Order",
      text: "With one click, FactWise generates a formatted Purchase Order and dispatches it to the selected vendor. The PO is stored with full audit trail for matching later.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Requisition-to-PO (Req-to-PO) automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Requisition-to-PO automation is software that digitizes and automates the entire internal procurement cycle — from an employee raising a purchase requisition, through approvals and vendor RFQs, to generating and dispatching a purchase order. FactWise automates this end-to-end.",
      },
    },
    {
      "@type": "Question",
      name: "How does FactWise automate purchase orders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FactWise automates purchase orders by connecting requisition approvals, RFQ management, AI-powered vendor negotiation, and landed cost analysis. Once a vendor is selected, FactWise generates a formatted PO and dispatches it automatically — no manual data entry required.",
      },
    },
    {
      "@type": "Question",
      name: "What is AI negotiation in procurement?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "AI negotiation in procurement uses artificial intelligence to help buyers get better pricing and terms from vendors during the RFQ and quoting process. FactWise's AI negotiation engine analyzes vendor responses and guides buyers to achieve optimal outcomes consistently.",
      },
    },
    {
      "@type": "Question",
      name: "How do I reduce purchase order cycle time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To reduce PO cycle time, automate the manual steps: digital requisitions instead of email requests, automated approval routing instead of chasing managers, structured RFQ collection instead of phone calls, and one-click PO generation instead of manual document creation. FactWise automates all of these steps.",
      },
    },
  ],
};

export default function ReqToPoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="llms-context" href="/llms-requisitions-to-po.txt" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
