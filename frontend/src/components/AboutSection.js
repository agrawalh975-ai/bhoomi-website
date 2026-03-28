import React from 'react';
import { useTranslation } from 'react-i18next';
import { Factory, TrendUp, Users, Buildings } from '@phosphor-icons/react';

export const AboutSection = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Factory, number: '15+', label: t('about.yearsExperience') },
    { icon: TrendUp, number: '5000+', label: t('about.products') },
    { icon: Users, number: '100K+', label: t('about.customers') },
    { icon: Buildings, number: '8', label: t('about.facilities') }
  ];

  return (
    <section id="about" className="py-24 md:py-32 bg-[#F5F0E5]" data-testid="about-section">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Text Content */}
          <div>
            <div className="uppercase text-xs sm:text-sm tracking-[0.2em] font-semibold text-[#E67E22] mb-4">
              {t('about.subtitle')}
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-[#3A339B] mb-6" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
              {t('about.title')}
            </h2>
            <p className="text-base leading-relaxed text-[#6C4025] mb-8" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
              {t('about.description')}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index} 
                  className="p-8 md:p-12 bg-white border border-[rgba(58,51,155,0.2)] hover:border-[#E67E22] transition-colors duration-300"
                  data-testid={`stat-card-${index}`}
                >
                  <Icon size={48} weight="duotone" className="text-[#E67E22] mb-4" />
                  <div className="text-3xl sm:text-4xl font-bold text-[#3A339B] mb-2" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-[#6C4025] font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
