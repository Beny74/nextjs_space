
'use client'

import { useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Textarea } from './ui/textarea'
import { Checkbox } from './ui/checkbox'
import { Calendar } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CalendarIcon, Briefcase, Mail, Phone, MapPin, Sparkles } from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'react-hot-toast'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const EXTRAS = [
  { id: 'ceiling-fan', label: 'Ceiling Fan', icon: '🌀' },
  { id: 'pet-fee', label: 'Pet Fee', icon: '🐾' },
  { id: 'same-day', label: 'Same Day', icon: '⚡' },
  { id: 'patio', label: 'Patio', icon: '🏡' },
  { id: 'laundry', label: 'Laundry', icon: '🧺' },
  { id: 'heavy-duty', label: 'Heavy Duty', icon: '💪' },
  { id: 'inside-cabinets', label: 'Inside Cabinets', icon: '🗄️' },
  { id: 'window-blinds', label: 'Window Blinds', icon: '🪟' },
  { id: 'inside-fridge', label: 'Inside Fridge', icon: '❄️' },
  { id: 'inside-oven', label: 'Inside Oven', icon: '🔥' },
  { id: 'dishes', label: 'Dishes', icon: '🍽️' },
  { id: 'windows', label: 'Windows', icon: '🪟' }
]

export default function BookingForm() {
  const [serviceType, setServiceType] = useState('home')
  const [formData, setFormData] = useState({
    zipCode: '',
    service: 'deep-clean',
    frequency: 'one-time',
    bedrooms: '0',
    bathrooms: '1',
    sqft: '0-750',
    partialCleaning: false,
    extras: [] as string[],
    hearAbout: '',
    date: undefined as Date | undefined,
    tip: '0',
    firstName: '',
    lastName: '',
    email: '',
    secondaryEmail: '',
    phone: '',
    secondaryPhone: '',
    textReminders: true,
    address: '',
    aptNo: '',
    specialNotes: ''
  })

  const handleExtrasToggle = (extraId: string) => {
    setFormData(prev => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter(id => id !== extraId)
        : [...prev.extras, extraId]
    }))
  }

  const calculateTotal = () => {
    let base = 0
    switch (formData.service) {
      case 'deep-clean':
        base = 260
        break
      case 'general-clean':
        base = 180
        break
      case 'move-clean':
        base = 350
        break
      case 'office':
        base = 200
        break
    }

    const extrasCount = formData.extras.length
    const extrasTotal = extrasCount * 25

    const tipAmount = (base + extrasTotal) * (parseInt(formData.tip) / 100)

    return (base + extrasTotal + tipAmount).toFixed(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const bookingData = {
      ...formData,
      total: calculateTotal(),
      serviceType
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      })

      if (response.ok) {
        toast.success('Booking submitted successfully! We\'ll contact you shortly.')
        // Reset form or redirect
      } else {
        toast.error('Failed to submit booking. Please try again.')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
    }
  }

  return (
    <section style={{ padding: '60px 20px', background: '#f5f5f5', minHeight: 'calc(100vh - 200px)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '12px', color: '#5B3A82' }}>
            Get Pricing & Book In 60 Seconds
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#666' }}>
            Super simple! Pick the industry you want to book for. Select or fill the values in the fields, find the date and time you want to book for and wait for a confirmation!
          </p>
        </div>

        <Tabs value={serviceType} onValueChange={setServiceType} className="mb-8">
          <TabsList className="bg-white inline-flex border border-gray-200">
            <TabsTrigger data-navlink="false" role="tab" 
              value="home" 
              className="data-[state=active]:bg-[#5B3A82] data-[state=active]:text-white px-8 py-3"
            >
              Home Cleaning
            </TabsTrigger>
            <TabsTrigger data-navlink="false" role="tab" 
              value="office" 
              className="data-[state=active]:bg-[#5B3A82] data-[state=active]:text-white px-8 py-3"
            >
              Office Cleaning
            </TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
            {/* Main Form Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Location */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333' }}>
                  Where Will The Service Be Taking Place?
                </h3>
                <div>
                  <Label htmlFor="zipCode">Enter Zip Code For Pricing</Label>
                  <Input
                    id="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Service Type */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#333' }}>Service Type</h3>
                <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '16px' }}>
                  Please check out our service checklist prior to booking.
                </p>
                
                <div style={{ marginBottom: '16px' }}>
                  <Label htmlFor="service">Services</Label>
                  <Select value={formData.service} onValueChange={(val) => setFormData(prev => ({ ...prev, service: val }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="deep-clean">Deep Clean</SelectItem>
                      <SelectItem value="general-clean">General Clean</SelectItem>
                      <SelectItem value="move-clean">Move In/Out</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={formData.frequency} onValueChange={(val) => setFormData(prev => ({ ...prev, frequency: val }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-Time</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select value={formData.bedrooms} onValueChange={(val) => setFormData(prev => ({ ...prev, bedrooms: val }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5].map(num => (
                          <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Select value={formData.bathrooms} onValueChange={(val) => setFormData(prev => ({ ...prev, bathrooms: val }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map(num => (
                          <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <Label htmlFor="sqft">Sq Ft</Label>
                  <Select value={formData.sqft} onValueChange={(val) => setFormData(prev => ({ ...prev, sqft: val }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-750">0 - 750 Sq F</SelectItem>
                      <SelectItem value="750-1500">750 - 1,500 Sq F</SelectItem>
                      <SelectItem value="1500-2500">1,500 - 2,500 Sq F</SelectItem>
                      <SelectItem value="2500+">2,500+ Sq F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="partial"
                    checked={formData.partialCleaning}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, partialCleaning: checked as boolean }))}
                  />
                  <Label htmlFor="partial" className="cursor-pointer">
                    This Is Partial Cleaning Only
                  </Label>
                </div>
              </div>

              {/* Extras */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333' }}>Select Extras</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                  {EXTRAS.map(extra => (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => handleExtrasToggle(extra.id)}
                      className={`card ${formData.extras.includes(extra.id) ? 'border-2 border-[#5B3A82]' : ''}`}
                      style={{ 
                        padding: '16px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: formData.extras.includes(extra.id) ? '#f3f0f7' : 'white'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{extra.icon}</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{extra.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333' }}>Feedback</h3>
                <div>
                  <Label htmlFor="hearAbout">How did you hear about us?</Label>
                  <Select value={formData.hearAbout} onValueChange={(val) => setFormData(prev => ({ ...prev, hearAbout: val }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Search</SelectItem>
                      <SelectItem value="social">Social Media</SelectItem>
                      <SelectItem value="friend">Friend/Family</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Date Selection */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333' }}>Choose Service Provider</h3>
                <div>
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, 'PPP') : 'Select a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => setFormData(prev => ({ ...prev, date }))}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Tips */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#333' }}>Tips & Parking (Optional)</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '16px', lineHeight: '1.6' }}>
                  Housekeeping is a part of the service industry. Tips motivate our cleaning experts with an eagerness to provide the best service to our customers. Parking reimbursement is highly recommended if you live in areas where parking is hard to find, a parking tip is often helpful and 100% of it goes to the provider to grab the closest parking near you including expensive garage parking.
                </p>
                <div>
                  <Label>Tips</Label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['0', '10', '15', '20'].map(tip => (
                      <Button
                        key={tip}
                        type="button"
                        variant={formData.tip === tip ? 'default' : 'outline'}
                        onClick={() => setFormData(prev => ({ ...prev, tip }))}
                        className={formData.tip === tip ? 'bg-[#5B3A82]' : ''}
                      >
                        {tip}%
                      </Button>
                    ))}
                    <Button
                      type="button"
                      variant={!['0', '10', '15', '20'].includes(formData.tip) ? 'default' : 'outline'}
                      className={!['0', '10', '15', '20'].includes(formData.tip) ? 'bg-[#5B3A82]' : ''}
                    >
                      Other
                    </Button>
                  </div>
                </div>
              </div>

              {/* Customer Details */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#333' }}>Customer Details</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '16px' }}>
                  If a customer booked with you before everything will be pre-filled for them and if they have multiple addresses they can book with any of them. You can turn this description off or modify it at anytime.
                </p>
                
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Ex: James"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Ex: Lee"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Ex: example@xyz.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="secondaryEmail">Secondary Email Address</Label>
                      <Input
                        id="secondaryEmail"
                        type="email"
                        placeholder="Ex: example@xyz.com"
                        value={formData.secondaryEmail}
                        onChange={(e) => setFormData(prev => ({ ...prev, secondaryEmail: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <Label htmlFor="phone">Phone No</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Phone No."
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="secondaryPhone">Secondary Phone No</Label>
                      <Input
                        id="secondaryPhone"
                        type="tel"
                        placeholder="Phone No."
                        value={formData.secondaryPhone}
                        onChange={(e) => setFormData(prev => ({ ...prev, secondaryPhone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="textReminders"
                      checked={formData.textReminders}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, textReminders: checked as boolean }))}
                    />
                    <Label htmlFor="textReminders" className="cursor-pointer">
                      Send me reminders about my booking via text message
                    </Label>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="Type Address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="aptNo">Apt. No.</Label>
                      <Input
                        id="aptNo"
                        placeholder="#"
                        value={formData.aptNo}
                        onChange={(e) => setFormData(prev => ({ ...prev, aptNo: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Notes */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333' }}>Special Notes Or Instructions</h3>
                <div>
                  <Label htmlFor="specialNotes">Would You Like To Add Any Notes?</Label>
                  <Textarea
                    id="specialNotes"
                    placeholder="Special Notes Or Instructions"
                    value={formData.specialNotes}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialNotes: e.target.value }))}
                    rows={4}
                  />
                </div>
              </div>

              {/* Payment Info */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333' }}>Payment Information</h3>
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '16px' }}>
                  Your card is charged <strong>AFTER</strong> the appointment is completed.
                </p>
                <div>
                  <Label>Payment Method</Label>
                  <div style={{ padding: '16px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '8px' }}>
                    <p style={{ fontSize: '0.9rem', color: '#666' }}>
                      💳 Payment will be processed securely after your cleaning is complete.
                    </p>
                  </div>
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="card" style={{ padding: '24px' }}>
                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '16px', lineHeight: '1.6' }}>
                  By entering any information, you affirm you have read and agree to the Terms of Service and Privacy Policy. You also agree and authorize BookingKoala and its affiliates and their networks to deliver marketing and other material via the information provided.
                </p>
                <Button 
                  type="submit" 
                  className="w-full bg-[#00bcd4] hover:bg-[#00acc1] text-white py-6 text-lg font-semibold"
                  style={{ fontSize: '1.2rem' }}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Save Booking
                </Button>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    background: '#1e3a5f', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 12px'
                  }}>
                    <Briefcase className="text-white" size={28} />
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#555' }}>Edit & manage your booking online.</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    background: '#1e3a5f', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 12px'
                  }}>
                    <span style={{ fontSize: '28px' }}>👍</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#555' }}>Providers are friendly and background checked.</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: '60px', 
                    height: '60px', 
                    borderRadius: '50%', 
                    background: '#1e3a5f', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 12px'
                  }}>
                    <Mail className="text-white" size={28} />
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#555' }}>Fast email response & friendly customer service.</p>
                </div>
              </div>
            </div>

            {/* Booking Summary Column */}
            <div>
              <div className="card" style={{ padding: '24px', position: 'sticky', top: '20px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '12px' }}>
                  Booking Summary
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Industry</span>
                    <span style={{ fontWeight: '500' }}>{serviceType === 'home' ? 'Home Cleaning' : 'Office Cleaning'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Service</span>
                    <span style={{ fontWeight: '500' }}>
                      {formData.service === 'deep-clean' && 'Deep Clean'}
                      {formData.service === 'general-clean' && 'General Clean'}
                      {formData.service === 'move-clean' && 'Move In/Out'}
                      {formData.service === 'office' && 'Office'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Frequency</span>
                    <span style={{ fontWeight: '500', textTransform: 'capitalize' }}>{formData.frequency}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Bedrooms</span>
                    <span style={{ fontWeight: '500' }}>{formData.bedrooms}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Bathrooms</span>
                    <span style={{ fontWeight: '500' }}>{formData.bathrooms}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Sq Ft</span>
                    <span style={{ fontWeight: '500' }}>{formData.sqft} Sq F</span>
                  </div>
                  {formData.extras.length > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#666' }}>Extras</span>
                      <span style={{ fontWeight: '500' }}>{formData.extras.length} selected</span>
                    </div>
                  )}
                  {formData.tip !== '0' && (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#666' }}>Tip</span>
                      <span style={{ fontWeight: '500' }}>{formData.tip}%</span>
                    </div>
                  )}
                </div>
                <div style={{ 
                  marginTop: '20px', 
                  paddingTop: '20px', 
                  borderTop: '2px solid #ddd',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '1.3rem', fontWeight: '600', color: '#5B3A82' }}>TOTAL</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: '700', color: '#ff6b35' }}>${calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
          </TabsContent>

          <TabsContent value="office">
            <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
            {/* Main Form Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Location */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333' }}>
                  Where Will The Service Be Taking Place?
                </h3>
                <div>
                  <Label htmlFor="zipCode">Enter Zip Code For Pricing</Label>
                  <Input
                    id="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                    required
                  />
                </div>
              </div>

              {/* Service Type */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#333' }}>Service Type</h3>
                <p style={{ fontSize: '0.95rem', color: '#666', marginBottom: '16px' }}>
                  Please check out our service checklist prior to booking.
                </p>
                
                <div style={{ marginBottom: '16px' }}>
                  <Label htmlFor="service">Services</Label>
                  <Select value={formData.service} onValueChange={(val) => setFormData(prev => ({ ...prev, service: val }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="deep-clean">Deep Clean</SelectItem>
                      <SelectItem value="general-clean">General Clean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select value={formData.frequency} onValueChange={(val) => setFormData(prev => ({ ...prev, frequency: val }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="one-time">One-Time</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                  <div>
                    <Label htmlFor="bedrooms">Bedrooms</Label>
                    <Select value={formData.bedrooms} onValueChange={(val) => setFormData(prev => ({ ...prev, bedrooms: val }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[0, 1, 2, 3, 4, 5].map(num => (
                          <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="bathrooms">Bathrooms</Label>
                    <Select value={formData.bathrooms} onValueChange={(val) => setFormData(prev => ({ ...prev, bathrooms: val }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map(num => (
                          <SelectItem key={num} value={String(num)}>{num}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <Label htmlFor="sqft">Sq Ft</Label>
                  <Select value={formData.sqft} onValueChange={(val) => setFormData(prev => ({ ...prev, sqft: val }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-750">0 - 750 Sq F</SelectItem>
                      <SelectItem value="750-1500">750 - 1,500 Sq F</SelectItem>
                      <SelectItem value="1500-2500">1,500 - 2,500 Sq F</SelectItem>
                      <SelectItem value="2500+">2,500+ Sq F</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="partial"
                    checked={formData.partialCleaning}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, partialCleaning: checked as boolean }))}
                  />
                  <Label htmlFor="partial" className="cursor-pointer">
                    This Is Partial Cleaning Only
                  </Label>
                </div>
              </div>

              {/* Extras */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333' }}>Select Extras</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                  {EXTRAS.map(extra => (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => handleExtrasToggle(extra.id)}
                      className={`card ${formData.extras.includes(extra.id) ? 'border-2 border-[#5B3A82]' : ''}`}
                      style={{ 
                        padding: '16px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        background: formData.extras.includes(extra.id) ? '#f3f0f7' : 'white'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{extra.icon}</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: '500' }}>{extra.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date, Customer Details, etc. - same as home tab */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333' }}>Choose Service Date</h3>
                <div>
                  <Label>Select Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.date ? format(formData.date, 'PPP') : 'Select a date'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={formData.date}
                        onSelect={(date) => setFormData(prev => ({ ...prev, date }))}
                        disabled={(date) => date < new Date()}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Customer Details */}
              <div className="card" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '8px', color: '#333' }}>Customer Details</h3>
                
                <div style={{ display: 'grid', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Ex: James"
                        value={formData.firstName}
                        onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Ex: Lee"
                        value={formData.lastName}
                        onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Ex: example@xyz.com"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone No</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Phone No."
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="Type Address"
                        value={formData.address}
                        onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="aptNo">Apt/Suite</Label>
                      <Input
                        id="aptNo"
                        placeholder="#"
                        value={formData.aptNo}
                        onChange={(e) => setFormData(prev => ({ ...prev, aptNo: e.target.value }))}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="card" style={{ padding: '24px' }}>
                <Button 
                  type="submit" 
                  className="w-full bg-[#00bcd4] hover:bg-[#00acc1] text-white py-6 text-lg font-semibold"
                  style={{ fontSize: '1.2rem' }}
                >
                  <Sparkles className="mr-2 h-5 w-5" />
                  Save Booking
                </Button>
              </div>
            </div>

            {/* Booking Summary Column */}
            <div>
              <div className="card" style={{ padding: '24px', position: 'sticky', top: '20px' }}>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', color: '#333', borderBottom: '2px solid #ddd', paddingBottom: '12px' }}>
                  Booking Summary
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.95rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Industry</span>
                    <span style={{ fontWeight: '500' }}>Office Cleaning</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Service</span>
                    <span style={{ fontWeight: '500' }}>
                      {formData.service === 'deep-clean' && 'Deep Clean'}
                      {formData.service === 'general-clean' && 'General Clean'}
                      {formData.service === 'move-clean' && 'Move In/Out'}
                      {formData.service === 'office' && 'Office'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#666' }}>Frequency</span>
                    <span style={{ fontWeight: '500', textTransform: 'capitalize' }}>{formData.frequency}</span>
                  </div>
                </div>
                <div style={{ 
                  marginTop: '20px', 
                  paddingTop: '20px', 
                  borderTop: '2px solid #ddd',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '1.3rem', fontWeight: '600', color: '#5B3A82' }}>TOTAL</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: '700', color: '#ff6b35' }}>${calculateTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
