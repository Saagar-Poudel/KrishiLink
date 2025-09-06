// src/Component/Delivery/DeliveryTransportation.jsx

import React, { useState } from "react";
import { motion } from "framer-motion";
import { storageFeatures } from "../Storage/featuresData";
import * as Icons from "lucide-react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DeliveryTransportation = () => {
  const deliverySection = storageFeatures.find(
    (section) => section.section === "Delivery & Transportation"
  );

  if (!deliverySection) return null;

  const [activeCard, setActiveCard] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    pickup: "",
    drop: "",
    truckSize: "",
    date: "",
    time: "",
    notes: "",
    gpsTracking: false,
  });

  const [pickupCoords, setPickupCoords] = useState([27.7172, 85.324]);
  const [dropCoords, setDropCoords] = useState([27.7172, 85.324]);

  const availableTrucks = {
    small: ["Truck A", "Truck B"],
    medium: ["Truck C"],
    large: ["Truck D", "Truck E"],
  };

  const truckIcon = new L.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1995/1995594.png",
    iconSize: [30, 30],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "pickup") {
      setPickupCoords(value.toLowerCase().includes("pokhara") ? [28.2096, 83.9856] : [27.7172, 85.324]);
    }
    if (name === "drop") {
      setDropCoords(value.toLowerCase().includes("pokhara") ? [28.2096, 83.9856] : [27.7172, 85.324]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking submitted! (Demo)");
    setFormData({
      name: "",
      contact: "",
      pickup: "",
      drop: "",
      truckSize: "",
      date: "",
      time: "",
      notes: "",
      gpsTracking: false,
    });
  };

  return (
    <div className="py-12 container mx-auto px-5">
      <h2 className="text-3xl font-bold text-green-700 mb-6">{deliverySection.section}</h2>
      <p className="text-gray-600 mb-10">{deliverySection.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {deliverySection.items.map((item) => {
          const IconComponent = Icons[item.icon];
          return (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl shadow-md p-6 flex flex-col hover:shadow-lg transition cursor-pointer"
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
                  onClick={() => setActiveCard(activeCard === item.id ? null : item.id)}
                >
                  {item.action}
                </button>
              </div>

              {activeCard === item.id && (
                <motion.div
                  className="mt-4 bg-green-50 p-4 rounded-xl shadow-inner"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Book Truck Form */}
                  {item.action.toLowerCase().includes("book") ? (
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                      <input
                        type="tel"
                        name="contact"
                        placeholder="Contact Number"
                        value={formData.contact}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                      <input
                        type="text"
                        name="pickup"
                        placeholder="Pickup Location"
                        value={formData.pickup}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                      <input
                        type="text"
                        name="drop"
                        placeholder="Drop Location"
                        value={formData.drop}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                      />
                      <select
                        name="truckSize"
                        value={formData.truckSize}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                        required
                      >
                        <option value="">Select Truck Size</option>
                        <option value="small">Small (1-3 tons)</option>
                        <option value="medium">Medium (4-7 tons)</option>
                        <option value="large">Large (8+ tons)</option>
                      </select>

                      {formData.truckSize && (
                        <ul className="list-disc list-inside text-gray-700">
                          {availableTrucks[formData.truckSize]?.map((truck) => (
                            <li key={truck}>{truck}</li>
                          ))}
                        </ul>
                      )}

                      <div className="flex gap-2">
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          className="flex-1 p-2 border rounded"
                          required
                        />
                        <input
                          type="time"
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="flex-1 p-2 border rounded"
                          required
                        />
                      </div>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          name="gpsTracking"
                          checked={formData.gpsTracking}
                          onChange={handleInputChange}
                          className="w-4 h-4"
                        />
                        Enable GPS Tracking
                      </label>

                      <textarea
                        name="notes"
                        placeholder="Additional Notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="w-full p-2 border rounded"
                      />

                      <div className="h-64 mt-4 rounded overflow-hidden border">
                        <MapContainer center={pickupCoords} zoom={7} className="h-full w-full">
                          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                          <Marker position={pickupCoords} icon={truckIcon} />
                          <Marker position={dropCoords} icon={truckIcon} />
                        </MapContainer>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                      >
                        Submit Booking
                      </button>
                    </form>
                  ) : (
                    // See Details / Learn More for Courier & GPS
                    <div className="text-gray-700 mt-2 space-y-2">
                      {item.title === "Courier Service" && (
                        <ul className="list-disc list-inside">
                          <li>Same-day and next-day delivery options</li>
                          <li>Package insurance available</li>
                          <li>Real-time tracking via SMS or app</li>
                          <li>Affordable pricing for small packages</li>
                        </ul>
                      )}
                      {item.title === "GPS Tracking" && (
                        <div className="h-64 mt-2 rounded overflow-hidden border">
                          <MapContainer center={pickupCoords} zoom={7} className="h-full w-full">
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker position={pickupCoords} icon={truckIcon} />
                            <Marker position={dropCoords} icon={truckIcon} />
                          </MapContainer>
                          <p className="mt-2 text-gray-600 text-sm">
                            Real-time GPS tracking of your delivery routes.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryTransportation;
