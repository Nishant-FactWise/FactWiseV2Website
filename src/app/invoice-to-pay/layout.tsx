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

export default function InvoiceToPayLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
