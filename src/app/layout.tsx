import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollToTop from "@/components/ui/ScrollToTop";
import { Header } from "@/components/ui/header-2";
import CookieConsent from "@/components/ui/CookieConsent";
import ConditionalSplashLoader from "@/components/ConditionalSplashLoader";
import AnalyticsTracker from "@/components/AnalyticsTracker";

const GTM_ID = "GTM-K6XQZW7";
const GA4_ID = "G-Y5X31H49ZS";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://factwise.io"),
  title: {
    default: "FactWise | AI-Powered Source-to-Pay Platform for Manufacturers",
    template: "%s | FactWise",
  },
  description:
    "FactWise automates the entire source-to-pay process for manufacturers — from requisitions and RFQs to purchase orders, invoices, and payments. One AI-powered platform, every workflow.",
  keywords: [
    "source to pay platform",
    "procurement software for manufacturers",
    "manufacturing procurement",
    "purchase order automation",
    "invoice automation software",
    "RFQ management software",
    "vendor management platform",
    "S2P software",
    "procurement automation",
    "AP automation",
    "requisition management",
    "inquiry to quote software",
  ],
  authors: [{ name: "FactWise", url: "https://factwise.io" }],
  creator: "FactWise",
  publisher: "FactWise",
  category: "Business Software",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://factwise.io",
    siteName: "FactWise",
    title: "FactWise | AI-Powered Source-to-Pay Platform for Manufacturers",
    description:
      "FactWise automates the entire source-to-pay process for manufacturers — from requisitions and RFQs to purchase orders, invoices, and payments.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "FactWise — AI-Powered Source-to-Pay Platform for Manufacturers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@factwise",
    creator: "@factwise",
    title: "FactWise | AI-Powered Source-to-Pay Platform for Manufacturers",
    description:
      "FactWise automates the entire source-to-pay process for manufacturers — from requisitions and RFQs to purchase orders, invoices, and payments.",
    images: ["/logo.png"],
  },
  alternates: {
    canonical: "https://factwise.io",
  },
  // Icons are picked up automatically from src/app/icon.png, apple-icon.png
  // and favicon.ico via Next's file-based metadata convention. Regenerate
  // with `node scripts/build-favicon.js` after replacing public/logo.png.
};

