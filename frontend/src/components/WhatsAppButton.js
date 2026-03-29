import React, { useState, useEffect } from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';

export const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button after scrolling down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = () => {
    // Bhoomi Groups WhatsApp number
    const phoneNumber = '916261084801'; // India country code + phone number
    const message = 'Hello! I would like to inquire about Bhoomi Groups products.';
    
    // Create WhatsApp link that works on both mobile and desktop
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open in new window/tab
    const newWindow = window.open(whatsappURL, '_blank', 'noopener,noreferrer');
    
    // Fallback if popup blocked
    if (!newWindow) {
      window.location.href = whatsappURL;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50" data-testid="whatsapp-button">
      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        className="group relative w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
        title="Chat with us on WhatsApp"
        data-testid="whatsapp-click"
      >
        {/* Pulse Effect */}
        <span className="absolute inset-0 bg-[#25D366] opacity-75 animate-ping"></span>
        
        {/* Icon */}
        <WhatsappLogo size={32} weight="fill" className="relative z-10 group-hover:scale-110 transition-transform duration-200" />
      </button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
        <div className="bg-gray-900 text-white text-xs px-3 py-2 whitespace-nowrap shadow-lg">
          Chat on WhatsApp
          <div className="absolute bottom-0 right-4 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
        </div>
      </div>
    </div>
  );
};
