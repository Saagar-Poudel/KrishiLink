import React, { useState } from "react";
import { Leaf, Droplet, BookOpen } from "lucide-react";
import CropCalendar from "./CropCalendar.jsx"; // import new calendar component

const Card = ({ title, description, Icon, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white shadow-md rounded-2xl p-6 m-3 hover:shadow-xl transition duration-300 cursor-pointer flex flex-col items-center text-center"
  >
    <Icon className="w-12 h-12 text-green-600 mb-4" />
    <h3 className="font-semibold text-lg mb-2">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const LearningHub = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <div className="learning-page bg-gray-50 min-h-screen px-6 py-12">
      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card
          title="Crop Calendar"
          description="Click to view crops for each month."
          Icon={Leaf}
          onClick={() => setShowCalendar(!showCalendar)}
        />
        <Card
          title="Fertilizer & Irrigation Tools"
          description="Calculate fertilizer needs, plan irrigation schedules."
          Icon={Droplet}
          onClick={() => alert("Feature coming soon!")}
        />
        <Card
          title="Farming Tips"
          description="Get practical tips on planting, pest control, crop rotation."
          Icon={BookOpen}
          onClick={() => alert("Feature coming soon!")}
        />
      </div>

      {/* Crop Calendar */}
      {showCalendar && <CropCalendar />}
    </div>
  );
};

export default LearningHub;
