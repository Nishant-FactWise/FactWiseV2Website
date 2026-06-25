// Blog index — Server Component so article listings are visible to AI crawlers
// and search engines without JavaScript execution.
// Interactive parts (search, category filter, expand/collapse) live in BlogClientShell.tsx.
import { CATEGORIES, ALL_POSTS } from "./data";
import BlogClientShell from "./BlogClientShell";
import { FlickeringFooter } from '@/components/ClientOnlySections';

// ── CollectionPage schema for AI crawlers ─────────────────────────────────────
const collectionPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": "https://factwise.io/blog",
  url: "https://factwise.io/blog",
  name: "FactWise Procurement & Manufacturing Blog",
  description:
    "Expert insights on procurement automation, source-to-pay best practices, manufacturing operations, vendor management, RFQ strategies, and supply chain optimization — from the FactWise team.",
  publisher: { "@id": "https://factwise.io/#organization" },
  inLanguage: "en-US",
  // Surface the first 10 posts as hasPart — gives AI crawlers a structured article list
  hasPart: ALL_POSTS.slice(0, 10).map(post => ({
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
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
    <main style={{ minHeight: "100vh", background: "#fff", fontFamily: "var(--font-inter), sans-serif" }}>

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
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-slate-950 px-6 pt-40 pb-24 text-center">
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
            className="text-white font-bold tracking-tighter leading-[1.05] mb-6 speakable"
            style={{ fontSize: "clamp(34px, 5.5vw, 60px)" }}
          >
            Procurement &amp; Manufacturing Insights
          </h1>

          <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10 font-light speakable">
            Procurement strategies, industry trends, and expert guidance — everything you need to build a world-class sourcing operation.
          </p>

          {/* Search bar — rendered server-side as a static form for crawlers,
              enhanced client-side via BlogClientShell */}
          <form
            action="/blog"
            method="get"
            style={{
              display: "flex", maxWidth: 520, margin: "0 auto",
              border: "1px solid rgba(255,255,255,0.18)", borderRadius: 10,
              overflow: "hidden", boxShadow: "0 8px 32px -8px rgba(0,0,0,0.5)",
              background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ padding: "0 14px", display: "flex", alignItems: "center" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <input
              type="text"
              name="q"
              placeholder="Search articles…"
              style={{
                flex: 1, border: "none", outline: "none",
                fontSize: 14, color: "#fff", padding: "13px 0",
                background: "transparent",
              }}
              className="placeholder:text-white/50"
            />
            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #3666ff 0%, #5b8aff 100%)",
                color: "#fff", border: "none", padding: "0 24px",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                borderRadius: "0 10px 10px 0",
              }}
            >
              Search
            </button>
          </form>
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
                {cat.label}
              </h2>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                {cat.posts.slice(0, 6).map(post => (
                  <li key={post.slug}>
                    <a href={`/blog/post/${post.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0b1322", marginBottom: 6 }}>{post.title}</h3>
                      <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6 }}>{post.excerpt}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </noscript>

      {/* ── Client shell — handles interactive filtering/search for JS visitors ── */}
      <BlogClientShell initialCategories={CATEGORIES} />

      <FlickeringFooter />
    </main>
  );
}
