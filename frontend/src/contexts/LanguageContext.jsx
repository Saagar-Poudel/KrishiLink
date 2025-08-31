import { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Header
    Home: 'Home',
    Marketplace: 'Marketplace',
    Weather: 'Weather',
    News: 'News',
    Training: 'Training',
    Storage: 'Storage',
    login: 'Login',
    signup: 'Sign Up',

    // Hero
    heroTitle: 'Smart Agriculture for Modern Nepal',
    heroSubtitle: "Connect, Trade, and Grow with Nepal's Premier Agricultural Platform",
    getStarted: 'Get Started',
    learnMore: 'Learn More',

    // Marketplace
    marketplaceTitle: 'Agricultural Marketplace',
    marketplaceSubtitle: 'Buy and sell agricultural products in bulk with trusted farmers and distributors',
    rice: 'Rice',
    wheat: 'Wheat',
    maize: 'Maize',
    viewAll: 'View All Products',
    perKg: 'per kg',
    'Organic Rice': 'Organic Rice',
    'Fresh Tomato': 'Fresh Tomato',
    'Per Quintal': 'Per Quintal',
    Quintal: 'Quintal',
    Available: 'Available',
    'Out of Stock': 'Out of Stock',
    Dozen: 'Dozen',
    'Fast Delivery': 'Fast Delivery',
    'Quality Assured': 'Quality Assured',
    'Best Prices': 'Best Prices',
    'Quick and reliable delivery to your doorstep': 'Quick and reliable delivery to your doorstep',
    'Verified sellers and quality-checked products': 'Verified sellers and quality-checked products',
    'Competitive pricing directly from farmers': 'Competitive pricing directly from farmers',
    'All available products': 'All available products',

    // Weather & Prices
    weatherPricesTitle: 'Weather & Market Prices',
    weatherPricesSubtitle: 'Stay updated with real-time weather forecasts and market prices',
    todayWeather: "Today's Weather",
    marketPrices: 'Market Prices',
    kathmandu: 'Kathmandu',
    sunny: 'Sunny',

    // News
    newsTitle: 'Agricultural News & Updates',
    newsSubtitle: 'Latest government policies, subsidies, and agricultural developments',

    // Footer
    quickLinks: 'Quick Links',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    privacyPolicy: 'Privacy Policy',
    termsService: 'Terms of Service',
    services: 'Services',
    bulkTrading: 'Bulk Trading',
    weatherForecast: 'Weather Forecast',
    aiSupport: 'AI Support',
    coldStorage: 'Cold Storage',
    support: 'Support',
    helpCenter: 'Help Center',
    documentation: 'Documentation',
    community: 'Community',
    contact: 'Contact',
    followUs: 'Follow Us',
    rightsReserved: 'All rights reserved.',
    PriceAlerts: 'Price Alerts',
    DeliveryService: 'Delivery Service',
    HelpCenter: 'Help Center',
    Contact: 'Contact',
    PrivacyPolicy: 'Privacy Policy',
    TermsOfService: 'Terms of Service',

    //cart
    cartTitle: "Your Cart",
    cartEmpty: "Your cart is empty",
    cartItems: (count) => `${count} item${count > 1 ? "s" : ""} in your cart`,
    continueShopping: "Continue Shopping",
    addProductsMessage: "Add some products to start shopping",
    itemRemoved: "Item Removed",
    cartCleared: "Cart Cleared",
    allItemsRemoved: "All items removed from cart",
    checkoutStarted: "Checkout Initiated",
    checkoutSoon: "This feature will be available soon",
    total: "Total:",
    proceedCheckout: "Proceed to Checkout",
    clearCart: "Clear Cart",
  },
  ne: {
    // Header
    Home: 'होम',
    Marketplace: 'मार्केटप्लेस',
    Weather: 'मौसम',
    News: 'समाचार',
    Training: 'प्रशिक्षण',
    Storage: 'स्टोरेज',
    login: 'लगइन',
    signup: 'साइन अप',

    // Hero
    heroTitle: 'आधुनिक नेपालको लागि स्मार्ट कृषि',
    heroSubtitle: 'नेपालको प्रमुख कृषि प्लेटफर्मसँग जोड्नुहोस्, व्यापार गर्नुहोस्, र बढ्नुहोस्',
    getStarted: 'सुरु गर्नुहोस्',
    learnMore: 'थप जान्नुहोस्',

    // Marketplace
    marketplaceTitle: 'कृषि बजार',
    marketplaceSubtitle: 'विश्वसनीय किसान र वितरकहरूसँग थोक मात्रामा कृषि उत्पादनहरू किन्नुहोस् र बेच्नुहोस्',
    rice: 'चामल',
    wheat: 'गहुँ',
    maize: 'मकै',
    viewAll: 'सबै उत्पादनहरू हेर्नुहोस्',
    perKg: 'प्रति केजी',
    'Organic Rice': 'जैविक धान',
    'Fresh Tomato': 'ताजा टमाटर',
    'Per Quintal': 'प्रति क्विन्टल',
    Quintal: 'क्विन्टल',
    Available: 'उपलब्ध',
    'Out of Stock': 'स्टकमा छैन',
    Dozen: 'दर्जन',
    'Fast Delivery': 'छिटो डेलिभरी',
    'Quality Assured': 'गुणस्तर सुनिश्चित',
    'Best Prices': 'उत्तम मूल्य',
    'Quick and reliable delivery to your doorstep': 'तपाईंको ढोका सम्म छिटो र भरपर्दो डेलिभरी',
    'Verified sellers and quality-checked products': 'प्रमाणित विक्रेता र गुणस्तरीय उत्पादनहरू',
    'Competitive pricing directly from farmers': 'किसानहरूबाट सिधा प्रतिस्पर्धात्मक मूल्यमा',
    'All available products': 'सबै उपलव्ध उत्पादनहरू',
    
  

    // Weather & Prices
    weatherPricesTitle: 'मौसम र बजार भाउ',
    weatherPricesSubtitle: 'वास्तविक समयमा मौसम पूर्वानुमान र बजार भाउसँग अद्यावधिक रहनुहोस्',
    todayWeather: 'आजको मौसम',
    marketPrices: 'बजार भाउ',
    kathmandu: 'काठमाडौं',
    sunny: 'घमाइलो',

    // News
    newsTitle: 'कृषि समाचार र अपडेट',
    newsSubtitle: 'नवीनतम सरकारी नीतिहरू, अनुदानहरू, र कृषि विकासहरू',

    // Footer
    quickLinks: 'द्रुत लिङ्कहरू',
    aboutUs: 'हाम्रो बारेमा',
    contactUs: 'सम्पर्क गर्नुहोस्',
    privacyPolicy: 'गोपनीयता नीति',
    termsService: 'सेवाका सर्तहरू',
    services: 'सेवाहरू',
    bulkTrading: 'थोक व्यापार',
    weatherForecast: 'मौसम पूर्वानुमान',
    aiSupport: 'एआई सहायता',
    coldStorage: 'कोल्ड स्टोरेज',
    support: 'सहायता',
    helpCenter: 'सहायता केन्द्र',
    documentation: 'दस्तावेजीकरण',
    community: 'समुदाय',
    contact: 'सम्पर्क',
    followUs: 'हामीलाई फलो गर्नुहोस्',
    rightsReserved: 'सबै अधिकार सुरक्षित।',
    PriceAlerts: 'मूल्य अलर्ट',
    DeliveryService: 'डिलिभरी सेवा',
    HelpCenter: 'सहायता केन्द्र',
    Contact: 'सम्पर्क',
    PrivacyPolicy: 'गोपनीयता नीति',
    TermsOfService: 'सेवाका सर्तहरू',

    //cart np
     cartTitle: "तपाईंको कार्ट",
    cartEmpty: "तपाईंको कार्ट खाली छ",
    cartItems: (count) => `${count} वटा वस्तुहरू कार्टमा छन्`,
    continueShopping: "किनमेल जारी राख्नुहोस्",
    addProductsMessage: "किनमेल सुरु गर्न केही उत्पादनहरू थप्नुहोस्",
    itemRemoved: "वस्तु हटाइयो",
    cartCleared: "कार्ट खाली गरियो",
    allItemsRemoved: "सबै वस्तुहरू कार्टबाट हटाइयो",
    checkoutStarted: "चेकआउट सुरु गरियो",
    checkoutSoon: "यो सुविधा छिट्टै उपलब्ध हुनेछ",
    total: "कुल:",
    proceedCheckout: "चेकआउट गर्नुहोस्",
    clearCart: "खाली गर्नुहोस्",
},
};

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ne');

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ne' : 'en'));
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
