'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, staggerItem, viewport } from '@/lib/animations'
import FloatingBadge from '@/components/ui/FloatingBadge'
import { FEATURE_TABS } from '@/lib/data'
import type { TabMetric } from '@/lib/data'

function UIMetricsMockup({ metrics }: { metrics: TabMetric[] }) {
  return (
    <div className="w-[82%] mx-auto mt-8 bg-white rounded-[16px] overflow-hidden"
      style={{ boxShadow: '0 16px 48px rgba(36,99,235,0.18)' }}>
      <div className="h-8 border-b border-slate-100 flex items-center px-3 gap-1.5"
        style={{ background: '#F8FAFC' }}>
        {['#FF5F57', '#FFBD2E', '#28CA41'].map((c) => (
          <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
        ))}
      </div>
      <div className="p-4">
        <div className="h-2.5 rounded-full w-1/2 mb-2" style={{ background: '#2463EB' }} />
        <div className="h-2.5 bg-slate-200 rounded-full w-4/5 mb-2" />
        <div className="h-2.5 bg-slate-200 rounded-full w-2/3 mb-3" />
        <div className="grid grid-cols-2 gap-2.5">
          {metrics.map((m) => (
            <div key={m.label} className="rounded-[16px] p-3 text-center"
              style={{ background: '#E1F3FE' }}>
              <div className="text-lg font-medium" style={{ color: '#2463EB' }}>{m.value}</div>
              <div className="text-[10px] mt-0.5" style={{ color: '#4B5563' }}>{m.label}</div>
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
    <section className="bg-white" id="services" style={{ paddingTop: '80px', paddingBottom: '125px', paddingLeft: '40px', paddingRight: '40px' }}>
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center mb-11">
          <div className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em]
            px-3.5 py-1.5 rounded-[64px] mb-3.5"
            style={{ background: '#E1F3FE', color: '#2463EB' }}>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#2463EB' }} />
            Giải pháp toàn diện
          </div>
          <h2 className="font-medium leading-[1.2] mb-4"
            style={{ fontSize: '48px', color: '#111827' }}>
            KOC đúng ngách. Performance thực.
          </h2>
          <p className="text-base font-normal leading-[1.3] max-w-[520px] mx-auto"
            style={{ color: '#4B5563' }}>
            Từ booking đơn lẻ đến chiến dịch trọn gói — chúng tôi xử lý mọi thứ trong ngành Home &amp; Living.
          </p>
        </div>

        {/* Tab nav */}
        <div className="flex gap-2 justify-center flex-wrap mb-14">
          {FEATURE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setActiveFeature(0) }}
              className="relative px-5 h-12 rounded-[50px] text-[18px] font-normal
                border border-slate-200 transition-colors duration-200 overflow-hidden cursor-pointer"
              style={{ color: activeTab === tab.id ? '#fff' : '#4B5563' }}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="activeTabBg"
                  className="absolute inset-0 rounded-[50px]"
                  style={{ background: '#2463EB', zIndex: 0 }}
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
            <div className="relative rounded-[16px] overflow-visible flex items-center justify-center py-10"
              style={{ background: 'linear-gradient(135deg, #E1F3FE, #dbeafe)', minHeight: 420 }}>
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
                  className="flex gap-4 p-4 rounded-[16px] border-2 cursor-pointer transition-all duration-200"
                  style={{
                    borderColor: activeFeature === i ? '#2463EB' : 'transparent',
                    background: activeFeature === i ? '#E1F3FE' : 'transparent',
                  }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <motion.div
                    className="w-11 h-11 rounded-[13px] text-white flex items-center
                      justify-center text-xl flex-shrink-0"
                    style={{ background: '#2463EB' }}
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {feat.icon}
                  </motion.div>
                  <div>
                    <h3 className="text-[28px] font-medium leading-[1.2] mb-1" style={{ color: '#111827' }}>{feat.title}</h3>
                    <p className="text-base font-normal leading-[1.3]" style={{ color: '#4B5563' }}>{feat.desc}</p>
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
