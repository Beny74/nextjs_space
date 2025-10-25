
'use client'

import Image from 'next/image'

export default function HeroSection() {
  const scrollToQuote = () => {
    const quoteElement = document.getElementById('quote')
    quoteElement?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToServices = () => {
    const servicesElement = document.getElementById('services')
    servicesElement?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-inner" role="region" aria-label="Hero">
          <div className="hero-left">
            <h2 className="hero-title" id="hero-title">
              Reliable Home Cleaning in the <span style={{color:'var(--primary)'}}>Bay Area</span>
            </h2>
            <p className="hero-sub">
              Experience the convenience of professional cleaning services. Designed to meet your specific needs, save you time, and eliminate stress.
            </p>

            <div className="hero-actions" role="group" aria-label="Hero actions">
              <button className="btn-cta" onClick={scrollToQuote}>Book a Cleaning</button>
              <button className="secondary" onClick={scrollToServices}>View Services</button>
            </div>

            {/* Feature badges */}
            <div style={{marginTop:'16px',display:'flex',gap:'8px',flexWrap:'wrap'}}>
              <div style={{padding:'8px 12px',background:'var(--gray-50)',borderRadius:'8px',fontSize:'13px',border:'1px solid var(--gray-200)',display:'flex',alignItems:'center',gap:'6px',flex:'1 1 calc(50% - 4px)',minWidth:'140px'}}>
                <span style={{fontSize:'16px'}}>✓</span>
                <div>
                  <strong style={{color:'var(--text-dark)',fontSize:'13px'}}>Eco-Friendly</strong>
                  <div style={{fontSize:'11px',color:'var(--text-muted)'}}>Safe for kids & pets</div>
                </div>
              </div>
              <div style={{padding:'8px 12px',background:'var(--gray-50)',borderRadius:'8px',fontSize:'13px',border:'1px solid var(--gray-200)',display:'flex',alignItems:'center',gap:'6px',flex:'1 1 calc(50% - 4px)',minWidth:'140px'}}>
                <span style={{fontSize:'16px'}}>✓</span>
                <div>
                  <strong style={{color:'var(--text-dark)',fontSize:'13px'}}>Licensed & Insured</strong>
                  <div style={{fontSize:'11px',color:'var(--text-muted)'}}>Trusted professionals</div>
                </div>
              </div>
              <div style={{padding:'8px 12px',background:'var(--gray-50)',borderRadius:'8px',fontSize:'13px',border:'1px solid var(--gray-200)',display:'flex',alignItems:'center',gap:'6px',flex:'1 1 calc(50% - 4px)',minWidth:'140px'}}>
                <span style={{fontSize:'16px'}}>✓</span>
                <div>
                  <strong style={{color:'var(--text-dark)',fontSize:'13px'}}>Flexible Scheduling</strong>
                  <div style={{fontSize:'11px',color:'var(--text-muted)'}}>7 days a week</div>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-visual" style={{width:'100%',maxWidth:'500px',display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{width:'100%',aspectRatio:'1/1',position:'relative',borderRadius:'16px',overflow:'hidden',boxShadow:'0 8px 32px rgba(0,0,0,0.12)',background:'#f5f5f5'}}>
              <Image 
                src="/cozinha.png"
                alt="Cozinha impecavelmente limpa demonstrando nossos serviços profissionais de limpeza Gabi Cleaning"
                fill
                style={{objectFit:'contain'}}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section style={{marginTop:'32px',background:'var(--white)',padding:'20px',borderRadius:'12px',border:'1px solid var(--gray-200)',boxShadow:'0 2px 12px rgba(0,0,0,0.04)'}} className="why-choose-section">
        <div style={{display:'grid',gridTemplateColumns:'1fr',gap:'20px',alignItems:'center'}} className="why-choose-grid">
          <div style={{aspectRatio:'1/1',position:'relative',borderRadius:'10px',overflow:'hidden',background:'#f5f5f5'}}>
            <Image 
              src="/pessoa-limpeza.png"
              alt="Profissional da Gabi Cleaning realizando limpeza residencial com equipamentos modernos"
              fill
              style={{objectFit:'contain'}}
            />
          </div>
          <div>
            <h3 style={{fontFamily:'Poppins',fontSize:'20px',color:'var(--text-dark)',margin:'0 0 12px',fontWeight:'600'}}>
              Why Choose Gabi Cleaning?
            </h3>
            <p style={{color:'var(--text-muted)',fontSize:'14px',lineHeight:'1.6',marginBottom:'16px'}}>
              For over a decade, we've provided exceptional housekeeping services to families across the Bay Area. Our agency is known for its high industry standards, personalized matching process, and first-rate professionals.
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {[
                {icon:'✓', title:'Background Checked', desc:'All cleaners thoroughly vetted'},
                {icon:'✓', title:'Professional Experience', desc:'Trained and experienced staff'},
                {icon:'✓', title:'Quality Supplies', desc:'We bring eco-friendly products'},
                {icon:'✓', title:'Satisfaction Guaranteed', desc:'100% happiness or we make it right'}
              ].map((item, i) => (
                <div key={i} style={{display:'flex',alignItems:'start',gap:'10px'}}>
                  <div style={{width:'20px',height:'20px',borderRadius:'50%',background:'var(--primary)',color:'white',display:'grid',placeItems:'center',fontSize:'12px',fontWeight:'bold',flexShrink:0}}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{fontWeight:'600',color:'var(--text-dark)',fontSize:'14px'}}>{item.title}</div>
                    <div style={{fontSize:'13px',color:'var(--text-muted)'}}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @media(min-width: 640px) {
          .why-choose-section {
            margin-top: 40px !important;
            padding: 28px !important;
            border-radius: 14px !important;
          }
          .why-choose-grid {
            gap: 24px !important;
          }
        }
        @media(min-width: 768px) {
          .why-choose-section {
            margin-top: 48px !important;
            padding: 40px !important;
            border-radius: 16px !important;
          }
          .why-choose-grid {
            grid-template-columns: 1fr 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </>
  )
}
