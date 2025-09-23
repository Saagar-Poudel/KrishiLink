import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { MessageCircle, X } from "lucide-react";
import axios from "axios";

const socket = io("http://localhost:3000"); // backend

const FarmerChatbox = ({ currentUser, otherUser, isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (currentUser?.id) {
      socket.emit("add-user", currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (isOpen && currentUser && otherUser) {
      axios
        .post("http://localhost:3000/api/messages/get", {
          from: currentUser.id,
          to: otherUser.id,
        })
        .then((res) => setMessages(res.data));
    }
  }, [isOpen, currentUser, otherUser]);

  useEffect(() => {
    socket.on("msg-receive", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          message: data.message,
          fromUserId: data.from,
          fromUsername: otherUser.username,
        },
      ]);
    });
    return () => socket.off("msg-receive");
  }, [otherUser]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMsg = {
      from: currentUser.id,
      to: otherUser.id,
      message: input,
    };

    // Save to DB
    await axios.post("http://localhost:3000/api/messages/add", newMsg);

    // Emit via socket
    socket.emit("send-msg", newMsg);

    setMessages((prev) => [
      ...prev,
      {
        ...newMsg,
        fromUserId: currentUser.id,
        fromUsername: currentUser.username,
      },
    ]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="w-80 h-96 relative">
        {/* Glass background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-lime-500/10 rounded-3xl"></div>

        <div className="relative h-full flex flex-col rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b border-white/20 bg-gradient-to-r from-green-50/50 via-emerald-50/50 to-lime-50/50">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-800">
                Chat with {otherUser.username}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/50 transition-all duration-200 transform hover:scale-110"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-200">
            {messages.map((msg, idx) => {
              const isCurrentUser = msg.fromUserId === currentUser.id;
              return (
                <div
                  key={idx}
                  className={`flex ${
                    isCurrentUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-2xl shadow-md transition-all duration-200 ${
                      isCurrentUser
                        ? "bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 text-white rounded-br-lg"
                        : "bg-white/80 text-gray-900 rounded-bl-lg border border-white/30 backdrop-blur-sm"
                    }`}
                  >
                    <p className="text-sm break-words">{msg.message}</p>
                    <span
                      className={`text-[10px] block text-right mt-1 ${
                        isCurrentUser ? "text-green-100" : "text-gray-400"
                      }`}
                    >
                      {msg.fromUsername}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/20 bg-gradient-to-r from-green-50/30 via-emerald-50/30 to-lime-50/30">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1 p-2 rounded-full border border-white/30 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:bg-white/90 transition-all duration-200 placeholder-gray-400"
                placeholder="Type a message..."
              />
              <button
                onClick={sendMessage}
                className="px-4 py-2 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-600 hover:via-emerald-600 hover:to-lime-600 text-white rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Custom scrollbar */}
        <style jsx>{`
          .overflow-y-auto::-webkit-scrollbar {
            width: 4px;
          }
          .overflow-y-auto::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
          }
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #22c55e, #10b981, #84cc16);
            border-radius: 2px;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #16a34a, #059669, #65a30d);
          }
        `}</style>
      </div>
    </div>
  );
};

export default FarmerChatbox;
