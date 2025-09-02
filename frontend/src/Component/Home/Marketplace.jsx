
import {  Star, Truck, Shield,ChevronLeft, ChevronRight,  } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useEffect } from 'react';
import { useState, useRef } from 'react';


const Marketplace = () => {
  const { t } = useLanguage();
  
  
const categories = [
  {
    id: "vegetables",
    name: t("Vegetables"),
    image: "/Images/vegetables.jpeg",
  },
  {
    id: "fruits",
    name: t("Fruits"),
    image: "/Images/Fruits.jpg",
  },
  {
    id: "grains",
    name: t("Grains"),
    image: "/Images/Drinks.jpg",
  },
  {
    id: "nuts",
    name:  t("Livestock"),
    image: "/Images/land.jpg",
  },
  {
    id: "fish",
    name: t("Seeds"),
    image: "/Images/land.jpg",
  },
  {
    id: "meat",
    name: t("Tools"),
    image: "/Images/land.jpg",
  },
];

 const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const itemsPerView = 6;
  const maxIndex = Math.max(0, categories.length - itemsPerView);

   useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= categories.length - 4 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? categories.length - 4 : prevIndex - 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex >= categories.length - 4 ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };


  const CategoryCard = ({ category }) => {
  return (
    <div className="group cursor-pointer transition-all duration-300 hover:scale-105 text-center">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="aspect-square overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
      <h3 className="mt-4 text-sm font-semibold text-foreground uppercase tracking-wide">
        {category.name}
      </h3>
    </div>
  );
};
 

return (
 <section id="marketplace" className="py-16 bg-white">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    
    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
         {t('marketplaceTitle')}
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
         {t('marketplaceSubtitle')}
      </p>
    </div>

    {/* Category Section */}
    <div className="text-left mb-8">
      <h2 className="text-3xl font-bold text-foreground mb-4 uppercase tracking-wide">
        Category
      </h2>
    </div>

    <div className="relative mb-12">
      {/* Carousel */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-6"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex-shrink-0"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      {maxIndex > 0 && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
              }`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      )}

      {/* Navigation Buttons */}
      <button  
        onClick={handlePrevious}
        className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-l-md shadow-sm px-4 py-2'
      > 
        <ChevronLeft className='w-4 h-4 text-gray-600' />
      </button>

      <button  
        onClick={handleNext}
        className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-white border border-gray-300 rounded-r-md shadow-sm px-4 py-2'
      > 
        <ChevronRight className='w-4 h-4 text-gray-600' />
      </button>
    </div>

    {/* Features Section */}
    <div className="grid md:grid-cols-3 gap-8 mb-16">
      <div className="text-center p-6 bg-gray-200 rounded-lg">
        <Truck className="w-8 h-8 text-green-600 mx-auto mb-3" />
        <h4 className="font-semibold mb-2">{t('Fast Delivery')}</h4>
        <p className="text-sm text-green-600">{t('Quick and reliable delivery to your doorstep')}</p>
      </div>
      <div className="text-center p-6 bg-gray-200 rounded-lg">
        <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
        <h4 className="font-semibold mb-2">{t('Quality Assured')}</h4>
        <p className="text-sm text-green-600">{t('Verified sellers and quality-checked products')}</p>
      </div>
      <div className="text-center p-6 bg-gray-200 rounded-lg">
        <Star className="w-8 h-8 text-green-600 mx-auto mb-3" />
        <h4 className="font-semibold mb-2">{t('Best Prices')}</h4>
        <p className="text-sm text-green-600">{t('Competitive pricing directly from farmers')}</p>
      </div>
    </div>

    {/* CTA */}
    <div className="text-center mt-12">
      <button className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-opacity flex items-center mx-auto">
        {t('All available products')}
        <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

  </div>
</section>

);
};
export default Marketplace;