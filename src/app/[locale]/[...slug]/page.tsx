import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/i18n";
import { JOBS } from "@/lib/careers-jobs";

const pageLoaders = {
  about: () => import("../../about/page"),
  careers: () => import("../../careers/page"),
  "cookie-policy": () => import("../../cookie-policy/page"),
  demo: () => import("../../demo/page"),
  documentation: () => import("../../documentation/page"),
  "dpdp-compliance": () => import("../../dpdp-compliance/page"),
  faq: () => import("../../faq/page"),
  glossary: () => import("../../glossary/page"),
  "inquiry-to-quote": () => import("../../inquiry-to-quote/page"),
  "invoice-to-pay": () => import("../../invoice-to-pay/page"),
  "privacy-policy": () => import("../../privacy-policy/page"),
  "requisitions-to-po": () => import("../../requisitions-to-po/page"),
  supplier: () => import("../../supplier/page"),
  "supplier-onboarding": () => import("../../supplier-onboarding/page"),
  "terms-of-service": () => import("../../terms-of-service/page"),
} as const;

type PageSlug = keyof typeof pageLoaders;

const localizedSlugs = Object.keys(pageLoaders) as PageSlug[];

export function generateStaticParams() {
  const topLevelPages = locales
    .filter((locale) => locale !== "en")
    .flatMap((locale) => localizedSlugs.map((slug) => ({ locale, slug: [slug] as string[] })));
  const jobPages = locales
    .filter((locale) => locale !== "en")
    .flatMap((locale) =>
      JOBS.map((job) => ({ locale, slug: ["careers", "jobs", job.slug] })),
    );

  return topLevelPages.concat(jobPages);
}

export default async function LocalizedStaticPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const pageSlug = slug.join("/");
  if (slug.length === 3 && slug[0] === "careers" && slug[1] === "jobs") {
    const jobSlug = slug[2];
    if (!JOBS.some((job) => job.slug === jobSlug)) notFound();

    const Page = (await import("../../careers/jobs/[slug]/page")).default;
    return <Page params={Promise.resolve({ slug: jobSlug })} />;
  }

  if (slug.length !== 1 || !(pageSlug in pageLoaders)) notFound();

  const Page = (await pageLoaders[pageSlug as PageSlug]()).default;
  return <Page />;
}
