
'use client'

import { useEffect, useState } from 'react'

export default function Footer() {
  const [currentYear, setCurrentYear] = useState('')

  useEffect(() => {
    setCurrentYear(new Date().getFullYear().toString())
  }, [])

  return (
    <footer>
      <div className="contact">
        <div>
          <strong style={{display:'block',color:'var(--text-dark)',fontSize:'18px',marginBottom:'8px'}}>Gabi Cleaning</strong>
          <div style={{fontSize:'15px',color:'var(--text-dark)'}}>
            (510) 837-0505 • <a href="mailto:gabifcleaning@gmail.com" style={{color:'var(--primary)',textDecoration:'underline'}}>gabifcleaning@gmail.com</a>
          </div>
          <div style={{fontSize:'13px',color:'var(--text-muted)',marginTop:'6px'}}>
            Serving the entire Bay Area • Licensed & Insured
          </div>
        </div>
      </div>

      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end'}}>
        <div className="social" aria-label="Social links">
          <a aria-label="Instagram" href="https://www.instagram.com/gabifcleaning/" target="_blank" rel="noopener noreferrer" title="Instagram">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path 
                d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z" 
                stroke="var(--primary)" 
                strokeWidth="1.2" 
                fill="none"
              />
              <circle cx="12" cy="12" r="3" stroke="var(--primary)" strokeWidth="1.2" fill="none"/>
              <circle cx="17.5" cy="6.5" r="0.6" fill="var(--primary)"/>
            </svg>
          </a>
          <a aria-label="Yelp" href="#" title="Yelp">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z" fill="var(--primary)"/>
              <path d="M12 8l2 4-2 4-2-4z" fill="var(--primary)"/>
            </svg>
          </a>
          <a aria-label="Google" href="#" title="Google">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="var(--primary)" strokeWidth="1.2" fill="none"/>
              <path d="M12 8v8M8 12h8" stroke="var(--primary)" strokeWidth="1.2"/>
            </svg>
          </a>
        </div>
        <small style={{fontSize:'13px',color:'var(--text-muted)',marginTop:'8px'}}>
          © {currentYear} Gabi Cleaning
        </small>
      </div>
    </footer>
  )
}
