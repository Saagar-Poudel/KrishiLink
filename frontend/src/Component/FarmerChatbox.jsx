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

  if (!isOpen) return null; // Don't render anything if not open

  return (
    <div className="fixed bottom-4 right-4 z-50">
        <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-2 border-b">
            <span className="font-semibold">
              Chat with {otherUser.username}
            </span>
            <button onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
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
                    className={`max-w-[70%] p-2 rounded-2xl shadow-sm ${
                      isCurrentUser
                        ? "bg-green-600 text-white rounded-br-none"
                        : "bg-gray-200 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm break-words">{msg.message}</p>
                    <span className="text-[10px] text-gray-400 block text-right mt-1">
                      {msg.fromUsername}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-2 border-t flex space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 p-2 rounded border"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="px-3 bg-green-600 text-white rounded"
            >
              Send
            </button>
          </div>
        </div>
    </div>
  );
};

export default FarmerChatbox;
