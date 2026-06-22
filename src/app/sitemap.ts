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
    // Core pages — highest priority
    { url: base,                                     lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/demo`,                           lastModified: now, changeFrequency: "monthly", priority: 0.95 },

    // Product / workflow pages
    { url: `${base}/inquiry-to-quote`,               lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/requisitions-to-po`,             lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/invoice-to-pay`,                 lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    // /solutions permanently redirects to /inquiry-to-quote — excluded from sitemap



    // Commercial
    // Brand & content
    { url: `${base}/about`,                          lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/blog`,                           lastModified: now, changeFrequency: "daily",   priority: 0.8 },
    { url: `${base}/careers`,                        lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${base}/faq`,                            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/documentation`,                  lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...blogEntries,
  ];
}
