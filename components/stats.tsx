"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface StatConfig {
  value: number
  suffix: string
  prefix: string
  label: string
  static?: string
}

const stats: StatConfig[] = [
  { value: 100, suffix: "M+", prefix: "$", label: "Capital Ready to Fund" },
  { value: 1000, suffix: "+", prefix: "", label: "Deals Funded" },
  { value: 47, suffix: " States", prefix: "", label: "Active Lending Footprint" },
  { value: 0, suffix: "", prefix: "", label: "Close Time", static: "7–10 Days" },
]

function AnimatedNumber({ value, prefix, suffix, shouldAnimate, staticDisplay }: {
  value: number
  prefix: string
  suffix: string
  shouldAnimate: boolean
  staticDisplay?: string
}) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!shouldAnimate || staticDisplay) return

    const duration = 2000
    const steps = 60
    const stepDuration = duration / steps
    const increment = value / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setDisplayValue(value)
        clearInterval(timer)
      } else {
        setDisplayValue(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [shouldAnimate, value, staticDisplay])

  if (staticDisplay) {
    return <span>{staticDisplay}</span>
  }

  return (
    <span>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  )
}

export function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  return (
    <section className="py-20 bg-background border-y border-border">
      <div ref={ref} className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x divide-border">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center lg:px-8"
            >
              <p className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-medium text-primary mb-2">
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  shouldAnimate={hasAnimated}
                  staticDisplay={stat.static}
                />
              </p>
              <p className="text-sm text-muted-foreground tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
