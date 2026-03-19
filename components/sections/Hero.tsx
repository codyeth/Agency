'use client'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'
import { SITE } from '@/lib/data'

const PARTICLES = [
  { size: 10, color: '#FCD34D', left: '8%',  dur: '9s',   delay: '0s' },
  { size: 7,  color: '#34D399', left: '18%', dur: '7s',   delay: '1.2s' },
  { size: 12, color: '#F43F5E', left: '28%', dur: '11s',  delay: '0.5s', square: true },
  { size: 8,  color: '#8B5CF6', left: '72%', dur: '8s',   delay: '2s' },
  { size: 14, color: '#FCD34D', left: '82%', dur: '10s',  delay: '0.8s', square: true },
  { size: 6,  color: '#6EE7B7', left: '90%', dur: '7.5s', delay: '1.5s' },
  { size: 9,  color: '#93C5FD', left: '45%', dur: '9.5s', delay: '0.3s' },
  { size: 11, color: '#FB7185', left: '58%', dur: '8.5s', delay: '1.8s', square: true },
]

const PROMO = [
  { badge: 'FREE', value: '500+', label: 'KOC trong\nnetwork' },
  { badge: 'DATA', value: '10M+', label: 'Tổng reach\ntích lũy' },
  { badge: 'RATE', value: '95%', label: 'Campaign\nđúng KPI' },
]

export default function Hero() {
  return (
    <>
      <section
        className="min-h-[580px] relative overflow-hidden flex flex-col items-center
          px-12 pt-[100px] pb-0 text-center"
        style={{ background: 'linear-gradient(160deg, #1B6DEA 0%, #0c3d8e 55%, #071e3d 100%)' }}
      >
        {/* Orbs */}
        <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none -top-[200px] -left-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(99,179,237,0.18) 0%, transparent 70%)',
            animation: 'orbMove 12s ease-in-out infinite' }} />
        <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none -bottom-[100px] -right-[100px]"
          style={{ background: 'radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 70%)',
            animation: 'orbMove 10s ease-in-out infinite reverse' }} />

        {/* Confetti */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {PARTICLES.map((p, i) => (
            <div key={i} className="absolute opacity-0"
              style={{
                width: p.size,
                height: p.size,
                background: p.color,
                left: p.left,
                bottom: 0,
                borderRadius: p.square ? '2px' : '50%',
                animation: `floatUp ${p.dur} linear infinite`,
                animationDelay: p.delay,
              }} />
          ))}
        </div>

        {/* Badge */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show"
          className="relative z-10 inline-flex items-center gap-2 mb-6
            border rounded-full px-4 py-1.5 text-[13px] font-semibold text-white"
          style={{ background: 'rgba(255,255,255,0.10)', borderColor: 'rgba(255,255,255,0.20)' }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"
            style={{ animation: 'livePulse 2s infinite' }} />
          Agency chuyên KOC Home &amp; Living · Vietnam
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}
          className="relative z-10 font-black leading-[1.12] text-white tracking-[-0.03em] mb-5 max-w-[760px]"
          style={{ fontSize: 'clamp(34px, 4.5vw, 60px)' }}
        >
          Kết Nối KOC Đúng Ngách
          <br />
          Đúng Brand.{' '}
          <span className="relative inline-block" style={{ color: '#FCD34D' }}>
            Đúng Kết Quả.
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
              style={{ background: 'linear-gradient(90deg, #FCD34D, #F59E0B)', originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.8, ease: 'easeOut' }}
            />
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}
          className="relative z-10 text-[17px] text-white/75 max-w-[520px] leading-[1.7] mb-10"
        >
          {SITE.description}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}
          className="relative z-10 flex gap-3.5 justify-center mb-16"
        >
          <motion.a href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white
              font-black text-[15px]"
            style={{ color: '#1B6DEA', boxShadow: '0 8px 28px rgba(0,0,0,0.18)', textDecoration: 'none' }}
            whileHover={{ y: -3, boxShadow: '0 14px 36px rgba(0,0,0,0.24)' }}
            whileTap={{ scale: 0.97 }}
          >
            🚀 Brand — Booking KOC
          </motion.a>
          <motion.a href="#koc"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
              text-white font-bold text-[15px] border"
            style={{ background: 'rgba(255,255,255,0.10)', borderColor: 'rgba(255,255,255,0.30)', textDecoration: 'none' }}
            whileHover={{ background: 'rgba(255,255,255,0.2)' }}
          >
            ✨ KOC — Đăng ký nhận deal
          </motion.a>
        </motion.div>

        {/* Promo card */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.4 }}
          className="relative z-10 w-full max-w-[680px] rounded-3xl -mb-[52px] grid grid-cols-3 gap-6 px-12 py-8"
          style={{
            background: 'rgba(255,255,255,0.10)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
        >
          {PROMO.map((p, i) => (
            <div key={i} className={`text-center ${i < 2 ? 'border-r' : ''}`}
              style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
              <div className="inline-block text-[10px] font-black uppercase tracking-[1px]
                text-emerald-300 px-2.5 py-0.5 rounded-full mb-2.5"
                style={{ background: 'rgba(52,211,153,0.20)' }}>
                {p.badge}
              </div>
              <div className="text-[36px] font-black text-white leading-none">{p.value}</div>
              <div className="text-[12px] mt-1.5 leading-[1.4] whitespace-pre-line"
                style={{ color: 'rgba(255,255,255,0.55)' }}>{p.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Spacer for overlap */}
      <div className="h-[52px] bg-white" />
    </>
  )
}
