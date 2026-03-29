import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, List, X } from '@phosphor-icons/react';

export const Header = () => {
  const { t, i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = currentLang === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#F5F0E5] border-b border-[rgba(58,51,155,0.2)] shadow-sm">
      <div className="px-4 md:px-6 lg:px-12 xl:px-24 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" data-testid="header-logo" onClick={closeMobileMenu}>
            <img 
              src="https://customer-assets.emergentagent.com/job_67b34fec-dd81-4153-99a8-4af0952007e1/artifacts/ln1g11ts_IMG-20260326-WA0065.jpg" 
              alt="Bhoomi Groups" 
              className="h-10 md:h-12 lg:h-16"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link to="/" className="text-[#3A339B] hover:text-[#E67E22] transition-colors duration-200 font-medium text-sm xl:text-base" data-testid="nav-home">
              {t('nav.home')}
            </Link>
            <a href="#about" className="text-[#3A339B] hover:text-[#E67E22] transition-colors duration-200 font-medium text-sm xl:text-base" data-testid="nav-about">
              {t('nav.about')}
            </a>
            <a href="#products" className="text-[#3A339B] hover:text-[#E67E22] transition-colors duration-200 font-medium text-sm xl:text-base" data-testid="nav-products">
              {t('nav.products')}
            </a>
            <Link to="/blog" className="text-[#3A339B] hover:text-[#E67E22] transition-colors duration-200 font-medium text-sm xl:text-base" data-testid="nav-blog">
              {t('nav.blog')}
            </Link>
            <Link to="/help-center" className="text-[#3A339B] hover:text-[#E67E22] transition-colors duration-200 font-medium text-sm xl:text-base" data-testid="nav-help">
              {t('nav.helpDesk')}
            </Link>
            <a href="#contact" className="text-[#3A339B] hover:text-[#E67E22] transition-colors duration-200 font-medium text-sm xl:text-base" data-testid="nav-contact">
              {t('nav.contact')}
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded border border-[#3A339B] text-[#3A339B] hover:bg-[#3A339B] hover:text-white transition-all duration-200 text-sm"
              data-testid="language-toggle"
            >
              <Globe size={18} weight="duotone" />
              <span className="font-medium">{currentLang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>
            <a 
              href="#contact" 
              className="px-4 xl:px-6 py-2 bg-[#E67E22] text-white hover:bg-[#D35400] transition-colors duration-200 font-medium text-sm xl:text-base"
              data-testid="get-quote-button"
            >
              Get a Quote
            </a>
            <Link 
              to="/admin" 
              className="px-4 xl:px-6 py-2 border border-[#3A339B] text-[#3A339B] hover:bg-[#3A339B] hover:text-white transition-all duration-200 font-medium text-sm xl:text-base"
              data-testid="admin-link"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button & Language Toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2 py-1 rounded border border-[#3A339B] text-[#3A339B] text-xs"
              data-testid="language-toggle-mobile"
            >
              <Globe size={16} weight="duotone" />
              <span className="font-medium">{currentLang === 'en' ? 'HI' : 'EN'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#3A339B] hover:bg-[#3A339B] hover:text-white transition-colors"
              aria-label="Toggle menu"
              data-testid="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X size={24} weight="bold" /> : <List size={24} weight="bold" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-[rgba(58,51,155,0.2)] pt-4 space-y-3" data-testid="mobile-menu">
            <Link 
              to="/" 
              className="block py-2 text-[#3A339B] hover:text-[#E67E22] font-medium"
              onClick={closeMobileMenu}
            >
              {t('nav.home')}
            </Link>
            <a 
              href="#about" 
              className="block py-2 text-[#3A339B] hover:text-[#E67E22] font-medium"
              onClick={closeMobileMenu}
            >
              {t('nav.about')}
            </a>
            <a 
              href="#products" 
              className="block py-2 text-[#3A339B] hover:text-[#E67E22] font-medium"
              onClick={closeMobileMenu}
            >
              {t('nav.products')}
            </a>
            <Link 
              to="/blog" 
              className="block py-2 text-[#3A339B] hover:text-[#E67E22] font-medium"
              onClick={closeMobileMenu}
            >
              {t('nav.blog')}
            </Link>
            <Link 
              to="/help-center" 
              className="block py-2 text-[#3A339B] hover:text-[#E67E22] font-medium"
              onClick={closeMobileMenu}
            >
              {t('nav.helpDesk')}
            </Link>
            <a 
              href="#contact" 
              className="block py-2 text-[#3A339B] hover:text-[#E67E22] font-medium"
              onClick={closeMobileMenu}
            >
              {t('nav.contact')}
            </a>
            <div className="pt-3 space-y-2 border-t border-[rgba(58,51,155,0.2)]">
              <a 
                href="#contact" 
                className="block w-full px-4 py-3 bg-[#E67E22] text-white text-center font-medium"
                onClick={closeMobileMenu}
              >
                Get a Quote
              </a>
              <Link 
                to="/admin" 
                className="block w-full px-4 py-3 border border-[#3A339B] text-[#3A339B] text-center font-medium"
                onClick={closeMobileMenu}
              >
                Admin
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
