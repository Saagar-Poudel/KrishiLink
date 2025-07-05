import React from "react";
import { Search } from "lucide-react";
import SearchBar from "./SearchBar";
import BenefitTag from "./BenefitTag";
import Categories from "./categories";

const Hero = () => {
  const benefits = [
    "Fresh Vegetables",
    "100% Guarantee",
    "Cash on Delivery",
    "Fast Delivery",
  ];
  return (
    <div className="w-full bg-white dark:bg-gray-900 py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="lg:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-left text-black dark:text-white">
            KrishiLink Nepal <span className="text-[#008000]">No.1</span> <br />
            Digital Agriculture
          </h1>
          <p className="text-green-500 text-lg md:text-xl max-w-lg text-left">
            Connect farmer to the consumer/Buyers directly.
          </p>
          <p className="text-gray-500 dark:text-gray-300 text-lg md:text-xl max-w-lg text-left">
            Get fresh groceries online without stepping out to make delicious
            food with the freshest natural ingredients.
          </p>

          <SearchBar />

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mt-6">
            {benefits.map((benefit, index) => (
              <BenefitTag key={index} text={benefit} />
            ))}
          </div>
        </div>

        {/* Right Content - Delivery Person Image */}
        <div className="lg:w-1/2 relative">
          <div className="relative">
            <img
              src="https://th.bing.com/th/id/OIP.n7hhdXs1GPOLHGXM54gxHwAAAA?cb=iwc2&rs=1&pid=ImgDetMain"
              alt="Grocery Delivery Person"
              className="max-w-full h-auto object-contain rounded-xl"
            />

            {/* Product Cards */}
            <div className="flex flex-inline">
              <div className="absolute top-10 right-0 bg-gray-300 dark:bg-gray-800 rounded-xl p-3 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <img
                    src="https://t3.ftcdn.net/jpg/05/99/17/38/360_F_599173818_kPdvAOH3vCp3ckyAy8bfu2mpfQtsB1QO.jpg"
                    alt="Fresh Spinach"
                    className="w-28 h-28 object-cover rounded-lg mb-2"
                  />
                  <p className="font-medium text-black dark:text-white">Fresh Spinach</p>
                  <p className="text-[#ff7d5e]">$12.00</p>
                </div>
              </div>

              <div className="absolute bottom-10 right-0 bg-gray-300 dark:bg-gray-800 rounded-xl p-3 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="text-center">
                  <img
                    src="https://t3.ftcdn.net/jpg/05/99/17/38/360_F_599173818_kPdvAOH3vCp3ckyAy8bfu2mpfQtsB1QO.jpg"
                    alt="Fresh Carrot"
                    className="w-28 h-28 object-cover rounded-lg mb-2"
                  />
                  <p className="font-medium text-black dark:text-white">Fresh Carrot</p>
                  <p className="text-[#ff7d5e]">$8.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-8 px-4 mt-18">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-black dark:text-white">
          Fresh Grocery Delivery
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Order fresh groceries online and get them delivered to your doorstep
        </p>
      </div>

      <Categories />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="font-bold text-xl mb-2 text-green-800 dark:text-green-400">
            Fresh Fruits
          </h2>
          <p className="text-gray-600 dark:text-gray-300">Explore our range of fresh fruits</p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="font-bold text-xl mb-2 text-green-800 dark:text-green-400">
            Vegetables
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Farm fresh vegetables delivered daily
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
          <h2 className="font-bold text-xl mb-2 text-green-800 dark:text-green-400">
            Dairy Products
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Quality dairy products from local farms
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-black dark:text-white mb-12">
          Why Choose KrishiLink?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌱</span>
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
              Modern Technology
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Access cutting-edge agricultural technology and smart farming solutions.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🤝</span>
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
              Expert Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Get guidance from agricultural experts and experienced farmers.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="bg-primary/10 dark:bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📈</span>
            </div>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
              Increased Productivity
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Maximize your farm's potential with data-driven insights and tools.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
