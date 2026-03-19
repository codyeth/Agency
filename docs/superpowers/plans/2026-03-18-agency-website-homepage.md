# Agency Website — Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready, animation-heavy KOL/KOC agency homepage with Next.js 14, deployed to Vercel.

**Architecture:** Next.js 14 App Router with TypeScript. All animations via Framer Motion (scroll reveals, tabs, count-up) + CSS keyframes (orbs, confetti, pulse). Lenis for smooth scroll. Content lives in `lib/data.ts` — no CMS yet. Each section is an isolated Server or Client component.

**Tech Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS 3 · Framer Motion · GSAP (bubble diagram only) · Lenis smooth scroll · Be Vietnam Pro (Google Fonts)

**Reference files:**
- `../agency-website-prompt.md` — animation specs, component patterns, design tokens
- `../agency-homepage-v2.html` — visual reference prototype (pure HTML/CSS)

---

## File Map

```
website/
  app/
    layout.tsx              ← root layout: font, SmoothScroll, metadata
    page.tsx                ← compose all section components
    globals.css             ← CSS variables, keyframes, base reset
  components/
    layout/
      Navbar.tsx            ← sticky nav, blur, scroll shadow, mobile menu
      Footer.tsx            ← dark footer, 4-col grid, social icons
      SmoothScroll.tsx      ← Lenis wrapper (client component)
    sections/
      Hero.tsx              ← gradient bg, orbs, confetti, stats card
      Stats.tsx             ← 4-col count-up grid
      FeatureTabs.tsx       ← platform tabs with animated panel switch
      ServicesGrid.tsx      ← 6-card service grid with scroll reveal
      HowItWorks.tsx        ← 4-step process with connecting line
      LogoMarquee.tsx       ← infinite scroll brand logos
      Testimonials.tsx      ← 3-card testimonial grid
      KOCRegistration.tsx   ← split CTA: brand contact + KOC signup
      BlogPreview.tsx       ← 3 latest blog post cards
      CTABanner.tsx         ← bottom gradient CTA section
    ui/
      FloatingBadge.tsx     ← floating animated stat badge (reused in tabs)
      CountUp.tsx           ← animated number with useInView trigger
      WaveDivider.tsx       ← SVG wave between hero and stats
  lib/
    animations.ts           ← shared Framer Motion variants (fadeUp, stagger, slide)
    data.ts                 ← all content: stats, services, tabs, testimonials, logos
  public/
    fonts/                  ← (empty, using Google Fonts CDN)
  tailwind.config.ts
  next.config.ts
  tsconfig.json
  package.json
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `website/` (entire project)
- Create: `website/tailwind.config.ts`
- Create: `website/app/globals.css`
- Create: `website/lib/animations.ts`
- Create: `website/lib/data.ts`

- [ ] **Step 1.1: Khởi tạo Next.js project**

```bash
cd /Users/minhha/Documents/Code/Agency-main
npx create-next-app@latest website \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*" \
  --no-git
```

- [ ] **Step 1.2: Cài dependencies**

```bash
cd website
npm install framer-motion gsap @gsap/react
npm install @studio-freight/lenis
npm install clsx tailwind-merge
```

- [ ] **Step 1.3: Cấu hình Tailwind với design tokens**

Thay toàn bộ `tailwind.config.ts`:

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          DEFAULT: '#1B6DEA',
          dark: '#0F4FB8',
          deep: '#0A2240',
          light: '#EEF5FF',
          mid: '#DBEAFE',
        },
        green: { DEFAULT: '#10B981' },
        yellow: { DEFAULT: '#FCD34D' },
        muted: '#64748B',
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      borderRadius: {
        card: '18px',
        'card-lg': '24px',
        pill: '100px',
      },
      boxShadow: {
        card: '0 4px 24px rgba(27,109,234,0.10)',
        'card-hover': '0 16px 48px rgba(27,109,234,0.18)',
        btn: '0 4px 14px rgba(27,109,234,0.35)',
        badge: '0 6px 20px rgba(0,0,0,0.12)',
      },
      maxWidth: { container: '1160px' },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 1.4: Viết globals.css**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&display=swap');

:root {
  --blue: #1B6DEA;
  --blue-dark: #0F4FB8;
  --blue-deep: #0A2240;
  --blue-light: #EEF5FF;
  --blue-mid: #DBEAFE;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body { font-family: 'Be Vietnam Pro', sans-serif; color: #0F172A; overflow-x: hidden; }

/* Keyframes */
@keyframes orbMove {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(40px, -30px) scale(1.1); }
}
@keyframes floatUp {
  0%   { transform: translateY(110%) rotate(0deg); opacity: 0; }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.4; }
  100% { transform: translateY(-10px) rotate(360deg); opacity: 0; }
}
@keyframes livePulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.5); }
  50%       { box-shadow: 0 0 0 6px rgba(52,211,153,0); }
}
@keyframes typing {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40%           { transform: scale(1); opacity: 1; }
}
@keyframes ticker {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```

- [ ] **Step 1.5: Viết lib/animations.ts**

```ts
// lib/animations.ts
import { Variants } from 'framer-motion'

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

export const viewport = { once: true, margin: '-80px' } as const
```

- [ ] **Step 1.6: Viết lib/data.ts (toàn bộ content)**

