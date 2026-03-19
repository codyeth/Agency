# AGENCY WEBSITE — PROMPT ĐẦY ĐỦ CHO AI CODE
> **Nguồn tham khảo:** haravan.com
> **Mục tiêu:** Clone layout + animations → thay nội dung sang agency TikTok/Shopee/Facebook
> **Stack:** Next.js 14 App Router · TypeScript · Tailwind CSS · Framer Motion · GSAP · Lenis

---

## 1. DESIGN TOKENS

```
Colors:
  --blue:        #1B6DEA
  --blue-dark:   #0F4FB8
  --blue-deep:   #0A2240
  --blue-light:  #EEF5FF
  --blue-mid:    #DBEAFE
  --green:       #10B981
  --yellow:      #FCD34D
  --orange:      #F59E0B
  --shopee:      #EE4D2D
  --fb:          #1877F2
  --tiktok:      #FF3B5C

Typography:
  Font: "Be Vietnam Pro" (Google Fonts, preconnect)
  Weights: 400 500 600 700 800 900
  Letter-spacing headings: -0.02em to -0.03em

Spacing:
  section-y:     96px desktop / 64px mobile
  container:     max-width 1160px
  card-radius:   18–24px
  pill-radius:   100px

Shadows:
  card:          0 4px 24px rgba(27,109,234,0.10)
  card-hover:    0 16px 48px rgba(27,109,234,0.18)
  button:        0 4px 14px rgba(27,109,234,0.35)
  float-badge:   0 6px 20px rgba(0,0,0,0.12)
```

---

## 2. DEPENDENCIES

```bash
npm install framer-motion gsap @gsap/react
npm install @studio-freight/lenis
npm install @radix-ui/react-tabs
npm install class-variance-authority clsx tailwind-merge
```

---

## 3. FILE STRUCTURE

```
app/
  layout.tsx          ← SmoothScroll wrapper + font import
  page.tsx            ← compose all sections
components/
  layout/
    Navbar.tsx
    Footer.tsx
  sections/
    Hero.tsx
    Stats.tsx
    FeatureTabs.tsx
    ThemeGallery.tsx
    CRMSection.tsx
    NewFeatures.tsx
    Operations.tsx
    LogoMarquee.tsx
    Testimonials.tsx
    Pricing.tsx
    CTABanner.tsx
  ui/
    FloatingBadge.tsx
    CountUp.tsx
    VideoMockup.tsx
    ChatBubble.tsx
    BubbleDiagram.tsx
    WaveDivider.tsx
```

---

## 4. SMOOTH SCROLL SETUP

```tsx
// app/layout.tsx
'use client'
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'

function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

---

## 5. PAGE COMPOSITION

```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <SmoothScroll>
      <Navbar />
      <main>
        <Hero />
        <WaveDivider />
        <Stats />
        <FeatureTabs />
        <ThemeGallery />
        <CRMSection />
        <NewFeatures />
        <Operations />
        <LogoMarquee />
        <CTABanner variant="mid" />
        <BigStats />
        <Testimonials />
        <Pricing />
        <CTABanner variant="bottom" />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
```

---

## 6. GLOBAL ANIMATION VARIANTS

```tsx
// lib/animations.ts — dùng lại toàn app

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
}

export const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}

export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1, x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
}

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show: {
    opacity: 1, x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] }
  }
}

