import { useState, useEffect } from "react";
import { Theme } from "../types";
import { DynamicIcon } from "lucide-react/dynamic";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const onToggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="relative z-0 inline-grid grid-cols-2 gap-0.5 rounded-full bg-gray-950/5 p-1 border border-gray-200 dark:border-white/10 text-gray-950 dark:bg-white/5 dark:text-white w-12 h-6 md:w-13 md:h-7 transition-colors duration-300">
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-indigo-500 dark:bg-indigo-400 rounded-full transition-transform duration-300 ease-in-out ${
          theme === "dark" ? "translate-x-full" : ""
        }`}
      />

      <button
        onClick={onToggleTheme}
        className="relative cursor-pointer left-[-0.1rem] z-10 flex items-center justify-center text-gray-50"
      >
        <DynamicIcon
          name="sun"
          className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-opacity duration-300 ${theme === "dark" ? "opacity-0" : "opacity-100"}`}
        />
      </button>

      <button
        onClick={onToggleTheme}
        className="relative cursor-pointer left-0.5 z-10 flex items-center justify-center"
      >
        <DynamicIcon
          name="moon"
          className={`w-3.5 h-3.5 md:w-4 md:h-4 transition-opacity duration-300 ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
        />
      </button>
    </div>
  );
};

export default ThemeToggle;
