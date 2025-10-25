
import Header from '../components/header'
import HeroSection from '../components/hero-section'
import ServicesSection from '../components/services-section'
import QuoteForm from '../components/quote-form'
import TestimonialsSection from '../components/testimonials-section'
import Footer from '../components/footer'
import ThankYouOverlay from '../components/thank-you-overlay'

export default function HomePage() {
  return (
    <div className="wrap" role="main">
      <Header />
      <HeroSection />
      <ServicesSection />
      <QuoteForm />
      <TestimonialsSection />
      <Footer />
      <ThankYouOverlay />
    </div>
  )
}
