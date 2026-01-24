'use client';

import AdminNavbar from "@/components/Admin/layout/AdminNavbar";
import SidebarComponent from "@/components/sidebar/SidebarComponent";
import { User, Shield, UserCog, Settings } from 'lucide-react';
import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@/components/Admin/layout/ThemeProvider";
import ProtectedRoute from "@/components/ProtectedRoute";

const customItems = [
    {
        icon: <User className="w-5 h-5" />,
        label: 'Profile',
        href: '/admin/profile-settings/profile',
    },
    {
        icon: <Shield className="w-5 h-5" />,
        label: 'Preferences',
        href: '/admin/profile-settings/preferences',
    },
    {
        icon: <Shield className="w-5 h-5" />,
        label: 'Password Security',
        href: '/admin/profile-settings/password-security',
    },
    {
        icon: <UserCog className="w-5 h-5" />,
        label: 'Users & Roles',
        href: '/admin/profile-settings/users-roles',
    },
    {
        icon: <Settings className="w-5 h-5" />,
        label: 'System',
        href: '/admin/profile-settings/system',
    },
];

// app/dashboard/content/layout.tsx

export default function ContentLayout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsCollapsed(true);
            }
        };

        // Set initial state
        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <ThemeProvider>
            <ProtectedRoute allowedRoles={['ADMIN', 'SUPERADMIN', 'SUPER_ADMIN']}>
                <div className="bg-White min-h-screen">
                    <AdminNavbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

                    <div className="flex pt-16">
                        <SidebarComponent items={customItems} isCollapsed={isCollapsed} />

                        {/* Main content - push right on desktop */}
                        <main className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'} p-4 md:p-6`}>
                            {children}
                        </main>
                    </div>
                </div>
            </ProtectedRoute>
        </ThemeProvider>
    );
}

