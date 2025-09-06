import React, { useState } from "react";
import { Mail, Phone, FileText, HelpCircle } from "lucide-react";

const faqs = [
  { question: "How to register as a farmer?", answer: "Click on the 'Sign Up' button and fill the form to register as a farmer." },
  { question: "How to access crop calendar?", answer: "Go to Training → Crop Calendar to see crop suggestions based on soil and season." },
  { question: "Can I join multiple farmer groups?", answer: "Yes, you can join as many groups as you want to collaborate with other farmers." },
  { question: "How to upload resources?", answer: "Go to Support → Upload your PDF or Video files in the Resource Library section." },
];

const resources = [
  { name: "Organic Farming Guide.pdf", type: "pdf", url: "#" },
  { name: "Vegetable Farming Tips.mp4", type: "video", url: "#" },
  { name: "Irrigation Methods.docx", type: "pdf", url: "#" },
];

const SupportAndFAQ = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [contact, setContact] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Message submitted!\nName: ${contact.name}\nEmail: ${contact.email}\nMessage: ${contact.message}`);
    setContact({ name: "", email: "", message: "" });
  };

  return (
    <div className="p-6 min-h-screen bg-white">
      <h1 className="text-3xl font-bold text-center mb-6">Support & FAQ</h1>

      {/* FAQ Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><HelpCircle /> Frequently Asked Questions</h2>
        <div className="space-y-2">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border rounded-md p-4 cursor-pointer hover:shadow-md transition">
              <div onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="flex justify-between items-center">
                <span className="font-medium">{faq.question}</span>
                <span>{openFaq === idx ? "-" : "+"}</span>
              </div>
              {openFaq === idx && <p className="mt-2 text-gray-600">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><Mail /> Contact Support</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={contact.name}
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            className="border rounded-md p-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={contact.email}
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            className="border rounded-md p-2"
            required
          />
          <textarea
            placeholder="Your Message"
            value={contact.message}
            onChange={(e) => setContact({ ...contact, message: e.target.value })}
            className="border rounded-md p-2 resize-none"
            rows={4}
            required
          />
          <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2 justify-center">
            Send Message <Mail className="w-4 h-4" />
          </button>
        </form>
      </section>

      {/* Resources Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2"><FileText /> Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((res, idx) => (
            <div key={idx} className="p-4 border rounded-md flex justify-between items-center hover:shadow-md transition">
              <span className="flex items-center gap-2">
                {res.type === "video" ? <Mail /> : <FileText />}
                {res.name}
              </span>
              <a href={res.url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm">
                View
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SupportAndFAQ;
