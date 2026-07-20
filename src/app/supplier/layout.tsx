import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FactWise for Suppliers | Engage, Respond via Excel, API, or AI",
  description:
    "FactWise works with every supplier seamlessly. Respond manually, through Excel round-trips, Open APIs, or fully automatically via AI price repository matching — quote faster and win more business.",
  keywords: [
    "supplier portal for manufacturers",
    "RFQ response automation",
    "Excel RFQ upload",
    "AI quote automation for suppliers",
    "open API procurement supplier",
    "distributor component pricing software",
    "auto respond RFQ",
    "MPN price list management",
  ],
  alternates: { canonical: "https://factwise.io/supplier" },
  openGraph: {
    title: "FactWise for Suppliers | Simply and Seamlessly | FactWise",
    description:
      "Whether your suppliers respond manually, through APIs, or fully automatically — FactWise makes it effortless to engage, respond, and win business without friction.",
    url: "https://factwise.io/supplier",
    type: "website",
  },
  twitter: {
    title: "FactWise for Suppliers | Respond via Excel, API, or AI",
    description:
      "Eliminate manual RFQ overload. Respond manually, via drag-and-drop Excel roundtrips, Open APIs, or automated AI price matching.",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://factwise.io" },
    { "@type": "ListItem", position: 2, name: "For Suppliers", item: "https://factwise.io/supplier" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How Suppliers Respond and Win Business on FactWise",
  description: "A quick overview of how suppliers, distributors, and component manufacturers respond to RFQs on FactWise via Manual Portal, Excel, API, or AI Auto-Response.",
  totalTime: "PT3M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Choose Your Engagement Method",
      text: "Decide whether your team will respond manually on the web platform, via offline Excel round-trips, directly via Open APIs, or through AI Auto-Response.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Instant Excel Round-Trip or Portal Entry",
      text: "If using Excel, download the structured RFQ spreadsheet, fill your unit rates offline, and re-upload. FactWise parses all 100+ line items in under a second.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Or Enable AI-Powered Auto-Response",
      text: "Upload your custom MPN-wise price list (with MOQ, SPQ, and volume tiers) to FactWise. When an RFQ lands, FactWise AI matches line items automatically and responds on your behalf.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Track Award Status and Orders",
      text: "Get real-time feedback on evaluation rankings and instant notifications when purchase orders are awarded to your winning bid.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do suppliers have to pay or log into complex portals on FactWise?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. Responding on FactWise is frictionless. Suppliers can choose to log into the clean web dashboard, download and re-upload an Excel spreadsheet without any reformatting, connect their ERP via Open APIs, or let AI auto-respond from their pricing repository.",
      },
    },
    {
      "@type": "Question",
      name: "How does the Excel round-trip feature work for suppliers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Suppliers can download the exact RFQ template right from FactWise, input their item prices, minimum order quantities (MOQ), and lead times in Excel offline, and upload the file back. FactWise parses and structures the data instantly with zero errors.",
      },
    },
    {
      "@type": "Question",
      name: "What is FactWise AI-Powered Auto-Response for suppliers?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Distributors and component suppliers can store their complete MPN-wise pricing repository (including MOQ, SPQ, contracts, and manufacturer details) on FactWise. The moment a buyer RFQ lands, FactWise AI automatically matches line items against the repository, selects the best tiered price, and responds instantly with 100% accuracy.",
      },
    },
    {
      "@type": "Question",
      name: "Can our internal ERP respond automatically via API?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FactWise provides open REST and GraphQL API endpoints that give your systems complete access to every RFQ you've been invited to. Your ERP or CRM pulls item details in one call, applies your custom pricing logic, and dispatches quotes automatically without portal logins.",
      },
    },
  ],
};

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="llms-context" href="/llms-supplier.txt" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}
