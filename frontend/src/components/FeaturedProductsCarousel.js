import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';

export const FeaturedProductsCarousel = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      name: 'HDPE Pipes - Premium Series',
      category: 'Bhoomi Pipes',
      image: 'https://images.unsplash.com/photo-1655039353512-ab38d6a37a92?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwd2F0ZXIlMjBwaXBlcyUyMFBWQyUyMEhEUEUlMjBtYW51ZmFjdHVyaW5nfGVufDB8fHx8MTc3NDY4NTkyN3ww&ixlib=rb-4.1.0&q=85',
      specs: ['20mm - 1200mm diameter', 'Pressure: 4-16 bar', 'ISI Certified'],
      color: '#3A339B',
      description: 'High-density polyethylene pipes for underground water supply and agricultural irrigation'
    },
    {
      name: 'Submersible Pumps - V4 Series',
      category: 'Bhoomi Pumps',
      image: 'https://images.unsplash.com/photo-1708601909272-435c8b3aa5d1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NTYxODh8MHwxfHNlYXJjaHwxfHxzdWJtZXJzaWJsZSUyMHdhdGVyJTIwcHVtcCUyMGFncmljdWx0dXJlJTIwZmFybWluZ3xlbnwwfHx8fDE3NzQ2ODU5Mjd8MA&ixlib=rb-4.1.0&q=85',
      specs: ['0.5 HP - 20 HP', 'Depth: up to 300m', '30% Energy Savings'],
      color: '#E67E22',
      description: 'Energy-efficient submersible pumps with advanced motor technology for agricultural needs'
    },
    {
      name: 'FR-LSH Cables - Safety Plus',
      category: 'Bhoomi Cables',
      image: 'https://images.pexels.com/photos/11404176/pexels-photo-11404176.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      specs: ['1.0 - 10.0 sq.mm', 'Fire Retardant', 'Low Smoke Halogen'],
      color: '#8B5E3D',
      description: 'Fire-retardant low-smoke halogen cables for maximum safety in residential and commercial installations'
    },
    {
      name: 'Ball Valves - Pro Series',
      category: 'Bhoomi Fittings',
      image: 'https://images.pexels.com/photos/12527113/pexels-photo-12527113.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
      specs: ['15mm - 200mm', 'Pressure: 10-25 bar', 'Brass & PVC'],
      color: '#6C4025',
      description: 'Heavy-duty ball valves with quarter-turn operation for industrial and residential applications'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [products.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="py-24 md:py-32 bg-[#F5F0E5]" data-testid="featured-products-carousel">
      <div className="px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="uppercase text-xs sm:text-sm tracking-[0.2em] font-semibold text-[#E67E22] mb-4">
            Featured Products
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-[#3A339B]" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
            Premium Quality, Trusted Performance
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Slides */}
          <div className="relative overflow-hidden" style={{ height: '500px' }}>
            {products.map((product, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
                }`}
                data-testid={`product-slide-${index}`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
                  {/* Image */}
                  <div className="relative h-full overflow-hidden border border-[rgba(58,51,155,0.2)]">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-6 left-6 px-4 py-2 text-white font-semibold text-sm uppercase tracking-wider" style={{ backgroundColor: product.color }}>
                      {product.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center p-8 md:p-12 bg-white border border-[rgba(58,51,155,0.2)]">
                    <h3 className="text-3xl sm:text-4xl font-bold mb-4" style={{ fontFamily: 'Cabinet Grotesk, sans-serif', color: product.color }}>
                      {product.name}
                    </h3>
                    <p className="text-base text-[#6C4025] mb-6 leading-relaxed" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                      {product.description}
                    </p>

                    {/* Specs */}
                    <div className="space-y-3 mb-8">
                      {product.specs.map((spec, i) => (
                        <div key={i} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-[#E67E22]"></div>
                          <span className="text-sm text-[#6C4025] font-medium">{spec}</span>
                        </div>
                      ))}
                    </div>

                    <div>
                      <a 
                        href="#contact" 
                        className="inline-flex items-center space-x-2 px-8 py-4 text-white hover:opacity-90 transition-opacity duration-200 font-medium"
                        style={{ backgroundColor: product.color }}
                        data-testid={`product-cta-${index}`}
                      >
                        <span>Request Quote</span>
                        <ArrowRight size={20} weight="bold" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white border-2 border-[#3A339B] text-[#3A339B] hover:bg-[#3A339B] hover:text-white transition-all duration-200 flex items-center justify-center"
            data-testid="carousel-prev"
          >
            <ArrowLeft size={24} weight="bold" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white border-2 border-[#3A339B] text-[#3A339B] hover:bg-[#3A339B] hover:text-white transition-all duration-200 flex items-center justify-center"
            data-testid="carousel-next"
          >
            <ArrowRight size={24} weight="bold" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 transition-all duration-300 ${
                  index === currentSlide ? 'bg-[#E67E22] w-8' : 'bg-[#3A339B] opacity-30'
                }`}
                data-testid={`carousel-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
