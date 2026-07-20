'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Store, Zap, Link2, ArrowRight, ArrowLeft, CheckCircle, Loader2, RefreshCw } from 'lucide-react';

/* ─── Types ──────────────────────────────────────────────────────────────── */
type Path = 'vendor' | 'pricing' | 'api' | null;
type Step = 'choose' | 'form' | 'otp' | 'success';

interface VendorForm {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  city: string;
  businessType: string;
}

interface EnquiryForm {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  message: string;
}

/* ─── Slide animation ────────────────────────────────────────────────────── */
const slide = {
  initial: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  animate: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir * -40, opacity: 0 }),
  transition: { duration: 0.28, ease: [0.32, 0, 0.67, 0] },
};

/* ─── Path option cards ──────────────────────────────────────────────────── */
const PATH_OPTIONS: { id: Path; icon: React.ReactNode; label: string; sub: string; color: string }[] = [
  {
    id: 'vendor',
    icon: <Store className="size-6" />,
    label: 'Sign Up as a Vendor',
    sub: 'Join the FactWise supplier network and start receiving RFQs',
    color: '#10b981',
  },
  {
    id: 'pricing',
    icon: <Zap className="size-6" />,
    label: 'Build Pricing Automation',
    sub: 'Store your price list and let AI auto-respond to buyer RFQs',
    color: '#3666ff',
  },
  {
    id: 'api',
    icon: <Link2 className="size-6" />,
    label: 'Automate via API',
    sub: 'Connect your ERP or system directly to the FactWise platform',
    color: '#f59e0b',
  },
];

