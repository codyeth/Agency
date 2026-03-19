'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { TESTIMONIALS } from '@/lib/data'

export default function Testimonials() {
  return (
    <section className="py-28 px-12" style={{ background: '#EEF5FF' }}>
      <div className="max-w-[1160px] mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[1.2px]
            px-3.5 py-1.5 rounded-full mb-3.5"
            style={{ background: '#DBEAFE', color: '#1B6DEA' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#1B6DEA' }} />
            Khách hàng nói gì
          </div>
          <h2 className="font-black leading-[1.12] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
            Kết quả thực tế, không phóng đại
          </h2>
        </div>
        <motion.div
          className="grid grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bg-white rounded-3xl p-8 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(27,109,234,0.12)' }}
            >
              <div className="text-[15px] tracking-[2px] mb-4" style={{ color: '#F59E0B' }}>★★★★★</div>
              <p className="text-[14px] leading-[1.75] text-slate-800 mb-5 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full text-white font-black text-base
                  flex items-center justify-center flex-shrink-0"
                  style={{ background: t.gradient }}>
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-[14px] font-black">{t.name}</div>
                  <div className="text-[12px]" style={{ color: '#64748B' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
