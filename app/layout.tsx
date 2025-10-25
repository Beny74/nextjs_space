
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gabi Cleaning — Professional Cleaning Services | Bay Area',
  description: 'Gabi Cleaning offers premium home and office cleaning services across the Bay Area. Trusted, insured, and detail-oriented.',
  keywords: 'house cleaning bay area, professional cleaning service, deep cleaning, move-out cleaning, Gabi Cleaning, eco-friendly cleaning, residential cleaning California',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Poppins:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
