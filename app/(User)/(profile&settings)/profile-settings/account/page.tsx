"use client";

import { MoreVertical } from "lucide-react";

export default function Account() {
    return (
        <div className="space-y-8 border border-border bg-navbarBg  rounded-xl p-4 md:p-6">
            {/* Password Section */}
            <section>
                <h2 className="text-lg md:text-xl font-bold text-headings mb-6">Password</h2>
                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">text-lg md:text-xl font-bold text-headings
                        <label className="w-48 text-sm font-medium text-body">Old Password</label>
                        <input type="password" placeholder="***********" className="flex-1 px-4 py-2.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bgBlue/20" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-start gap-6 pb-6 border-b border-border">
                        <label className="w-48 text-sm font-medium text-body pt-2.5">New Password</label>
                        <div className="flex-1 space-y-2">
                            <input type="password" placeholder="***********" className="w-full px-4 py-2.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bgBlue/20" />
                            <p className="text-xs text-muted">Your Password must be more than 8 characters</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-48 text-sm font-medium text-body">Retype New Password</label>
                        <input type="password" placeholder="***********" className="flex-1 px-4 py-2.5 bg-input border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bgBlue/20" />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <button className="px-6 py-2.5 bg-White border border-border text-body font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-customShadow cursor-pointer">
                            Cancel
                        </button>
                        <button className="px-6 py-2.5 bg-bgBlue text-white font-medium rounded-lg hover:bg-blue-500 transition-colors shadow-customShadow cursor-pointer ">
                            Change Password
                        </button>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pt-6 border-t border-border">
                        <label className="w-48 text-sm font-medium text-body">Email</label>
                        <input type="email" defaultValue="jacob@tape.io" disabled className="flex-1 px-4 py-2.5 bg-input border border-border rounded-lg text-sm text-gray-500" />
                    </div>
                </div>
            </section>

            {/* Where you are logged in */}
            <section>
                <h2 className="text-lg md:text-xl font-bold text-headings mb-2">Where you are logged in</h2>
                <p className="text-sm text-muted mb-6">We will notify you via lawal@tape.io if there is any unusual activity on your account</p>

                <div className="space-y-6">
                    <div className="flex items-start justify-between pb-6 border-b border-border">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="font-semibold text-headings">2024 MacBook Pro 14</span>
                                <span className="px-2 py-0.5 bg-[#E6FFEF] text-[#008A2E] text-xs font-medium rounded-full flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-[#008A2E] rounded-full"></span> Active Now
                                </span>
                            </div>
                            <p className="text-xs text-muted">Melbourne, Australia • 22 Jan at 04:29 PM</p>
                        </div>
                        <button className="text-muted hover:text-body cursor-pointer">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex items-start justify-between pb-2">
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <span className="font-semibold text-headings">2024 MacBook Pro 14</span>
                            </div>
                            <p className="text-xs text-muted">Melbourne, Australia • 22 Jan at 04:29 PM</p>
                        </div>
                        <button className="text-muted hover:text-body cursor-pointer">
                            <MoreVertical className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Account Deletion */}
            <section>
                <h2 className="text-lg md:text-xl font-bold text-headings mb-6">Account Deletion</h2>

                <div className="bg-[#FFF1F2] dark:bg-red-900/10 border border-[#FECDD3] dark:border-red-900/30 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[#9F1239] dark:text-red-400 font-medium">
                        These actions cannot be undone. Please proceed with caution.
                    </p>
                    <button className="px-6 py-2.5 bg-[#F43F5E] text-white font-medium rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 shadow-customShadow cursor-pointer">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Account
                    </button>
                </div>
            </section>

        </div>
    );
}