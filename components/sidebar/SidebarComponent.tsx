// components/sidebar/SidebarComponent.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  href: string;
}

interface SidebarComponentProps {
  items?: SidebarItem[];
}

const SidebarComponent: React.FC<SidebarComponentProps> = ({ items = [] }) => {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href;

  const toggleMobileSidebar = () => setIsMobileOpen(!isMobileOpen);
  const closeMobileSidebar = () => setIsMobileOpen(false);

  return (
    <>
      {/* Mobile Toggle Button - Positioned below navbar */}
      <button
        onClick={toggleMobileSidebar}
        className="lg:hidden fixed top-30 left-4 z-50 p-2 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-400"
        aria-label="Toggle sidebar"
      >
        {isMobileOpen ? (
          <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileSidebar}
        />
      )}

      {/* Sidebar - Always below navbar */}
      <aside
        className={`
          fixed 
          inset-x-0        
          lg:left-0 lg:w-64   
          top-0            
          pt-20            
          lg:pt-24         
          h-screen 
          bg-navbarBg 
          border-r border-border 
          shadow-lg
          transition-transform duration-300 ease-in-out
          z-40
          overflow-y-auto scrollbar-hide
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        <div className="px-4 py-6 space-y-1">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              onClick={closeMobileSidebar}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium
                transition-all duration-200
                ${
                  isActive(item.href)
                    ? "bg-blue-50 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                }
              `}
            >
              <span
                className={
                  isActive(item.href)
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-500"
                }
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
};

export default SidebarComponent;
