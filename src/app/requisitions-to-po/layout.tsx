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

export default function ReqToPoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
