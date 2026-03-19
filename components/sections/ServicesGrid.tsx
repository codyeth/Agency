'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { SERVICES } from '@/lib/data'

export default function ServicesGrid() {
  return (
    <section className="py-28 px-12" style={{ background: '#EEF5FF' }}>
      <div className="max-w-[1160px] mx-auto">
        <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[1.2px]
          px-3.5 py-1.5 rounded-full mb-3.5"
          style={{ background: '#DBEAFE', color: '#1B6DEA' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#1B6DEA' }} />
          Dịch vụ của chúng tôi
        </div>
        <h2 className="font-black leading-[1.12] tracking-[-0.02em] mb-2"
          style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
          Mọi thứ bạn cần cho KOC campaign
        </h2>

        <motion.div
          className="grid grid-cols-3 gap-5 mt-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SERVICES.map((svc, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bg-white rounded-3xl p-8 border-2 border-transparent cursor-pointer
                transition-all duration-300"
              style={{ boxShadow: '0 2px 12px rgba(27,109,234,0.06)' }}
              whileHover={{
                borderColor: '#1B6DEA',
                boxShadow: '0 16px 48px rgba(27,109,234,0.18)',
                y: -4,
              }}
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-[27px] mb-5"
                style={{ background: svc.bg }}>
                {svc.icon}
              </div>
              <h3 className="text-[17px] font-black mb-2.5">{svc.title}</h3>
              <p className="text-[13px] leading-[1.65] mb-5" style={{ color: '#64748B' }}>{svc.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {svc.tags.map((tag) => (
                  <span key={tag}
                    className="px-2.5 py-1 rounded-full text-[11px] font-bold"
                    style={{ background: '#EEF5FF', color: '#1B6DEA' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
