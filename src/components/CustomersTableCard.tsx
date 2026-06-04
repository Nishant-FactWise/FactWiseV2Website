'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { MoreHorizontal, ArrowRight, User, TrendingUp, Clock, Zap } from 'lucide-react'

// Avatars from the original example
const MESCHAC_AVATAR = 'https://avatars.githubusercontent.com/u/47919550?v=4'
const BERNARD_AVATAR = 'https://avatars.githubusercontent.com/u/31113941?v=4'
const THEO_AVATAR = 'https://avatars.githubusercontent.com/u/68236786?v=4'
const GLODIE_AVATAR = 'https://avatars.githubusercontent.com/u/99137927?v=4'

export type Customer = {
  id: number | string
  date: string
  status: 'Paid' | 'Cancelled' | 'Ref'
  statusVariant: 'success' | 'danger' | 'warning'
  name: string
  avatar: string
  revenue: string
}

export type CustomersTableCardProps = {
  title?: string
  subtitle?: string
  className?: string
  customers?: Customer[]
  accentColor?: string
}

const DEFAULT_CUSTOMERS: Customer[] = [
  {
    id: 1,
    date: '10/31/2023',
    status: 'Paid',
    statusVariant: 'success',
    name: 'Bernard Ng',
    avatar: BERNARD_AVATAR,
    revenue: '₹43.99',
  },
  {
    id: 2,
    date: '10/21/2023',
    status: 'Ref',
    statusVariant: 'warning',
    name: 'Méschac Irung',
    avatar: MESCHAC_AVATAR,
    revenue: '₹19.99',
  },
  {
    id: 3,
    date: '10/15/2023',
    status: 'Paid',
    statusVariant: 'success',
    name: 'Glodie Ng',
    avatar: GLODIE_AVATAR,
    revenue: '₹99.99',
  },
  {
    id: 4,
    date: '10/12/2023',
    status: 'Cancelled',
    statusVariant: 'danger',
    name: 'Theo Ng',
    avatar: THEO_AVATAR,
    revenue: '₹19.99',
  },
]

const Badge = ({
  children,
  variant,
}: {
  children: React.ReactNode
  variant: 'success' | 'danger' | 'warning'
}) => {
  const styles =
    variant === 'success'
      ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
      : variant === 'danger'
        ? 'bg-rose-50 text-rose-600 border-rose-100'
        : 'bg-amber-50 text-amber-600 border-amber-100'

  return (
    <span className={cn('rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-wider border', styles)}>
      {children}
    </span>
  )
}

/**
 * High-fidelity Customers Table Card
 * Optimized with the "Implementation Roadmap" aesthetic:
 * - Top accent border
 * - Premium typography
 * - Soft-rounded card components
 * - Smooth entrance animations
 */
export default function CustomersTableCard({
  title = 'Customers',
  subtitle = 'Overview of recent transactions and revenue distribution.',
  customers = DEFAULT_CUSTOMERS,
  className,
  accentColor = '#4A6FFF',
}: CustomersTableCardProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        'group bg-white relative w-full overflow-hidden rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10',
        className
      )}
      aria-label={title}
    >
      {/* Top Accent Bar (Logical adaptation of Phase Card design) */}
      <div
        className="h-1.5 w-full transition-colors duration-500"
        style={{ backgroundColor: accentColor }}
      />

      {/* Header */}
      <div className="p-8 pb-4">
        <div className="flex items-center justify-between mb-8">
          {/* Mac-style Window Controls */}
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-slate-50 border border-slate-100 shadow-inner">
            <span className="size-1.5 rounded-full bg-rose-400" />
            <span className="size-1.5 rounded-full bg-amber-400" />
            <span className="size-1.5 rounded-full bg-emerald-400" />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-400">
              <Clock className="w-3 h-3" />
              Real-time
            </div>
            <button className="text-slate-300 hover:text-slate-600 transition-colors p-1">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Zap className="w-4 h-4 fill-blue-600/10" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-600">Revenue Analytics</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            {title}
          </h2>
          <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-md">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Table wrapper for responsive overflow */}
      <div className="overflow-x-auto p-6 pt-2">
        <table className="min-w-[600px] w-full border-separate border-spacing-y-2.5 text-sm">
          <thead>
            <tr className="text-slate-400 text-[10px] font-black uppercase tracking-widest *:px-4 *:py-3 *:text-left">
              <th className="w-12">#</th>
              <th>Customer Profile</th>
              <th>Status</th>
              <th>Date</th>
              <th className="text-right pr-4">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, idx) => (
              <tr
                key={customer.id}
                className="group/row hover:bg-slate-50/80 transition-all duration-300 *:px-4 *:py-3.5"
              >
                <td className="text-slate-300 font-black text-xs rounded-l-2xl border-y border-l border-transparent group-hover/row:border-slate-100 group-hover/row:text-slate-500 transition-colors">
                  {idx + 1}
                </td>
                <td className="border-y border-transparent group-hover/row:border-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="size-10 overflow-hidden rounded-xl bg-slate-50 border border-slate-100 ring-4 ring-transparent group-hover/row:ring-blue-50 transition-all duration-500">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover/row:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-slate-900 font-bold text-sm">{customer.name}</span>
                  </div>
                </td>
                <td className="border-y border-transparent group-hover/row:border-slate-100 transition-colors">
                  <Badge variant={customer.statusVariant}>{customer.status}</Badge>
                </td>
                <td className="border-y border-transparent group-hover/row:border-slate-100 text-slate-500 font-medium text-xs transition-colors">
                  {customer.date}
                </td>
                <td className="text-right pr-6 font-black text-slate-900 tabular-nums rounded-r-2xl border-y border-r border-transparent group-hover/row:border-slate-100 transition-colors">
                  {customer.revenue}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-slate-50 p-6 bg-slate-50/30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            {customers.length} Rows
          </div>
          <span className="w-1 h-1 rounded-full bg-slate-200" />
          <span className="text-slate-400 text-[10px] font-medium italic">Updated just now</span>
        </div>

        <button className="group/btn flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-blue-600 font-bold text-xs transition-all hover:border-blue-200 hover:bg-blue-50/50">
          Analytics Report
          <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.section>
  )
}
