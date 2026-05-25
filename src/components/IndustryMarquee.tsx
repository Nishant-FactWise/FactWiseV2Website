'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { GLOBAL_LAYOUT } from './LayoutConfig';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, ArrowRight } from "lucide-react";

interface IndustryData {
    id: string | number;
    title: string;
    description: string;
    category: string;
    image: string;
    specialist: {
        name: string;
        avatar: string;
    };
    date: string;
    readTime: string;
}

const industriesRow1: IndustryData[] = [
    {
        id: 1,
        title: "Automotive Manufacturing",
        description: "Optimizing multi-tier supply chains and managing complex BOMs for global EV production and component sourcing.",
        category: "Manufacturing",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop",
        specialist: { name: "David Miller", avatar: "https://i.pravatar.cc/150?u=1" },
        date: "May 2024",
        readTime: "6 min"
    },
    {
        id: 2,
        title: "Pharmaceuticals",
        description: "Ensuring 100% compliance and cold-chain transparency for life-critical drug manufacturing and distribution.",
        category: "Health & Science",
        image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?q=80&w=1000&auto=format&fit=crop",
        specialist: { name: "Sarah Chen", avatar: "https://i.pravatar.cc/150?u=2" },
        date: "Apr 2024",
        readTime: "5 min"
    },
    {
        id: 3,
        title: "Fashion & Apparel",
        description: "Accelerating go-to-market cycles with automated vendor collaboration and sustainable material sourcing.",
        category: "Retail",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1000&auto=format&fit=crop",
        specialist: { name: "Elena Rossi", avatar: "https://i.pravatar.cc/150?u=3" },
        date: "Jun 2024",
        readTime: "4 min"
    },
    {
        id: 4,
        title: "Construction Materials",
        description: "Managing heavy logistics and commodity-linked pricing for large-scale infrastructure projects.",
        category: "Infrastructure",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop",
        specialist: { name: "Marc Thompson", avatar: "https://i.pravatar.cc/150?u=4" },
        date: "May 2024",
        readTime: "7 min"
    },
    {
        id: 5,
        title: "Electronics",
        description: "High-speed sourcing for rapidly evolving component markets and semiconductor shortages.",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
        specialist: { name: "Alex Wong", avatar: "https://i.pravatar.cc/150?u=5" },
        date: "Jul 2024",
        readTime: "5 min"
    },
];

const industriesRow2: IndustryData[] = [
    {
        id: 6,
        title: "Food & Beverage",
        description: "Maintaining freshness and quality through strict batch-level tracking and rapid RFQ cycles.",
        category: "Consumer Goods",
        image: "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=1000&auto=format&fit=crop",
        specialist: { name: "John Baker", avatar: "https://i.pravatar.cc/150?u=6" },
        date: "Jun 2024",
        readTime: "4 min"
    },
    {
        id: 7,
        title: "Industrial Machinery",
        description: "Coordinating procurement for complex capital equipment with thousands of unique parts.",
        category: "Heavy Industry",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop",
        specialist: { name: "Hans Weber", avatar: "https://i.pravatar.cc/150?u=7" },
        date: "Apr 2024",
        readTime: "8 min"
    },
    {
        id: 8,
        title: "Industrial Automation",
        description: "Sourcing for the next generation of smart factories and IoT-enabled production lines.",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?q=80&w=1000&auto=format&fit=crop",
        specialist: { name: "Lisa Park", avatar: "https://i.pravatar.cc/150?u=8" },
        date: "May 2024",
        readTime: "6 min"
    },
    {
        id: 9,
        title: "Logistics & Supply",
        description: "Optimizing 3PL partnerships and last-mile delivery networks with real-time analytics.",
        category: "Operations",
        image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=1000&auto=format&fit=crop",
        specialist: { name: "Tom Cruise", avatar: "https://i.pravatar.cc/150?u=9" },
        date: "Jun 2024",
        readTime: "5 min"
    },
    {
        id: 10,
        title: "Healthcare",
        description: "Strategic sourcing for hospital systems and medical equipment manufacturers.",
        category: "Medical",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1000&auto=format&fit=crop",
        specialist: { name: "Dr. Jane Smith", avatar: "https://i.pravatar.cc/150?u=10" },
        date: "May 2024",
        readTime: "6 min"
    },
];

