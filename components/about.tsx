"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src="/images/john.jpg"
                alt="John Quinlan"
                fill
                className="object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-primary/30 rounded-2xl" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-xs font-medium tracking-[0.3em] text-primary mb-4">ABOUT</p>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-6 leading-tight">
              John Quinlan
            </h2>
            <p className="text-xl text-muted-foreground mb-4">
              Loan Originator · The Hard Money Co.
            </p>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I&apos;ve spent my career understanding what real estate operators actually need: speed, certainty, and a capital partner who picks up the phone.
              </p>
              <p>
                At The Hard Money Co., we&apos;ve built a lending platform that eliminates the friction of traditional financing. No appraisals. No hard credit pulls. No prepayment penalties. Just fast, flexible capital that closes when others can&apos;t.
              </p>
              <p>
                Whether you&apos;re a seasoned investor scaling your portfolio or a broker looking for a reliable capital partner, I&apos;m here to help you move faster.
              </p>
            </div>
            <div className="mt-8 flex gap-4">
              <a
                href="#contact"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
