import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";

const properMethods = [
  { icon: "🛢️", title: "Metal Bins", desc: "Store grains in airtight metal bins to prevent pests and moisture." },
  { icon: "🛍️", title: "Hermetic Bags", desc: "Special sealed bags that stop insects and mold growth." },
  { icon: "❄️", title: "Cold Storage", desc: "Keep fruits and vegetables fresh for weeks in temperature control." },
  { icon: "🌱", title: "Seed Vaults", desc: "Dry seeds and keep in moisture-proof vaults for future planting." },
];

const traditionalMethods = [
  { icon: "🏺", title: "Mud Pots", desc: "Seeds and grains stored in sealed mud pots." },
  { icon: "🎋", title: "Bamboo Bins", desc: "Grains stored in woven bamboo containers in rural areas." },
  { icon: "🌾", title: "Straw Pits", desc: "Root crops stored underground covered with straw." },
  { icon: "🍃", title: "Neem Leaves", desc: "Neem leaves mixed with grains to repel pests naturally." },
];

const advancedTechniques = [
  { icon: "🧊", title: "Vacuum Sealing", desc: "Removes air from storage bags, preventing spoilage." },
  { icon: "🌡️", title: "Controlled Atmosphere Storage", desc: "Adjust oxygen and CO2 levels to extend shelf life." },
  { icon: "💨", title: "Dehydration", desc: "Dry fruits and grains to reduce moisture and prevent mold." },
  { icon: "📦", title: "Modular Storage Units", desc: "Stackable containers for efficient space utilization." },
];

const storageVideos = [
  { title: "Proper Grain Storage", url: "https://www.youtube.com/embed/dQ4w9WgXcQ" },
  { title: "Cold Storage Tips", url: "https://www.youtube.com/embed/VIDEO_ID_2" },
  { title: "Hermetic Bags Usage", url: "https://www.youtube.com/embed/VIDEO_ID_3" },
];

const locations = [
  { name: "Kathmandu Cold Storage", position: [27.7172, 85.3240], address: "New Baneshwor, Kathmandu", distance: "2.1 km" },
  { name: "Bhaktapur Cold Storage", position: [27.6710, 85.4298], address: "Suryabinayak, Bhaktapur", distance: "5.4 km" },
  { name: "Lalitpur Cold Storage", position: [27.6644, 85.3188], address: "Satdobato, Lalitpur", distance: "4.7 km" },
  { name: "Kalanki Agro Market", position: [27.6935, 85.2881], address: "Kalanki, Kathmandu", distance: "3.2 km" },
  { name: "Bhaktapur Farmers Market", position: [27.6725, 85.4278], address: "Dattatreya Square, Bhaktapur", distance: "5.8 km" },
];

const LocationMap = () => {
  const [userPos, setUserPos] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
        () => setError("Unable to fetch your location")
      );
    } else {
      setError("Geolocation not supported");
    }
  }, []);

  const center = userPos || [27.7172, 85.3240];

  return (
    <div className="w-full h-[350px] rounded-xl shadow overflow-hidden mb-6">
      <MapContainer center={center} zoom={12} style={{ height: "100%", width: "100%" }} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {userPos && (
          <Marker position={userPos}>
            <Popup>Your Location</Popup>
          </Marker>
        )}
        {locations.map((loc, idx) => (
          <Marker position={loc.position} key={idx}>
            <Popup>
              {loc.name}
              <br />
              {loc.address}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
};

const SliderCard = ({ icon, title, desc }) => (
  <div className="bg-white p-6 shadow-lg rounded-2xl h-56 flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-2xl border border-gray-200">
    <div className="text-4xl mb-2">{icon}</div>
    <h3 className="text-xl font-bold text-black mb-1 text-center">{title}</h3>
    <p className="mt-2 text-gray-700 text-center text-base font-medium">{desc}</p>
  </div>
);

const Storage = () => {
  const storageTips = [
    { tip: "Check moisture levels regularly to prevent spoilage.", icon: "💧" },
    { tip: "Clean storage containers before use to avoid contamination.", icon: "🧼" },
    { tip: "Label and date all stored items for easy tracking.", icon: "🏷️" },
    { tip: "Keep storage areas well-ventilated and dry.", icon: "🌬️" },
  ];

  return (
    <div className="container mx-auto px-4 py-8 font-inter min-h-screen">
      {/* Hero */}
      <section className="text-center py-10 bg-white-700">
        <h1 className="text-4xl font-bold text-green-900">Smart Crop Storage</h1>
        <p className="mt-2 text-lg text-black-100">
          Learn best practices to keep your harvest fresh, safe, and profitable.
        </p><hr />
      </section>

      {/* Map Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-black-900 mb-4 text-center">Nearby Cold Storage & Marketplaces</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {locations.map((loc, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl shadow bg-white flex flex-col gap-2 hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer"
            >
              <h3 className="text-lg font-bold text-black">{loc.name}</h3>
              <p className="text-sm text-gray-700">Address: {loc.address}</p>
              <p className="text-sm text-gray-700">Distance: {loc.distance}</p>
            </div>
          ))}
        </div>
        <LocationMap />
      </section>

      {/* Proper Methods */}
      <section className="mb-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-black-900 text-center mb-4">Proper Storage Methods</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {properMethods.map((m, i) => (
            <SwiperSlide key={i}>
              <SliderCard {...m} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Traditional Methods */}
      <section className="mb-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-black-900 text-center mb-4">Traditional Storage Methods</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {traditionalMethods.map((m, i) => (
            <SwiperSlide key={i}>
              <SliderCard {...m} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Advanced Techniques */}
      <section className="mb-8 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-black-900 text-center mb-4">Advanced Storage Techniques</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        >
          {advancedTechniques.map((tech, i) => (
            <SwiperSlide key={i}>
              <SliderCard {...tech} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* Storage Tips Section */}
      <section className="mb-8 bg-green-50 rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold text-green-900 text-center mb-4">Quick Storage Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {storageTips.map((tipObj, idx) => (
            <div key={idx} className="flex flex-col items-center bg-white p-4 rounded-xl shadow hover:scale-105 transition-transform border border-green-200">
              <div className="text-3xl mb-2">{tipObj.icon}</div>
              <p className="text-black text-center font-medium">{tipObj.tip}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Video Tutorials */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-black-800 text-center mb-4">Storage Video Tutorials</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {storageVideos.map((vid, i) => (
            <div key={i} className="rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform border border-green-200">
              <iframe
                className="w-full h-56"
                src={vid.url}
                title={vid.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <div className="p-4 bg-white text-black font-semibold text-center">{vid.title}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Storage;
