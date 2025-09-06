import React, { useState } from "react";
import { Play, FileText, BookOpen } from "lucide-react";

const mediaResources = [
  {
    title: "Video Tutorials",
    description: "Watch step-by-step farming and crop management videos.",
    icon: <Play className="w-10 h-10 text-green-600" />,
    items: [
      {
        name: "Vegetable Farming Basics",
        type: "video",
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Example YouTube video
        icon: <Play className="w-8 h-8 text-green-500" />,
      },
      {
        name: "Organic Fertilizer Usage",
        type: "video",
        src: "https://www.youtube.com/embed/ScMzIvxBSi4",
        icon: <Play className="w-8 h-8 text-green-500" />,
      },
    ],
  },
  {
    title: "PDF Guides",
    description: "Download detailed PDF guides for crops, fertilizers, and tools.",
    icon: <FileText className="w-10 h-10 text-blue-500" />,
    items: [
      {
        name: "Crop Calendar PDF",
        type: "pdf",
        src: "/pdf/CropCalendar.pdf", // Place file in public/pdf/
        icon: <FileText className="w-8 h-8 text-blue-500" />,
      },
      {
        name: "Fertilizer Guide PDF",
        type: "pdf",
        src: "/pdf/FertilizerGuide.pdf",
        icon: <FileText className="w-8 h-8 text-blue-500" />,
      },
    ],
  },
  {
    title: "Articles & Blogs",
    description: "Read informative articles and tips from agriculture experts.",
    icon: <BookOpen className="w-10 h-10 text-yellow-500" />,
    items: [
      {
        name: "Organic Pest Management",
        type: "blog",
        src: "https://www.example.com/organic-pest-management",
        icon: <BookOpen className="w-8 h-8 text-yellow-500" />,
      },
      {
        name: "Soil Health Tips",
        type: "blog",
        src: "https://www.example.com/soil-health-tips",
        icon: <BookOpen className="w-8 h-8 text-yellow-500" />,
      },
    ],
  },
];

const MediaResources = () => {
  const [activeCard, setActiveCard] = useState(null);

  const Card = ({ title, description, icon, onClick }) => (
    <div
      onClick={onClick}
      className={`p-6 bg-white shadow-md rounded-xl cursor-pointer flex flex-col items-center text-center gap-3 hover:shadow-lg transition
        ${activeCard === title ? "ring-2 ring-green-500" : ""}`}
    >
      {icon}
      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Media Resources</h1>

      {/* Main cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {mediaResources.map((res, i) => (
          <Card
            key={i}
            title={res.title}
            description={res.description}
            icon={res.icon}
            onClick={() => setActiveCard(activeCard === res.title ? null : res.title)}
          />
        ))}
      </div>

      {/* Dynamic items */}
      {activeCard && (
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {mediaResources
            .find((res) => res.title === activeCard)
            ?.items.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-white shadow-md rounded-xl flex flex-col items-center text-center gap-3 hover:shadow-lg transition"
              >
                {item.icon}
                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                {item.type === "video" && (
                  <iframe
                    className="w-full h-48 rounded-md"
                    src={item.src}
                    title={item.name}
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                )}
                {item.type === "pdf" && (
                  <a
                    href={item.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  >
                    Download PDF
                  </a>
                )}
                {item.type === "blog" && (
                  <a
                    href={item.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
                  >
                    Read Blog
                  </a>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MediaResources;
