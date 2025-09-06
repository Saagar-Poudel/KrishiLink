import React from "react";
import { Box, Package, Tag } from "lucide-react";

const PackagingHandling = () => {
  const features = [
    { icon: <Package className="w-10 h-10 text-purple-600" />, title: "Eco-friendly Packaging", desc: "Sustainable packaging for produce." },
    { icon: <Box className="w-10 h-10 text-blue-600" />, title: "Sorting & Grading", desc: "High-quality sorting before storage." },
    { icon: <Tag className="w-10 h-10 text-green-600" />, title: "Labeling & Barcoding", desc: "Easy tracking and identification of products." },
    { icon: <Box className="w-10 h-10 text-purple-600" />, title: "Protective Handling", desc: "Crates and sacks to reduce damage during transport." },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {features.map((f, i) => (
        <div key={i} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition">
          <div className="mb-3">{f.icon}</div>
          <h3 className="font-bold text-lg mb-2">{f.title}</h3>
          <p>{f.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default PackagingHandling;
