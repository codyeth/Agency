// lib/animations.ts
import { Variants } from 'framer-motion'
import type { UseInViewOptions } from 'framer-motion'

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

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export const viewport: Pick<UseInViewOptions, 'once' | 'margin'> = { once: true, margin: '-80px' }
