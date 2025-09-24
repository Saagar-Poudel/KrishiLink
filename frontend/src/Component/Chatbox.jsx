import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X } from "lucide-react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Chatbox = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Register user with socket
  useEffect(() => {
    if (currentUser?.id) {
      socket.emit("add-user", currentUser.id);
    }
  }, [currentUser]);

  // Fetch conversation list
  useEffect(() => {
    if (isOpen && currentUser?.id) {
      axios
        .get(
          `http://localhost:3000/api/messages/conversations/${currentUser.id}`
        )
        .then((res) => setConversations(res.data));
    }
  }, [isOpen, currentUser]);

  // Fetch messages when user is selected
  useEffect(() => {
    if (isOpen && currentUser && selectedUser) {
      axios
        .post("http://localhost:3000/api/messages/get", {
          from: currentUser.id,
          to: selectedUser.id,
        })
        .then((res) => setMessages(res.data));
    }
  }, [isOpen, currentUser, selectedUser]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on("msg-receive", (data) => {
      if (data.from === selectedUser?.id) {
        setMessages((prev) => [
          ...prev,
          {
            message: data.message,
            fromUserId: data.from,
            fromUsername: selectedUser.username,
          },
        ]);
      }
    });
    return () => socket.off("msg-receive");
  }, [selectedUser]);

  const sendMessage = async () => {
    if (!input.trim() || !selectedUser) return;

    const newMsg = {
      from: currentUser.id,
      to: selectedUser.id,
      message: input,
    };

    await axios.post("http://localhost:3000/api/messages/add", newMsg);
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

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"></div>
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-4 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 text-white shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-110"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <div className="w-[90vw] max-w-lg h-[70vh] min-h-[400px] relative">
          {/* Glassmorphism background */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/90 to-white/85 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/10 to-lime-500/10 rounded-3xl"></div>
          
          <div className="relative h-full flex flex-col rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-white/20 bg-gradient-to-r from-green-50/50 via-emerald-50/50 to-lime-50/50">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-gray-800 text-lg">Chats</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-white/50 transition-all duration-200 transform hover:scale-110"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="flex flex-1 overflow-hidden">
              {/* Left Panel - Conversations */}
              <div className="w-1/3 border-r border-white/20 overflow-y-auto">
                {conversations.map((user) => (
                  <div
                    key={user.id}
                    onClick={() => setSelectedUser(user)}
                    className={`p-4 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-green-50/50 hover:via-emerald-50/50 hover:to-lime-50/50 border-l-4 border-transparent ${
                      selectedUser?.id === user.id 
                        ? "bg-gradient-to-r from-green-100/60 via-emerald-100/60 to-lime-100/60 border-l-4 border-green-500" 
                        : ""
                    }`}
                  >
                    <div className="font-semibold text-gray-800 truncate">
                      {user.username}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Panel - Messages */}
              <div className="flex-1 flex flex-col">
                {selectedUser ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-4 border-b border-white/20 bg-gradient-to-r from-green-50/30 via-emerald-50/30 to-lime-50/30">
                      <div className="font-bold text-gray-800 text-lg">
                        Chat with {selectedUser.username}
                      </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-gray-200">
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
                              className={`max-w-[70%] p-4 rounded-3xl shadow-lg transition-all duration-200 hover:shadow-xl ${
                                isCurrentUser
                                  ? "bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 text-white rounded-br-lg"
                                  : "bg-white/80 text-gray-800 rounded-bl-lg border border-white/30 backdrop-blur-sm"
                              }`}
                            >
                              <p className="text-sm break-words leading-relaxed">{msg.message}</p>
                              <span className={`text-[10px] block text-right mt-2 ${
                                isCurrentUser ? "text-green-100" : "text-gray-400"
                              }`}>
                                {msg.fromUsername}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input Box */}
                    <div className="p-4 border-t border-white/20 bg-gradient-to-r from-green-50/30 via-emerald-50/30 to-lime-50/30">
                      <div className="flex space-x-3">
                        <input
                          type="text"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                          className="flex-1 p-3 rounded-full border border-white/30 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:bg-white/90 transition-all duration-200 placeholder-gray-400"
                          placeholder="Type a message..."
                        />
                        <button
                          onClick={sendMessage}
                          className="px-6 py-3 bg-gradient-to-r from-green-500 via-emerald-500 to-lime-500 hover:from-green-600 hover:via-emerald-600 hover:to-lime-600 text-white rounded-full transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-100 via-emerald-100 to-lime-100 flex items-center justify-center">
                        <MessageCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="text-gray-500 font-medium">Select a user to start chatting</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Custom styles */}
          <style jsx>{`
            /* Custom scrollbar */
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
      )}
    </div>
  );
};

export default Chatbox;