export default function IndustryMarquee() {
    const [isPaused, setIsPaused] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);


    return (
        <section
            ref={sectionRef}
            className="relative w-full py-24 overflow-hidden bg-white border-y border-slate-50"
        >
            {/* Background Accents */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-50/50 via-transparent to-transparent pointer-events-none" />

            {/* Section heading */}
            <div
                style={{ position: 'relative', zIndex: 20, textAlign: 'center', marginBottom: 60, padding: '0 40px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                    <div className="section-badge" style={{ marginBottom: 0, fontWeight: 500, letterSpacing: '0.05em' }}>Industries We Serve</div>
                    <h2
                        style={{
                            fontFamily: 'var(--font-display), sans-serif',
                            fontSize: 'clamp(32px, 5vw, 54px)',
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            color: '#1A1D2E',
                            margin: 0,
                            lineHeight: 1.15
                        }}
                    >
                        Built for <span style={{ color: '#4A6FFF' }}>every industry.</span>
                    </h2>
                    <p
                        style={{
                            fontFamily: 'var(--font-inter), sans-serif',
                            fontSize: '18px',
                            fontWeight: 500,
                            color: '#7B82A8',
                            margin: 0,
                            lineHeight: 1.6,
                            maxWidth: '720px'
                        }}
                    >
                        From automotive to pharma, FactWise adapts to your sector&apos;s unique sourcing complexity.
                    </p>
                </div>
            </div>

            <div className="relative min-h-[500px] mt-10">
                <div className="flex flex-col gap-12">
                    {/* Row 1 — left → right */}
                    <div
                        style={{
                            display: 'flex',
                            width: 'max-content',
                            animation: 'marquee-fw 60s linear infinite',
                            animationPlayState: isPaused ? 'paused' : 'running',
                        }}
                    >
                        {[0, 1, 2].flatMap((copy) => industriesRow1.map((ind) => ({ ...ind, _id: `r1-${copy}-${ind.id}` }))).map((ind) => (
                            <IndustryCard
                                key={ind._id}
                                ind={ind}
                                isMarquee
                                onHover={setIsPaused}
                            />
                        ))}
                    </div>

                    {/* Row 2 — right → left */}
                    <div
                        style={{
                            display: 'flex',
                            width: 'max-content',
                            animation: 'marquee-fw-reverse 70s linear infinite',
                            animationPlayState: isPaused ? 'paused' : 'running',
                        }}
                    >
                        {[0, 1, 2].flatMap((copy) => industriesRow2.map((ind) => ({ ...ind, _id: `r2-${copy}-${ind.id}` }))).map((ind) => (
                            <IndustryCard
                                key={ind._id}
                                ind={ind}
                                isMarquee
                                onHover={setIsPaused}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function IndustryCard({ ind, isMarquee = false, onHover }: { ind: IndustryData, isMarquee?: boolean, onHover?: (val: boolean) => void }) {
    return (
        <motion.div
            className={isMarquee ? "w-[400px] shrink-0 mx-6" : "w-full"}
            onMouseEnter={() => onHover?.(true)}
            onMouseLeave={() => onHover?.(false)}
        >
            <div className="group relative h-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-500 hover:border-blue-500 hover:shadow-[0_15px_40px_rgba(74,111,255,0.1)]">
                {/* Image Section (Initially Full) */}
                <div className="absolute inset-0 z-0 transition-all duration-700 group-hover:h-24">
                    <img
                        src={ind.image}
                        alt={ind.title}
                        className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-0" />
                </div>

                {/* Floating Title (Initially Visible at Bottom) */}
                <div className="absolute bottom-6 left-6 right-6 z-10 transition-all duration-700 group-hover:opacity-0 group-hover:translate-y-10">
                    <Badge className="bg-blue-600 border-none text-white text-[9px] font-bold px-2.5 py-0.5 rounded-full mb-2">
                        {ind.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-white leading-tight tracking-tight">
                        {ind.title}
                    </h3>
                </div>

                {/* Detail Panel (Revealed on Hover - Slides from Bottom) */}
                <div className="absolute inset-x-0 bottom-0 z-20 bg-white p-6 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0 h-[calc(100%-6rem)] border-t border-slate-50 flex flex-col justify-start">
                    <div className="flex items-center justify-between mb-3">
                        <Badge className="bg-blue-50 text-blue-600 border-blue-100 text-[9px] font-bold px-2.5 py-0.5 rounded-full">
                            {ind.category}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <Clock className="size-3" />
                            <span className="text-[9px] font-bold uppercase tracking-tight">{ind.readTime}</span>
                        </div>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1.5 leading-tight">
                        {ind.title}
                    </h3>
                    <p className="text-slate-500 text-[12px] leading-relaxed line-clamp-3">
                        {ind.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