// viewport config chuẩn
export const viewport = { once: true, margin: '-80px' }
```

---

## SECTION A — NAVBAR

### Specs
- Sticky top, z-index 200
- Height: 64px
- Background: rgba(255,255,255,0.96) + backdrop-filter: blur(16px)
- Border-bottom: 1px solid rgba(0,0,0,0.06)
- Transition: box-shadow 0.3s khi scroll

### Scroll Shadow Effect
```tsx
const { scrollY } = useScroll()
const shadow = useTransform(scrollY, [0, 20], ['none', '0 4px 24px rgba(0,0,0,0.08)'])
// hoặc useMotionValueEvent để toggle class
```

### Logo
- Icon SVG: hình học (shopping bag / chart) 36x36px, border-radius 10px
- Background logo: linear-gradient(135deg, #1B6DEA, #0A2240)
- Text: "GrowAgency", font-weight 900, font-size 21px, letter-spacing -0.5px

### Nav Links
- Hover: background #EEF5FF, color #1B6DEA, border-radius 8px
- Transition: all 180ms ease
- Dropdown indicator: "▾" character

### CTAs
- "Đăng nhập": outline pill, border 1.5px solid #E2E8F0
- "Bắt đầu miễn phí →": filled blue pill, box-shadow 0 4px 14px rgba(27,109,234,0.35)
- Hover: translateY(-1px), shadow tăng

---

## SECTION B — HERO

### Background
```css
background: linear-gradient(160deg, #1B6DEA 0%, #0c3d8e 55%, #071e3d 100%);
min-height: 580px;
overflow: hidden;
position: relative;
```

### EFFECT 1 — Animated Radial Orbs
```css
/* Hai pseudo-elements glow circles */
.hero::before {
  content: '';
  position: absolute;
  width: 600px; height: 600px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99,179,237,0.18) 0%, transparent 70%);
  top: -200px; left: -100px;
  animation: orbMove 12s ease-in-out infinite;
  pointer-events: none;
}
.hero::after {
  width: 500px; height: 500px;
  background: radial-gradient(circle, rgba(167,139,250,0.14) 0%, transparent 70%);
  bottom: -100px; right: -100px;
  animation: orbMove 10s ease-in-out infinite reverse;
}
@keyframes orbMove {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(40px, -30px) scale(1.1); }
}
```

### EFFECT 2 — Floating Confetti Particles
```tsx
// 8 particles, random colors, float up animation
const particles = [
  { size: 10, color: '#FCD34D', left: '8%',  dur: 9,   delay: 0 },
  { size: 7,  color: '#34D399', left: '18%', dur: 7,   delay: 1.2 },
  { size: 12, color: '#F43F5E', left: '28%', dur: 11,  delay: 0.5, square: true },
  { size: 8,  color: '#8B5CF6', left: '72%', dur: 8,   delay: 2 },
  { size: 14, color: '#FCD34D', left: '82%', dur: 10,  delay: 0.8, square: true },
  { size: 6,  color: '#6EE7B7', left: '90%', dur: 7.5, delay: 1.5 },
  { size: 9,  color: '#93C5FD', left: '45%', dur: 9.5, delay: 0.3 },
  { size: 11, color: '#FB7185', left: '58%', dur: 8.5, delay: 1.8, square: true },
]

CSS keyframe:
@keyframes floatUp {
  0%   { transform: translateY(110%) rotate(0deg); opacity: 0; }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.4; }
  100% { transform: translateY(-10px) rotate(360deg); opacity: 0; }
}
// Mỗi particle: animation: floatUp VAR_DUR linear infinite; animation-delay: VAR_DELAY;
```

### EFFECT 3 — Staggered Content Reveal
```tsx
// Dùng Framer Motion, mỗi element có delay tăng dần
<motion.div variants={fadeUp} initial="hidden" animate="show" style={{ animationDelay: '0s' }}>
  {/* Badge */}
</motion.div>
<motion.h1 variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
<motion.p variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
<motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.3 }}>
  {/* CTA buttons */}
</motion.div>
<motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.4 }}>
  {/* Promo card */}
</motion.div>
```

### EFFECT 4 — Underline Expand Animation
```tsx
// "Vượt Trội" hoặc keyword highlight
<span className="relative inline-block">
  Vượt Trội
  <motion.span
    className="absolute bottom-[-4px] left-0 right-0 h-[3px] rounded-full"
    style={{ background: 'linear-gradient(90deg, #FCD34D, #F59E0B)' }}
    initial={{ scaleX: 0, originX: 0 }}
    animate={{ scaleX: 1 }}
    transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
  />
