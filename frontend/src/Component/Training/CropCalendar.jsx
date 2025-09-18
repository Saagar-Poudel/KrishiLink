import React, { useState } from "react";
import { motion } from "framer-motion";
import { crops } from "./crops";

const monthNames = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

const soilTypes = ["Loamy", "Sandy", "Sandy loam", "Clay loam"];
const moistureLevels = ["Low", "Moderate", "High"];

const typeColors = {
  Vegetable: "green",
  Fruit: "orange",
  Grain: "yellow",
  Herb: "purple",
  Nut: "purple"
};

const CropCalendar = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [tooltipCrop, setTooltipCrop] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [soilFilter, setSoilFilter] = useState("");
  const [moistureFilter, setMoistureFilter] = useState("");

  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
    setSelectedCrop(null);
  };

  const cropsThisMonth =
    selectedMonth !== null
      ? crops.filter(
          (c) =>
            Array.isArray(c.months) &&
            c.months.includes(selectedMonth + 1) &&
            (soilFilter ? c.soil === soilFilter : true) &&
            (moistureFilter ? c.moisture === moistureFilter : true)
        )
      : [];

  const getWeekCrops = (weekIndex) => {
    const totalCrops = cropsThisMonth.length;
    const perWeek = Math.ceil(totalCrops / 4);
    return cropsThisMonth.slice(weekIndex * perWeek, (weekIndex + 1) * perWeek);
  };

  const weeks = [0, 1, 2, 3];

  // Dynamic Tailwind classes for crop types
  const getBgClass = (type) => {
    switch (typeColors[type]) {
      case "green": return "hover:bg-green-100";
      case "orange": return "hover:bg-orange-100";
      case "yellow": return "hover:bg-yellow-100";
      case "purple": return "hover:bg-purple-100";
      default: return "hover:bg-gray-100";
    }
  };

  return (
    <div className="mt-6 relative px-4 md:px-10">
      <h3 className="text-2xl font-semibold mb-6 text-center">🌱 Smart Crop Calendar</h3>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <select className="p-2 rounded-lg border" value={soilFilter} onChange={(e) => setSoilFilter(e.target.value)}>
          <option value="">All Soil Types</option>
          {soilTypes.map((s, i) => (<option key={i} value={s}>{s}</option>))}
        </select>

        <select className="p-2 rounded-lg border" value={moistureFilter} onChange={(e) => setMoistureFilter(e.target.value)}>
          <option value="">All Moisture Levels</option>
          {moistureLevels.map((m, i) => (<option key={i} value={m}>{m}</option>))}
        </select>

        <select className="p-2 rounded-lg border" onChange={handleMonthChange} value={selectedMonth ?? ""}>
          <option value="">Select Month</option>
          {monthNames.map((month, idx) => (<option key={idx} value={idx}>{month}</option>))}
        </select>
      </div>

      {/* Weekly Cards + Selected Crop */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 grid gap-4">
          {weeks.map((w) => {
            const weekCrops = getWeekCrops(w);
            return (
              <motion.div
                key={w}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: w * 0.1 }}
                className="border rounded-lg p-3 shadow bg-white hover:shadow-lg"
              >
                <h4 className="font-bold mb-2">Week {w + 1}</h4>
                <div className="flex flex-wrap gap-2">
                  {weekCrops.length > 0 ? weekCrops.map((c, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className={`cursor-pointer p-1 border rounded-lg flex items-center gap-1 ${getBgClass(c.type)}`}
                      onClick={() => setSelectedCrop(c)}
                      onMouseEnter={(e) => { setTooltipCrop(c); setTooltipPos({ x: e.clientX, y: e.clientY }); }}
                      onMouseLeave={() => setTooltipCrop(null)}
                    >
                      <img src={c.img} alt={c.name} className="w-10 h-10 rounded-xl" />
                      <span className="text-sm">{c.name}</span>
                    </motion.div>
                  )) : <p className="text-gray-400 text-sm">No crops</p>}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="md:w-1/2 border rounded-lg p-4 shadow bg-white">
          {selectedCrop ? (
            <motion.div whileHover={{ scale: 1 }}>
              <img src={selectedCrop.img} alt={selectedCrop.name} className="w-45 h-45 mb-2 rounded-xl mx-auto" />
              <h2 className="text-xl font-bold mb-1 text-center">{selectedCrop.name}</h2>
              <p><strong>Type:</strong> {selectedCrop.type}</p>
              <p><strong>Soil:</strong> {selectedCrop.soil}</p>
              <p><strong>Moisture:</strong> {selectedCrop.moisture}</p>
              <p><strong>Tips:</strong> {selectedCrop.tips}</p>
              <p><strong>Harvest:</strong> {selectedCrop.harvest}</p>
              <p><strong>Description:</strong> {selectedCrop.description}</p>
            </motion.div>
          ) : <p className="text-gray-400">Select a crop to see details</p>}
        </div>
      </div>

      {/* Tooltip */}
      {tooltipCrop && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 bg-white p-2 rounded-lg shadow-lg border text-sm pointer-events-none w-40"
          style={{ top: tooltipPos.y + 10, left: tooltipPos.x + 10 }}
        >
          <div className="flex items-center gap-1">
            <img src={tooltipCrop.img} alt={tooltipCrop.name} className="w-6 h-6 rounded-full" />
            <span className="font-semibold">{tooltipCrop.name}</span>
            <span className="text-xs text-gray-500">({tooltipCrop.type})</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CropCalendar;
