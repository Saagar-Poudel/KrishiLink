
import React, { useState } from "react";
import {
  MessageCircle,
  Users,
  Wheat,
  Droplets,
  Bug,
  Tractor,
  Leaf,
} from "lucide-react";

// Expert data with placeholder images
const expertsData = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    role: "Crop Specialist",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    icon: Wheat,
    specialization: "Rice & Wheat Cultivation",
    experience: "15+ years in crop optimization and yield improvement",
    bio: "Dr. Kumar specializes in sustainable crop production techniques, focusing on maximizing yield while maintaining soil health. He has helped over 2,000 farmers increase their crop productivity by 35% on average.",
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    role: "Livestock Expert",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    icon: Users,
    specialization: "Dairy & Poultry Management",
    experience: "12+ years in animal husbandry and veterinary care",
    bio: "Dr. Sharma is a renowned veterinarian with expertise in dairy farming, poultry management, and livestock health. She has successfully implemented breeding programs that increased milk production by 40% in multiple farms.",
  },
  {
    id: 3,
    name: "Prof. Amit Patel",
    role: "Soil Scientist",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    icon: Tractor,
    specialization: "Soil Health & Fertility",
    experience: "20+ years in soil analysis and management",
    bio: "Professor Patel is an expert in soil chemistry and fertility management. His innovative composting techniques and soil testing methods have restored degraded farmlands across 5 states, improving soil health by 50%.",
  },
  {
    id: 4,
    name: "Eng. Suresh Reddy",
    role: "Irrigation Specialist",
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    icon: Droplets,
    specialization: "Water Management Systems",
    experience: "18+ years in irrigation design and water conservation",
    bio: "Suresh is a water management engineer who designs efficient irrigation systems. His drip irrigation solutions have helped farmers reduce water usage by 60% while maintaining optimal crop growth.",
  },
  {
    id: 5,
    name: "Dr. Meera Gupta",
    role: "Pest Management Expert",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    icon: Bug,
    specialization: "Integrated Pest Management",
    experience: "14+ years in sustainable pest control",
    bio: "Dr. Gupta specializes in eco-friendly pest management strategies. Her integrated approach has helped farmers reduce pesticide use by 70% while maintaining effective pest control through biological methods.",
  },
  {
    id: 6,
    name: "Sh. Ramesh Singh",
    role: "Organic Farming Consultant",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    icon: Leaf,
    specialization: "Organic Certification & Methods",
    experience: "25+ years in organic farming practices",
    bio: "Ramesh is a pioneer in organic farming with decades of experience in sustainable agriculture. He has guided over 500 farmers through organic certification processes and sustainable farming transitions.",
  },
];

const Experts = () => {
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleExpertSelect = (expert) => {
    setSelectedExpert(expert);
    setChatMessages([]); // Clear previous chat when selecting a new expert
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, { text: chatMessage, sender: 'farmer' }]);
      setChatMessage('');
      
      // Simulate expert response after a delay
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev, 
          { 
            text: `Thanks for your message! I'll help you with your ${selectedExpert.specialization.toLowerCase()} questions.`, 
            sender: 'expert' 
          }
        ]);
      }, 1500);
    }
  };

  const ExpertCard = ({ expert }) => {
    const IconComponent = expert.icon;
    const isSelected = selectedExpert?.id === expert.id;

    return (
      <div
        onClick={() => handleExpertSelect(expert)}
        className={`bg-white border rounded-lg p-6 cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 ${
          isSelected ? "border-green-500 ring-2 ring-green-200 scale-105" : "border-gray-200"
        }`}
      >
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <img
              src={expert.image}
              alt={expert.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-green-200"
            />
            <div className="absolute -bottom-2 -right-2 bg-green-600 text-white p-2 rounded-full">
              <IconComponent className="w-4 h-4" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg">{expert.name}</h3>
            <p className="text-green-600 font-medium">{expert.role}</p>
            <p className="text-gray-600 text-sm mt-1">
              {expert.specialization}
            </p>
          </div>

          <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {expert.experience}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-green-800">
            Connect with Agricultural Experts
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Click on expert cards to learn more about them and start a conversation. 
            Get personalized advice from certified agricultural professionals.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Experts Grid */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <Users className="w-6 h-6 text-green-600" />
              Available Experts
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {expertsData.map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))}
            </div>
          </div>

          {/* Consultation Panel */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-green-600" />
              Expert Consultation
            </h2>

            <div className="min-h-[600px] bg-white border border-gray-200 rounded-xl p-6 flex flex-col">
              {selectedExpert ? (
                <div className="flex flex-col h-full">
                  {/* Expert Header */}
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                    <img
                      src={selectedExpert.image}
                      alt={selectedExpert.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-green-300"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">
                        {selectedExpert.name}
                      </h3>
                      <p className="text-green-600 font-medium">
                        {selectedExpert.role}
                      </p>
                      <p className="text-sm text-gray-600">
                        {selectedExpert.specialization}
                      </p>
                    </div>
                    <selectedExpert.icon className="w-8 h-8 text-green-600" />
                  </div>

                  {/* Expert Details */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h4 className="font-medium mb-2 text-green-800">Experience</h4>
                      <p className="text-gray-600">
                        {selectedExpert.experience}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 text-green-800">About</h4>
                      <p className="text-gray-600 leading-relaxed">
                        {selectedExpert.bio}
                      </p>
                    </div>
                    
                    {/* Chat Section */}
                    <div className="pt-4 mt-4 border-t border-gray-200">
                      <h4 className="font-medium mb-3 text-green-800">Chat with Expert</h4>
                      
                      {/* Chat Messages */}
                      <div className="max-h-48 overflow-y-auto mb-3 space-y-2 p-2 bg-gray-50 rounded-lg">
                        {chatMessages.length > 0 ? (
                          chatMessages.map((message, index) => (
                            <div
                              key={index}
                              className={`p-3 rounded-lg max-w-xs ${
                                message.sender === 'farmer'
                                  ? 'bg-green-100 text-green-900 ml-auto'
                                  : 'bg-gray-100 text-gray-900'
                              }`}
                            >
                              {message.text}
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-center py-4">
                            No messages yet. Start the conversation!
                          </p>
                        )}
                      </div>

                      {/* Chat Input */}
                     <div className="mt-6 pt-6 border-t border-gray-200">
                    <button
                      onClick={() => handleChatClick(selectedExpert)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Start Chat with {selectedExpert.name}
                    </button>
                  </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
                      <MessageCircle className="w-8 h-8 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-600 mb-2">
                        No expert selected
                      </p>
                      <p className="text-sm text-gray-500">
                        Click on an expert card to view their details and start a conversation
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experts;