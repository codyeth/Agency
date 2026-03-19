'use client'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden text-center py-24 px-12"
      style={{ background: 'linear-gradient(155deg, #1B6DEA 0%, #0A2240 100%)' }}>
      <div className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.04)' }} />
      <div className="absolute -bottom-24 -right-12 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.04)' }} />

      <div className="relative z-10 max-w-[1160px] mx-auto">
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="font-black text-white leading-[1.12] tracking-[-0.02em] mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
        >
          Bắt đầu campaign KOC<br />đầu tiên của bạn hôm nay
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[17px] mb-10"
          style={{ color: 'rgba(255,255,255,0.70)' }}
        >
          Tư vấn miễn phí · Shortlist KOC trong 48h · KPI cam kết trong hợp đồng
        </motion.p>
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 justify-center"
        >
          <motion.a href="#contact"
            className="inline-flex items-center gap-2 px-9 py-4 bg-white font-black text-[16px] rounded-full"
            style={{ color: '#1B6DEA', boxShadow: '0 8px 28px rgba(0,0,0,0.20)', textDecoration: 'none' }}
            whileHover={{ y: -3, boxShadow: '0 14px 36px rgba(0,0,0,0.24)' }}
            whileTap={{ scale: 0.97 }}>
            🚀 Brand — Tư vấn ngay
          </motion.a>
          <motion.a href="#koc"
            className="inline-flex items-center gap-2 px-9 py-4 border rounded-full font-bold text-[16px] text-white"
            style={{ background: 'rgba(255,255,255,0.10)', borderColor: 'rgba(255,255,255,0.30)', textDecoration: 'none' }}
            whileHover={{ background: 'rgba(255,255,255,0.18)' }}>
            ✨ KOC — Đăng ký nhận deal
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
