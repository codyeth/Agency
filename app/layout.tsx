import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/layout/SmoothScroll'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-be',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'KOCHub Agency — Kết nối KOC Home & Living',
  description: 'Agency chuyên kết nối KOC/KOL ngách Home & Living với nhãn hàng gia dụng tại Việt Nam.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={beVietnamPro.variable} suppressHydrationWarning>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
