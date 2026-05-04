import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { ValueProps } from "@/components/value-props"
import { Stats } from "@/components/stats"
import { Process } from "@/components/process"
import { Deals } from "@/components/deals"
import { USMap } from "@/components/us-map"
import { BrokerProgram } from "@/components/broker-program"
import { About } from "@/components/about"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navigation />
      <Hero />
      <Deals />
      <ValueProps />
      <Stats />
      <Process />
      <USMap />
      <BrokerProgram />
      <About />
      <Footer />
    </main>
  )
}
