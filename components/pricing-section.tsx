
export default function PricingSection() {
  const pricingOptions = [
    {
      title: "Basic Cleaning",
      description: "2–3 hours — $140–$180"
    },
    {
      title: "Deep Cleaning",
      description: "4–5 hours — $220–$300"
    },
    {
      title: "Move-In / Move-Out",
      description: "5–6 hours — $250–$400"
    },
    {
      title: "Office Cleaning",
      description: "Custom quote — contact for details"
    }
  ]

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'10px',marginTop:'32px'}}>
      <h3 style={{fontFamily:'Poppins',margin:'0 0 16px',fontSize:'28px',color:'var(--text-dark)',fontWeight:'600'}}>Transparent Pricing</h3>
      <div className="pricing" aria-hidden="false">
        {pricingOptions?.map((option, index) => (
          <div key={index} className="price-card">
            <h5>{option?.title}</h5>
            <p>{option?.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
