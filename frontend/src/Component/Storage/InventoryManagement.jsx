import React from "react";
import { Monitor, Bell, List } from "lucide-react";

const InventoryManagement = () => {
  const features = [
    { icon: <Monitor className="w-10 h-10 text-blue-600" />, title: "Digital Stock Management", desc: "Track available products in real-time." },
    { icon: <Bell className="w-10 h-10 text-red-600" />, title: "Expiry Notifications", desc: "Alerts for products nearing expiry." },
    { icon: <List className="w-10 h-10 text-green-600" />, title: "Transparent Records", desc: "Check-in/check-out system for stored goods." },
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

export default InventoryManagement;
