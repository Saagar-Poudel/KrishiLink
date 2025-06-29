import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    number: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({ name: '', email: '', number: '', subject: '', message: '' });
  };

  const contactInfo = {
    phone: '+977-1-1234567',
    email: 'info@Krishilink.com',
    address: 'bharatpur, Chitwan, Nepal',
  };

  const faqs = [
    { question: 'How can I check market prices?', answer: 'Select your city from the dropdown on the Daily Market Price page.' },
    { question: 'What cities are covered?', answer: 'We cover Chitwan, Bharatpur, Kathmandu, Pokhara, Biratnagar, Lalitpur, and Birgunj.' },
    { question: 'How do I contact support?', answer: 'Use the form below or reach us at the provided phone number or email.' },
  ];

  return (
    <div className='max-w mx-auto mt-px mb-8'> 
    <div className="max-w-5xl mx-auto bg-gray-100 rounded-lg p-6 shadow-md mb-8">
      {/* Get in Contact Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-green-700">Phone</h3>
            <p className="text-gray-600">{contactInfo.phone}</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-green-700">Email</h3>
            <p className="text-gray-600">
              <a href={`mailto:${contactInfo.email}`} className="underline">{contactInfo.email}</a>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-medium text-green-700">Address</h3>
            <p className="text-gray-600">{contactInfo.address}</p>
          </div>
        </div>
      </section>

      {/* Interested in Discussion Form */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interested in Discussion</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-lg"
                required
                placeholder='Full Name'
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border rounded-lg"
                required
                placeholder='Eg:info@Krishilink.com'
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg"
              required
              placeholder='+977 9812345678'
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg"
              required
              placeholder='Agriculture'
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-lg"
              rows="4"
              required
              placeholder='Write your queries..........'
            />
          </div>
          <button
            type="submit"
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      </section>
 </div>
      {/* FAQ Section */}
      <div className='max-w-5xl mx-auto bg-gray-100 rounded-lg p-6 shadow-md mt-px'>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
        </div>

      {/* Map Placeholder Section */}
      {/* <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Location</h2>
        <div className="bg-gray-300 h-64 rounded-lg flex items-center justify-center">
          <p className="text-gray-600">Map Placeholder (Integrate Google Maps API here)</p>
        </div>
      </section> */}
   
    </div>
  );
};

export default ContactUs;