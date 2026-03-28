import React from 'react';
import { useTranslation } from 'react-i18next';
import { Headset, EnvelopeSimple } from '@phosphor-icons/react';

export const FormsSection = () => {
  const { t } = useTranslation();

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
