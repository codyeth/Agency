'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { SERVICES } from '@/lib/data'

export default function ServicesGrid() {
  return (
    <section style={{ background: '#F9FAFB', paddingTop: '80px', paddingBottom: '125px', paddingLeft: '40px', paddingRight: '40px' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em]
          px-3.5 py-1.5 rounded-[64px] mb-3.5"
          style={{ background: '#E1F3FE', color: '#2463EB' }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2463EB' }} />
          Dịch vụ của chúng tôi
        </div>
        <h2 className="font-medium leading-[1.2] mb-2"
          style={{ fontSize: '48px', color: '#111827' }}>
          Mọi thứ bạn cần cho KOC campaign
        </h2>

        <motion.div
          className="grid grid-cols-3 gap-5 mt-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
        >
          {SERVICES.map((svc, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bg-white rounded-[16px] p-8 border-2 border-transparent cursor-pointer
                transition-all duration-300"
              style={{ boxShadow: '0 2px 12px rgba(36,99,235,0.06)' }}
              whileHover={{
                borderColor: '#2463EB',
                boxShadow: '0 16px 48px rgba(36,99,235,0.18)',
                y: -4,
              }}
            >
              <div className="w-14 h-14 rounded-[16px] flex items-center justify-center text-[27px] mb-5"
                style={{ background: svc.bg }}>
                {svc.icon}
              </div>
              <h3 className="text-[20px] font-semibold leading-[1.2] mb-2.5" style={{ color: '#111827' }}>{svc.title}</h3>
              <p className="text-base font-normal leading-[1.3] mb-5" style={{ color: '#4B5563' }}>{svc.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {svc.tags.map((tag) => (
                  <span key={tag}
                    className="px-2.5 py-1 rounded-[64px] text-[12px] font-semibold"
                    style={{ background: '#E1F3FE', color: '#2463EB' }}>
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
