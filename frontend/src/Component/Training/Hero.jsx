import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative flex flex-col items-center justify-center text-center py-24 px-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-[#0B1A12] dark:to-[#123223] transition-colors duration-500">
      
      {/* Animated Heading */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-gray-800 dark:text-green-200"
      >
        Farmer Training & Knowledge Hub
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-2xl text-lg sm:text-xl text-gray-600 dark:text-gray-300"
      >
        Learn, apply, and grow with practical training modules on crops, vegetables, fruits, and grains.
      </motion.p>

      {/* Animated Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 dark:from-green-700 dark:to-green-800 text-white font-semibold rounded-2xl shadow-lg flex items-center gap-3 transition-all duration-300"
      >
        Start Learning <ArrowRight className="w-5 h-5" />
      </motion.button>
      
      {/* Decorative Circles */}
      <div className="absolute -top-10 -left-10 w-36 h-36 bg-green-200 dark:bg-green-900 rounded-full opacity-40 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-green-300 dark:bg-green-800 rounded-full opacity-30 blur-3xl animate-pulse"></div>
    </section>
  );
};

export default Hero;
