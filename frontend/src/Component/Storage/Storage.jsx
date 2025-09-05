import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, Truck, Warehouse, MapPin, Package } from "lucide-react";

const stats = [
  { id: 1, value: "5K+", label: "Farmers Using Storage" },
  { id: 2, value: "200+", label: "Storage Hubs" },
  { id: 3, value: "500+", label: "Trucks Available" },
];

const storageMethods = [
  { id: 1, title: "Cold Storage", desc: "Keeps vegetables and fruits fresh with controlled temperature.", icon: <Package className="w-10 h-10 text-blue-600 mx-auto" /> },
  { id: 2, title: "Dry Storage", desc: "Safe and hygienic storage for grains and pulses.", icon: <Warehouse className="w-10 h-10 text-yellow-600 mx-auto" /> },
  { id: 3, title: "Grain Silos", desc: "Large-scale storage for bulk crops.", icon: <Leaf className="w-10 h-10 text-green-600 mx-auto" /> },
  { id: 4, title: "Organic Vaults", desc: "Preserves organic produce with natural methods.", icon: <Package className="w-10 h-10 text-orange-600 mx-auto" /> },
];

const trucks = [
  { id: 1, name: "Small Pickup", capacity: "1 Ton", img: "https://via.placeholder.com/400x250/90EE90/000000?text=Pickup" },
  { id: 2, name: "Medium Truck", capacity: "5 Tons", img: "https://via.placeholder.com/400x250/FFD700/000000?text=Truck" },
  { id: 3, name: "Large Lorry", capacity: "15 Tons", img: "https://via.placeholder.com/400x250/87CEFA/000000?text=Lorry" },
];

const testimonials = [
  { id: 1, name: "Ramesh (Farmer)", text: "With KrishiLink storage, my vegetables stay fresh longer and sell at better prices." },
  { id: 2, name: "Anita (Retailer)", text: "I can order storage and transport in one place – saves me time and money." },
  { id: 3, name: "Govind (Transporter)", text: "Truck hiring is so simple now, and I get regular trips from farmers." },
];

const StorageDashboard = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", date: "", notes: "" });

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleTruckSelect = (truck) => setSelectedTruck(truck);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Truck ${selectedTruck.name} booked successfully!`);
    setFormData({ name: "", email: "", date: "", notes: "" });
    setSelectedTruck(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-20 px-6 bg-white">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-4 text-gray-800"
        >
          Smart Agricultural Storage & Logistics
        </motion.h1>
        <p className="max-w-2xl text-lg text-gray-600">
          Keep your harvest fresh, secure, and ready for the market with KrishiLink storage solutions.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2"
        >
          Get Started <ArrowRight />
        </motion.button>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.id} className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-3xl font-bold text-green-600">{s.value}</h2>
            <p className="mt-2 text-gray-600">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Storage Methods */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Storage Methods</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {storageMethods.map((m) => (
            <motion.div
              whileHover={{ y: -5 }}
              key={m.id}
              className="bg-white rounded-2xl shadow p-6 text-center"
            >
              {m.icon}
              <h3 className="mt-4 font-semibold">{m.title}</h3>
              <p className="text-gray-600 mt-2 text-sm">{m.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Truck Booking Section */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Hire Trucks for Transport</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trucks.map((truck) => (
            <div
              key={truck.id}
              onClick={() => handleTruckSelect(truck)}
              className="bg-white rounded-2xl shadow p-6 text-center cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform"
            >
              <img src={truck.img} alt={truck.name} className="w-full h-48 object-cover rounded-lg" />
              <h3 className="mt-3 font-semibold">{truck.name}</h3>
              <p className="text-green-600 font-bold">{truck.capacity}</p>
            </div>
          ))}
        </div>

        {selectedTruck && (
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow max-w-md mx-auto mt-8">
            <h3 className="text-xl font-bold mb-4 text-center">Book {selectedTruck.name}</h3>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full mb-3 p-2 border rounded"
              required
            />
            <textarea
              name="notes"
              placeholder="Additional Notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full mb-3 p-2 border rounded"
            ></textarea>
            <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Book Now
            </button>
          </form>
        )}
      </section>

      {/* How It Works */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-2xl shadow p-6">
            <Leaf className="w-10 h-10 text-green-600 mx-auto" />
            <h3 className="mt-4 font-semibold">Store Harvest</h3>
            <p className="text-gray-600 mt-2 text-sm">Farmers place crops in KrishiLink storage hubs.</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <Warehouse className="w-10 h-10 text-yellow-600 mx-auto" />
            <h3 className="mt-4 font-semibold">Safe Storage</h3>
            <p className="text-gray-600 mt-2 text-sm">Crops preserved with modern storage techniques.</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <Truck className="w-10 h-10 text-blue-600 mx-auto" />
            <h3 className="mt-4 font-semibold">Transport</h3>
            <p className="text-gray-600 mt-2 text-sm">Hire trucks to deliver produce on demand.</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6">
            <MapPin className="w-10 h-10 text-red-600 mx-auto" />
            <h3 className="mt-4 font-semibold">Reach Market</h3>
            <p className="text-gray-600 mt-2 text-sm">Fresh goods arrive at retailers and buyers.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">What People Say</h2>
        <motion.div
          key={testimonialIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8 max-w-xl mx-auto text-center"
        >
          <p className="text-gray-700 italic">“{testimonials[testimonialIndex].text}”</p>
          <h4 className="mt-4 font-semibold text-green-600">{testimonials[testimonialIndex].name}</h4>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center bg-white">
        <h2 className="text-4xl font-bold mb-4">Smarter Storage, Faster Transport</h2>
        <p className="max-w-2xl mx-auto text-lg text-gray-600">
          From storage to delivery, KrishiLink ensures your crops stay fresh and reach the market on time.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2 mx-auto"
        >
          Start Now <ArrowRight />
        </motion.button>
      </section>
    </div>
  );
};

export default StorageDashboard;
