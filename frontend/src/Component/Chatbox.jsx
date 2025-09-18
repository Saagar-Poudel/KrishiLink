import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { MessageCircle, X } from "lucide-react";
import axios from "axios";

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
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-[90vw] max-w-lg h-[70vh] min-h-[400px] bg-white rounded-lg shadow-lg flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center p-3 border-b bg-gray-50">
            <span className="font-semibold">Chats</span>
            <button onClick={() => setIsOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex flex-1 overflow-hidden">
            {/* Left Panel - Conversations */}
            <div className="w-1/3 border-r overflow-y-auto">
              {conversations.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`p-2 cursor-pointer hover:bg-gray-100 ${
                    selectedUser?.id === user.id ? "bg-gray-200" : ""
                  }`}
                >
                  {user.username}
                </div>
              ))}
            </div>

            {/* Right Panel - Messages */}
            <div className="flex-1 flex flex-col">
              {selectedUser ? (
                <>
                  {/* Chat Header */}
                  <div className="p-2 border-b bg-gray-50 font-semibold">
                    Chat with {selectedUser.username}
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

                  {/* Input Box */}
                  <div className="p-3 border-t flex space-x-2 bg-white">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1 p-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Type a message..."
                    />
                    <button
                      onClick={sendMessage}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition"
                    >
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a user to start chatting
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
