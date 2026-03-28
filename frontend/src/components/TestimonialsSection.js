import React from 'react';
import { useTranslation } from 'react-i18next';
import { Quotes } from '@phosphor-icons/react';

export const TestimonialsSection = () => {
  const { t } = useTranslation();

  const testimonials = [
    {
      name: 'Rajesh Kumar',
      location: 'Varanasi, UP',
      text: 'On time delivery of quality product and spontaneous response to our requirements. Overall good experience while working with Bhoomi Groups.',
      company: 'Kumar Traders'
    },
    {
      name: 'Amit Patel',
      location: 'Raigarh, CG',
      text: 'Whatever Bhoomi Groups does for customers is always best. The quality of products is excellent. No Comparison with others.',
      company: 'Patel Enterprises'
    },
    {
      name: 'Narendra Singh',
      location: 'Mumbai, MH',
      text: 'Bhoomi Groups products are getting a very good response. Every dealer and customer knows about their product quality and trusts the brand.',
      company: 'Singh Hardware'
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-[#3A339B]" data-testid="testimonials-section">
      <div className="px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="uppercase text-xs sm:text-sm tracking-[0.2em] font-semibold text-[#E67E22] mb-4">
            {t('testimonials.subtitle')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-white" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
            {t('testimonials.title')}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-8 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300"
              data-testid={`testimonial-card-${index}`}
            >
              <Quotes size={48} weight="duotone" className="text-[#E67E22] mb-6" />
              <p className="text-[#F5F0E5] mb-6 leading-relaxed" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                "{testimonial.text}"
              </p>
              <div className="border-t border-white/20 pt-4">
                <div className="text-white font-semibold" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
                  {testimonial.name}
                </div>
                <div className="text-[#F5F0E5] text-sm opacity-70">
                  {testimonial.company}, {testimonial.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
