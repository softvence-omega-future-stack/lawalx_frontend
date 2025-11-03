// components/Navbar.tsx
'use client';
import { useState } from 'react';
import { Menu, X, Bell, Sun, Moon, HelpCircle, User } from 'lucide-react';

export default function UserNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const navItems = ['Dashboard', 'Screens', 'Content', 'Schedules', 'Devices'];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-cyan-500">tape</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`text-sm font-medium transition-colors ${
                  index === 0
                    ? 'text-cyan-500 border-b-2 border-cyan-500 pb-5'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right Side Icons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-900">
              <HelpCircle size={20} />
            </button>
            <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-600 transition-colors">
              New
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <Bell size={20} />
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <User size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-600 hover:text-gray-900"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-3 space-y-3">
            {navItems.map((item, index) => (
              <a
                key={item}
                href="#"
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-cyan-50 text-cyan-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {item}
              </a>
            ))}
            <div className="border-t border-gray-200 pt-3 mt-3 flex items-center justify-around">
              <button className="text-gray-600 hover:text-gray-900">
                <HelpCircle size={20} />
              </button>
              <button className="bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                New
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <Bell size={20} />
              </button>
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <User size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}