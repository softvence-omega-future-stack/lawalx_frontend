'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Bell, Sun, Moon, HelpCircle, User, ChevronDown } from 'lucide-react';

export default function UserNavbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Define your navigation links
  const navItems = [
    { name: 'Dashboard', href: '/user/dashboard' },
    { name: 'Screens', href: '/screens' },
    { name: 'Content', href: '/content' },
    { name: 'Schedules', href: '/schedules' },
    { name: 'Devices', href: '/devices' },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur-sm ${
        isDarkMode ? 'dark' : ''
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="text-2xl font-bold text-cyan-500 select-none tracking-tight">
            tape
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group relative px-2 py-2 text-sm font-medium transition-colors duration-200 pr-8 ${
                    isActive
                      ? 'text-cyan-600'
                      : 'text-gray-700 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                  {/* Smooth underline animation */}
                  <span
                    className={`absolute left-0 bottom-[-4px] h-[2px] bg-cyan-500 transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              );
            })}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-2">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all">
              <HelpCircle size={20} />
            </button>

            <button className="flex items-center gap-1.5 bg-cyan-500 text-white px-3.5 py-2 rounded-md text-sm font-medium hover:bg-cyan-600 transition-all shadow-sm hover:shadow">
              <span>New</span>
              <ChevronDown size={16} />
            </button>

            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all relative">
              <Bell size={20} />
            </button>

            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-all">
              <User size={20} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fadeIn">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block w-full text-left px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-cyan-50 text-cyan-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="border-t border-gray-200 pt-3 mt-3 flex items-center justify-around">
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <HelpCircle size={20} />
              </button>
              <button className="flex items-center gap-1 bg-cyan-500 text-white px-3.5 py-2 rounded-md text-sm font-medium hover:bg-cyan-600 transition-colors">
                <span>New</span>
                <ChevronDown size={16} />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <Bell size={20} />
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
