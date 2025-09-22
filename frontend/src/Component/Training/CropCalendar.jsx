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

  const getBgClass = (type) => {
    switch (typeColors[type]) {
      case "green": return "hover:bg-green-100 dark:hover:bg-green-800";
      case "orange": return "hover:bg-orange-100 dark:hover:bg-orange-800";
      case "yellow": return "hover:bg-yellow-100 dark:hover:bg-yellow-800";
      case "purple": return "hover:bg-purple-100 dark:hover:bg-purple-800";
      default: return "hover:bg-gray-100 dark:hover:bg-gray-700";
    }
  };

  return (
    <div className="mt-6 relative px-4 md:px-10 transition-colors duration-500 bg-gray-50 dark:bg-[#0B1A12] min-h-screen">
      <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-green-200">🌱 Smart Crop Calendar</h3>

      {/* Filters */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <select
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#12241A] text-gray-800 dark:text-gray-200"
          value={soilFilter}
          onChange={(e) => setSoilFilter(e.target.value)}
        >
          <option value="">All Soil Types</option>
          {soilTypes.map((s, i) => (<option key={i} value={s}>{s}</option>))}
        </select>

        <select
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#12241A] text-gray-800 dark:text-gray-200"
          value={moistureFilter}
          onChange={(e) => setMoistureFilter(e.target.value)}
        >
          <option value="">All Moisture Levels</option>
          {moistureLevels.map((m, i) => (<option key={i} value={m}>{m}</option>))}
        </select>

        <select
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#12241A] text-gray-800 dark:text-gray-200"
          onChange={handleMonthChange}
          value={selectedMonth ?? ""}
        >
          <option value="">Select Month</option>
          {monthNames.map((month, idx) => (<option key={idx} value={idx}>{month}</option>))}
        </select>
      </div>

      {/* Weekly Cards + Selected Crop */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Weekly Crop Cards */}
        <div className="md:w-1/2 grid gap-4">
          {weeks.map((w) => {
            const weekCrops = getWeekCrops(w);
            return (
              <motion.div
                key={w}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: w * 0.1 }}
                className="border rounded-lg p-3 shadow-md dark:shadow-lg bg-white dark:bg-[#12241A] hover:shadow-xl transition-shadow duration-300"
              >
                <h4 className="font-bold mb-2 text-gray-800 dark:text-green-200">Week {w + 1}</h4>
                <div className="flex flex-wrap gap-2">
                  {weekCrops.length > 0 ? weekCrops.map((c, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className={`cursor-pointer p-1 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center gap-1 ${getBgClass(c.type)}`}
                      onClick={() => setSelectedCrop(c)}
                      onMouseEnter={(e) => { setTooltipCrop(c); setTooltipPos({ x: e.clientX, y: e.clientY }); }}
                      onMouseLeave={() => setTooltipCrop(null)}
                    >
                      <img src={c.img} alt={c.name} className="w-10 h-10 rounded-xl" />
                      <span className="text-sm text-gray-800 dark:text-gray-200">{c.name}</span>
                    </motion.div>
                  )) : <p className="text-gray-400 dark:text-gray-400 text-sm">No crops</p>}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Selected Crop Details */}
        <div className="md:w-1/2 border rounded-lg p-4 shadow-md dark:shadow-lg bg-white dark:bg-[#12241A] transition-colors duration-500">
          {selectedCrop ? (
            <motion.div whileHover={{ scale: 1 }}>
              <img src={selectedCrop.img} alt={selectedCrop.name} className="w-45 h-45 mb-2 rounded-xl mx-auto" />
              <h2 className="text-xl font-bold mb-1 text-center text-gray-800 dark:text-green-200">{selectedCrop.name}</h2>
              <p className="text-gray-800 dark:text-gray-200"><strong>Type:</strong> {selectedCrop.type}</p>
              <p className="text-gray-800 dark:text-gray-200"><strong>Soil:</strong> {selectedCrop.soil}</p>
              <p className="text-gray-800 dark:text-gray-200"><strong>Moisture:</strong> {selectedCrop.moisture}</p>
              <p className="text-gray-800 dark:text-gray-200"><strong>Tips:</strong> {selectedCrop.tips}</p>
              <p className="text-gray-800 dark:text-gray-200"><strong>Harvest:</strong> {selectedCrop.harvest}</p>
              <p className="text-gray-800 dark:text-gray-200"><strong>Description:</strong> {selectedCrop.description}</p>
            </motion.div>
          ) : <p className="text-gray-400 dark:text-gray-400 text-center">Select a crop to see details</p>}
        </div>
      </div>

      {/* Tooltip */}
      {tooltipCrop && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute z-50 bg-white dark:bg-[#12241A] p-2 rounded-lg shadow-lg dark:shadow-xl border dark:border-gray-700 text-sm pointer-events-none w-40 text-gray-800 dark:text-gray-200 transition-colors duration-300"
          style={{ top: tooltipPos.y + 10, left: tooltipPos.x + 10 }}
        >
          <div className="flex items-center gap-1">
            <img src={tooltipCrop.img} alt={tooltipCrop.name} className="w-6 h-6 rounded-full" />
            <span className="font-semibold">{tooltipCrop.name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">({tooltipCrop.type})</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CropCalendar;
