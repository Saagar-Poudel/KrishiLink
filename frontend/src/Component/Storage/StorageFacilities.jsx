import React, { useState } from "react";
import { storageFeatures } from "./featuresData.js";
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
    <div className="py-16 container mx-auto px-6">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-10">
        Storage Facilities
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storageSection.items.map((item) => {
          const IconComponent = Icons[item.icon];
          return (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
            >
              <div className="flex justify-center mb-4">
                {IconComponent && <IconComponent className="w-12 h-12 text-green-600" />}
              </div>

              <h3 className="text-xl font-semibold text-center mb-2">{item.title}</h3>
              <p className="text-gray-700 text-center mb-4">{item.desc}</p>

              <div className="flex flex-col gap-2">
                {item.title === "Warehouse Storage" && (
                  <button
                    onClick={() => handleButtonClick("Book Storage", item)}
                    className="bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                  >
                    Book Storage
                  </button>
                )}
                <button
                  onClick={() => handleButtonClick("Learn More", item)}
                  className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                  Learn More
                </button>
                <button
                  onClick={() => handleButtonClick("See Details", item)}
                  className="bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
                >
                  See Details
                </button>
              </div>

              {/* Book Form */}
              {activeForm === item.id && item.title === "Warehouse Storage" && (
                <div className="mt-4 bg-green-50 p-4 rounded space-y-2">
                  <input type="text" placeholder="Your Name" className="w-full border px-3 py-2 rounded" />
                  <input type="number" placeholder="Quantity" className="w-full border px-3 py-2 rounded" />
                  <input type="date" className="w-full border px-3 py-2 rounded" />
                  <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                    Submit
                  </button>
                </div>
              )}

              {/* Extra Info */}
              {activeExtra === item.id && (
                <div className="mt-4 bg-blue-50 p-4 rounded">
                  <p>{item.desc} This section gives extra details.</p>
                </div>
              )}

              {/* Details */}
              {activeDetails === item.id && (
                <div className="mt-4 bg-gray-100 p-4 rounded border">
                  <h4 className="font-semibold mb-2">{item.title} Details</h4>
                  <p>{item.desc}</p>
                  <p className="text-gray-600 mt-2">Additional info can go here.</p>
                  <button
                    onClick={() => setActiveDetails(null)}
                    className="mt-2 text-green-600 underline"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StorageFacilities;
