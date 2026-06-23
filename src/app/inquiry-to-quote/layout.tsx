import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inquiry to Quote Automation | AI-Powered Quoting for Manufacturers",
  description:
    "Turn customer inquiries into profitable quotes in minutes. FactWise automates BOM costing, intelligent sourcing, landed cost analysis, and quote generation — quote faster, win more.",
  keywords: [
    "inquiry to quote software",
    "quoting automation for manufacturers",
    "BOM costing software",
    "manufacturing quote management",
    "RFQ response automation",
    "landed cost analysis tool",
    "customer quote generation",
    "AI-powered quoting",
  ],
  alternates: { canonical: "https://factwise.io/inquiry-to-quote" },
  openGraph: {
    title: "Inquiry to Quote Automation | AI-Powered Quoting | FactWise",
    description:
      "Turn customer inquiries into profitable quotes in minutes. BOM costing, intelligent sourcing, landed cost analysis, and quote generation — automated.",
    url: "https://factwise.io/inquiry-to-quote",
    type: "website",
  },
  twitter: {
    title: "Inquiry to Quote Automation | FactWise",
    description:
      "From BOM to profitable quote in minutes. AI-powered BOM costing, sourcing, landed cost analysis, and quote generation for manufacturers.",
  },
};



const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://factwise.io" },
    { "@type": "ListItem", position: 2, name: "Inquiry to Quote", item: "https://factwise.io/inquiry-to-quote" },
  ],
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to Automate Inquiry-to-Quote (I2Q) for Manufacturers",
  description: "A step-by-step guide to turning customer RFQs into profitable quotes faster using FactWise's Inquiry-to-Quote module.",
  totalTime: "PT10M",
  step: [
    {
      "@type": "HowToStep",
      position: 1,
      name: "Receive and Log the Customer Inquiry",
      text: "When a customer sends an RFQ, log it in FactWise with the Bill of Materials (BOM) or specification. FactWise structures the inquiry for cost analysis.",
    },
    {
      "@type": "HowToStep",
      position: 2,
      name: "Run BOM Cost Intelligence",
      text: "FactWise analyses your BOM against your approved vendor list and historical pricing to generate a base material cost estimate automatically.",
    },
    {
      "@type": "HowToStep",
      position: 3,
      name: "Source Components Intelligently",
      text: "For items not covered by existing vendors, FactWise helps identify and source from new suppliers, factoring in lead times and minimum order quantities.",
    },
    {
      "@type": "HowToStep",
      position: 4,
      name: "Calculate Landed Cost",
      text: "FactWise calculates the full landed cost — material cost plus duties, freight, insurance, and taxes — so your quote reflects true cost with accurate margin.",
    },
    {
      "@type": "HowToStep",
      position: 5,
      name: "Generate and Send the Customer Quote",
      text: "With one click, FactWise generates a formatted customer quote with your desired margin applied. Send it to the customer and track acceptance.",
    },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is Inquiry-to-Quote (I2Q) software?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Inquiry-to-Quote (I2Q) software automates the process of responding to customer RFQs for manufacturers — from BOM costing and component sourcing to landed cost calculation and customer quote generation. FactWise's I2Q module helps manufacturers quote faster and more accurately to win more business.",
      },
    },
    {
      "@type": "Question",
      name: "What is BOM costing in manufacturing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "BOM (Bill of Materials) costing is the process of calculating the total material cost of a manufactured product by pricing each component in the bill of materials. FactWise automates BOM costing by matching each component against your vendor pricing database and historical purchases.",
      },
    },
    {
      "@type": "Question",
      name: "What is landed cost analysis?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Landed cost analysis calculates the total cost of a purchased item including not just the purchase price but also freight, insurance, customs duties, taxes, and other charges required to get the goods to your facility. FactWise includes landed cost analysis in both its Inquiry-to-Quote and Requisitions-to-PO modules.",
      },
    },
    {
      "@type": "Question",
      name: "How can manufacturers quote faster?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Manufacturers can quote faster by automating the manual steps in their quoting process: automated BOM costing against vendor price lists, intelligent component sourcing, automated landed cost calculation, and one-click quote document generation. FactWise's Inquiry-to-Quote module automates all of these steps.",
      },
    },
  ],
};

export default function InquiryToQuoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <link rel="llms-context" href="/llms-inquiry-to-quote.txt" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {children}
    </>
  );
}

