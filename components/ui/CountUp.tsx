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
      <motion.span className="text-[44px] font-black leading-none"
        style={{ color: '#1B6DEA' }}>{rounded}</motion.span>
      <span className="text-[28px] font-black" style={{ color: '#1B6DEA' }}>{suffix}</span>
    </div>
  )
}
