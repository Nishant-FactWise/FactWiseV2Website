import { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/blog/hygraph";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://factwise.io";
  const now = new Date();
  
  let blogSlugs: { slug: string }[] = [];
  try {
    blogSlugs = await getAllPostSlugs();
  } catch (err) {
    console.error("Failed to fetch blog slugs for sitemap:", err);
  }

  const blogEntries: MetadataRoute.Sitemap = blogSlugs
    .filter((post) => post.slug !== "benefits-digital-transformation-procurement-smb")
    .map((post) => ({
      url: `${base}/blog/post/${post.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [
    // ── Core pages ── highest authority signals for AI crawlers ──────────────
    { url: base,                                     lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/demo`,                           lastModified: now, changeFrequency: "monthly", priority: 0.95 },

    // ── Product / workflow pages ─────────────────────────────────────────────
    { url: `${base}/inquiry-to-quote`,               lastModified: now, changeFrequency: "monthly", priority: 0.92 },
    { url: `${base}/requisitions-to-po`,             lastModified: now, changeFrequency: "monthly", priority: 0.92 },
    { url: `${base}/invoice-to-pay`,                 lastModified: now, changeFrequency: "monthly", priority: 0.92 },
    { url: `${base}/supplier`,                       lastModified: now, changeFrequency: "monthly", priority: 0.92 },

    // ── High-value AEO pages (FAQ, Glossary, Blog) ─────────────────────────
    { url: `${base}/faq`,                            lastModified: now, changeFrequency: "weekly",  priority: 0.88 },
    { url: `${base}/glossary`,                       lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${base}/blog`,                           lastModified: now, changeFrequency: "daily",   priority: 0.85 },

    // ── Brand & company pages ────────────────────────────────────────────────
    { url: `${base}/about`,                          lastModified: now, changeFrequency: "monthly", priority: 0.75 },
    { url: `${base}/documentation`,                  lastModified: now, changeFrequency: "monthly", priority: 0.72 },
    { url: `${base}/careers`,                        lastModified: now, changeFrequency: "weekly",  priority: 0.65 },

    // ── Legal / compliance ───────────────────────────────────────────────────
    { url: `${base}/privacy-policy`,                 lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${base}/terms-of-service`,               lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${base}/cookie-policy`,                  lastModified: now, changeFrequency: "yearly",  priority: 0.4 },
    { url: `${base}/dpdp-compliance`,                lastModified: now, changeFrequency: "yearly",  priority: 0.4 },

    // ── Blog posts ───────────────────────────────────────────────────────────
    ...blogEntries,
  ];
}
