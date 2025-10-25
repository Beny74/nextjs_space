
'use client'

export default function ThankYouOverlay() {
  const closeThankYou = () => {
    const thankYouOverlay = document.getElementById('ty')
    thankYouOverlay?.classList?.remove('show')
    thankYouOverlay?.setAttribute('aria-hidden', 'true')
  }

  return (
    <div className="thank-you" id="ty" role="dialog" aria-modal="true" aria-hidden="true">
      <div className="box">
        <h3>THANK YOU!</h3>
        <p>Your request has been received. We'll get back to you within 24 hours. — Gabi Cleaning Team ✨</p>
        <div style={{marginTop:'12px'}}>
          <button className="close-ty" onClick={closeThankYou}>Close</button>
        </div>
      </div>
    </div>
  )
}
