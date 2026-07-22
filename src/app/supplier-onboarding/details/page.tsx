'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowLeft, Loader2, Building2, ShieldCheck, Mail, User, Briefcase, FileText } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function SupplierOnboardingDetailsForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');

  const [gstin, setGstin] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!gstin.trim()) {
      setError('Please enter your GST / Tax ID.');
      return;
    }
    if (!customerName.trim()) {
      setError('Please enter the customer / buyer you are working with on FactWise.');
      return;
    }
    if (!address.trim()) {
      setError('Please enter your Company Legal Address.');
      return;
    }

    setLoading(true);

    const payload = {
      name,
      company,
      email,
      gstin: gstin.toUpperCase().trim(),
      customerName: customerName.trim(),
      address: address.trim(),
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
                      Supplier Network
                    </span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-4 text-slate-900 leading-[1.1]">
                    Complete Your <br />
                    <span className="text-[#3666ff]">Vendor Details.</span>
                  </h1>
                  <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                    Please provide your tax ID, company legal address, and the customer you are engaging with on FactWise to complete your supplier profile.
                  </p>

                  <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-8 space-y-3">
                    <div className="flex items-center gap-2.5 text-[#3666ff] font-semibold text-xs uppercase tracking-wider">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verified Onboarding</span>
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      Your details will be reviewed by our onboarding team to activate your vendor account and streamline purchase orders with your buyer.
                    </p>
                  </div>

                  <ul className="space-y-5">
                    {[
                      { icon: <User size={18} />, title: 'Pre-filled Profile', desc: 'Your registered name and email are automatically linked.' },
                      { icon: <Building2 size={18} />, title: 'GST / Tax Identification', desc: 'Required for tax invoicing and legal vendor verification.' },
                      { icon: <Briefcase size={18} />, title: 'Customer Association', desc: 'Links your account to your buyer customer on FactWise.' },
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
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">Fill Your Details</h3>
                  <p className="text-slate-500 text-sm font-light">Please verify and fill the mandatory vendor details below.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Pre-filled Info: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <input
                          required
                          type="text"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm"
                          placeholder="Jane Smith"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                        User Email *
                      </label>
                      <div className="relative">
                        <input
                          required
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm"
                          placeholder="jane@company.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vendor Company */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                      Vendor Company *
                    </label>
                    <input
                      required
                      type="text"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm"
                      placeholder="e.g. Global Industries Ltd."
                    />
                  </div>

                  {/* GST / Tax ID */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                      GST / Tax ID *
                    </label>
                    <input
                      required
                      type="text"
                      value={gstin}
                      onChange={e => setGstin(e.target.value.toUpperCase())}
                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm uppercase font-mono tracking-wider"
                      placeholder="e.g. 27AAAAA0000A1Z5 or Tax ID"
                    />
                  </div>

                  {/* Customer working with FactWise */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                      Customer working with FactWise *
                    </label>
                    <input
                      required
                      type="text"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm"
                      placeholder="Enter customer / buyer company name"
                    />
                  </div>

                  {/* Company Legal Address */}
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">
                      Company Legal Address *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-lg px-4 py-2.5 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm resize-none"
                      placeholder="Enter registered legal business address, city, state & pincode"
                    />
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
                      {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Submit Profile Details'}
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
                Thank you, <strong className="text-slate-800">{name}</strong>. We have received the details for <strong className="text-slate-800">{company}</strong>. Our team will complete verification within 1-2 business days.
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

export default function SupplierOnboardingDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#3666ff]" />
        </div>
      }
    >
      <SupplierOnboardingDetailsForm />
    </Suspense>
  );
}
