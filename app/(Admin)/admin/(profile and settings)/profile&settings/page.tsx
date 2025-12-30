// 'use client';

// import React, { useState } from 'react';
// import { ChevronLeft, User, Settings, Lock, Users, Server } from 'lucide-react';
// import Link from 'next/link';
// import ProfileSection from '../_components/ProfileSection';
// import PreferencesSection from '../_components/PreferencesSection';
// import SecuritySection from '../_components/SecuritySection';
// import UsersRolesSection from '../_components/UsersRolesSection';
// import SystemSection from '../_components/SystemSection';
// // import ProfileSection from './_components/ProfileSection';
// // import PreferencesSection from './_components/PreferencesSection';
// // import SecuritySection from './_components/SecuritySection';
// // import UsersRolesSection from './_components/UsersRolesSection';
// // import SystemSection from './_components/SystemSection';

// type SettingsSection = 'profile' | 'preferences' | 'security' | 'users' | 'system';

// export default function ProfileSettingsPage() {
//     const [activeSection, setActiveSection] = useState<SettingsSection>('profile');

//     const menuItems = [
//         { id: 'profile' as SettingsSection, label: 'Profile', icon: User, description: 'Manage your personal info' },
//         { id: 'preferences' as SettingsSection, label: 'Preferences', icon: Settings, description: 'UI and display settings' },
//         { id: 'security' as SettingsSection, label: 'Passwords & Security', icon: Lock, description: 'Secure your account' },
//         { id: 'users' as SettingsSection, label: 'Users & Roles', icon: Users, description: 'Team management' },
//         { id: 'system' as SettingsSection, label: 'System', icon: Server, description: 'Server information' },
//     ];

//     return (
//         <div className="pb-12">
//             {/* Page Header */}
//             <div className="mb-8 flex items-center gap-4">
//                 <Link
//                     href="/admin/dashboard"
//                     className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
//                 >
//                     <ChevronLeft className="w-5 h-5 text-muted" />
//                 </Link>
//                 <div>
//                     <h1 className="text-2xl font-bold text-headings">Settings</h1>
//                     <p className="text-sm text-body">Manage your account settings and system preferences</p>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start text-headings">
//                 {/* Left Nav */}
//                 <div className="bg-navbarBg border border-border rounded-xl p-2 sticky top-24 shadow-sm">
//                     <nav className="space-y-1">
//                         {menuItems.map((item) => (
//                             <button
//                                 key={item.id}
//                                 onClick={() => setActiveSection(item.id)}
//                                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer group ${activeSection === item.id
//                                         ? 'bg-blue-50 dark:bg-blue-900/20 text-bgBlue shadow-sm'
//                                         : 'text-muted hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-headings'
//                                     }`}
//                             >
//                                 <item.icon className={`w-5 h-5 ${activeSection === item.id ? 'text-bgBlue' : 'text-muted group-hover:text-headings'}`} />
//                                 <span className="text-sm font-semibold">{item.label}</span>
//                             </button>
//                         ))}
//                     </nav>
//                 </div>

//                 {/* Right Content */}
//                 <div className="min-h-[600px] animate-in fade-in slide-in-from-bottom-2 duration-300">
//                     {activeSection === 'profile' && <ProfileSection />}
//                     {activeSection === 'preferences' && <PreferencesSection />}
//                     {activeSection === 'security' && <SecuritySection />}
//                     {activeSection === 'users' && <UsersRolesSection />}
//                     {activeSection === 'system' && <SystemSection />}
//                 </div>
//             </div>
//         </div>
//     );
// }
