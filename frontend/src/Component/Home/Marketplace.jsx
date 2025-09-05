import { Star, Truck, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Marketplace = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const categories = [
    { id: "vegetables", name: t("Vegetables"), image: "/Images/vegetables.jpeg" },
    { id: "fruits", name: t("Fruits"), image: "/Images/Fruits.jpg" },
    { id: "grains", name: t("Grains"), image: "/Images/Drinks.jpg" },
    { id: "nuts", name: t("Livestock"), image: "/Images/land.jpg" },
    { id: "fish", name: t("Seeds"), image: "/Images/land.jpg" },
    { id: "meat", name: t("Tools"), image: "/Images/land.jpg" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const itemsPerView = 3; // smaller for mobile by default
  const maxIndex = Math.max(0, categories.length - itemsPerView);

  useEffect(() => {
    if (!isAutoPlaying || maxIndex === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= categories.length - itemsPerView ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, categories.length, itemsPerView]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex <= 0 ? categories.length - itemsPerView : prevIndex - 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prevIndex) =>
      prevIndex >= categories.length - itemsPerView ? 0 : prevIndex + 1
    );
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

// inside Marketplace component


  const CategoryCard = ({ category }) => (
    <div className="group cursor-pointer transition-all duration-300 hover:scale-105 text-center h-full">
      <div className="bg-white dark:bg-[#12241A] rounded-lg overflow-hidden shadow-sm hover:shadow-lg aspect-square">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
        {category.name}
      </h3>
    </div>
  );

  return (
    <section id="marketplace" className="py-12 sm:py-16 bg-white dark:bg-[#0B1A12]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {t("marketplaceTitle")}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("marketplaceSubtitle")}
          </p>
        </div>

        {/* Category Section */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wide">
            {t("Category")}
          </h2>
          <div className="relative">
            {/* Carousel */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out gap-4"
                style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
              >
                {categories.map((category) => (
                  <div
                    key={category.id}
                    className="flex-shrink-0 w-[calc(100%/3)] sm:w-[calc(100%/4)] md:w-[calc(100%/6)]"
                  >
                    <CategoryCard category={category} />
                  </div>
                ))}
              </div>
            </div>


            {/* Dots */}
            {maxIndex > 0 && (
              <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                      index === currentIndex
                        ? "bg-green-600"
                        : "bg-gray-400 dark:bg-gray-600"
                    }`}
                    onClick={() => handleDotClick(index)}
                  />
                ))}
              </div>
            )}

            {/* Navigation Buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-[#12241A] border border-gray-300 dark:border-gray-700 rounded-l-md shadow-sm px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-200" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-[#12241A] border border-gray-300 dark:border-gray-700 rounded-r-md shadow-sm px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-200" />
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-gray-200 dark:bg-[#12241A] rounded-lg">
            <Truck className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{t("Fast Delivery")}</h4>
            <p className="text-sm text-green-600">{t("Quick and reliable delivery to your doorstep")}</p>
          </div>
          <div className="text-center p-6 bg-gray-200 dark:bg-[#12241A] rounded-lg">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{t("Quality Assured")}</h4>
            <p className="text-sm text-green-600">{t("Verified sellers and quality-checked products")}</p>
          </div>
          <div className="text-center p-6 bg-gray-200 dark:bg-[#12241A] rounded-lg">
            <Star className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{t("Best Prices")}</h4>
            <p className="text-sm text-green-600">{t("Competitive pricing directly from farmers")}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate("/market")}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center justify-center mx-auto"
          >
            {t("All available products")}
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
