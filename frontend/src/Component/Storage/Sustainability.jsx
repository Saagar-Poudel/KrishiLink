import React from "react";
import { Sun, Leaf, RefreshCw } from "lucide-react";

const Sustainability = () => {
  const features = [
    { icon: <Sun className="w-10 h-10 text-yellow-500" />, title: "Solar-Powered Storage", desc: "Eco-friendly cold storage units." },
    { icon: <Leaf className="w-10 h-10 text-green-600" />, title: "Minimal Food Wastage", desc: "Efficient supply chain reduces waste." },
    { icon: <RefreshCw className="w-10 h-10 text-blue-600" />, title: "Reusable Packaging", desc: "Crates and bags reused to save environment." },
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

export default Sustainability;
