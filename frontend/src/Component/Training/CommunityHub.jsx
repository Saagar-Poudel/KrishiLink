import React, { useState } from "react";
import { Users, MessageCircle, Calendar, LifeBuoy, Send, FileText, Video } from "lucide-react";

const initialSections = [
  {
    title: "Discussion Forums",
    description: "Post your farming questions and discuss with experts.",
    icon: <MessageCircle className="w-10 h-10 text-green-600" />,
    items: [
      { name: "Crop Management Tips", posts: [] },
      { name: "Organic Fertilizer Discussion", posts: [] },
    ],
  },
  {
    title: "Farmer Groups",
    description: "Join groups to collaborate and share resources.",
    icon: <Users className="w-10 h-10 text-blue-500" />,
    items: [
      { name: "Vegetable Growers Group", joined: false, members: 12 },
      { name: "Fruit Farmers Association", joined: false, members: 8 },
    ],
  },
  {
    title: "Events & Webinars",
    description: "Register for online and local events.",
    icon: <Calendar className="w-10 h-10 text-yellow-500" />,
    items: [
      { name: "Organic Farming Webinar", registered: false, registrants: [] },
      { name: "Crop Harvest Festival", registered: false, registrants: [] },
    ],
  },
  {
    title: "Support & Resources",
    description: "Access guides, videos, and PDFs to improve your farming.",
    icon: <LifeBuoy className="w-10 h-10 text-red-500" />,
    items: [
      { name: "Expert Q&A", resources: [] },
      { name: "Resource Library", resources: [] },
    ],
  },
];

const CommunityHub = () => {
  const [sections, setSections] = useState(initialSections);
  const [activeSection, setActiveSection] = useState(null);
  const [newPost, setNewPost] = useState("");
  const [resourceFile, setResourceFile] = useState(null);
  const [registrationForm, setRegistrationForm] = useState({ name: "", email: "" });

  // Toggle join/register buttons
  const toggleJoin = (sectionIdx, itemIdx) => {
    const copy = [...sections];
    const item = copy[sectionIdx].items[itemIdx];
    if ("joined" in item) {
      item.joined = !item.joined;
      item.members += item.joined ? 1 : -1;
    }
    if ("registered" in item) item.registered = !item.registered;
    setSections(copy);
  };

  // Add post in discussion forums
  const addPost = (sectionIdx, itemIdx) => {
    if (!newPost.trim()) return;
    const copy = [...sections];
    copy[sectionIdx].items[itemIdx].posts.push(newPost);
    setSections(copy);
    setNewPost("");
  };

  // Register for events
  const registerEvent = (sectionIdx, itemIdx) => {
    const copy = [...sections];
    const item = copy[sectionIdx].items[itemIdx];
    if (!registrationForm.name || !registrationForm.email) return;
    item.registrants.push({ ...registrationForm });
    item.registered = true;
    setSections(copy);
    setRegistrationForm({ name: "", email: "" });
  };

  // Upload resources
  const uploadResource = (sectionIdx, itemIdx) => {
    if (!resourceFile) return;
    const copy = [...sections];
    copy[sectionIdx].items[itemIdx].resources.push(resourceFile);
    setSections(copy);
    setResourceFile(null);
  };

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
    <div className="p-6 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-center mb-6">Community Hub</h1>

      {/* Main Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sections.map((s, i) => (
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

      {/* Dynamic Content */}
      {activeSection && (
        <div className="mt-8 grid gap-4">
          {sections
            .find((s) => s.title === activeSection)
            .items.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-white shadow-md rounded-xl hover:shadow-lg transition flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  {"members" in item && (
                    <span className="text-gray-500 text-sm">
                      {item.members} members
                    </span>
                  )}
                </div>

                {/* Discussion Forum Posts */}
                {"posts" in item && (
                  <div className="flex flex-col gap-2">
                    {item.posts.map((p, pidx) => (
                      <div
                        key={pidx}
                        className="p-2 bg-gray-100 rounded-md text-gray-800 text-sm"
                      >
                        {p}
                      </div>
                    ))}
                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="Ask a question..."
                        className="flex-1 border rounded-md p-2"
                      />
                      <button
                        onClick={() =>
                          addPost(
                            sections.findIndex((s) => s.title === activeSection),
                            idx
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-1"
                      >
                        <Send className="w-4 h-4" /> Post
                      </button>
                    </div>
                  </div>
                )}

                {/* Join / Leave Farmer Groups */}
                {"joined" in item && (
                  <button
                    onClick={() =>
                      toggleJoin(
                        sections.findIndex((s) => s.title === activeSection),
                        idx
                      )
                    }
                    className={`px-4 py-2 rounded-md text-white transition ${
                      item.joined
                        ? "bg-gray-500 hover:bg-gray-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {item.joined ? "Joined" : "Join"}
                  </button>
                )}

                {/* Register for Events */}
                {"registered" in item && (
                  <form
                    className="flex flex-col gap-2"
                    onSubmit={(e) => {
                      e.preventDefault();
                      registerEvent(
                        sections.findIndex((s) => s.title === activeSection),
                        idx
                      );
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Name"
                      value={registrationForm.name}
                      onChange={(e) =>
                        setRegistrationForm({ ...registrationForm, name: e.target.value })
                      }
                      className="border rounded-md p-2"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={registrationForm.email}
                      onChange={(e) =>
                        setRegistrationForm({ ...registrationForm, email: e.target.value })
                      }
                      className="border rounded-md p-2"
                      required
                    />
                    <button
                      type="submit"
                      className={`px-4 py-2 rounded-md text-white ${
                        item.registered
                          ? "bg-gray-500 hover:bg-gray-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                    >
                      {item.registered ? "Registered" : "Register"}
                    </button>
                  </form>
                )}

                {/* Support & Resources */}
                {"resources" in item && (
                  <div className="flex flex-col gap-2">
                    {item.resources.map((res, ridx) => (
                      <div
                        key={ridx}
                        className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                      >
                        <span className="flex items-center gap-2">
                          {res.type === "video" ? <Video /> : <FileText />}
                          {res.name}
                        </span>
                        <a
                          href={res.url || "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:underline text-sm"
                        >
                          View
                        </a>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-2">
                      <input
                        type="file"
                        onChange={(e) => {
                          if (!e.target.files[0]) return;
                          setResourceFile({
                            name: e.target.files[0].name,
                            type: e.target.files[0].type.includes("video") ? "video" : "pdf",
                            url: URL.createObjectURL(e.target.files[0]),
                          });
                        }}
                        className="flex-1 border rounded-md p-2"
                      />
                      <button
                        onClick={() =>
                          uploadResource(
                            sections.findIndex((s) => s.title === activeSection),
                            idx
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default CommunityHub;
