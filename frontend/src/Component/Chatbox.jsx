import React, { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Phone, Video, Search, Paperclip, Send } from "lucide-react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Chatbox = ({ currentUser, initialChatUser = null, openChat = false  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
  if (openChat) setIsOpen(true);
  if (initialChatUser) setSelectedUser(initialChatUser);
}, [openChat, initialChatUser]);


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

  const getInitials = (name) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase() || '?';
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-full bg-[#00a884] text-white shadow-lg hover:bg-[#008f6f] transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-[90vw] max-w-5xl h-[80vh] min-h-[500px] bg-white rounded-lg shadow-2xl overflow-hidden flex">
          {/* Left Sidebar - Conversations List */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Header */}
            <div className="p-4 bg-white border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">Messages</h1>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search ..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#00a884]"
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((user) => (
                <div
                  key={user.id}
                  onClick={() => setSelectedUser(user)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                    selectedUser?.id === user.id ? "bg-gray-100" : ""
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-600 font-medium text-sm">
                        {getInitials(user.username)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">
                        {user.username}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        Start your conversation ...
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel - Chat Area */}
          <div className="flex-1 flex flex-col bg-[#e5ddd5]">
            {selectedUser ? (
              <>
                {/* Chat Header */}
                <div className="bg-[#f0f2f5] border-b border-gray-200 p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                      <span className="text-gray-600 font-medium text-sm">
                        {getInitials(selectedUser.username)}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {selectedUser.username}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                      <Phone className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                      <Video className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div 
                  className="flex-1 overflow-y-auto p-4 space-y-2"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9d9d9' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                  }}
                >
                  {messages.map((msg, idx) => {
                    const isCurrentUser = msg.fromUserId === currentUser.id;
                    return (
                      <div
                        key={idx}
                        className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[65%] px-3 py-2 rounded-lg shadow-sm ${
                            isCurrentUser
                              ? "bg-[#d9fdd3] rounded-br-none"
                              : "bg-white rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm text-gray-800 break-words">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="bg-[#f0f2f5] p-3">
                  <div className="flex items-center space-x-2">
                    <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                      <Paperclip className="w-5 h-5 text-gray-600" />
                    </button>
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                      className="flex-1 px-4 py-2 bg-white rounded-full border border-gray-300 focus:outline-none focus:border-gray-400 text-sm"
                      placeholder="Type a message..."
                    />
                    <button
                      onClick={sendMessage}
                      className="p-2 bg-[#00a884] hover:bg-[#008f6f] text-white rounded-full transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center bg-[#f0f2f5]">
                <div className="text-center">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <div className="text-gray-600 font-medium">
                    Select a conversation to start chatting
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;