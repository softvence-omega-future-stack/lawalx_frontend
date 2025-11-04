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
  ScreenShareIcon,
  FilePlus,
  CalendarPlus,
  FolderPlus,
  VideoIcon,
  Mail,
  AlertCircle,
  UserRoundCogIcon,
  LogOutIcon,
  HelpCircleIcon,
  SettingsIcon,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";

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

  // const closeAllDropdowns = () => {
  //   setHelpOpen(false);
  //   setProfileOpen(false);
  //   setNewOpen(false);
  // };

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
                className={`px-3 xl:px-4 py-2 text-sm transition-colors whitespace-nowrap ${
                  pathname === item.href
                    ? "bg-blue-50 text-[#0FA6FF] font-medium border-b-2 border-[#0FA6FF]"
                    : "relative text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all ease-in-out duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:bg-[#0FA6FF] after:w-0 hover:after:w-full after:transition-[width] after:ease-in-out after:duration-500"
                }`}
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
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-40 p-2">
                  <button className="flex items-center w-full px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 rounded border-b border-gray-200">
                    <HelpCircle className="w-4 h-4" />
                    <span className="ml-2">FAQs</span>
                  </button>

                  <button className="flex items-center w-full px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 rounded border-b border-gray-200">
                    <VideoIcon className="w-4 h-4" />
                    <span className="ml-2">Video Tutorials</span>
                  </button>

                  <button className="flex items-center w-full px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 rounded border-b border-gray-200">
                    <Mail className="w-4 h-4" />
                    <span className="ml-2">Contact</span>
                  </button>

                  <button className="flex items-center w-full px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 rounded border-b border-gray-200">
                    <AlertCircle className="w-4 h-4" />
                    <span className="ml-2">Report a Problem</span>
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
              <span>New</span>
              <ChevronDown className="sm:pl-1 sm:border-l border-l-0 border-gray-300 w-4 h-4 hidden lg:inline" />
            </button>
            {newOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setNewOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-40 p-2">
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-200">
                    <ScreenShareIcon className="w-4 h-4 inline-block mr-2" />
                    Add Device
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-200">
                    <FilePlus className="w-4 h-4 inline-block mr-2" />
                    Upload Content
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-200">
                    <CalendarPlus className="w-4 h-4 inline-block mr-2" />
                    Schedule
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
                    <FolderPlus className="w-4 h-4 inline-block mr-2" />
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

                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden z-40">
                  {/* Profile Info */}
                  <div className="px-6 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm font-medium">
                        JD
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          James David
                        </p>
                        <p className="text-xs text-gray-500">James@gmail.com</p>
                      </div>
                    </div>
                  </div>

                  {/* My Plans Section */}
                  <div className="px-6 py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700">
                        My Plans
                      </p>
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                        Pro
                      </span>
                    </div>
                    <button className="mt-1 text-xs text-blue-600 hover:underline">
                      Manage Plans
                    </button>
                  </div>

                  {/* Divider */}
                  <div className="px-4">
                    <div className="border-t border-gray-200" />
                  </div>

                  {/* Menu Items */}
                  <div className="py-1 space-y-1">
                    <div className="px-4">
                      <button className="flex items-center w-full text-left py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 px-2">
                        <UserRoundCogIcon className="w-4 h-4 mr-2" />
                        Edit Profile
                      </button>
                    </div>
                    <div className="px-4">
                      <button className="flex items-center w-full text-left py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 px-2">
                        <SettingsIcon className="w-4 h-4 mr-2" />
                        Settings
                      </button>
                    </div>
                    <div className="px-4">
                      <button className="flex items-center w-full text-left py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 px-2">
                        <HelpCircleIcon className="w-4 h-4 mr-2" />
                        Support
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="px-4">
                    <div className="border-t border-gray-200" />
                  </div>

                  {/* Sign Out */}
                  <div className="px-4 py-1">
                    <button className="flex items-center w-full text-left py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 px-2">
                      <LogOutIcon className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
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
            <button className="flex items-center w-full px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 rounded">
              <HelpCircle className="w-4 h-4" />
              <span className="ml-2">FAQs</span>
            </button>

            <button className="flex items-center w-full px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 rounded">
              <VideoIcon className="w-4 h-4" />
              <span className="ml-2">Video Tutorials</span>
            </button>

            <button className="flex items-center w-full px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 rounded">
              <Mail className="w-4 h-4" />
              <span className="ml-2">Contact</span>
            </button>

            <button className="flex items-center w-full px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 rounded">
              <AlertCircle className="w-4 h-4" />
              <span className="ml-2">Report a Problem</span>
            </button>
            <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-70">
              <ScreenShareIcon className="w-4 h-4 inline-block mr-2" />
              Add Device
            </button>
            <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
              <FilePlus className="w-4 h-4 inline-block mr-2" />
              Upload Content
            </button>
            <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
              <CalendarPlus className="w-4 h-4 inline-block mr-2" />
              Schedule
            </button>
            <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700">
              <FolderPlus className="w-4 h-4 inline-block mr-2" />
              New Folder
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
