import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { TrendUp, Users, Factory, Package } from '@phosphor-icons/react';

export const StatsCounter = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { 
      icon: Factory, 
      number: 15, 
      suffix: '+',
      label: 'Years of Manufacturing Excellence',
      color: '#3A339B'
    },
    { 
      icon: Package, 
      number: 5000, 
      suffix: '+',
      label: 'Product SKUs Across Divisions',
      color: '#E67E22'
    },
    { 
      icon: Users, 
      number: 100000, 
      suffix: '+',
      label: 'Satisfied Customers Nationwide',
      color: '#8B5E3D'
    },
    { 
      icon: TrendUp, 
      number: 8,
      suffix: '',
      label: 'State-of-the-Art Manufacturing Units',
      color: '#6C4025'
    }
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.number / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
          step++;
          current = Math.min(increment * step, stat.number);
          
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = Math.floor(current);
            return newCounts;
          });

          if (step >= steps) {
            clearInterval(timer);
          }
        }, duration / steps);

        return () => clearInterval(timer);
      });
    }
  }, [isVisible]);

  const formatNumber = (num) => {
    if (num >= 100000) return (num / 1000).toFixed(0) + 'K';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-[#3A339B] relative overflow-hidden" data-testid="stats-section">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(45deg, #E67E22 25%, transparent 25%), linear-gradient(-45deg, #E67E22 25%, transparent 25%)',
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="uppercase text-xs sm:text-sm tracking-[0.2em] font-semibold text-[#E67E22] mb-4">
            Our Impact
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-white" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
            Building Trust Through Numbers
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="text-center group"
                data-testid={`stat-item-${index}`}
              >
                <div className="mb-6 inline-block">
                  <Icon size={64} weight="duotone" className="text-[#E67E22] group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-5xl sm:text-6xl font-black text-white mb-3 tabular-nums" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
                  {formatNumber(counts[index])}{stat.suffix}
                </div>
                <div className="text-base text-[#F5F0E5] opacity-90 font-medium px-4">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
