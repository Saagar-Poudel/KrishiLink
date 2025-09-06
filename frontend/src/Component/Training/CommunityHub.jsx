import React from "react";

const Card = ({ title }) => (
  <div className="bg-white shadow-md rounded-2xl p-6 m-3 hover:shadow-xl transition duration-300 cursor-pointer">
    <h3 className="font-semibold text-lg">{title}</h3>
  </div>
);

const CommunityHub = () => {
  return (
    <div className="community-hub px-6 py-10">
      <h2 className="text-2xl font-bold mb-6">Community Hub</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Success Stories" />
        <Card title="Upcoming Events" />
        <Card title="Quizzes & Fun Learning" />
      </div>
    </div>
  );
};

export default CommunityHub;
