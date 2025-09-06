import React from "react";
import Hero from "./Hero"; // ← import Hero
import LearningHub from "./LearningHub";
import MediaResources from "./MediaResources";
import CommunityHub from "./CommunityHub";
import SupportAndFAQ from "./SupportAndFAQ";

const Training = () => {
  return (
    <div className="training-page bg-gray-50 min-h-screen">
      <Hero />                {/* Hero Section */}
      <LearningHub />
      <MediaResources />
      <CommunityHub />
      <SupportAndFAQ />
    </div>
  );
};

export default Training;
