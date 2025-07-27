
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'krishilink@agromoments.com',
      link: 'mailto:krishilink@agromoments.com'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+977-1-1234567',
      link: 'tel:+977-1-1234567'
    },
    {
      icon: MapPin,
      title: 'Location',
      content: 'Bharatpur, Chitwan, Nepal',
      link: '#'
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon-Fri: 9AM-6PM',
      link: '#'
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Get In Touch</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Ready to capture your agricultural needs? Let’s discuss how we can help you grow and guide you through the process.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 p-8 shadow rounded-lg">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Send us a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name *</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="mt-1 w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Contact Information</h3>
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
                    <info.icon className="w-5 h-5 text-green-600 dark:text-green-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">{info.title}</h4>
                    {info.link !== '#' ? (
                      <a href={info.link} className="text-green-600 dark:text-green-400 hover:underline">
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-gray-600 dark:text-gray-300">{info.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Services */}
            <div className="bg-white dark:bg-gray-800 p-6 shadow rounded-lg">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Our Services</h3>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
                <li>Online Delivery System</li>
                <li>Virtual Consultations</li>
                <li>Buying and Selling Agricultural Products</li>
                <li>Provide training videos</li>
                <li>Crop Advisory Services</li>
                <li>Soil Health Monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
