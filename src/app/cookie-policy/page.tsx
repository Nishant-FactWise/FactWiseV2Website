'use client';

import React from 'react';
import { ReactLenis } from 'lenis/react';
import { FlickeringFooter } from '@/components/ui/flickering-footer';
import { Cookie, SlidersHorizontal, Trash2, Check } from 'lucide-react';
import {
  OPEN_PREFERENCES_EVENT,
  DELETE_COOKIES_EVENT,
} from '@/components/ui/CookieConsent';

const cookieCategories = [
  {
    name: 'Strictly necessary',
    state: 'Always active',
    desc: 'Required for the website to work — page navigation, security, and remembering your cookie choice. These cannot be switched off.',
    examples: 'fw-cookie-consent (your consent choice)',
  },
  {
    name: 'Analytics',
    state: 'Optional',
    desc: 'Help us understand how visitors use the site so we can improve it. The data is aggregated and not used to identify you.',
    examples: '_ga, _ga_*, _gid (Google Analytics 4)',
  },
  {
    name: 'Marketing',
    state: 'Optional',
    desc: 'Used to measure the effectiveness of our campaigns and to show relevant content. Set only with your consent.',
    examples: '_gcl_au (Google Ads), conversion tags via Google Tag Manager',
  },
];

export default function CookiePolicyPage() {
  const [deleted, setDeleted] = React.useState(false);

  const openPreferences = () => {
    window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
  };

  const deleteCookies = () => {
    window.dispatchEvent(new Event(DELETE_COOKIES_EVENT));
    setDeleted(true);
    window.setTimeout(() => setDeleted(false), 5000);
  };

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <main className="min-h-screen bg-gradient-to-b from-blue-50 via-blue-50/30 to-slate-50/50 text-[#1A1D2E] pt-28">
        {/* Decorative Grid Background */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60" />

        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 w-[800px] h-[350px] bg-blue-200/50 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 max-w-4xl py-12 relative">
          {/* Header Section */}
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold tracking-wide uppercase">
              <Cookie className="w-3.5 h-3.5" />
              Cookie Policy
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
              Cookie Policy
            </h1>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              How FactWise uses cookies, and how you can accept, reject, or delete them at any time.
            </p>
          </div>

          {/* Manage / Delete actions */}
          <div className="mb-12 rounded-3xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 md:p-8">
            <h2 className="text-lg font-bold text-slate-950">Your cookie choices</h2>
            <p className="mt-1.5 text-[14px] text-slate-500">
              Update what you allow, or delete the analytics &amp; marketing cookies we&apos;ve set and start fresh.
            </p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={openPreferences}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#3666ff] px-5 py-3 text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#2b54e0] hover:shadow-md"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Manage preferences
              </button>
              <button
                type="button"
                onClick={deleteCookies}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3 text-[14px] font-semibold text-red-600 transition-colors hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                Delete my cookies
              </button>
            </div>
            {deleted && (
              <p className="mt-4 inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-[13px] font-medium text-green-700">
                <Check className="h-4 w-4" />
                Your analytics &amp; marketing cookies were deleted and your consent reset.
              </p>
            )}
          </div>

          {/* Document Content Box */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 md:p-12 space-y-8 text-[15px] leading-relaxed text-slate-600">
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                What are cookies?
              </h2>
              <p>
                Cookies are small text files that a website places on your device when you visit. They are widely used to make websites work, to remember your preferences, and to provide information to the site&apos;s owners. Similar technologies such as pixels, local storage, and tags work in much the same way, and we refer to all of them as &quot;cookies&quot; in this policy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                How we use cookies
              </h2>
              <p>
                At FactWise, accessible from <a href="https://www.factwise.io" className="text-[#3666ff] hover:underline">www.factwise.io</a>, we use cookies to keep the site running, to understand how it is used so we can improve it, and to measure the performance of our marketing. Non-essential cookies are only set after you give consent through our cookie banner.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                Types of cookies we use
              </h2>
              <div className="space-y-3">
                {cookieCategories.map((c) => (
                  <div key={c.name} className="rounded-2xl border border-slate-100 bg-slate-50/70 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[15px] font-bold text-slate-800">{c.name}</h3>
                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                          c.state === 'Always active'
                            ? 'bg-slate-200 text-slate-600'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {c.state}
                      </span>
                    </div>
                    <p className="mt-2 text-[14px]">{c.desc}</p>
                    <p className="mt-2 text-[12px] text-slate-400">
                      <span className="font-semibold text-slate-500">Examples: </span>
                      {c.examples}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                Third-party cookies
              </h2>
              <p>
                Some cookies are set by third parties we use to operate and analyze the site. We rely on Google Analytics 4, Google Tag Manager, and Google Ads. These services are governed by Google&apos;s own policies, and we run them under Google Consent Mode, meaning analytics and advertising storage stay disabled until you opt in.
              </p>
              <p>
                You can read more in{' '}
                <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-[#3666ff] hover:underline">
                  Google&apos;s cookie documentation
                </a>{' '}
                and our own{' '}
                <a href="/privacy-policy" className="text-[#3666ff] hover:underline">Privacy Policy</a>.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                Managing and deleting cookies
              </h2>
              <p>
                You are in control of your cookies. You can:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Use the <button type="button" onClick={openPreferences} className="font-semibold text-[#3666ff] hover:underline">Manage preferences</button> button above to accept all, reject non-essential, or pick individual categories.
                </li>
                <li>
                  Use the <button type="button" onClick={deleteCookies} className="font-semibold text-[#3666ff] hover:underline">Delete my cookies</button> button to withdraw consent and remove the analytics &amp; marketing cookies we&apos;ve set.
                </li>
                <li>
                  Clear or block cookies through your browser settings. Most browsers let you delete existing cookies and refuse new ones; doing so may affect how some parts of the site work.
                </li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                Consent and withdrawing consent
              </h2>
              <p>
                When you first visit, we ask for your consent before setting any non-essential cookies. Your choice is stored on your device so we don&apos;t ask again on every visit. You can change or withdraw your consent at any time using the buttons above — withdrawing consent re-blocks analytics and marketing cookies straight away.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                Changes to this policy
              </h2>
              <p>
                We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for operational, legal, or regulatory reasons. When we make material changes, we&apos;ll post the updated policy on this page and, where appropriate, ask for your consent again.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-bold text-slate-950 flex items-center gap-2.5">
                <span className="h-6 w-1 bg-[#3666ff] rounded-full" />
                Contact us
              </h2>
              <p>
                If you have any questions about our use of cookies, please reach out at{' '}
                <a href="mailto:support@factwise.io" className="text-[#3666ff] hover:underline">support@factwise.io</a>.
              </p>
            </section>
          </div>
        </div>

        <FlickeringFooter />
      </main>
    </ReactLenis>
  );
}
