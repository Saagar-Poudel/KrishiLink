import React from 'react';
import { useState } from 'react';
import { Menu, X, ShoppingCart, User, Bell, Languages } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import Thems from "./Thems";
import { Link, NavLink } from 'react-router-dom';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

 const navItems = [
  { name: t('Home'), path: '/' },
  { name: t('Market'), path: '/Markets/market' },
  // { name: t('Market'), path: '/market' },
  { name: t('Weather'), path: '/weather' },
  { name: t('News'), path: '/news' },
  { name: t('Training'), path: '/training' },
  { name: t('Storage'), path: '/storage' },
];


  return (
    <header className="bg-white shadow-md sticky top-0 z-50 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-white border border-green-600 rounded px-2 py-1 text-green-600 font-bold text-lg shadow-sm">
              कृषि
            </div>
            <span className="text-xl font-semibold text-gray-800">Krishi Link</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 text-[16px] font-medium text-gray-700">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `px-3 py-2 rounded-md transition-all ${
                  isActive
                    ? 'bg-green-100 text-green-700'
                    : 'hover:text-green-600 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="px-3 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex items-center"
            >
              <Languages className="h-4 w-4 mr-1" />
              {language === 'en' ? 'नेपाली' : 'English'}
            </button>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-yellow-400 rounded-full"></span>
            </button>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
              <User className="h-5 w-5" />
            </button>
               <div className="flex items-center lg:order-2">
          </div>
             <div className="flex items-center lg:order-2">
            <Link
              to="/Login"
               className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
            >
             {t('login')} 
            </Link>
          </div>
            {/* <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all">
              {t('login')} 
            </button> */}
            <Thems/>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-gray-200">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({isActive}) => `block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-green-100 text-green-700'
                      : 'hover:text-green-600 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </NavLink>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <button 
                  onClick={toggleLanguage}
                  className="px-3 py-2 text-sm font-medium border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center"
                >
                  <Languages className="h-4 w-4 mr-1" />
                  {language === 'en' ? 'नेपाली' : 'English'}
                </button>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all flex-1">
                    {t('login')}
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex-1">
                    {t('signup')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
