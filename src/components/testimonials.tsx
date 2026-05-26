import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from './ui/ScrollReveal';

const testimonials = [
    {
        id: 'syrma-sgs',
        name: "Kapil Maini",
        role: "Chief Procurement Officer",
        company: "Syrma SGS",
        content: "Factwise has significantly improved procurement digitalization and automated quotation processes, enabling faster workflows, enhanced transparency, and data-driven decision-making. We like the platform's efficiency, seamless integration, and actionable insights.",
        color: "bg-blue-100 text-blue-700",
        logo: "/image.png"
    },
    {
        id: 'fortune-50-vp',
        name: "VP of Procurement",
        role: "Fortune 50 Company",
        company: "Global Enterprise",
        content: "The Factwise app is a great consolidation of features that provides the ability to send RFx's, assess pricing, allocation, PO & AP processing, etc. all in one app. It's an extremely efficient way to manage the materials buying process.",
        color: "bg-purple-100 text-purple-700",
        logo: null
    },
    {
        id: 'spark-minda',
        name: "Sunil Kumar Injeti",
        role: "Vice President",
        company: "Spark Minda",
        content: "Factwise streamlines sourcing processes by automating non-value-adding activities, boosting efficiency and productivity. Their customizable GUI and dashboards empower users with tailored insights for smarter decision-making.",
        color: "bg-green-100 text-green-700",
        logo: "/sparkminda.png"
    },
    {
        id: 'driplex',
        name: "Vivek Mehta",
        role: "CEO",
        company: "Driplex",
        content: "Our manufacturing company uses the traditional standard ERP system. With Factwise integrating with our ERP, our purchasing has become informed, organized, and effortless. The intuitive and sleek UI was a standout feature.",
        color: "bg-orange-100 text-orange-700",
        logo: "/driplex.png"
    },
    {
        id: 'gem-corp',
        name: "Kinjal Shah",
        role: "CEO",
        company: "Gem Corp",
        content: "FactWise excels in analytics — their AI innovation transforms analysis into a user-friendly experience. Breaking free from old formats, we've minimized Excel dependency, witnessing a data-driven revolution.",
        color: "bg-pink-100 text-pink-700",
        logo: "/GemCorpochem.png"
    },
    {
        id: 'prasol',
        name: "Pankil Dharia",
        role: "Co-owner",
        company: "Prasol",
        content: "FactWise has enabled us to make data-driven decisions in procurement. This has increased the efficiency and compliance in the team and more importantly led to cost savings which is extremely important.",
        color: "bg-cyan-100 text-cyan-700",
        logo: "/image copy.png"
    },
    {
        id: 'bpt',
        name: "Avaneesh Krishna",
        role: "Enterprise IT Strategies, BPT",
        company: "Bridgepointe",
        content: "FactWise streamlined our quoting process, replacing manual tasks with efficient vendor and client interactions. Customizable and adaptable, it tailored to our complex workflow perfectly.",
        color: "bg-yellow-100 text-yellow-700",
        logo: "/Bridgepointe.png"
    },
    {
        id: 'fortune-50-sr-dir',
        name: "Sr. Director of Procurement",
        role: "Fortune 50 Company",
        company: "Global Enterprise",
        content: "FactWise has done a great job at understanding the users. The thoughtfulness in the way it is created is impressive. Even the smallest details have been thought of to make sure the user experience is excellent.",
        color: "bg-teal-100 text-teal-700",
        logo: null
    },
    {
        id: 'amkette',
        name: "Varun Bapna",
        role: "Co-owner",
        company: "Amkette",
        content: "Amkette sought an automated solution for their complex sourcing operation, focusing on procurement and vendor analytics. Initially designed for manufacturing, Factwise adapted swiftly.",
        color: "bg-indigo-100 text-indigo-700",
        logo: "/Amkette.png"
    }
];

