import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FacebookLogo, InstagramLogo, LinkedinLogo, YoutubeLogo, EnvelopeSimple } from '@phosphor-icons/react';
import { toast } from 'sonner';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate newsletter signup
    setTimeout(() => {
      toast.success('Thank you for subscribing to our newsletter!');
      setEmail('');
      setLoading(false);
    }, 1000);
  };

  return (
    <footer className="bg-[#3A339B] text-[#F5F0E5] py-24">
      <div className="px-6 md:px-12 lg:px-24">
        {/* Newsletter Section */}
        <div className="mb-16 pb-16 border-b border-[#F5F0E5] border-opacity-20">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
              Stay Updated
            </h3>
            <p className="text-[#F5F0E5] opacity-80 mb-6">
              Subscribe to our newsletter for product updates, industry insights, and special offers
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="flex-1 relative">
                <EnvelopeSimple size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6C4025]" weight="bold" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white text-[#3A339B] placeholder-[#6C4025] border-0 focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                  data-testid="newsletter-email"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[#E67E22] text-white hover:bg-[#D35400] transition-colors duration-200 font-medium disabled:opacity-50"
                data-testid="newsletter-submit"
              >
                {loading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-4">
            <img 
              src="https://customer-assets.emergentagent.com/job_67b34fec-dd81-4153-99a8-4af0952007e1/artifacts/dbpa6v5n_IMG-20260326-WA0064.jpg" 
              alt="Bhoomi Groups" 
              className="h-16"
            />
            <p className="text-[#F5F0E5] opacity-70 text-sm">
              {t('footer.tagline')}
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center space-x-4 pt-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#F5F0E5] hover:text-[#E67E22] transition-colors" aria-label="Facebook">
                <FacebookLogo size={24} weight="fill" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#F5F0E5] hover:text-[#E67E22] transition-colors" aria-label="Instagram">
                <InstagramLogo size={24} weight="fill" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#F5F0E5] hover:text-[#E67E22] transition-colors" aria-label="LinkedIn">
                <LinkedinLogo size={24} weight="fill" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#F5F0E5] hover:text-[#E67E22] transition-colors" aria-label="YouTube">
                <YoutubeLogo size={24} weight="fill" />
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.products')}</h3>
            <ul className="space-y-2 text-[#F5F0E5] opacity-70 text-sm">
              <li><a href="#products" className="hover:opacity-100 hover:text-[#E67E22] transition-all">Bhoomi Pipes</a></li>
              <li><a href="#products" className="hover:opacity-100 hover:text-[#E67E22] transition-all">Bhoomi Pumps</a></li>
              <li><a href="#products" className="hover:opacity-100 hover:text-[#E67E22] transition-all">Bhoomi Cables</a></li>
              <li><a href="#products" className="hover:opacity-100 hover:text-[#E67E22] transition-all">Bhoomi Fittings</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-[#F5F0E5] opacity-70 text-sm">
              <li><a href="#about" className="hover:opacity-100 hover:text-[#E67E22] transition-all">{t('footer.aboutUs')}</a></li>
              <li><Link to="/blog" className="hover:opacity-100 hover:text-[#E67E22] transition-all">Blog</Link></li>
              <li><Link to="/help-center" className="hover:opacity-100 hover:text-[#E67E22] transition-all">Help Center</Link></li>
              <li><a href="#contact" className="hover:opacity-100 hover:text-[#E67E22] transition-all">{t('footer.contact')}</a></li>
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Certifications</h3>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">ISO</span>
                </div>
                <span className="text-[#F5F0E5] text-sm opacity-70">ISO 9001:2015</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">BIS</span>
                </div>
                <span className="text-[#F5F0E5] text-sm opacity-70">BIS Approved</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/10 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">ISI</span>
                </div>
                <span className="text-[#F5F0E5] text-sm opacity-70">ISI Marked</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#F5F0E5] border-opacity-20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-[#F5F0E5] opacity-70">
          <p>© {currentYear} Bhoomi Groups. {t('footer.rights')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-100 hover:text-[#E67E22] transition-all">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 hover:text-[#E67E22] transition-all">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
