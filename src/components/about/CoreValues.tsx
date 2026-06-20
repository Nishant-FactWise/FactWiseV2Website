'use client';

import React, { useRef } from 'react';
import { Sparkles, Target, ShieldCheck, Handshake, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VALUES = [
  {
    title: "Customer First, Always",
    description: "Always aim to create positive impact for organizations and bring sheer delight for each user, big or small",
    icon: Sparkles,
  },
  {
    title: "Strive for Excellence",
    description: "Constantly raise the bar for yourself and others with big picture thinking and nuanced, robust execution",
    icon: Target,
  },
  {
    title: "Never Settle",
    description: "Aspire to deliver extraordinary results while always maintaining accountability and integrity",
    icon: ShieldCheck,
  },
  {
    title: "Always Think Win-Win",
    description: "Challenge yourself to create win-win solutions for all stakeholders in all situations",
    icon: Handshake,
  }
];

export const CoreValues = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".value-card");
    const spacer = 24; // Offset between stacked cards
    const minScale = 0.85;
    
    // Scale distributor to make earlier cards look smaller as they stack
    const distributor = gsap.utils.distribute({ base: minScale, amount: 0.15 });

    cards.forEach((card: any, index: number) => {
      const scaleVal = distributor(index, cards[index], cards);
      
      // Animation for the individual card scaling as it reaches the top
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: `top 80px`,
          scrub: true,
          invalidateOnRefresh: true
        },
        ease: "none",
        scale: scaleVal,
        transformOrigin: "top center"
      });

      // Pinning logic for each card
      ScrollTrigger.create({
        trigger: card,
        // The start offset ensures cards stack with a visible gap
        start: `top-=${index * spacer + 80} top`,
        endTrigger: '.cards-container',
        // End when the entire container has finished scrolling past
        end: `bottom top+=${400 + (cards.length * spacer)}`, // Adjusted 400 for card height
        pin: true,
        pinSpacing: false,
        id: `pin-${index}`,
        invalidateOnRefresh: true,
      });
    });

    // Keep the heading pinned throughout the sequence
    ScrollTrigger.create({
      trigger: ".heading-column",
      start: "top 80px",
      endTrigger: ".cards-container",
      end: "bottom bottom",
      pin: true,
      pinSpacing: false,
      invalidateOnRefresh: true,
    });

  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="bg-stone-50 py-24 px-6 md:px-14 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 xl:gap-24 relative">
          
          {/* Left Side: Sticky Heading */}
          <div className="heading-column h-fit pb-24">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-50 text-[#3666ff] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              Core Values
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 leading-[1.05] tracking-tighter mb-8">
              The values that <br />
              <span className="text-[#3666ff] font-instrument italic font-medium italic">ship with</span> every line of code.
            </h2>
            <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-lg">
              Four principles, written on the wall, used in every product review, 
              every hire, every pricing call.
            </p>
          </div>

          {/* Right Side: Stacking Cards */}
          <div className="cards-container space-y-[40vh] pt-[15vh] pb-[60vh]">
            {VALUES.map((value, index) => (
              <div 
                key={index} 
                className="value-card-wrapper w-full"
              >
                <div className="value-card w-full h-auto bg-white rounded-[32px] p-10 border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col justify-between group transition-shadow duration-300">
                  <div>
                    <div className="flex items-start justify-between gap-6 mb-10">
                      <div className="size-16 rounded-2xl bg-blue-50 flex items-center justify-center text-[#3666ff] group-hover:bg-[#3666ff] group-hover:text-white transition-colors duration-500">
                        <value.icon className="size-8" />
                      </div>
                      <span className="text-6xl font-black text-slate-100 group-hover:text-blue-50 transition-colors duration-500">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-3xl font-bold text-slate-900 mb-6 tracking-tight">
                      {value.title}
                    </h3>
                    <p className="text-slate-600 text-lg leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                  
                  <div className="pt-8 mt-8 border-t border-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="flex items-center text-[#3666ff] font-bold tracking-tight text-sm uppercase">
                      Learn more about our impact <ChevronRight className="ml-2 size-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
