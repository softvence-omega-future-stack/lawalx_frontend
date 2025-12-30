'use client';

import { Moon, Bell, Sun } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';
import Link from 'next/link';

interface AdminNavbarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

export default function AdminNavbar({ isCollapsed, setIsCollapsed }: AdminNavbarProps) {
  const { isDark, setIsDark } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-navbarBg border-b border-border z-30">
      <div className="h-full px-3 sm:px-4 flex items-center justify-between">
        {/* LEFT SIDE */}
        <div className="flex items-center gap-4 sm:gap-6">




          {/* Mobile-only minimal logo when logo text is hidden */}
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg items-center justify-center shadow-customShadow hidden sm:flex">
              <Image src="/admin/navbar/adminlogo.svg" alt="Logo" width={18} height={18} />
            </div>
            <div className="ml-3 flex flex-col">
              <h1 className="text-base font-semibold text-gray-900 dark:text-white leading-none">Tape Admin</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin Portal</p>
            </div>
          </Link>
          {/* Hamburger Menu – Always visible, moves left on tiny screens */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
            aria-label="Toggle sidebar"
          >
            <Image src="/admin/navbar/navbarmenu.svg" alt="Menu" width={22} height={22} className="w-5 h-5 sm:w-[22px] sm:h-[22px]" />
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Notifications */}
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg relative transition-colors">
            <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-navbarBg"></span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-900" />
            )}
          </button>

          {/* User Avatar */}
          <div className="hidden xs:flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
            <Link href="/admin/profile-settings/profile" className="rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
              <Image src="/images/profile-settings.png" alt="Logo" width={40} height={40} />
            </Link>
          </div>

          {/* Mobile: Only avatar (no border on mobile) */}
          <div className="xs:hidden">
            <Link href="/admin/profile-settings/profile" className="rounded-full flex items-center justify-center text-white text-sm font-semibold">
              <Image src="/images/profile-settings.png" alt="Logo" width={40} height={40} />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}   