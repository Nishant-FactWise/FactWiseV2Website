"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { getPathLocale, type Locale } from "@/lib/i18n";
import { messages } from "@/lib/messages";
import { localizeTerminology } from "@/lib/localized-terminology";

const cp1252Bytes: Record<string, number> = {
  "€": 0x80,
  "‚": 0x82,
  "ƒ": 0x83,
  "„": 0x84,
  "…": 0x85,
  "†": 0x86,
  "‡": 0x87,
  "ˆ": 0x88,
  "‰": 0x89,
  "Š": 0x8a,
  "‹": 0x8b,
  "Œ": 0x8c,
  "Ž": 0x8e,
  "‘": 0x91,
  "’": 0x92,
  "“": 0x93,
  "”": 0x94,
  "•": 0x95,
  "–": 0x96,
  "—": 0x97,
  "˜": 0x98,
  "™": 0x99,
  "š": 0x9a,
  "›": 0x9b,
  "œ": 0x9c,
  "ž": 0x9e,
  "Ÿ": 0x9f,
};

function repairUtf8ReadAsWindows1252(value: string) {
  if (!/[ÃÂâèæçãìØÙ]/.test(value)) return value;

  const bytes: number[] = [];
  for (const char of value) {
    const cp1252Byte = cp1252Bytes[char];
    if (cp1252Byte !== undefined) {
      bytes.push(cp1252Byte);
      continue;
    }

    const code = char.charCodeAt(0);
    if (code <= 0xff) {
      bytes.push(code);
      continue;
    }

    return value;
  }

  try {
    const decoded = new TextDecoder("utf-8", { fatal: true }).decode(new Uint8Array(bytes));
    return /[\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af\u0600-\u06ff]|[—–→↗₹⚡“”’·×✓]/.test(decoded)
      ? decoded
      : value;
  } catch {
    return value;
  }
}

export function repairMojibake(value: string) {
  const cleaned = value
    .replaceAll("ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â", "—")
    .replaceAll("ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Å“", "–")
    .replaceAll("ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â„¢", "→")
    .replaceAll("ÃƒÂ¢Ã¢â‚¬Â Ã¢â‚¬â€", "↗")
    .replaceAll("ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¹", "₹")
    .replaceAll("ÃƒÂ¢Ã…Â¡Ã‚Â¡", "⚡")
    .replaceAll("ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ", "“")
    .replaceAll("ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â", "”")
    .replaceAll("ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢", "’")
    .replaceAll("Ãƒâ€šÃ‚Â·", "·")
    .replaceAll("ÃƒÆ’Ã¢â‚¬â€", "×")
    .replaceAll("Ã¢â‚¬â€", "—")
    .replaceAll("Ã¢â‚¬â€œ", "–")
    .replaceAll("Ã¢â€ â€™", "→")
    .replaceAll("Ã¢â€ â€”", "↗")
    .replaceAll("Ã¢â€šÂ¹", "₹")
    .replaceAll("Ã¢Å¡Â¡", "⚡")
    .replaceAll("Ã¢â‚¬Å“", "“")
    .replaceAll("Ã¢â‚¬Â", "”")
    .replaceAll("Ã¢â‚¬â„¢", "’")
    .replaceAll("Ã‚Â·", "·")
    .replaceAll("Ãƒâ€”", "×")
    .replaceAll("â€”", "—")
    .replaceAll("â€“", "–")
    .replaceAll("â†’", "→")
    .replaceAll("â†—", "↗")
    .replaceAll("â‚¹", "₹")
    .replaceAll("âš¡", "⚡")
    .replaceAll("â€œ", "“")
    .replaceAll("â€", "”")
    .replaceAll("â€™", "’")
    .replaceAll("Â·", "·")
    .replaceAll("Ã—", "×");

  return repairUtf8ReadAsWindows1252(cleaned);
}

const normalizedTextMaps = new Map<Locale, Record<string, string>>();

function getNormalizedTextMap(locale: Locale) {
  const cached = normalizedTextMaps.get(locale);
  if (cached) return cached;

  const normalizedMap = Object.fromEntries(
    Object.entries(messages[locale].textMap).map(([key, value]) => [
      repairMojibake(key),
      repairMojibake(value),
    ]),
  );
  normalizedTextMaps.set(locale, normalizedMap);
  return normalizedMap;
}

export function useLocalizedText() {
  const pathname = usePathname();
  const locale = getPathLocale(pathname);

  return React.useCallback(
    (source: string) => {
      return localizeSourceText(source, locale);
    },
    [locale],
  );
}

export function localizeSourceText(source: string, locale: Locale) {
  const textMap = messages[locale].textMap;
  const normalizedTextMap = getNormalizedTextMap(locale);
  const normalizedSource = repairMojibake(source);
  const localized = textMap[source] ?? textMap[normalizedSource] ?? normalizedTextMap[normalizedSource] ?? normalizedSource;

  return repairMojibake(localizeTerminology(repairMojibake(localized), locale));
}