/* ─── Input helper ───────────────────────────────────────────────────────── */
function Field({
  label, id, type = 'text', value, onChange, required = false,
  placeholder = '', textarea = false,
}: {
  label: string; id: string; type?: string; value: string;
  onChange: (v: string) => void; required?: boolean;
  placeholder?: string; textarea?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}{required && <span style={{ color: '#ef4444', marginLeft: 3 }}>*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={{
            width: '100%', boxSizing: 'border-box', padding: '10px 14px',
            border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14,
            color: '#1a1d2e', background: '#fff', outline: 'none',
            fontFamily: 'inherit', resize: 'none', lineHeight: 1.5,
            transition: 'border-color .15s',
          }}
          onFocus={e => { e.target.style.borderColor = '#3666ff'; }}
          onBlur={e => { e.target.style.borderColor = '#e2e8f0'; }}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          style={{
            width: '100%', boxSizing: 'border-box', padding: '10px 14px',
            border: '1.5px solid #e2e8f0', borderRadius: 10, fontSize: 14,
            color: '#1a1d2e', background: '#fff', outline: 'none',
            fontFamily: 'inherit', transition: 'border-color .15s',
          }}
          onFocus={e => { e.target.style.borderColor = '#3666ff'; }}
          onBlur={e => { e.target.style.borderColor = '#e2e8f0'; }}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN MODAL
═══════════════════════════════════════════════════════════════════════════ */
export default function SupplierModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>('choose');
  const [dir, setDir] = useState(1);
  const [path, setPath] = useState<Path>(null);

  // Vendor form state
  const [vForm, setVForm] = useState<VendorForm>({ name: '', businessName: '', email: '', phone: '', city: '', businessType: '' });
  // Enquiry form state
  const [eForm, setEForm] = useState<EnquiryForm>({ name: '', businessName: '', email: '', phone: '', message: '' });

  // OTP state
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otpError, setOtpError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Loading / error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Resend cooldown countdown
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  /* ── Navigation ── */
  const goTo = (next: Step, direction = 1) => {
    setDir(direction);
    setError('');
    setStep(next);
  };

  /* ── Choose path → form ── */
  const handleChoose = (p: Path) => {
    setPath(p);
    goTo('form', 1);
  };

  /* ── Send OTP (vendor) ── */
  const handleSendOtp = useCallback(async () => {
    setError('');
    if (!vForm.name || !vForm.businessName || !vForm.email || !vForm.phone) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/supplier/send-otp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(vForm),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Failed to send OTP.'); return; }
      setOtp(['', '', '', '', '', '']);
      setResendCooldown(60);
      goTo('otp', 1);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [vForm]);

  /* ── Submit enquiry (pricing / api) ── */
  const handleEnquirySubmit = useCallback(async () => {
    setError('');
    if (!eForm.name || !eForm.businessName || !eForm.email) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/supplier/enquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...eForm, enquiryType: path }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? 'Submission failed.'); return; }
      goTo('success', 1);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [eForm, path]);

  /* ── Verify OTP ── */
  const handleVerifyOtp = useCallback(async () => {
    const code = otp.join('');
    if (code.length < 6) { setOtpError('Please enter the 6-digit code.'); return; }
    setOtpError('');
    setLoading(true);
    try {
      const res = await fetch('/api/supplier/verify-otp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: vForm.email, otp: code }),
      });
      const data = await res.json();
      if (!res.ok) { setOtpError(data.error ?? 'Verification failed.'); return; }
      goTo('success', 1);
    } catch {
      setOtpError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [otp, vForm.email]);

  /* ── OTP input handler ── */
  const handleOtpChange = (index: number, val: string) => {
    const v = val.replace(/\D/g, '').slice(-1);
    const next = [...otp];
    next[index] = v;
    setOtp(next);
    if (v && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  /* ── Resend OTP ── */
  const handleResend = useCallback(async () => {
    if (resendCooldown > 0) return;
    setOtpError('');
    setLoading(true);
    try {
      const res = await fetch('/api/supplier/send-otp', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(vForm),
      });
      if (!res.ok) { const d = await res.json(); setOtpError(d.error ?? 'Failed to resend.'); return; }
      setOtp(['', '', '', '', '', '']);
      setResendCooldown(60);
    } catch {
      setOtpError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [resendCooldown, vForm]);

  const pathInfo = PATH_OPTIONS.find(p => p.id === path);

  /* ─── Backdrop ─────────────────────────────────────────────────────────── */
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(10,14,28,0.65)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.94, opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: '#fff', borderRadius: 20, width: '100%',
          maxWidth: step === 'choose' ? 580 : 480,
          boxShadow: '0 32px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.06)',
          overflow: 'hidden', position: 'relative',
        }}
      >
        {/* ── Header bar ── */}
        <div style={{ padding: '20px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Step back button */}
            {(step === 'form' || step === 'otp') && (
              <button
                onClick={() => goTo(step === 'otp' ? 'form' : 'choose', -1)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#64748b' }}
              >
                <ArrowLeft className="size-4" />
              </button>
            )}
            <div>
              <p style={{ margin: 0, fontSize: 11, fontWeight: 700, color: '#3666ff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                FactWise Supplier Portal
              </p>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#1a1d2e', lineHeight: 1.3 }}>
                {step === 'choose' && 'Get Started as a Supplier'}
                {step === 'form' && pathInfo?.label}
                {step === 'otp' && 'Verify Your Email'}
                {step === 'success' && 'You\'re all set!'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: '#f1f5f9', border: 'none', borderRadius: 10, padding: 8, cursor: 'pointer', color: '#64748b', display: 'flex' }}
          >
            <X className="size-4" />
          </button>
        </div>

        {/* ── Progress dots ── */}
        <div style={{ padding: '10px 24px 0', display: 'flex', gap: 6 }}>
          {(['choose', 'form', ...(path === 'vendor' ? ['otp'] : []), 'success'] as Step[]).map((s, i) => (
            <div key={i} style={{
              height: 3, flex: 1, borderRadius: 3,
              background: ['choose', 'form', 'otp', 'success'].indexOf(step) >= i ? '#3666ff' : '#e2e8f0',
              transition: 'background .3s',
            }} />
          ))}
        </div>

        {/* ── Step content ── */}
        <div style={{ padding: '20px 24px 24px', minHeight: 300 }}>
          <AnimatePresence mode="wait" custom={dir}>

            {/* ══ STEP 1: Choose Path ══ */}
            {step === 'choose' && (
              <motion.div key="choose" custom={dir} {...slide}>
                <p style={{ margin: '0 0 16px', fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
                  Choose how you'd like to work with FactWise — we'll tailor the experience for you.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {PATH_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => handleChoose(opt.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 16, padding: '16px 18px',
                        border: '1.5px solid #e2e8f0', borderRadius: 14, background: '#fff',
                        cursor: 'pointer', textAlign: 'left', transition: 'all .18s',
                        width: '100%',
                      }}
                      onMouseEnter={e => {
                        const t = e.currentTarget;
                        t.style.borderColor = opt.color;
                        t.style.background = `${opt.color}08`;
                        t.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={e => {
                        const t = e.currentTarget;
                        t.style.borderColor = '#e2e8f0';
                        t.style.background = '#fff';
                        t.style.transform = 'translateX(0)';
                      }}
                    >
                      <div style={{
                        width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                        background: `${opt.color}15`, display: 'flex', alignItems: 'center',
                        justifyContent: 'center', color: opt.color,
                      }}>
                        {opt.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: '0 0 3px', fontSize: 15, fontWeight: 700, color: '#1a1d2e' }}>{opt.label}</p>
                        <p style={{ margin: 0, fontSize: 13, color: '#64748b', lineHeight: 1.4 }}>{opt.sub}</p>
                      </div>
                      <ArrowRight className="size-4" style={{ color: '#94a3b8', flexShrink: 0 }} />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* ══ STEP 2: Form ══ */}
            {step === 'form' && (
              <motion.div key="form" custom={dir} {...slide}>
                {path === 'vendor' ? (
                  /* ── Vendor registration form ── */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <Field label="Full Name" id="v-name" value={vForm.name} onChange={v => setVForm(f => ({ ...f, name: v }))} required placeholder="Your full name" />
                      <Field label="Business Name" id="v-biz" value={vForm.businessName} onChange={v => setVForm(f => ({ ...f, businessName: v }))} required placeholder="Your company / trade name" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <Field label="Email" id="v-email" type="email" value={vForm.email} onChange={v => setVForm(f => ({ ...f, email: v }))} required placeholder="work@company.com" />
                      <Field label="Phone" id="v-phone" type="tel" value={vForm.phone} onChange={v => setVForm(f => ({ ...f, phone: v }))} required placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <Field label="City / State" id="v-city" value={vForm.city} onChange={v => setVForm(f => ({ ...f, city: v }))} placeholder="e.g. Mumbai, Maharashtra" />
                      <div>
                        <label htmlFor="v-type" style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#64748b', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                          Business Type
                        </label>
                        <select
                          id="v-type"
                          value={vForm.businessType}
                          onChange={e => setVForm(f => ({ ...f, businessType: e.target.value }))}
                          style={{
                            width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0',
                            borderRadius: 10, fontSize: 14, color: vForm.businessType ? '#1a1d2e' : '#94a3b8',
                            background: '#fff', outline: 'none', fontFamily: 'inherit', cursor: 'pointer',
                          }}
                        >
                          <option value="">Select type...</option>
                          <option value="Manufacturer">Manufacturer</option>
                          <option value="Trader">Trader / Reseller</option>
                          <option value="Service Provider">Service Provider</option>
                          <option value="Distributor">Distributor</option>
                        </select>
                      </div>
                    </div>

                    {error && (
                      <p style={{ margin: 0, padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, fontSize: 13, color: '#dc2626' }}>
                        {error}
                      </p>
                    )}

                    <button
                      onClick={handleSendOtp}
                      disabled={loading}
                      style={{
                        width: '100%', padding: '13px 24px', background: loading ? '#94a3b8' : '#10b981',
                        color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
                        cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: 8, transition: 'background .15s',
                      }}
                    >
                      {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                      {loading ? 'Sending code...' : 'Send Verification Code →'}
                    </button>
                    <p style={{ margin: 0, textAlign: 'center', fontSize: 12, color: '#94a3b8' }}>
                      We'll send a 6-digit OTP to verify your email
                    </p>
                  </div>
                ) : (
                  /* ── Enquiry form (pricing / api) ── */
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div style={{ padding: '12px 14px', background: path === 'pricing' ? '#eff6ff' : '#fffbeb', border: `1px solid ${path === 'pricing' ? '#bfdbfe' : '#fde68a'}`, borderRadius: 10, fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>
                      Our team will review your enquiry and reach out to you within <strong style={{ color: '#1a1d2e' }}>1–2 business days</strong> to discuss your requirements.
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <Field label="Full Name" id="e-name" value={eForm.name} onChange={v => setEForm(f => ({ ...f, name: v }))} required placeholder="Your full name" />
                      <Field label="Business Name" id="e-biz" value={eForm.businessName} onChange={v => setEForm(f => ({ ...f, businessName: v }))} required placeholder="Company / trade name" />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                      <Field label="Email" id="e-email" type="email" value={eForm.email} onChange={v => setEForm(f => ({ ...f, email: v }))} required placeholder="work@company.com" />
                      <Field label="Phone" id="e-phone" type="tel" value={eForm.phone} onChange={v => setEForm(f => ({ ...f, phone: v }))} placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <Field label="Brief Message (optional)" id="e-msg" value={eForm.message} onChange={v => setEForm(f => ({ ...f, message: v }))} placeholder="Tell us about your current setup or what you're trying to achieve..." textarea />

                    {error && (
                      <p style={{ margin: 0, padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, fontSize: 13, color: '#dc2626' }}>
                        {error}
                      </p>
                    )}

                    <button
                      onClick={handleEnquirySubmit}
                      disabled={loading}
                      style={{
                        width: '100%', padding: '13px 24px',
                        background: loading ? '#94a3b8' : path === 'pricing' ? '#3666ff' : '#f59e0b',
                        color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
                        cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: 8, transition: 'background .15s',
                      }}
                    >
                      {loading ? <Loader2 className="size-4 animate-spin" /> : null}
                      {loading ? 'Submitting...' : 'Submit Enquiry →'}
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {/* ══ STEP 3: OTP ══ */}
            {step === 'otp' && (
              <motion.div key="otp" custom={dir} {...slide}>
                <p style={{ margin: '0 0 6px', fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
                  We sent a 6-digit code to
                </p>
                <p style={{ margin: '0 0 28px', fontSize: 15, fontWeight: 700, color: '#1a1d2e' }}>
                  {vForm.email}
                </p>

                {/* OTP boxes */}
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 24 }}>
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => { otpRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(i, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(i, e)}
                      onPaste={e => {
                        const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
                        if (pasted.length === 6) {
                          setOtp(pasted.split(''));
                          e.preventDefault();
                        }
                      }}
                      style={{
                        width: 52, height: 60, textAlign: 'center', fontSize: 24, fontWeight: 700,
                        border: `2px solid ${digit ? '#3666ff' : '#e2e8f0'}`,
                        borderRadius: 12, outline: 'none', color: '#1a1d2e',
                        background: digit ? '#f0f4ff' : '#fff', fontFamily: 'monospace',
                        transition: 'border-color .15s, background .15s',
                      }}
                    />
                  ))}
                </div>

                {otpError && (
                  <p style={{ margin: '0 0 16px', padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, fontSize: 13, color: '#dc2626', textAlign: 'center' }}>
                    {otpError}
                  </p>
                )}

                <button
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.join('').length < 6}
                  style={{
                    width: '100%', padding: '13px 24px',
                    background: loading || otp.join('').length < 6 ? '#94a3b8' : '#10b981',
                    color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700,
                    cursor: loading || otp.join('').length < 6 ? 'not-allowed' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    marginBottom: 16, transition: 'background .15s',
                  }}
                >
                  {loading ? <Loader2 className="size-4 animate-spin" /> : <CheckCircle className="size-4" />}
                  {loading ? 'Verifying...' : 'Verify & Complete Registration'}
                </button>

                <div style={{ textAlign: 'center' }}>
                  <button
                    onClick={handleResend}
                    disabled={resendCooldown > 0 || loading}
                    style={{
                      background: 'none', border: 'none', cursor: resendCooldown > 0 ? 'default' : 'pointer',
                      color: resendCooldown > 0 ? '#94a3b8' : '#3666ff', fontSize: 13, fontWeight: 600,
                      display: 'inline-flex', alignItems: 'center', gap: 6,
                    }}
                  >
                    <RefreshCw className="size-3" />
                    {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code'}
                  </button>
                </div>
              </motion.div>
            )}

            {/* ══ STEP 4: Success ══ */}
            {step === 'success' && (
              <motion.div key="success" custom={dir} {...slide}>
                <div style={{ textAlign: 'center', padding: '16px 0 8px' }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%', margin: '0 auto 20px',
                    background: path === 'vendor' ? '#d1fae5' : path === 'pricing' ? '#dbeafe' : '#fef3c7',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <CheckCircle style={{ width: 36, height: 36, color: path === 'vendor' ? '#10b981' : path === 'pricing' ? '#3666ff' : '#f59e0b' }} />
                  </div>

                  <p style={{ margin: '0 0 8px', fontSize: 22, fontWeight: 800, color: '#1a1d2e' }}>
                    {path === 'vendor' ? 'Registration Received!' : 'Enquiry Submitted!'}
                  </p>

                  <p style={{ margin: '0 0 28px', fontSize: 14, color: '#64748b', lineHeight: 1.7, maxWidth: 360, marginLeft: 'auto', marginRight: 'auto' }}>
                    {path === 'vendor'
                      ? <>A confirmation email has been sent to <strong style={{ color: '#1a1d2e' }}>{vForm.email}</strong>. Please reply with your GST, PAN and bank details to complete onboarding.</>
                      : <>A confirmation email has been sent to <strong style={{ color: '#1a1d2e' }}>{eForm.email}</strong>. Our team will reach out within <strong style={{ color: '#1a1d2e' }}>1–2 business days</strong>.</>
                    }
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <button
                      onClick={onClose}
                      style={{
                        padding: '12px 24px', background: '#1a1d2e', color: '#fff',
                        border: 'none', borderRadius: 12, fontSize: 14, fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      Done
                    </button>
                    <a
                      href="/supplier"
                      style={{ fontSize: 13, color: '#3666ff', textDecoration: 'none', fontWeight: 600 }}
                    >
                      Explore Supplier Features →
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
