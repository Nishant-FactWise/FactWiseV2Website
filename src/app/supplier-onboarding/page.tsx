'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ArrowLeft, Loader2, Cpu, Globe, Search, ChevronDown, Check, Mail, FileSpreadsheet, Server, Laptop, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

/* ── Custom Dropdown ─────────────────────────────────────────────────────── */
interface DropdownProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
}

function Dropdown({ options, value, onChange, placeholder = 'Select...', required }: DropdownProps) {
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
            className="absolute z-50 mt-1.5 w-full bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden py-1 max-h-56 overflow-y-auto"
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

/* ── Page Component ──────────────────────────────────────────────────────── */
type Step = 'options' | 'form' | 'otp' | 'success';

export default function SupplierOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('options');
  const [selectedIntegration, setSelectedIntegration] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [teamSize, setTeamSize] = useState('');
  const [role, setRole] = useState('');
  
  // Basic info & Customer tag states
  const [pendingEmail, setPendingEmail] = useState('');
  const [pendingName, setPendingName] = useState('');
  const [pendingPayload, setPendingPayload] = useState<Record<string, string>>({});
  const [customers, setCustomers] = useState<string[]>([]);
  const [currentCustomerInput, setCurrentCustomerInput] = useState('');
  
  // OTP states
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendCooldown, setResendCooldown] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const addCustomerTag = () => {
    const trimmed = currentCustomerInput.trim().replace(/^,+|,+$/g, '');
    if (trimmed && !customers.includes(trimmed)) {
      setCustomers(prev => [...prev, trimmed]);
      setCurrentCustomerInput('');
    }
  };

  const handleCustomerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addCustomerTag();
    } else if (e.key === 'Backspace' && !currentCustomerInput && customers.length > 0) {
      setCustomers(prev => prev.slice(0, -1));
    }
  };

  const removeCustomerTag = (index: number) => {
    setCustomers(prev => prev.filter((_, i) => i !== index));
  };

  // Resend cooldown ticker
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setTimeout(() => setResendCooldown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [resendCooldown]);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const finalCustomers = [...customers];
    const pendingTag = currentCustomerInput.trim().replace(/^,+|,+$/g, '');
    if (pendingTag && !finalCustomers.includes(pendingTag)) {
      finalCustomers.push(pendingTag);
      setCustomers(finalCustomers);
      setCurrentCustomerInput('');
    }

    if (finalCustomers.length === 0) {
      setError('Please enter at least one customer working with FactWise and press Enter.');
      return;
    }

    setLoading(true);

    const fd = new FormData(formRef.current!);
    const payload = {
      name: fd.get('name') as string,
      businessName: fd.get('company') as string,
      email: fd.get('email') as string,
      factwiseRegisteredEmail: fd.get('factwiseRegisteredEmail') as string,
      phone: fd.get('phone') as string,
      teamSize: '',
      role: '',
      gstin: fd.get('gstin') as string,
      customerName: finalCustomers.join(', '),
      address: fd.get('address') as string,
      integrationMode: selectedIntegration,
    };

    try {
      const res = await fetch('/api/supplier/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Something went wrong.');
      }
      setPendingEmail(payload.email);
      setPendingName(payload.name);
      setPendingPayload(payload as Record<string, string>);
      setResendCooldown(30);
      setStep('otp');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[idx] = val.slice(-1);
    setOtp(next);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (text.length === 6) {
      setOtp(text.split(''));
      otpRefs.current[5]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter the 6-digit code.'); return; }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/supplier/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: pendingEmail, otp: code }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? 'Verification failed.');
      }
      setStep('success');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/supplier/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pendingPayload),
      });
      if (!res.ok) { const d = await res.json(); throw new Error(d.error); }
      setOtp(['', '', '', '', '', '']);
      setResendCooldown(30);
      otpRefs.current[0]?.focus();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to resend code.');
    } finally {
      setLoading(false);
    }
  };

  const teamSizeOptions = [
    { value: '1-50', label: '1 – 50' },
    { value: '51-200', label: '51 – 200' },
    { value: '201-1000', label: '201 – 1,000' },
    { value: '1000+', label: '1,000+' },
  ];

  const roleOptions = [
    { value: 'sales', label: 'Sales / Account Management' },
    { value: 'operations', label: 'Operations' },
    { value: 'finance', label: 'Finance' },
    { value: 'executive', label: 'Executive' },
    { value: 'other', label: 'Other' },
  ];

  const integrationOptions = [
    { id: 'excel', icon: <FileSpreadsheet className="w-6 h-6" />, title: 'Excel / Offline', desc: 'Download templates, work offline, and upload back.' },
    { id: 'platform', icon: <Laptop className="w-6 h-6" />, title: 'Platform Dashboard', desc: 'Log in and manage quotes directly on FactWise.' },
    { id: 'api', icon: <Server className="w-6 h-6" />, title: 'API Integration', desc: 'Connect your ERP and respond automatically.' },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white flex flex-col relative overflow-y-auto font-sans">
      {/* Ambient Background */}
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

      {/* Header */}
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

      {/* Main Multi-Step Card */}
      <div className="relative z-10 flex-1 flex items-center justify-center p-6 py-6 lg:py-10 w-full mx-auto">
        <AnimatePresence mode="wait" initial={false}>
          {step === 'options' ? (
            /* STEP 1: Integration Options */
            <motion.div
              key="options"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ width: '100%', maxWidth: '64rem' }}
              className="flex flex-col lg:flex-row bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden"
            >
              {/* Left */}
              <div className="flex-1 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100 relative overflow-y-auto">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3666ff]/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px w-6 bg-[#3666ff]/80" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3666ff]/80">Supplier Network</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-4 text-slate-900 leading-[1.1]">
                    Get Started as <br />
                    <span className="text-[#3666ff]">a Supplier.</span>
                  </h1>
                  <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                    Join the FactWise Supplier Network to engage with buyers effortlessly. Choose your preferred way to respond — via our platform, Excel, or direct API integration.
                  </p>
                  <ul className="space-y-6">
                    {[
                      { icon: <FileSpreadsheet size={18} />, title: 'Instant Excel Upload', desc: 'Download templates, work offline, and drag-and-drop back with zero manual entry.' },
                      { icon: <Cpu size={18} />, title: 'AI Auto-Response', desc: 'Store your pricing repo and let AI automatically match and quote on incoming RFQs.' },
                      { icon: <Globe size={18} />, title: 'Zero Portal Friction', desc: 'No more juggling multiple buyer portals. Connect once and manage everything.' },
                      { icon: <Search size={18} />, title: 'Open API Access', desc: 'Pull data directly into your ERP and respond back with zero manual intervention.' },
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

              {/* Right */}
              <div className="flex-[1.1] p-8 lg:p-12 bg-slate-50/50 flex flex-col justify-center overflow-y-auto">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">How would you like to respond?</h3>
                  <p className="text-slate-500 text-sm font-light">Select your preferred integration method to proceed.</p>
                </div>

                <div className="space-y-4">
                  {integrationOptions.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setSelectedIntegration(opt.id)}
                      className={`w-full flex items-start gap-4 p-5 rounded-xl border text-left transition-all ${
                        selectedIntegration === opt.id
                          ? 'bg-white border-[#3666ff] ring-4 ring-[#3666ff]/10 shadow-sm'
                          : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${selectedIntegration === opt.id ? 'bg-[#3666ff]/10 text-[#3666ff]' : 'bg-slate-100 text-slate-500'}`}>
                        {opt.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-semibold mb-1 ${selectedIntegration === opt.id ? 'text-[#3666ff]' : 'text-slate-900'}`}>{opt.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{opt.desc}</p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-1 transition-colors ${
                        selectedIntegration === opt.id ? 'border-[#3666ff] bg-[#3666ff]' : 'border-slate-300'
                      }`}>
                        {selectedIntegration === opt.id && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-8 mt-auto">
                  <button
                    disabled={!selectedIntegration}
                    onClick={() => setStep('form')}
                    className="w-full py-3.5 bg-[#3666ff] text-white rounded-lg font-bold shadow-[0_0_20px_rgba(54,102,255,0.2)] hover:bg-[#3666ff]/90 hover:scale-[1.01] hover:shadow-lg hover:shadow-[#3666ff]/30 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50 text-sm"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </motion.div>
          ) : step === 'form' ? (
            /* STEP 2: Comprehensive Single Form */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ width: '100%', maxWidth: '64rem' }}
              className="flex flex-col lg:flex-row bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden"
            >
              {/* Left */}
              <div className="flex-1 p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-slate-100 relative">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#3666ff]/5 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <button onClick={() => setStep('options')} className="w-8 h-8 flex items-center justify-center rounded-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-500 transition-colors shadow-sm">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <div className="h-px w-6 bg-[#3666ff]/80" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#3666ff]/80">Supplier Network</span>
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight mb-4 text-slate-900 leading-[1.1]">
                    Get Started as <br />
                    <span className="text-[#3666ff]">a Supplier.</span>
                  </h1>
                  <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                    Join the FactWise Supplier Network to engage with buyers effortlessly. Choose your preferred way to respond — via our platform, Excel, or direct API integration.
                  </p>
                  <ul className="space-y-6">
                    {[
                      { icon: <FileSpreadsheet size={18} />, title: 'Instant Excel Upload', desc: 'Download templates, work offline, and drag-and-drop back with zero manual entry.' },
                      { icon: <Cpu size={18} />, title: 'AI Auto-Response', desc: 'Store your pricing repo and let AI automatically match and quote on incoming RFQs.' },
                      { icon: <Globe size={18} />, title: 'Zero Portal Friction', desc: 'No more juggling multiple buyer portals. Connect once and manage everything.' },
                      { icon: <Search size={18} />, title: 'Open API Access', desc: 'Pull data directly into your ERP and respond back with zero manual intervention.' },
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

              {/* Right Form */}
              <div className="flex-[1.1] p-6 lg:p-10 bg-slate-50/50 flex flex-col justify-center">
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-slate-900 mb-1">Create your profile</h3>
                  <p className="text-slate-500 text-sm font-light">Enter your details to register as a supplier.</p>
                </div>

                <form ref={formRef} onSubmit={handleSubmitForm} className="space-y-3.5">
                  {/* Name + Company */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Full Name *</label>
                      <input required name="name" type="text" className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm" placeholder="Jane Smith" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Company *</label>
                      <input required name="company" type="text" className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm" placeholder="e.g. Global Industries" />
                    </div>
                  </div>

                  {/* Contact / Work Email */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Contact / Work Email *</label>
                    <input required name="email" type="email" className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm" placeholder="jane@company.com" />
                  </div>

                  {/* Email registered with FactWise */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Email registered with FactWise *</label>
                    <input required name="factwiseRegisteredEmail" type="email" className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm" placeholder="Enter email registered with FactWise" />
                    <p className="text-[10px] text-slate-400 ml-1">Email address associated with your FactWise portal account</p>
                  </div>

                  {/* GST / Tax ID + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">GST / Tax ID *</label>
                      <input required name="gstin" type="text" className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm uppercase font-mono tracking-wider" placeholder="e.g. 27AAAAA0000A1Z5" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Phone (Optional)</label>
                      <div className="relative flex rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-sm focus-within:border-[#3666ff] focus-within:ring-4 focus-within:ring-[#3666ff]/10">
                        <select
                          defaultValue="+91"
                          className="bg-transparent pl-2 pr-5 py-2 text-slate-900 text-sm border-r border-slate-200 outline-none cursor-pointer rounded-l-lg appearance-none font-medium"
                          style={{
                            backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'right 3px center',
                            backgroundSize: '12px 12px',
                          }}
                        >
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+65">🇸🇬 +65</option>
                          <option value="+61">🇦🇺 +61</option>
                          <option value="+49">🇩🇪 +49</option>
                          <option value="+33">🇫🇷 +33</option>
                          <option value="+81">🇯🇵 +81</option>
                          <option value="+86">🇨🇳 +86</option>
                        </select>
                        <input name="phone" type="tel" className="flex-1 bg-transparent px-2.5 py-2 text-slate-900 focus:outline-none placeholder:text-slate-400 text-sm" placeholder="99999 99999" />
                      </div>
                    </div>
                  </div>

                  {/* Customer working with FactWise */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Customer working with FactWise *</label>
                    <div className="flex flex-wrap gap-1.5 p-2 bg-white border border-slate-200 rounded-lg min-h-[42px] focus-within:border-[#3666ff] focus-within:ring-4 focus-within:ring-[#3666ff]/10 hover:border-slate-300 transition-all shadow-sm">
                      {customers.map((c, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1 bg-[#3666ff]/10 text-[#3666ff] text-xs font-semibold px-2.5 py-1 rounded-md border border-[#3666ff]/20">
                          {c}
                          <button
                            type="button"
                            onClick={() => removeCustomerTag(idx)}
                            className="hover:text-red-500 transition-colors ml-0.5"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={currentCustomerInput}
                        onChange={e => setCurrentCustomerInput(e.target.value)}
                        onKeyDown={handleCustomerKeyDown}
                        onBlur={addCustomerTag}
                        placeholder={customers.length === 0 ? "Type buyer name and press Enter..." : "Type another & press Enter..."}
                        className="flex-1 min-w-[150px] bg-transparent text-slate-900 focus:outline-none text-sm placeholder:text-slate-400 px-1 py-0.5"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 ml-1">Type customer company name and press Enter to add</p>
                  </div>

                  {/* Company Legal Address */}
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500 ml-1">Company Legal Address *</label>
                    <textarea required name="address" rows={2} className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-slate-900 focus:outline-none focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10 hover:border-slate-300 transition-all placeholder:text-slate-400 text-sm shadow-sm resize-none" placeholder="Enter registered legal business address, city, state & pincode" />
                  </div>

                  {/* Submit */}
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
                      {loading ? <Loader2 className="animate-spin w-5 h-5" /> : 'Complete Registration'}
                    </button>
                    <p className="text-center text-slate-500 text-[9px] mt-4 font-medium uppercase tracking-wider">
                      Secure processing • No credit card required
                    </p>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : step === 'otp' ? (
            /* STEP 3: OTP Verification */
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{ width: '100%', maxWidth: '28rem' }}
              className="mx-auto text-center p-10 rounded-3xl bg-white border border-slate-200 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#3666ff]/10 blur-[80px] rounded-full pointer-events-none" />

              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#3666ff]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail size={28} className="text-[#3666ff]" />
                </div>

                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Check your email</h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-8">
                  We sent a 6-digit code to<br />
                  <span className="font-semibold text-slate-700">{pendingEmail}</span>
                </p>

                {/* OTP inputs */}
                <div className="flex gap-2.5 justify-center mb-6" onPaste={handleOtpPaste}>
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={el => { otpRefs.current[idx] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(idx, e.target.value)}
                      onKeyDown={e => handleOtpKeyDown(idx, e)}
                      className={`w-11 h-13 text-center text-xl font-bold border rounded-xl bg-white text-slate-900 outline-none transition-all
                        ${digit ? 'border-[#3666ff] ring-4 ring-[#3666ff]/10' : 'border-slate-200 hover:border-slate-300'}
                        focus:border-[#3666ff] focus:ring-4 focus:ring-[#3666ff]/10`}
                    />
                  ))}
                </div>

                {error && (
                  <p className="mb-4 text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-4 py-2.5">
                    {error}
                  </p>
                )}

                <button
                  onClick={handleVerifyOtp}
                  disabled={loading || otp.join('').length < 6}
                  className="w-full py-3.5 bg-[#3666ff] text-white rounded-xl font-bold shadow-[0_0_20px_rgba(54,102,255,0.2)] hover:bg-[#3666ff]/90 hover:scale-[1.01] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 text-sm mb-4"
                >
                  {loading ? <Loader2 className="animate-spin w-4 h-4" /> : 'Verify & Confirm'}
                </button>

                <div className="flex items-center justify-center gap-1 text-sm text-slate-500">
                  <span>Didn&apos;t receive it?</span>
                  {resendCooldown > 0 ? (
                    <span className="text-slate-400 font-medium">Resend in {resendCooldown}s</span>
                  ) : (
                    <button
                      onClick={handleResend}
                      disabled={loading}
                      className="text-[#3666ff] font-semibold hover:underline disabled:opacity-50"
                    >
                      Resend
                    </button>
                  )}
                </div>

                <button
                  onClick={() => { setStep('form'); setError(''); setOtp(['','','','','','']); }}
                  className="mt-4 flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 transition-colors mx-auto"
                >
                  <ArrowLeft size={12} /> Back to form
                </button>
              </div>
            </motion.div>
          ) : (
            /* STEP 4: Success Confirmation */
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ width: '100%', maxWidth: '28rem' }}
              className="mx-auto text-center p-12 rounded-3xl bg-white border border-slate-200 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#3666ff]/20 blur-[80px] rounded-full" />
              <div className="w-20 h-20 bg-[#3666ff] rounded-full flex items-center justify-center mx-auto mb-8 relative z-10 shadow-[0_0_50px_rgba(54,102,255,0.3)]">
                <CheckCircle2 size={40} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold mb-2 relative z-10 text-slate-900 tracking-tight">
                Welcome, {pendingName.split(' ')[0]}!
              </h1>
              <p className="text-slate-500 mb-10 relative z-10 leading-relaxed text-sm">
                You're all set. Our team will reach out shortly to finalise your supplier onboarding and {selectedIntegration === 'api' ? 'API setup' : 'platform access'}.
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
