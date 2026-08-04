import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-940ccf6255b54fa799a9b01050e6c227.r2.dev',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'http',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
    ],
  },
  async redirects() {
    return [
      // ── Canonical cleanup: strip ?ref= referral parameter from homepage ────
      // Prevents Google from treating /?ref=alternativestack.com (and similar)
      // as an "alternate page" instead of the canonical https://factwise.io
      {
        source: "/",
        has: [{ type: "query", key: "ref" }],
        destination: "/",
        permanent: true,
      },
      // ── Canonical cleanup: strip any ?q= search parameter from /blog ───────
      // Prevents Google from indexing /blog?q={search_term_string} (an unfilled
      // Google Ads dynamic insertion placeholder) as an alternate page.
      {
        source: "/blog",
        has: [{ type: "query", key: "q" }],
        destination: "/blog",
        permanent: true,
      },
      // ── Fix typo in blog post slug ────────────────────────────────────────
      // 'purchase-orderd' (extra 'd') → 'purchase-order' (correct)
      {
        source: "/blog/post/effective-communication-purchase-orderd",
        destination: "/blog/post/effective-communication-purchase-order",
        permanent: true,
      },

      // ── Old URL formats (no hyphens) ──────────────────────────────────────
      // External sites link to these old-style URLs from a previous site version
      { source: "/termsandconditions", destination: "/terms-of-service", permanent: true },
      { source: "/privacypolicy",      destination: "/privacy-policy",   permanent: true },
      { source: "/signup",             destination: "/demo",             permanent: true },

      // ── /careers/:slug → /careers ─────────────────────────────────────────
      // Old career links used /careers/{role} (e.g. /careers/analyst, /careers/sde).
      // Actual job pages live at /careers/jobs/{slug}. Since old slugs don't
      // map 1:1 to new slugs, redirect everything to the careers listing.
      // The :slug((?!jobs).*) excludes the /careers/jobs/* dynamic route.
      {
        source: "/careers/:slug((?!jobs).*)",
        destination: "/careers",
        permanent: true,
      },

      // ── Blog posts with bare domain names as slugs ────────────────────────
      // Some Hygraph posts had links like href="apple.com" (missing https://).
      // The RichText normalizer now fixes future renders, but Google already
      // crawled these as /blog/post/apple.com etc. Redirect to the real site.
      { source: "/blog/post/apple.com",    destination: "https://www.apple.com",    permanent: true },
      { source: "/blog/post/unilever.com", destination: "https://www.unilever.com", permanent: true },
      { source: "/blog/post/def.com",      destination: "https://www.def.com",      permanent: true },

      // ── /blog/search → /blog ─────────────────────────────────────────────
      // Blog search is handled via ?q= param, not a /search route
      { source: "/blog/search", destination: "/blog", permanent: true },

      // ── Removed / renamed blog post slugs ────────────────────────────────
      // These posts were crawled by Google but no longer exist in Hygraph or
      // were renamed. Redirect to /blog to preserve link equity.
      { source: "/blog/post/procurement-impacts-scm",       destination: "/blog/post/procurement-impact-scm",    permanent: true },
      { source: "/blog/post/elevate-supplier-performance-procurement-softwarec", destination: "/blog/post/elevate-supplier-performance-procurement-software", permanent: true },
      {
        source: "/solutions",
        destination: "/inquiry-to-quote",
        permanent: true,
      },
      {
        source: "/product",
        destination: "/inquiry-to-quote",
        permanent: true,
      },
      {
        source: "/platform",
        destination: "/",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/demo",
        permanent: true,
      },
      {
        source: "/blog/post/supplier-contract-management-procurement-software-solutions",
        destination: "/blog/post/supplier-contract-management-process-procurement-software-solutions",
        permanent: true,
      },
      {
        source: "/blog/post/rfq-or-auction",
        destination: "/blog/post/rfq-and-auction",
        permanent: true,
      },
      {
        source: "/pricinglandingpage",
        destination: "/demo",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/demo",
        permanent: true,
      },
      {
        source: "/blog/category/:slug",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/docs/:path*",
        destination: "/documentation",
        permanent: true,
      },
      {
        source: "/blog/post/attributes-successful-cpos",
        destination: "/blog/post/attributes-successful-chief-procurement-officers",
        permanent: true,
      },
      {
        source: "/blog/post/procurement-software-supplier-management-benefits",
        destination: "/blog/post/procurement-software-strategic-supplier-relationship-management-benefits",
        permanent: true,
      },
      {
        source: "/blog/post/procurement-assist-supplier-diversity",
        destination: "/blog/post/procurement-and-supplier-diversity-programme",
        permanent: true,
      },
      {
        source: "/blog/post/what-is-direct-spend-for-which-companies-does-direct-spend-matter",
        destination: "/blog/post/exploring-direct-spend-impact-direct-materials-procurement-software",
        permanent: true,
      },
      {
        source: "/blog/post/Microsoft%20%E2%80%93%20Cloud,%20Computers,%20Apps%20&%20Gaming",
        destination: "https://www.microsoft.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
