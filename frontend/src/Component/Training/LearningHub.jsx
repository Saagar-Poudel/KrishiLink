import React, { useState } from "react";
import { Leaf, Droplet, BookOpen } from "lucide-react";
import CropCalendar from "./CropCalendar"; // Ensure this exists

const LearningHub = () => {
  const [activeCard, setActiveCard] = useState(null);

  // Data
// Fertilizers
const fertilizers = [
  {
    name: "Urea",
    usage: "Apply at early growth stage or after planting",
    benefits: "Promotes leaf growth and green color",
    dosage: "50–100 kg per hectare",
    notes: "Avoid excess to prevent leaf burn"
  },
  {
    name: "DAP (Di-Ammonium Phosphate)",
    usage: "Use during sowing for root development",
    benefits: "Provides phosphorus for strong roots",
    dosage: "80–120 kg per hectare",
    notes: "Mix with soil before planting"
  },
  {
    name: "Compost",
    usage: "Mix with soil before planting",
    benefits: "Improves soil fertility and structure",
    dosage: "2–5 tons per hectare",
    notes: "Use well-decomposed compost to avoid nitrogen loss"
  },
  {
    name: "Potash",
    usage: "Apply during vegetative growth stage",
    benefits: "Enhances fruit quality and disease resistance",
    dosage: "40–80 kg per hectare",
    notes: "Apply with irrigation for better absorption"
  }
];

// Irrigation Tools
const irrigationTools = [
  {
    name: "Sprinkler",
    usage: "Distributes water evenly over the field",
    advantages: "Reduces water wastage and soil erosion",
    bestFor: "Small to medium fields, vegetables, cereals",
    tips: "Check nozzles regularly to avoid blockages"
  },
  {
    name: "Drip Irrigation",
    usage: "Delivers water directly to plant roots",
    advantages: "Saves water, increases crop yield",
    bestFor: "Orchards, vegetables, row crops",
    tips: "Maintain pipes and emitters to prevent clogging"
  },
  {
    name: "Watering Can",
    usage: "Manual watering for small gardens",
    advantages: "Precise watering, low cost",
    bestFor: "Home gardens and small plots",
    tips: "Water early morning or late evening to reduce evaporation"
  },
  {
    name: "Furrow Irrigation",
    usage: "Water flows through furrows between crop rows",
    advantages: "Simple method, low investment",
    bestFor: "Row crops like maize and wheat",
    tips: "Level the field properly for uniform water distribution"
  }
];


 const farmingTips = [
  {
    title: "Crop Rotation",
    description: "Changing crops each season to maintain soil fertility.",
    benefits: "Prevents soil nutrient depletion, reduces pests and diseases.",
    bestFor: "All types of crops; especially cereals and legumes.",
    notes: "Plan rotation with legumes to enrich nitrogen in soil."
  },
  {
    title: "Organic Farming",
    description: "Use natural fertilizers and avoid chemicals.",
    benefits: "Improves soil health and produces chemical-free crops.",
    bestFor: "Vegetables, fruits, cereals.",
    notes: "Use compost, vermicompost, and green manure regularly."
  },
  {
    title: "Pest Management",
    description: "Control pests safely and efficiently using IPM (Integrated Pest Management).",
    benefits: "Reduces crop loss and chemical use.",
    bestFor: "All crops prone to pests.",
    notes: "Monitor fields regularly and use traps or natural predators."
  },
  {
    title: "Mulching",
    description: "Covering soil with organic material like straw or leaves.",
    benefits: "Reduces water loss, prevents weed growth, improves soil fertility.",
    bestFor: "Vegetables, fruits, and flower beds.",
    notes: "Apply 5–10 cm thick mulch around plants."
  },
  {
    title: "Intercropping",
    description: "Growing two or more crops together in the same field.",
    benefits: "Maximizes space, reduces pest damage, improves soil health.",
    bestFor: "Maize + Beans, Tomato + Basil.",
    notes: "Choose compatible crops with different nutrient needs."
  }
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
  <div className="flex flex-col gap-10">
    {/* Fertilizers */}
    <div>
      <h2 className="text-2xl font-bold text-green-700 mb-4">Fertilizers</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-green-100">
              <th className="px-4 py-2 font-semibold text-green-800">Name</th>
              <th className="px-4 py-2 font-semibold text-green-800">Usage / Stage</th>
              <th className="px-4 py-2 font-semibold text-green-800">Benefits</th>
              <th className="px-4 py-2 font-semibold text-green-800">Dosage</th>
              <th className="px-4 py-2 font-semibold text-green-800">Notes</th>
            </tr>
          </thead>
          <tbody>
            {fertilizers.map((f, i) => (
              <tr key={i} className="hover:bg-green-50 transition">
                <td className="px-4 py-2 border-b">{f.name}</td>
                <td className="px-4 py-2 border-b">{f.usage}</td>
                <td className="px-4 py-2 border-b">{f.benefits}</td>
                <td className="px-4 py-2 border-b">{f.dosage}</td>
                <td className="px-4 py-2 border-b">{f.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Irrigation Tools */}
    <div>
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Irrigation Tools</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-4 py-2 font-semibold text-blue-800">Name</th>
              <th className="px-4 py-2 font-semibold text-blue-800">Usage / Purpose</th>
              <th className="px-4 py-2 font-semibold text-blue-800">Advantages</th>
              <th className="px-4 py-2 font-semibold text-blue-800">Best For</th>
              <th className="px-4 py-2 font-semibold text-blue-800">Tips</th>
            </tr>
          </thead>
          <tbody>
            {irrigationTools.map((t, i) => (
              <tr key={i} className="hover:bg-blue-50 transition">
                <td className="px-4 py-2 border-b">{t.name}</td>
                <td className="px-4 py-2 border-b">{t.usage}</td>
                <td className="px-4 py-2 border-b">{t.advantages}</td>
                <td className="px-4 py-2 border-b">{t.bestFor}</td>
                <td className="px-4 py-2 border-b">{t.tips}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}

 {activeCard === "tips" && (
  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-yellow-100">
          <th className="px-4 py-2 font-semibold text-yellow-800">Tip / Practice</th>
          <th className="px-4 py-2 font-semibold text-yellow-800">Description</th>
          <th className="px-4 py-2 font-semibold text-yellow-800">Benefits</th>
          <th className="px-4 py-2 font-semibold text-yellow-800">Best For / Crops</th>
          <th className="px-4 py-2 font-semibold text-yellow-800">Practical Advice / Notes</th>
        </tr>
      </thead>
      <tbody>
        {farmingTips.map((tip, i) => (
          <tr key={i} className="hover:bg-yellow-50 transition">
            <td className="px-4 py-2 border-b">{tip.title}</td>
            <td className="px-4 py-2 border-b">{tip.description}</td>
            <td className="px-4 py-2 border-b">{tip.benefits}</td>
            <td className="px-4 py-2 border-b">{tip.bestFor}</td>
            <td className="px-4 py-2 border-b">{tip.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}

      </div>
    </div>
  );
};

export default LearningHub;
