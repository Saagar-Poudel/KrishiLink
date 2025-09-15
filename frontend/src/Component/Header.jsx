import React, { useState } from 'react';
import { Menu, X, ShoppingCart, User, Bell, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Thems from "./Thems";
import { Link, NavLink } from 'react-router-dom';
import { Cart } from "./Cart";
import { useCart } from '../contexts/CartContex';
import LogoSVG from "../assets/logo.svg"; // ✅ updated import
import Chatbot from "../Component/chatbot/Chatbot"; 


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { getTotalItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = getTotalItems();

  const navItems = [
    { name: t('Home'), path: '/' },
    { name: t('Market'), path: '/market' },
    { name: t('Weather'), path: '/weather' },
    { name: t('News'), path: '/news' },
    { name: t('Training'), path: '/training' },
    { name: t('Storage'), path: '/storage' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 dark:bg-[#0B1A12] dark:text-[#F9FAFB]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-20">

{/* Logo */}
<div className="flex justify-center items-center h-16 sm:h-35
 pb-8">
  <img
    src={LogoSVG}
    alt="Krishi Link Logo"
    className="h-full w-auto"
  />
</div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6 text-[15px] sm:text-[16px] font-medium text-gray-700 dark:text-[#D1D5DB]">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-2 sm:px-3 py-2 rounded-md transition-all ${
                  isActive
                    ? 'bg-green-100 text-green-700 dark:bg-[#34D399]/20 dark:text-[#34D399]'
                    : 'hover:text-green-600 hover:bg-gray-100 dark:hover:text-[#34D399] dark:hover:bg-[#12241A]'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Actions (Desktop/Tablet) */}
        <div className="hidden lg:flex items-center space-x-3">
          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            className="px-3 py-2 text-sm font-medium border border-gray-300 rounded-md 
                       hover:bg-gray-100 transition-colors flex items-center
                       dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
          >
            <Languages className="h-4 w-4 mr-1" />
            {language === 'en' ? 'नेपाली' : 'English'}
          </button>

          {/* Notifications */}
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors relative
                             dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-[#FACC15] rounded-full"></span>
          </button>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center px-3 py-1 border rounded text-sm
                       dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="ml-2">{t("cart")}</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full 
                               bg-[#EF4444] text-white text-xs flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* User */}
          <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors
                             dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]">
            <User className="h-5 w-5" />
          </button>

          {/* Login Button */}
          <Link
            to="/Login"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all
                       dark:bg-[#34D399] dark:hover:bg-[#059669] dark:text-[#0B1A12]"
          >
            {t('login')}
          </Link>

          <Thems />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors
                       dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden mt-2 pb-4 border-t border-gray-200 dark:border-[#1F2937]">
          <div className="flex flex-col space-y-2 mt-3">
            {/* Nav Links */}
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-green-100 text-green-700 dark:bg-[#34D399]/20 dark:text-[#34D399]'
                      : 'hover:text-green-600 hover:bg-gray-100 dark:hover:text-[#34D399] dark:hover:bg-[#12241A]'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-[#1F2937] my-2"></div>

            {/* All Actions (same as desktop) */}
            <div className="flex flex-col space-y-2">
              <button
                onClick={toggleLanguage}
                className="w-full px-3 py-2 text-sm font-medium border border-gray-300 rounded-md 
                           hover:bg-gray-100 transition-colors flex items-center justify-center
                           dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
              >
                <Languages className="h-4 w-4 mr-1" />
                {language === 'en' ? 'नेपाली' : 'English'}
              </button>

              <button className="w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex justify-center
                                 dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]">
                <Bell className="h-5 w-5 mr-2" />
                Notifications
              </button>

              <button
                onClick={() => { setIsCartOpen(true); setIsMenuOpen(false); }}
                className="relative flex items-center justify-center px-3 py-2 border rounded text-sm
                           dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {t("cart")}
                {totalItems > 0 && (
                  <span className="ml-2 h-5 w-5 rounded-full bg-[#EF4444] text-white text-xs flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <button className="w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex justify-center
                                 dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]">
                <User className="h-5 w-5 mr-2" />
                Profile
              </button>

              <Link
                to="/Login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all text-center
                           dark:bg-[#34D399] dark:hover:bg-[#059669] dark:text-[#0B1A12]"
              >
                {t('login')}
              </Link>

              <Link
                to="/Signup"
                onClick={() => setIsMenuOpen(false)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors text-center
                           dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
              >
                {t('signup')}
              </Link>

              <div className="flex justify-center pt-2">
                <Thems />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} /> 
      )}
    {/* Floating Chatbot */}
<Chatbot />
    </header>
  );
};

export default Header;
