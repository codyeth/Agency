'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SITE } from '@/lib/data'

const NAV_LINKS = [
  { label: 'Dịch vụ', href: '#services' },
  { label: 'KOC Network', href: '#koc' },
  { label: 'Quy trình', href: '#process' },
  { label: 'Blog', href: '/blog' },
  { label: 'Liên hệ', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-[200] h-20 px-10 flex items-center justify-between
        bg-white/95 backdrop-blur-xl border-b border-black/[0.06]
        transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.08)]' : ''}`}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-2.5 no-underline"
        style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>
        <div className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #2463EB, #1D4FD7)' }}>
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
            <path d="M3 15L7 7L12 12L15 8L19 15H3Z" fill="white" opacity="0.9"/>
            <circle cx="16" cy="6" r="2.5" fill="#FCD34D"/>
          </svg>
        </div>
        {SITE.name}
      </a>

      {/* Nav links */}
      <ul className="flex items-center gap-2 list-none">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="px-3.5 py-1.5 rounded-lg text-base font-normal text-slate-800
                hover:text-[#2463EB] transition-all duration-150 no-underline"
              style={{ textDecoration: 'none' }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTAs */}
      <div className="flex gap-2.5 items-center">
        <a href="#contact"
          className="h-12 px-6 rounded-[64px] border border-slate-200 text-base font-normal
            text-slate-800 hover:text-[#2463EB] transition-all duration-200 inline-flex items-center"
          style={{ textDecoration: 'none' }}>
          Tư vấn ngay
        </a>
        <motion.a
          href="#koc"
          className="h-12 px-6 rounded-[64px] text-white text-base font-normal inline-flex items-center gap-1.5"
          style={{
            background: '#2463EB',
            boxShadow: '0 4px 14px rgba(36,99,235,0.35)',
            textDecoration: 'none',
          }}
          whileHover={{ y: -1, boxShadow: '0 6px 20px rgba(36,99,235,0.4)' }}
          whileTap={{ scale: 0.97 }}
        >
          KOC Đăng ký →
        </motion.a>
      </div>
    </nav>
  )
}
