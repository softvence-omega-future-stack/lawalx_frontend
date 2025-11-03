"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LandingNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="w-full border-b bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          DigitalSignage
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`${
              pathname === "/" ? "text-blue-600 font-medium" : "text-gray-700"
            } hover:text-blue-600`}
          >
            Home
          </Link>
          <Link
            href="/auth/signin"
            className={`${
              pathname.startsWith("/auth/signin")
                ? "text-blue-600 font-medium"
                : "text-gray-700"
            } hover:text-blue-600`}
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className={`${
              pathname.startsWith("/auth/signup")
                ? "text-blue-600 font-medium"
                : "text-gray-700"
            } hover:text-blue-600`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
