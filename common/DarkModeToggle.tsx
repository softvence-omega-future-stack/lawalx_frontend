"use client";
import { useEffect, useState, useRef } from "react";
import { Moon, Sun, ChevronDown } from "lucide-react";

const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const isDarkMode = storedTheme === "dark";
    document.documentElement.classList.toggle("dark", isDarkMode);
    setIsDark(isDarkMode);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const setTheme = (theme: "light" | "dark") => {
    const isDarkMode = theme === "dark";
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", theme);
    setIsDark(isDarkMode);
    setIsOpen(false);
  };

  const getCurrentThemeText = () => {
    return isDark ? "Dark" : "Light";
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Dropdown Trigger */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-2 
          px-3 py-2 
          rounded-lg 
          cursor-pointer 
          transition-all 
          duration-200 
          border border-gray-300 
          hover:border-gray-400 
          dark:border-gray-600 
          dark:hover:border-gray-500
          bg-white 
          dark:bg-gray-800
          hover:bg-gray-50
          dark:hover:bg-gray-700
          min-w-[120px]
          justify-between
        "
      >
        <div className="flex items-center gap-2">
          {isDark ? (
            <Moon className="w-4 h-4 text-yellow-500" />
          ) : (
            <Sun className="w-4 h-4 text-orange-500" />
          )}
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {getCurrentThemeText()}
          </span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`} 
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="
          absolute 
          top-full 
          left-0 
          right-0 
          mt-1 
          bg-white 
          dark:bg-gray-800 
          border 
          border-gray-300 
          dark:border-gray-600 
          rounded-lg 
          shadow-lg 
          z-50 
          overflow-hidden
        ">
          {/* Light Option */}
          <div
            onClick={() => setTheme("light")}
            className={`
              flex items-center gap-3 
              px-3 py-2 
              cursor-pointer 
              transition-colors 
              duration-150
              ${!isDark 
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }
            `}
          >
            <Sun className="w-4 h-4 text-orange-500" />
            <span className="text-sm font-medium">Light</span>
            {!isDark && (
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />
            )}
          </div>

          {/* Dark Option */}
          <div
            onClick={() => setTheme("dark")}
            className={`
              flex items-center gap-3 
              px-3 py-2 
              cursor-pointer 
              transition-colors 
              duration-150
              ${isDark 
                ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" 
                : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
              }
            `}
          >
            <Moon className="w-4 h-4 text-yellow-500" />
            <span className="text-sm font-medium">Dark</span>
            {isDark && (
              <div className="w-2 h-2 bg-blue-500 rounded-full ml-auto" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DarkModeToggle;