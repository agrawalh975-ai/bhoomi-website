import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Headset, EnvelopeSimple, MagnifyingGlass } from '@phosphor-icons/react';

export const HelpCenter = () => {
  const { t, i18n } = useTranslation();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const API = `${BACKEND_URL}/api`;

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(`${API}/faqs`);
        setFaqs(response.data);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const getQuestion = (faq) => {
    return i18n.language === 'hi' && faq.question_hi ? faq.question_hi : faq.question_en;
  };

  const getAnswer = (faq) => {
    return i18n.language === 'hi' && faq.answer_hi ? faq.answer_hi : faq.answer_en;
  };

  const categories = ['all', ...new Set(faqs.map(f => f.category))];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = getQuestion(faq).toLowerCase().includes(searchQuery.toLowerCase()) ||
                         getAnswer(faq).toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#F5F0E5]">
      <Header />
      <main className="py-24 md:py-32">
        {/* Hero Section */}
        <div className="px-6 md:px-12 lg:px-24 mb-16">
          <div className="text-center mb-12">
            <div className="uppercase text-xs sm:text-sm tracking-[0.2em] font-semibold text-[#E67E22] mb-4">
              {t('faq.helpCenter')}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight font-black text-[#3A339B] mb-6" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
              {t('faq.title')}
            </h1>
            <p className="text-base text-[#6C4025] max-w-2xl mx-auto" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
              {t('faq.subtitle')}
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <MagnifyingGlass size={24} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#6C4025]" weight="bold" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-4 border-2 border-[#3A339B] bg-white text-[#3A339B] placeholder-[#6C4025] focus:outline-none focus:ring-2 focus:ring-[#E67E22]"
                style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}
                data-testid="faq-search"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? 'bg-[#E67E22] text-white'
                    : 'bg-white text-[#3A339B] border border-[#3A339B] hover:bg-[#3A339B] hover:text-white'
                }`}
                data-testid={`category-${category}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="faqs" className="px-6 md:px-12 lg:px-24">
          <TabsList className="grid w-full max-w-4xl mx-auto grid-cols-3 mb-12 bg-white border border-[#3A339B]">
            <TabsTrigger value="faqs" className="data-[state=active]:bg-[#3A339B] data-[state=active]:text-white" data-testid="tab-faqs">
              {t('faq.allFaqs')}
            </TabsTrigger>
            <TabsTrigger value="helpdesk" className="data-[state=active]:bg-[#3A339B] data-[state=active]:text-white" data-testid="tab-helpdesk">
              {t('forms.helpDesk.title')}
            </TabsTrigger>
            <TabsTrigger value="enquiry" className="data-[state=active]:bg-[#3A339B] data-[state=active]:text-white" data-testid="tab-enquiry">
              {t('forms.enquiry.title')}
            </TabsTrigger>
          </TabsList>

          {/* FAQs Tab */}
          <TabsContent value="faqs">
            <div className="max-w-4xl mx-auto">
              {loading ? (
                <div className="text-center py-12">
                  <div className="text-[#6C4025]">Loading FAQs...</div>
                </div>
              ) : filteredFaqs.length === 0 ? (
                <div className="text-center py-12 bg-white p-12 border border-[#3A339B]">
                  <div className="text-[#6C4025]">No FAQs found. Try adjusting your search or filters.</div>
                </div>
              ) : (
                <Accordion type="single" collapsible className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <AccordionItem 
                      key={faq.id} 
                      value={`item-${index}`}
                      className="border border-[#3A339B] px-6 bg-white hover:border-[#E67E22] transition-colors"
                      data-testid={`faq-item-${index}`}
                    >
                      <AccordionTrigger className="text-left text-[#3A339B] font-semibold hover:text-[#E67E22] hover:no-underline" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
                        <div className="flex items-start space-x-3">
                          <span className="text-[#E67E22] text-xs uppercase tracking-wider mt-1">{faq.category}</span>
                          <span>{getQuestion(faq)}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-[#6C4025] leading-relaxed pt-4" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                        {getAnswer(faq)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          </TabsContent>

          {/* Help Desk Tab */}
          <TabsContent value="helpdesk">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-[#3A339B] p-8 md:p-12" data-testid="helpdesk-panel">
                <div className="text-center mb-8">
                  <Headset size={64} weight="duotone" className="text-[#E67E22] mx-auto mb-4" />
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#3A339B] mb-4" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
                    {t('forms.helpDesk.title')}
                  </h2>
                  <p className="text-base text-[#6C4025] mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    {t('forms.helpDesk.description')}
                  </p>
                  <p className="text-sm text-[#6C4025]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    {t('forms.helpDesk.subtitle')}
                  </p>
                </div>

                {/* Embedded Zoho Form */}
                <div className="border-2 border-[#3A339B] p-4 mb-6">
                  <iframe 
                    src="https://forms.zohopublic.in/bhoomiinfobhoomi1/form/BhoomiGroupsHelpDeskSupportRequestForm/formperma/zsL5n0ihh-CXPqEz5UKnEJTO7366_AEegnh9-sJtD2g"
                    width="100%"
                    height="800"
                    frameBorder="0"
                    title="Help Desk Form"
                    className="w-full"
                  />
                </div>

                <div className="text-center">
                  <a 
                    href="https://forms.zohopublic.in/bhoomiinfobhoomi1/form/BhoomiGroupsHelpDeskSupportRequestForm/formperma/zsL5n0ihh-CXPqEz5UKnEJTO7366_AEegnh9-sJtD2g" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-[#E67E22] text-white hover:bg-[#D35400] transition-colors duration-200 font-medium"
                    data-testid="helpdesk-open-form"
                  >
                    <span>{t('forms.openForm')}</span>
                  </a>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Dealer Enquiry Tab */}
          <TabsContent value="enquiry">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white border border-[#3A339B] p-8 md:p-12" data-testid="enquiry-panel">
                <div className="text-center mb-8">
                  <EnvelopeSimple size={64} weight="duotone" className="text-[#E67E22] mx-auto mb-4" />
                  <h2 className="text-3xl sm:text-4xl font-bold text-[#3A339B] mb-4" style={{ fontFamily: 'Cabinet Grotesk, sans-serif' }}>
                    {t('forms.enquiry.title')}
                  </h2>
                  <p className="text-base text-[#6C4025] mb-2" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    {t('forms.enquiry.description')}
                  </p>
                  <p className="text-sm text-[#6C4025]" style={{ fontFamily: 'IBM Plex Sans, sans-serif' }}>
                    {t('forms.enquiry.subtitle')}
                  </p>
                </div>

                {/* Embedded Zoho Form */}
                <div className="border-2 border-[#3A339B] p-4 mb-6">
                  <iframe 
                    src="https://forms.zohopublic.in/bhoomiinfobhoomi1/form/DealerQuestionnaireFormforthewebsite/formperma/Dq2r69zArvvqsIDBeU_q7PrJ9QjksXiMf_F9UThjKRc"
                    width="100%"
                    height="800"
                    frameBorder="0"
                    title="Dealer Enquiry Form"
                    className="w-full"
                  />
                </div>

                <div className="text-center">
                  <a 
                    href="https://forms.zohopublic.in/bhoomiinfobhoomi1/form/DealerQuestionnaireFormforthewebsite/formperma/Dq2r69zArvvqsIDBeU_q7PrJ9QjksXiMf_F9UThjKRc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-8 py-4 bg-[#E67E22] text-white hover:bg-[#D35400] transition-colors duration-200 font-medium"
                    data-testid="enquiry-open-form"
                  >
                    <span>{t('forms.openForm')}</span>
                  </a>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};
