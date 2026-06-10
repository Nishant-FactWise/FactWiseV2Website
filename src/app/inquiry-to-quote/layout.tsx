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

export default function InquiryToQuoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