</span>
```

### EFFECT 5 — Live Badge Pulse Dot
```tsx
<span className="inline-block w-2 h-2 rounded-full bg-emerald-400"
  style={{ animation: 'livePulse 2s infinite' }} />

@keyframes livePulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.5); }
  50%       { box-shadow: 0 0 0 6px rgba(52,211,153,0); }
}
```

### Hero Promo Card
```
Layout: grid 3 cols với 1px dividers
Background: rgba(255,255,255,0.10)
backdrop-filter: blur(20px)
border: 1px solid rgba(255,255,255,0.18)
border-radius: 24px
padding: 32px 48px
margin-bottom: -52px  ← overlap vào section phía dưới
z-index: 2

Nội dung:
  Col 1: Badge "TẶNG" + "100%" + "Phí setup gian hàng tháng đầu"
  Col 2: Badge "GIẢM" + "50%" + "Chi phí vận hành 3 tháng đầu"
  Col 3: Badge "MIỄN PHÍ" + "14" + "Ngày dùng thử toàn bộ tính năng"

Badge style: background rgba(52,211,153,0.22), color #6EE7B7,
  font-size 10px, font-weight 800, text-transform uppercase, letter-spacing 1px
```

---

## SECTION C — STATS COUNTER

### Container
```css
border: 1.5px solid #E2E8F0;
border-radius: 24px;
overflow: hidden;
display: grid;
grid-template-columns: repeat(4, 1fr);
/* mỗi col border-right: 1.5px solid #E2E8F0 */
```

### Count-Up với Framer Motion
```tsx
// CountUp.tsx
'use client'
import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring, useTransform, motion } from 'framer-motion'

export function CountUp({ target, suffix = '', duration = 1400 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const count = useMotionValue(0)
  const spring = useSpring(count, { duration, bounce: 0 })
  const rounded = useTransform(spring, (val) =>
    target < 20 ? val.toFixed(1).replace('.0', '') : Math.round(val).toLocaleString()
  )

  useEffect(() => {
    if (isInView) count.set(target)
  }, [isInView])

  return (
    <div ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </div>
  )
}
```

### Stagger Reveal
```tsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: '-50px' }}
>
  {stats.map((stat) => (
    <motion.div key={stat.label} variants={staggerItem}>
      <CountUp target={stat.value} suffix={stat.suffix} />
      <p>{stat.label}</p>
    </motion.div>
  ))}
</motion.div>
```

---

## SECTION D — FEATURE TABS

### Tab Nav — Shared Layout Animation
```tsx
// Framer Motion layoutId cho active indicator
const [activeTab, setActiveTab] = useState('tiktok')

{tabs.map((tab) => (
  <button
    key={tab.id}
    onClick={() => setActiveTab(tab.id)}
    className="relative px-5 py-2.5 rounded-full text-sm font-semibold"
  >
    {activeTab === tab.id && (
      <motion.span
        layoutId="activeTabBg"
        className="absolute inset-0 bg-blue-600 rounded-full"
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    )}
    <span className="relative z-10">{tab.label}</span>
  </button>
))}
```

### Panel Switch — AnimatePresence
```tsx
<AnimatePresence mode="wait">
  <motion.div
    key={activeTab}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.25 }}
  >
    {/* Panel content */}
  </motion.div>
