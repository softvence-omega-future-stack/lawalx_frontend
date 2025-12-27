"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  HelpCircle,
  Moon,
  Sun,
  User,
  Menu,
  X,
  ChevronDown,
  ScreenShareIcon,
  FilePlus,
  CalendarPlus,
  FolderPlus,
  VideoIcon,
  UserRoundCogIcon,
  LogOutIcon,
  HelpCircleIcon,
  SettingsIcon,
  Monitor,
  Headphones,
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useTheme } from "next-themes"; // Import this

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/devices", label: "Devices" },
  { href: "/content", label: "Content" },
  { href: "/programs", label: "Programs" },
  { href: "/schedules", label: "Schedules" },
];

const notifications = [
  {
    id: 1,
    icon: Monitor,
    title: "New Device Added",
    description: 'Your "Office 1" device has been added to the server.',
    time: "1 hour ago",
  },
  {
    id: 2,
    icon: Bell,
    title: "Account Approved",
    description: "Your account has been approved. You can now access all features.",
    time: "1 hour ago",
  },
  {
    id: 3,
    icon: Bell,
    title: "Account Approved",
    description: "Your account has been approved. You can now access all features.",
    time: "1 hour ago",
  },
  {
    id: 4,
    icon: Bell,
    title: "Account Approved",
    description: "Your account has been approved. You can now access all features.",
    time: "1 hour ago",
  },
];

