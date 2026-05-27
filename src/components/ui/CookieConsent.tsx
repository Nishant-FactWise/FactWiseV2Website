'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, Trash2, X } from 'lucide-react';
import Link from 'next/link';

/**
 * Cookie consent banner wired to Google Consent Mode v2.
 *
 * The site loads GTM + GA4 (see app/layout.tsx). layout.tsx sets the consent
 * *default* to "denied" before those scripts run; this banner is what flips
 * the relevant categories to "granted" once the visitor makes a choice.
 *
 * Choice is persisted in localStorage under STORAGE_KEY so the banner only
 * appears on the first visit. Bump CONSENT_VERSION to re-prompt everyone
 * (e.g. when the set of cookie categories changes).
 *
 * Open the preferences again from anywhere (e.g. the /cookie-policy page) by
 * dispatching: window.dispatchEvent(new Event('fw:open-cookie-preferences'))
 *
 * Delete all stored consent + clear analytics/marketing cookies (a "withdraw
 * consent" / reset) from anywhere by dispatching:
 *   window.dispatchEvent(new Event('fw:delete-cookies'))
 * This re-denies consent and re-shows the banner so the visitor can choose again.
 */

const STORAGE_KEY = 'fw-cookie-consent';
const CONSENT_VERSION = 1;
export const OPEN_PREFERENCES_EVENT = 'fw:open-cookie-preferences';
export const DELETE_COOKIES_EVENT = 'fw:delete-cookies';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type Preferences = {
  analytics: boolean;
  marketing: boolean;
};

type StoredConsent = Preferences & {
  version: number;
  timestamp: string;
};

// Flip Google Consent Mode v2 categories. layout.tsx defines window.gtag and
// sets the default to "denied" before GTM/GA load, so this is what actually
// unblocks analytics/marketing cookies once the visitor chooses.
function updateGoogleConsent({ analytics, marketing }: Preferences) {
  if (typeof window === 'undefined') return;
  const consent = {
    analytics_storage: analytics ? 'granted' : 'denied',
    ad_storage: marketing ? 'granted' : 'denied',
    ad_user_data: marketing ? 'granted' : 'denied',
    ad_personalization: marketing ? 'granted' : 'denied',
  };
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', consent);
  } else {
    // Safety net if gtag isn't defined yet (e.g. scripts blocked).
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(['consent', 'update', consent]);
  }
}

// --- Persisted consent as an external store (read via useSyncExternalStore) ---
// Reading localStorage this way keeps SSR and hydration consistent and avoids
// calling setState inside an effect. PENDING is the value before the browser
// has been read (server render + first client/hydration render), so the banner
// stays hidden until we *know* a returning visitor has no stored choice — no flash.
const PENDING = Symbol('cookie-consent-pending');
const CONSENT_CHANGED_EVENT = 'fw:cookie-consent-changed';

