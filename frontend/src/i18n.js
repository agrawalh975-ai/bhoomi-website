import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        about: 'About Us',
        products: 'Products',
        blog: 'Blog',
        contact: 'Contact',
        helpDesk: 'Help Desk',
        enquiry: 'Enquiry'
      },
      hero: {
        title: 'Building India from the Ground Up',
        subtitle: 'Grounded in Strength. Driven by Flow',
        description: 'Leading manufacturer of premium quality pipes, pumps, cables, and fittings for infrastructure, agriculture, and construction.',
        cta: 'Explore Products',
        ctaSecondary: 'Contact Us'
      },
      about: {
        title: 'About Bhoomi Groups',
        subtitle: 'Trust, Durability, and Indian Pride',
        description: 'Bhoomi Groups is a diversified manufacturing & distribution conglomerate focused on infrastructure and construction-related product verticals. Every product under the Bhoomi umbrella serves infrastructure, construction, agriculture, and everyday life.',
        yearsExperience: 'Years of Experience',
        products: 'Product Ranges',
        customers: 'Customers Added Every Year',
        facilities: 'Manufacturing Facilities'
      },
      products: {
        title: 'Our Products',
        subtitle: 'Complete Infrastructure Solutions',
        pipes: {
          title: 'Bhoomi Pipes',
          description: 'HDPE/PVC/CPVC pipes for water, agriculture & plumbing applications.'
        },
        pumps: {
          title: 'Bhoomi Pumps',
          description: 'Submersible, monoblock & jet pumps for domestic & agricultural use.'
        },
        cables: {
          title: 'Bhoomi Cables',
          description: 'Electrical wiring, submersible cables, and armoured cables.'
        },
        fittings: {
          title: 'Bhoomi Fittings',
          description: 'Pipe fittings, joints, and valves in all sizes.'
        },
        learnMore: 'Learn More'
      },
      blog: {
        title: 'Latest Insights',
        subtitle: 'News & Updates',
        readMore: 'Read More',
        viewAll: 'View All Posts',
        backToBlog: 'Back to Blog',
        tags: 'Tags',
        category: 'Category',
        author: 'Author',
        publishedOn: 'Published on'
      },
      testimonials: {
        title: 'What Our Customers Say',
        subtitle: 'Trusted by Thousands Across India'
      },
      faq: {
        title: 'Frequently Asked Questions',
        subtitle: 'Find answers to common questions',
        allFaqs: 'All FAQs',
        helpCenter: 'Help Center'
      },
      forms: {
        helpDesk: {
          title: 'Help Desk',
          description: 'Need support? Submit your request and our team will assist you.',
          subtitle: 'Get immediate assistance for technical support, product queries, or service requests.'
        },
        enquiry: {
          title: 'Dealer Enquiry',
          description: 'Interested in becoming a dealer? Fill out our questionnaire.',
          subtitle: 'Join our network of successful dealers and grow your business with Bhoomi Groups.'
        },
        submit: 'Submit Form',
        openForm: 'Open Form'
      },
      footer: {
        tagline: 'Building India from the Ground Up',
        products: 'Products',
        company: 'Company',
        support: 'Support',
        groupCompanies: 'Group Companies',
        rights: 'All rights reserved.',
        aboutUs: 'About Us',
        careers: 'Careers',
        contact: 'Contact',
        helpDesk: 'Help Desk',
        faq: 'FAQ'
      }
    }
  },
  hi: {
    translation: {
      nav: {
        home: 'होम',
        about: 'हमारे बारे में',
        products: 'उत्पाद',
        blog: 'ब्लॉग',
        contact: 'संपर्क करें',
        helpDesk: 'सहायता डेस्क',
        enquiry: 'पूछताछ'
      },
      hero: {
        title: 'भारत को जमीन से बनाना',
        subtitle: 'ताकत में स्थापित। प्रवाह द्वारा संचालित',
        description: 'बुनियादी ढांचे, कृषि और निर्माण के लिए प्रीमियम गुणवत्ता वाले पाइप, पंप, केबल और फिटिंग के प्रमुख निर्माता।',
        cta: 'उत्पाद देखें',
        ctaSecondary: 'संपर्क करें'
      },
      about: {
        title: 'भूमि समूह के बारे में',
        subtitle: 'विश्वास, स्थायित्व और भारतीय गर्व',
        description: 'भूमि समूह एक विविध विनिर्माण और वितरण समूह है जो बुनियादी ढांचे और निर्माण से संबंधित उत्पाद क्षेत्रों पर केंद्रित है। भूमि छत्र के तहत हर उत्पाद बुनियादी ढांचे, निर्माण, कृषि और रोजमर्रा की जिंदगी की सेवा करता है।',
        yearsExperience: 'वर्षों का अनुभव',
        products: 'उत्पाद श्रृंखला',
        customers: 'हर साल जुड़े ग्राहक',
        facilities: 'विनिर्माण सुविधाएं'
      },
      products: {
        title: 'हमारे उत्पाद',
        subtitle: 'पूर्ण बुनियादी ढांचा समाधान',
        pipes: {
          title: 'भूमि पाइप',
          description: 'पानी, कृषि और प्लंबिंग अनुप्रयोगों के लिए HDPE/PVC/CPVC पाइप।'
        },
        pumps: {
          title: 'भूमि पंप',
          description: 'घरेलू और कृषि उपयोग के लिए सबमर्सिबल, मोनोब्लॉक और जेट पंप।'
        },
        cables: {
          title: 'भूमि केबल',
          description: 'इलेक्ट्रिकल वायरिंग, सबमर्सिबल केबल और आर्मर्ड केबल।'
        },
        fittings: {
          title: 'भूमि फिटिंग',
          description: 'सभी आकारों में पाइप फिटिंग, जोड़ और वाल्व।'
        },
        learnMore: 'और जानें'
      },
      blog: {
        title: 'नवीनतम जानकारी',
        subtitle: 'समाचार और अपडेट',
        readMore: 'और पढ़ें',
        viewAll: 'सभी पोस्ट देखें',
        backToBlog: 'ब्लॉग पर वापस',
        tags: 'टैग',
        category: 'Category',
        author: 'लेखक',
        publishedOn: 'प्रकाशित'
      },
      testimonials: {
        title: 'हमारे ग्राहक क्या कहते हैं',
        subtitle: 'पूरे भारत में हजारों द्वारा विश्वसनीय'
      },
      faq: {
        title: 'अक्सर पूछे जाने वाले प्रश्न',
        subtitle: 'सामान्य प्रश्नों के उत्तर खोजें',
        allFaqs: 'सभी प्रश्न',
        helpCenter: 'सहायता केंद्र'
      },
      forms: {
        helpDesk: {
          title: 'सहायता डेस्क',
          description: 'सहायता चाहिए? अपना अनुरोध सबमिट करें और हमारी टीम आपकी सहायता करेगी।',
          subtitle: 'तकनीकी सहायता, उत्पाद प्रश्नों या सेवा अनुरोधों के लिए तत्काल सहायता प्राप्त करें।'
        },
        enquiry: {
          title: 'डीलर पूछताछ',
          description: 'डीलर बनने में रुचि है? हमारी प्रश्नावली भरें।',
          subtitle: 'हमारे सफल डीलरों के नेटवर्क में शामिल हों और भूमि समूह के साथ अपना व्यवसाय बढ़ाएं।'
        },
        submit: 'फॉर्म जमा करें',
        openForm: 'फॉर्म खोलें'
      },
      footer: {
        tagline: 'भारत को जमीन से बनाना',
        products: 'उत्पाद',
        company: 'कंपनी',
        support: 'सहायता',
        groupCompanies: 'समूह कंपनियां',
        rights: 'सर्वाधिकार सुरक्षित।',
        aboutUs: 'हमारे बारे में',
        careers: 'करियर',
        contact: 'संपर्क करें',
        helpDesk: 'सहायता डेस्क',
        faq: 'सामान्य प्रश्न'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
