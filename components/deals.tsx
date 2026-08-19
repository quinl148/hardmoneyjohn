"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ArrowRight } from "lucide-react"

const dealsRaw = [
  { image: "/images/deals/100 Post Road Photo.jpg", type: "PURCHASE", amount: "$3,165,000", city: "Mays Landing", state: "NJ" },
  { image: "/images/deals/3723-w-michael-dr-site-photo.jpg", type: "REFINANCE", amount: "$2,700,000", city: "Teton", state: "WY" },
  { image: "/images/deals/1532-oklahoma-site-photo.png", type: "PURCHASE", amount: "$2,800,000", city: "Milwaukee", state: "WI" },
  { image: "/images/deals/nw-17th-ave-site-photo.jpg", type: "REFINANCE", amount: "$18,500,000", city: "Miami", state: "FL" },
  { image: "/images/deals/nw-17th-ave-site-photo.jpg", type: "REFINANCE", amount: "$9,500,000", city: "Miami", state: "FL" },
  { image: "/images/deals/9601-atlantic-avenue-unit-207-site-photo.jpg", type: "REFINANCE", amount: "$780,000", city: "Wildwood", state: "NJ" },
  { image: "/images/deals/2302-nw-38th-street-site-photo.jpg", type: "PURCHASE", amount: "$1,026,050", city: "Lawton", state: "OK" },
  { image: "/images/deals/416-morris-avenue-site-photo.jpg", type: "PURCHASE", amount: "$540,000", city: "Mundelein", state: "IL" },
  { image: "/images/deals/2862-s-keeley-street-site-photo.jpg", type: "PURCHASE", amount: "$371,000", city: "Chicago", state: "IL" },
  { image: "/images/deals/2-heather-road-site-photo.jpg", type: "PURCHASE", amount: "$285,000", city: "Hamden", state: "CT" },
  { image: "/images/deals/130-w-freemason-street-site-photo.jpg", type: "REFINANCE", amount: "$276,250", city: "Edenton", state: "NC" },
  { image: "/images/deals/6342-s-eberhart-ave-site-photo.jpg", type: "PURCHASE", amount: "$267,500", city: "Chicago", state: "IL" },
  { image: "/images/deals/541-westchester-hills-lane-site-photo.jpg", type: "PURCHASE", amount: "$257,000", city: "Valrico", state: "FL" },
  { image: "/images/deals/3543-s-17th-street-site-photo.jpg", type: "PURCHASE", amount: "$224,500", city: "Milwaukee", state: "WI" },
  { image: "/images/deals/18403-stoepel-st-site-photo.jpg", type: "PURCHASE", amount: "$232,025", city: "Detroit", state: "MI" },
  { image: "/images/deals/18001-stansbury-site-photo.jpg", type: "PURCHASE", amount: "$230,000", city: "Detroit", state: "MI" },
  { image: "/images/deals/2507-rader-street-site-photo.jpg", type: "PURCHASE", amount: "$227,700", city: "Indianapolis", state: "IN" },
  { image: "/images/deals/251-chandler-st-site-photo.jpg", type: "REFINANCE", amount: "$225,000", city: "Detroit", state: "MI" },
  { image: "/images/deals/16853-log-cabin-st-site-photo.jpg", type: "PURCHASE", amount: "$211,250", city: "Highland Park", state: "MI" },
  { image: "/images/deals/6809-s-calumet-avenue-site-photo.jpg", type: "PURCHASE", amount: "$195,000", city: "Chicago", state: "IL" },
  { image: "/images/deals/503-madison-street-site-photo.jpg", type: "PURCHASE", amount: "$174,620", city: "Huntsville", state: "AR" },
  { image: "/images/deals/228-154th-place-site-photo.jpg", type: "PURCHASE", amount: "$156,000", city: "Calumet City", state: "IL" },
  { image: "/images/deals/26814-n-genesee-st-site-photo.jpg", type: "PURCHASE", amount: "$157,150", city: "Wauconda", state: "IL" },
  { image: "/images/deals/2224-golden-falcon-drive-site-photo.jpg", type: "PURCHASE", amount: "$159,375", city: "Ruskin", state: "FL" },
  { image: "/images/deals/1536-s-11th-street-site-photo.jpg", type: "PURCHASE", amount: "$144,800", city: "Milwaukee", state: "WI" },
  { image: "/images/deals/19201-genesee-road-site-photo.jpg", type: "PURCHASE", amount: "$126,600", city: "Euclid", state: "OH" },
  { image: "/images/deals/401-thomas-street-site-photo.jpg", type: "PURCHASE", amount: "$125,590", city: "Fond du Lac", state: "WI" },
  { image: "/images/deals/1950-lawrence-st-site-photo.jpg", type: "PURCHASE", amount: "$116,800", city: "Warren", state: "MI" },
  { image: "/images/deals/18717-barlow-street-site-photo.jpg", type: "REFINANCE", amount: "$100,750", city: "Detroit", state: "MI" },
  { image: "/images/deals/2239-s-59th-street-site-photo.jpg", type: "PURCHASE", amount: "$100,000", city: "West Allis", state: "WI" },
  { image: "/images/deals/434-edgecombe-street-site-photo.jpg", type: "REFINANCE", amount: "$97,000", city: "Rocky Mount", state: "NC" },
  { image: "/images/deals/4959-gateshead-st-site-photo.jpg", type: "REFINANCE", amount: "$85,000", city: "Detroit", state: "MI" },
  { image: "/images/deals/18418-joann-ave-site-photo.jpg", type: "PURCHASE", amount: "$81,000", city: "Detroit", state: "MI" },
  { image: "/images/deals/530-woodlawn-drive-site-photo.jpg", type: "REFINANCE", amount: "$80,000", city: "Anderson", state: "IN" },
  { image: "/images/deals/2209-n-33rd-street-site-photo.jpg", type: "REFINANCE", amount: "$76,500", city: "Milwaukee", state: "WI" },
  { image: "/images/deals/5811-w-thurston-avenue-site-photo.jpg", type: "PURCHASE", amount: "$68,800", city: "Milwaukee", state: "WI" },
  { image: "/images/deals/129-williams-road-site-photo.jpg", type: "PURCHASE", amount: "$129,250", city: "Bessemer City", state: "NC" },
  { image: "/images/deals/1211-26th-street-site-photo.jpg", type: "PURCHASE", amount: "$128,000", city: "Manistee", state: "MI" },
  { image: "/images/deals/6535 N Adrian Hwy.jpeg", type: "REFINANCE", amount: "$162,000", city: "Tecumseh", state: "MI" },
  { image: "/images/deals/2436 N 16th St.jpg", type: "PURCHASE", amount: "$132,000", city: "Milwaukee", state: "WI" },
  { image: "/images/deals/10830 Mckinney St.jpg", type: "PURCHASE", amount: "$72,000", city: "Detroit", state: "MI" },
  { image: "/images/deals/21965 W North Ave.jpg", type: "PURCHASE", amount: "$110,000", city: "Brookfield", state: "WI" },
  { image: "/images/deals/4310 Devonshire Rd.jpg", type: "PURCHASE", amount: "$136,250", city: "Detroit", state: "MI" },
  { image: "/images/deals/4715 Lumley St.jpg", type: "PURCHASE", amount: "$73,250", city: "Detroit", state: "MI" },
  { image: "/images/deals/14750 schreiber rd.jpg", type: "PURCHASE", amount: "$121,200", city: "Maple Heights", state: "OH" },
  { image: "/images/deals/1909 Bearberry Lane.jpg", type: "REFINANCE", amount: "$690,000", city: "Asheville", state: "NC" },
  { image: "/images/deals/5 Bevan Pl.jpg", type: "REFINANCE", amount: "$85,000", city: "Eastchester", state: "NY" },
  { image: "/images/deals/5863 S Hately Ave.jpg", type: "PURCHASE", amount: "$230,940", city: "Cudahy", state: "WI" },
  { image: "/images/deals/2935 N Vel R Phillips Ave.jpg", type: "PURCHASE", amount: "$117,430", city: "Milwaukee", state: "WI" },
  { image: "/images/deals/369 Linden St.webp", type: "PURCHASE", amount: "$184,500", city: "Fond du Lac", state: "WI" },
  { image: "/images/deals/2400 W Edgerton.jpg", type: "PURCHASE", amount: "$212,800", city: "Milwaukee", state: "WI" },
  { image: "/images/deals/409 E Everett.jpg", type: "PURCHASE", amount: "$96,100", city: "Marion", state: "IL" },
  { image: "/images/deals/202 156th Pl.webp", type: "PURCHASE", amount: "$198,000", city: "Calumet City", state: "IL" },
  { image: "/images/deals/2980 Sunshine Terrace.png", type: "PURCHASE", amount: "$172,800", city: "Waterford", state: "MI" },
  { image: "/images/deals/90 Emmans Rd.jpg", type: "REFINANCE", amount: "$495,000", city: "Ledgewood", state: "NJ" },
  { image: "/images/deals/603 N Henry St.png", type: "PURCHASE", amount: "$86,000", city: "Bay City", state: "MI" },
  { image: "/images/deals/110 N Judson St.png", type: "PURCHASE", amount: "$360,000", city: "Wisconsin Dells", state: "WI" },
]

