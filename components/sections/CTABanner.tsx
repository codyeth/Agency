'use client'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden text-center pt-[80px] pb-[125px] px-10"
      style={{ background: 'linear-gradient(155deg, #2463EB 0%, #1D4FD7 100%)' }}>
      <div className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.04)' }} />
      <div className="absolute -bottom-24 -right-12 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'rgba(255,255,255,0.04)' }} />

      <div className="relative z-10 max-w-[1280px] mx-auto">
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="font-medium text-white leading-[1.2] mb-4"
          style={{ fontSize: '48px' }}
        >
          Bắt đầu campaign KOC<br />đầu tiên của bạn hôm nay
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base font-normal mb-10"
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
            className="inline-flex items-center gap-2 h-12 px-9 bg-white font-normal text-base rounded-[64px]"
            style={{ color: '#2463EB', boxShadow: '0 8px 28px rgba(0,0,0,0.20)', textDecoration: 'none' }}
            whileHover={{ y: -3, boxShadow: '0 14px 36px rgba(0,0,0,0.24)' }}
            whileTap={{ scale: 0.97 }}>
            🚀 Brand — Tư vấn ngay
          </motion.a>
          <motion.a href="#koc"
            className="inline-flex items-center gap-2 h-12 px-9 border rounded-[64px] font-normal text-base text-white"
            style={{ background: 'rgba(255,255,255,0.10)', borderColor: 'rgba(255,255,255,0.30)', textDecoration: 'none' }}
            whileHover={{ background: 'rgba(255,255,255,0.18)' }}>
            ✨ KOC — Đăng ký nhận deal
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
