"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { 
  FileSearch, 
  CreditCard, 
  Percent, 
  Building2, 
  Clock, 
  MapPin,
  Home,
  Factory,
  Warehouse,
  Construction
} from "lucide-react"

const valueProps = [
  { icon: FileSearch, label: "No Appraisal", description: "Skip the wait and expense of traditional appraisals" },
  { icon: CreditCard, label: "No Hard Credit Check", description: "Protect your credit score during the process" },
  { icon: Percent, label: "100% Rehab Funded", description: "Full financing for your renovation costs" },
  { icon: Building2, label: "Cross-Collateralization", description: "Leverage multiple properties for better terms" },
  { icon: Clock, label: "5-10 Day Close", description: "Move fast on time-sensitive deals" },
  { icon: MapPin, label: "47 States", description: "Active lending everywhere except AK, LA, HI" },
  { icon: Home, label: "Single Family to Multifamily", description: "From starter homes to large apartment complexes" },
  { icon: Factory, label: "Mixed-Use & Commercial", description: "Retail, office, and mixed-use properties" },
  { icon: Warehouse, label: "Industrial & Warehouse", description: "Manufacturing and distribution facilities" },
  { icon: Construction, label: "Ground-Up Development", description: "New construction and development projects" },
]

export function ValueProps() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="value-props" className="py-24 bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-[0.3em] text-primary mb-4">OUR EDGE</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground text-balance">
            Built for Speed. Designed for Scale.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {valueProps.map((prop, index) => (
            <motion.div
              key={prop.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group p-6 bg-muted/50 border border-border rounded-xl hover:border-primary/30 transition-all duration-300"
            >
              <prop.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-semibold text-foreground mb-2">{prop.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{prop.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
