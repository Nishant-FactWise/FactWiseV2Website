"use client";

import { useEffect, useRef, useState } from "react";
import { Languages } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getPathLocale, localeMeta, locales, localizePath, stripLocale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  triggerClassName?: string;
};

export default function LanguageSwitcher({ triggerClassName = "text-slate-700 hover:text-[#3666ff]" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);
  const activeLocale = getPathLocale(pathname);
  const pathWithoutLocale = stripLocale(pathname);
  const isEnglishOnlyBlogPath = pathWithoutLocale === "/blog" || pathWithoutLocale.startsWith("/blog/");
  const localizedHref = (locale: (typeof locales)[number]) => {
    if (locale !== "en" && isEnglishOnlyBlogPath) return localizePath("/", locale);
    return localizePath(pathWithoutLocale, locale);
  };

  useEffect(() => {
    function handleDocumentClick(event: MouseEvent) {
      if (!switcherRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative" ref={switcherRef}>
      <button
        type="button"
        className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-transparent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3666ff]/45 ${triggerClassName}`}
        aria-label="Change language"
        aria-expanded={open}
        aria-haspopup="menu"
        title="Change language"
        onClick={() => setOpen((current) => !current)}
      >
        <Languages className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
      </button>
      <div
        className={`absolute right-0 top-full z-50 pt-2 transition duration-150 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <div className="max-h-[70vh] w-44 overflow-y-auto rounded-2xl border border-black/10 bg-white p-1.5 shadow-xl">
          {locales.map((locale) => (
            <Link
              key={locale}
              href={localizedHref(locale)}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                locale === activeLocale
                  ? "bg-[#3666ff] text-white"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
              }`}
            >
              <span>{localeMeta[locale].nativeLabel}</span>
              <span className="text-[10px] font-bold opacity-70">{locale.toUpperCase()}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
