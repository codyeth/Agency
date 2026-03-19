'use client'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem } from '@/lib/animations'
import CountUp from '@/components/ui/CountUp'
import { STATS } from '@/lib/data'

export default function Stats() {
  return (
    <section className="bg-white" style={{ paddingTop: '80px', paddingBottom: '125px', paddingLeft: '40px', paddingRight: '40px' }}>
      <motion.div
        className="max-w-[1280px] mx-auto grid grid-cols-4 border border-slate-200 rounded-[16px] overflow-hidden"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.05 }}
      >
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={staggerItem}
            className={`py-10 px-8 text-center ${i < STATS.length - 1 ? 'border-r border-slate-200' : ''}`}
          >
            <CountUp target={stat.value} suffix={stat.suffix} />
            <p className="text-[14px] font-normal mt-2" style={{ color: '#4B5563' }}>{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
