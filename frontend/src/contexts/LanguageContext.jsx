import { createContext, useContext, useState } from "react";

const translations = {
  en: {
    // Header
    Home: "Home",
    Marketplace: "Marketplace",
    Market: "Market",
    Weather: "Weather",
    News: "News",
    Training: "Training",
    Storage: "Storage",
    login: "Login",
    signup: "Sign Up",
    registeredFarmers: "Registered Farmers",
    dailyTransactions: "Daily Transactions",
    districtsServed: "Districts Served",
    aiSupport: "AI Assistance",
    // Hero
    heroTitle: "Smart Agriculture for Modern Nepal",
    heroSubtitle:
      "Connect, Trade, and Grow with Nepal's Premier Agricultural Platform",
    getStarted: "Get Started",
    learnMore: "Learn More",

    // Marketplace
    marketplaceTitle: "Agricultural Marketplace",
    marketplaceSubtitle:
      "Buy and sell agricultural products in bulk with trusted farmers and distributors",
    Category: "Categories",
    Vegetables: "Vegetables",
    Fruits: "Fruits",
    Grains: "Grains",
    Livestock: "Livestock",
    Seeds: "Seeds",
    Tools: "Tools",
    rice: "Rice",
    wheat: "Wheat",
    maize: "Maize",
    viewAll: "View All Products",
    perKg: "per kg",
    "Organic Rice": "Organic Rice",
    "Fresh Tomato": "Fresh Tomato",
    "Per Quintal": "Per Quintal",
    Quintal: "Quintal",
    Available: "Available",
    "Out of Stock": "Out of Stock",
    Dozen: "Dozen",
    "Fast Delivery": "Fast Delivery",
    "Quality Assured": "Quality Assured",
    "Best Prices": "Best Prices",
    "Quick and reliable delivery to your doorstep":
      "Quick and reliable delivery to your doorstep",
    "Verified sellers and quality-checked products":
      "Verified sellers and quality-checked products",
    "Competitive pricing directly from farmers":
      "Competitive pricing directly from farmers",
    "All available products": "All available products",

    // Weather & Prices
    weatherPricesTitle: "Weather & Market Prices",
    weatherPricesSubtitle:
      "Stay updated with real-time weather forecasts and market prices",
    marketPricesTitle: "Live Market Data from Nepal Calendar",
    marketPricesSubtitle:"Real-time vegetable price updates from Kalimati Market",
    todayWeather: "Today's Weather",
    marketPrices: "Market Prices",
    kathmandu: "Kathmandu",
    sunny: "Sunny",
    "Krishi Link Weather": "Krishi Link Weather",
    "Agricultural Weather & Market Information":
      "Agricultural Weather & Market Information",
    "Search for a city...": "Search for a city...",
    Search: "Search",
    "Current Weather": "Current Weather",
    Humidity: "Humidity",
    Wind: "Wind",
    "4-Day Forecast": "4-Day Forecast",

Filters: "Filters",
SearchProducts: "Search Products",
SearchPlaceholder: "Search for products...",
Category: "Category",
AllCategories: "All Categories",
PriceRange: "Price Range (Rs.)",
Rs: "Rs.",
Location: "Location",
AllLocations: "All Locations",
Certifications: "Certifications",

// Categories
Vegetables: "Vegetables",
Fruits: "Fruits",
Grains: "Grains",
Livestock: "Livestock",
Seeds: "Seeds",
Tools: "Tools",

// Locations
Kathmandu: "Kathmandu",
Chitwan: "Chitwan",
Pokhara: "Pokhara",
Dhangadhi: "Dhangadhi",
Biratnagar: "Biratnagar",
Butwal: "Butwal",

// Certifications
Organic: "Organic",
GovernmentApproved: "Government Approved",
FairTrade: "Fair Trade",
NonGMO: "Non-GMO",




    // News
    newsTitle: "Agricultural News & Updates",
    newsSubtitle:
      "Latest government policies, subsidies, and agricultural developments",

    // Footer
    quickLinks: "Quick Links",
    aboutUs: "About Us",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
    termsService: "Terms of Service",
    services: "Services",
    bulkTrading: "Bulk Trading",
    weatherForecast: "Weather Forecast",
    aiSupport: "AI Support",
    coldStorage: "Cold Storage",
    support: "Support",
    helpCenter: "Help Center",
    documentation: "Documentation",
    community: "Community",
    contact: "Contact",
    followUs: "Follow Us",
    rightsReserved: "All rights reserved.",
    PriceAlerts: "Price Alerts",
    DeliveryService: "Delivery Service",
    HelpCenter: "Help Center",
    Contact: "Contact",
    PrivacyPolicy: "Privacy Policy",
    TermsOfService: "Terms of Service",

    //cart
    cartTitle: "Your Cart",
    cartEmpty: "Your cart is empty",
    cartItems: " item in your cart",
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

    // Bill
    Invoice: "Invoice",
    "Bill Details": "Bill Details",
    "Customer Information": "Customer Information",
    "Order Summary": "Order Summary",
    Subtotal: "Subtotal",
    "Delivery Fee": "Delivery Fee",
    "Tax (13%)": "Tax (13%)",
    "Grand Total": "Grand Total",
    "Place Order": "Place Order",
    "Order Placed Successfully": "Order Placed Successfully",
    "Thank you for your order": "Thank you for your order",
    "Your order has been placed successfully":
      "Your order has been placed successfully",

    // Generic
    "Government Approved": "सरकारी स्वीकृत",
    kg: "केजी",
    pieces: "थान",
    liter: "लिटर",

    // Review Section
    reviewSectionTitle: "What Farmers Say About Us",
    reviewSectionSubtitle:
      "Real stories from farmers across Nepal who transformed their farming with our platform",

    happyFarmers: "Happy Farmers",
    averageRating: "Average Rating",
    satisfactionRate: "Satisfaction Rate",
    districtsCovered: "Districts Covered",

    // Reviews
    review1:
      "With Krishi Link, I sold my harvest 3x faster than traditional methods! The weather forecasts helped me plan perfectly.",
    review2:
      "The AI assistant helped me identify and treat plant diseases early. My tomato yield increased by 40% this season!",
    review3:
      "The marketplace connected me directly with buyers. No middlemen, better prices, and faster transactions!",
    review4:
      "Government schemes information is always updated. I got subsidy for drip irrigation thanks to timely notifications.",
    review5:
      "Training videos taught me modern techniques. My tea plantation productivity doubled in just one year!",
    review6:
      "Cold storage finder saved my crops during unexpected harvest. Found storage facility just 2km away!",

    // Occupations
    occupationRice: "Rice Farmer",
    occupationVegetable: "Vegetable Farmer",
    occupationApple: "Apple Farmer",
    occupationOrganic: "Organic Farmer",
    occupationTea: "Tea Farmer",
    occupationMixed: "Mixed Farming",

    // CTA
    ctaTitle: "Join Thousands of Successful Farmers",
    ctaSubtitle: "Start your smart farming journey today",
    ctaGetStarted: "Get Started Free",
    ctaWatchStories: "Watch Success Stories",
  },
  ne: {
    // Header
    Home: "होम",
    Marketplace: "मार्केटप्लेस",
    Market: "बजार",
    Weather: "मौसम",
    News: "समाचार",
    Training: "प्रशिक्षण",
    Storage: "स्टोरेज",
    login: "लगइन",
    signup: "साइन अप",
    registeredFarmers: "दर्ता भएका किसान",
    dailyTransactions: "दैनिक कारोबार",
    districtsServed: "जिल्लामा सेवा",
    aiSupport: "AI सहायता",

    // Hero
    heroTitle: "आधुनिक नेपालको लागि स्मार्ट कृषि",
    heroSubtitle:
      "नेपालको प्रमुख कृषि प्लेटफर्मसँग जोड्नुहोस्, व्यापार गर्नुहोस्, र बढ्नुहोस्",
    getStarted: "सुरु गर्नुहोस्",
    learnMore: "थप जान्नुहोस्",

    // Marketplace
    marketplaceTitle: "कृषि बजार",
    marketplaceSubtitle:
      "विश्वसनीय किसान र वितरकहरूसँग थोक मात्रामा कृषि उत्पादनहरू किन्नुहोस् र बेच्नुहोस्",
    Category: "वर्गहरू",
    Vegetables: "तरकारी",
    Fruits: "फलफूल",
    Grains: "अन्न",
    Livestock: "पशुधन",
    Seeds: "बिउ",
    Tools: "औजार",
    rice: "चामल",
    wheat: "गहुँ",
    maize: "मकै",
    viewAll: "सबै उत्पादनहरू हेर्नुहोस्",
    perKg: "प्रति केजी",
    "Organic Rice": "जैविक धान",
    "Fresh Tomato": "ताजा टमाटर",
    "Per Quintal": "प्रति क्विन्टल",
    Quintal: "क्विन्टल",
    Available: "उपलब्ध",
    "Out of Stock": "स्टकमा छैन",
    Dozen: "दर्जन",
    "Fast Delivery": "छिटो डेलिभरी",
    "Quality Assured": "गुणस्तर सुनिश्चित",
    "Best Prices": "उत्तम मूल्य",
    "Quick and reliable delivery to your doorstep":
      "तपाईंको ढोका सम्म छिटो र भरपर्दो डेलिभरी",
    "Verified sellers and quality-checked products":
      "प्रमाणित विक्रेता र गुणस्तरीय उत्पादनहरू",
    "Competitive pricing directly from farmers":
      "किसानहरूबाट सिधा प्रतिस्पर्धात्मक मूल्यमा",
    "All available products": "सबै उपलव्ध उत्पादनहरू",

    // Weather & Prices
    weatherPricesTitle: "मौसम र बजार भाउ",
    weatherPricesSubtitle: "वास्तविक समयमा मौसम पूर्वानुमान र बजार भाउसँग अद्यावधिक रहनुहोस्",
    marketPricesTitle: "नेपाली पात्रोबाट लाइभ बजार डेटा",
    marketPricesSubtitle: "कालिमाटी बजारबाट वास्तविक समयको तरकारी मूल्य अद्यावधिक",
    todayWeather: "आजको मौसम",
    marketPrices: "बजार भाउ",
    kathmandu: "काठमाडौं",
    sunny: "घमाइलो",
    "Krishi Link Weather": "कृषि लिंक मौसम",
    "Agricultural Weather & Market Information": "कृषि मौसम र बजार जानकारी",
    "Search for a city...": "शहर खोज्नुहोस्...",
    Search: "खोज्नुहोस्",
    "Current Weather": "वर्तमान मौसम",
    Humidity: "आर्द्रता",
    Wind: "हावा",
    "4-Day Forecast": "४ दिनको मौसम पूर्वानुमान",


// Marketplace Filters
Filters: "फिल्टरहरू",
SearchProducts: "उत्पादन खोज्नुहोस्",
SearchPlaceholder: "उत्पादन खोज्नुहोस्...",
Category: "कोटी",
AllCategories: "सबै कोटी",
PriceRange: "मूल्य दायरा (रु.)",
Rs: "रु.",
Location: "स्थान",
AllLocations: "सबै स्थान",
Certifications: "प्रमाणपत्रहरू",

// Categories
Vegetables: "तरकारी",
Fruits: "फलफूल",
Grains: "अन्न",
Livestock: "पशुधन",
Seeds: "बीउ",
Tools: "औजार",

// Locations
Kathmandu: "काठमाडौं",
Chitwan: "चितवन",
Pokhara: "पोखरा",
Dhangadhi: "धनगढी",
Biratnagar: "विराटनगर",
Butwal: "बुटवल",

// Certifications
Organic: "अर्गानिक",
GovernmentApproved: "सरकारद्वारा अनुमोदित",
FairTrade: "न्यायपूर्ण व्यापार",
NonGMO: "नन-जीएमओ",


    // News
    newsTitle: "कृषि समाचार र अपडेट",
    newsSubtitle: "नवीनतम सरकारी नीतिहरू, अनुदानहरू, र कृषि विकासहरू",

    // Footer
    quickLinks: "द्रुत लिङ्कहरू",
    aboutUs: "हाम्रो बारेमा",
    contactUs: "सम्पर्क गर्नुहोस्",
    privacyPolicy: "गोपनीयता नीति",
    termsService: "सेवाका सर्तहरू",
    services: "सेवाहरू",
    bulkTrading: "थोक व्यापार",
    weatherForecast: "मौसम पूर्वानुमान",
    aiSupport: "एआई सहायता",
    coldStorage: "कोल्ड स्टोरेज",
    support: "सहायता",
    helpCenter: "सहायता केन्द्र",
    documentation: "दस्तावेजीकरण",
    community: "समुदाय",
    contact: "सम्पर्क",
    followUs: "हामीलाई फलो गर्नुहोस्",
    rightsReserved: "सबै अधिकार सुरक्षित।",
    PriceAlerts: "मूल्य अलर्ट",
    DeliveryService: "डिलिभरी सेवा",
    HelpCenter: "सहायता केन्द्र",
    Contact: "सम्पर्क",
    PrivacyPolicy: "गोपनीयता नीति",
    TermsOfService: "सेवाका सर्तहरू",

    //cart np
    cartTitle: "तपाईंको कार्ट",
    cartEmpty: "तपाईंको कार्ट खाली छ",
    cartItems: " वटा वस्तुहरू कार्टमा छन्",
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

    // Bill
    Invoice: "बिल",
    "Bill Details": "बिल विवरण",
    "Customer Information": "ग्राहक जानकारी",
    "Order Summary": "अर्डर सारांश",
    Subtotal: "उप-जम्मा",
    "Delivery Fee": "डेलिभरी शुल्क",
    "Tax (13%)": "कर (१३%)",
    "Grand Total": "कुल जम्मा",
    "Place Order": "अर्डर दिनुहोस्",
    "Order Placed Successfully": "अर्डर सफलतापूर्वक राखियो",
    "Thank you for your order": "तपाईंको अर्डरको लागि धन्यवाद",
    "Your order has been placed successfully":
      "तपाईंको अर्डर सफलतापूर्वक राखिएको छ",

    // Generic
    "Government Approved": "सरकारी स्वीकृत",
    kg: "केजी",
    pieces: "थान",
    liter: "लिटर",

    // Review Section
    reviewSectionTitle: "किसानले हाम्रो बारेमा के भन्छन्",
    reviewSectionSubtitle:
      "नेपालभरिका किसानका वास्तविक कथाहरू जसले हाम्रो प्लेटफर्मबाट आफ्नो खेतीमा परिवर्तन ल्याए",

    happyFarmers: "खुसी किसानहरू",
    averageRating: "औसत मूल्याङ्कन",
    satisfactionRate: "सन्तुष्टि दर",
    districtsCovered: "आवृत जिल्ला",

    // Reviews
    review1:
      "कृषि लिंकले मलाई बाली परम्परागत विधिभन्दा ३ गुणा छिटो बेच्न मद्दत गर्‍यो! मौसम पूर्वानुमानले योजनामा सजिलो बनायो।",
    review2:
      "AI सहायकले रोग छिट्टै पत्ता लगाउन र उपचार गर्न मद्दत गर्‍यो। यस सिजनमा मेरो टमाटर उत्पादन ४०% बढ्यो!",
    review3:
      "बजारले मलाई प्रत्यक्ष खरिदकर्तासँग जोड्यो। दलालबिना, राम्रो मूल्य र छिटो कारोबार!",
    review4:
      "सरकारी योजनाको जानकारी सधैं अद्यावधिक हुन्छ। समयमै सूचना पाएर मैले ड्रिप सिँचाइको सब्सिडी पाएँ।",
    review5:
      "प्रशिक्षण भिडियोहरूले मलाई आधुनिक प्रविधि सिकाए। केवल एक वर्षमै मेरो चिया उत्पादन दोब्बर भयो!",
    review6:
      "कोल्ड स्टोरेज फाइन्डरले अनपेक्षित कटानमा मेरो बाली जोगायो। २ किलोमिटरमै भण्डारण सुविधा भेट्टाएँ!",

    // Occupations
    occupationRice: "धान किसान",
    occupationVegetable: "तरकारी किसान",
    occupationApple: "स्याउ किसान",
    occupationOrganic: "जैविक किसान",
    occupationTea: "चिया किसान",
    occupationMixed: "मिश्रित खेती",

    // CTA
    ctaTitle: "हजारौं सफल किसानमा सामेल हुनुहोस्",
    ctaSubtitle: "आजै स्मार्ट खेती यात्रा सुरु गर्नुहोस्",
    ctaGetStarted: "निःशुल्क सुरु गर्नुहोस्",
    ctaWatchStories: "सफलता कथाहरू हेर्नुहोस्",
  },
};

const LanguageContext = createContext(undefined);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ne" ? "en" : "ne"));
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
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
