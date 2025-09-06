import React from "react";

// Onde-style card
const Card = ({ title }) => (
  <div className="bg-white shadow-md rounded-2xl p-6 m-3 hover:shadow-xl transition duration-300 cursor-pointer">
    <h3 className="font-semibold text-lg">{title}</h3>
  </div>
);

const MediaResources = () => {
  return (
    <div className="media-resources px-6 py-10 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Media & Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card title="Video Tutorials" />
        <Card title="Downloadable Guides" />
      </div>
    </div>
  );
};

export default MediaResources;
