import React, { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, User, Bell, Languages } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import Thems from "./Thems";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Cart } from "./Cart";
import { useCart } from "../contexts/CartContex";
import LogoSVG from "../assets/logo.svg"; // ✅ updated import
import { useAuth } from "../contexts/Authcontext";
import ProfileMenu from "./ProfileMenu";
import { io } from "socket.io-client";
import NotificationDialog from "./NotificationDialog";
import axios from "axios";

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
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);

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
    // { name: t("Storage"), path: "/storage" },
    { name: t("Contact"), path:"/contact"}
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

  const handleOpenDialog = (notif) => {
    setSelectedNotif(notif);
    setDialogOpen(true);
  };

  const handleMarkAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/notifications/read/${id}`);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
      setDialogOpen(false);
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
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

              {openNotif && (
                <div className="absolute right-0 mt-3 w-96 bg-white border-0 rounded-xl shadow-2xl z-50 dark:bg-[#0F1F17] backdrop-blur-lg">
                  {/* Header */}
                  <div className="p-4 border-b dark:border-[#1F2E25] bg-gradient-to-r from-gray-50 to-green-50 dark:from-[#0F1F17] dark:to-[#14281E] rounded-t-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            Notifications
                          </h3>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {notifications.length} unread
                            {notifications.length !== 1 ? "s" : ""}
                          </p>
                        </div>
                      </div>
                      {notifications.length > 0 && (
                        <button
                          onClick={() => markAllAsRead()}
                          className="text-xs text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Notifications List */}
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="flex flex-col items-center justify-center p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-[#1F2E25] rounded-full flex items-center justify-center mb-3">
                          <svg
                            className="w-8 h-8 text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">
                          No notifications
                        </p>
                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                          We'll notify you when something arrives
                        </p>
                      </div>
                    ) : (
                      notifications.map((n, i) => (
                        <div
                          key={i}
                          onClick={() => handleOpenDialog(n)}
                          className={`group p-4 border-b dark:border-[#1F2E25] cursor-pointer transition-all duration-200 hover:bg-green-50 dark:hover:bg-[#1A2B22] ${
                            !n.isRead
                              ? "bg-green-50 dark:bg-[#1A2B22] border-l-4 border-l-green-500"
                              : "bg-white dark:bg-[#0F1F17] hover:bg-gray-50 dark:hover:bg-[#1A2B22]"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {/* Status Indicator */}
                            <div className="flex flex-col items-center gap-2">
                              {!n.isRead && (
                                <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-1.5"></span>
                              )}
                              <div
                                className={`w-1 h-1 rounded-full ${
                                  !n.isRead
                                    ? "bg-green-200"
                                    : "bg-gray-300 dark:bg-gray-600"
                                }`}
                              ></div>
                              <div
                                className={`w-1 h-1 rounded-full ${
                                  !n.isRead
                                    ? "bg-green-200"
                                    : "bg-gray-300 dark:bg-gray-600"
                                }`}
                              ></div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-1">
                                <p
                                  className={`text-sm leading-relaxed ${
                                    !n.isRead
                                      ? "font-semibold text-gray-900 dark:text-white"
                                      : "text-gray-700 dark:text-gray-300"
                                  }`}
                                >
                                  {n.message}
                                </p>
                                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                                  {!n.isRead && (
                                    <span className="px-1.5 py-0.5 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                                      New
                                    </span>
                                  )}
                                  <svg
                                    className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </div>
                              </div>

                              {/* Metadata */}
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                  <svg
                                    className="w-3 h-3"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  {timeAgo(n.createdAt)}
                                </span>
                                {n.type && (
                                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                                    {n.type}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className="p-3 border-t dark:border-[#1F2E25] bg-gray-50 dark:bg-[#0A1911] rounded-b-xl">
                      <button className="w-full text-center text-sm text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 transition-colors font-medium">
                        View all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center px-3 py-1 border rounded text-sm hover:bg-gray-300
                         dark:border-[#374151] dark:hover:bg-[#12241A] dark:text-[#D1D5DB]"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="ml-2 ">{t("cart")}</span>
              {totalItems > 0 && (
                <span
                  className="absolute -top-2 -right-2 h-5 w-5 rounded-full 
                                 bg-[#EF4444] text-white text-xs flex items-center justify-center"
                >
                  {totalItems}
                </span>
              )}
            </button>
            <Thems />
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
            </div>
          </div>
        )}
      </div>

      <NotificationDialog
        open={dialogOpen}
        notification={selectedNotif}
        onClose={() => setDialogOpen(false)}
        onDone={handleMarkAsRead}
      />

      {/* Cart Drawer */}
      {isCartOpen && (
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      )}
    </header>
  );
};

export default Header;
