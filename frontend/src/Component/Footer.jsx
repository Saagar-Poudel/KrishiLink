import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { name: t("Marketplace"), href: "#marketplace" },
    { name: t("Weather"), href: "#weather" },
    { name: t("News"), href: "#news" },
    { name: t("Training"), href: "#training" },
    { name: t("Storage"), href: "#storage" },
  ];

  const services = [
    { name: t("aiSupport"), href: "#" },
    { name: t("coldStorage"), href: "#" },
    { name: t("bulkTrading"), href: "#" },
    { name: t("PriceAlerts"), href: "#" },
    { name: t("DeliveryService"), href: "#" },
  ];

  const support = [
    { name: t("HelpCenter"), href: "#" },
    { name: t("Contact"), href: "#" },
    { name: t("PrivacyPolicy"), href: "#" },
    { name: t("TermsOfService"), href: "#" },
    { name: t("FAQ"), href: "#" },
  ];

  return (
    <footer className="relative bg-green-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="bg-yellow-500 text-yellow-900 px-3 py-1 rounded-lg shadow-md">
                <div className="text-lg font-bold">कृषि</div>
              </div>
              <span className="ml-3 text-xl font-bold tracking-wide">
                Krishi Link
              </span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              नेपालका किसानहरूका लागि डिजिटल कृषि प्लेटफर्म। आधुनिक प्रविधिको साथ
              कृषिलाई सजिलो र फाइदाजनक बनाउँदै।
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-yellow-400" />
                <span>+९७७-१-४२३४५६७</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-yellow-400" />
                <span>info@krishilink.com.np</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-yellow-400" />
                <span>काठमाडौं, नेपाल</span>
              </div>
            </div>
          </div>

          {/* Quick Links, Services, Support */}
          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-2">
                {t("quickLinks")}
              </h3>
              <ul className="space-y-2 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/80 hover:text-yellow-400 transition-colors"
                    >
                      {t(link.name)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-2">
                {t("services")}
              </h3>
              <ul className="space-y-2 text-sm">
                {services.map((service) => (
                  <li key={service.name}>
                    <a
                      href={service.href}
                      className="text-white/80 hover:text-yellow-400 transition-colors"
                    >
                      {t(service.name)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4 border-l-4 border-yellow-400 pl-2">
                {t("support")}
              </h3>
              <ul className="space-y-2 text-sm">
                {support.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-white/80 hover:text-yellow-400 transition-colors"
                    >
                      {t(item.name)}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social Media */}
              <div className="mt-6">
                <h4 className="text-xs font-medium uppercase tracking-wider mb-2">
                  {t("followUs")}
                </h4>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a href="#" className="hover:text-yellow-400 transition-colors">
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-xs">
          <div className="text-white/70 mb-2 md:mb-0">
            © २०८१ Krishi Link. {t("rightsReserved")}
          </div>
          <div className="flex items-center space-x-2 text-white/70">
            <span>Powered by</span>
            <span className="text-yellow-400 font-semibold">
              Krishi Link Pvt. Ltd.
            </span>
          </div>
        </div>
      </div>

      {/* Floating Back to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 group flex items-center justify-center p-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-full shadow-lg transition duration-300 transform hover:scale-110"
      >
        <ArrowUp className="h-5 w-5 group-hover:-translate-y-1 transition-transform duration-300" />
      </button>
    </footer>
  );
};

export default Footer;




