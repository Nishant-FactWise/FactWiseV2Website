'use client';

import { usePathname } from 'next/navigation';
import { FlickeringFooter } from '@/components/ClientOnlySections';
import { getPathLocale, localizePath } from '@/lib/i18n';
import { glossaryCopy } from '@/lib/glossary-localized';
import { localizeTerminology } from '@/lib/localized-terminology';

function localFeatureHref(href: string, locale: ReturnType<typeof getPathLocale>) {
  const url = new URL(href);
  return localizePath(url.pathname, locale);
}

export default function GlossaryContent() {
  const locale = getPathLocale(usePathname());
  const copy = glossaryCopy[locale];
  const demoHref = localizePath('/demo', locale);

  return (
    <main style={{ minHeight: '100vh', background: '#fff', fontFamily: 'var(--font-inter), sans-serif' }}>
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        padding: 'clamp(80px, 12vw, 140px) 24px 64px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(54,102,255,0.15)', border: '1px solid rgba(54,102,255,0.3)',
            borderRadius: 9999, padding: '6px 16px', marginBottom: 24,
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#7ba4ff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {copy.eyebrow}
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800,
            color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1,
            margin: '0 0 20px',
          }} className="speakable">
            {copy.title}
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, margin: 0 }} className="speakable">
            {copy.subtitle}
          </p>
        </div>
      </section>

      <section style={{ maxWidth: 860, margin: '0 auto', padding: '64px 24px 80px' }}>
        <dl style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {copy.terms.map((term) => (
            <div
              key={term.id}
              id={term.id}
              style={{
                borderBottom: '1px solid rgba(15,23,42,0.08)',
                padding: '40px 0',
                scrollMarginTop: 100,
              }}
            >
              <dt style={{
                fontSize: 'clamp(18px, 2.5vw, 22px)', fontWeight: 800,
                color: '#0b1322', letterSpacing: '-0.02em',
                marginBottom: 14,
              }}>
                <a
                  href={`#${term.id}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                  aria-label={`${copy.linkAriaPrefix} ${term.term}`}
                >
                  {localizeTerminology(term.term, locale)}
                </a>
              </dt>
              <dd style={{
                margin: 0,
                fontSize: 16,
                color: '#334155',
                lineHeight: 1.75,
                maxWidth: 720,
              }}>
                {localizeTerminology(term.definition, locale)}
              </dd>
              <a
                href={localFeatureHref(term.seeAlso, locale)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  marginTop: 16, fontSize: 13, fontWeight: 600,
                  color: '#3666ff', textDecoration: 'none',
                }}
              >
                {copy.seeFeature}
              </a>
            </div>
          ))}
        </dl>

        <div style={{
          marginTop: 64, padding: '48px 40px', background: '#f8fafc',
          borderRadius: 20, border: '1px solid rgba(15,23,42,0.06)',
          textAlign: 'center',
        }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#0b1322', margin: '0 0 12px', letterSpacing: '-0.02em' }}>
            {copy.ctaTitle}
          </h2>
          <p style={{ fontSize: 16, color: '#64748b', margin: '0 0 28px', lineHeight: 1.65 }}>
            {copy.ctaText}
          </p>
          <a
            href={demoHref}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'linear-gradient(135deg, #3666ff 0%, #5b8aff 100%)',
              color: '#fff', borderRadius: 10, padding: '14px 32px',
              fontSize: 15, fontWeight: 700, textDecoration: 'none',
              boxShadow: '0 8px 24px rgba(54,102,255,0.35)',
            }}
          >
            {copy.ctaButton}
          </a>
        </div>
      </section>

      <FlickeringFooter />
    </main>
  );
}
