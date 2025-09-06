import React from "react";

const Card = ({ title }) => (
  <div className="bg-white shadow-md rounded-2xl p-6 m-3 hover:shadow-xl transition duration-300 cursor-pointer">
    <h3 className="font-semibold text-lg">{title}</h3>
  </div>
);

const SupportAndFAQ = () => {
  return (
    <div className="support-faq px-6 py-10 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Support & FAQ</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Sustainability Tips" />
        <Card title="Frequently Asked Questions" />
        <Card title="Contact & Support" />
      </div>
    </div>
  );
};

export default SupportAndFAQ;
