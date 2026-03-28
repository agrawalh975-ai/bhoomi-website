import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#3A339B] text-[#F5F0E5] py-24">
      <div className="px-6 md:px-12 lg:px-24">
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
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.products')}</h3>
            <ul className="space-y-2 text-[#F5F0E5] opacity-70 text-sm">
              <li><a href="#products" className="hover:opacity-100 transition-opacity">Bhoomi Pipes</a></li>
              <li><a href="#products" className="hover:opacity-100 transition-opacity">Bhoomi Pumps</a></li>
              <li><a href="#products" className="hover:opacity-100 transition-opacity">Bhoomi Cables</a></li>
              <li><a href="#products" className="hover:opacity-100 transition-opacity">Bhoomi Fittings</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.company')}</h3>
            <ul className="space-y-2 text-[#F5F0E5] opacity-70 text-sm">
              <li><a href="#about" className="hover:opacity-100 transition-opacity">{t('footer.aboutUs')}</a></li>
              <li><Link to="/blog" className="hover:opacity-100 transition-opacity">Blog</Link></li>
              <li><a href="#contact" className="hover:opacity-100 transition-opacity">{t('footer.contact')}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2 text-[#F5F0E5] opacity-70 text-sm">
              <li><a href="#help-desk" className="hover:opacity-100 transition-opacity">{t('footer.helpDesk')}</a></li>
              <li><a href="#faq" className="hover:opacity-100 transition-opacity">{t('footer.faq')}</a></li>
            </ul>
            <h3 className="text-lg font-semibold mt-6 mb-4">Quality Standards</h3>
            <ul className="space-y-2 text-[#F5F0E5] opacity-70 text-sm">
              <li>ISO 9001:2015 Certified</li>
              <li>BIS Approved</li>
              <li>ISI Marked Products</li>
              <li>CPVC NSF Certified</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#F5F0E5] border-opacity-20 pt-8 text-center text-sm text-[#F5F0E5] opacity-70">
          <p>© {currentYear} Bhoomi Groups. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};
