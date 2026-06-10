import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About FactWise | Reimagining Manufacturing Operations",
  description:
    "FactWise is building the operating system for modern manufacturing — connecting every team, vendor, and workflow into one intelligent platform that automates procurement and operations.",
  keywords: [
    "about FactWise",
    "manufacturing software company",
    "procurement automation company",
    "source to pay company",
    "manufacturing operations platform",
  ],
  openGraph: {
    title: "About FactWise | Reimagining Manufacturing Operations",
    description:
      "FactWise is building the operating system for modern manufacturing — connecting every team, vendor, and workflow into one intelligent platform.",
    url: "https://factwise.io/about",
    type: "website",
  },
  twitter: {
    title: "About FactWise",
    description:
      "Building the operating system for modern manufacturing — one intelligent platform for every workflow.",
  },
  alternates: { canonical: "https://factwise.io/about" },
};

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": "https://factwise.io/about",
  url: "https://factwise.io/about",
  name: "About FactWise",
  description:
    "FactWise is building the operating system for modern manufacturing — connecting every team, vendor, and workflow into one intelligent platform.",
  publisher: { "@id": "https://factwise.io/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://factwise.io" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://factwise.io/about" },
    ],
  },
  mainEntity: {
    "@type": "Organization",
    "@id": "https://factwise.io/#organization",
    founder: {
      "@type": "Person",
      name: "Stawan Kamani",
      jobTitle: "Founder & CEO",
      worksFor: { "@id": "https://factwise.io/#organization" },
      sameAs: [
        "https://www.linkedin.com/in/stawankamani",
        "https://twitter.com/stawankamani"
      ]
    }
  }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      {children}
    </>
  );
}
