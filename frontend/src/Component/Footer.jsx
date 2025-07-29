
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin,ArrowUp } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';


const Footer = () => {
  const { t } = useLanguage();
 
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { name: 'मार्केटप्लेस', href: '#marketplace' },
    { name: 'मौसम जानकारी', href: '#weather' },
    { name: 'समाचार', href: '#news' },
    { name: 'प्रशिक्षण', href: '#training' },
    { name: 'स्टोरेज', href: '#storage' },
  ];

  const services = [
    { name: 'AI सहायता', href: '#' },
    { name: 'किसान समूह', href: '#' },
    { name: 'बल्क अर्डर', href: '#' },
    { name: 'मूल्य अलर्ट', href: '#' },
    { name: 'डिलिभरी सेवा', href: '#' },
  ];

  const support = [
    { name: 'सहायता केन्द्र', href: '#' },
    { name: 'सम्पर्क', href: '#' },
    { name: 'गोपनीयता नीति', href: '#' },
    { name: 'सेवाका सर्तहरू', href: '#' },
    { name: 'FAQ', href: '#' },
  ];

  return (
    <footer className="bg-green-700 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-yellow-500 text-yellow-900 p-2 rounded">
                <div className="text-lg font-bold">कृषि</div>
              </div>
              <span className="ml-2 text-lg font-bold">Krishi Link</span>
            </div>
            <p className="text-white/80 text-sm">
              नेपालका किसानहरूका लागि डिजिटल कृषि प्लेटफर्म। आधुनिक प्रविधिको साथ कृषिलाई सजिलो र फाइदाजनक बनाउँदै।
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>+९७७-१-४२३४५६७</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>info@krishilink.com.np</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>काठमाडौं, नेपाल</span>
              </div>
            </div>
          </div>

          {/* Quick Links, Services, and Support in the same row */}
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-md font-semibold mb-3">{t('quickLinks')}</h3>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-md font-semibold mb-3">{t('services')}</h3>
              <ul className="space-y-2 text-sm">
                {services.map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-md font-semibold mb-3">{t('support')}</h3>
              <ul className="space-y-2 text-sm">
                {support.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              {/* Social Media */}
              <div className="mt-4">
                <h4 className="text-xs font-medium mb-2">{t('followUs')}</h4>
                <div className="flex space-x-2">
                  <button className="text-white hover:text-gray-300">
                    <Facebook className="h-5 w-5" />
                  </button>
                  <button className="text-white hover:text-gray-300">
                    <Twitter className="h-5 w-5" />
                  </button>
                  <button className="text-white hover:text-gray-300">
                    <Instagram className="h-5 w-5" />
                  </button>
                  <button className="text-white hover:text-gray-300">
                    <Youtube className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-6 pt-4 flex flex-col md:flex-row justify-between items-center text-xs">
          <div className="text-white/80 mb-2 md:mb-0">
            © २०८१ Krishi Link. {t('rightsReserved')}
          </div>
          <div className="flex items-center space-x-2 text-white/80">
            <span>Powered by</span>
            <span className="text-yellow-400 font-semibold">Krishi link  Pvt. Ltd.</span>
          </div>
        </div>
         <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg transition duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-lg"
          >
            <ArrowUp className="h-4 w-4 group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="text-sm font-medium">Back to Top</span>
          </button>
      </div>
    </footer>
  );
};

export default Footer;

