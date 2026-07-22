'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowLeft, Loader2, Cpu, Globe, Search, FileSpreadsheet, Building2, CreditCard, ShieldCheck, ChevronDown, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

/* ── Custom Dropdown Component ─────────────────────────────────────────────── */
interface DropdownProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}

function CustomDropdown({ options, value, onChange, placeholder = 'Select...', required }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <select
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        tabIndex={-1}
        aria-hidden
        className="absolute inset-0 opacity-0 pointer-events-none w-full h-full"
      >
        <option value="" />
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>

      <button
        type="button"
        onClick={() => setOpen(p => !p)}
        className={`w-full flex items-center justify-between bg-white border rounded-lg px-4 py-2.5 text-sm transition-all shadow-sm
          ${open
            ? 'border-[#3666ff] ring-4 ring-[#3666ff]/10'
            : 'border-slate-200 hover:border-slate-300'
          }`}
      >
        <span className={selected ? 'text-slate-900 font-medium' : 'text-slate-400'}>
          {selected ? selected.label : placeholder}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 mt-1.5 w-full max-h-56 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-xl py-1"
          >
            {options.map(o => (
              <li key={o.value}>
                <button
                  type="button"
                  onClick={() => { onChange(o.value); setOpen(false); }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors
                    ${value === o.value
                      ? 'bg-[#3666ff]/8 text-[#3666ff] font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  {o.label}
                  {value === o.value && <Check className="w-3.5 h-3.5 text-[#3666ff]" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SupplierOnboardingDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');

  const [gstin, setGstin] = useState('');
  const [pan, setPan] = useState('');
  const [category, setCategory] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill parameters from URL query strings
  useEffect(() => {
    const qpEmail = searchParams.get('email');
    const qpCompany = searchParams.get('company');
    const qpName = searchParams.get('name');

    if (qpEmail) setEmail(qpEmail);
    if (qpCompany) setCompany(qpCompany);
    if (qpName) setName(qpName);
  }, [searchParams]);

  const categoryOptions = [
    { value: 'Electronics & Components', label: 'Electronics & Components' },
    { value: 'Raw Materials & Metals', label: 'Raw Materials & Metals' },
    { value: 'Industrial Machinery & Tools', label: 'Industrial Machinery & Tools' },
    { value: 'Metal Fabrication & Machining', label: 'Metal Fabrication & Machining' },
    { value: 'Chemicals & Plastics', label: 'Chemicals & Plastics' },
    { value: 'IT & Software Services', label: 'IT & Software Services' },
    { value: 'Packaging & Supplies', label: 'Packaging & Supplies' },
    { value: 'Logistics & Freight', label: 'Logistics & Freight' },
    { value: 'MRO & Safety Equipment', label: 'MRO & Safety Equipment' },
    { value: 'Other Services', label: 'Other Services' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic format checks
    if (gstin.trim().length < 15) {
      setError('Please enter a valid 15-character GSTIN (e.g. 27AAAAA0000A1Z5).');
      return;
    }
    if (pan.trim().length < 10) {
      setError('Please enter a valid 10-character PAN number (e.g. ABCDE1234F).');
      return;
    }
    if (ifscCode.trim().length < 11) {
      setError('Please enter a valid 11-character IFSC code (e.g. SBIN0001234).');
      return;
    }

    setLoading(true);

    const payload = {
      name,
      company,
      email,
      gstin: gstin.toUpperCase().trim(),
      pan: pan.toUpperCase().trim(),
      category,
      bankName,
      accountNumber,
      ifscCode: ifscCode.toUpperCase().trim(),
      address,
      city,
      state,
      pincode,
    };

    try {
      const res = await fetch('/api/supplier/complete-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Submission failed. Please try again.');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col relative overflow-hidden font-sans">
      {/* Ambient background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-500/5 blur-[120px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(120,150,220,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(120,150,220,0.04) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
            maskImage: 'radial-gradient(ellipse at center,black 30%,transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center,black 30%,transparent 80%)',
          }}
        />
      </div>

      {/* Navbar Header */}
      <header className="relative z-20 w-full px-6 py-6 flex items-center justify-between max-w-350 mx-auto">
        <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <img
            src="/logowhite.webp"
            alt="FactWise Logo"
            className="h-7 w-auto rounded-tl-[15%] rounded-br-[15%]"
            style={{ clipPath: 'inset(2% 0 0 2%)' }}
          />
          <span>FactWise</span>
        </div>
        <Link
          href="/supplier"
          className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors bg-white/5 border border-white/10 px-4 py-2 rounded-full hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Suppliers
        </Link>
      </header>

      {/* Card Body */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6 py-10 w-full mx-auto min-h-0">
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="details-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ width: '100%', maxWidth: '64rem' }}
              className="flex flex-col lg:flex-row bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden"
            >
              {/* Left Panel */}
              <div className="flex-1 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 relative overflow-y-auto">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3666ff]/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px w-6 bg-[#3666ff]/80" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3666ff]/80">
                      Vendor Qualification
                    </span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-4 text-slate-900 leading-[1.1]">
                    Complete Your <br />
                    <span className="text-[#3666ff]">Vendor Profile.</span>
                  </h1>
                  <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                    Enter your registered tax, banking, and category details to activate your FactWise Supplier Network account and start receiving buyer RFQs.
                  </p>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-8 space-y-3">
                    <div className="flex items-center gap-2.5 text-[#3666ff] font-semibold text-xs uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Encrypted & Verification-Ready</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Your tax and bank details are processed securely and shared only with verified enterprise buyers on the FactWise platform.
                    </p>
                  </div>

                  <ul className="space-y-6">
                    {[
                      { icon: <Building2 size={18} />, title: 'Tax & GST Verification', desc: 'Ensure fast invoicing and automated GST compliance for purchase orders.' },
                      { icon: <CreditCard size={18} />, title: 'Direct Payment Routing', desc: 'Secure bank account linking for seamless settlement of approved invoices.' },
                      { icon: <FileSpreadsheet size={18} />, title: 'Instant Excel & Catalogue', desc: 'Download templates, work offline, and drag-and-drop back with zero manual entry.' },
                      { icon: <Cpu size={18} />, title: 'AI Auto-Response', desc: 'Store pricing repositories and let AI automatically quote incoming RFQs.' },
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start group">
                        <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#3666ff] shrink-0 transition-colors group-hover:border-[#3666ff]/50 mt-1">
                          {item.icon}
                        </div>
                        <div className="group-hover:translate-x-1 transition-transform duration-300">
                          <h4 className="text-slate-900 font-medium text-sm mb-1">{item.title}</h4>
                          <p className="text-slate-500 font-light text-xs leading-relaxed">{item.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Panel Form */}
              <div className="flex-[1.1] p-8 lg:p-12 bg-slate-50/50 flex flex-col justify-center overflow-y-auto">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">Vendor Information</h3>
                  <p className="text-slate-500 text-sm font-light">Fill in your tax and banking credentials below.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Basic Pre-filled Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                        Contact Person *
                      </label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm"
                        placeholder="Jane Smith"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                        Company Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm"
                        placeholder="e.g. Global Industries"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                      Work Email *
                    </label>
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm"
                      placeholder="jane@company.com"
                    />
                  </div>

                  <hr className="border-slate-200/60 my-2" />

                  {/* Tax Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                        GSTIN Number *
                      </label>
                      <input
                        required
                        maxLength={15}
                        type="text"
                        value={gstin}
                        onChange={e => setGstin(e.target.value.toUpperCase())}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm uppercase font-mono tracking-wider"
                        placeholder="27AAAAA0000A1Z5"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                        PAN Number *
                      </label>
                      <input
                        required
                        maxLength={10}
                        type="text"
                        value={pan}
                        onChange={e => setPan(e.target.value.toUpperCase())}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm uppercase font-mono tracking-wider"
                        placeholder="ABCDE1234F"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                      Primary Product / Service Category *
                    </label>
                    <CustomDropdown
                      required
                      options={categoryOptions}
                      value={category}
                      onChange={setCategory}
                      placeholder="Select category..."
                    />
                  </div>

                  <hr className="border-slate-200/60 my-2" />

                  {/* Banking Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                        Bank Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={bankName}
                        onChange={e => setBankName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm"
                        placeholder="HDFC Bank"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                        Account No. *
                      </label>
                      <input
                        required
                        type="text"
                        value={accountNumber}
                        onChange={e => setAccountNumber(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm font-mono"
                        placeholder="50100234567890"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-1">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                        IFSC Code *
                      </label>
                      <input
                        required
                        maxLength={11}
                        type="text"
                        value={ifscCode}
                        onChange={e => setIfscCode(e.target.value.toUpperCase())}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm uppercase font-mono"
                        placeholder="HDFC0001234"
                      />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                      Registered Business Address *
                    </label>
                    <input
                      required
                      type="text"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm"
                      placeholder="Plot No. 42, Industrial Area Phase 1"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">City *</label>
                      <input
                        required
                        type="text"
                        value={city}
                        onChange={e => setCity(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm"
                        placeholder="Mumbai"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">State *</label>
                      <input
                        required
                        type="text"
                        value={state}
                        onChange={e => setState(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm"
                        placeholder="Maharashtra"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Pincode *</label>
                      <input
                        required
                        type="text"
                        value={pincode}
                        onChange={e => setPincode(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm font-mono"
                        placeholder="400001"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    {error && (
                      <p className="mb-3 text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
                        {error}
                      </p>
                    )}
                    <button
                      disabled={loading}
                      type="submit"
                      className="w-full py-3.5 bg-[#3666ff] text-white rounded-lg font-bold shadow-[0_0_20px_rgba(54,102,255,0.2)] hover:bg-[#3666ff]/90 hover:scale-[1.01] hover:shadow-lg hover:shadow-[#3666ff]/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 text-sm"
                    >
                      {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Submit Onboarding Details'}
                    </button>
                    <p className="text-center text-slate-500 text-[9px] mt-4 font-medium uppercase tracking-wider">
                      Secure Verification &bull; FactWise Supplier Platform
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            /* Success State */
            <motion.div
              key="success-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{ width: '100%', maxWidth: '32rem' }}
              className="mx-auto text-center p-12 rounded-3xl bg-white border border-slate-200 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#3666ff]/20 blur-[80px] rounded-full" />
              <div className="w-20 h-20 bg-[#3666ff] rounded-full flex items-center justify-center mx-auto mb-8 relative z-10 shadow-[0_0_50px_rgba(54,102,255,0.3)]">
                <CheckCircle2 size={40} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2 relative z-10 text-slate-900 tracking-tight">
                Details Submitted!
              </h1>
              <p className="text-slate-500 mb-8 relative z-10 leading-relaxed text-sm">
                Thank you, <strong className="text-slate-800">{name}</strong>. We have received the tax and banking details for <strong className="text-slate-800">{company}</strong>. Our team will complete verification within 1-2 business days.
              </p>
              <div className="relative z-10">
                <button
                  onClick={() => router.push('/supplier')}
                  className="inline-flex items-center gap-2 bg-[#3666ff] text-white text-sm font-bold px-8 py-3.5 rounded-xl hover:bg-[#3666ff]/90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-[0_0_20px_rgba(54,102,255,0.3)]"
                >
                  Return to Suppliers →
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
