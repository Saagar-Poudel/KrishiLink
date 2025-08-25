//Build me a simple chatbot uicolor combination of #00B354 and white its name is KrishiBot, there is no external css use tailwind to style it, use icon from lucide-react

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleChatbot = () => {
        setIsOpen(!isOpen);
    };
    
    return (
        <div className={`fixed bottom-0 right-0 m-4 ${isOpen ? "w-80" : "w-16"} transition-all duration-300`}>
        <button
            onClick={toggleChatbot}
            className="flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 focus:outline-none"
        >
            <MessageCircle className="w-8 h-8" />
        </button>
        {isOpen && (
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mt-2">
            <h2 className="text-xl font-bold text-green-600">KrishiBot</h2>
            <p className="text-gray-700 dark:text-gray-300">
                How can I assist you today?
            </p>
            <Link to="/chat" className="text-blue-500 hover:underline">
                Start Chat
            </Link>
            </div>
        )}
        </div>
    );
}
    
export default Chatbot;