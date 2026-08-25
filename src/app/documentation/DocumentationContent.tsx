'use client';

import React from 'react';
import { ReactLenis } from 'lenis/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  ShoppingCart,
  Receipt,
  Calculator,
  Users,
  Plug,
  Settings,
  ShieldCheck,
  Search,
  ArrowRight,
  Mail,
} from 'lucide-react';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import { getPathLocale, localizePath } from '@/lib/i18n';
import { localizeTerminology } from '@/lib/localized-terminology';
import { messages } from '@/lib/messages';

type DocCategory = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  topics: string[];
  href?: string;
};

const categories: DocCategory[] = [
  {
    title: 'Getting Started',
    description: 'New to FactWise? Set up your workspace and learn how the platform fits your procurement process.',
    icon: BookOpen,
    topics: [
      'What is FactWise',
      'Set up your organization',
      'Invite and manage your team',
      'Navigating the dashboard',
    ],
  },
  {
    title: 'Requisitions to PO',
    description: 'Raise structured requisitions, run approvals and RFQs, negotiate with AI, and generate purchase orders.',
    icon: ShoppingCart,
    href: '/requisitions-to-po',
    topics: [
      'Creating a requisition',
      'Approval workflows',
      'Managing RFQs',
      'Using AI negotiation',
      'Generating purchase orders',
    ],
  },
  {
    title: 'Invoice to Pay',
    description: 'Capture invoices, run 4-way matching, and automate approvals and payments.',
    icon: Receipt,
    href: '/invoice-to-pay',
    topics: [
      'Capturing & uploading invoices',
      '4-way matching (PO, GR, QC, contract)',
      'Handling exceptions',
      'Approval routing',
      'Processing payments',
    ],
  },
  {
    title: 'Inquiry to Quote',
    description: 'Build accurate costs and generate customer quotes with BOM intelligence and landed cost analysis.',
    icon: Calculator,
    href: '/inquiry-to-quote',
    topics: [
      'Building a BOM',
      'Intelligent sourcing',
      'Landed cost analysis',
      'Generating customer quotes',
    ],
  },
  {
    title: 'Vendor Management',
    description: 'Onboard vendors, maintain profiles, and keep all supplier communication in one place.',
    icon: Users,
    topics: [
      'Onboarding vendors',
      'Vendor profiles & documents',
      'Vendor communication',
      'Performance & compliance',
    ],
  },
  {
    title: 'Integrations',
    description: 'Connect FactWise to your ERP and finance systems, and move data in and out.',
    icon: Plug,
    topics: [
      'ERP integration overview',
      'Importing master data',
      'Exporting reports',
      'API access',
    ],
  },
  {
    title: 'Admin & Settings',
    description: 'Configure users, roles, permissions, and organization-wide settings.',
    icon: Settings,
    topics: [
      'Users & roles',
      'Permissions & approvals',
      'Organization settings',
      'Notifications',
    ],
  },
  {
    title: 'Security & Compliance',
    description: 'How FactWise protects your procurement, vendor, and financial data.',
    icon: ShieldCheck,
    topics: [
      'Data security overview',
      'Access controls',
      'Audit trails',
      'Data retention',
    ],
  },
];

export default function DocumentationContent() {
  const [query, setQuery] = React.useState('');
  const pathname = usePathname();
  const locale = getPathLocale(pathname);
  const textMap = messages[locale].textMap;
  const t = React.useCallback(
    (source: string) => localizeTerminology(textMap[source] ?? source, locale),
    [locale, textMap],
  );
  const localizedCategories = React.useMemo(
    () =>
      categories.map((category) => ({
        ...category,
        title: t(category.title),
        description: t(category.description),
        topics: category.topics.map((topic) => t(topic)),
      })),
    [t],
  );

  const q = query.trim().toLowerCase();
  const filtered = q
    ? localizedCategories.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.topics.some((t) => t.toLowerCase().includes(q)),
      )
    : localizedCategories;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="min-h-screen bg-slate-50/50 text-[#1A1D2E] pt-28">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[350px] bg-blue-100/40 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 max-w-5xl py-12 relative">
          {/* Header */}
          <div className="text-center space-y-4 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase">
              <BookOpen className="w-3.5 h-3.5" />
              {t('Documentation')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] pb-1.5 bg-gradient-to-r from-slate-900 via-slate-800 to-[#3666ff] bg-clip-text text-transparent">
              {t('Documentation')}
            </h1>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              {t('Guides and references for getting the most out of FactWise — from setup and core workflows to integrations and security.')}
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-12">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('Search the docs...')}
              aria-label={t('Search documentation')}
              className="w-full rounded-2xl border border-slate-200 bg-white/90 pl-11 pr-4 py-3.5 text-[14px] text-slate-700 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-[#3666ff] focus:ring-2 focus:ring-[#3666ff]/20"
            />
          </div>

          {/* Categories */}
          {filtered.length === 0 ? (
            <div className="rounded-3xl border border-slate-200/80 bg-white p-10 text-center">
              <p className="text-slate-500 text-[15px]">
                {t('No docs match')} &ldquo;{query}&rdquo;. {t('Try a different search, or')}{' '}
                <a href="mailto:support@factwise.io" className="font-semibold text-[#3666ff] hover:underline">
                  {t('ask our team')}
                </a>
                .
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2">
              {filtered.map((category) => {
                const Icon = category.icon;
                return (
                  <article
                    key={category.title}
                    className="flex flex-col rounded-3xl border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgb(0,0,0,0.02)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.06)]"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-[#3666ff]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-bold text-slate-900">{category.title}</h2>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-slate-500">
                      {category.description}
                    </p>
                    <ul className="mt-4 space-y-2.5">
                      {category.topics.map((topic) => (
                        <li key={topic} className="flex items-start gap-2.5 text-[14px] text-slate-600">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#3666ff]/40" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                    {category.href && (
                      <Link
                        href={localizePath(category.href, locale)}
                        className="group mt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#3666ff] hover:underline"
                      >
                        {t('Explore the module')}
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </Link>
                    )}
                  </article>
                );
              })}
            </div>
          )}

          {/* CTA */}
          <div className="mt-14 overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 text-center md:p-10">
            <h3 className="text-xl font-bold text-slate-900 md:text-2xl">{t("Can't find what you need?")}</h3>
            <p className="mx-auto mt-2 max-w-[450px] text-[14px] text-slate-500 md:text-[15px]">
              {t("Book a demo for a guided walkthrough, or reach our team and we'll point you to the right place.")}
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={localizePath('/demo', locale)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3666ff] px-6 py-3 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#2b54e0] hover:shadow-md"
              >
                {t('Book a demo')}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="mailto:support@factwise.io"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-[14px] font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                <Mail className="h-4 w-4" />
                {t('Email support')}
              </a>
            </div>
          </div>
        </div>

        <FlickeringFooter />
      </main>
    </ReactLenis>
  );
}
