import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://factwise.io";
  const now = new Date();

  return [
    // Core pages — highest priority
    { url: base,                                     lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/demo`,                           lastModified: now, changeFrequency: "monthly", priority: 0.95 },

    // Product / workflow pages
    { url: `${base}/inquiry-to-quote`,               lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/requisitions-to-po`,             lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/invoice-to-pay`,                 lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // /solutions permanently redirects to /inquiry-to-quote — excluded from sitemap



    // Commercial
    { url: `${base}/pricing`,                        lastModified: now, changeFrequency: "monthly", priority: 0.8 },

    // Brand & content
    { url: `${base}/about`,                          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`,                           lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${base}/careers`,                        lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/faq`,                            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/documentation`,                  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
  ];
}
