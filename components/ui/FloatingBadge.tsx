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
        flex items-center gap-2 whitespace-nowrap"
      style={{ ...POSITIONS[position], boxShadow: '0 6px 20px rgba(0,0,0,0.12)' }}
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
