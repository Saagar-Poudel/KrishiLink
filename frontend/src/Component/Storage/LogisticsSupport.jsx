import React from "react";
import { Users, Award, CreditCard } from "lucide-react";

const LogisticsSupport = () => {
  const features = [
    { icon: <Users className="w-10 h-10 text-blue-600" />, title: "Last-Mile Connectivity", desc: "Direct delivery to shops and markets." },
    { icon: <Award className="w-10 h-10 text-green-600" />, title: "Insurance for Goods", desc: "Protection against loss or damage." },
    { icon: <CreditCard className="w-10 h-10 text-yellow-600" />, title: "Loan/Credit Facility", desc: "Loans against stored produce for farmers." },
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

export default LogisticsSupport;
