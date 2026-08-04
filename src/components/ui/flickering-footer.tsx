"use client";

import { motion, useReducedMotion } from 'framer-motion';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { OPEN_PREFERENCES_EVENT } from './CookieConsent';

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Inquiry to Quote", href: "/inquiry-to-quote" },
      { name: "Requisitions to PO", href: "/requisitions-to-po" },
      { name: "Invoice to Pay", href: "/invoice-to-pay" },
      { name: "For Suppliers", href: "/supplier" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "FAQ", href: "/faq" },
      { name: "Glossary", href: "/glossary" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Book a Demo", href: "/demo" },
      { name: "Contact", href: "/demo" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-of-service" },
      { name: "Cookie Policy", href: "/cookie-policy" },
      { name: "DPDP Compliance", href: "/dpdp-compliance" },
    ],
  },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://in.linkedin.com/company/factwise", icon: <LinkedinIcon /> },
  { name: "Email",    href: "mailto:support@factwise.io",               icon: <Mail size={16} /> },
];

const AnimatedContainer = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export function FlickeringFooter() {
  return (
    <footer style={{ width: '100%', background: '#f8fafc', position: 'relative', overflow: 'hidden' }}>

      {/* Subtle top glow accent */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: '25%',
        width: 600, height: 300, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at top, rgba(54,102,255,0.06) 0%, transparent 70%)',
      }} />

      {/* Border top */}
      <div style={{ height: 1, background: '#e2e8f0' }} />

      {/* Main content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '56px 40px 48px', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48 }} className="footer-top-grid">

          {/* Brand block */}
          <AnimatedContainer delay={0}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                <img src="/logo.webp" alt="FactWise" style={{ height: 40, width: 'auto', borderRadius: 4 }} />
                <span style={{ fontSize: 22, fontWeight: 700, color: '#1A1D2E', letterSpacing: '-0.03em' }}>FactWise</span>
              </Link>

              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.7, maxWidth: 260, margin: 0 }}>
                Source-to-pay procurement intelligence for manufacturing enterprises.
              </p>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: 8 }}>
                {socialLinks.map(s => (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    style={{
                      width: 36, height: 36, borderRadius: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid #e2e8f0', background: '#ffffff',
                      color: '#94a3b8', textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = '#3666ff';
                      el.style.borderColor = '#3666ff';
                      el.style.color = '#ffffff';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.background = '#ffffff';
                      el.style.borderColor = '#e2e8f0';
                      el.style.color = '#94a3b8';
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>

              <a href="mailto:support@factwise.io" style={{
                fontSize: 13, color: '#94a3b8', textDecoration: 'none',
                transition: 'color 0.18s ease', marginTop: -4,
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#3666ff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
              >
                support@factwise.io
              </a>
            </div>
          </AnimatedContainer>

          {/* Nav columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px 24px' }} className="footer-nav-grid">
            {footerLinks.map((section, idx) => (
              <AnimatedContainer key={section.title} delay={0.08 + idx * 0.06}>
                <div>
                  <h4 style={{
                    fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
                    textTransform: 'uppercase', color: '#94a3b8',
                    marginBottom: 16, marginTop: 0,
                  }}>
                    {section.title}
                  </h4>
                  <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 11 }}>
                    {section.links.map(link => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          style={{
                            fontSize: 14, fontWeight: 500,
                            color: '#475569', textDecoration: 'none',
                            transition: 'color 0.18s ease',
                            display: 'inline-flex', alignItems: 'center', gap: 4,
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#3666ff')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#475569')}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedContainer>
            ))}
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid #e2e8f0', padding: '20px 40px', background: '#f8fafc', position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: 16,
        }}>
          <p style={{ fontSize: 11, color: '#94a3b8', margin: 0, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            © 2026 FactWise Technologies. All rights reserved.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center' }}>
            {[
              ['Privacy Policy', '/privacy-policy'],
              ['Terms of Service', '/terms-of-service'],
              ['DPDP Compliance', '/dpdp-compliance'],
            ].map(([label, href]) => (
              <Link key={label} href={href} style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#94a3b8',
                textDecoration: 'none', transition: 'color 0.18s ease',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#1A1D2E')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
              >
                {label}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
              style={{
                fontSize: 11, fontWeight: 700, letterSpacing: '0.08em',
                textTransform: 'uppercase', color: '#94a3b8',
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 0, transition: 'color 0.18s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#1A1D2E')}
              onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .footer-top-grid { grid-template-columns: 280px 1fr !important; }
          .footer-nav-grid { grid-template-columns: repeat(4, 1fr) !important; }
        }
      `}</style>
    </footer>
  );
}