```ts
// lib/data.ts

export const SITE = {
  name: 'KOCHub Agency',
  tagline: 'Kết nối KOC đúng ngách. Đúng brand. Đúng kết quả.',
  description: 'Agency chuyên kết nối KOC/KOL ngách Home & Living với các nhãn hàng gia dụng, tẩy rửa, trang trí nhà cửa tại Việt Nam.',
  phone: '0708 789 886',
  email: 'hello@kochub.vn',
  zalo: 'https://zalo.me/kochub',
}

export const STATS = [
  { value: 500,  suffix: '+', label: 'KOC trong network' },
  { value: 50,   suffix: '+', label: 'Campaigns đã chạy' },
  { value: 10,   suffix: 'M+', label: 'Tổng reach đạt được' },
  { value: 30,   suffix: '+', label: 'Nhãn hàng tin dùng' },
]

export const FEATURE_TABS = [
  {
    id: 'booking',
    label: '🤝 KOC Booking',
    features: [
      { icon: '🔍', title: 'Tìm & Match KOC phù hợp', desc: 'Lọc KOC theo ngách, follower, engagement rate, giá — đúng profile brand cần không lãng phí ngân sách.' },
      { icon: '📋', title: 'Brief & Onboarding', desc: 'Soạn brief chuẩn, gửi sample, xác nhận terms — KOC sẵn sàng làm content trong 48h.' },
      { icon: '📊', title: 'Tracking & Báo cáo', desc: 'Theo dõi views, engagement, link click real-time. Báo cáo sau campaign trong 7 ngày.' },
    ],
    badges: [
      { position: 'top-right' as const, icon: '📈', value: '+320%', label: 'Engagement tăng', color: 'green' },
      { position: 'bottom-left' as const, icon: '🤝', value: '48h', label: 'Onboard KOC', color: 'blue' },
      { position: 'middle-left' as const, icon: '⭐', value: '4.9★', label: 'Đánh giá brand', color: 'blue' },
    ],
    metrics: [
      { v: '500+', l: 'KOC sẵn sàng' },
      { v: '4.9★', l: 'Brand rating' },
      { v: '48h', l: 'Turn-around' },
      { v: '100%', l: 'Compliant' },
    ],
  },
  {
    id: 'campaign',
    label: '🎯 Campaign Mgmt',
    features: [
      { icon: '🗓', title: 'Lên kế hoạch chiến dịch', desc: 'Xác định KPI, timeline, ngân sách — roadmap chi tiết từ A đến Z trước khi bắt đầu.' },
      { icon: '🎬', title: 'Vận hành content', desc: 'Theo dõi KOC đăng bài đúng hạn, đúng brief. Feedback nhanh, không bỏ sót nội dung.' },
      { icon: '📈', title: 'Tối ưu & Scale', desc: 'Phân tích KOC nào hiệu quả nhất, tăng ngân sách cho creator top performer.' },
    ],
    badges: [
      { position: 'top-right' as const, icon: '🎯', value: 'KPI', label: 'Cam kết trong HĐ', color: 'green' },
      { position: 'bottom-left' as const, icon: '⚡', value: '24h', label: 'Phản hồi tối đa', color: 'blue' },
      { position: 'middle-left' as const, icon: '📊', value: 'Live', label: 'Dashboard real-time', color: 'blue' },
    ],
    metrics: [
      { v: '50+', l: 'Campaigns' },
      { v: '95%', l: 'Đúng KPI' },
      { v: '7 ngày', l: 'Báo cáo sau' },
      { v: '24/7', l: 'Support' },
    ],
  },
  {
    id: 'tiktok',
    label: '🎵 TikTok',
    features: [
      { icon: '🔥', title: 'KOC TikTok ngách nhà/vệ sinh', desc: 'Pool 300+ KOC chuyên "clean with me", review sản phẩm gia dụng, before/after — content native, không gượng.' },
      { icon: '🛒', title: 'TikTok Shop Affiliate', desc: 'KOC gắn link sản phẩm trực tiếp, brand theo dõi đơn hàng thực tế từng creator.' },
      { icon: '📡', title: 'Livestream Integration', desc: 'Kết hợp KOC làm co-host trong phiên live của brand — tăng trust, tăng chuyển đổi.' },
    ],
    badges: [
      { position: 'top-right' as const, icon: '🎵', value: '300+', label: 'KOC TikTok', color: 'green' },
      { position: 'bottom-left' as const, icon: '🛒', value: '15%', label: 'Commission avg', color: 'blue' },
      { position: 'middle-left' as const, icon: '👁', value: '5M+', label: 'TikTok reach/tháng', color: 'blue' },
    ],
    metrics: [
      { v: '300+', l: 'KOC TikTok' },
      { v: '5M+', l: 'Reach/tháng' },
      { v: '70%', l: 'Completion avg' },
      { v: '15%', l: 'Commission avg' },
    ],
  },
  {
    id: 'analytics',
    label: '📊 Analytics',
    features: [
      { icon: '📉', title: 'Dashboard campaign thực tế', desc: 'CPR, CPV, engagement rate, orders — từng KOC, từng video, real-time.' },
      { icon: '🔬', title: 'So sánh KOC performance', desc: 'Xếp hạng creator theo ROI, biết ai nên hợp tác lần sau.' },
      { icon: '📑', title: 'Báo cáo PDF sau campaign', desc: 'Report đầy đủ trong 7 ngày sau campaign — dùng cho case study và pitching nội bộ.' },
    ],
    badges: [
      { position: 'top-right' as const, icon: '📊', value: '≤50đ', label: 'CPR benchmark', color: 'green' },
      { position: 'bottom-left' as const, icon: '🏆', value: 'Top', label: 'KOC ranking', color: 'blue' },
      { position: 'middle-left' as const, icon: '📄', value: 'PDF', label: 'Full report', color: 'blue' },
    ],
    metrics: [
      { v: '≤50đ', l: 'CPR' },
      { v: '≥5%', l: 'Eng. Rate' },
      { v: '7 ngày', l: 'Báo cáo' },
      { v: '200%+', l: 'ROI avg' },
    ],
  },
]

export const SERVICES = [
  { icon: '🤝', bg: '#EEF5FF', title: 'KOC Booking', desc: 'Kết nối brand với KOC phù hợp — đúng ngách Home & Living, đúng follower tier, đúng ngân sách.', tags: ['TikTok', 'Instagram', 'Facebook'] },
  { icon: '🎯', bg: '#FEF3C7', title: 'Campaign Management', desc: 'Vận hành chiến dịch từ A–Z: brief, matching, tracking, báo cáo — cam kết KPI trong hợp đồng.', tags: ['Multi-KOC', 'KPI Cam kết', 'Tracking'] },
  { icon: '📊', bg: '#DCFCE7', title: 'Analytics & Báo cáo', desc: 'Dashboard real-time theo dõi CPR, views, engagement, đơn hàng — minh bạch từng con số.', tags: ['CPR', 'ROI', 'Dashboard'] },
  { icon: '📋', bg: '#FCE7F3', title: 'Brief Consulting', desc: 'Tư vấn viết brief chuẩn, set KPI thực tế, chiến lược KOC phù hợp với từng ngành hàng.', tags: ['Consulting', 'Strategy', 'Brief'] },
  { icon: '🏠', bg: '#EDE9FE', title: 'Home & Living Specialist', desc: 'Pool KOC chuyên biệt: dọn nhà, review gia dụng, before/after tẩy rửa — content authentic, không gượng.', tags: ['Home & Living', 'Niche KOC', 'Authentic'] },
  { icon: '⚖️', bg: '#FEF2F2', title: 'Pháp lý & Compliance', desc: 'Đảm bảo KOC gắn nhãn quảng cáo đúng Luật QC 2026 — brand an toàn pháp lý, không rủi ro.', tags: ['Luật QC 2026', 'Compliance', 'Safe'] },
]

export const STEPS = [
  { n: '01', title: 'Brief & Tư vấn', desc: 'Gặp 1:1, phân tích sản phẩm, xác định tệp KOC phù hợp và KPI campaign.' },
  { n: '02', title: 'Match KOC', desc: 'Lọc từ database 500+ KOC theo ngách, tier, engagement — present shortlist trong 48h.' },
  { n: '03', title: 'Vận hành', desc: 'Onboard KOC, gửi brief & sample, theo dõi content, đảm bảo đúng hạn đúng chuẩn.' },
  { n: '04', title: 'Report & Tối ưu', desc: 'Báo cáo đầy đủ sau campaign, lưu KOC hiệu quả cho lần sau.' },
]

export const LOGOS = [
  '🧴 Clean & Care', '🏠 HomeHaven VN', '🪣 ProClean', '🌿 EcoHome',
  '✨ ShineMax', '🧽 KitchenPro', '🪴 GreenNest', '🛁 BathBliss',
  '🧹 FloorKing', '🪟 ClearView', '🏡 CozyLife', '🍳 KitchenLove',
]

export const TESTIMONIALS = [
  {
    quote: 'Sau 1 campaign với 15 KOC Home & Living, sản phẩm tẩy kính của chúng tôi đạt 2.3M views TikTok. Agency matching rất chính xác, KOC làm content natural không gượng chút nào.',
    name: 'Trần Minh Khoa', role: 'Brand Manager · CleanPro Vietnam',
    gradient: 'linear-gradient(135deg, #1B6DEA, #0A2240)',
  },
  {
    quote: 'Lần đầu làm KOC campaign, agency hỗ trợ từ brief đến báo cáo. CPR chỉ 38đ/người — thấp hơn nhiều so với chạy ads. Sẽ tiếp tục hợp tác dài hạn.',
    name: 'Nguyễn Thu Hà', role: 'Owner · HomeDecor Shop',
    gradient: 'linear-gradient(135deg, #10B981, #059669)',
  },
  {
    quote: 'Điều tôi thích nhất là dashboard real-time — xem được KOC nào hiệu quả ngay trong ngày đăng. Báo cáo PDF sau campaign rất chuyên nghiệp, dùng để thuyết phục sếp dễ lắm.',
    name: 'Lê Thanh Bình', role: 'Marketing Director · EcoHome VN',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
  },
]

export const BLOG_POSTS = [
  {
    tag: 'Cẩm nang TikTok',
    title: 'Thuật toán TikTok 2026: Tất cả những gì bạn cần biết',
    desc: 'Completion rate, CHR, tín hiệu xếp hạng mới — cập nhật đầy đủ nhất cho creator và brand.',
    date: '15/03/2026',
    readTime: '8 phút',
  },
  {
    tag: 'Tips cho Brand',
    title: 'Cách viết brief KOC hiệu quả — 5 điều brand hay bỏ qua',
    desc: 'Brief quá cứng nhắc giết chết authentic content. Đây là công thức brief đúng chuẩn.',
    date: '12/03/2026',
    readTime: '5 phút',
  },
  {
    tag: 'Tips cho KOC',
    title: 'Luật Quảng cáo 2026: KOC cần biết gì để không bị phạt',
    desc: 'Gắn nhãn như thế nào, khai báo thu nhập ra sao — tổng hợp đầy đủ cho creator.',
    date: '10/03/2026',
    readTime: '6 phút',
  },
]
```

