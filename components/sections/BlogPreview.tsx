'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { BLOG_POSTS } from '@/lib/data'

export default function BlogPreview() {
  return (
    <section className="pt-[80px] pb-[125px] px-10 bg-white">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em]
              px-3.5 py-1.5 rounded-[64px] mb-3.5"
              style={{ background: '#E1F3FE', color: '#2463EB' }}>
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2463EB' }} />
              Kiến thức ngành
            </div>
            <h2 className="font-medium leading-[1.2]"
              style={{ fontSize: '48px', color: '#111827' }}>
              Blog &amp; Cẩm nang
            </h2>
          </div>
          <a href="/blog" className="text-[14px] font-normal hover:underline"
            style={{ color: '#2463EB' }}>
            Xem tất cả →
          </a>
        </div>
        <motion.div
          className="grid grid-cols-3 gap-6"
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
              className="rounded-[16px] p-8 group block"
              style={{ background: '#F9FAFB', textDecoration: 'none' }}
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(36,99,235,0.10)' }}
            >
              <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.08em] px-2.5 py-1 rounded-[64px] mb-4"
                style={{ background: '#E1F3FE', color: '#2463EB' }}>
                {post.tag}
              </span>
              <h3 className="text-[18px] font-semibold leading-[1.3] mb-2.5 transition-colors"
                style={{ color: '#111827' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#2463EB')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#111827')}
              >
                {post.title}
              </h3>
              <p className="text-base font-normal leading-[1.3] mb-4" style={{ color: '#4B5563' }}>{post.desc}</p>
              <div className="flex items-center gap-3 text-[14px] font-normal" style={{ color: '#4B5563' }}>
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
