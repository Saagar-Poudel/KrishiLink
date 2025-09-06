// src/Component/Logistics/LogisticsSupport.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import { storageFeatures } from "../Storage/featuresData";
import * as Icons from "lucide-react";

const LogisticsSupport = () => {
  const logisticsSection = storageFeatures.find(
    (section) => section.section === "Logistics Support"
  );

  if (!logisticsSection) return null;

  const [activeCard, setActiveCard] = useState(null);
  const [showInsuranceForm, setShowInsuranceForm] = useState(false);

  return (
    <div className="py-12 container mx-auto px-5">
      <h2 className="text-3xl font-bold text-green-700 mb-6">{logisticsSection.section}</h2>
      <p className="text-gray-600 mb-10">{logisticsSection.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {logisticsSection.items.map((item) => {
          const IconComponent = Icons[item.icon];
          const isInsurance = item.action.toLowerCase().includes("insurance");
          const isConnect = item.action.toLowerCase().includes("connect");

          return (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col hover:shadow-xl transition cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: item.id * 0.05 }}
            >
              <div className="flex items-center mb-4">
                {IconComponent && <IconComponent className="w-12 h-12 text-green-600 mr-4" />}
                <h3 className="text-xl font-semibold text-green-700">{item.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{item.desc}</p>

              <div className="flex gap-3">
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  onClick={() => {
                    setActiveCard(activeCard === item.id ? null : item.id);
                    if (isInsurance) setShowInsuranceForm(false);
                  }}
                >
                  {item.action}
                </button>
              </div>

              {/* Expanded Content */}
              {activeCard === item.id && isInsurance && (
                <motion.div
                  className="mt-4 bg-green-50 p-6 rounded-xl shadow-inner border-l-4 border-green-600"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4 className="text-green-700 font-semibold mb-3">Insurance Coverage Details</h4>
                  <ul className="space-y-2 text-gray-700 mb-4">
                    <li className="flex items-start gap-2">
                      <Icons.ShieldCheck className="w-5 h-5 text-green-600 mt-1" />
                      Full coverage for loss or damage during transit.
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.Clock className="w-5 h-5 text-green-600 mt-1" />
                      Quick claim processing within 48 hours.
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.FileText className="w-5 h-5 text-green-600 mt-1" />
                      Transparent documentation for all insured shipments.
                    </li>
                    <li className="flex items-start gap-2">
                      <Icons.Percent className="w-5 h-5 text-green-600 mt-1" />
                      Flexible premium plans based on goods type & distance.
                    </li>
                  </ul>

                  <div className="flex flex-col md:flex-row gap-3">
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                      onClick={() => setShowInsuranceForm(!showInsuranceForm)}
                    >
                      {showInsuranceForm ? "Close Form" : "Get Insurance"}
                    </button>
                    <button className="bg-white border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-100 transition">
                      Learn More
                    </button>
                  </div>

                  {/* Insurance Form */}
                  {showInsuranceForm && (
                    <motion.form
                      className="mt-4 space-y-3 bg-white p-4 rounded-lg shadow-inner"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        className="w-full p-2 border rounded"
                        required
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        className="w-full p-2 border rounded"
                        required
                      />
                      <input
                        type="tel"
                        name="contact"
                        placeholder="Contact Number"
                        className="w-full p-2 border rounded"
                        required
                      />
                      <input
                        type="text"
                        name="goods"
                        placeholder="Goods Description"
                        className="w-full p-2 border rounded"
                        required
                      />
                      <input
                        type="number"
                        name="value"
                        placeholder="Goods Value (₹)"
                        className="w-full p-2 border rounded"
                        required
                      />
                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                      >
                        Submit Insurance Request
                      </button>
                    </motion.form>
                  )}
                </motion.div>
              )}

              {/* Last-Mile Connectivity */}
              {activeCard === item.id && isConnect && (
                <motion.div
                  className="mt-4 bg-green-50 p-4 rounded-xl shadow-inner"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-gray-700">
                    Last-mile connectivity ensures your products reach local shops and markets efficiently.
                  </p>
                  <ul className="list-disc list-inside text-gray-700 mt-2">
                    <li>Direct delivery to local retailers</li>
                    <li>Flexible time slots for delivery</li>
                    <li>Real-time delivery status updates</li>
                  </ul>
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 mt-2">
                    Connect Now
                  </button>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LogisticsSupport;
