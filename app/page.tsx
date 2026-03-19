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
