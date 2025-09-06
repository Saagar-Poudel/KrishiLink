import React, { useState } from "react";
import { motion } from "framer-motion";
import { storageFeatures } from "./featuresData";
import * as Icons from "lucide-react";

const StorageFacilities = () => {
  const storageSection = storageFeatures.find(
    (section) => section.section === "Storage Facilities"
  );

  if (!storageSection)
    return <p className="text-center mt-10 text-gray-500">No storage features found.</p>;

  const [activeForm, setActiveForm] = useState(null);
  const [activeExtra, setActiveExtra] = useState(null);
  const [activeDetails, setActiveDetails] = useState(null);

  const handleButtonClick = (action, item) => {
    if (action === "Book Storage") {
      setActiveForm(activeForm === item.id ? null : item.id);
      setActiveExtra(null);
      setActiveDetails(null);
    } else if (action === "Learn More") {
      setActiveExtra(activeExtra === item.id ? null : item.id);
      setActiveForm(null);
      setActiveDetails(null);
    } else if (action === "See Details") {
      setActiveDetails(activeDetails === item.id ? null : item.id);
      setActiveForm(null);
      setActiveExtra(null);
    }
  };

  return (
    <div className="py-16 container mx-auto px-5">
    
      

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {storageSection.items.map((item, i) => {
          const IconComponent = Icons[item.icon];

          return (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition"
              whileHover={{ scale: 1.03 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              {/* Icon */}
              <div className="mb-4 flex justify-center">
                {IconComponent && <IconComponent className="w-14 h-14 text-green-600" />}
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl font-semibold mb-2 text-center">{item.title}</h3>
              <p className="text-gray-600 mb-4 text-center">{item.desc}</p>

              {/* Buttons */}
              <div className="flex justify-between gap-2 mt-auto flex-wrap">
                {item.title === "Warehouse Storage" && (
                  <button
                    onClick={() => handleButtonClick("Book Storage", item)}
                    className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                  >
                    Book Storage
                  </button>
                )}
                <button
                  onClick={() => handleButtonClick("Learn More", item)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Learn More
                </button>
                <button
                  onClick={() => handleButtonClick("See Details", item)}
                  className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
                >
                  See Details
                </button>
              </div>

              {/* Book Storage Form */}
              {activeForm === item.id && item.title === "Warehouse Storage" && (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-green-50 p-4 rounded shadow-inner"
                >
                  <h4 className="font-semibold mb-2 text-green-700">Book Storage</h4>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <input
                    type="date"
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  >
                    Submit
                  </button>
                </motion.form>
              )}

              {/* Extra Content */}
              {activeExtra === item.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 bg-blue-50 p-4 rounded shadow-inner"
                >
                  <h4 className="font-semibold mb-2 text-blue-700">More About {item.title}</h4>
                  <p>{item.desc} This section gives extra details about the storage feature.</p>
                </motion.div>
              )}

              {/* See Details Modal */}
              {activeDetails === item.id && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl p-6 max-w-lg w-full shadow-lg relative"
                  >
                    <button
                      onClick={() => setActiveDetails(null)}
                      className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl font-bold"
                    >
                      &times;
                    </button>
                    <h3 className="text-2xl font-bold mb-2">{item.title} Details</h3>
                    <p className="text-gray-600 mb-4">{item.desc}</p>
                    <p className="text-gray-500">
                      Additional detailed information can be added here. You can include images, links, or any extra content.
                    </p>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default StorageFacilities;
