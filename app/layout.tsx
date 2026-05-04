import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'John Quinlan | Hard Money Loan Originator | The Hard Money Co.',
  description: 'Fast, flexible direct lending. Close in 5-10 business days. Approve in 24 hours. Fund 100% of rehab. No appraisal. No hard credit pull. Built for sophisticated operators.',
  keywords: ['hard money loans', 'bridge loans', 'construction loans', 'real estate financing', 'private lending'],
}

export const viewport = {
  themeColor: '#090D0F',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
