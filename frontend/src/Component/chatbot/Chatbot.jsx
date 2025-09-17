// src/Component/chatbot/Chatbot.jsx
import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, Maximize, X } from "lucide-react";
import ChatData from "./Chat.js"; // dataset file

const Chatbot = () => {
  const user = { id: 1, name: "Demo User" };

  // State
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]); // last queries
  const [savedChats, setSavedChats] = useState([]);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [suggestions, setSuggestions] = useState([]); // clickable options

  const chatbotRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Exit maximized on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isMaximized &&
        chatbotRef.current &&
        !chatbotRef.current.contains(event.target)
      ) {
        setIsMaximized(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMaximized]);

  // Load saved chats from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedChats")) || [];
    setSavedChats(saved);
  }, []);

  // Get bot response
  const getBotResponse = (query) => {
    const lowerQuery = query.toLowerCase();

    // Exact match
    let exactMatch = ChatData.find(
      (item) => item.question.toLowerCase() === lowerQuery
    );
    if (exactMatch) {
      setSuggestions([]);
      return exactMatch.answer;
    }

    // Partial matches
    const partialMatches = ChatData.filter((item) =>
      item.question.toLowerCase().includes(lowerQuery)
    );

    if (partialMatches.length === 1) {
      setSuggestions([]);
      return partialMatches[0].answer;
    } else if (partialMatches.length > 1) {
      setSuggestions(partialMatches);
      return `I found multiple possible matches. Click one to get the answer!`;
    }

    // Similarity by common words
    const words = lowerQuery.split(" ");
    let bestMatch = null;
    let maxCommon = 0;

    ChatData.forEach((item) => {
      const itemWords = item.question.toLowerCase().split(" ");
      const commonWords = itemWords.filter((w) => words.includes(w));
      if (commonWords.length > maxCommon) {
        maxCommon = commonWords.length;
        bestMatch = item;
      }
    });

    if (bestMatch && maxCommon > 0) {
      setSuggestions([bestMatch]);
      return `Did you mean: "${bestMatch.question}"? Click it to see the answer.`;
    }

    setSuggestions([]);
    return "Sorry, I don't have information on that. Please try another question.";
  };

  // Handle sending messages (user input or clicked suggestion)
  const handleSend = (msg = input) => {
    if (!msg.trim()) return;

    const userMsg = { sender: "user", text: msg };
    const botMsg = { sender: "bot", text: getBotResponse(msg) };

    setMessages((prev) => [...prev, userMsg, botMsg].slice(-50));
    setInput("");
    setShowSavePrompt(true);
    setSuggestions([]);
  };

  // Save last query to savedChats
  const saveChat = () => {
    const lastUserMsg = messages[messages.length - 2];
    const lastBotMsg = messages[messages.length - 1];
    if (!lastUserMsg || !lastBotMsg) return;

    const newChat = {
      id: Date.now(),
      question: lastUserMsg.text,
      answer: lastBotMsg.text,
    };

    const updatedSaved = [newChat, ...savedChats];
    setSavedChats(updatedSaved);
    localStorage.setItem("savedChats", JSON.stringify(updatedSaved));
    setShowSavePrompt(false);
  };

  return (
    <div ref={chatbotRef} className="fixed bottom-4 right-4 z-50 shadow-lg transition-all">
      {/* Floating Icon */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Minimized Chat */}
      {isOpen && !isMaximized && (
        <div className="w-72 h-96 bg-white dark:bg-[#0B1A12] dark:text-[#F9FAFB] rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-[#374151]">
            <span className="font-semibold">Farmer Chat</span>
            <div className="flex space-x-2">
              <button onClick={() => setIsMaximized(true)}>
                <Maximize className="w-5 h-5" />
              </button>
              <button onClick={() => setIsOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-2 overflow-y-auto space-y-2">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded ${
                  msg.sender === "user"
                    ? "bg-green-100 text-green-800 self-end"
                    : "bg-gray-100 dark:bg-[#12241A] text-gray-800 dark:text-[#D1D5DB] self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2 border-t border-gray-200 dark:border-[#374151] flex flex-col space-y-1 max-h-32 overflow-y-auto">
              {suggestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.question)}
                  className="text-left w-full p-1 bg-yellow-100 rounded hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800"
                >
                  {item.question}
                </button>
              ))}
            </div>
          )}

          {/* Input + Save */}
          <div className="p-2 border-t border-gray-200 dark:border-[#374151] flex flex-col space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 p-2 rounded border border-gray-300 dark:border-[#374151] dark:bg-[#12241A]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="px-3 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Send
              </button>
            </div>
            {showSavePrompt && (
              <button
                onClick={saveChat}
                className="self-end px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Chat
              </button>
            )}
          </div>
        </div>
      )}

      {/* Maximized Chat */}
      {isMaximized && (
        <div className="w-[600px] h-[500px] bg-white dark:bg-[#0B1A12] dark:text-[#F9FAFB] rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-[#374151]">
            <span className="font-semibold">Farmer Chat (Expanded)</span>
            <button onClick={() => setIsMaximized(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages + Saved Chats */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 flex flex-col">
            <div className="space-y-2">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded ${
                    msg.sender === "user"
                      ? "bg-green-100 text-green-800 self-end"
                      : "bg-gray-100 dark:bg-[#12241A] text-gray-800 dark:text-[#D1D5DB] self-start"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="p-2 border-t border-gray-200 dark:border-[#374151] flex flex-col space-y-1 max-h-32 overflow-y-auto">
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(item.question)}
                    className="text-left w-full p-1 bg-yellow-100 rounded hover:bg-yellow-200 dark:bg-yellow-900 dark:hover:bg-yellow-800"
                  >
                    {item.question}
                  </button>
                ))}
              </div>
            )}

            {/* Saved Chats */}
            {savedChats.length > 0 && (
              <div className="mt-3 border-t border-gray-200 dark:border-[#374151] pt-2">
                <span className="font-semibold">Saved Chats</span>
                <div className="space-y-2 mt-2">
                  {savedChats.map((chat) => (
                    <div
                      key={chat.id}
                      className="p-2 rounded bg-gray-50 dark:bg-[#12241A] text-gray-800 dark:text-[#D1D5DB]"
                    >
                      <strong>Q:</strong> {chat.question}
                      <br />
                      <strong>A:</strong> {chat.answer}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Input + Save */}
          <div className="p-3 border-t border-gray-200 dark:border-[#374151] flex flex-col space-y-2">
            <div className="flex space-x-2">
              <input
                type="text"
                className="flex-1 p-2 rounded border border-gray-300 dark:border-[#374151] dark:bg-[#12241A]"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask a question..."
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                onClick={handleSend}
                className="px-3 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Send
              </button>
            </div>
            {showSavePrompt && (
              <button
                onClick={saveChat}
                className="self-end px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Save Chat
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
