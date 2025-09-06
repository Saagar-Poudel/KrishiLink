import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    // Hero Section
    <section className="relative flex flex-col items-center justify-center text-center py-20 px-6 bg-white">
      
      {/* Animated Heading */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold mb-4 text-gray-800"
      >
        Farmer Training & Knowledge Hub
      </motion.h1>

      {/* Subtext */}
      <p className="max-w-2xl text-lg text-gray-600">
        Learn, apply, and grow with practical training modules on crops, vegetables, fruits, and grains.
      </p>

      {/* Animated Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2"
      >
        Start Learning <ArrowRight />
      </motion.button>
    </section>
  );
};

export default Hero;
