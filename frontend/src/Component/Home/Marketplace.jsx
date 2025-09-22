import React from "react";
import { Star, Truck, Shield } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";
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

  const CategoryCard = ({ category }) => (
    <button 
      onClick={() => navigate(`/market?category=${category.name}`)}
      className="group cursor-pointer transition-all duration-300 hover:scale-105 text-center"
    >
      <div className="bg-white dark:bg-[#12241A] rounded-lg overflow-hidden shadow-sm hover:shadow-lg w-full h-40">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
        {category.name}
      </h3>
    </button>
  );

  return (
    <section id="marketplace" className="py-12 bg-white dark:bg-[#0B1A12]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-700 mb-4">
            {t("marketplaceTitle")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("marketplaceSubtitle")}
          </p>
        </div>

        {/* Category Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-green-600 dark:text-gray-100 mb-6 uppercase tracking-wide">
            {t("Category")}
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-gray-100 dark:bg-[#12241A] rounded-lg">
            <Truck className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{t("Fast Delivery")}</h4>
            <p className="text-sm text-gray-600 dark:text-green-400">{t("Quick and reliable delivery to your doorstep")}</p>
          </div>
          <div className="text-center p-6 bg-gray-100 dark:bg-[#12241A] rounded-lg">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{t("Quality Assured")}</h4>
            <p className="text-sm text-gray-600 dark:text-green-400">{t("Verified sellers and quality-checked products")}</p>
          </div>
          <div className="text-center p-6 bg-gray-100 dark:bg-[#12241A] rounded-lg">
            <Star className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">{t("Best Prices")}</h4>
            <p className="text-sm text-gray-600 dark:text-green-400">{t("Competitive pricing directly from farmers")}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate("/market")}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition flex items-center justify-center mx-auto"
          >
            {t("All available products")}
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