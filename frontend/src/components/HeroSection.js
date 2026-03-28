import React from 'react';
import { useTranslation } from 'react-i18next';
import Marquee from 'react-fast-marquee';
import { ArrowRight } from '@phosphor-icons/react';

export const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url('https://images.unsplash.com/photo-1768984418592-5b54e4fe7af5?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwzfHxhZ3JpY3VsdHVyZSUyMGlycmlnYXRpb24lMjBzeXN0ZW1zfGVufDB8fHx8MTc3NDY4Mjc0M3ww&ixlib=rb-4.1.0&q=85')` 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#3A339B]/80 via-[#3A339B]/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 py-24 md:py-32 max-w-7xl">
        <div className="max-w-3xl">
          <div className="uppercase text-xs sm:text-sm tracking-[0.2em] font-semibold text-[#E67E22] mb-6" data-testid="hero-subtitle">
            {t('hero.subtitle')}
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-black text-white mb-6" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }} data-testid="hero-title">
            {t('hero.title')}
          </h1>
          <p className="text-base leading-relaxed text-[#F5F0E5] mb-10 max-w-2xl" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }} data-testid="hero-description">
            {t('hero.description')}
          </p>
          <div className="flex flex-wrap gap-4">
            <a 
              href="#products" 
              className="inline-flex items-center space-x-2 px-8 py-4 bg-[#E67E22] text-white hover:bg-[#D35400] transition-colors duration-200 font-medium"
              data-testid="hero-cta-primary"
            >
              <span>{t('hero.cta')}</span>
              <ArrowRight size={20} weight="bold" />
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center space-x-2 px-8 py-4 bg-transparent border border-white text-white hover:bg-white hover:text-[#3A339B] transition-all duration-200 font-medium"
              data-testid="hero-cta-secondary"
            >
              <span>{t('hero.ctaSecondary')}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#E67E22] py-4 z-20">
        <Marquee gradient={false} speed={50}>
          <div className="flex items-center space-x-12 text-white font-medium px-6">
            <span>Building India from the Ground Up</span>
            <span className="text-2xl">•</span>
            <span>Grounded in Strength</span>
            <span className="text-2xl">•</span>
            <span>Driven by Flow</span>
            <span className="text-2xl">•</span>
            <span>Building India from the Ground Up</span>
            <span className="text-2xl">•</span>
            <span>Grounded in Strength</span>
            <span className="text-2xl">•</span>
            <span>Driven by Flow</span>
            <span className="text-2xl">•</span>
          </div>
        </Marquee>
      </div>
    </section>
  );
};
