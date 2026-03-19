'use client'
import { motion } from 'framer-motion'
import { fadeUp, viewport } from '@/lib/animations'
import { SITE } from '@/lib/data'

export default function KOCRegistration() {
  return (
    <section className="bg-white" id="contact" style={{ paddingTop: '80px', paddingBottom: '125px', paddingLeft: '40px', paddingRight: '40px' }}>
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 gap-16 items-center">
        {/* Brand side */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em]
            px-3.5 py-1.5 rounded-[64px] mb-4"
            style={{ background: '#E1F3FE', color: '#2463EB' }}>
            🏢 Dành cho Brand
          </div>
          <h2 className="font-medium leading-[1.2] mb-4"
            style={{ fontSize: '48px', color: '#111827' }}>
            Cần booking KOC cho chiến dịch tiếp theo?
          </h2>
          <p className="text-base font-normal leading-[1.3] mb-7" style={{ color: '#4B5563' }}>
            Tư vấn miễn phí trong 24h. Chúng tôi sẽ present shortlist KOC phù hợp với sản phẩm, ngân sách và KPI của bạn.
          </p>
          <div className="flex flex-col gap-3">
            {['✓ Không mất phí tư vấn ban đầu', '✓ Shortlist KOC trong 48h', '✓ KPI cam kết trong hợp đồng'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-base font-normal" style={{ color: '#111827' }}>{item}</div>
            ))}
          </div>
          <div className="flex gap-3 mt-8">
            <motion.a href={`tel:+84${SITE.phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-[64px] text-white
                font-normal text-base"
              style={{ background: '#2463EB', boxShadow: '0 4px 14px rgba(36,99,235,0.35)', textDecoration: 'none' }}
              whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              📞 Gọi ngay
            </motion.a>
            <motion.a href={SITE.zalo}
              className="inline-flex items-center gap-2 h-12 px-6 rounded-[64px] border border-slate-200
                text-base font-normal transition-colors"
              style={{ color: '#111827', textDecoration: 'none' }}
              whileHover={{ y: -2 }}>
              💬 Zalo
            </motion.a>
          </div>
        </motion.div>

        {/* KOC side */}
        <motion.div
          id="koc"
          variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}
          className="rounded-[16px] p-9"
          style={{ background: '#ffffff', border: '1px solid #E5E7EB', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em]
            px-3.5 py-1.5 rounded-[64px] mb-4"
            style={{ background: '#dbeafe', color: '#2463EB' }}>
            ✨ Dành cho KOC
          </div>
          <h3 className="text-[24px] font-semibold leading-[1.2] mb-3" style={{ color: '#111827' }}>Đăng ký nhận brand deal</h3>
          <p className="text-[14px] font-normal leading-[1.5] mb-6" style={{ color: '#4B5563' }}>
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
                className="w-full h-12 px-4 rounded-[8px] border border-slate-200 text-base font-normal
                  focus:outline-none transition-colors bg-white"
                onFocus={(e) => (e.target.style.borderColor = '#2463EB')}
                onBlur={(e) => (e.target.style.borderColor = '')}
              />
            ))}
            <motion.button
              className="w-full h-12 rounded-[8px] text-white font-medium text-base mt-1"
              style={{ background: '#2463EB' }}
              whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(36,99,235,0.35)' }}
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
