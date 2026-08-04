import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: allow all crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/cgi-bin/",
          "/header-demo",
          // Prevent indexing of referral-tracking URLs like /?ref=alternativestack.com
          // that GSC flags as "Alternate page with proper canonical tag"
          "/?ref=",
          // Prevent indexing of /blog?q={search_term_string} (unfilled Google Ads placeholder)
          "/blog?q=",
        ],
      },
      // Explicitly welcome major AI crawlers for AEO visibility
      { userAgent: "GPTBot", allow: "/" },          // ChatGPT / OpenAI
      { userAgent: "ChatGPT-User", allow: "/" },    // ChatGPT browsing
      { userAgent: "PerplexityBot", allow: "/" },   // Perplexity AI
      { userAgent: "Claude-Web", allow: "/" },      // Anthropic Claude
      { userAgent: "anthropic-ai", allow: "/" },    // Anthropic Claude (alt)
      { userAgent: "Googlebot", allow: "/" },       // Google (incl. AI Overviews)
      { userAgent: "Google-Extended", allow: "/" }, // Gemini / Bard training
      { userAgent: "Meta-ExternalAgent", allow: "/" }, // Meta AI
      { userAgent: "Applebot", allow: "/" },        // Apple Intelligence / Siri
      { userAgent: "cohere-ai", allow: "/" },       // Cohere
      { userAgent: "Bytespider", allow: "/" },      // ByteDance AI
    ],
    sitemap: "https://factwise.io/sitemap.xml",
    host: "https://factwise.io",
  };
}
