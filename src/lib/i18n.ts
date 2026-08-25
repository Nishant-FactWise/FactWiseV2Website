export const locales = ["en", "zh", "es", "ja", "de", "fr", "ko", "pt", "it", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeMeta: Record<
  Locale,
  { label: string; nativeLabel: string; dir: "ltr" | "rtl"; htmlLang: string }
> = {
  en: { label: "English", nativeLabel: "English", dir: "ltr", htmlLang: "en" },
  zh: { label: "Chinese", nativeLabel: "中文", dir: "ltr", htmlLang: "zh-CN" },
  es: { label: "Spanish", nativeLabel: "Español", dir: "ltr", htmlLang: "es" },
  ja: { label: "Japanese", nativeLabel: "日本語", dir: "ltr", htmlLang: "ja" },
  de: { label: "German", nativeLabel: "Deutsch", dir: "ltr", htmlLang: "de" },
  fr: { label: "French", nativeLabel: "Français", dir: "ltr", htmlLang: "fr" },
  ko: { label: "Korean", nativeLabel: "한국어", dir: "ltr", htmlLang: "ko" },
  pt: { label: "Portuguese", nativeLabel: "Português", dir: "ltr", htmlLang: "pt-BR" },
  it: { label: "Italian", nativeLabel: "Italiano", dir: "ltr", htmlLang: "it" },
  ar: { label: "Arabic", nativeLabel: "العربية", dir: "rtl", htmlLang: "ar" },
};

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

export function getPathLocale(pathname: string | null | undefined): Locale {
  const firstSegment = pathname?.split("/").filter(Boolean)[0];
  return isLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function stripLocale(pathname: string | null | undefined) {
  if (!pathname) return "/";
  const parts = pathname.split("/").filter(Boolean);
  if (isLocale(parts[0])) parts.shift();
  return `/${parts.join("/")}`.replace(/\/$/, "") || "/";
}

export function localizePath(href: string, locale: Locale) {
  if (href.startsWith("http") || href.startsWith("#")) return href;
  const cleanHref = href.startsWith("/") ? href : `/${href}`;
  if (locale === defaultLocale) return cleanHref;
  return cleanHref === "/" ? `/${locale}` : `/${locale}${cleanHref}`;
}

