import { LucideMoon, LucideSun } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";

function Thems() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  // const [darkMode, setDarkMode] = useState(()=>{
  //   const savedTheme = localStorage.getItem("theme");
  //   if(savedTheme) return savedTheme ==="dark";
  //    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  // });


  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
   <button
      onClick={toggleTheme}
      className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300
        ${darkMode ? "bg-green-900" : "bg-yellow-400"}`}
    >
      <div
        className={`w-6 h-6 flex items-center justify-center rounded-full bg-white shadow-md transform transition-transform duration-300
          ${darkMode ? "translate-x-6" : "translate-x-0"}`}
      >
        {darkMode ? (
          <LucideMoon size={16} className="text-blue-900" />
        ) : (
          <LucideSun size={16} className="text-yellow-500" />
        )}
      </div>
    </button>

  );
}

export default Thems;
