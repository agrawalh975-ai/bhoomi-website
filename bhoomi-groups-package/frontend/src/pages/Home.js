import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { StatsCounter } from '../components/StatsCounter';
import { ProductsSection } from '../components/ProductsSection';
import { FeaturedProductsCarousel } from '../components/FeaturedProductsCarousel';
import { BlogSection } from '../components/BlogSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { FAQSection } from '../components/FAQSection';
import { FormsSection } from '../components/FormsSection';
import { WhatsAppButton } from '../components/WhatsAppButton';

export const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsCounter />
        <ProductsSection />
        <FeaturedProductsCarousel />
        <BlogSection />
        <TestimonialsSection />
        <FAQSection />
        <FormsSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
