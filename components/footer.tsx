"use client"

import Image from "next/image"

export function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo & Info */}
          <div>
            <Image
              src="/images/logo-white.png"
              alt="The Hard Money Co."
              width={200}
              height={50}
              className="h-10 w-auto mb-4"
            />
            <p className="text-lg text-foreground font-medium mt-4">John Quinlan</p>
            <p className="text-muted-foreground">Loan Originator</p>
            <p className="text-sm text-muted-foreground mt-4 max-w-xs">
              Fast, flexible direct lending for sophisticated real estate operators.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-medium tracking-[0.3em] text-foreground mb-4">CONTACT</h4>
            <div className="space-y-2">
              <a 
                href="mailto:john@fstreet.com" 
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                john@fstreet.com
              </a>
              <a 
                href="tel:+14144554705" 
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                (414) 455-4705
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2">
              <span>© 2026 The Hard Money Co.</span>
              <span>·</span>
              <span>NMLS #1234567</span>
              <span>·</span>
              <span>Equal Opportunity Lender</span>
            </div>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#brokers" className="hover:text-foreground transition-colors">Broker Program</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