// ── Global JSON-LD schemas injected on every page ──────────────────────────
const orgSchema = {
  "@context": "https://schema.org",
  // Dual @type helps Google identify both the legal entity and its industry
  "@type": ["Organization", "Corporation"],
  "@id": "https://factwise.io/#organization",
  name: "FactWise",
  // Disambiguates from other companies named FactWise (ERC tax, goals app, math app)
  legalName: "FactWise Technologies Private Limited",
  url: "https://factwise.io",
  logo: {
    "@type": "ImageObject",
    "@id": "https://factwise.io/#logo",
    url: "https://factwise.io/logo.png",
    contentUrl: "https://factwise.io/logo.png",
    width: 200,
    height: 60,
    caption: "FactWise — Source-to-Pay Platform for Manufacturers",
  },
  image: { "@id": "https://factwise.io/#logo" },
  description:
    "FactWise (factwise.io) is an AI-powered source-to-pay (S2P) procurement platform for manufacturers, headquartered in Mumbai, India. The platform automates requisitions, RFQ management, purchase orders, goods receipt, invoice processing, and payments — not to be confused with FactWise ERC, FactWise Goals, or FactWise Math.",
  foundingDate: "2020",
  // Location signals — drives "factwise mumbai" and "factwise location" queries
  foundingLocation: {
    "@type": "Place",
    name: "Mumbai, Maharashtra, India",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400076",
    streetAddress: "WeWork Chromium, Jogeshwari - Vikhroli Link Rd, Andheri East",
    addressCountry: "IN",
  },
  location: {
    "@type": "Place",
    name: "Mumbai, Maharashtra, India",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      postalCode: "400076",
      streetAddress: "WeWork Chromium, Jogeshwari - Vikhroli Link Rd, Andheri East",
      addressCountry: "IN",
    },
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Continent", name: "Asia" },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      url: "https://factwise.io/demo",
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://factwise.io/demo",
      availableLanguage: ["English"],
    },
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 11,
    maxValue: 50,
  },
  // sameAs is critical for Google Knowledge Panel and entity disambiguation
  // TODO: verify each URL matches your actual profiles and add any missing ones
  sameAs: [
    "https://www.linkedin.com/company/factwise",
    "https://twitter.com/factwise",
    "https://www.crunchbase.com/organization/factwise",
    "https://www.g2.com/products/factwise",
  ],
  knowsAbout: [
    "Source-to-Pay Automation",
    "Manufacturing Procurement",
    "Purchase Order Management",
    "Invoice Processing",
    "RFQ Management",
    "Vendor Management",
    "AI-Powered Negotiation",
    "Landed Cost Analysis",
    "Inquiry to Quote",
    "4-Way Invoice Matching",
    "BOM Cost Intelligence",
    "Goods Receipt Verification",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://factwise.io/#website",
  url: "https://factwise.io",
  name: "FactWise",
  description: "AI-powered source-to-pay platform for manufacturers",
  publisher: { "@id": "https://factwise.io/#organization" },
  inLanguage: "en-US",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://factwise.io/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "@id": "https://factwise.io/#software",
  name: "FactWise",
  alternateName: "FactWise Source-to-Pay Platform",
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Procurement Software",
  operatingSystem: "Web Browser",
  url: "https://factwise.io",
  description:
    "FactWise is an AI-powered source-to-pay procurement platform for manufacturers. It automates requisition management, RFQ and vendor sourcing, AI negotiation, purchase order generation, invoice capture, 4-way matching, and payment processing.",
  screenshot: "https://factwise.io/logo.png",
  softwareVersion: "2.0",
  releaseNotes: "https://factwise.io/blog",
  featureList: [
    "AI-powered Requisition to Purchase Order Automation",
    "Automated RFQ and Vendor Sourcing",
    "AI Negotiation Engine",
    "Landed Cost Analysis",
    "4-Way Invoice Matching (PO / GR / QC / Contract)",
    "Inquiry to Quote Automation",
    "BOM Cost Intelligence",
    "Integrated Vendor Management",
    "Automated Payment Processing",
    "Multi-level Approval Workflows",
    "Goods Receipt and Quality Check Integration",
    "Spend Analytics Dashboard",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "45",
    bestRating: "5",
    worstRating: "1",
    ratingExplanation: "Based on customer reviews on G2 and Capterra",
  },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/OnlineOnly",
    priceSpecification: {
      "@type": "PriceSpecification",
      price: "0",
      priceCurrency: "INR",
      description: "Contact for pricing — request a demo at factwise.io/demo",
    },
    seller: { "@id": "https://factwise.io/#organization" },
  },
  publisher: { "@id": "https://factwise.io/#organization" },
  author: { "@id": "https://factwise.io/#organization" },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${geist.variable}`}>
      <head>
        {/*
          Hero video preload — kick off the WebM fetch the moment HTML
          starts parsing, before React mounts or ScrollSmoother runs. On
          slower / reduced-motion laptops the autoplay was waiting on the
          buffer to fill after JS finished hydrating, taking ~7 s to start.
          The MP4 fallback isn't preloaded because Safari is the only
          consumer and Safari respects <video preload="auto"> on its own.
        */}
        <link
          rel="preload"
          as="image"
          href="/TexturedGradient.webp"
          type="image/webp"
        />
        <link
          rel="preload"
          as="video"
          href="/Final_iphone_mobileVersion.mp4"
          type="video/mp4"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="video"
          href="/FinalIphone.mp4"
          type="video/mp4"
          media="(min-width: 768px)"
        />
        {/*
          Google Consent Mode v2 — set the DEFAULT to "denied" before GTM/GA4
          load below. This raw inline script runs synchronously during HTML
          parse, i.e. ahead of the afterInteractive scripts, so analytics/ad
          cookies stay blocked until the visitor chooses in the cookie banner
          (see components/ui/CookieConsent.tsx, which flips these to "granted").
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
  analytics_storage: 'denied',
  functionality_storage: 'granted',
  security_storage: 'granted',
  wait_for_update: 500
});
gtag('set', 'ads_data_redaction', true);`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `if (typeof window !== 'undefined' && window.history) {
  window.history.scrollRestoration = 'manual';
}`,
          }}
        />
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}');`}
        </Script>
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <AnalyticsTracker />
        <ConditionalSplashLoader />
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />
        <div className="noise-bg" />
        <ScrollToTop />
        <Header />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}

