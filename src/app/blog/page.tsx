// Blog index — Server Component so article listings are visible to AI crawlers
// and search engines without JavaScript execution.
// Interactive parts (search, category filter, expand/collapse) live in BlogClientShell.tsx.
import { CATEGORIES, ALL_POSTS } from "./data";
import BlogClientShell, { BlogSearchHero } from "./BlogClientShell";
import { FlickeringFooter } from '@/components/ClientOnlySections';
import { withoutLongDashes } from '@/lib/display-text';

// ── CollectionPage schema for AI crawlers ─────────────────────────────────────
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://factwise.io/blog",
  url: "https://factwise.io/blog",
  name: "FactWise Procurement & Manufacturing Blog",
  description:
    "Expert insights on procurement automation, source-to-pay best practices, manufacturing operations, vendor management, RFQ strategies, and supply chain optimization from the FactWise team.",
  publisher: { "@id": "https://factwise.io/#organization" },
  inLanguage: "en-US",
  // Surface the first 10 posts as hasPart — gives AI crawlers a structured article list
  hasPart: ALL_POSTS.slice(0, 10).map(post => ({
    "@type": "Article",
    headline: withoutLongDashes(post.title),
    description: withoutLongDashes(post.excerpt),
    url: `https://factwise.io/blog/post/${post.slug}`,
    author: { "@id": "https://factwise.io/#organization" },
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://factwise.io/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://factwise.io/blog",
    },
  ],
};

export default function BlogPage() {
  return (
    <main className="[&_p]:text-justify" style={{ minHeight: "100vh", background: "#fff", fontFamily: "var(--font-inter), sans-serif" }}>

      {/* CollectionPage schema — feeds AI crawlers with structured article list */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      
      {/* Breadcrumb schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Hero ── Server-rendered so crawlers see the heading and description */}
      <section className="relative flex min-h-[72svh] flex-col items-center justify-center overflow-hidden bg-slate-950 px-5 pb-16 pt-32 text-center sm:px-6 sm:pb-20 sm:pt-36 md:pb-24 md:pt-40">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/procurement_team_collab_1778762496149.png"
            alt="FactWise procurement insights blog"
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/60 to-slate-950" />
        </div>

        <div className="relative z-10 w-full max-w-2xl mx-auto">
          {/* h1 is server-rendered — crawlers see this immediately */}
          <h1
            className="speakable mb-5 break-words text-[clamp(2rem,9vw,3.75rem)] font-bold leading-[1.08] tracking-tighter text-white sm:mb-6"
          >
            Procurement &amp; Manufacturing Insights
          </h1>

          <p className="speakable mx-auto mb-8 max-w-xl text-justify text-[15px] font-light leading-7 text-white/75 sm:mb-10 sm:text-base md:text-lg">
            Procurement strategies, industry trends, and expert guidance. Everything you need to build a world-class sourcing operation.
          </p>

          <BlogSearchHero />
        </div>
      </section>

      {/* ── SSR article listing — visible to AI crawlers without JS ────────────
          This section is server-rendered and shows the first 6 posts per category
          as plain semantic HTML. BlogClientShell below replaces/enhances this
          for JavaScript-enabled visitors with interactive filtering. ── */}
      <noscript>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px 80px" }}>
          {CATEGORIES.map(cat => (
            <section key={cat.slug} style={{ marginBottom: 64 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: "#0b1322", marginBottom: 24 }}>
                {withoutLongDashes(cat.label)}
              </h2>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                {cat.posts.slice(0, 6).map(post => (
                  <li key={post.slug}>
                    <a href={`/blog/post/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0b1322", marginBottom: 6 }}>{withoutLongDashes(post.title)}</h3>
                      <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, textAlign: "justify" }}>{withoutLongDashes(post.excerpt)}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </noscript>

      {/* ── Client shell — handles interactive filtering/search for JS visitors ── */}
      <div id="blog-content">
        <BlogClientShell initialCategories={CATEGORIES} />
      </div>

      <FlickeringFooter />
    </main>
  );
}
