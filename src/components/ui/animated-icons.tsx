'use client';

import React from 'react';
import { motion } from 'framer-motion';

// Helper for spring transitions
const springTransition = { type: 'spring' as const, stiffness: 260, damping: 20 };
const pathTransition = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

// ─── 1. AnimatedBotIcon (AI, Automation & Structured Intake) ───
export const AnimatedBotIcon = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="botGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3666ff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="orbGrad" x1="6" y1="6" x2="18" y2="18" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3666ff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Ambient AI field background glow */}
        <motion.circle
          cx="12"
          cy="12"
          r="9"
          fill="url(#orbGrad)"
          animate={isHovered ? { scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] } : { scale: 1, opacity: 0.5 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Rotating Outer Crescent Orbit */}
        <motion.path
          d="M 12,3 A 9,9 0 1,1 3,12"
          stroke="url(#botGrad)"
          strokeWidth="1.75"
          strokeLinecap="round"
          animate={isHovered ? { rotate: 360 } : { rotate: 0 }}
          transition={isHovered ? { duration: 4, repeat: Infinity, ease: 'linear' } : springTransition}
          style={{ originX: '12px', originY: '12px' }}
        />

        {/* Glowing Center AI Orb Core */}
        <motion.circle
          cx="12"
          cy="12"
          r="4.5"
          fill="url(#botGrad)"
          animate={isHovered ? { scale: [1, 1.25, 0.95, 1] } : { scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Dynamic floating data nodes */}
        <motion.circle
          cx="6"
          cy="6"
          r="1.5"
          fill="#8b5cf6"
          animate={isHovered ? { y: [-2, 2, -2], x: [1, -1, 1] } : { y: 0, x: 0 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="18"
          cy="18"
          r="1.5"
          fill="#3666ff"
          animate={isHovered ? { y: [2, -2, 2], x: [-1, 1, -1] } : { y: 0, x: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="18"
          cy="6"
          r="1"
          fill="#00b884"
          animate={isHovered ? { scale: [1, 1.6, 1] } : { scale: 1 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};

// ─── 2. AnimatedTrendingUpIcon (Savings, Volume & Growth Success) ───
export const AnimatedTrendingUpIcon = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3666ff" />
            <stop offset="100%" stopColor="#00b884" />
          </linearGradient>
          <linearGradient id="trendArea" x1="0" y1="24" x2="24" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3666ff" stopOpacity="0.0" />
            <stop offset="100%" stopColor="#00b884" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* Background Grid Lines */}
        <path d="M 3,21 L 21,21 M 3,15 L 21,15 M 3,9 L 21,9" stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" className="opacity-75" />

        {/* Shaded Area under the curve */}
        <motion.path
          d="M 3,21 L 3,18 L 8,13 L 13,16 L 21,7 L 21,21 Z"
          fill="url(#trendArea)"
          initial={{ opacity: 0 }}
          animate={isHovered ? { opacity: 1 } : { opacity: 0.4 }}
          transition={pathTransition}
        />

        {/* Main Growing Path */}
        <motion.path
          d="M 3,18 L 8,13 L 13,16 L 21,7"
          stroke="url(#trendGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0.4 }}
          animate={isHovered ? { pathLength: [0.4, 1, 0.4] } : { pathLength: 1 }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Glowing Head Node */}
        <motion.circle
          cx="21"
          cy="7"
          r="3"
          fill="#00b884"
          stroke="#white"
          strokeWidth="1"
          animate={isHovered ? { scale: [1, 1.4, 1], y: [-0.5, 0.5, -0.5] } : { scale: 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </svg>
    </div>
  );
};

// ─── 3. AnimatedZapIcon (Speed, Live Sync & Dynamic Performance) ───
export const AnimatedZapIcon = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="zapGrad" x1="13" y1="2" x2="11" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3666ff" />
            <stop offset="100%" stopColor="#0ea5e9" />
          </linearGradient>
          <filter id="zapGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Ambient background energy field */}
        <motion.circle
          cx="12"
          cy="12"
          r="8"
          fill="#3666ff"
          opacity={0.05}
          animate={isHovered ? { scale: [1, 1.3, 1], opacity: [0.05, 0.15, 0.05] } : { scale: 1, opacity: 0.05 }}
          transition={{ duration: 1.6, repeat: Infinity }}
        />

        {/* Double Lightning Bolt Layer */}
        <motion.g
          animate={isHovered ? {
            y: [-0.5, 0.5, -0.7, 0.5, 0],
            x: [0.3, -0.3, 0.5, -0.2, 0],
          } : {}}
          transition={{ duration: 0.4, repeat: Infinity, repeatType: 'mirror' }}
        >
          {/* Back shadow bolt */}
          <path
            d="M 13.5,2 L 5.5,13 L 12.5,13 L 10.5,22 L 18.5,11 L 11.5,11 Z"
            fill="#0ea5e9"
            opacity="0.25"
            transform="translate(-1, 1)"
          />
          {/* Main glowing bolt */}
          <path
            d="M 13.5,2 L 5.5,13 L 12.5,13 L 10.5,22 L 18.5,11 L 11.5,11 Z"
            fill="url(#zapGrad)"
            filter={isHovered ? 'url(#zapGlow)' : 'none'}
          />
        </motion.g>

        {/* High-frequency shockwave circle */}
        {isHovered && (
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            stroke="#3666ff"
            strokeWidth="1"
            initial={{ scale: 0.5, opacity: 0.8 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </svg>
    </div>
  );
};

// ─── 4. AnimatedSearchCheckIcon (Audit, Search & Vendor Matching) ───
export const AnimatedSearchCheckIcon = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="searchGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3666ff" />
            <stop offset="100%" stopColor="#00b884" />
          </linearGradient>
        </defs>

        {/* Dashboard Radar/Concentric ring */}
        <motion.circle
          cx="10"
          cy="10"
          r="8"
          stroke="#e2e8f0"
          strokeWidth="1"
          animate={isHovered ? { scale: [1, 1.12, 1] } : {}}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Magnifying glass lens */}
        <motion.circle
          cx="10"
          cy="10"
          r="6.5"
          stroke="url(#searchGrad)"
          strokeWidth="1.8"
          fill="white"
          animate={isHovered ? { scale: [1, 1.06, 1], x: [-0.5, 0.5, -0.5] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Magnifying handle */}
        <motion.path
          d="M 15,15 L 21,21"
          stroke="url(#searchGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={isHovered ? { x: [-0.5, 0.5, -0.5], y: [-0.5, 0.5, -0.5] } : {}}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Clean checkmark drawing itself */}
        <motion.path
          d="M 7,10 L 9,12 L 13,8"
          stroke="#00b884"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0.2 }}
          animate={isHovered ? { pathLength: [0.2, 1, 0.2] } : { pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </div>
  );
};

// ─── 5. AnimatedBrainCircuitIcon (AI Analytics & Landed Cost) ───
export const AnimatedBrainCircuitIcon = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="brainGrad" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3666ff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>

        {/* Interconnected circuit connector lines */}
        <path d="M 6,6 H 18 M 6,18 H 18 M 12,6 V 18" stroke="#e2e8f0" strokeWidth="1.2" className="opacity-80" />

        {/* Pulse transmission paths */}
        <motion.path
          d="M 6,6 L 12,12 L 18,18 M 6,18 L 12,12 L 18,6"
          stroke="url(#brainGrad)"
          strokeWidth="1"
          strokeDasharray="4 6"
          animate={isHovered ? { strokeDashoffset: -20 } : { strokeDashoffset: 0 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="opacity-60"
        />

        {/* Synapse nodes */}
        {[
          { cx: 6, cy: 6, c: '#3666ff' },
          { cx: 18, cy: 6, c: '#8b5cf6' },
          { cx: 12, cy: 12, c: '#3666ff' },
          { cx: 6, cy: 18, c: '#8b5cf6' },
          { cx: 18, cy: 18, c: '#00b884' }
        ].map((node, i) => (
          <motion.circle
            key={i}
            cx={node.cx}
            cy={node.cy}
            r="2.5"
            fill={node.c}
            stroke="white"
            strokeWidth="0.8"
            animate={isHovered ? {
              scale: [1, 1.4, 0.9, 1],
              fill: [node.c, '#3666ff', '#8b5cf6', node.c]
            } : { scale: 1 }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </svg>
    </div>
  );
};

// ─── 6. AnimatedLightbulbIcon (Intelligent Costing & dispatching POs) ───
export const AnimatedLightbulbIcon = ({ isHovered }: { isHovered: boolean }) => {
  return (
    <div className="relative w-8 h-8 flex items-center justify-center">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="lightGlow" cx="50%" cy="40%" r="50%" fx="50%" fy="40%">
            <stop offset="0%" stopColor="#3666ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#3666ff" stopOpacity="0.0" />
          </radialGradient>
        </defs>

        {/* Dynamic Ambient Bulb Glow */}
        <motion.circle
          cx="12"
          cy="11"
          r="8"
          fill="url(#lightGlow)"
          animate={isHovered ? { scale: [0.85, 1.15, 0.85], opacity: [0.5, 1, 0.5] } : { scale: 0.9, opacity: 0.3 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Filament processing node */}
        <motion.path
          d="M 9,12 Q 12,9 15,12"
          stroke="#3666ff"
          strokeWidth={1.8}
          strokeLinecap="round"
          fill="none"
          animate={isHovered ? { strokeWidth: [1.8, 2.5, 1.8], opacity: [0.6, 1, 0.6] } : { strokeWidth: 1.8, opacity: 1 }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />

        {/* Main modern bulb outline */}
        <path
          d="M 16.5,14.5 C 17.5,13.2 18,11.6 18,10 C 18,6.7 15.3,4 12,4 C 8.7,4 6,6.7 6,10 C 6,11.6 6.5,13.2 7.5,14.5 L 8.5,17 H 15.5 Z"
          stroke="#3666ff"
          strokeWidth="1.85"
          strokeLinejoin="round"
          fill="white"
          fillOpacity="0.05"
        />

        {/* Metal contact thread base */}
        <path d="M 9.5,17 C 9.5,17 9.5,19 12,19 C 14.5,19 14.5,17 14.5,17" stroke="#3666ff" strokeWidth="1.85" strokeLinecap="round" />
        <path d="M 10.5,19.5 C 10.5,19.5 10.5,21 12,21 C 13.5,21 13.5,19.5 13.5,19.5" stroke="#3666ff" strokeWidth="1.5" strokeLinecap="round" />

        {/* Floating Sparks/Ideas radiating out */}
        {[
          { x: 3.5, y: 5.5, d: 'M 5,7 L 3.5,5.5' },
          { x: 12, y: 1.5, d: 'M 12,3 V 1' },
          { x: 20.5, y: 5.5, d: 'M 19,7 L 20.5,5.5' }
        ].map((ray, idx) => (
          <motion.path
            key={idx}
            d={ray.d}
            stroke="#3666ff"
            strokeWidth="1.5"
            strokeLinecap="round"
            animate={isHovered ? { scale: [1, 1.35, 1], opacity: [0.4, 1, 0.4] } : { opacity: 0.3 }}
            transition={{ duration: 1, repeat: Infinity, delay: idx * 0.25 }}
            style={{ originX: '12px', originY: '11px' }}
          />
        ))}
      </svg>
    </div>
  );
};
