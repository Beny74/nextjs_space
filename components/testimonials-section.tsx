"use client";

import React from 'react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "Amazing job! My kitchen has never been this spotless.",
      author: "Sarah L., San Mateo"
    },
    {
      text: "Gabi is professional, kind, and detail-oriented.",
      author: "Michael T., Oakland"
    },
    {
      text: "They always arrive on time and make my house shine!",
      author: "Laura P., Fremont"
    }
  ];

  return (
    <div style={{marginTop:'32px'}}>
      <h3 style={{fontFamily:'Poppins',margin:'0 0 16px',fontSize:'28px',color:'var(--text-dark)',fontWeight:'600'}}>What Our Clients Say</h3>
      <div className="testimonials" role="list">
        {testimonials?.map((testimonial, index) => (
          <div key={index} className="testimonial" role="listitem">
            <p>"{testimonial?.text}"</p>
            <small>— {testimonial?.author}</small>
          </div>
        ))}
      </div>
    </div>
  );
}