'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { TESTIMONIALS } from '@/lib/data'

export default function Testimonials() {
  return (
    <section className="pt-[80px] pb-[125px] px-10" style={{ background: '#F9FAFB' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em]
            px-3.5 py-1.5 rounded-[64px] mb-3.5"
            style={{ background: '#E1F3FE', color: '#2463EB' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2463EB' }} />
            Khách hàng nói gì
          </div>
          <h2 className="font-medium leading-[1.2]"
            style={{ fontSize: '48px', color: '#111827' }}>
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
              className="bg-white rounded-[16px] p-8 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(36,99,235,0.12)' }}
            >
              <div className="text-[15px] tracking-[2px] mb-4" style={{ color: '#F59E0B' }}>★★★★★</div>
              <p className="text-base font-normal leading-[1.3] mb-5 italic" style={{ color: '#111827' }}>"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full text-white font-medium text-base
                  flex items-center justify-center flex-shrink-0"
                  style={{ background: t.gradient }}>
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-[14px] font-semibold" style={{ color: '#111827' }}>{t.name}</div>
                  <div className="text-[12px] font-normal" style={{ color: '#4B5563' }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
