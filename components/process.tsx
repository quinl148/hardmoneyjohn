"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { FileText, Search, FileCheck, Building } from "lucide-react"

const steps = [
  {
    icon: FileText,
    day: "Day 1",
    title: "Application & Docs",
    description: "Property address, ID, entity docs, photos, scope of work",
  },
  {
    icon: Search,
    day: "24 Hours",
    title: "Underwriting & Approval",
    description: "Plaid verification, credit screenshot, full review",
  },
  {
    icon: FileCheck,
    day: "Terms Issued",
    title: "Review & Accept",
    description: "Borrower reviews terms and signs commitment letter",
  },
  {
    icon: Building,
    day: "~5 Days",
    title: "Title Ready & Funded",
    description: "Close and fund. Capital in hand.",
  },
]

export function Process() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[0.3em] text-primary mb-4">THE PROCESS</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground text-balance">
            From Application to Funded in Days
          </h2>
        </motion.div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Connector Line */}
          <div className="absolute top-16 left-0 right-0 h-0.5 bg-border">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-primary origin-left"
            />
          </div>

          <div className="grid grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.15 }}
                className="relative text-center"
              >
                {/* Icon Circle */}
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-muted border-2 border-primary/30 flex items-center justify-center relative z-10">
                  <step.icon className="w-12 h-12 text-primary" />
                </div>
                
                <p className="text-xs font-medium tracking-[0.2em] text-primary mb-2">{step.day}</p>
                <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-full bg-muted border-2 border-primary/30 flex items-center justify-center">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
              </div>
              <div className="flex-1 pt-2">
                <p className="text-xs font-medium tracking-[0.2em] text-primary mb-1">{step.day}</p>
                <h3 className="text-lg font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
