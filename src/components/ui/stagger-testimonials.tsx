"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

export interface TestimonialItem {
  tempId: number;
  testimonial: string;
  by: string;
  role: string;
  initials: string;
}

interface TestimonialCardProps {
  position: number;
  testimonial: TestimonialItem;
  handleMove: (steps: number) => void;
  cardSize: number;
  compact: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
  compact,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        'absolute left-1/2 top-1/2 cursor-pointer border-2 transition-all duration-500 ease-in-out flex flex-col',
        isCenter
          ? 'z-10 border-[#3666ff] bg-[#3666ff]'
          : 'z-0 border-slate-200 bg-white hover:border-[#3666ff]/40 hover:shadow-xl'
      )}
      style={{
        width: cardSize,
        height: cardSize,
        padding: compact ? '22px 20px 20px' : '28px 28px 24px',
        clipPath: `polygon(${compact ? 28 : 40}px 0%, calc(100% - ${compact ? 28 : 40}px) 0%, 100% ${compact ? 28 : 40}px, 100% 100%, calc(100% - ${compact ? 28 : 40}px) 100%, ${compact ? 28 : 40}px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? (compact ? -38 : -65) : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? '0px 8px 0px 4px rgba(54,102,255,0.3)'
          : '0px 0px 0px 0px transparent',
      }}
    >
      {/* Corner cut decoration */}
      <span
        className="absolute block origin-top-right rotate-45"
        style={{
          right: -2,
          top: 38,
          width: SQRT_5000,
          height: 2,
          background: isCenter ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
        }}
      />

      {/* Avatar */}
      <div
        className="mb-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
        style={{
          background: isCenter
            ? 'rgba(255,255,255,0.25)'
            : 'linear-gradient(135deg, #3666ff, #6366f1)',
          boxShadow: isCenter ? '2px 2px 0px rgba(255,255,255,0.2)' : '2px 2px 0px rgba(0,0,0,0.2)',
        }}
      >
        {testimonial.initials}
      </div>

      {/* Quote — grows to fill space, clamps overflow */}
      <p
        className={cn(
          'flex-1 overflow-hidden text-justify text-[13px] leading-relaxed',
          isCenter ? 'text-white' : 'text-slate-700'
        )}
        style={{
          fontFamily: 'var(--font-inter)',
          display: '-webkit-box',
          WebkitLineClamp: 6,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </p>

      {/* Author — always at bottom, never overlaps */}
      <div className="mt-4 flex-shrink-0 border-t pt-3"
        style={{ borderColor: isCenter ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.07)' }}
      >
        <p
          className={cn('text-xs font-semibold', isCenter ? 'text-white' : 'text-slate-800')}
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {testimonial.by}
        </p>
        <p
          className={cn('mt-0.5 text-[11px]', isCenter ? 'text-white/70' : 'text-slate-400')}
          style={{ fontFamily: 'var(--font-inter)' }}
        >
          {testimonial.role}
        </p>
      </div>
    </div>
  );
};

interface StaggerTestimonialsProps {
  testimonials: TestimonialItem[];
}

export const StaggerTestimonials: React.FC<StaggerTestimonialsProps> = ({ testimonials }) => {
  const [cardSize, setCardSize] = useState(340);
  const [compact, setCompact] = useState(false);
  const [list, setList] = useState(testimonials);

  const handleMove = (steps: number) => {
    const newList = [...list];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const isCompact = !window.matchMedia('(min-width: 640px)').matches;
      setCompact(isCompact);
      setCardSize(isCompact ? Math.min(280, window.innerWidth - 56) : 340);
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height: compact ? cardSize + 150 : 560 }}>
      {list.map((item, index) => {
        const position =
          list.length % 2
            ? index - (list.length + 1) / 2
            : index - list.length / 2;
        return (
          <TestimonialCard
            key={item.tempId}
            testimonial={item}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
            compact={compact}
          />
        );
      })}

      {/* Nav buttons */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center border border-white/20 bg-white/5 text-white transition-all hover:bg-[#3666ff] hover:border-[#3666ff] focus-visible:outline-none"
          aria-label="Previous"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center border border-white/20 bg-white/5 text-white transition-all hover:bg-[#3666ff] hover:border-[#3666ff] focus-visible:outline-none"
          aria-label="Next"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
};
