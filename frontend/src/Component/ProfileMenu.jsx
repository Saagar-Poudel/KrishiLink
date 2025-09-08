import React, { useState, useRef, useEffect } from "react";
import { Bell, Languages, LogOut, LogIn, User } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import Thems from "./Thems";
import { useAuth } from "../contexts/Authcontext";
import { Link, useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Close menu if clicked outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Button */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 px-3 py-2 border rounded-md 
                   hover:bg-gray-100 dark:border-[#374151] dark:hover:bg-[#12241A]"
      >
        <User className="h-5 w-5" />
        <span className="hidden sm:block">{user ? user.username : "Profile"}</span>
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#0B1A12] shadow-lg rounded-xl p-2 z-50">
          <button
            onClick={toggleLanguage}
            className="flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#12241A]"
          >
            <Languages className="h-5 w-5 mr-2" />
            {language === "en" ? "नेपाली" : "English"}
          </button>

          <button
            className="flex items-center w-full px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-[#12241A]"
          >
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </button>

          <div className="px-3 py-2">
            <Thems />
          </div>

          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-red-600 rounded-md hover:bg-red-100 dark:hover:bg-[#12241A]"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center w-full px-3 py-2 text-green-600 rounded-md hover:bg-green-100 dark:hover:bg-[#12241A]"
            >
              <LogIn className="h-5 w-5 mr-2" />
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
