import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const ReviewSection = () => {
  const { t } = useLanguage();
  const reviews = [
    {
      id: 1,
      name: "Ram Bahadur Sharma",
      location: "Chitwan",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: t("review1"),
      occupation: t("occupationRice"),
      verified: true
    },
    {
      id: 2,
      name: "Sita Kumari Thapa",
      location: "Kavre",
      rating: 4,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b9e3?w=150&h=150&fit=crop&crop=face",
      quote: t("review2"),
      occupation: t("occupationVegetable"),
      verified: false
    },
    {
      id: 3,
      name: "Krishna Bahadur Gurung",
      location: "Mustang",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: t("review3"),
      occupation: t("occupationApple"),
      verified: false
    },
    {
      id: 4,
      name: "Laxmi Devi Paudel",
      location: "Rupandehi",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: t("review4"),
      occupation: t("occupationOrganic"),
      verified: true
    },
    {
      id: 5,
      name: "Binod Rai",
      location: "Jhapa",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      quote: t("review5"),
      occupation: t("occupationTea"),
      verified: true
    },
    {
      id: 6,
      name: "Kamala Shrestha",
      location: "Lalitpur",
      rating: 5,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      quote: t("review6"),
      occupation: t("occupationMixed"),
      verified: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50 dark:from-[#0B1A12] dark:to-[#12241A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 dark:text-[#34D399]">
              {t("reviewSectionTitle")}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("reviewSectionSubtitle")}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 text-center">
          <div>
            <div className="text-3xl font-bold text-green-700 dark:text-[#34D399] mb-2">10,000+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{t("happyFarmers")}</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-500 dark:text-yellow-400 mb-2">4.8★</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{t("averageRating")}</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-500 dark:text-green-300 mb-2">98%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{t("satisfactionRate")}</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-900 dark:text-green-200 mb-2">75+</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{t("districtsCovered")}</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-6 bg-white dark:bg-[#12241A] rounded-xl border border-gray-200 dark:border-[#1F2937] shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative"
            >
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-8 h-8 text-green-600 dark:text-[#34D399]" />
              </div>

              <div className="space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 dark:text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-800 dark:text-gray-200 leading-relaxed italic">
                  "{review.quote}"
                </blockquote>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-[#374151]">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">{review.name}</h4>
                      {review.verified && (
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <Star className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400">{review.occupation}</p>
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-300">{review.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-green-50 dark:bg-[#12241A] border border-green-200 dark:border-[#374151] rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-2 text-green-800 dark:text-[#34D399]">
              {t("ctaTitle")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{t("ctaSubtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-green-600 dark:bg-[#34D399] text-white px-6 py-2 rounded-md hover:bg-green-700 dark:hover:bg-[#059669] transition-colors">
                {t("ctaGetStarted")}
              </button>
              <button className="border border-green-400 dark:border-[#34D399] text-green-700 dark:text-[#D1D5DB] px-6 py-2 rounded-md hover:bg-green-100 dark:hover:bg-[#059669] transition-colors">
                {t("ctaWatchStories")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
