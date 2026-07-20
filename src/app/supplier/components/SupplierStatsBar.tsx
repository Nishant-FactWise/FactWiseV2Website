'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Users, Clock } from 'lucide-react';

const stats = [
  {
    icon: Users,
    value: '6000+',
    label: 'Active Suppliers',
    color: '#3b82f6',
    bg: 'rgba(59,130,246,0.08)',
    border: 'rgba(59,130,246,0.18)',
  },
  {
    icon: Zap,
    value: '< 2 min',
    label: 'Avg. Quote Response',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.18)',
  },
  {
    icon: Clock,
    value: '3x',
    label: 'Faster Than Email',
    color: '#a78bfa',
    bg: 'rgba(167,139,250,0.08)',
    border: 'rgba(167,139,250,0.18)',
  },
];

export default function SupplierStatsBar() {
  return (
    <div
      style={{
        background: '#ffffff',
        borderBottom: '1px solid #e8edf3',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Rainbow top accent line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'linear-gradient(90deg, #4f8bff 0%, #10b981 33%, #f59e0b 66%, #a78bfa 100%)',
          opacity: 0.75,
        }}
      />

      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '0 24px',
        }}
      >
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 0 }}
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '28px 32px',
                  position: 'relative',
                }}
                className={i !== stats.length - 1 ? 'border-b md:border-b-0 md:border-r border-[#e8edf3]' : ''}
              >
                {/* Icon bubble */}
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: stat.bg,
                    border: `1px solid ${stat.border}`,
                    display: 'grid',
                    placeItems: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={20} color={stat.color} strokeWidth={2} />
                </div>

                {/* Text */}
                <div>
                  <div
                    style={{
                      fontSize: 'clamp(20px, 2vw, 28px)',
                      fontWeight: 800,
                      color: '#0f172a',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                      fontFamily: 'var(--font-display)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: '#64748b',
                      marginTop: 4,
                      fontWeight: 500,
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>

                {/* Per-tile bottom accent */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 40,
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
                    opacity: 0.45,
                    borderRadius: 2,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
