'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { STEPS } from '@/lib/data'

export default function HowItWorks() {
  return (
    <section id="process" style={{ background: '#fff', paddingTop: '80px', paddingBottom: '125px', paddingLeft: '40px', paddingRight: '40px' }}>
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em]
            px-3.5 py-1.5 rounded-[64px] mb-3.5"
            style={{ background: '#E1F3FE', color: '#2463EB' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2463EB' }} />
            Quy trình làm việc
          </div>
          <h2 className="font-medium leading-[1.2]"
            style={{ fontSize: '48px', color: '#111827' }}>
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
            style={{ background: 'linear-gradient(90deg, #2463EB, #E1F3FE)' }} />

          {STEPS.map((step, i) => (
            <motion.div key={i} variants={staggerItem} className="text-center relative">
              <div className="w-20 h-20 rounded-full text-white text-[22px] font-medium
                flex items-center justify-center mx-auto mb-5 relative z-10"
                style={{
                  background: '#2463EB',
                  boxShadow: '0 6px 22px rgba(36,99,235,0.38)',
                }}>
                {step.step}
              </div>
              <h3 className="text-[28px] font-medium leading-[1.2] mb-2.5" style={{ color: '#111827' }}>{step.title}</h3>
              <p className="text-base font-normal leading-[1.3]" style={{ color: '#4B5563' }}>{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