</AnimatePresence>
```

### Visual Mockup với Floating Badges
```tsx
// VideoMockup.tsx
// STRUCTURE:
<div className="relative aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
  {/* Browser frame */}
  <div className="w-[82%] aspect-video bg-white rounded-xl shadow-xl mx-auto mt-8">
    <div className="h-8 bg-slate-50 border-b flex items-center px-3 gap-1.5">
      {/* Traffic lights */}
      <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
    </div>
    {/* Video or UI mockup */}
    {src ? (
      <video autoPlay loop muted playsInline className="w-full h-full object-cover" src={src} />
    ) : (
      <UIFallbackMockup metrics={metrics} />
    )}
  </div>

  {/* Floating badges */}
  <FloatingBadge position="top-right" icon="📈" value="+800%" label="Doanh thu / tháng" color="green" delay={0} />
  <FloatingBadge position="bottom-left" icon="🛒" value="2,340" label="Đơn hôm nay" color="blue" delay={0.8} />
  <FloatingBadge position="middle-left" icon="🏆" value="Top 10" label="TikTok Partner" delay={0.4} />
</div>
```

### FloatingBadge Component
```tsx
// FloatingBadge.tsx
const positions = {
  'top-right':    { top: '14%', right: '-6%' },
  'bottom-left':  { bottom: '14%', left: '-5%' },
  'middle-left':  { top: '45%', left: '-6%' },
}

export function FloatingBadge({ position, icon, value, label, color, delay = 0 }) {
  return (
    <motion.div
      className="absolute z-10 bg-white rounded-xl px-3 py-2 text-xs font-bold shadow-lg flex items-center gap-2 whitespace-nowrap"
      style={positions[position]}
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      <span className="text-base">{icon}</span>
      <div>
        <div style={{ color: colorMap[color] }} className="text-sm font-black">{value}</div>
        <div className="text-slate-400 font-medium" style={{ fontSize: 10 }}>{label}</div>
      </div>
    </motion.div>
  )
}
```

### Feature List — Active Item Highlight
```tsx
{features.map((feat, i) => (
  <motion.div
    key={i}
    onClick={() => setActive(i)}
    className={`flex gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
      active === i
        ? 'bg-blue-50 border-blue-600'
        : 'border-transparent hover:bg-blue-50 hover:border-blue-600'
    }`}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
  >
    <motion.div
      className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl flex-shrink-0"
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 400 }}
    >
      {feat.icon}
    </motion.div>
    <div>
      <h3 className="font-bold text-sm mb-1">{feat.title}</h3>
      <p className="text-slate-500 text-xs leading-relaxed">{feat.desc}</p>
    </div>
  </motion.div>
))}
```

---

## SECTION E — THEME GALLERY (Dual Row Scroll)

### Background
```css
background: #1B6DEA; /* solid blue */
border-radius: 32px 32px 0 0; /* bo góc trên */
padding: 72px 0;
overflow: hidden;
```

### Dual Infinite Scroll
```tsx
// Row 1: scroll LEFT (← direction)
// Row 2: scroll RIGHT (→ direction) - ngược chiều nhau
// Mỗi row nhân đôi items để loop liền mạch

<div className="flex flex-col gap-4">
  {/* Row 1 — scroll left */}
  <div className="overflow-hidden">
    <motion.div
      className="flex gap-4"
      animate={{ x: ['0%', '-50%'] }}
      transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
    >
      {[...themes, ...themes].map((theme, i) => (
        <ThemeCard key={i} {...theme} />
      ))}
    </motion.div>
  </div>

  {/* Row 2 — scroll right */}
  <div className="overflow-hidden">
    <motion.div
      className="flex gap-4"
      animate={{ x: ['-50%', '0%'] }}
      transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
    >
      {[...themes2, ...themes2].map((theme, i) => (
        <ThemeCard key={i} {...theme} />
      ))}
    </motion.div>
  </div>
