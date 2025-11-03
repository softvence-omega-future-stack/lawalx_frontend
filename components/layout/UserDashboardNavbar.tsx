
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  HelpCircle,
  Plus,
  Moon,
  User,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { after } from "next/dist/server/after/after";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/screens", label: "Screens" },
  { href: "/content", label: "Content" },
  { href: "/schedules", label: "Schedules" },
  { href: "/devices", label: "Devices" },
];

export default function UserDashboardNavbar() {
  const pathname = usePathname();
  const [helpOpen, setHelpOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeAllDropdowns = () => {
    setHelpOpen(false);
    setProfileOpen(false);
    setNewOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 max-w-[1920px] mx-auto">
      <div className="px-5 sm:px-8 py-4 sm:py-6 flex items-center justify-between">
        {/* Left section - Logo & Desktop Navigation */}
        <div className="flex items-center gap-4 lg:gap-8 flex-1">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center shrink-0">
            <Image
              src="/tape.svg"
              alt="DigitalSignage Logo"
              width={150}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 xl:px-4 py-2 text-sm transition-colors whitespace-nowrap ${pathname === item.href ? "bg-blue-50 text-[#0FA6FF] font-medium border-b-2 border-[#0FA6FF]" : "relative text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all ease-in-out duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#0FA6FF] after:w-0 hover:after:w-full after:transition-[width] after:ease-in-out after:duration-500"}`}
            >
              {item.label}
            </Link>
          ))}
          </nav>
        </div>

        {/* Right section - Desktop Actions */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {/* Help Button */}
          <div className="relative">
            <button
              onClick={() => {
                setHelpOpen(!helpOpen);
                setProfileOpen(false);
                setNewOpen(false);
              }}
              className="p-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-center gap-1"
            >
              <HelpCircle className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600 hidden lg:inline">
                {" "}
                Help
              </span>
            </button>
            {helpOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setHelpOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-40">
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
                    FAQs
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
                    Video Tutorials
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
                    Contact
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
                    Report a Problem
                  </button>
                </div>
              </>
            )}
          </div>

          {/* New Button */}
          <div className="relative">
            <button
              onClick={() => {
                setNewOpen(!newOpen);
                setHelpOpen(false);
                setProfileOpen(false);
              }}
              className="px-3 lg:px-4 py-2 bg-[#0FA6FF] text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-1.5 text-sm font-medium"
            >
              <span className="hidden lg:inline">New</span>
              <ChevronDown className="sm:pl-1 sm:border-l border-l-0 border-gray-300 w-4 h-4" />
            </button>
            {newOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setNewOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-40">
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
                    Add Device
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
                    Upload Content
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
                    Schedule
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
                    New Folder
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Notifications */}
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>

          {/* Dark Mode */}
          <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
            <Moon className="w-5 h-5 text-gray-600" />
          </button>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setHelpOpen(false);
                setNewOpen(false);
              }}
              className="p-2 hover:bg-gray-50 rounded-full bg-gray-100 transition-colors"
            >
              <User className="w-5 h-5 text-gray-600" />
            </button>
            {profileOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setProfileOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-40">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500">john@example.com</p>
                  </div>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
                    My Plan
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
                    Edit Profile
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
                    Settings
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
                    Support
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-red-50 text-sm text-red-600">
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          {/* Mobile Navigation Links */}
          <nav className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 text-sm rounded-md transition-colors ${
                  pathname === item.href
                    ? "bg-blue-50 text-blue-600 font-medium"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Actions */}
          <div className="px-4 py-3 border-t border-gray-200 space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <HelpCircle className="w-5 h-5 text-gray-600" />
              Help
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors font-medium">
              <Plus className="w-5 h-5" />
              New
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              Notifications
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <Moon className="w-5 h-5 text-gray-600" />
              Dark Mode
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
              <User className="w-5 h-5 text-gray-600" />
              Profile
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
