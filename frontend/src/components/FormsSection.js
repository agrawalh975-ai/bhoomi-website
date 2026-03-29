import React from 'react';
import { useTranslation } from 'react-i18next';
import { Headset, EnvelopeSimple, Phone } from '@phosphor-icons/react';

export const FormsSection = () => {
  const { t } = useTranslation();

  // Bhoomi Groups contact information
  const helpDeskPhone = '+91-9876543210'; // Replace with actual help desk number
  const helpDeskEmail = 'bhoomi.info@bhoomigroups.com';

  const handlePhoneClick = () => {
    window.location.href = `tel:${helpDeskPhone}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${helpDeskEmail}`;
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#F5F0E5]" data-testid="forms-section">
      <div className="px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Help Desk Form */}
          <div id="help-desk" className="p-8 md:p-12 bg-white border border-[rgba(58,51,155,0.2)]" data-testid="help-desk-card">
            <Headset size={48} weight="duotone" className="text-[#E67E22] mb-6" />
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#3A339B] mb-4" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
              {t('forms.helpDesk.title')}
            </h3>
            <p className="text-base text-[#6C4025] mb-6" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
              {t('forms.helpDesk.description')}
            </p>

            {/* Quick Contact Options */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 p-4 bg-[#F5F0E5] border border-[rgba(58,51,155,0.1)]">
                <Phone size={24} weight="bold" className="text-[#E67E22]" />
                <div>
                  <div className="text-xs text-[#6C4025] mb-1">Call Us</div>
                  <a 
                    href={`tel:${helpDeskPhone}`}
                    onClick={handlePhoneClick}
                    className="text-[#3A339B] font-semibold hover:text-[#E67E22] transition-colors"
                    data-testid="help-desk-phone"
                  >
                    {helpDeskPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-[#F5F0E5] border border-[rgba(58,51,155,0.1)]">
                <EnvelopeSimple size={24} weight="bold" className="text-[#E67E22]" />
                <div>
                  <div className="text-xs text-[#6C4025] mb-1">Email Us</div>
                  <a 
                    href={`mailto:${helpDeskEmail}`}
                    onClick={handleEmailClick}
                    className="text-[#3A339B] font-semibold hover:text-[#E67E22] transition-colors"
                    data-testid="help-desk-email"
                  >
                    {helpDeskEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-[rgba(58,51,155,0.1)] pt-6">
              <p className="text-sm text-[#6C4025] mb-4">Or submit a detailed request:</p>
              <a 
                href="https://forms.zohopublic.in/bhoomiinfobhoomi1/form/BhoomiGroupsHelpDeskSupportRequestForm/formperma/zsL5n0ihh-CXPqEz5UKnEJTO7366_AEegnh9-sJtD2g" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-6 py-3 bg-[#E67E22] text-white hover:bg-[#D35400] transition-colors duration-200 font-medium"
                data-testid="help-desk-button"
              >
                <span>{t('forms.submit')}</span>
              </a>
            </div>
          </div>

          {/* Dealer Enquiry Form */}
          <div className="p-8 md:p-12 bg-white border border-[rgba(58,51,155,0.2)]" data-testid="dealer-enquiry-card">
            <EnvelopeSimple size={48} weight="duotone" className="text-[#E67E22] mb-6" />
            <h3 className="text-2xl sm:text-3xl font-semibold text-[#3A339B] mb-4" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
              {t('forms.enquiry.title')}
            </h3>
            <p className="text-base text-[#6C4025] mb-6" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
              {t('forms.enquiry.description')}
            </p>
            <a 
              href="https://forms.zohopublic.in/bhoomiinfobhoomi1/form/DealerQuestionnaireFormforthewebsite/formperma/Dq2r69zArvvqsIDBeU_q7PrJ9QjksXiMf_F9UThjKRc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#E67E22] text-white hover:bg-[#D35400] transition-colors duration-200 font-medium"
              data-testid="dealer-enquiry-button"
            >
              <span>{t('forms.submit')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
