"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type DropdownProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label?: string;
  className?: string;
};

const Dropdown: React.FC<DropdownProps> = ({ 
  value, 
  options, 
  onChange, 
  icon: Icon,
  label,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center gap-2 px-4 py-2 text-black dark:text-white bg-navbarBg border border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm w-full justify-between outline-none"
      >
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4 text-gray-400" />}
          <span className="truncate">
            {label && <span className="text-gray-500 mr-1">{label}:</span>}
            {value}
          </span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-[60]" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute left-0 mt-2 w-full bg-navbarBg border border-border rounded-lg shadow-lg z-[70] py-1 animate-in fade-in zoom-in duration-100">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                  value === option ? 'text-blue-600 dark:text-blue-400 font-medium bg-blue-50/50 dark:bg-blue-900/20' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dropdown;
