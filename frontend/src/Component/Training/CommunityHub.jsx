// src/components/CommunityHub.jsx
import React, { useState, useRef, useEffect } from "react";
import { Users, MessageCircle, Calendar, Send, FileText, Video, Mic } from "lucide-react";

const initialSections = [
  {
    title: "Discussion Forums",
    description: "Chat with other farmers and share tips.",
    icon: <MessageCircle className="w-10 h-10 text-green-600" />,
  },
  {
    title: "Farmer Groups",
    description: "Join groups to fulfill big orders.",
    icon: <Users className="w-10 h-10 text-blue-500" />,
  },
  {
    title: "Auctions",
    description: "Participate in customer auctions for large orders.",
    icon: <Calendar className="w-10 h-10 text-yellow-500" />,
  },
];

const CommunityHub = () => {
  const [activeSection, setActiveSection] = useState(null);

  // ---------------- Discussion Forums ----------------
  const [farmers, setFarmers] = useState([
    { id: 1, name: "Ramesh" },
    { id: 2, name: "Sita" },
    { id: 3, name: "Hari" },
  ]);
  const [chatMessages, setChatMessages] = useState({
    1: [], // messages for Ramesh
    2: [], // messages for Sita
    3: [], // messages for Hari
  });
  const [selectedFarmerId, setSelectedFarmerId] = useState(1);
  const [newMessage, setNewMessage] = useState("");
  const [newMedia, setNewMedia] = useState(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [audioChunks, setAudioChunks] = useState([]);

  // ---------------- Farmer Groups ----------------
  const [groups, setGroups] = useState([
    { id: 1, name: "Vegetable Growers", members: [1, 2] },
    { id: 2, name: "Fruit Farmers Association", members: [3] },
  ]);
  const [newGroupName, setNewGroupName] = useState("");

  // ---------------- Auctions ----------------
  const [auctions, setAuctions] = useState([
    {
      id: 1,
      customer: "Customer A",
      product: "Tomatoes Bulk",
      participants: [],
      endTime: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days
      winner: null,
    },
  ]);

  // ---------- Discussion Forums Functions ----------
  const sendMessage = () => {
    if (!newMessage.trim() && !newMedia) return;
    const newMsg = {
      sender: "You",
      text: newMessage,
      media: newMedia,
      timestamp: new Date().toLocaleTimeString(),
    };
    setChatMessages({
      ...chatMessages,
      [selectedFarmerId]: [...chatMessages[selectedFarmerId], newMsg],
    });
    setNewMessage("");
    setNewMedia(null);
  };

  const startRecording = () => {
    if (!navigator.mediaDevices) return alert("Microphone not supported");
    setRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      setAudioChunks([]);
      mediaRecorder.ondataavailable = (e) => {
        setAudioChunks((prev) => [...prev, e.data]);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks);
        const url = URL.createObjectURL(audioBlob);
        setNewMedia({ type: "audio", url });
      };
      mediaRecorder.start();
    });
  };

  const stopRecording = () => {
    setRecording(false);
    mediaRecorderRef.current.stop();
  };

  // ---------- Farmer Groups Functions ----------
  const createGroup = () => {
    if (!newGroupName.trim()) return;
    const newGroup = {
      id: groups.length + 1,
      name: newGroupName,
      members: [],
    };
    setGroups([...groups, newGroup]);
    setNewGroupName("");
    alert(`New group "${newGroupName}" created! (Simulated notification to farmers)`);
  };

  const toggleGroupJoin = (groupId, farmerId = 1) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? g.members.includes(farmerId)
            ? { ...g, members: g.members.filter((m) => m !== farmerId) }
            : { ...g, members: [...g.members, farmerId] }
          : g
      )
    );
  };

  // ---------- Auction Functions ----------
  const joinAuction = (auctionId, farmerId = 1) => {
    setAuctions((prev) =>
      prev.map((a) =>
        a.id === auctionId && !a.participants.includes(farmerId)
          ? { ...a, participants: [...a.participants, farmerId] }
          : a
      )
    );
  };

  const selectWinner = (auctionId, farmerId) => {
    setAuctions((prev) =>
      prev.map((a) => (a.id === auctionId ? { ...a, winner: farmerId } : a))
    );
  };

  const countdown = (endTime) => {
    const now = new Date();
    const diff = new Date(endTime) - now;
    if (diff <= 0) return "Auction Ended";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${days}d ${hours}h ${minutes}m`;
  };

  // ---------- UI Components ----------
  const Card = ({ title, description, icon, onClick }) => (
    <div
      onClick={onClick}
      className={`p-6 bg-white shadow-md rounded-xl flex flex-col items-center text-center gap-3 cursor-pointer hover:shadow-lg transition
        ${activeSection === title ? "ring-2 ring-green-500" : ""}`}
    >
      {icon}
      <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">Community Hub</h1>

      {/* Main Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialSections.map((s, i) => (
          <Card
            key={i}
            title={s.title}
            description={s.description}
            icon={s.icon}
            onClick={() =>
              setActiveSection(activeSection === s.title ? null : s.title)
            }
          />
        ))}
      </div>

      {/* Dynamic Section */}
      {activeSection && (
        <div className="mt-8">
          {/* ---------------- Discussion Forums UI ---------------- */}
          {activeSection === "Discussion Forums" && (
            <div className="flex flex-col md:flex-row gap-4">
              {/* Farmer List */}
              <div className="md:w-1/4 bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold mb-3">Farmers</h3>
                {farmers.map((f) => (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFarmerId(f.id)}
                    className={`p-2 rounded-md cursor-pointer hover:bg-green-100 ${
                      selectedFarmerId === f.id ? "bg-green-200" : ""
                    }`}
                  >
                    {f.name}
                  </div>
                ))}
              </div>

              {/* Chat Area */}
              <div className="md:w-3/4 flex flex-col bg-white p-4 rounded-lg shadow-md">
                <h3 className="font-semibold mb-2">
                  Chat with{" "}
                  {farmers.find((f) => f.id === selectedFarmerId)?.name}
                </h3>
                <div className="flex-1 overflow-y-auto h-64 border p-2 rounded-md mb-2 flex flex-col gap-2">
                  {chatMessages[selectedFarmerId]?.map((m, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-md max-w-xs ${
                        m.sender === "You"
                          ? "bg-green-100 self-end"
                          : "bg-gray-100 self-start"
                      }`}
                    >
                      {m.text && <p>{m.text}</p>}
                      {m.media && m.media.type === "image" && (
                        <img src={m.media.url} className="mt-1 rounded" />
                      )}
                      {m.media && m.media.type === "video" && (
                        <video src={m.media.url} controls className="mt-1 rounded" />
                      )}
                      {m.media && m.media.type === "audio" && (
                        <audio controls src={m.media.url} className="mt-1 rounded" />
                      )}
                      <span className="text-xs text-gray-500">{m.timestamp}</span>
                    </div>
                  ))}
                </div>
                {/* Input Area */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border rounded-md p-2"
                  />
                  <input
                    type="file"
                    onChange={(e) => {
                      if (!e.target.files[0]) return;
                      const file = e.target.files[0];
                      const type = file.type.includes("video")
                        ? "video"
                        : file.type.includes("image")
                        ? "image"
                        : null;
                      if (!type) return alert("Only image/video allowed");
                      setNewMedia({ type, url: URL.createObjectURL(file) });
                    }}
                  />
                  {recording ? (
                    <button
                      onClick={stopRecording}
                      className="bg-red-500 text-white px-2 rounded-md"
                    >
                      Stop <Mic className="inline w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={startRecording}
                      className="bg-blue-500 text-white px-2 rounded-md"
                    >
                      Record <Mic className="inline w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={sendMessage}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-1"
                  >
                    <Send className="w-4 h-4" /> Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ---------------- Farmer Groups UI ---------------- */}
          {activeSection === "Farmer Groups" && (
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New Group Name"
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="border p-2 rounded-md flex-1"
                />
                <button
                  onClick={createGroup}
                  className="bg-blue-600 text-white px-4 rounded-md"
                >
                  Create Group
                </button>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {groups.map((g) => (
                  <div
                    key={g.id}
                    className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2"
                  >
                    <h3 className="font-semibold">{g.name}</h3>
                    <span className="text-gray-500 text-sm">
                      {g.members.length} members
                    </span>
                    <button
                      onClick={() => toggleGroupJoin(g.id)}
                      className={`px-4 py-2 rounded-md text-white ${
                        g.members.includes(1)
                          ? "bg-gray-500 hover:bg-gray-600"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {g.members.includes(1) ? "Joined" : "Join"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ---------------- Auctions UI ---------------- */}
          {activeSection === "Auctions" && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {auctions.map((a) => (
                <div
                  key={a.id}
                  className="bg-white p-4 rounded-lg shadow-md flex flex-col gap-2"
                >
                  <h3 className="font-semibold">{a.product}</h3>
                  <span className="text-gray-500 text-sm">
                    Customer: {a.customer}
                  </span>
                  <span className="text-gray-500 text-sm">
                    Participants: {a.participants.length}
                  </span>
                  <span className="text-red-500 font-semibold">
                    {countdown(a.endTime)}
                  </span>
                  {a.winner ? (
                    <span className="text-green-600 font-semibold">
                      Winner: Farmer {a.winner}
                    </span>
                  ) : (
                    <>
                      <button
                        onClick={() => joinAuction(a.id)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md"
                      >
                        Participate
                      </button>
                      <button
                        onClick={() => selectWinner(a.id, 1)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md mt-1"
                      >
                        Select Winner (Simulated)
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CommunityHub;