export default function UserDashboardNavbar() {
  const pathname = usePathname();
  const [helpOpen, setHelpOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [newOpen, setNewOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dark Mode Setup
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <header className="bg-navbarBg border-b border-border sticky top-0 z-50 max-w-[1920px] mx-auto transition-colors">
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
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative px-3 xl:px-3 ml-2 py-2 text-sm sm:text-base font-semibold transition-colors whitespace-nowrap group
                  ${isActive(item.href)
                    ? "text-bgBlue dark:text-blue-400 font-medium bg-blue-50 dark:bg-blue-900/20 w-fit rounded"
                    : "text-navGray dark:text-gray-400 hover:text-bgBlue dark:hover:text-blue-400"
                  }
                `}
              >
                {item.label}
                <span
                  className={`
                    absolute left-0 bottom-0 h-0.5 bg-bgBlue dark:bg-blue-400 transition-all duration-300 ease-in-out
                    ${isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                />
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
                setNotificationOpen(false);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400 hidden lg:inline">
                Help
              </span>
            </button>
            {helpOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setHelpOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg overflow-hidden z-40 p-2">
                  <Link href="/faqs">
                    <button className="flex items-center w-full px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 rounded border-b border-gray-200 dark:border-gray-700 cursor-pointer">
                      <HelpCircle className="w-4 h-4" />
                      <span className="ml-2">FAQs</span>
                    </button>
                  </Link>
                  <Link href="/video_tutorials">
                    <button className="flex items-center w-full px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 rounded border-b border-gray-200 dark:border-gray-700 cursor-pointer">
                      <VideoIcon className="w-4 h-4" />
                      <span className="ml-2">Video Tutorials</span>
                    </button>
                  </Link>
                  <Link href="/support">
                    <button className="flex items-center w-full px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 rounded border-b border-gray-200 dark:border-gray-700 cursor-pointer">
                      <Headphones className="w-4 h-4" />
                      <span className="ml-2">Support</span>
                    </button>
                  </Link>
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
                setNotificationOpen(false);
              }}
              className="px-3 lg:px-4 py-2 shadow-customShadow bg-bgBlue text-white rounded-lg hover:bg-blue-500 transition-colors flex items-center gap-1.5 text-sm font-medium cursor-pointer"
            >
              <span>New</span>
              <ChevronDown className="sm:pl-1 sm:border-l border-l-0 border-gray-300 w-4 h-4 hidden lg:inline" />
            </button>
            {newOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setNewOpen(false)} />
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg overflow-hidden z-40 p-2">
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
                    <ScreenShareIcon className="w-4 h-4 inline-block mr-2" />
                    Add Device
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 cursor-pointer">
                    <FilePlus className="w-4 h-4 inline-block mr-2" />
                    Upload Content
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700 cursor-pointer">
                    <CalendarPlus className="w-4 h-4 inline-block mr-2" />
                    Schedule
                  </button>
                  <button className="block w-full text-left px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                    <FolderPlus className="w-4 h-4 inline-block mr-2" />
                    New Folder
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => {
                setNotificationOpen(!notificationOpen);
                setHelpOpen(false);
                setProfileOpen(false);
                setNewOpen(false);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative cursor-pointer"
            >
              <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {notificationOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setNotificationOpen(false)} />
                <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-lg overflow-hidden z-40">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Notifications
                    </h3>
                    <button className="text-sm text-bgBlue dark:text-blue-400 hover:text-blue-500 font-medium">
                      Mark All Read
                    </button>
                  </div>
                  <div className="overflow-y-auto max-h-96">
                    {notifications.map((notification) => {
                      const IconComponent = notification.icon;
                      return (
                        <div
                          key={notification.id}
                          className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700 cursor-pointer transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              <IconComponent className="w-10 h-10 text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 rounded-full p-2" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                {notification.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                {notification.description}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-500">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="px-6 py-3 text-center border-t border-gray-200 dark:border-gray-700">
                    <button className="text-sm text-bgBlue dark:text-blue-400 hover:text-blue-500 font-medium">
                      View All
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Dark Mode Toggle - This is the working one */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-300 cursor-pointer group"
            aria-label="Toggle dark mode"
          >
            {!mounted ? (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            ) : theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-500 rotate-0 scale-100 transition-all duration-500 group-hover:rotate-12" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 rotate-0 scale-100 transition-all duration-500 group-hover:-rotate-12" />
            )}
          </button>
          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => {
                setProfileOpen(!profileOpen);
                setHelpOpen(false);
                setNewOpen(false);
                setNotificationOpen(false);
              }}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors cursor-pointer"
            >
              <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setProfileOpen(false)} />
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl overflow-hidden z-40">
                  <div className="px-6 py-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                        JD
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                          James David
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">James@gmail.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 py-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        My Plans
                      </p>
                      <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-xs font-semibold px-2 py-0.5 rounded-full">
                        Pro
                      </span>
                    </div>
                    <button className="mt-1 text-xs text-blue-600 dark:text-blue-400 hover:underline">
                      Manage Plans
                    </button>
                  </div>

                  <div className="px-4">
                    <div className="border-t border-gray-200 dark:border-gray-700" />
                  </div>

                  <div className="py-1 space-y-1">
                    <div className="px-4">
                      <Link href="/profile-settings/general" onClick={() => setMobileMenuOpen(false)} className="flex items-center w-full text-left py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 px-2">
                        <UserRoundCogIcon className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Link>
                    </div>
                    <div className="px-4">
                      <Link href="" className="flex items-center w-full text-left py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 px-2">
                        <SettingsIcon className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                    </div>
                    <div className="px-4">
                      <button className="flex items-center w-full text-left py-2 text-sm text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 px-2">
                        <HelpCircleIcon className="w-4 h-4 mr-2" />
                        Support
                      </button>
                    </div>
                  </div>

                  <div className="px-4">
                    <div className="border-t border-gray-200 dark:border-gray-700" />
                  </div>
                  <div className="px-4 py-1">
                    <button className="flex items-center w-full text-left py-2 text-sm text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 px-2">
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
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 max-h-[85vh] overflow-y-auto shadow-lg">
          <nav className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 text-sm rounded-md transition-colors ${isActive(item.href)
                  ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
              >
                {item.label}
              </Link>
            ))}

            <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

            {/* Create New Section */}
            <div className="px-4 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Create New</p>
              <button className="flex items-center w-full py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-bgBlue dark:hover:text-blue-400">
                <ScreenShareIcon className="w-4 h-4 mr-3" /> Add Device
              </button>
              <button className="flex items-center w-full py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-bgBlue dark:hover:text-blue-400">
                <FilePlus className="w-4 h-4 mr-3" /> Upload Content
              </button>
              <button className="flex items-center w-full py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-bgBlue dark:hover:text-blue-400">
                <CalendarPlus className="w-4 h-4 mr-3" /> Schedule
              </button>
              <button className="flex items-center w-full py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-bgBlue dark:hover:text-blue-400">
                <FolderPlus className="w-4 h-4 mr-3" /> New Folder
              </button>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

            {/* Notifications Section */}
            <div className="px-4 py-2">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Notifications</p>
                {notifications.length > 0 && (
                  <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{notifications.length}</span>
                )}
              </div>
              {notifications.slice(0, 2).map((notif) => (
                <div key={notif.id} className="py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{notif.title}</p>
                  <p className="text-xs text-gray-500 truncate">{notif.description}</p>
                </div>
              ))}
              <button className="w-full text-left text-xs text-bgBlue dark:text-blue-400 font-medium py-1 mt-1">View All Notifications</button>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

            {/* Help Section */}
            <div className="px-4 py-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Help & Support</p>
              <Link href="/faqs" onClick={() => setMobileMenuOpen(false)} className="flex items-center w-full py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-bgBlue dark:hover:text-blue-400">
                <HelpCircle className="w-4 h-4 mr-3" /> FAQs
              </Link>
              <Link href="/video_tutorials" onClick={() => setMobileMenuOpen(false)} className="flex items-center w-full py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-bgBlue dark:hover:text-blue-400">
                <VideoIcon className="w-4 h-4 mr-3" /> Video Tutorials
              </Link>
              <Link href="/support" onClick={() => setMobileMenuOpen(false)} className="flex items-center w-full py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-bgBlue dark:hover:text-blue-400">
                <Headphones className="w-4 h-4 mr-3" /> Support
              </Link>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

            {/* Profile & Settings & Theme */}
            <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg mx-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm font-medium">
                  JD
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">James David</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">James@gmail.com</p>
                </div>
              </div>

              <button
                onClick={toggleTheme}
                className="flex items-center w-full py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-bgBlue dark:hover:text-blue-400"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 mr-3" /> : <Moon className="w-4 h-4 mr-3" />}
                {theme === 'dark' ? "Light Mode" : "Dark Mode"}
              </button>

              <Link href="/profile-settings/account" onClick={() => setMobileMenuOpen(false)} className="flex items-center w-full py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-bgBlue dark:hover:text-blue-400">
                <UserRoundCogIcon className="w-4 h-4 mr-3" /> Edit Profile
              </Link>
              <Link href="/profile-settings/general" onClick={() => setMobileMenuOpen(false)} className="flex items-center w-full py-2 text-sm text-gray-600 dark:text-gray-300 hover:text-bgBlue dark:hover:text-blue-400">
                <SettingsIcon className="w-4 h-4 mr-3" /> Settings
              </Link>

              <div className="border-t border-gray-200 dark:border-gray-700 my-2" />

              <button className="flex items-center w-full py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-700 font-medium">
                <LogOutIcon className="w-4 h-4 mr-3" /> Sign Out
              </button>
            </div>

          </nav>
        </div>
      )}
    </header>
  );
}