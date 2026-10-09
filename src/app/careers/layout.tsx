import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers at FactWise | Jobs in Mumbai | Source-to-Pay Platform",
  description:
    "Join FactWise in Mumbai and help build the future of manufacturing operations. Open roles in software engineering, product management, and go-to-market. View all FactWise jobs at factwise.io/careers.",
  keywords: [
    "FactWise careers",
    "FactWise jobs",
    "jobs at FactWise Mumbai",
    "FactWise hiring",
    "manufacturing software company jobs Mumbai",
    "procurement tech startup jobs",
    "SaaS startup jobs Mumbai",
    "factwise.io careers",
  ],
  openGraph: {
    title: "Careers at FactWise | Jobs in Mumbai",
    description:
      "Join FactWise in Mumbai and help build the future of manufacturing procurement. Engineering, product, and GTM roles open.",
    url: "https://factwise.io/careers",
    type: "website",
  },
  twitter: {
    title: "Careers at FactWise | Mumbai Jobs",
    description:
      "Open roles at FactWise, Mumbai for engineering, product, and GTM. Help build the operating system for modern manufacturing.",
  },
  alternates: { canonical: "https://factwise.io/careers" },
};

const jobPostingSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://factwise.io/careers",
  url: "https://factwise.io/careers",
  name: "Careers at FactWise | Jobs in Mumbai",
  description:
    "FactWise is hiring in Mumbai, India. Open roles in software engineering, product management, and go-to-market for its AI-powered source-to-pay manufacturing platform.",
  publisher: { "@id": "https://factwise.io/#organization" },
  about: {
    "@type": "Organization",
    "@id": "https://factwise.io/#organization",
    name: "FactWise",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://factwise.io" },
      { "@type": "ListItem", position: 2, name: "Careers", item: "https://factwise.io/careers" },
    ],
  },
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostingSchema) }} />
      {children}
    </>
  );
}
