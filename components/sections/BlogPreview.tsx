'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { BLOG_POSTS } from '@/lib/data'

export default function BlogPreview() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-20 bg-white">
      <div className="max-w-[1080px] mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[1.2px]
              px-3.5 py-1.5 rounded-full mb-3.5"
              style={{ background: '#DBEAFE', color: '#1B6DEA' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#1B6DEA' }} />
              Kiến thức ngành
            </div>
            <h2 className="font-black leading-[1.12] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(28px, 3.5vw, 46px)' }}>
              Blog &amp; Cẩm nang
            </h2>
          </div>
          <a href="/blog" className="text-[14px] font-semibold hover:underline"
            style={{ color: '#1B6DEA' }}>
            Xem tất cả →
          </a>
        </div>
        <motion.div
          className="grid grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {BLOG_POSTS.map((post, i) => (
            <motion.a
              key={i}
              href="/blog"
              variants={staggerItem}
              className="rounded-3xl p-6 group block"
              style={{ background: '#EEF5FF', textDecoration: 'none' }}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(27,109,234,0.10)' }}
            >
              <span className="inline-block text-[11px] font-black px-2.5 py-1 rounded-full mb-4"
                style={{ background: '#DBEAFE', color: '#1B6DEA' }}>
                {post.tag}
              </span>
              <h3 className="text-[16px] font-black text-slate-900 leading-[1.4] mb-2.5 transition-colors"
                style={{ color: '#0F172A' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#1B6DEA')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#0F172A')}
              >
                {post.title}
              </h3>
              <p className="text-[13px] leading-[1.65] mb-4" style={{ color: '#64748B' }}>{post.desc}</p>
              <div className="flex items-center gap-3 text-[12px]" style={{ color: '#64748B' }}>
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime} đọc</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
