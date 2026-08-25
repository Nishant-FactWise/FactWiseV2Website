import ar from "../../messages/ar.json";
import de from "../../messages/de.json";
import en from "../../messages/en.json";
import es from "../../messages/es.json";
import fr from "../../messages/fr.json";
import it from "../../messages/it.json";
import ja from "../../messages/ja.json";
import ko from "../../messages/ko.json";
import pt from "../../messages/pt.json";
import zh from "../../messages/zh.json";
import { aboutExtraTextMap } from "./about-extra-text";
import { careersExtraTextMap } from "./careers-extra-text";
import { cookieExtraTextMap } from "./cookie-extra-text";
import { faqExtraTextMap } from "./faq-extra-text";
import { footerExtraTextMap } from "./footer-extra-text";
import { homepageExtraTextMap } from "./homepage-extra-text";
import { inquiryToQuoteExtraTextMap } from "./inquiry-to-quote-extra-text";
import { invoiceToPayExtraTextMap } from "./invoice-to-pay-extra-text";
import { remainingPagesExtraTextMap } from "./remaining-pages-extra-text";
import { requisitionsToPoExtraTextMap } from "./requisitions-to-po-extra-text";
import { supplierExtraTextMap } from "./supplier-extra-text";
import type { Locale } from "./i18n";

export type Messages = {
  textMap: Record<string, string>;
};

const baseMessages: Record<Locale, Messages> = {
  en,
  zh,
  es,
  ja,
  de,
  fr,
  ko,
  pt,
  it,
  ar,
};

export const messages: Record<Locale, Messages> = Object.fromEntries(
  Object.entries(baseMessages).map(([locale, message]) => [
    locale,
    {
      ...message,
      textMap: {
        ...message.textMap,
        ...homepageExtraTextMap[locale as Locale],
        ...inquiryToQuoteExtraTextMap[locale as Locale],
        ...requisitionsToPoExtraTextMap[locale as Locale],
        ...invoiceToPayExtraTextMap[locale as Locale],
        ...supplierExtraTextMap[locale as Locale],
        ...remainingPagesExtraTextMap[locale as Locale],
        ...aboutExtraTextMap[locale as Locale],
        ...careersExtraTextMap[locale as Locale],
        ...faqExtraTextMap[locale as Locale],
        ...cookieExtraTextMap[locale as Locale],
        ...footerExtraTextMap[locale as Locale],
      },
    },
  ]),
) as Record<Locale, Messages>;
