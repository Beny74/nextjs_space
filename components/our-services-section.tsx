
'use client'

import { useState } from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Check } from 'lucide-react'

export default function OurServicesSection() {
  const [activeService, setActiveService] = useState('deep-clean')

  const services = {
    'deep-clean': {
      title: 'Deep Clean',
      description: 'A thorough, top-to-bottom cleaning that tackles every corner, surface, and hidden area of your home. Perfect for seasonal refreshes or preparing your space for special occasions.',
      areas: [
        {
          title: 'Kitchen',
          tasks: [
            'Move items on countertop & clean behind with sponge & soap',
            'Clean stovetop, remove knobs and wash, replace when finished, wash racks',
            'Clean sink thoroughly',
            'Clean appliances on countertop (coffee machine, toaster, etc.)',
            'Remove cobwebs',
            'Vacuum and mop floors',
            'Clean inside and outside oven',
            'Clean outside of fridge (inside is extra charge)',
            'Wash backsplash with sponge and soap',
            'Microwave inside/outside (do not use bleach)',
            'Clean outside of stove hood',
            'Dust/wipe down baseboards',
            'Wipe down door & door frames',
            'Mop floors thoroughly',
            'Wipe down outside cabinets',
            'Wipe down all surfaces including shelves, tables, etc.'
          ]
        },
        {
          title: 'Bathrooms',
          tasks: [
            'Clean toilet bowl, seat, and base',
            'Clean sink and faucets',
            'Clean shower/tub, tiles, and glass doors',
            'Wipe down mirrors',
            'Empty trash and replace liner',
            'Mop floors',
            'Wipe down countertops',
            'Polish chrome fixtures',
            'Remove soap scum and hard water stains',
            'Clean behind toilet',
            'Dust light fixtures',
            'Wipe down baseboards'
          ]
        },
        {
          title: 'Bedrooms',
          tasks: [
            'Dust all surfaces (nightstands, dressers, shelves)',
            'Vacuum carpets or mop hard floors',
            'Make beds and change linens (if requested)',
            'Wipe down mirrors',
            'Empty trash bins',
            'Dust ceiling fans and light fixtures',
            'Wipe down windowsills',
            'Remove cobwebs',
            'Organize visible clutter (if requested)',
            'Vacuum under beds (if accessible)'
          ]
        },
        {
          title: 'Common Areas',
          tasks: [
            'Dust all furniture and surfaces',
            'Vacuum carpets and rugs',
            'Mop hard floors',
            'Wipe down light switches and door handles',
            'Clean glass surfaces and mirrors',
            'Dust ceiling fans and light fixtures',
            'Remove cobwebs',
            'Wipe down baseboards',
            'Empty all trash bins',
            'Arrange cushions and straighten furniture'
          ]
        },
        {
          title: 'Laundry Room',
          tasks: [
            'Wipe down washer and dryer exterior',
            'Clean lint trap',
            'Wipe down countertops and surfaces',
            'Clean sink if applicable',
            'Sweep and mop floors',
            'Empty trash',
            'Organize visible items'
          ]
        }
      ]
    },
    'general-clean': {
      title: 'General Clean',
      description: 'Our regular maintenance cleaning to keep your home consistently fresh, tidy, and welcoming. Ideal for weekly or bi-weekly service.',
      areas: [
        {
          title: 'Kitchen',
          tasks: [
            'Wipe down countertops and appliances',
            'Clean stovetop',
            'Clean sink and faucet',
            'Clean outside of microwave',
            'Sweep and mop floors',
            'Take out trash',
            'Wipe down cabinet fronts'
          ]
        },
        {
          title: 'Bathrooms',
          tasks: [
            'Clean toilet, sink, and tub/shower',
            'Wipe mirrors',
            'Mop floors',
            'Empty trash',
            'Replace towels (if requested)'
          ]
        },
        {
          title: 'Bedrooms & Living Areas',
          tasks: [
            'Dust surfaces',
            'Vacuum or mop floors',
            'Make beds',
            'Empty trash',
            'Tidy visible items'
          ]
        }
      ]
    },
    'move-clean': {
      title: 'Move In/Out Clean',
      description: 'Complete cleaning service for vacant properties. Ensures the space is spotless for new occupants or to secure your deposit return.',
      areas: [
        {
          title: 'All Rooms',
          tasks: [
            'Deep clean all floors (vacuum, sweep, mop)',
            'Clean all windows (inside)',
            'Wipe down all walls and remove marks',
            'Clean all baseboards',
            'Clean all doors and door frames',
            'Clean all light fixtures and switches',
            'Remove all cobwebs',
            'Clean all closets and cabinets (inside and out)',
            'Clean air vents'
          ]
        },
        {
          title: 'Kitchen & Bathrooms',
          tasks: [
            'Deep clean all appliances (inside and out)',
            'Clean inside cabinets and drawers',
            'Scrub all tiles and grout',
            'Polish all fixtures',
            'Clean inside oven and refrigerator',
            'Sanitize all surfaces'
          ]
        }
      ]
    },
    'office-airbnb': {
      title: 'Office Turnover',
      description: 'Quick and efficient turnover cleaning for short-term rentals and office spaces. Flexible scheduling to match your needs.',
      areas: [
        {
          title: 'Airbnb Turnover',
          tasks: [
            'Change and wash all linens',
            'Clean all surfaces',
            'Sanitize kitchen and bathrooms',
            'Vacuum and mop all floors',
            'Empty all trash',
            'Restock essentials (toilet paper, towels, etc.)',
            'Check and clean appliances',
            'Inspect for damages or maintenance needs'
          ]
        },
        {
          title: 'Office Cleaning',
          tasks: [
            'Dust all desks and surfaces',
            'Vacuum carpets',
            'Clean restrooms',
            'Empty trash and recycling',
            'Clean break room/kitchen',
            'Wipe down door handles and light switches',
            'Clean windows and glass surfaces'
          ]
        }
      ]
    }
  }

  const currentService = services[activeService as keyof typeof services]

  return (
    <section style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '12px', color: '#5B3A82' }}>Our Services</h2>
        <p style={{ fontSize: '1.1rem', color: '#666' }}>Select a Service Package</p>
      </div>

      <Tabs value={activeService} onValueChange={setActiveService} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 gap-2 mb-8 bg-transparent h-auto">
          <TabsTrigger data-navlink="false" role="tab" 
            value="deep-clean"
            className="data-[state=active]:bg-[#5B3A82] data-[state=active]:text-white data-[state=inactive]:bg-gray-200 px-6 py-3 text-base font-medium"
          >
            Deep Clean
          </TabsTrigger>
          <TabsTrigger data-navlink="false" role="tab" 
            value="general-clean"
            className="data-[state=active]:bg-[#5B3A82] data-[state=active]:text-white data-[state=inactive]:bg-gray-200 px-6 py-3 text-base font-medium"
          >
            General Clean
          </TabsTrigger>
          <TabsTrigger data-navlink="false" role="tab" 
            value="move-clean"
            className="data-[state=active]:bg-[#5B3A82] data-[state=active]:text-white data-[state=inactive]:bg-gray-200 px-6 py-3 text-base font-medium"
          >
            Move In/Out
          </TabsTrigger>
          <TabsTrigger data-navlink="false" role="tab" 
            value="office-airbnb"
            className="data-[state=active]:bg-[#5B3A82] data-[state=active]:text-white data-[state=inactive]:bg-gray-200 px-6 py-3 text-base font-medium"
          >
            Office
          </TabsTrigger>
        </TabsList>

        {Object.keys(services).map((serviceKey) => {
          const service = services[serviceKey as keyof typeof services]
          return (
            <TabsContent key={serviceKey} value={serviceKey} className="mt-6">
              <div style={{ background: '#f8f9fa', padding: '30px', borderRadius: '8px', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '1.8rem', marginBottom: '12px', color: '#5B3A82' }}>{service.title}</h3>
                <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#555' }}>{service.description}</p>
              </div>

              <Accordion type="single" collapsible className="w-full space-y-2">
                {service.areas.map((area, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border rounded-lg px-6 bg-white shadow-sm"
                  >
                    <AccordionTrigger className="text-lg font-semibold hover:no-underline py-4">
                      {area.title}
                    </AccordionTrigger>
                    <AccordionContent className="pt-2 pb-4">
                      <div className="grid md:grid-cols-2 gap-x-6 gap-y-2">
                        {area.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-start gap-2">
                            <Check className="w-4 h-4 text-[#5B3A82] mt-1 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{task}</span>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <a href="/booking">
                  <button className="btn-cta" style={{ fontSize: '1.1rem', padding: '14px 32px' }}>
                    Book This Service
                  </button>
                </a>
              </div>
            </TabsContent>
          )
        })}
      </Tabs>
    </section>
  )
}
