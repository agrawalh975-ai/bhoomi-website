import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const FAQSection = () => {
  const { t } = useTranslation();

  const faqs = [
    {
      question: 'What types of pipes do you manufacture?',
      answer: 'We specialize in manufacturing HDPE, PVC, and CPVC pipes for water, agriculture, and plumbing applications. Our pipes meet all industry standards and are designed for durability and longevity.'
    },
    {
      question: 'Are your products suitable for both residential and commercial use?',
      answer: 'Yes, all our products including pipes, pumps, cables, and fittings are designed to meet the demands of both residential and commercial applications, providing reliable solutions for various needs.'
    },
    {
      question: 'What is the warranty on your products?',
      answer: 'We provide comprehensive warranties on all our products. The length and terms vary based on the specific product category. Please contact our support team for detailed warranty information.'
    },
    {
      question: 'Do you provide installation support?',
      answer: 'While we do not offer installation services directly, we can recommend certified professionals in your area who are experienced in installing our products. We also provide detailed installation guides.'
    },
    {
      question: 'How can I become a Bhoomi Groups dealer?',
      answer: 'We welcome partnership inquiries! Please fill out our Dealer Enquiry form below, and our team will get in touch with you to discuss the partnership opportunities and requirements.'
    },
    {
      question: 'Where are your products available?',
      answer: 'Our products are available across India through our extensive dealer network. We have a presence in multiple states with plans for further expansion. Contact us to find a dealer near you.'
    }
  ];

  return (
    <section id="faq" className="py-24 md:py-32 bg-white" data-testid="faq-section">
      <div className="px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="uppercase text-xs sm:text-sm tracking-[0.2em] font-semibold text-[#E67E22] mb-4">
            {t('faq.subtitle')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-[#3A339B]" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
            {t('faq.title')}
          </h2>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-[rgba(58,51,155,0.2)] px-6 hover:border-[#E67E22] transition-colors"
              data-testid={`faq-item-${index}`}
            >
              <AccordionTrigger className="text-left text-[#3A339B] font-semibold hover:text-[#E67E22] hover:no-underline" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[#6C4025] leading-relaxed" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
