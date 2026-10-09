import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ChevronLeft, Calendar, Clock } from "lucide-react";
import { FlickeringFooter } from "@/components/ClientOnlySections";
import {
  getPostDetails,
  getAllPostSlugs,
  getSimilarPosts,
  type HygraphPost,
} from "@/lib/blog/hygraph";
import { RichText } from "@/lib/blog/RichText";
import { withoutLongDashes } from "@/lib/display-text";

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const slugs = await getAllPostSlugs();
    return slugs.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostDetails(slug).catch(() => null);
  if (!post) return { title: "Post not found" };
  const seo = post.seos?.[0];
  const title = withoutLongDashes(seo?.title ?? post.title);
  const description = withoutLongDashes(seo?.description || post.excerpt || post.title);
  const url = `https://factwise.io/blog/post/${post.slug}`;
  const image = post.featuredPicture?.secure_url ?? post.featuredPicture?.url ?? post.featuredImage?.url;
  return {
    title,
    description,
    keywords: seo?.keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: image ? [image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

function formatDate(iso?: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function articleSchema(post: HygraphPost) {
  const imageUrl =
    post.featuredPicture?.secure_url ??
    post.featuredPicture?.url ??
    post.featuredImage?.url ??
    "https://factwise.io/logo.png"; // Strict requirement: Articles MUST have an image

  // Use createdAt for datePublished so the date is stable across crawls.
  // Fall back to lastUpdated if createdAt is unavailable, then to an empty
  // string (which omits the field rather than lying with today's date).
  const datePublished = post.createdAt
    ? new Date(post.createdAt).toISOString()
    : post.lastUpdated
    ? new Date(post.lastUpdated).toISOString()
    : "";

  // dateModified should reflect the last edit — fall back to createdAt.
  const dateModified = post.lastUpdated
    ? new Date(post.lastUpdated).toISOString()
    : datePublished;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: [imageUrl], // Google prefers arrays for images
    author: post.author ? { 
      "@type": "Person", 
      name: post.author.name,
      url: "https://factwise.io/about" // Author URL is highly recommended
    } : {
      "@type": "Organization",
      name: "FactWise",
      url: "https://factwise.io"
    },
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://factwise.io/blog/post/${post.slug}`,
    },
    publisher: {
      "@type": "Organization",
      name: "FactWise",
      url: "https://factwise.io",
      logo: {
        "@type": "ImageObject",
        url: "https://factwise.io/logo.png",
      },
    },
    description: post.seos?.[0]?.description || post.excerpt || post.title,
  };
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = await getPostDetails(slug).catch(() => null);
  if (!post) notFound();

  const heroImage =
    post.featuredPicture?.secure_url ??
    post.featuredPicture?.url ??
    post.featuredImage?.url ??
    null;

  const categorySlugs = post.categories?.map((c) => c.slug) ?? [];
  const similar = categorySlugs.length
    ? await getSimilarPosts(categorySlugs, post.slug).catch(() => [])
    : [];

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
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://factwise.io/blog/post/${post.slug}`,
      },
    ],
  };

  return (
    <main
      className="min-h-screen bg-white [&_p]:text-justify"
      style={{ fontFamily: "var(--font-inter), sans-serif" }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleSchema(post)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />

      {/* Hero — full viewport image with gradient overlay and text near bottom */}
      <section className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-slate-950 sm:min-h-[680px]">
        {heroImage && (
          <Image
            src={heroImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}
        {/* Gradient: transparent at top → dark at bottom for legibility of text overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(2,6,23,0) 0%, rgba(2,6,23,0.15) 55%, rgba(2,6,23,0.85) 100%)",
          }}
        />
        {/* Back link — top-left */}
        <Link
          href="/blog"
          className="absolute left-5 top-24 z-20 inline-flex min-h-11 items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/80 transition-colors hover:text-white sm:left-6 sm:top-28 sm:text-xs sm:tracking-[0.2em] md:left-10"
        >
          <ChevronLeft size={14} /> Back to Blog
        </Link>
        {/* Title block — centered near bottom */}
        <div className="absolute inset-x-0 bottom-[6svh] z-10 flex justify-center px-5 sm:bottom-[8vh] sm:px-6">
          <div className="max-w-3xl text-center text-white">
            {post.categories?.[0] && (
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                {post.categories[0].name}
              </div>
            )}
            <h1
              className="mb-5 break-words text-[clamp(1.75rem,8vw,2.75rem)] font-light leading-[1.12] tracking-tight"
            >
              {withoutLongDashes(post.title)}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/80 sm:text-sm">
              {post.author?.name && <span>By {post.author.name}</span>}
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} /> {formatDate(post.lastUpdated)}
              </span>
              {post.readingTime && (
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={13} /> {post.readingTime}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Article */}
      <article className="mx-auto max-w-3xl overflow-hidden px-5 py-12 sm:px-6 sm:py-16">
        {/* Author */}
        {post.author && (
          <div className="flex items-center gap-4 mb-10">
            {post.author.photo?.url && (
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={post.author.photo.url}
                  alt={post.author.name}
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <div className="text-sm font-bold text-slate-900">
                {post.author.name}
              </div>
              <div className="text-xs text-slate-500">
                {formatDate(post.lastUpdated)} · {post.readingTime}
              </div>
            </div>
          </div>
        )}

        {/* Excerpt */}
        <p className="mb-10 border-y border-slate-200 py-6 text-justify text-base leading-7 text-slate-600 sm:text-lg sm:leading-relaxed">
          {withoutLongDashes(post.excerpt)}
        </p>

        {/* Body */}
        <div>
          {post.content?.raw ? <RichText content={post.content.raw} /> : null}
        </div>

        {/* About author */}
        {post.author?.bio && (
          <div className="mt-16 pt-10 border-t border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              About the Author
            </h3>
            <p className="text-justify leading-relaxed text-slate-600">{withoutLongDashes(post.author.bio)}</p>
          </div>
        )}
      </article>

      {/* Suggested */}
      {similar.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Suggested Articles
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {similar.slice(0, 3).map((p) => {
              const img =
                p.featuredPicture?.secure_url ??
                p.featuredPicture?.url ??
                p.featuredImage?.url;
              return (
                <Link
                  key={p.slug}
                  href={`/blog/post/${p.slug}`}
                  className="group block rounded-xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow"
                >
                  <div className="relative h-44 bg-slate-100">
                    {img && (
                      <Image
                        src={img}
                        alt={p.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-400"
                      />
                    )}
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2 group-hover:underline">
                      {withoutLongDashes(p.title)}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-justify text-xs text-slate-500">
                      {withoutLongDashes(p.excerpt)}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <FlickeringFooter />
    </main>
  );
}
