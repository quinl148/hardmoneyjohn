"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ComposableMap, Geographies, Geography } from "react-simple-maps"

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"

// FIPS codes for inactive states: AK (02), LA (22), HI (15)
const INACTIVE_FIPS = new Set(["02", "22", "15"])

export function USMap() {
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
          className="text-center mb-12"
        >
          <p className="text-xs font-medium tracking-[0.3em] text-primary mb-4">LENDING FOOTPRINT</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground text-balance">
            Active in 47 States
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-4xl mx-auto"
        >
          <ComposableMap
            projection="geoAlbersUsa"
            projectionConfig={{ scale: 1000 }}
            style={{ width: "100%", height: "auto" }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const fips = geo.id as string
                  const isActive = !INACTIVE_FIPS.has(fips)
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: isActive ? "hsl(217 91% 50% / 0.45)" : "hsl(217 10% 25% / 0.3)",
                          stroke: "hsl(217 91% 60% / 0.25)",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        hover: {
                          fill: isActive ? "hsl(217 91% 60% / 0.7)" : "hsl(217 10% 30% / 0.4)",
                          stroke: "hsl(217 91% 70% / 0.4)",
                          strokeWidth: 0.75,
                          outline: "none",
                        },
                        pressed: { outline: "none" },
                      }}
                    />
                  )
                })
              }
            </Geographies>
          </ComposableMap>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-6">
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 rounded-sm" style={{ background: "hsl(217 91% 50% / 0.45)", border: "1px solid hsl(217 91% 60% / 0.4)" }} />
              <span className="text-sm text-muted-foreground">Active (47 States)</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 rounded-sm" style={{ background: "hsl(217 10% 25% / 0.3)", border: "1px solid hsl(217 91% 60% / 0.25)" }} />
              <span className="text-sm text-muted-foreground">Not Available (AK, HI, LA)</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
