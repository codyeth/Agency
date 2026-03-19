'use client'
import { motion } from 'framer-motion'
import { SITE } from '@/lib/data'

const FOOTER_LINKS: Record<string, string[]> = {
  'Dịch vụ': ['KOC Booking', 'Campaign Management', 'Analytics', 'Tư vấn chiến lược', 'Compliance'],
  'Công ty': ['Về chúng tôi', 'Case Study', 'Blog & Cẩm nang', 'Tuyển dụng', 'Liên hệ'],
  'Hỗ trợ': ['FAQ', 'Luật QC 2026', 'Chính sách bảo mật', `📞 ${SITE.phone}`, `✉ ${SITE.email}`],
}

export default function Footer() {
  return (
    <footer className="pt-[72px] pb-9 px-6 md:px-12 lg:px-20" style={{ background: '#060F1E', color: 'rgba(255,255,255,0.55)' }}>
      <div className="max-w-[1080px] mx-auto grid mb-14"
        style={{ gridTemplateColumns: '2.2fr 1fr 1fr 1fr', gap: '56px' }}>
        <div>
          <div className="text-[22px] font-black text-white mb-3.5">{SITE.name} ✦</div>
          <p className="text-[13px] leading-[1.75] max-w-[240px] mb-6">
            Agency chuyên kết nối KOC/KOL ngách Home &amp; Living với nhãn hàng tại Việt Nam.
          </p>
          <div className="flex gap-2">
            {['🎵', '📘', '📸', '▶', '💼'].map((icon) => (
              <motion.div
                key={icon}
                className="w-9 h-9 rounded-[10px] flex items-center justify-center text-base cursor-pointer"
                style={{ background: 'rgba(255,255,255,0.08)' }}
                whileHover={{ background: '#1B6DEA' }}
                transition={{ duration: 0.2 }}
              >
                {icon}
              </motion.div>
            ))}
          </div>
        </div>
        {Object.entries(FOOTER_LINKS).map(([title, links]) => (
          <div key={title}>
            <h5 className="text-[11px] font-black text-white uppercase tracking-[1.2px] mb-5">
              {title}
            </h5>
            {links.map((link) => (
              <a key={link} href="#"
                className="block text-[13px] mb-2.5 transition-colors duration-200 hover:text-white"
                style={{ color: 'rgba(255,255,255,0.50)', textDecoration: 'none' }}>
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="max-w-[1080px] mx-auto border-t pt-7 flex justify-between items-center text-[12px]"
        style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <span>© 2026 {SITE.name}. Tất cả quyền được bảo lưu.</span>
        <div className="flex gap-5">
          <a href="#" className="transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.50)', textDecoration: 'none' }}>Chính sách bảo mật</a>
          <a href="#" className="transition-colors hover:text-white"
            style={{ color: 'rgba(255,255,255,0.50)', textDecoration: 'none' }}>Điều khoản dịch vụ</a>
        </div>
      </div>
    </footer>
  )
}