function getStoredRaw(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function getServerStoredRaw(): typeof PENDING {
  return PENDING;
}

function subscribeStorage(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener(CONSENT_CHANGED_EVENT, callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener(CONSENT_CHANGED_EVENT, callback);
  };
}

// Tell our own useSyncExternalStore subscribers to re-read after we write/clear
// consent in the same tab ('storage' only fires in *other* tabs).
function notifyConsentChanged() {
  window.dispatchEvent(new Event(CONSENT_CHANGED_EVENT));
}

function parseStored(raw: string | null | typeof PENDING): StoredConsent | null {
  if (raw === PENDING || !raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredConsent;
    if (parsed.version !== CONSENT_VERSION) return null;
    return parsed;
  } catch {
    return null;
  }
}

// Expire a single cookie across the path/domain combinations a browser-set
// cookie might live under. JS can only clear cookies it can see (i.e. not
// HttpOnly), which covers the analytics/marketing cookies we care about.
function expireCookie(name: string) {
  if (typeof document === 'undefined') return;
  const past = 'expires=Thu, 01 Jan 1970 00:00:00 GMT';
  const hostname = window.location.hostname;
  const domains = new Set<string>(['', hostname, `.${hostname}`]);
  // Tracking cookies (e.g. _ga) are usually set on the registrable root domain.
  const parts = hostname.split('.');
  if (parts.length > 2) domains.add(`.${parts.slice(-2).join('.')}`);
  for (const domain of domains) {
    const d = domain ? `; domain=${domain}` : '';
    document.cookie = `${name}=; ${past}; path=/${d}`;
  }
}

// Remove the analytics/marketing cookies dropped by GA4, Google Ads and GTM.
// Strictly-necessary cookies are left untouched.
function clearTrackingCookies() {
  if (typeof document === 'undefined' || !document.cookie) return;
  const trackingPrefixes = ['_ga', '_gid', '_gat', '_gcl', '_gac', '__utm', '_fbp', '_fbc', 'AMP_TOKEN'];
  for (const pair of document.cookie.split(';')) {
    const name = pair.split('=')[0].trim();
    if (name && trackingPrefixes.some((p) => name.startsWith(p))) {
      expireCookie(name);
    }
  }
}

// --- Small switch used in the "Manage preferences" panel ---
function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3666ff]/50 ${
        checked ? 'bg-[#3666ff]' : 'bg-slate-300'
      } ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
    >
      <span
        className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow-sm transition-transform duration-300 ${
          checked ? 'translate-x-5.5' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  // The stored choice, read from localStorage as an external store.
  const raw = React.useSyncExternalStore<string | null | typeof PENDING>(
    subscribeStorage,
    getStoredRaw,
    getServerStoredRaw,
  );
  const stored = parseStored(raw);

  // Session-only UI state (only ever set from event handlers, never in render).
  const [reopened, setReopened] = React.useState(false);
  const [showPrefs, setShowPrefs] = React.useState(false);
  const [analytics, setAnalytics] = React.useState(true);
  const [marketing, setMarketing] = React.useState(true);

  // Show on the first visit (resolved client read, no stored choice) or whenever
  // the visitor re-opens preferences. While raw === PENDING (server + hydration)
  // the banner stays hidden so returning visitors never see a flash.
  const visible = reopened || (raw !== PENDING && stored === null);

  // Re-apply the saved choice to Google Consent Mode whenever it changes. Consent
  // defaults to "denied" in layout.tsx, so without this the grant would be lost on
  // every load. This only updates an external system (no setState) so it's a
  // legitimate effect.
  React.useEffect(() => {
    const current = parseStored(raw);
    if (current) {
      updateGoogleConsent({ analytics: current.analytics, marketing: current.marketing });
    }
  }, [raw]);

  // React to "open preferences" / "delete cookies" requests dispatched from
  // anywhere (footer, cookie-policy page, the banner's own Delete button).
  React.useEffect(() => {
    const reopen = () => {
      const current = parseStored(getStoredRaw());
      setAnalytics(current?.analytics ?? true);
      setMarketing(current?.marketing ?? true);
      setShowPrefs(true);
      setReopened(true);
    };
    const onDelete = () => {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* storage unavailable — nothing to remove */
      }
      clearTrackingCookies();
      updateGoogleConsent({ analytics: false, marketing: false });
      setAnalytics(true);
      setMarketing(true);
      setShowPrefs(false);
      setReopened(false);
      notifyConsentChanged(); // raw -> null -> banner re-appears so the visitor can re-choose
    };
    window.addEventListener(OPEN_PREFERENCES_EVENT, reopen);
    window.addEventListener(DELETE_COOKIES_EVENT, onDelete);
    return () => {
      window.removeEventListener(OPEN_PREFERENCES_EVENT, reopen);
      window.removeEventListener(DELETE_COOKIES_EVENT, onDelete);
    };
  }, []);

  const persist = (prefs: Preferences) => {
    const payload: StoredConsent = {
      ...prefs,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* storage unavailable (private mode / disabled) — consent simply won't persist */
    }
    updateGoogleConsent(prefs);
    setShowPrefs(false);
    setReopened(false);
    notifyConsentChanged(); // raw now holds the choice -> banner hides
  };

  const acceptAll = () => persist({ analytics: true, marketing: true });
  const rejectAll = () => persist({ analytics: false, marketing: false });
  const saveChoices = () => persist({ analytics, marketing });
  // Delegate to the DELETE_COOKIES_EVENT handler so the logic lives in one place.
  const deleteAndReset = () => window.dispatchEvent(new Event(DELETE_COOKIES_EVENT));

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-modal="false"
          aria-label="Cookie consent"
          className="fixed bottom-4 left-4 right-4 z-[100] md:left-6 md:right-auto md:bottom-6 md:w-[420px]"
        >
          <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 p-6 shadow-[0_20px_60px_-12px_rgba(16,24,40,0.18)] backdrop-blur-xl">
            {/* Subtle brand glow */}
            <div className="pointer-events-none absolute -top-16 -right-10 h-40 w-40 rounded-full bg-blue-200/40 blur-3xl" />

            <div className="relative">
              <div className="mb-4 flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-[#3666ff]">
                  <Cookie className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-slate-900">We value your privacy</h2>
                  <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
                    We use cookies to keep the site running, understand how it&apos;s used, and improve
                    your experience. You can accept all, reject non-essential, or choose what to allow.{' '}
                    <Link
                      href="/cookie-policy"
                      className="font-medium text-[#3666ff] hover:underline"
                    >
                      Cookie Policy
                    </Link>
                    .
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Dismiss and reject non-essential cookies"
                  onClick={rejectAll}
                  className="-mr-1 -mt-1 rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Preference toggles */}
              <AnimatePresence initial={false}>
                {showPrefs && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mb-4 space-y-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[13px] font-semibold text-slate-800">Strictly necessary</p>
                          <p className="text-[11px] text-slate-500">Required for the site to function. Always on.</p>
                        </div>
                        <Toggle checked disabled label="Strictly necessary cookies (always on)" />
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t border-slate-200/70 pt-3">
                        <div>
                          <p className="text-[13px] font-semibold text-slate-800">Analytics</p>
                          <p className="text-[11px] text-slate-500">Helps us understand usage (Google Analytics).</p>
                        </div>
                        <Toggle checked={analytics} onChange={setAnalytics} label="Analytics cookies" />
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t border-slate-200/70 pt-3">
                        <div>
                          <p className="text-[13px] font-semibold text-slate-800">Marketing</p>
                          <p className="text-[11px] text-slate-500">Used to measure and personalize campaigns.</p>
                        </div>
                        <Toggle checked={marketing} onChange={setMarketing} label="Marketing cookies" />
                      </div>
                      <div className="flex items-center justify-between gap-4 border-t border-slate-200/70 pt-3">
                        <div className="pr-2">
                          <p className="text-[13px] font-semibold text-slate-800">Delete cookies</p>
                          <p className="text-[11px] text-slate-500">Forget my choice and remove analytics &amp; marketing cookies.</p>
                        </div>
                        <button
                          type="button"
                          onClick={deleteAndReset}
                          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-[12px] font-semibold text-red-600 transition-colors hover:bg-red-50"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Actions */}
              <div className="flex flex-col gap-2.5">
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={rejectAll}
                    className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    Reject
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    className="flex-1 rounded-xl bg-[#3666ff] px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-all hover:bg-[#2b54e0] hover:shadow-md"
                  >
                    Accept all
                  </button>
                </div>
                {showPrefs ? (
                  <button
                    type="button"
                    onClick={saveChoices}
                    className="w-full rounded-xl bg-slate-900 px-4 py-2.5 text-[13px] font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    Save my choices
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowPrefs(true)}
                    className="w-full text-center text-[12px] font-semibold uppercase tracking-wider text-slate-400 transition-colors hover:text-slate-600"
                  >
                    Manage preferences
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
