import React, { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, User, Bell, Languages } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import Thems from "./Thems";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Cart } from "./Cart";
import { useCart } from "../contexts/CartContex";
import LogoSVG from "../assets/logo.svg"; // ✅ updated import
import Chatbot from "../Component/chatbot/Chatbot";
import { useAuth } from "../contexts/Authcontext";
import ProfileMenu from "./ProfileMenu";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { getTotalItems } = useCart();
  const { user, logout } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const totalItems = getTotalItems();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [openNotif, setOpenNotif] = useState(false);

  useEffect(() => {
    if (user) {
      socket.emit("add-user", user.id);

      // Fetch past notifications
      fetch(`http://localhost:3000/api/notifications/${user.id}`)
        .then((res) => res.json())
        .then((data) => setNotifications(data));

      // Listen for new ones
      socket.on("notification-receive", (notif) => {
        setNotifications((prev) => [notif, ...prev]);
      });
    }
  }, [user]);

  const navItems = [
    { name: t("Home"), path: "/" },
    { name: t("Market"), path: "/market" },
    { name: t("News"), path: "/news" },
    { name: t("Training"), path: "/training" },
    { name: t("Storage"), path: "/storage" },
  ];

  // Format timestamp -> "x minutes ago"
  const timeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;

    // fallback -> show full date
    return date.toLocaleDateString();
  };

  const handleLogout = () => {
    logout(); // clear auth state
    navigate("/"); // redirect to homepage
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 dark:bg-[#0B1A12] dark:text-[#F9FAFB]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div
              className="bg-white border border-green-600 rounded px-2 py-1 
                            text-green-600 font-bold text-lg shadow-sm
                            dark:bg-[#12241A] dark:border-[#34D399] dark:text-[#34D399]"
            >
              कृषि
            </div>
            <span className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-[#F9FAFB]">
              Krishi Link
            </span>
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
                      ? "bg-green-100 text-green-700 dark:bg-[#34D399]/20 dark:text-[#34D399]"
                      : "hover:text-green-600 hover:bg-gray-100 dark:hover:text-[#34D399] dark:hover:bg-[#12241A]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Actions (Desktop/Tablet) */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setOpenNotif(!openNotif)}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors
     dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
              >
                <Bell className="h-5 w-5" />
                {notifications.filter((n) => !n.isRead).length > 0 && (
                  <span
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full 
                       bg-[#EF4444] text-white text-xs flex items-center justify-center"
                  >
                    {notifications.filter((n) => !n.isRead).length}
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {openNotif && (
                <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 dark:bg-[#0B1A12]">
                  <div className="p-2 font-semibold border-b dark:border-[#1F2937]">
                    Notifications
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="p-2 text-sm text-gray-500">
                        No notifications
                      </p>
                    ) : (
                      notifications.map((n, i) => (
                        <div
                          key={i}
                          className={`p-2 text-sm border-b dark:border-[#1F2937] flex justify-between items-start ${
                            !n.isRead ? "bg-yellow-50 dark:bg-[#12241A]" : ""
                          }`}
                        >
                          <span>{n.message}</span>
                          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">
                            {timeAgo(n.createdAt)}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            {/* Cart Button (DESKTOP) */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center px-3 py-1 border rounded text-sm
                         dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="ml-2">{t("cart")}</span>
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full 
                                 bg-[#EF4444] text-white text-xs flex items-center justify-center"
                >
                  {totalItems}
                </span>
              )}
            </button>
            <ProfileMenu />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors
                         dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0B1A12] shadow-lg rounded-xl p-2 z-50">
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
                        ? "bg-green-100 text-green-700 dark:bg-[#34D399]/20 dark:text-[#34D399]"
                        : "hover:text-green-600 hover:bg-gray-100 dark:hover:text-[#34D399] dark:hover:bg-[#12241A]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}

              <div className="border-t border-gray-200 dark:border-[#1F2937] my-2"></div>

              {/* Mobile Actions */}
              <div className="flex flex-col space-y-2">
                <button
                  onClick={toggleLanguage}
                  className="w-full px-3 py-2 text-sm font-medium border border-gray-300 rounded-md 
                             hover:bg-gray-100 transition-colors flex items-center justify-center
                             dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
                >
                  <Languages className="h-4 w-4 mr-1" />
                  {language === "en" ? "नेपाली" : "English"}
                </button>

                <button
                  className="w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex justify-center
                                   dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
                >
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </button>

                <button
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsMenuOpen(false);
                  }}
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

                <button
                  className="w-full px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors flex justify-center
                                   dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
                >
                  <User className="h-5 w-5 mr-2" />
                  Profile
                </button>

                {/* Login / Logout for Mobile */}
                {user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all text-center
                               dark:bg-red-500 dark:hover:bg-red-600"
                  >
                    {t("logout")}
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all text-center
                               dark:bg-[#34D399] dark:hover:bg-[#059669] dark:text-[#0B1A12]"
                  >
                    {t("login")}
                  </Link>
                )}
                <div className="flex justify-center pt-2">
                  <Thems />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cart Drawer */}
      {isCartOpen && (
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </header>
  );
};

export default Header;
