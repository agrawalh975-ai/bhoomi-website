import React from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from '@phosphor-icons/react';

export const ProductsSection = () => {
  const { t } = useTranslation();

  const products = [
    {
      title: t('products.pipes.title'),
      description: t('products.pipes.description'),
      image: 'https://images.pexels.com/photos/15508178/pexels-photo-15508178.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      color: '#3A339B'
    },
    {
      title: t('products.pumps.title'),
      description: t('products.pumps.description'),
      image: 'https://images.pexels.com/photos/32489252/pexels-photo-32489252.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      color: '#E67E22'
    },
    {
      title: t('products.cables.title'),
      description: t('products.cables.description'),
      image: 'https://images.pexels.com/photos/30367510/pexels-photo-30367510.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      color: '#8B5E3D'
    },
    {
      title: t('products.fittings.title'),
      description: t('products.fittings.description'),
      image: 'https://images.unsplash.com/photo-1774019883172-a89730a86500?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzOTB8MHwxfHNlYXJjaHwyfHxpbmR1c3RyaWFsJTIwd2F0ZXIlMjBwdW1wc3xlbnwwfHx8fDE3NzQ2ODI3NDV8MA&ixlib=rb-4.1.0&q=85',
      color: '#6C4025'
    }
  ];

  return (
    <section id="products" className="py-24 md:py-32 bg-white" data-testid="products-section">
      <div className="px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="uppercase text-xs sm:text-sm tracking-[0.2em] font-semibold text-[#E67E22] mb-4">
            {t('products.subtitle')}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-[#3A339B]" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
            {t('products.title')}
          </h2>
        </div>

        {/* Products Grid (Tetris Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {products.map((product, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden bg-[#F5F0E5] border border-[rgba(58,51,155,0.2)] hover:border-[#E67E22] transition-all duration-300"
              data-testid={`product-card-${index}`}
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Product Info */}
              <div className="p-8">
                <h3 
                  className="text-2xl sm:text-3xl font-semibold mb-3" 
                  style={{ fontFamily: 'Cabinet Grotesk, sans-serif', color: product.color }}
                >
                  {product.title}
                </h3>
                <p className="text-base text-[#6C4025] mb-6" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                  {product.description}
                </p>
                <a 
                  href="#contact" 
                  className="inline-flex items-center space-x-2 text-[#3A339B] hover:text-[#E67E22] transition-colors duration-200 font-medium"
                  data-testid={`product-learn-more-${index}`}
                >
                  <span>{t('products.learnMore')}</span>
                  <ArrowRight size={20} weight="bold" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
