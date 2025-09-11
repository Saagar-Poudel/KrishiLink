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
  className="flex items-center gap-2 px-3 py-2 rounded-lg 
             bg-yellow-200 dark:bg-zinc-700 
             hover:bg-yellow-300 dark:hover:bg-zinc-600
             text-black"
>
  {darkMode ? <LucideSun size={20} /> : <LucideMoon size={20} />}
  <span>{darkMode ? "Light" : "Dark"}</span>
</button>

  );
}

export default Thems;
