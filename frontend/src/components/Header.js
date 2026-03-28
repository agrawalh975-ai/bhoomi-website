import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe } from '@phosphor-icons/react';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F5F0E5] border-b border-[rgba(58,51,155,0.2)]">
      <div className="px-6 md:px-12 lg:px-24 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-testid="header-logo">
            <img 
              src="https://customer-assets.emergentagent.com/job_67b34fec-dd81-4153-99a8-4af0952007e1/artifacts/ln1g11ts_IMG-20260326-WA0065.jpg" 
              alt="Bhoomi Groups" 
              className="h-12 md:h-16"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-[#3A339B] hover:text-[#E67E22] transition-colors duration-200 font-medium" data-testid="nav-home">
              {t('nav.home')}
            </Link>
            <a href="#about" className="text-[#3A339B] hover:text-[#E67E22] transition-colors duration-200 font-medium" data-testid="nav-about">
              {t('nav.about')}
            </a>
            <a href="#products" className="text-[#3A339B] hover:text-[#E67E22] transition-colors duration-200 font-medium" data-testid="nav-products">
              {t('nav.products')}
            </a>
            <Link to="/blog" className="text-[#3A339B] hover:text-[#E67E22] transition-colors duration-200 font-medium" data-testid="nav-blog">
              {t('nav.blog')}
            </Link>
            <Link to="/help-center" className="text-[#3A339B] hover:text-[#E67E22] transition-colors duration-200 font-medium" data-testid="nav-help">
              {t('nav.helpDesk')}
            </Link>
            <a href="#contact" className="text-[#3A339B] hover:text-[#E67E22] transition-colors duration-200 font-medium" data-testid="nav-contact">
              {t('nav.contact')}
            </a>
          </nav>

          {/* Language Toggle & CTA */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded border border-[#3A339B] text-[#3A339B] hover:bg-[#3A339B] hover:text-white transition-all duration-200"
              data-testid="language-toggle"
            >
              <Globe size={20} weight="duotone" />
              <span className="text-sm font-medium">{currentLang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>
            <Link 
              to="/admin" 
              className="hidden md:block px-6 py-2 bg-[#E67E22] text-white hover:bg-[#D35400] transition-colors duration-200 font-medium"
              data-testid="admin-link"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
