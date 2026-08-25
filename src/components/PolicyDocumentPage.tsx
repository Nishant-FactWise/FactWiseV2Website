'use client';

import React from 'react';
import { ReactLenis } from 'lenis/react';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import { getPathLocale, localizePath } from '@/lib/i18n';
import type { Locale } from '@/lib/i18n';
import type { LegalPageCopy, LegalSection } from '@/lib/legal-page-copy';

type PolicyDocumentPageProps = {
  copy: Record<string, LegalPageCopy>;
  icon: LucideIcon;
};

const legalInlineDates: Record<Locale, string> = {
  en: '1 January 2026',
  zh: '2026年1月1日',
  es: '1 de enero de 2026',
  ja: '2026年1月1日',
  de: '1. Januar 2026',
  fr: '1 janvier 2026',
  ko: '2026년 1월 1일',
  pt: '1 de janeiro de 2026',
  it: '1 gennaio 2026',
  ar: '1 يناير 2026',
};

function localizeInlineLegalText(text: string, locale: Locale) {
  if (locale === 'en') return text;
  return text.split('1 January 2026').join(legalInlineDates[locale]);
}

function renderText(text: string, key: string, locale: Locale) {
  const localizedText = localizeInlineLegalText(text, locale);
  const emailParts = localizedText.split('privacy@factwise.io');
  const withEmail = emailParts.flatMap((part, index) =>
    index === emailParts.length - 1
      ? [part]
      : [
          part,
          <a key={`${key}-email-${index}`} href="mailto:privacy@factwise.io" className="text-[#3666ff] hover:underline">
            privacy@factwise.io
          </a>,
        ],
  );

  return withEmail.map((part, index) => {
    if (typeof part !== 'string') return part;
    return part.split('www.factwise.io').flatMap((chunk, chunkIndex, chunks) =>
      chunkIndex === chunks.length - 1
        ? [chunk]
        : [
            chunk,
            <a key={`${key}-site-${index}-${chunkIndex}`} href="https://www.factwise.io" className="text-[#3666ff] hover:underline">
              www.factwise.io
            </a>,
          ],
    );
  });
}

function Section({ section, locale }: { section: LegalSection; locale: Locale }) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
        <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
        {section.heading}
      </h2>

      {section.subsections?.map((subsection) => (
        <div key={subsection.heading} className="space-y-3">
          <h3 className="text-base font-semibold text-slate-800">{subsection.heading}</h3>
          {subsection.paragraphs?.map((paragraph) => (
            <p key={paragraph}>{renderText(paragraph, paragraph, locale)}</p>
          ))}
          {subsection.bullets ? (
            <ul className="list-disc pl-6 space-y-2">
              {subsection.bullets.map((item) => (
                <li key={item}>{renderText(item, item, locale)}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ))}

      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{renderText(paragraph, paragraph, locale)}</p>
      ))}

      {section.bullets ? (
        <ul className="list-disc pl-6 space-y-2">
          {section.bullets.map((item) => (
            <li key={item}>{renderText(item, item, locale)}</li>
          ))}
        </ul>
      ) : null}

      {section.ordered ? (
        <ol className="list-decimal pl-6 space-y-1.5">
          {section.ordered.map((item) => (
            <li key={item}>{renderText(item, item, locale)}</li>
          ))}
        </ol>
      ) : null}

      {section.cards ? (
        <div className="space-y-6">
          {section.cards.map((card) => (
            <div key={card.title} className="rounded-xl border border-slate-200 p-5 space-y-2">
              <h3 className="font-semibold text-slate-800 text-base">{card.title}</h3>
              <p>{renderText(card.description, card.title, locale)}</p>
              {card.helper ? (
                <p className="text-sm text-slate-500">
                  <strong className="text-slate-600">{card.helperLabel}</strong> {renderText(card.helper, `${card.title}-helper`, locale)}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      {section.tiles ? (
        <div className="grid sm:grid-cols-2 gap-4">
          {section.tiles.map((tile) => (
            <div key={tile.title} className="rounded-xl bg-slate-50 border border-slate-200 p-4 space-y-1.5">
              <div className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                <span className="h-4 w-0.5 bg-[#3666ff] rounded-full" />
                {tile.title}
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">{renderText(tile.description, tile.title, locale)}</p>
            </div>
          ))}
        </div>
      ) : null}

      {section.table ? (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {section.table.headers.map((header) => (
                  <th key={header} className="text-left px-4 py-3 font-semibold text-slate-700">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {section.table.rows.map((row, rowIndex) => (
                <tr key={row.join('|')} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                  {row.map((cell, cellIndex) => (
                    <td key={cell} className={`px-4 py-3 ${cellIndex === 0 ? 'text-slate-700 font-medium' : 'text-slate-500'}`}>
                      {renderText(cell, `${rowIndex}-${cellIndex}`, locale)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

export function PolicyDocumentPage({ copy, icon: Icon }: PolicyDocumentPageProps) {
  const locale = getPathLocale(usePathname());
  const pageCopy = copy[locale] ?? copy.en;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="min-h-screen bg-slate-50/50 text-[#1A1D2E] pt-28">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[350px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 max-w-4xl py-12 relative">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase">
              <Icon className="w-3.5 h-3.5" />
              {pageCopy.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] pb-1.5 bg-gradient-to-r from-slate-900 via-slate-800 to-[#3666ff] bg-clip-text text-transparent">
              {pageCopy.title}
            </h1>
            <p className="text-slate-500 text-base max-w-xl mx-auto">{pageCopy.subtitle}</p>
            {pageCopy.meta ? (
              <div className="flex flex-wrap justify-center gap-6 pt-2 text-sm text-slate-400">
                {pageCopy.meta.map((item) => (
                  <span key={item.label}>
                    <strong className="text-slate-600">{item.label}</strong> {item.value}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 md:p-12 space-y-8 text-[15px] leading-relaxed text-slate-600">
            {pageCopy.sections.map((section) => (
              <Section key={section.heading} section={section} locale={locale} />
            ))}

            {pageCopy.relatedDocuments ? (
              <section className="space-y-4">
                <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                  <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                  {pageCopy.relatedDocuments.heading}
                </h2>
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="text-left px-4 py-3 font-semibold text-slate-700">{pageCopy.relatedDocuments.documentLabel}</th>
                        <th className="text-left px-4 py-3 font-semibold text-slate-700">{pageCopy.relatedDocuments.locationLabel}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {pageCopy.relatedDocuments.rows.map((row) => (
                        <tr key={row.href}>
                          <td className="px-4 py-3 text-slate-700 font-medium">{row.label}</td>
                          <td className="px-4 py-3">
                            <a href={localizePath(row.href, locale)} className="text-[#3666ff] hover:underline">
                              factwise.io{localizePath(row.href, locale)}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            ) : null}

            {pageCopy.footerNote ? (
              <div className="border-t border-slate-100 pt-8 text-sm text-slate-400 space-y-1">
                {pageCopy.footerNote.map((paragraph) => (
                  <p key={paragraph}>{renderText(paragraph, paragraph, locale)}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <FlickeringFooter />
      </main>
    </ReactLenis>
  );
}
