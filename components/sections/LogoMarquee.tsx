'use client'
import { motion } from 'framer-motion'
import { LOGOS } from '@/lib/data'

export default function LogoMarquee() {
  return (
    <section className="py-14 bg-white overflow-hidden">
      <p className="text-center text-[13px] font-bold uppercase tracking-[1px] mb-8"
        style={{ color: '#64748B' }}>
        Nhãn hàng đã tin dùng
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10
          bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10
          bg-gradient-to-l from-white to-transparent pointer-events-none" />
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
        >
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div key={i}
              className="px-9 py-4 text-[14px] font-bold border-r border-slate-100 whitespace-nowrap
                transition-colors cursor-default"
              style={{ color: '#94A3B8' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#1B6DEA')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#94A3B8')}
            >
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
