import React, { useState } from "react";
import { Leaf, Droplet, BookOpen } from "lucide-react";
import CropCalendar from "./CropCalendar"; // Ensure this exists

const LearningHub = () => {
  const [activeCard, setActiveCard] = useState(null);

  // Data
  const fertilizers = [
    { name: "Urea", usage: "Apply at early growth stage.", icon: <Leaf className="w-10 h-10 text-green-600" /> },
    { name: "DAP", usage: "Use during sowing for root growth.", icon: <Leaf className="w-10 h-10 text-yellow-500" /> },
    { name: "Compost", usage: "Mix with soil before planting.", icon: <Leaf className="w-10 h-10 text-orange-500" /> },
  ];

  const irrigationTools = [
    { name: "Sprinkler", usage: "Distributes water evenly.", icon: <Droplet className="w-10 h-10 text-blue-500" /> },
    { name: "Drip Irrigation", usage: "Saves water, delivers to roots.", icon: <Droplet className="w-10 h-10 text-cyan-500" /> },
    { name: "Watering Can", usage: "Manual watering for small gardens.", icon: <Droplet className="w-10 h-10 text-indigo-500" /> },
  ];

  const farmingTips = [
    { title: "Crop Rotation", description: "Change crops each season to maintain soil fertility.", icon: <BookOpen className="w-10 h-10 text-green-600" /> },
    { title: "Organic Farming", description: "Use natural fertilizers and avoid chemicals.", icon: <BookOpen className="w-10 h-10 text-yellow-500" /> },
    { title: "Pest Management", description: "Control pests safely and efficiently.", icon: <BookOpen className="w-10 h-10 text-red-500" /> },
  ];

  const Card = ({ title, description, icon, onClick }) => (
    <div
      onClick={onClick}
      className="p-5 bg-white shadow-md rounded-xl cursor-pointer flex flex-col items-center gap-3 hover:shadow-lg transition"
    >
      {icon}
      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm text-center">{description}</p>
    </div>
  );

  return (
    <div className="p-6 bg-white">
      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card
          title="Crop Calendar"
          description="View crop suggestions by month with tips and details."
          icon={<Leaf className="w-10 h-10 text-green-600" />}
          onClick={() => setActiveCard("calendar")}
        />
        <Card
          title="Fertilizers & Tools"
          description="Learn about fertilizers and irrigation tools."
          icon={<Droplet className="w-10 h-10 text-blue-500" />}
          onClick={() => setActiveCard("fertilizers")}
        />
        <Card
          title="Farming Tips"
          description="Get essential tips to improve your farming practices."
          icon={<BookOpen className="w-10 h-10 text-yellow-500" />}
          onClick={() => setActiveCard("tips")}
        />
      </div>

      {/* Dynamic Content */}
      <div className="mt-6">
        {activeCard === "calendar" && <CropCalendar />}

        {activeCard === "fertilizers" && (
          <div className="grid md:grid-cols-3 gap-6">
            {fertilizers.map((f, i) => (
              <div
                key={i}
                className="p-4 bg-white shadow-md rounded-xl flex flex-col items-center text-center gap-2 hover:shadow-lg transition"
              >
                {f.icon}
                <h3 className="font-semibold text-lg text-gray-800">{f.name}</h3>
                <p className="text-gray-600 text-sm">{f.usage}</p>
              </div>
            ))}
            {irrigationTools.map((t, i) => (
              <div
                key={i}
                className="p-4 bg-white shadow-md rounded-xl flex flex-col items-center text-center gap-2 hover:shadow-lg transition"
              >
                {t.icon}
                <h3 className="font-semibold text-lg text-gray-800">{t.name}</h3>
                <p className="text-gray-600 text-sm">{t.usage}</p>
              </div>
            ))}
          </div>
        )}

        {activeCard === "tips" && (
          <div className="grid md:grid-cols-3 gap-6">
            {farmingTips.map((tip, i) => (
              <div
                key={i}
                className="p-4 bg-white shadow-md rounded-xl flex flex-col items-center text-center gap-2 hover:shadow-lg transition"
              >
                {tip.icon}
                <h3 className="font-semibold text-lg text-gray-800">{tip.title}</h3>
                <p className="text-gray-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningHub;
