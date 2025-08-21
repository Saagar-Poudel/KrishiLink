import { LucideMoon, LucideSun } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";

function Thems() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

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
      className=" p-2 hover:bg-yellow-200 dark:hover:bg-zinc-700 rounded-lg text-black dark:text-black bg-yellow-200"
    >
      {darkMode ? <LucideSun size={20} /> : <LucideMoon size={20} />}
    </button>
  );
}

export default Thems;
