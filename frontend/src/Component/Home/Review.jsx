import React from 'react';
import { Star, Quote } from 'lucide-react';

const ReviewSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Ram Bahadur Sharma",
      location: "Chitwan",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      quote: "With Krishi Link, I sold my harvest 3x faster than traditional methods! The weather forecasts helped me plan perfectly.",
      occupation: "Rice Farmer",
      verified: true
    },
    {
      id: 2,
      name: "Sita Kumari Thapa",
      location: "Kavre",
      rating: 4,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b9e3?w=150&h=150&fit=crop&crop=face",
      quote: "The AI assistant helped me identify and treat plant diseases early. My tomato yield increased by 40% this season!",
      occupation: "Vegetable Farmer",
      verified: false
    },
    {
      id: 3,
      name: "Krishna Bahadur Gurung",
      location: "Mustang",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      quote: "The marketplace connected me directly with buyers. No middlemen, better prices, and faster transactions!",
      occupation: "Apple Farmer",
      verified: false
    },
    {
      id: 4,
      name: "Laxmi Devi Paudel",
      location: "Rupandehi",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      quote: "Government schemes information is always updated. I got subsidy for drip irrigation thanks to timely notifications.",
      occupation: "Organic Farmer",
      verified: true
    },
    {
      id: 5,
      name: "Binod Rai",
      location: "Jhapa",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      quote: "Training videos taught me modern techniques. My tea plantation productivity doubled in just one year!",
      occupation: "Tea Farmer",
      verified: true
    },
    {
      id: 6,
      name: "Kamala Shrestha",
      location: "Lalitpur",
      rating: 5,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      quote: "Cold storage finder saved my crops during unexpected harvest. Found storage facility just 2km away!",
      occupation: "Mixed Farming",
      verified: true
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          {/* <div className="inline-block bg-green-100 border border-green-200 rounded-full px-4 py-2">
            <span className="text-green-700 font-medium text-sm">👥 Success Stories</span>
          </div> */}
          <h2 className="text-3xl md:text-4xl font-bold text-green-800">
            What Farmers Say About Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real stories from farmers across Nepal who transformed their farming with our platform
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700 mb-2">10,000+</div>
            <div className="text-sm text-gray-600">Happy Farmers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-500 mb-2">4.8★</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-2">98%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-900 mb-2">75+</div>
            <div className="text-sm text-gray-600">Districts Covered</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="p-6 bg-white rounded-xl border shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative"
            >
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-8 h-8 text-green-600" />
              </div>
              <div className="space-y-4">
                {/* Rating */}
                <div className="flex items-center gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-800 leading-relaxed italic">
                  "{review.quote}"
                </blockquote>

                {/* User Info */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      {review.verified && (
                        <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <Star className="w-2 h-2 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-yellow-600">{review.occupation}</p>
                    <p className="text-xs font-bold text-black-500">{review.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-green-50 border border-green-200 rounded-lg p-8 max-w-md mx-auto">
            <h3 className="text-xl font-semibold mb-2 text-green-800">Join Thousands of Successful Farmers</h3>
            <p className="text-gray-600 mb-4">Start your smart farming journey today</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors">
                Get Started Free
              </button>
              <button className="border border-green-400 text-green-700 px-6 py-2 rounded-md hover:bg-green-100 transition-colors">
                Watch Success Stories
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