const deals = [...dealsRaw].sort((a, b) => {
  const toNum = (s: string) => parseFloat(s.replace(/[$,]/g, ""))
  return toNum(b.amount) - toNum(a.amount)
})

const typeColors: Record<string, string> = {
  PURCHASE: "bg-emerald-500/20 text-emerald-400",
  REFINANCE: "bg-blue-500/20 text-blue-400",
}

const typeLabel: Record<string, string> = {
  PURCHASE: "PURCHASE",
  REFINANCE: "REFI",
}

const INITIAL_COUNT = 12

export function Deals() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [expanded, setExpanded] = useState(false)

  const visibleDeals = expanded ? deals : deals.slice(0, INITIAL_COUNT)

  return (
    <section id="deals" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl lg:text-6xl font-medium text-foreground text-balance">
            Deals Funded
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleDeals.map((deal, index) => (
            <DealCard key={index} deal={deal} index={index} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            {expanded ? "Show Less" : "See All Deals"}
            <ArrowRight size={18} className={`transition-transform duration-300 ${expanded ? "rotate-90" : ""}`} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

function DealCard({
  deal,
  index,
  isInView
}: {
  deal: typeof deals[0]
  index: number
  isInView: boolean
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
      className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${encodeURI(deal.image)})` }}
      />

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 transition-all duration-300 ${
        isHovered
          ? "bg-background/90"
          : "bg-gradient-to-t from-background/90 via-background/20 to-transparent"
      }`} />

      {/* Type Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className={`px-3 py-1 text-xs font-semibold tracking-wider rounded-full ${typeColors[deal.type]}`}>
          {typeLabel[deal.type]}
        </span>
      </div>

      {/* Default view: amount + city/state */}
      <div className={`absolute bottom-4 left-4 z-10 transition-opacity duration-300 ${isHovered ? "opacity-0" : "opacity-100"}`}>
        <p className="font-[family-name:var(--font-playfair)] text-3xl font-medium text-foreground">
          {deal.amount}
        </p>
        <p className="text-sm text-muted-foreground mt-0.5">
          {deal.city}, {deal.state}
        </p>
      </div>

      {/* Hover Details */}
      <div className={`absolute inset-0 p-6 flex flex-col justify-center items-center text-center transition-opacity duration-300 ${
        isHovered ? "opacity-100" : "opacity-0"
      }`}>
        <p className="text-lg font-semibold text-foreground">{deal.city}, {deal.state}</p>
        <p className="font-[family-name:var(--font-playfair)] text-3xl font-medium text-primary mt-4">{deal.amount}</p>
        <span className={`mt-3 px-3 py-1 text-xs font-semibold tracking-wider rounded-full ${typeColors[deal.type]}`}>
          {typeLabel[deal.type]}
        </span>
      </div>
    </motion.div>
  )
}
