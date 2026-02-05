"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";
import BaseSelect from "@/common/BaseSelect";
import profile from "../../../../../public/images/profile-settings.png";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/api/users/settings/personalApi";
import { useGetPreferencesQuery, useUpdatePreferencesMutation } from "@/redux/api/users/settings/preferencesApi";
import { toast } from "sonner";

export default function General() {
    const [mounted, setMounted] = useState(false);

    // Profile state
    const [fullName, setFullName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [username, setUsername] = useState("");
    const [designation, setDesignation] = useState("");

    // Preferences state
    const [theme, setTheme] = useState("LIGHT");
    const [language, setLanguage] = useState("en");
    const [timeFormat, setTimeFormat] = useState("H12");
    const [dateFormat, setDateFormat] = useState("DMY");
    const [emailNotification, setEmailNotification] = useState(true);
    const [pushNotification, setPushNotification] = useState(false);

    // API hooks
    const { data: profileData, isLoading: profileLoading } = useGetProfileQuery();
    const { data: preferencesData, isLoading: preferencesLoading } = useGetPreferencesQuery();
    const [updateProfile, { isLoading: updatingProfile }] = useUpdateProfileMutation();
    const [updatePreferences, { isLoading: updatingPreferences }] = useUpdatePreferencesMutation();

    // Set mounted state
    useEffect(() => {
        setMounted(true);
    }, []);

    // Initialize profile data
    useEffect(() => {
        if (profileData?.data) {
            setFullName(profileData.data.full_name || "");
            setImageUrl(profileData.data.image_url || "");
            setUsername(profileData.data.username || "");
            setDesignation(profileData.data.designation || "");
        }
    }, [profileData]);

    // Initialize preferences data
    useEffect(() => {
        if (preferencesData?.data) {
            setTheme(preferencesData.data.theme || "LIGHT");
            setLanguage(preferencesData.data.language || "en");
            setTimeFormat(preferencesData.data.timeFormat || "H12");
            setDateFormat(preferencesData.data.dateFormat || "DMY");
            setEmailNotification(preferencesData.data.emailNotification ?? true);
            setPushNotification(preferencesData.data.pushNotification ?? false);
        }
    }, [preferencesData]);

    const handleUpdateProfile = async () => {
        try {
            const result = await updateProfile({
                full_name: fullName,
                image_url: imageUrl,
                // username: username,
                // designation: designation,
            }).unwrap();

            if (result.success) {
                toast.success(result.message || "Profile updated successfully");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update profile");
        }
    };

    const handleUpdatePreferences = async () => {
        try {
            const result = await updatePreferences({
                theme: theme as "LIGHT" | "DARK",
                language,
                dateFormat: dateFormat as "DMY" | "MDY" | "YMD",
                timeFormat: timeFormat as "H12" | "H24",
                emailNotification,
                pushNotification,
            }).unwrap();

            if (result.success) {
                toast.success(result.message || "Preferences updated successfully");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to update preferences");
        }
    };

    const userInfo = profileData?.data;

    // Prevent hydration mismatch by showing loading state
    if (!mounted || profileLoading || preferencesLoading) {
        return (
            <div className="space-y-8 border border-border bg-navbarBg rounded-xl p-4 md:p-6">
                <div className="flex items-center justify-center py-12">
                    <div className="text-body">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 border border-border bg-navbarBg rounded-xl p-4 md:p-6">
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg md:text-xl font-bold text-headings">Personal Information</h2>
                    <button
                        onClick={handleUpdateProfile}
                        disabled={updatingProfile}
                        className="px-4 py-2 md:px-6 md:py-3 bg-bgBlue text-white text-sm font-medium rounded-lg hover:bg-blue-500 transition-colors shadow-customShadow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {updatingProfile ? "Saving..." : "Save Changes"}
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Profile Photo */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-full md:w-1/3 text-sm font-semibold text-body">Profile Photo</label>
                        <div className="flex items-center gap-6">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                                {imageUrl && imageUrl.startsWith('http') ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={imageUrl}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <Image
                                        src={imageUrl || profile}
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                    />
                                )}
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

                    {/* Image URL */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-full md:w-1/3 text-sm font-semibold text-body">Image URL</label>
                        <input
                            type="text"
                            placeholder="Enter image URL"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bgBlue bg-navbarBg text-body"
                        />
                    </div>

                    {/* Name */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-full md:w-1/3 text-sm font-semibold text-body">Full Name</label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-bgBlue bg-navbarBg text-body"
                        />
                    </div>

                    {/* Username/Email */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-full md:w-1/3 text-sm font-semibold text-body">Username</label>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            readOnly
                            className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none bg-navbarBg text-body opacity-70 cursor-not-allowed"
                        />
                    </div>

                    {/* Designation */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-full md:w-1/3 text-sm font-semibold text-body">Designation</label>
                        <input
                            type="text"
                            placeholder="Designation"
                            value={designation}
                            readOnly
                            className="flex-1 px-4 py-2.5 border border-border rounded-lg text-sm focus:outline-none bg-navbarBg text-body opacity-70 cursor-not-allowed"
                        />
                    </div>
                </div>
            </section>

            {/* Preferences Section */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg md:text-xl font-bold text-headings">Preferences</h2>
                    <button
                        onClick={handleUpdatePreferences}
                        disabled={updatingPreferences}
                        className="px-4 py-2 md:px-6 md:py-3 bg-bgBlue text-white text-sm font-medium rounded-lg hover:bg-blue-500 transition-colors shadow-customShadow cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {updatingPreferences ? "Saving..." : "Save Preferences"}
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Theme */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-full md:w-1/3 text-sm font-semibold text-body">Theme</label>
                        <div className="flex-1">
                            <BaseSelect
                                value={theme}
                                onChange={setTheme}
                                options={[
                                    { value: "LIGHT", label: "Light" },
                                    { value: "DARK", label: "Dark" }
                                ]}
                                placeholder="Select Theme"
                                showLabel={false}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Language */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-full md:w-1/3 text-sm font-semibold text-body">Language</label>
                        <div className="flex-1">
                            <BaseSelect
                                value={language}
                                onChange={setLanguage}
                                options={[
                                    { value: "en", label: "English" },
                                    { value: "es", label: "Spanish" },
                                    { value: "fr", label: "French" }
                                ]}
                                placeholder="Select Language"
                                showLabel={false}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Time format */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-full md:w-1/3 text-sm font-semibold text-body">Time format</label>
                        <div className="flex-1">
                            <BaseSelect
                                value={timeFormat}
                                onChange={setTimeFormat}
                                options={[
                                    { value: "H12", label: "12 Hour (AM/PM)" },
                                    { value: "H24", label: "24 Hour" }
                                ]}
                                placeholder="Select Time Format"
                                showLabel={false}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Date format */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-full md:w-1/3 text-sm font-semibold text-body">Date format</label>
                        <div className="flex-1">
                            <BaseSelect
                                value={dateFormat}
                                onChange={setDateFormat}
                                options={[
                                    { value: "DMY", label: "DD/MM/YYYY (15/01/2025)" },
                                    { value: "MDY", label: "MM/DD/YYYY (01/15/2025)" },
                                    { value: "YMD", label: "YYYY/MM/DD (2025/01/15)" }
                                ]}
                                placeholder="Select Date Format"
                                showLabel={false}
                                className="w-full"
                            />
                        </div>
                    </div>

                    {/* Email Notifications */}
                    {/* <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-full md:w-1/3 text-sm font-semibold text-body">Email Notifications</label>
                        <div className="flex-1">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={emailNotification}
                                    onChange={(e) => setEmailNotification(e.target.checked)}
                                    className="w-5 h-5 text-bgBlue border-border rounded focus:ring-bgBlue cursor-pointer"
                                />
                                <span className="text-sm text-body">Receive email notifications</span>
                            </label>
                        </div>
                    </div> */}

                    {/* Push Notifications */}
                    {/* <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-border">
                        <label className="w-full md:w-1/3 text-sm font-semibold text-body">Push Notifications</label>
                        <div className="flex-1">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={pushNotification}
                                    onChange={(e) => setPushNotification(e.target.checked)}
                                    className="w-5 h-5 text-bgBlue border-border rounded focus:ring-bgBlue cursor-pointer"
                                />
                                <span className="text-sm text-body">Receive push notifications</span>
                            </label>
                        </div>
                    </div> */}
                </div>
            </section>
        </div>
    );
}