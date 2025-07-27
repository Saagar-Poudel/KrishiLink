
import React from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowUp, Sparkles } from "lucide-react";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-emerald-900 via-green-800 to-teal-900 border-t border-emerald-700 mt-auto">
      {/* Decorative top border with gradient */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-emerald-400 to-teal-400"></div>
      
      {/* Main footer content */}
      <div className="mx-auto max-w-screen-xl px-4 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
        
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-4 group">
              <div className="relative">
                <Sparkles className="h-8 w-8 text-yellow-300 animate-pulse" />
              </div>
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent">
                KrishiLink
              </span>
            </Link>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Empowering farmers with innovative agricultural solutions for sustainable farming and a greener future.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center group hover:text-yellow-300 transition duration-300">
                <Phone className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span>+977-1-1234567</span>
              </div>
              <div className="flex items-center group hover:text-yellow-300 transition duration-300">
                <Mail className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span>krishilink@agromoments.com</span>
              </div>
              <div className="flex items-center group hover:text-yellow-300 transition duration-300">
                <MapPin className="h-4 w-4 mr-2 group-hover:bounce transition-all duration-300" />
                <span>Bharatpur, Chitwan</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-yellow-300 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-emerald-400"></div>
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Products", path: "/products" },
                { name: "Dashboard", path: "/dashboard" }
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.path} 
                    className="text-gray-300 hover:text-yellow-300 transition duration-300 group relative inline-block"
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-300 to-emerald-300 group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-yellow-300 relative">
              Our Services
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-emerald-400"></div>
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                "Smart Farming Solutions",
                "Crop Management",
                "Agricultural Consulting",
                "Market Analytics"
              ].map((service) => (
                <li key={service}>
                  <span className="text-gray-300 hover:text-yellow-300 transition duration-300 cursor-pointer group">
                    <span className="group-hover:translate-x-1 inline-block transition-transform duration-300">
                      {service}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-yellow-300 relative">
              Stay Connected
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-yellow-400 to-emerald-400"></div>
            </h3>

            <div className="flex space-x-4 mb-6">
              {[
                { Icon: Facebook, href: "https://facebook.com", color: "hover:text-blue-400" },
                { Icon: Twitter, href: "https://twitter.com", color: "hover:text-sky-400" },
                { Icon: Instagram, href: "https://instagram.com", color: "hover:text-pink-400" },
                { Icon: Linkedin, href: "https://linkedin.com", color: "hover:text-blue-500" }
              ].map(({ Icon, href, color }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-300 ${color} transition duration-300 transform hover:scale-125 hover:-translate-y-1`}
                >
                  <Icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-emerald-700" />
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <span className="text-sm text-gray-300">
              © {new Date().getFullYear()} KrishiLink. All Rights Reserved. Made with ❤️ for farmers.
            </span>
          </div>
          
        
          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg transition duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg"
          >
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Back to Top</span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 via-yellow-400 to-teal-600 opacity-50"></div>
    </footer>
  );
}

export default Footer;