'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import CountUp from '@/components/ui/CountUp'
import { STATS } from '@/lib/data'

export default function Stats() {
  return (
    <section className="py-20 px-12 bg-white">
      <motion.div
        className="max-w-[1160px] mx-auto grid grid-cols-4 border border-slate-200 rounded-3xl overflow-hidden"
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
            <p className="text-[13px] font-medium mt-2" style={{ color: '#64748B' }}>{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
