import React, { useState, useEffect } from 'react';
import { WhatsappLogo, X } from '@phosphor-icons/react';

export const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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

  // Show tooltip on first appearance
  useEffect(() => {
    if (isVisible && !localStorage.getItem('whatsapp-tooltip-shown')) {
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
        localStorage.setItem('whatsapp-tooltip-shown', 'true');
      }, 5000);
    }
  }, [isVisible]);

  const handleClick = () => {
    // Bhoomi Groups WhatsApp number
    const phoneNumber = '916261084801'; // India country code + phone number
    const message = encodeURIComponent('Hello! I would like to inquire about Bhoomi Groups products.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50" data-testid="whatsapp-button">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full right-0 mb-4 bg-white border-2 border-[#25D366] px-4 py-3 shadow-lg max-w-xs animate-bounce">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <X size={16} weight="bold" />
          </button>
          <p className="text-sm text-[#3A339B] font-medium pr-6">
            Need help? Chat with us on WhatsApp!
          </p>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleClick}
        className="group relative w-16 h-16 bg-[#25D366] hover:bg-[#20BA5A] text-white shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
        data-testid="whatsapp-click"
      >
        {/* Pulse Effect */}
        <span className="absolute inset-0 bg-[#25D366] opacity-75 animate-ping"></span>
        
        {/* Icon */}
        <WhatsappLogo size={32} weight="fill" className="relative z-10 group-hover:scale-110 transition-transform duration-200" />
      </button>
    </div>
  );
};