</div>
```

### ThemeCard
```tsx
function ThemeCard({ image, label }) {
  return (
    <motion.div
      className="relative w-48 aspect-[3/4] rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img src={image} alt={label} className="w-full h-full object-cover" />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      <span className="absolute bottom-3 left-3 text-white text-sm font-bold">{label}</span>
    </motion.div>
  )
}
```

---

## SECTION F — CRM / AI CHAT

### Layout
```
2 cột: [Phone mockup] | [Text content]
Background: #EEF5FF
Padding: 96px 48px
```

### Phone Chat Animation
```tsx
// ChatBubble.tsx — staggered message reveal
const messages = [
  { type: 'bot',  text: 'Xin chào! Bạn muốn tìm hiểu gói dịch vụ nào? 🛒' },
  { type: 'user', text: 'Tôi muốn vận hành TikTok Shop' },
  { type: 'bot',  text: 'Tuyệt vời! Chúng tôi là Top 10 TikTok Shop Partner. Doanh nghiệp bạn đang bán ngành hàng gì?' },
  { type: 'user', text: 'Mỹ phẩm và skincare' },
]

const delays = [0.5, 1.2, 2.0, 2.8]

{messages.map((msg, i) => (
  <motion.div
    key={i}
    className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
      msg.type === 'bot'
        ? 'bg-blue-50 text-slate-900 self-start rounded-bl-sm'
        : 'bg-blue-600 text-white self-end rounded-br-sm'
    }`}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delays[i], duration: 0.5 }}
  >
    {msg.text}
  </motion.div>
))}

// Typing indicator trước mỗi bot message
<motion.div
  className="flex gap-1 p-2"
  initial={{ opacity: 0 }}
  animate={{ opacity: [0, 1, 1, 0] }}
  transition={{ delay: delays[i] - 0.5, duration: 0.6 }}
>
  {[0, 0.16, 0.32].map((d, j) => (
    <span key={j} className="w-1.5 h-1.5 rounded-full bg-slate-400"
      style={{ animation: `typing 1s ${d}s infinite` }} />
  ))}
</motion.div>

@keyframes typing {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40%            { transform: scale(1); opacity: 1; }
}
```

### Floating Cards xung quanh phone
```tsx
// 3 cards dạng FloatingBadge, same pattern như Feature Tabs
<FloatingBadge position="top-right"  icon="💬" value="98%"  label="Phản hồi trong 1 phút" />
<FloatingBadge position="bottom-left" icon="🤖" value="24/7" label="AI Chat hoạt động" />
<FloatingBadge position="middle-left" icon="⚡" value="2s"   label="Tốc độ phản hồi" />
```

---

## SECTION G — OPERATIONS (Alternating + Bubble Diagram)

### Alternating Layout
```tsx
// ops-items alternate: even = reverse layout
{opsItems.map((item, i) => (
  <motion.div
    className={`grid grid-cols-2 gap-16 items-center max-w-5xl mx-auto mb-20 ${
      i % 2 === 1 ? 'direction-rtl' : ''
    }`}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: '-100px' }}
  >
    <motion.div variants={i % 2 === 0 ? slideInLeft : slideInRight}>
      {/* Visual mockup */}
    </motion.div>
    <motion.div variants={i % 2 === 0 ? slideInRight : slideInLeft}>
      {/* Text content */}
    </motion.div>
  </motion.div>
))}
```

### Bubble Diagram Animation (Inventory section)
```tsx
// BubbleDiagram.tsx
// Icon circle ở giữa, pills xung quanh theo 8 hướng

const pills = [
  'Chi tiết tồn kho', 'Đặt hàng', 'Nhập hàng',
  'Trả hàng nhập', 'Nhà cung cấp', 'Kiểm kho', 'Điều chuyển'
]

// Vị trí theo góc, distributed around center circle
const positions = [
  { top: '0%',   left: '50%',   transform: 'translate(-50%, 0)' },   // top
  { top: '15%',  right: '0%',   transform: 'translateX(0)' },         // top-right
  { top: '50%',  right: '0%',   transform: 'translateY(-50%)' },      // right
  { bottom: '15%', right: '0%' },                                       // bottom-right
  { bottom: '0%', left: '50%',  transform: 'translate(-50%, 0)' },    // bottom
  { bottom: '15%', left: '0%' },                                        // bottom-left
  { top: '50%',  left: '0%',   transform: 'translateY(-50%)' },       // left
]

const [activePill, setActivePill] = useState(0)

useEffect(() => {
  const interval = setInterval(() => {
    setActivePill((prev) => (prev + 1) % pills.length)
  }, 1200)
  return () => clearInterval(interval)
}, [])

// Center icon
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
  w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center
  text-2xl z-10 shadow-lg">
  📦
</div>

// Pills
{pills.map((pill, i) => (
  <motion.div
    key={i}
    className={`absolute px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap
      ${activePill === i
        ? 'bg-blue-600 text-white shadow-lg'
        : 'bg-white text-slate-700 shadow-md'
      }`}
    style={positions[i]}
    animate={activePill === i ? { scale: 1.1 } : { scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    {pill}
  </motion.div>
))}
```

### Video Play Button Overlay
```tsx
<div className="relative">
  <img src={poster} alt="" className="w-full rounded-xl" />
  <motion.button
    className="absolute inset-0 flex items-center justify-center"
    onClick={() => setPlaying(true)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="w-14 h-14 rounded-full bg-black/70 text-white
      flex items-center justify-center text-xl
      hover:bg-blue-600/90 transition-colors duration-200">
      ▶
    </div>
  </motion.button>
</div>
```

### Operations Item — Scroll Reveal với left/right slide
```tsx
Odd items:  Visual slides from LEFT, Text slides from RIGHT
Even items: Visual slides from RIGHT, Text slides from LEFT
Dùng variants slideInLeft / slideInRight đã định nghĩa ở section 6
```

---

## SECTION H — LOGO MARQUEE

### Seamless Infinite Loop
```tsx
// Clone toàn bộ list, animate -50%
<div className="relative overflow-hidden">
  {/* Fade edges */}
  <div className="absolute left-0 top-0 bottom-0 w-28 z-10
    bg-gradient-to-r from-white to-transparent pointer-events-none" />
  <div className="absolute right-0 top-0 bottom-0 w-28 z-10
    bg-gradient-to-l from-white to-transparent pointer-events-none" />

  <motion.div
    className="flex"
    animate={{ x: ['0%', '-50%'] }}
    transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
    // Pause on hover via CSS: .track:hover { animation-play-state: paused }
  >
    {[...logos, ...logos].map((logo, i) => (
      <div key={i} className="px-8 py-4 text-sm font-bold text-slate-400
        border-r border-slate-100 whitespace-nowrap hover:text-blue-600
        transition-colors cursor-default">
        {logo.name}
      </div>
    ))}
  </motion.div>
</div>
```

---

## SECTION I — NEW FEATURES CARDS (Horizontal Scroll)

### Container
```tsx
<div className="overflow-x-auto pb-4 -mx-12 px-12 scroll-smooth"
  style={{ scrollbarWidth: 'none' }}>
  <motion.div
    className="flex gap-5"
    drag="x"
    dragConstraints={{ left: -(cards.length * 300 - window.innerWidth + 96), right: 0 }}
    style={{ cursor: 'grab' }}
    whileDrag={{ cursor: 'grabbing' }}
  >
    {cards.map((card, i) => (
      <FeatureCard key={i} {...card} index={i} />
    ))}
  </motion.div>
</div>
```

### FeatureCard
```tsx
function FeatureCard({ title, desc, badge, icon, index }) {
  return (
    <motion.div
      className="min-w-[280px] bg-white rounded-2xl p-6 border border-slate-100 flex-shrink-0 relative"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      whileHover={{
        y: -6,
        boxShadow: '0 16px 40px rgba(27,109,234,0.14)',
        transition: { type: 'spring', stiffness: 400, damping: 20 }
      }}
    >
      {badge && (
        <span className="absolute top-4 right-4 text-[10px] font-black uppercase
          tracking-wider text-white px-2 py-0.5 rounded bg-gradient-to-r
          from-orange-400 to-red-500">
          {badge}
        </span>
      )}
      <div className="text-2xl mb-3">{icon}</div>
      <h3 className="font-bold text-sm mb-2">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </motion.div>
  )
}
```

---

## SECTION J — TESTIMONIALS

### Card với Lift Effect
```tsx
<motion.div
  className="bg-white rounded-2xl p-8"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: index * 0.1 }}
  whileHover={{
    y: -5,
    boxShadow: '0 16px 40px rgba(27,109,234,0.12)'
  }}
>
  <div className="text-amber-400 text-sm tracking-widest mb-4">★★★★★</div>
  <p className="text-sm leading-relaxed italic text-slate-800 mb-5">{quote}</p>
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 rounded-full text-white font-black text-base
      flex items-center justify-center"
      style={{ background: authorGradient }}>
      {name[0]}
    </div>
    <div>
      <div className="text-sm font-bold">{name}</div>
      <div className="text-xs text-slate-400">{role}</div>
    </div>
  </div>
</motion.div>
```

---

## SECTION K — PRICING

### Featured Card (middle)
```tsx
// Middle card: bg blue, text white, scale slightly larger
// Use relative + transform scale(1.04) on featured card
// OR just use border + bg change

<div className={`border-2 rounded-2xl p-9 relative ${
  featured
    ? 'border-blue-600 bg-blue-600 text-white'
    : 'border-slate-200 bg-white hover:border-blue-600'
}`}>
  {featured && (
    <span className="absolute top-5 right-5 text-[10px] font-black uppercase
      tracking-wider bg-amber-400 text-white px-2.5 py-1 rounded-full">
      Phổ biến nhất
    </span>
  )}
  {/* content */}
</div>
```

### Scroll Reveal với Stagger
```tsx
<motion.div
  className="grid grid-cols-3 gap-6 mt-12"
  variants={staggerContainer}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, margin: '-80px' }}
>
  {plans.map((plan, i) => (
    <motion.div key={i} variants={staggerItem}>
      <PricingCard {...plan} />
    </motion.div>
  ))}
</motion.div>
```

---

## SECTION L — CTA BANNER (Bottom)

### Background + Decorative Circles
```tsx
<section className="relative overflow-hidden text-center py-24 px-12"
  style={{ background: 'linear-gradient(155deg, #1B6DEA 0%, #0A2240 100%)' }}>
  {/* Decorative static circles */}
  <div className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full
    bg-white/[0.04] pointer-events-none" />
  <div className="absolute -bottom-24 -right-12 w-[400px] h-[400px] rounded-full
    bg-white/[0.04] pointer-events-none" />

  <div className="relative z-10">
    <motion.h2
      className="text-4xl md:text-5xl font-black text-white mb-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      Dễ bắt đầu · Dễ bán hàng<br />Dễ tăng trưởng
    </motion.h2>
    <p className="text-white/70 text-lg mb-10">
      Trải nghiệm toàn bộ dịch vụ miễn phí 14 ngày
    </p>
    <div className="flex gap-4 justify-center">
      <motion.a
        href="#"
        className="inline-flex items-center gap-2 px-9 py-4 bg-white text-blue-600
          font-black text-base rounded-full shadow-xl"
        whileHover={{ y: -3, boxShadow: '0 14px 36px rgba(0,0,0,0.24)' }}
        whileTap={{ scale: 0.97 }}
      >
        🚀 Bắt đầu miễn phí ngay
      </motion.a>
      <motion.a
        href="#"
        className="inline-flex items-center gap-2 px-9 py-4 bg-white/10
          border border-white/30 text-white font-bold text-base rounded-full"
        whileHover={{ background: 'rgba(255,255,255,0.18)' }}
      >
        📞 Tư vấn 1:1
      </motion.a>
    </div>
  </div>
</section>
```

---

## SECTION M — FOOTER

### Layout
```tsx
<footer className="bg-[#060F1E] text-white/55 pt-18 pb-9 px-12">
  <div className="max-w-5xl mx-auto grid grid-cols-[2.2fr_1fr_1fr_1fr] gap-13 mb-13">
    {/* Brand col */}
    <div>
      <div className="text-xl font-black text-white mb-3.5">GrowAgency ✦</div>
      <p className="text-xs leading-7 max-w-[240px] mb-6">
        Giải pháp marketing đa kênh toàn diện...
      </p>
      <div className="flex gap-2">
        {['🎵','📘','📸','▶','💼'].map((icon, i) => (
          <motion.div
            key={i}
            className="w-9 h-9 rounded-xl bg-white/[0.08] flex items-center justify-center
              text-base cursor-pointer"
            whileHover={{ background: '#1B6DEA' }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
        ))}
      </div>
    </div>
    {/* Link cols x3 */}
  </div>
  {/* Bottom bar */}
  <div className="max-w-5xl mx-auto border-t border-white/[0.08] pt-7
    flex justify-between text-xs">
    <span>© 2025 GrowAgency. Tất cả quyền được bảo lưu.</span>
    <div className="flex gap-5">
      <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
      <a href="#" className="hover:text-white transition-colors">Điều khoản dịch vụ</a>
    </div>
  </div>
</footer>
```

---

## SECTION N — WAVE DIVIDER

```tsx
// WaveDivider.tsx — dùng giữa Hero và Stats
export function WaveDivider({ from = '#EEF5FF', to = '#fff' }) {
  return (
    <svg
      viewBox="0 0 1440 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', background: to }}
    >
      <path
        d="M0 0C360 64 720 64 1080 32C1260 16 1380 0 1440 0V64H0V0Z"
        fill={from}
      />
    </svg>
  )
}
```

---

## RESPONSIVE RULES

```
Mobile < 768px:
  - Feature tabs → vertical accordion (Radix UI Accordion)
  - Bubble diagram: hidden (display: none)
  - Hero card: flex-col, 1 cột
  - Floating badges: hidden
  - Footer: 1 cột
  - Ops sections: 1 cột, visual trên text dưới
  - Section padding: 64px 20px

Tablet 768–1024px:
  - Feature tabs grid: 1fr 1fr vẫn ok
  - Services: 2 cột
  - Stats: 2x2 grid

Desktop > 1024px:
  - Full layout như đã mô tả
```

---

## PERFORMANCE NOTES

```
1. use client chỉ ở components có animation/interaction
2. Server components cho static sections (Footer, WaveDivider)
3. next/image cho tất cả <img> tags
4. Video: lazy load, chỉ play khi visible (IntersectionObserver)
5. Lenis: dynamic import để tránh SSR crash
6. GSAP: chỉ dùng cho Bubble Diagram (complex path animation)
   Framer Motion cho tất cả cases còn lại
7. Preconnect Google Fonts trong <head>
8. Không dùng @keyframes inline trong JSX
   → Đặt tất cả trong globals.css
```

---

## GLOBALS.CSS — Keyframes

```css
/* globals.css */
@keyframes floatUp {
  0%   { transform: translateY(110%) rotate(0deg); opacity: 0; }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.4; }
  100% { transform: translateY(-10px) rotate(360deg); opacity: 0; }
}

@keyframes orbMove {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50%       { transform: translate(40px, -30px) scale(1.1); }
}

@keyframes livePulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(52,211,153,0.5); }
  50%       { box-shadow: 0 0 0 6px rgba(52,211,153,0); }
}

@keyframes typing {
  0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
  40%            { transform: scale(1); opacity: 1; }
}

/* Hide scrollbar */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```

---

*Generated March 2026 — phân tích chi tiết haravan.com*
*Dành cho dự án agency website: TikTok · Shopee · Facebook*
