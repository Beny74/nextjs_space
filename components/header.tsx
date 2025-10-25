
'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  
  const scrollToQuote = () => {
    const quoteElement = document.getElementById('quote')
    quoteElement?.scrollIntoView({ behavior: 'smooth' })
  }

  const isHome = pathname === '/'

  return (
    <header>
      <div className="brand" aria-label="Gabi Cleaning brand">
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}>
          <div className="logo-mark" aria-hidden="true" style={{ background: 'transparent', boxShadow: 'none' }}>
            <Image 
              src="/logo-circular.jpg" 
              alt="Gabi Cleaning Logo"
              width={56}
              height={56}
              style={{ borderRadius: '50%', objectFit: 'cover' }}
              priority
            />
          </div>
          <div>
            <h1>Gabi Cleaning</h1>
            <p>By Gabi Di Francescantonio — serving San Francisco - Bay Area</p>
          </div>
        </Link>
      </div>

      <nav aria-label="Primary" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <Link 
          href="/" 
          style={{ 
            textDecoration: 'none', 
            color: pathname === '/' ? '#5B3A82' : '#666',
            fontWeight: pathname === '/' ? '600' : '500',
            fontSize: '1rem'
          }}
        >
          Home
        </Link>
        <Link 
          href="/services" 
          style={{ 
            textDecoration: 'none', 
            color: pathname === '/services' ? '#5B3A82' : '#666',
            fontWeight: pathname === '/services' ? '600' : '500',
            fontSize: '1rem'
          }}
        >
          Services
        </Link>
        {isHome ? (
          <button className="secondary" onClick={scrollToQuote}>Get a Quote</button>
        ) : (
          <Link href="/#quote">
            <button className="secondary">Get a Quote</button>
          </Link>
        )}
        <Link href="/booking">
          <button className="btn-cta">Book Now</button>
        </Link>
      </nav>
    </header>
  )
}
