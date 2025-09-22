import React, { useState } from "react";
import { motion } from "framer-motion";
import LearningHub from "./LearningHub";
import CropCalendar from "./CropCalendar";
import MediaResources from "./mediaResources";
// import CommunityHub from "./communityHub";
import SupportAndFAQ from "./supportAndFAQ";
import { BookOpen, Calendar, Video, Users, HelpCircle } from "lucide-react";

const tabs = [
  { name: "LearningHub", label: "Learning Hub", icon: <BookOpen /> },
  // { name: "CropCalendar", label: "Crop Calendar", icon: <Calendar /> },
  { name: "MediaResources", label: "Media Resources", icon: <Video /> },
  // { name: "CommunityHub", label: "Community Hub", icon: <Users /> },
  // { name: "SupportAndFAQ", label: "Support & FAQ", icon: <HelpCircle /> },
];

const Training = () => {
  const [activeTab, setActiveTab] = useState("LearningHub");
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [soilType, setSoilType] = useState("All");
  const [moistureLevel, setMoistureLevel] = useState("All");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "LearningHub":
        return (
          <LearningHub
            selectedCrop={selectedCrop}
            soilType={soilType}
            moistureLevel={moistureLevel}
          />
        );
      case "CropCalendar":
        return (
          <CropCalendar
            selectedCrop={selectedCrop}
            setSelectedCrop={setSelectedCrop}
            soilType={soilType}
            setSoilType={setSoilType}
            moistureLevel={moistureLevel}
            setMoistureLevel={setMoistureLevel}
          />
        );
      case "MediaResources":
        return <MediaResources selectedCrop={selectedCrop} />;
      case "CommunityHub":
        return <CommunityHub selectedCrop={selectedCrop} />;
      case "SupportAndFAQ":
        return <SupportAndFAQ selectedCrop={selectedCrop} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B1A12] transition-colors duration-500">
      
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 px-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-[#0B1A12] dark:to-[#123223] shadow-md rounded-b-3xl transition-colors duration-500">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-green-200"
        >
          Smart Agricultural Training
        </motion.h1>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl text-lg sm:text-xl text-gray-600 dark:text-gray-300"
        >
          Explore our learning hub, crop calendar, resources, and community to grow your farming skills. Selecting a crop will dynamically update all sections.
        </motion.p>
      </section>

      {/* Tabs Navigation */}
      <nav className="flex flex-wrap justify-center gap-4 mt-6 px-4 md:px-0">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 shadow-md ${
              activeTab === tab.name
                ? "bg-green-600 text-white dark:bg-green-700"
                : "bg-white dark:bg-[#1F2937] text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#2B3A2B]"
            }`}
          >
            <span className="w-5 h-5">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Active Tab Content */}
      <div className="mt-8 px-4 md:px-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderActiveTab()}
        </motion.div>
      </div>
    </div>
  );
};

export default Training;
