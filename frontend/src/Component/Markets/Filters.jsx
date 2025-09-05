import React, { useState } from "react"; 
import { Search, Filter } from "lucide-react";
import { useLanguage } from "../../contexts/LanguageContext";

const MarketplaceFilters = ({ onFiltersChange }) => {
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [location, setLocation] = useState("");
  const [certifications, setCertifications] = useState([]);

  const categories = [
    t("Vegetables"),
    t("Fruits"),
    t("Grains"),
    t("Livestock"),
    t("Seeds"),
    t("Tools"),
  ];
  const locations = [
    t("Kathmandu"),
    t("Chitwan"),
    t("Pokhara"),
    t("Dhangadhi"),
    t("Biratnagar"),
    t("Butwal"),
  ];
  const certificationOptions = [
    t("Organic"),
    t("Government Approved"),
    t("Fair Trade"),
    t("Non-GMO"),
  ];

  const handleFiltersChange = () => {
    onFiltersChange({
      searchTerm,
      category,
      priceRange,
      location,
      certifications,
    });
  };

  const handleCertificationChange = (cert, checked) => {
    if (checked) {
      setCertifications([...certifications, cert]);
    } else {
      setCertifications(certifications.filter((c) => c !== cert));
    }
    handleFiltersChange();
  };

  return (
    <div className="rounded-lg shadow-lg bg-white dark:bg-[#12241A] dark:text-[#F9FAFB]">
      <div className="p-4 border-b border-gray-200 dark:border-[#1F2937]">
        <h3 className="flex items-center gap-2 text-lg font-semibold dark:text-[#F9FAFB]">
          <Filter className="w-5 h-5" />
          {t("Filters")}
        </h3>
      </div>
      <div className="p-4 space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <label htmlFor="search" className="text-sm font-medium dark:text-[#D1D5DB]">
            {t("SearchProducts")}
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-[#9CA3AF]" />
            <input
              id="search"
              placeholder={t("SearchPlaceholder")}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                handleFiltersChange();
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#34D399] dark:bg-[#0B1A12] dark:border-[#374151] dark:text-[#F9FAFB] dark:placeholder-[#9CA3AF]"
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium dark:text-[#D1D5DB]">{t("Category")}</label>
          <select
            value={category}
            onChange={(e) => {
              const newCategory= e.target.value;
              setCategory(newCategory);
              onFiltersChange({
                searchTerm,
                category: newCategory,
                priceRange,
                location,
                certifications
              });
            }}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#34D399] dark:bg-[#0B1A12] dark:border-[#374151] dark:text-[#F9FAFB]"
          >
            <option value="all">{t("AllCategories")}</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="space-y-3">
          <label className="text-sm font-medium dark:text-[#D1D5DB]">
            {t("Price Range (Rs.)")}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            step="10"
            value={priceRange[1]}
            onChange={(e) => {
              const value = [priceRange[0], parseInt(e.target.value)];
              setPriceRange(value);
              handleFiltersChange();
            }}
            className="w-full accent-[#34D399] dark:accent-[#34D399]"
          />
          <div className="flex justify-between text-sm text-gray-500 dark:text-[#9CA3AF]">
            <span>{t("Rs.")} {priceRange[0]}</span>
            <span>{t("Rs.")} {priceRange[1]}</span>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium dark:text-[#D1D5DB]">{t("Location")}</label>
          <select
            value={location}
            onChange={(e) => {
              const newLocation = e.target.value;
              setLocation(newLocation);
              onFiltersChange({
                searchTerm,
                category,
                priceRange,
                location: e.target.value,
                certifications
              });
            }}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#34D399] dark:bg-[#0B1A12] dark:border-[#374151] dark:text-[#F9FAFB]"
          >
            <option value="all">{t("AllLocations")}</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Certifications */}
        <div className="space-y-3">
          <label className="text-sm font-medium dark:text-[#D1D5DB]">{t("Certifications")}</label>
          <div className="space-y-2">
            {certificationOptions.map((cert) => (
              <div key={cert} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={cert}
                  checked={certifications.includes(cert)}
                  onChange={(e) =>
                    handleCertificationChange(cert, e.target.checked)
                  }
                  className="h-4 w-4 text-[#34D399] focus:ring-[#34D399] border-gray-300 dark:border-[#374151] dark:bg-[#0B1A12] dark:checked:bg-[#34D399] rounded"
                />
                <label htmlFor={cert} className="text-sm dark:text-[#D1D5DB]">
                  {cert}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceFilters;
