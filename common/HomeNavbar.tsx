"use client";

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import CommonWrapper from './CommonWrapper';

// Navbar Component
const HomeNavbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
            <CommonWrapper>
                <div className="mx-auto">
                    <div className="flex justify-between items-center py-2">
                        <div className="">
                            <h1 className="text-[56px] font-bold text-[#0FA6FF]">tape</h1>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition">Enterprise</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition">Docs</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition">Pricing</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition">Contact</a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 transition">Dashboard</a>
                            <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-400 to-green-600"></div>
                        </div>

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </CommonWrapper>

            {mobileMenuOpen && (
                <div className="md:hidden fixed inset-0 top-16 bg-white z-40 border-t border-gray-200">
                    <CommonWrapper>
                        <div className="py-6 space-y-4">
                            <a href="#" className="block py-3 text-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 rounded-lg transition">
                                Enterprise
                            </a>
                            <a href="#" className="block py-3 text-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 rounded-lg transition">
                                Docs
                            </a>
                            <a href="#" className="block py-3 text-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 rounded-lg transition">
                                Pricing
                            </a>
                            <a href="#" className="block py-3 text-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 rounded-lg transition">
                                Contact
                            </a>
                            <a href="#" className="block py-3 text-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-4 rounded-lg transition">
                                Dashboard
                            </a>
                            <div className="flex items-center space-x-3 py-3 px-4">
                                <div className="w-10 h-10 rounded-full bg-linear-to-br from-green-400 to-green-600"></div>
                                <span className="text-gray-600">Profile</span>
                            </div>
                        </div>
                    </CommonWrapper>
                </div>
            )}
        </nav>
    );
};

export default HomeNavbar;