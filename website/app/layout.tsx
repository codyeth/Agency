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
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}
