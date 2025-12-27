'use client';

import { useState } from 'react';
import { Eye, EyeClosed } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In real app: validate credentials here
    router.push('/admin/verify-admin');
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Main Card */}
          <div className="bg-white rounded-lg shadow-customShadow overflow-hidden">
            {/* Blue Toggle at Top */}
            <div className="bg-bgBlue p-4 w-fit mt-6 rounded-full text-center mx-auto shadow-customShadow">
                <Image src="/admin/navbar/adminlogo.svg" alt="Logo" width={28} height={28} className="mx-auto" />
            </div>

            {/* Content */}
            <div className="px-10 pt-8 pb-10">
              <h1 className="text-2xl font-bold text-center text-gray-900">
                Tape Admin Portal
              </h1>
              <p className="text-center text-sm text-gray-600 mt-2">
                Sign in to access the admin dashboard
              </p>

              <form onSubmit={handleLogin} className="mt-8 space-y-6">
                {/* Email Field */}
                <div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email address"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeClosed className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-bgBlue hover:bg-blue-500 text-white font-medium py-3.5 rounded-lg transition transform hover:scale-[1.02] active:scale-[0.98] shadow-customShadow"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}