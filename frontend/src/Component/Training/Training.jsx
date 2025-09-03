import React from "react";

// List of training videos
const trainings = [
  {
    title: "Organic Mal Kasari Banaune? Organic Farming Training in Nepal",
    videoUrl: "https://www.youtube.com/embed/m8-Tqr_958E",
  },
 
  {
    title: "Integrated & Multi-Crop Farming",
    videoUrl: "https://www.youtube.com/embed/nNB2wUjM5_M",
  },
  {
    title: "Introduction to Multiple Cropping",
    videoUrl: "https://www.youtube.com/embed/-nXAoO2rhjc",
  },
  {
    title: "Multi-Crop Vegetable Cultivation",
    videoUrl: "https://www.youtube.com/embed/59OoX_VzIQ4",
  },
  {
    title: "Fruit Tree Grafting for Beginners",
    videoUrl: "https://www.youtube.com/embed/885VGccSrvs",
  },
  
];

// Benefits of multicropping & grafting
const benefits = [
  {
    title: "Multicropping",
    description:
      "Increases productivity, reduces pest risk, improves soil health, and maximizes land use.",
  },
  {
    title: "Grafting",
    description:
      "Enhances crop quality, disease resistance, accelerates fruit production, and improves yields.",
  },
];

// Example FAQ content
const faqs = [
  {
    question: "What is multicropping?",
    answer:
      "Multicropping is the practice of growing two or more crops in the same field in a single season to increase yield and reduce risk.",
  },
  {
    question: "Why use grafting in fruit trees?",
    answer:
      "Grafting allows combining the best traits of two plants: a strong root system and high-quality fruit-producing branches.",
  },
  {
    question: "Are these techniques suitable for small-scale farms?",
    answer:
      "Yes! Both multicropping and grafting can be adapted for small or large-scale farms with proper planning.",
  },
  {
    question: "How do I start with organic farming?",
    answer:
      "Begin by using natural fertilizers, avoiding chemical pesticides, and rotating crops to maintain soil health.",
  },
  {
    question: "What crops are best for multicropping?",
    answer:
      "Choose crops with different growth habits and nutrient needs, such as legumes with cereals or vegetables with fruit trees.",
  },
  {
    question: "How often should I rotate crops?",
    answer:
      "Crop rotation is typically done every season or year, depending on the crops and local conditions.",
  },
  {
    question: "Can grafting be done at home?",
    answer:
      "Yes, with basic tools and proper guidance, home gardeners can successfully graft fruit trees.",
  },
  {
    question: "Where can I find more training resources?",
    answer:
      "Check agricultural extension offices, online platforms like YouTube, and local farmer groups for more tutorials and workshops.",
  },
];

const Training = () => {
  return (
    <div className="min-h-screen flex flex-col bg-green-50">

      {/* Hero Section */}
      <section className="bg-green-700 text-white p-10 text-center">
        <h1 className="text-4xl font-bold mb-2">KrishiLink Training</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Learn modern agricultural techniques with step-by-step tutorials, videos, and expert tips.
        </p>
      </section>

      {/* Videos Section */}
      <section className="p-8">
        <h2 className="text-2xl font-semibold mb-6 text-green-900">Training Videos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainings.map((training, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <h3 className="font-bold mb-2 text-green-800">{training.title}</h3>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={training.videoUrl}
                  title={training.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded"
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-green-100 p-8">
        <h2 className="text-2xl font-semibold mb-4 text-green-900">Benefits of Multicropping & Grafting</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {benefits.map((item, index) => (
            <div key={index} className="bg-green-50 p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-2 text-green-800">{item.title}</h3>
              <p className="text-green-900">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="p-8">
        <h2 className="text-2xl font-semibold mb-4 text-green-900">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-white p-4 rounded shadow cursor-pointer">
              <summary className="font-bold text-green-800">{faq.question}</summary>
              <p className="mt-2 text-green-900">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Tips / Success Stories Section */}
      <section className="bg-green-50 p-8">
        <h2 className="text-2xl font-semibold mb-4 text-green-900">Tips & Success Stories</h2>
        <ul className="list-disc list-inside space-y-2 text-black-500">
          <li>Rotate crops seasonally to maintain soil fertility.</li>
          <li>Use compost and organic fertilizers to enhance yield.</li>
          <li>Grafting can help grow disease-resistant fruit varieties faster.</li>
          <li>Visit local demonstration farms to see multicropping in action.</li>
          <li>Share your experiences with other farmers to learn best practices.</li>
        </ul>
      </section>

      {/* Call-to-Action Section */}
      <section className="p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-black-900">Start Practicing Today!</h2>
        <p className="mb-4 text-green-800">
          Apply these techniques in your own farm and improve productivity. Share your results with our community!
        </p>
        <button className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800">
          Share Your Experience
        </button>
      </section>

    </div>
  );
};

export default Training;
