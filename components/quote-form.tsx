
'use client'

import { useState } from 'react'

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    service: 'Regular',
    size: 'Studio',
    date: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData?.name || !formData?.phone) {
      alert('Please provide at least your name and phone number.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response?.ok) {
        // Clear form
        setFormData({
          name: '',
          phone: '',
          address: '',
          service: 'Regular',
          size: 'Studio',
          date: '',
          notes: ''
        })
        
        // Show thank you overlay
        const thankYouOverlay = document.getElementById('ty')
        thankYouOverlay?.classList?.add('show')
        thankYouOverlay?.setAttribute('aria-hidden', 'false')
      } else {
        throw new Error('Failed to submit quote request')
      }
    } catch (error) {
      console.error('Error submitting quote:', error)
      alert('Sorry, there was an error submitting your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const fillTestData = () => {
    setFormData({
      name: "Test Client",
      phone: "(510) 555-0123",
      address: "123 Example St, Oakland, CA",
      service: "Deep",
      size: "2BR",
      date: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0],
      notes: "Please bring eco-friendly supplies."
    })
  }

  return (
    <div id="quote" className="quote" aria-labelledby="quote-heading">
      <h3 id="quote-heading" className="quote-heading" style={{margin:'0 0 16px',fontFamily:'Poppins',fontSize:'20px',color:'var(--text-dark)',fontWeight:'600'}}>Request a Free Quote</h3>
      <style jsx>{`
        @media(min-width: 640px) {
          .quote-heading {
            font-size: 24px !important;
            margin: 0 0 18px !important;
          }
        }
        @media(min-width: 768px) {
          .quote-heading {
            font-size: 28px !important;
            margin: 0 0 20px !important;
          }
        }
      `}</style>
      <form onSubmit={handleSubmit} noValidate>
        <div className="row">
          <div className="two">
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Your full name"
              value={formData?.name ?? ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="two">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              name="phone"
              type="text"
              required
              placeholder="(510) 555-0123"
              value={formData?.phone ?? ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="full" style={{marginTop:'8px'}}>
            <label htmlFor="address">Address</label>
            <input
              id="address"
              name="address"
              type="text"
              placeholder="Street address, city, ZIP"
              value={formData?.address ?? ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="small">
            <label htmlFor="service">Type of cleaning</label>
            <select
              id="service"
              name="service"
              required
              value={formData?.service ?? 'Regular'}
              onChange={handleInputChange}
            >
              <option value="Regular">Regular</option>
              <option value="Deep">Deep</option>
              <option value="Move-In/Move-Out">Move-In/Move-Out</option>
              <option value="Office">Office</option>
              <option value="Airbnb Turnover">Airbnb Turnover</option>
            </select>
          </div>
          <div className="small">
            <label htmlFor="size">Home size</label>
            <select
              id="size"
              name="size"
              value={formData?.size ?? 'Studio'}
              onChange={handleInputChange}
            >
              <option value="Studio">Studio</option>
              <option value="1BR">1BR</option>
              <option value="2BR">2BR</option>
              <option value="3BR">3BR</option>
              <option value="4+ BR">4+ BR</option>
            </select>
          </div>
          <div className="small">
            <label htmlFor="date">Date preferred</label>
            <input
              id="date"
              name="date"
              type="date"
              value={formData?.date ?? ''}
              onChange={handleInputChange}
            />
          </div>

          <div className="full" style={{marginTop:'8px'}}>
            <label htmlFor="notes">Additional notes</label>
            <textarea
              id="notes"
              name="notes"
              rows={3}
              placeholder="Special requests, pets, parking..."
              value={formData?.notes ?? ''}
              onChange={handleInputChange}
            />
          </div>

          <div style={{marginTop:'10px'}} className="full">
            <button 
              type="submit" 
              className={`btn-cta ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Request Estimate'}
            </button>
            <button 
              type="button" 
              className="secondary" 
              onClick={fillTestData} 
              style={{marginLeft:'8px'}}
            >
              Fill test data
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
