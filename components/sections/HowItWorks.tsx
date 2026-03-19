'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { STEPS } from '@/lib/data'

export default function HowItWorks() {
  return (
    <section className="py-24 px-12" id="process" style={{ background: '#EEF5FF' }}>
      <div className="max-w-[1160px] mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[1.2px]
            px-3.5 py-1.5 rounded-full mb-3.5"
            style={{ background: '#DBEAFE', color: '#1B6DEA' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#1B6DEA' }} />
            Quy trình làm việc
          </div>
          <h2 className="font-black leading-[1.12] tracking-[-0.02em]"
            style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
            4 bước để có campaign KOC thành công
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-4 gap-7 mt-14 relative"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Connecting line */}
          <div className="absolute top-10 left-[calc(12.5%+8px)] right-[calc(12.5%+8px)] h-0.5
            rounded-full pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #1B6DEA, #DBEAFE)' }} />

          {STEPS.map((step, i) => (
            <motion.div key={i} variants={staggerItem} className="text-center relative">
              <div className="w-20 h-20 rounded-full text-white text-[22px] font-black
                flex items-center justify-center mx-auto mb-5 relative z-10"
                style={{
                  background: '#1B6DEA',
                  boxShadow: '0 6px 22px rgba(27,109,234,0.38)',
                }}>
                {step.step}
              </div>
              <h3 className="text-[16px] font-black mb-2.5">{step.title}</h3>
              <p className="text-[13px] leading-[1.6]" style={{ color: '#64748B' }}>{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
