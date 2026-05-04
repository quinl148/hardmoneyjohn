"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Calculator, Lock } from "lucide-react"

export function LoanCalculator() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [gateForm, setGateForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [calcForm, setCalcForm] = useState({
    loanAmount: "",
    propertyType: "",
    dealType: "",
  })

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Calculator unlocked:", gateForm)
    setIsUnlocked(true)
  }

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Calculate terms:", calcForm)
  }

  return (
    <section id="calculator" className="py-24 bg-card">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-medium tracking-[0.3em] text-primary mb-4">LOAN CALCULATOR</p>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground text-balance">
            Get Your Estimated Terms
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-muted/50 border border-border rounded-2xl p-8"
        >
          {!isUnlocked ? (
            /* Gate Form */
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground text-center mb-2">
                Unlock the Calculator
              </h3>
              <p className="text-muted-foreground text-center mb-6">
                Enter your details to access our loan calculator and get estimated terms.
              </p>

              <form onSubmit={handleUnlock} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="gate-firstName" className="block text-sm font-medium text-foreground mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="gate-firstName"
                      required
                      value={gateForm.firstName}
                      onChange={(e) => setGateForm({ ...gateForm, firstName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="gate-lastName" className="block text-sm font-medium text-foreground mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="gate-lastName"
                      required
                      value={gateForm.lastName}
                      onChange={(e) => setGateForm({ ...gateForm, lastName: e.target.value })}
                      className="w-full px-4 py-2.5 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="gate-email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    id="gate-email"
                    required
                    value={gateForm.email}
                    onChange={(e) => setGateForm({ ...gateForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label htmlFor="gate-phone" className="block text-sm font-medium text-foreground mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="gate-phone"
                    required
                    value={gateForm.phone}
                    onChange={(e) => setGateForm({ ...gateForm, phone: e.target.value })}
                    className="w-full px-4 py-2.5 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
                >
                  Unlock Calculator
                </button>
              </form>
            </div>
          ) : (
            /* Calculator Form */
            <div>
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10">
                <Calculator className="w-8 h-8 text-primary" />
              </div>

              <form onSubmit={handleCalculate} className="max-w-lg mx-auto space-y-6">
                <div>
                  <label htmlFor="loanAmount" className="block text-sm font-medium text-foreground mb-1.5">
                    Loan Amount
                  </label>
                  <input
                    type="text"
                    id="loanAmount"
                    placeholder="$500,000"
                    value={calcForm.loanAmount}
                    onChange={(e) => setCalcForm({ ...calcForm, loanAmount: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-foreground mb-1.5">
                    Property Type
                  </label>
                  <select
                    id="propertyType"
                    value={calcForm.propertyType}
                    onChange={(e) => setCalcForm({ ...calcForm, propertyType: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select property type</option>
                    <option value="single-family">Single Family</option>
                    <option value="multifamily">Multifamily (2-4 units)</option>
                    <option value="multifamily-5+">Multifamily (5+ units)</option>
                    <option value="mixed-use">Mixed-Use</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial/Warehouse</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dealType" className="block text-sm font-medium text-foreground mb-1.5">
                    Deal Type
                  </label>
                  <select
                    id="dealType"
                    value={calcForm.dealType}
                    onChange={(e) => setCalcForm({ ...calcForm, dealType: e.target.value })}
                    className="w-full px-4 py-3 bg-background border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="">Select deal type</option>
                    <option value="purchase">Purchase</option>
                    <option value="refinance">Refinance</option>
                    <option value="construction">Construction</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
                >
                  Calculate Terms
                </button>
              </form>

              {/* Output Placeholder */}
              <div className="mt-8 p-6 bg-background border border-border rounded-xl text-center">
                <p className="text-muted-foreground">
                  Your estimated terms will appear here
                </p>
                <p className="text-xs text-muted-foreground/60 mt-2">
                  AI-powered term estimation coming soon
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
