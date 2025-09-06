import React, { useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { crops } from "./crops";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const soilTypes = ["Loamy", "Sandy", "Sandy loam", "Clay loam"];
const moistureLevels = ["Low", "Moderate", "High"];

const CropCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [modalCrop, setModalCrop] = useState(null);
  const [tooltipCrop, setTooltipCrop] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  // Filters
  const [soilFilter, setSoilFilter] = useState("");
  const [moistureFilter, setMoistureFilter] = useState("");

  const handleMonthClick = (index) => setSelectedMonth(index);

  // Filter crops based on month, soil, and moisture
  const cropsThisMonth = selectedMonth !== null
    ? crops.filter(c => 
        c.months.includes(selectedMonth + 1) &&
        (soilFilter ? c.soil === soilFilter : true) &&
        (moistureFilter ? c.moisture === moistureFilter : true)
      )
    : [];

  return (
    <div className="mt-6 relative px-4 md:px-10">
      <h3 className="text-2xl font-semibold mb-4 text-center">Smart Crop Calendar</h3>

      {/* Filter Panel */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <select
          className="p-2 rounded-lg border"
          value={soilFilter}
          onChange={(e) => setSoilFilter(e.target.value)}
        >
          <option value="">All Soil Types</option>
          {soilTypes.map((s, i) => <option key={i} value={s}>{s}</option>)}
        </select>
        <select
          className="p-2 rounded-lg border"
          value={moistureFilter}
          onChange={(e) => setMoistureFilter(e.target.value)}
        >
          <option value="">All Moisture Levels</option>
          {moistureLevels.map((m, i) => <option key={i} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Month Grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
        {monthNames.map((month, index) => (
          <div
            key={index}
            onClick={() => handleMonthClick(index)}
            className={`cursor-pointer p-3 rounded-xl text-center font-medium shadow ${
              selectedMonth === index ? "bg-green-600 text-white" : "bg-white hover:shadow-lg"
            }`}
          >
            {month}
          </div>
        ))}
      </div>

      {/* Day Grid */}
      {selectedMonth !== null && (
        <div>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const dayCrops = cropsThisMonth.slice(0,5); // max 5 crops per day

              return (
                <div
                  key={i}
                  className="border rounded-md p-2 text-center text-sm relative cursor-pointer hover:shadow-md bg-white"
                >
                  {day}
                  <div className="flex justify-center gap-1 mt-1 flex-wrap">
                    {dayCrops.map((c, idx) => (
                      <img
                        key={idx}
                        src={c.img}
                        alt={c.name}
                        className="w-6 h-6 cursor-pointer rounded-full border"
                        onClick={() => setModalCrop(c)}
                        onMouseEnter={(e) => {
                          setTooltipCrop(c);
                          setTooltipPos({ x: e.clientX, y: e.clientY });
                        }}
                        onMouseLeave={() => setTooltipCrop(null)}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tooltip */}
      {tooltipCrop && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 bg-white p-2 rounded-lg shadow-lg border text-sm pointer-events-none w-40"
          style={{ top: tooltipPos.y + 10, left: tooltipPos.x + 10 }}
        >
          <div className="flex items-center gap-1">
            <img src={tooltipCrop.img} alt={tooltipCrop.name} className="w-4 h-4 rounded-full" />
            <span>{tooltipCrop.name} ({tooltipCrop.type})</span>
          </div>
        </motion.div>
      )}

      {/* Modal */}
      {modalCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-11/12 md:w-1/2 relative shadow-xl">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setModalCrop(null)}
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-2">{modalCrop.name}</h2>
            <p className="text-gray-600 mb-1">Type: {modalCrop.type}</p>
            <p className="text-gray-600 mb-1">Soil: {modalCrop.soil}</p>
            <p className="text-gray-600 mb-1">Moisture: {modalCrop.moisture}</p>
            <p className="text-gray-600 mb-1">Tips: {modalCrop.tips}</p>
            <p className="text-gray-600">Harvest Time: {modalCrop.harvest}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropCalendar;
