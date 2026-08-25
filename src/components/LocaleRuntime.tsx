"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { getPathLocale, localeMeta } from "@/lib/i18n";

export default function LocaleRuntime() {
  const pathname = usePathname();
  const locale = getPathLocale(pathname);

  React.useEffect(() => {
    const meta = localeMeta[locale];
    if (document.documentElement.lang !== meta.htmlLang) {
      document.documentElement.lang = meta.htmlLang;
    }
    if (document.documentElement.dir !== meta.dir) {
      document.documentElement.dir = meta.dir;
    }
  }, [locale]);

  return null;
}
