'use client'
import { motion } from 'framer-motion'
import { fadeUp, viewport } from '@/lib/animations'
import { SITE } from '@/lib/data'

export default function KOCRegistration() {
  return (
    <section className="py-24 px-12 bg-white" id="koc">
      <div className="max-w-[1160px] mx-auto grid grid-cols-2 gap-16 items-center">
        {/* Brand side */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[1.2px]
            px-3.5 py-1.5 rounded-full mb-4"
            style={{ background: '#DBEAFE', color: '#1B6DEA' }}>
            🏢 Dành cho Brand
          </div>
          <h2 className="font-black leading-[1.15] tracking-[-0.02em] mb-4"
            style={{ fontSize: 'clamp(24px, 3vw, 40px)' }}>
            Cần booking KOC cho chiến dịch tiếp theo?
          </h2>
          <p className="text-[15px] leading-[1.75] mb-7" style={{ color: '#64748B' }}>
            Tư vấn miễn phí trong 24h. Chúng tôi sẽ present shortlist KOC phù hợp với sản phẩm, ngân sách và KPI của bạn.
          </p>
          <div className="flex flex-col gap-3">
            {['✓ Không mất phí tư vấn ban đầu', '✓ Shortlist KOC trong 48h', '✓ KPI cam kết trong hợp đồng'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[14px] font-medium">{item}</div>
            ))}
          </div>
          <div className="flex gap-3 mt-8">
            <motion.a href={`tel:+84${SITE.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white
                font-bold text-[14px]"
              style={{ background: '#1B6DEA', boxShadow: '0 4px 14px rgba(27,109,234,0.35)', textDecoration: 'none' }}
              whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              📞 Gọi ngay
            </motion.a>
            <motion.a href={SITE.zalo}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200
                text-slate-800 font-semibold text-[14px] transition-colors"
              style={{ textDecoration: 'none' }}
              whileHover={{ y: -2 }}>
              💬 Zalo
            </motion.a>
          </div>
        </motion.div>

        {/* KOC side */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}
          className="rounded-3xl p-10"
          style={{ background: '#EEF5FF' }}
        >
          <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[1.2px]
            px-3.5 py-1.5 rounded-full mb-4"
            style={{ background: '#DBEAFE', color: '#1B6DEA' }}>
            ✨ Dành cho KOC
          </div>
          <h3 className="text-[24px] font-black mb-3">Đăng ký nhận brand deal</h3>
          <p className="text-[14px] leading-[1.7] mb-6" style={{ color: '#64748B' }}>
            Tham gia network 500+ KOC Home &amp; Living. Nhận brief trực tiếp, không qua trung gian nhiều lớp.
          </p>
          <div className="space-y-3">
            {[
              { placeholder: 'Tên của bạn', type: 'text' },
              { placeholder: 'Số Zalo', type: 'tel' },
              { placeholder: 'Link profile TikTok/Instagram', type: 'url' },
            ].map((field) => (
              <input
                key={field.placeholder}
                type={field.type}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-[18px] border border-slate-200 text-[14px]
                  focus:outline-none transition-colors bg-white"
                style={{ borderColor: undefined }}
                onFocus={(e) => (e.target.style.borderColor = '#1B6DEA')}
                onBlur={(e) => (e.target.style.borderColor = '')}
              />
            ))}
            <motion.button
              className="w-full py-3 rounded-full text-white font-bold text-[14px] mt-1"
              style={{ background: '#1B6DEA' }}
              whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(27,109,234,0.35)' }}
              whileTap={{ scale: 0.97 }}
            >
              Gửi đăng ký →
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