- [ ] **Step 1.7: Verify build works**

```bash
cd website
npm run build
```
Expected: ✓ compiled successfully (chưa có trang nào, chỉ default Next.js page)

---

## Task 2: Layout Shell + SmoothScroll

**Files:**
- Create: `website/components/layout/SmoothScroll.tsx`
- Modify: `website/app/layout.tsx`

- [ ] **Step 2.1: Tạo SmoothScroll component**

```tsx
// components/layout/SmoothScroll.tsx
'use client'
import { useEffect } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
  return <>{children}</>
}
```

- [ ] **Step 2.2: Cập nhật app/layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import SmoothScroll from '@/components/layout/SmoothScroll'

export const metadata: Metadata = {
  title: 'KOCHub Agency — Kết nối KOC Home & Living',
  description: 'Agency chuyên kết nối KOC/KOL ngách Home & Living với nhãn hàng gia dụng tại Việt Nam.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
```

- [ ] **Step 2.3: Verify**
```bash
npm run dev
```
Expected: localhost:3000 loads, font Be Vietnam Pro applied

---

## Task 3: Navbar

**Files:**
- Create: `website/components/layout/Navbar.tsx`

- [ ] **Step 3.1: Build Navbar**

```tsx
// components/layout/Navbar.tsx
'use client'
import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
      className={`sticky top-0 z-[200] h-16 px-12 flex items-center justify-between
        bg-white/95 backdrop-blur-xl border-b border-black/[0.06]
        transition-shadow duration-300 ${scrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.08)]' : ''}`}
    >
      {/* Logo */}
      <a href="/" className="flex items-center gap-2.5 font-black text-xl text-blue tracking-tight no-underline">
        <div className="w-9 h-9 rounded-[10px] bg-gradient-to-br from-blue to-blue-deep
          flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
            <path d="M3 15L7 7L12 12L15 8L19 15H3Z" fill="white" opacity="0.9"/>
            <circle cx="16" cy="6" r="2.5" fill="#FCD34D"/>
          </svg>
        </div>
        {SITE.name}
      </a>

      {/* Nav links */}
      <ul className="flex items-center gap-0.5 list-none">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-slate-800
                hover:bg-blue-light hover:text-blue transition-all duration-150 no-underline"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CTAs */}
      <div className="flex gap-2.5 items-center">
        <a href="#contact"
          className="px-5 py-2 rounded-pill border border-slate-200 text-sm font-semibold
            text-slate-800 hover:border-blue hover:text-blue transition-all duration-200 no-underline">
          Tư vấn ngay
        </a>
        <motion.a
          href="#koc"
          className="px-5 py-2 rounded-pill bg-blue text-white text-sm font-bold
            shadow-btn no-underline flex items-center gap-1.5"
          whileHover={{ y: -1, boxShadow: '0 6px 20px rgba(27,109,234,0.4)' }}
          whileTap={{ scale: 0.97 }}
        >
          KOC Đăng ký →
        </motion.a>
      </div>
    </nav>
  )
}
```

- [ ] **Step 3.2: Verify hiển thị Navbar**
```bash
npm run dev
```
Expected: Navbar cố định, blur khi scroll, font/màu đúng

---

## Task 4: Hero Section

**Files:**
- Create: `website/components/sections/Hero.tsx`
- Create: `website/components/ui/WaveDivider.tsx`

- [ ] **Step 4.1: Tạo WaveDivider**

```tsx
// components/ui/WaveDivider.tsx
export default function WaveDivider({ from = '#EEF5FF', to = '#fff' }: { from?: string; to?: string }) {
  return (
    <svg viewBox="0 0 1440 64" fill="none" style={{ display: 'block', background: to }}>
      <path d="M0 0C360 64 720 64 1080 32C1260 16 1380 0 1440 0V64H0V0Z" fill={from} />
    </svg>
  )
}
```

- [ ] **Step 4.2: Tạo Hero.tsx**

```tsx
// components/sections/Hero.tsx
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
          px-12 pt-[72px] pb-0 text-center"
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
                width: p.size, height: p.size,
                background: p.color,
                left: p.left,
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
            bg-white/10 border border-white/20 rounded-pill px-4 py-1.5
            text-[13px] font-semibold text-white"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0"
            style={{ animation: 'livePulse 2s infinite' }} />
          Agency chuyên KOC Home & Living · Vietnam
        </motion.div>

        {/* H1 */}
        <motion.h1
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}
          className="relative z-10 text-[clamp(38px,5.5vw,68px)] font-black leading-[1.08]
            text-white tracking-[-0.03em] mb-5 max-w-[800px]"
        >
          Kết Nối KOC Đúng Ngách
          <br />
          <span className="text-yellow relative inline-block">
            Đúng Brand. Đúng Kết Quả.
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full"
              style={{ background: 'linear-gradient(90deg, #FCD34D, #F59E0B)' }}
              initial={{ scaleX: 0, originX: 0 }}
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
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-pill bg-white
              text-blue font-black text-[15px] shadow-[0_8px_28px_rgba(0,0,0,0.18)] no-underline"
            whileHover={{ y: -3, boxShadow: '0 14px 36px rgba(0,0,0,0.24)' }}
            whileTap={{ scale: 0.97 }}
          >
            🚀 Brand — Booking KOC
          </motion.a>
          <motion.a href="#koc"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-pill
              bg-white/10 border border-white/30 text-white font-bold text-[15px] no-underline"
            whileHover={{ background: 'rgba(255,255,255,0.2)' }}
          >
            ✨ KOC — Đăng ký nhận deal
          </motion.a>
        </motion.div>

        {/* Promo card — overlaps wave */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.4 }}
          className="relative z-10 w-full max-w-[680px] rounded-card-lg -mb-[52px]
            grid grid-cols-3 gap-6 px-12 py-8"
          style={{
            background: 'rgba(255,255,255,0.10)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.18)',
          }}
        >
          {PROMO.map((p, i) => (
            <div key={i} className={`text-center ${i < 2 ? 'border-r border-white/15' : ''}`}>
              <div className="inline-block text-[10px] font-black uppercase tracking-[1px]
                text-emerald-300 bg-emerald-400/20 px-2.5 py-0.5 rounded-pill mb-2.5">
                {p.badge}
              </div>
              <div className="text-[36px] font-black text-white leading-none">{p.value}</div>
              <div className="text-[12px] text-white/55 mt-1.5 leading-[1.4] whitespace-pre-line">{p.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Spacer for overlap */}
      <div className="h-[52px] bg-white" />
    </>
  )
}
```

- [ ] **Step 4.3: Cập nhật page.tsx tạm**

```tsx
// app/page.tsx
import Navbar from '@/components/layout/Navbar'
import Hero from '@/components/sections/Hero'
import WaveDivider from '@/components/ui/WaveDivider'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WaveDivider from="#fff" to="#fff" />
      </main>
    </>
  )
}
```

- [ ] **Step 4.4: Verify Hero hiển thị đẹp**
```bash
npm run dev
```
Expected: Hero gradient đúng, animation orbs chạy, confetti bay lên, chữ fade in staggered, promo card glass morphism overlap vào dưới

---

## Task 5: Stats Section

**Files:**
- Create: `website/components/ui/CountUp.tsx`
- Create: `website/components/sections/Stats.tsx`

- [ ] **Step 5.1: Tạo CountUp component**

```tsx
// components/ui/CountUp.tsx
'use client'
import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, useTransform, motion } from 'framer-motion'

