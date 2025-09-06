import React from "react";
import { motion } from "framer-motion";
import StorageFacilities from "./StorageFacilities";
import DeliveryTransportation from "./DeliveryTransportation";
import PackagingHandling from "./PackagingHandling";
import InventoryManagement from "./InventoryManagement";
import LogisticsSupport from "./LogisticsSupport";
import Sustainability from "./Sustainability";

const Storage = () => {
  return (
    <div className="container mx-auto px-5 py-10 space-y-24">
      {/* Hero Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl font-bold text-green-700">Storage & Logistics</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Safe storage, fast delivery, and sustainable solutions for farmers and buyers.
        </p>
      </motion.div>

      {/* Sections */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.h2 className="text-3xl font-semibold mb-6 text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          Storage Facilities
        </motion.h2>
        <StorageFacilities />
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.h2 className="text-3xl font-semibold mb-6 text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
        </motion.h2>
        <DeliveryTransportation />
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.h2 className="text-3xl font-semibold mb-6 text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          Packaging & Handling
        </motion.h2>
        <PackagingHandling />
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.h2 className="text-3xl font-semibold mb-6 text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          Inventory & Management
        </motion.h2>
        <InventoryManagement />
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.h2 className="text-3xl font-semibold mb-6 text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          Logistics Support
        </motion.h2>
        <LogisticsSupport />
      </motion.section>

      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.h2 className="text-3xl font-semibold mb-6 text-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          Sustainability
        </motion.h2>
        <Sustainability />
      </motion.section>
    </div>
  );
};

export default Storage;