export default function Testimonials() {
    const [showMore, setShowMore] = useState(false);

    const toggleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <section
            className="relative py-12 px-4 md:px-10"
            id="testimonials"
            style={{ scrollMarginTop: '100px' }}
        >
            <div className="relative overflow-hidden rounded-[24px] py-24" style={{ backgroundImage: "url('/TexturedGradient.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                {/* Blue Glow on Right - Optimized */}
                <div 
                  className="absolute -right-32 -bottom-32 w-[800px] h-[800px] rounded-full pointer-events-none opacity-50"
                  style={{ 
                    background: 'radial-gradient(circle, rgba(54, 102, 255, 0.2) 0%, rgba(54, 102, 255, 0.1) 40%, transparent 80%)',
                  }} 
                />
                <div className="absolute inset-0 noise opacity-20 pointer-events-none mix-blend-overlay" />

                <div className="relative z-10 mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-3xl text-center mb-12">
                    <ScrollReveal delay={0.1}>
                        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#4A6FFF] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                            Testimonials
                        </div>
                    </ScrollReveal>

                    <ScrollReveal>
                        <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-[#1A1D2E] mb-6 leading-[1.1]">
                            Trusted by the <span className="text-[#3666ff]">Best in the Business.</span>
                        </h2>
                    </ScrollReveal>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-80px' }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto font-medium"
                    >
                        Join hundreds of high-performing procurement teams already using FactWise to automate and scale.
                    </motion.p>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Bento Grid — single column on phones (3 cards before View More),
                        2 cols on tablet, 4-col bento on desktop. */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 items-stretch p-2 md:p-4 overflow-visible">
                        {testimonials.slice(0, 6).map((t, i) => {
                            const isLarge = i === 0 || i === 5;
                            // On phones only the first 3 cards show until "View More".
                            const hideOnMobile = i >= 3 && !showMore;

                            return (
                                <Card
                                    key={t.id}
                                    className={`${isLarge ? "md:col-span-2" : "md:col-span-1"} ${hideOnMobile ? "max-sm:hidden" : ""} h-full border-slate-100 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(74,111,255,0.25)] hover:border-[#4A6FFF]/30 transition-all duration-500 hover:-translate-y-1 group relative overflow-visible rounded-xl flex flex-col`}
                                >
                                    <CardContent className="flex flex-col gap-3 p-4 pt-5 relative z-10 flex-grow">
                                        {/* Top Section: Quote (Left) & Logo (Right) */}
                                        <div className="flex items-start justify-between mb-1">
                                            <div className="text-[#3666ff] transition-colors duration-500">
                                                <svg width="24" height="24" viewBox="0 0 448 512" fill="currentColor">
                                                    <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V216z"/>
                                                </svg>
                                            </div>
                                            {t.logo && (
                                                <div className="h-10 w-32 flex items-center justify-end logo-container ml-auto">
                                                    <img 
                                                        src={t.logo} 
                                                        alt={`${t.company} logo`} 
                                                        className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-500"
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.style.display = 'none';
                                                            const parent = target.parentElement;
                                                            if (parent) {
                                                                const fallback = document.createElement('span');
                                                                fallback.className = 'text-[12px] font-black tracking-tighter text-[#1A1D2E] opacity-50';
                                                                fallback.innerText = t.company;
                                                                parent.appendChild(fallback);
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-1 relative z-10 flex-grow">
                                            <p
                                                className={`${isLarge ? "text-base md:text-lg" : "text-xs md:text-sm"} font-medium leading-relaxed tracking-tight text-[#1A1D2E]`}
                                                style={{ fontFamily: 'var(--font-inter)' }}
                                            >
                                                “{t.content}
                                            </p>
                                        </div>
                                        <div className="flex items-center mt-auto pt-3 border-t border-slate-50 relative z-10">
                                            <div className="flex items-center gap-3">
                                                <Avatar className={`${isLarge ? "size-12" : "size-10"} rounded-xl border border-slate-100 ring-2 ring-white shadow-sm transition-all group-hover:ring-blue-50`}>
                                                    <AvatarFallback className={`${t.color} font-bold rounded-xl`}>
                                                        <span className={isLarge ? "text-sm" : "text-xs"}>{t.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <cite
                                                        className="text-sm font-bold not-italic text-[#1A1D2E] group-hover:text-[#4A6FFF] transition-colors block leading-none mb-1"
                                                        style={{ fontFamily: 'var(--font-display)' }}
                                                    >
                                                        {t.name}
                                                    </cite>
                                                    <span
                                                        className="block text-[10px] uppercase tracking-wider font-semibold text-[#7B82A8]"
                                                        style={{ fontFamily: 'var(--font-inter)' }}
                                                    >
                                                        {t.role}{t.company ? `, ${t.company}` : ''}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}

                        {/* Additional Cards - Reveal Below */}
                        <AnimatePresence>
                            {showMore && (
                                <>
                                    {testimonials.slice(6).map((t, i) => {
                                        const isLarge = i === 1; // Global index 7
                                        
                                        return (
                                            <motion.div
                                                key={t.id}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                transition={{ delay: i * 0.1 }}
                                                className={`${isLarge ? "md:col-span-2" : "md:col-span-1"} overflow-visible`}
                                            >
                                                <Card className="h-full border-slate-200 bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(74,111,255,0.25)] hover:border-[#4A6FFF]/30 transition-all duration-500 hover:-translate-y-1 group relative overflow-visible rounded-xl flex flex-col">
                                                    <CardContent className="flex flex-col gap-3 p-4 pt-5 relative z-10 flex-grow">
                                                        {/* Top Section: Quote (Left) & Logo (Right) */}
                                                        <div className="flex items-start justify-between mb-1">
                                                            <div className="text-[#3666ff] transition-colors duration-500">
                                                                <svg width="24" height="24" viewBox="0 0 448 512" fill="currentColor">
                                                                    <path d="M0 216C0 149.7 53.7 96 120 96h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V216zm256 0c0-66.3 53.7-120 120-120h8c17.7 0 32 14.3 32 32s-14.3 32-32 32h-8c-30.9 0-56 25.1-56 56v8h64c35.3 0 64 28.7 64 64v64c0 35.3-28.7 64-64 64H320c-35.3 0-64-28.7-64-64V216z"/>
                                                                </svg>
                                                            </div>
                                                            {t.logo && (
                                                                <div className="h-10 w-32 flex items-center justify-end logo-container ml-auto">
                                                                    <img 
                                                                        src={t.logo} 
                                                                        alt={`${t.company} logo`} 
                                                                        className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-all duration-500"
                                                                        onError={(e) => {
                                                                            const target = e.target as HTMLImageElement;
                                                                            target.style.display = 'none';
                                                                            const parent = target.parentElement;
                                                                            if (parent) {
                                                                                const fallback = document.createElement('span');
                                                                                fallback.className = 'text-[12px] font-black tracking-tighter text-[#1A1D2E] opacity-50';
                                                                                fallback.innerText = t.company;
                                                                                parent.appendChild(fallback);
                                                                            }
                                                                        }}
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="space-y-2 relative z-10 flex-grow">
                                                            <p
                                                                className={`${isLarge ? "text-base md:text-lg" : "text-xs md:text-sm"} font-medium leading-relaxed tracking-tight text-[#1A1D2E]`}
                                                                style={{ fontFamily: 'var(--font-inter)' }}
                                                            >
                                                                “{t.content}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center mt-auto pt-4 border-t border-slate-50 relative z-10">
                                                            <div className="flex items-center gap-3">
                                                                <Avatar className={`${isLarge ? "size-12" : "size-10"} rounded-xl border border-slate-100 ring-2 ring-white shadow-sm transition-all group-hover:ring-blue-50`}>
                                                                    <AvatarFallback className={`${t.color} font-bold rounded-xl`}>
                                                                        <span className={isLarge ? "text-sm" : "text-xs"}>{t.name.split(' ').map(n => n[0]).join('').toUpperCase()}</span>
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <div>
                                                                    <cite
                                                                        className="text-sm font-bold not-italic text-[#1A1D2E] group-hover:text-[#4A6FFF] transition-colors block leading-none mb-1"
                                                                        style={{ fontFamily: 'var(--font-display)' }}
                                                                    >
                                                                        {t.name}
                                                                    </cite>
                                                                    <span
                                                                        className="block text-[10px] uppercase tracking-wider font-semibold text-[#7B82A8]"
                                                                        style={{ fontFamily: 'var(--font-inter)' }}
                                                                    >
                                                                        {t.role}{t.company ? `, ${t.company}` : ''}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            </motion.div>
                                        );
                                    })}
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <button
                        onClick={toggleShowMore}
                        className="slide-button"
                        style={{ '--clr': '#4A6FFF' } as React.CSSProperties}
                    >
                        <span>{showMore ? "Show Less" : "View More"}</span>
                        <div className="slide-button__icon-wrapper">
                            {showMore ? (
                                <>
                                    <ChevronUp size={16} className="slide-button__icon-svg" />
                                    <ChevronUp size={16} className="slide-button__icon-svg--copy" />
                                </>
                            ) : (
                                <>
                                    <ChevronDown size={16} className="slide-button__icon-svg" />
                                    <ChevronDown size={16} className="slide-button__icon-svg--copy" />
                                </>
                            )}
                        </div>
                    </button>
                </div>
                </div>
            </div>
        </section>
    );
}