interface CountUpProps {
  target: number
  suffix?: string
  duration?: number
}

export default function CountUp({ target, suffix = '', duration = 1400 }: CountUpProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const count = useMotionValue(0)
  const spring = useSpring(count, { duration, bounce: 0 })
  const rounded = useTransform(spring, (val) =>
    target < 20 ? val.toFixed(1).replace('.0', '') : Math.round(val).toLocaleString('vi-VN')
  )

  useEffect(() => {
    if (isInView) count.set(target)
  }, [isInView, count, target])

  return (
    <div ref={ref} className="flex items-baseline justify-center gap-0.5">
      <motion.span className="text-[44px] font-black text-blue leading-none">{rounded}</motion.span>
      <span className="text-[28px] font-black text-blue">{suffix}</span>
    </div>
  )
}
```

- [ ] **Step 5.2: Tạo Stats section**

```tsx
// components/sections/Stats.tsx
'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import CountUp from '@/components/ui/CountUp'
import { STATS } from '@/lib/data'

export default function Stats() {
  return (
    <section className="py-20 px-12 bg-white">
      <motion.div
        className="max-w-container mx-auto grid grid-cols-4 border border-slate-200 rounded-card-lg overflow-hidden"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-50px' }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={staggerItem}
            className={`py-8 px-7 text-center ${i < STATS.length - 1 ? 'border-r border-slate-200' : ''}`}
          >
            <CountUp target={stat.value} suffix={stat.suffix} />
            <p className="text-[13px] font-medium text-muted mt-2">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
```

---

## Task 6: FloatingBadge + Feature Tabs

**Files:**
- Create: `website/components/ui/FloatingBadge.tsx`
- Create: `website/components/sections/FeatureTabs.tsx`

- [ ] **Step 6.1: Tạo FloatingBadge**

```tsx
// components/ui/FloatingBadge.tsx
'use client'
import { motion } from 'framer-motion'

type Position = 'top-right' | 'bottom-left' | 'middle-left'
const POSITIONS: Record<Position, React.CSSProperties> = {
  'top-right':   { top: '14%', right: '-6%' },
  'bottom-left': { bottom: '14%', left: '-5%' },
  'middle-left': { top: '45%', left: '-6%' },
}
const COLOR_MAP: Record<string, string> = {
  green: '#10B981',
  blue: '#1B6DEA',
}

interface FloatingBadgeProps {
  position: Position
  icon: string
  value: string
  label: string
  color?: string
  delay?: number
}

export default function FloatingBadge({ position, icon, value, label, color = 'blue', delay = 0 }: FloatingBadgeProps) {
  return (
    <motion.div
      className="absolute z-10 bg-white rounded-xl px-3 py-2 text-xs font-bold
        shadow-badge flex items-center gap-2 whitespace-nowrap"
      style={POSITIONS[position]}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <span className="text-base">{icon}</span>
      <div>
        <div className="text-sm font-black" style={{ color: COLOR_MAP[color] }}>{value}</div>
        <div className="text-slate-400 font-medium" style={{ fontSize: 10 }}>{label}</div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 6.2: Tạo FeatureTabs section**

```tsx
// components/sections/FeatureTabs.tsx
'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem, viewport } from '@/lib/animations'
import FloatingBadge from '@/components/ui/FloatingBadge'
import { FEATURE_TABS } from '@/lib/data'

function UIMetricsMockup({ metrics }: { metrics: { v: string; l: string }[] }) {
  return (
    <div className="w-[82%] mx-auto mt-8 bg-white rounded-xl shadow-card-hover overflow-hidden">
      <div className="h-8 bg-slate-50 border-b border-slate-100 flex items-center px-3 gap-1.5">
        {['#FF5F57','#FFBD2E','#28CA41'].map((c) => (
          <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <div className="p-4">
        <div className="h-2.5 bg-blue rounded-full w-1/2 mb-2" />
        <div className="h-2.5 bg-slate-200 rounded-full w-4/5 mb-2" />
        <div className="h-2.5 bg-slate-200 rounded-full w-2/3 mb-3" />
        <div className="grid grid-cols-2 gap-2.5">
          {metrics.map((m) => (
            <div key={m.l} className="bg-blue-light rounded-xl p-3 text-center">
              <div className="text-lg font-black text-blue">{m.v}</div>
              <div className="text-[10px] text-muted mt-0.5">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function FeatureTabs() {
  const [activeTab, setActiveTab] = useState(FEATURE_TABS[0].id)
  const [activeFeature, setActiveFeature] = useState(0)
  const current = FEATURE_TABS.find((t) => t.id === activeTab)!

  return (
    <section className="py-24 px-12 bg-white" id="services">
      <div className="max-w-container mx-auto">
        {/* Header */}
        <div className="text-center mb-11">
          <div className="inline-flex items-center gap-2 bg-blue-mid text-blue
            text-[11px] font-black uppercase tracking-[1.2px] px-3.5 py-1.5 rounded-pill mb-3.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue" />
            Giải pháp toàn diện
          </div>
          <h2 className="text-[clamp(28px,3.5vw,46px)] font-black leading-[1.12] tracking-[-0.02em] mb-4">
            KOC đúng ngách. Performance thực.
          </h2>
          <p className="text-[16px] text-muted leading-[1.75] max-w-[520px] mx-auto">
            Từ booking đơn lẻ đến chiến dịch trọn gói — chúng tôi xử lý mọi thứ trong ngành Home & Living.
          </p>
        </div>

        {/* Tab nav */}
        <div className="flex gap-2 justify-center flex-wrap mb-14">
          {FEATURE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setActiveFeature(0) }}
              className="relative px-5 py-2.5 rounded-pill text-sm font-semibold
                border border-slate-200 transition-colors duration-200 overflow-hidden"
              style={{ color: activeTab === tab.id ? '#fff' : '#64748B' }}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="activeTabBg"
                  className="absolute inset-0 bg-blue rounded-pill"
                  style={{ zIndex: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-2 gap-14 items-center"
          >
            {/* Visual */}
            <div className="relative aspect-square bg-gradient-to-br from-blue-light to-blue-mid rounded-card-lg overflow-visible flex items-center justify-content-center">
              <UIMetricsMockup metrics={current.metrics} />
              {current.badges.map((b, i) => (
                <FloatingBadge key={i} {...b} delay={i * 0.4} />
              ))}
            </div>

            {/* Feature list */}
            <div className="flex flex-col gap-4">
              {current.features.map((feat, i) => (
                <motion.div
                  key={i}
                  onClick={() => setActiveFeature(i)}
                  className={`flex gap-4 p-4 rounded-card border-2 cursor-pointer transition-all duration-200
                    ${activeFeature === i ? 'bg-blue-light border-blue' : 'border-transparent hover:bg-blue-light hover:border-blue'}`}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <motion.div
                    className="w-11 h-11 rounded-[13px] bg-blue text-white flex items-center
                      justify-center text-xl flex-shrink-0"
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {feat.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-[15px] font-black mb-1">{feat.title}</h3>
                    <p className="text-[13px] text-muted leading-[1.55]">{feat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
```

---

## Task 7: Services Grid

**Files:**
- Create: `website/components/sections/ServicesGrid.tsx`

- [ ] **Step 7.1: Tạo ServicesGrid**

```tsx
// components/sections/ServicesGrid.tsx
'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { SERVICES } from '@/lib/data'

export default function ServicesGrid() {
  return (
    <section className="py-24 px-12 bg-blue-light">
      <div className="max-w-container mx-auto">
        <div className="inline-flex items-center gap-2 bg-blue-mid text-blue
          text-[11px] font-black uppercase tracking-[1.2px] px-3.5 py-1.5 rounded-pill mb-3.5">
          <div className="w-1.5 h-1.5 rounded-full bg-blue" />
          Dịch vụ của chúng tôi
        </div>
        <h2 className="text-[clamp(28px,3.5vw,46px)] font-black leading-[1.12] tracking-[-0.02em] mb-2">
          Mọi thứ bạn cần cho KOC campaign
        </h2>

        <motion.div
          className="grid grid-cols-3 gap-5 mt-14"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {SERVICES.map((svc, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bg-white rounded-card-lg p-8 border-2 border-transparent cursor-pointer
                transition-all duration-300 hover:border-blue hover:shadow-card-hover hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-xl flex items-center justify-center text-[27px] mb-5"
                style={{ background: svc.bg }}>
                {svc.icon}
              </div>
              <h3 className="text-[17px] font-black mb-2.5">{svc.title}</h3>
              <p className="text-[13px] text-muted leading-[1.65] mb-5">{svc.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {svc.tags.map((tag) => (
                  <span key={tag}
                    className="px-2.5 py-1 rounded-pill text-[11px] font-bold bg-blue-light text-blue">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Task 8: How It Works

**Files:**
- Create: `website/components/sections/HowItWorks.tsx`

- [ ] **Step 8.1: Tạo HowItWorks**

```tsx
// components/sections/HowItWorks.tsx
'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { STEPS } from '@/lib/data'

export default function HowItWorks() {
  return (
    <section className="py-24 px-12 bg-blue-light" id="process">
      <div className="max-w-container mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-blue-mid text-blue
            text-[11px] font-black uppercase tracking-[1.2px] px-3.5 py-1.5 rounded-pill mb-3.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue" />
            Quy trình làm việc
          </div>
          <h2 className="text-[clamp(28px,3.5vw,46px)] font-black leading-[1.12] tracking-[-0.02em]">
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
            bg-gradient-to-r from-blue to-blue-mid rounded-full" />

          {STEPS.map((step, i) => (
            <motion.div key={i} variants={staggerItem} className="text-center relative">
              <div className="w-20 h-20 rounded-full bg-blue text-white text-[22px] font-black
                flex items-center justify-center mx-auto mb-5 relative z-10
                shadow-[0_6px_22px_rgba(27,109,234,0.38)]">
                {step.n}
              </div>
              <h3 className="text-[16px] font-black mb-2.5">{step.title}</h3>
              <p className="text-[13px] text-muted leading-[1.6]">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Task 9: Logo Marquee

**Files:**
- Create: `website/components/sections/LogoMarquee.tsx`

- [ ] **Step 9.1: Tạo LogoMarquee**

```tsx
// components/sections/LogoMarquee.tsx
'use client'
import { motion } from 'framer-motion'
import { LOGOS } from '@/lib/data'

export default function LogoMarquee() {
  return (
    <section className="py-14 bg-white overflow-hidden">
      <p className="text-center text-[13px] font-bold uppercase tracking-[1px] text-muted mb-8">
        Nhãn hàng đã tin dùng
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10
          bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10
          bg-gradient-to-l from-white to-transparent pointer-events-none" />
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
        >
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div key={i}
              className="px-9 py-4 text-[14px] font-bold text-slate-400
                border-r border-slate-100 whitespace-nowrap hover:text-blue
                transition-colors cursor-default">
              {logo}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Task 10: Testimonials

**Files:**
- Create: `website/components/sections/Testimonials.tsx`

- [ ] **Step 10.1: Tạo Testimonials**

```tsx
// components/sections/Testimonials.tsx
'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { TESTIMONIALS } from '@/lib/data'

export default function Testimonials() {
  return (
    <section className="py-24 px-12 bg-blue-light">
      <div className="max-w-container mx-auto">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-blue-mid text-blue
            text-[11px] font-black uppercase tracking-[1.2px] px-3.5 py-1.5 rounded-pill mb-3.5">
            <div className="w-1.5 h-1.5 rounded-full bg-blue" />
            Khách hàng nói gì
          </div>
          <h2 className="text-[clamp(28px,3.5vw,46px)] font-black leading-[1.12] tracking-[-0.02em]">
            Kết quả thực tế, không phóng đại
          </h2>
        </div>
        <motion.div
          className="grid grid-cols-3 gap-5"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="bg-white rounded-card-lg p-8 transition-all duration-300"
              whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(27,109,234,0.12)' }}
            >
              <div className="text-[#F59E0B] text-[15px] tracking-[2px] mb-4">★★★★★</div>
              <p className="text-[14px] leading-[1.75] text-slate-800 mb-5 italic">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full text-white font-black text-base
                  flex items-center justify-center flex-shrink-0"
                  style={{ background: t.gradient }}>
                  {t.name[0]}
                </div>
                <div>
                  <div className="text-[14px] font-black">{t.name}</div>
                  <div className="text-[12px] text-muted">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Task 11: KOC Registration + Blog Preview + CTA Banner

**Files:**
- Create: `website/components/sections/KOCRegistration.tsx`
- Create: `website/components/sections/BlogPreview.tsx`
- Create: `website/components/sections/CTABanner.tsx`

- [ ] **Step 11.1: KOCRegistration**

```tsx
// components/sections/KOCRegistration.tsx
'use client'
import { motion } from 'framer-motion'
import { fadeUp, viewport } from '@/lib/animations'

export default function KOCRegistration() {
  return (
    <section className="py-24 px-12 bg-white" id="koc">
      <div className="max-w-container mx-auto grid grid-cols-2 gap-16 items-center">
        {/* Brand side */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}>
          <div className="inline-flex items-center gap-2 bg-blue-mid text-blue
            text-[11px] font-black uppercase tracking-[1.2px] px-3.5 py-1.5 rounded-pill mb-4">
            🏢 Dành cho Brand
          </div>
          <h2 className="text-[clamp(24px,3vw,40px)] font-black leading-[1.15] tracking-[-0.02em] mb-4">
            Cần booking KOC cho chiến dịch tiếp theo?
          </h2>
          <p className="text-[15px] text-muted leading-[1.75] mb-7">
            Tư vấn miễn phí trong 24h. Chúng tôi sẽ present shortlist KOC phù hợp với sản phẩm, ngân sách và KPI của bạn.
          </p>
          <div className="flex flex-col gap-3">
            {['✓ Không mất phí tư vấn ban đầu', '✓ Shortlist KOC trong 48h', '✓ KPI cam kết trong hợp đồng'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[14px] font-medium">{item}</div>
            ))}
          </div>
          <div className="flex gap-3 mt-8">
            <motion.a href="tel:+84708789886"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-pill bg-blue text-white
                font-bold text-[14px] shadow-btn no-underline"
              whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              📞 Gọi ngay
            </motion.a>
            <motion.a href="https://zalo.me"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-pill border border-slate-200
                text-slate-800 font-semibold text-[14px] no-underline hover:border-blue hover:text-blue transition-colors"
              whileHover={{ y: -2 }}>
              💬 Zalo
            </motion.a>
          </div>
        </motion.div>

        {/* KOC side */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}
          className="bg-blue-light rounded-card-lg p-10"
        >
          <div className="inline-flex items-center gap-2 bg-blue-mid text-blue
            text-[11px] font-black uppercase tracking-[1.2px] px-3.5 py-1.5 rounded-pill mb-4">
            ✨ Dành cho KOC
          </div>
          <h3 className="text-[24px] font-black mb-3">Đăng ký nhận brand deal</h3>
          <p className="text-[14px] text-muted leading-[1.7] mb-6">
            Tham gia network 500+ KOC Home & Living. Nhận brief trực tiếp, không qua trung gian nhiều lớp.
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
                className="w-full px-4 py-3 rounded-card border border-slate-200 text-[14px]
                  focus:outline-none focus:border-blue transition-colors bg-white"
              />
            ))}
            <motion.button
              className="w-full py-3 rounded-pill bg-blue text-white font-bold text-[14px] mt-1"
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
```

- [ ] **Step 11.2: BlogPreview**

```tsx
// components/sections/BlogPreview.tsx
'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import { BLOG_POSTS } from '@/lib/data'

export default function BlogPreview() {
  return (
    <section className="py-24 px-12 bg-white">
      <div className="max-w-container mx-auto">
        <div className="flex items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-mid text-blue
              text-[11px] font-black uppercase tracking-[1.2px] px-3.5 py-1.5 rounded-pill mb-3.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue" />
              Kiến thức ngành
            </div>
            <h2 className="text-[clamp(28px,3.5vw,46px)] font-black leading-[1.12] tracking-[-0.02em]">
              Blog & Cẩm nang
            </h2>
          </div>
          <a href="/blog" className="text-[14px] font-semibold text-blue hover:underline">
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
              className="bg-blue-light rounded-card-lg p-6 no-underline group"
              whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(27,109,234,0.10)' }}
            >
              <span className="inline-block text-[11px] font-black text-blue bg-blue-mid
                px-2.5 py-1 rounded-pill mb-4">
                {post.tag}
              </span>
              <h3 className="text-[16px] font-black text-slate-900 leading-[1.4] mb-2.5
                group-hover:text-blue transition-colors">
                {post.title}
              </h3>
              <p className="text-[13px] text-muted leading-[1.65] mb-4">{post.desc}</p>
              <div className="flex items-center gap-3 text-[12px] text-muted">
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
```

- [ ] **Step 11.3: CTABanner**

```tsx
// components/sections/CTABanner.tsx
'use client'
import { motion } from 'framer-motion'
import { fadeUp } from '@/lib/animations'

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden text-center py-24 px-12"
      style={{ background: 'linear-gradient(155deg, #1B6DEA 0%, #0A2240 100%)' }}>
      <div className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full bg-white/[0.04] pointer-events-none" />
      <div className="absolute -bottom-24 -right-12 w-[400px] h-[400px] rounded-full bg-white/[0.04] pointer-events-none" />

      <div className="relative z-10 max-w-container mx-auto">
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          className="text-[clamp(28px,4vw,52px)] font-black text-white leading-[1.12]
            tracking-[-0.02em] mb-4"
        >
          Bắt đầu campaign KOC<br />đầu tiên của bạn hôm nay
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-[17px] text-white/70 mb-10"
        >
          Tư vấn miễn phí · Shortlist KOC trong 48h · KPI cam kết trong hợp đồng
        </motion.p>
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 justify-center"
        >
          <motion.a href="#contact"
            className="inline-flex items-center gap-2 px-9 py-4 bg-white text-blue
              font-black text-[16px] rounded-pill shadow-xl no-underline"
            whileHover={{ y: -3, boxShadow: '0 14px 36px rgba(0,0,0,0.24)' }}
            whileTap={{ scale: 0.97 }}>
            🚀 Brand — Tư vấn ngay
          </motion.a>
          <motion.a href="#koc"
            className="inline-flex items-center gap-2 px-9 py-4 bg-white/10
              border border-white/30 text-white font-bold text-[16px] rounded-pill no-underline"
            whileHover={{ background: 'rgba(255,255,255,0.18)' }}>
            ✨ KOC — Đăng ký nhận deal
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
```

---

## Task 12: Footer

**Files:**
- Create: `website/components/layout/Footer.tsx`

- [ ] **Step 12.1: Tạo Footer**

```tsx
// components/layout/Footer.tsx
'use client'
import { motion } from 'framer-motion'
import { SITE } from '@/lib/data'

const FOOTER_LINKS = {
  'Dịch vụ': ['KOC Booking', 'Campaign Management', 'Analytics', 'Tư vấn chiến lược', 'Compliance'],
  'Công ty': ['Về chúng tôi', 'Case Study', 'Blog & Cẩm nang', 'Tuyển dụng', 'Liên hệ'],
  'Hỗ trợ': ['FAQ', 'Luật QC 2026', 'Chính sách bảo mật', `📞 ${SITE.phone}`, `✉ ${SITE.email}`],
}

export default function Footer() {
  return (
    <footer className="bg-[#060F1E] text-white/55 pt-18 pb-9 px-12">
      <div className="max-w-container mx-auto grid grid-cols-[2.2fr_1fr_1fr_1fr] gap-14 mb-14">
        <div>
          <div className="text-[22px] font-black text-white mb-3.5">{SITE.name} ✦</div>
          <p className="text-[13px] leading-[1.75] max-w-[240px] mb-6">
            Agency chuyên kết nối KOC/KOL ngách Home & Living với nhãn hàng tại Việt Nam.
          </p>
          <div className="flex gap-2">
            {['🎵', '📘', '📸', '▶', '💼'].map((icon) => (
              <motion.div
                key={icon}
                className="w-9 h-9 rounded-[10px] bg-white/[0.08] flex items-center
                  justify-content-center text-base cursor-pointer"
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
                className="block text-[13px] text-white/50 no-underline mb-2.5
                  hover:text-white transition-colors duration-200">
                {link}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div className="max-w-container mx-auto border-t border-white/[0.08] pt-7
        flex justify-between items-center text-[12px]">
        <span>© 2026 {SITE.name}. Tất cả quyền được bảo lưu.</span>
        <div className="flex gap-5">
          <a href="#" className="text-white/50 hover:text-white no-underline transition-colors">Chính sách bảo mật</a>
          <a href="#" className="text-white/50 hover:text-white no-underline transition-colors">Điều khoản dịch vụ</a>
        </div>
      </div>
    </footer>
  )
}
```

---

## Task 13: Compose page.tsx + Final Build

**Files:**
- Modify: `website/app/page.tsx`

- [ ] **Step 13.1: Compose tất cả sections vào page.tsx**

```tsx
// app/page.tsx
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import Stats from '@/components/sections/Stats'
import FeatureTabs from '@/components/sections/FeatureTabs'
import ServicesGrid from '@/components/sections/ServicesGrid'
import HowItWorks from '@/components/sections/HowItWorks'
import LogoMarquee from '@/components/sections/LogoMarquee'
import Testimonials from '@/components/sections/Testimonials'
import KOCRegistration from '@/components/sections/KOCRegistration'
import BlogPreview from '@/components/sections/BlogPreview'
import CTABanner from '@/components/sections/CTABanner'
import WaveDivider from '@/components/ui/WaveDivider'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WaveDivider from="#fff" to="#fff" />
        <Stats />
        <FeatureTabs />
        <ServicesGrid />
        <HowItWorks />
        <LogoMarquee />
        <Testimonials />
        <KOCRegistration />
        <BlogPreview />
        <CTABanner />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 13.2: Production build**
```bash
cd website && npm run build
```
Expected: ✓ compiled successfully — 0 errors

- [ ] **Step 13.3: Visual QA checklist**
- [ ] Hero gradient + orbs + confetti chạy đúng
- [ ] Promo card glass morphism, overlap đúng vào wave
- [ ] Stats count-up trigger khi scroll vào
- [ ] Feature tabs: layoutId animation mượt khi switch tab
- [ ] Floating badges float up/down liên tục
- [ ] Services grid stagger reveal khi scroll
- [ ] Logo marquee chạy liền mạch không giật
- [ ] Testimonials lift effect khi hover
- [ ] KOC form nhìn clean
- [ ] Footer dark đúng màu

---

## Task 14: Vercel Deployment

- [ ] **Step 14.1: Tạo vercel.json**

```json
{
  "buildCommand": "cd website && npm run build",
  "outputDirectory": "website/.next",
  "framework": "nextjs"
}
```

Hoặc deploy trực tiếp từ thư mục `website/`:

```bash
cd website
npx vercel --prod
```

- [ ] **Step 14.2: Verify trên Vercel**
- Copy preview URL từ Vercel output
- Test trên mobile (Chrome DevTools → iPhone 14)
- Test smooth scroll hoạt động
- Test tất cả animations trigger đúng

---

## Scope: Phase 2 (Kế hoạch riêng)

Các trang này sẽ được plan riêng sau khi homepage hoàn thành:
- `/blog` — Blog listing + bài viết từ Sanity CMS
- `/dich-vu` — Services detail page
- `/koc-network` — KOC registration full page
- `/case-study` — Campaign results
- `/ve-chung-toi` — About page
- Mobile responsive polish
- SEO: sitemap, robots.txt, OpenGraph tags
