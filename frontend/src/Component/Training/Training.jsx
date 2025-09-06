import React, { useState } from "react";
import { motion } from "framer-motion";
import LearningHub from "./LearningHub";
import CropCalendar from "./CropCalendar";
import MediaResources from "./MediaResources";
import CommunityHub from "./CommunityHub";
import SupportAndFAQ from "./SupportAndFAQ";
import { BookOpen, Calendar, Video, Users, HelpCircle } from "lucide-react";

const tabs = [
  { name: "LearningHub", label: "Learning Hub", icon: <BookOpen /> },
  { name: "CropCalendar", label: "Crop Calendar", icon: <Calendar /> },
  { name: "MediaResources", label: "Media Resources", icon: <Video /> },
  { name: "CommunityHub", label: "Community Hub", icon: <Users /> },
  { name: "SupportAndFAQ", label: "Support & FAQ", icon: <HelpCircle /> },
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-16 px-6 bg-white shadow-md">
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4 text-gray-800"
        >
          Smart Agricultural Training
        </motion.h1>
        <p className="max-w-2xl text-lg text-gray-600">
          Explore our learning hub, crop calendar, resources, and community to grow your farming skills. Selecting a crop will dynamically update all sections.
        </p>
      </section>

      {/* Tabs Navigation */}
      <nav className="flex flex-wrap justify-center gap-4 mt-6">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
              activeTab === tab.name
                ? "bg-green-600 text-white shadow-md"
                : "bg-white text-gray-800 hover:bg-gray-100"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </nav>

      {/* Active Tab Content */}
      <div className="mt-8 px-4 md:px-8">{renderActiveTab()}</div>
    </div>
  );
};

export default Training;
