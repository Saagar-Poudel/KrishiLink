// src/Component/Storage/Storage.jsx

import React from "react";
import { motion } from "framer-motion";
import StorageFacilities from "./StorageFacilities";
import LogisticsSupport from "./LogisticsSupport";
import DeliveryTransportation from "./DeliveryTransportation";

const Storage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-6 bg-white">
        {/* Animated Heading */}
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl font-bold mb-4 text-gray-800"
        >
          Farmer Training & Knowledge Hub
        </motion.h1>

        {/* Animated Subtext */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-2xl text-lg text-gray-600"
        >
          Learn, apply, and grow with practical modules on crops, vegetables,
          fruits, grains, storage, logistics, and delivery.
        </motion.p>
      </section>

      {/* Storage Facilities Section */}
      <StorageFacilities />

      {/* Logistics Support Section */}
      <LogisticsSupport />

      {/* Delivery & Transportation Section */}
      <DeliveryTransportation />
    </div>
  );
};

export default Storage;
