"use client";

import React from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import BaseSelect from "@/common/BaseSelect";
import profile from "../../../../../public/images/profile-settings.png";

export default function General() {
    const [region, setRegion] = React.useState("USA");
    const [timeZone, setTimeZone] = React.useState("Pacific Standard Time (PST)");
    const [theme, setTheme] = React.useState("System");
    const [language, setLanguage] = React.useState("English");
    const [timeFormat, setTimeFormat] = React.useState("12 Hour (AM/PM)");
    const [dateFormat, setDateFormat] = React.useState("MM/DD/YYYY (01/15/2025)");

    return (
        <div className="space-y-8 border border-border bg-navbarBg rounded-xl p-4 md:p-6">
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg md:text-xl font-bold text-headings">Personal Information</h2>
                    <button className="px-4 py-2 md:px-6 md:py-3 bg-bgBlue text-white text-sm font-medium rounded-lg hover:bg-blue-500 transition-colors shadow-customShadow cursor-pointer">
                        Edit
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Profile Photo */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-48 text-sm font-semibold text-body">Profile Photo</label>
                        <div className="flex items-center gap-6">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                                <Image
                                    src={profile}
                                    alt="Profile"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 border border-border bg-navbarBg rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer">
                                <div className="w-8 h-8 mb-2 bg-navbarBg rounded-lg flex items-center justify-center border border-border">
                                    <Upload className="w-4 h-4 text-gray-500" />
                                </div>
                                <p className="text-sm">
                                    <span className="text-bgBlue font-medium">Click to Upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-muted mt-1">SVG, PNG, or JPG (Max 800 x 800px)</p>
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-48 text-sm font-medium text-body">Name</label>
                        <div className="flex-1 flex gap-4">
                            <input type="text" placeholder="First Name" className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bgBlue/20 bg-input" />
                            <input type="text" placeholder="Last Name" className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bgBlue/20 bg-input" />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-48 text-sm font-medium text-body">Email</label>
                        <input type="email" placeholder="Email" className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bgBlue/20 bg-input" />
                    </div>

                    {/* Designation */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-48 text-sm font-medium text-body">Designation</label>
                        <input type="text" placeholder="Designation" className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bgBlue/20 bg-input" />
                    </div>

                    {/* Region */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-48 text-sm font-medium text-body">Region</label>
                        <div className="flex-1">
                            <BaseSelect
                                value={region}
                                onChange={setRegion}
                                options={[{ value: "USA", label: "USA" }, { value: "UK", label: "UK" }, { value: "Canada", label: "Canada" }]}
                                placeholder="Select Region"
                                showLabel={false}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Time Zone */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-48 text-sm font-medium text-body">Time Zone</label>
                        <div className="flex-1">
                            <BaseSelect
                                value={timeZone}
                                onChange={setTimeZone}
                                options={[
                                    { value: "Pacific Standard Time (PST)", label: "Pacific Standard Time (PST) UTC-08:00" },
                                    { value: "Eastern Standard Time (EST)", label: "Eastern Standard Time (EST) UTC-05:00" }
                                ]}
                                placeholder="Select Time Zone"
                                showLabel={false}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Preferences Section */}
            <section>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Preferences</h2>

                <div className="space-y-6">
                    {/* Language */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-48 text-sm font-medium text-body">Language</label>
                        <div className="flex-1">
                            <BaseSelect
                                value={language}
                                onChange={setLanguage}
                                options={[{ value: "English", label: "English" }, { value: "Spanish", label: "Spanish" }, { value: "French", label: "French" }]}
                                placeholder="Select Language"
                                showLabel={false}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Time format */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-48 text-sm font-medium text-body">Time format</label>
                        <div className="flex-1">
                            <BaseSelect
                                value={timeFormat}
                                onChange={setTimeFormat}
                                options={[{ value: "12 Hour (AM/PM)", label: "12 Hour (AM/PM)" }, { value: "24 Hour", label: "24 Hour" }]}
                                placeholder="Select Time Format"
                                showLabel={false}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Date format */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-48 text-sm font-medium text-body">Date format</label>
                        <div className="flex-1">
                            <BaseSelect
                                value={dateFormat}
                                onChange={setDateFormat}
                                options={[{ value: "MM/DD/YYYY (01/15/2025)", label: "MM/DD/YYYY (01/15/2025)" }, { value: "DD/MM/YYYY (15/01/2025)", label: "DD/MM/YYYY (15/01/2025)" }]}
                                placeholder="Select Date Format"
                                showLabel={false}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}