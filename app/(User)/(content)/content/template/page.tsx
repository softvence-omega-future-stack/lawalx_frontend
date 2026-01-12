"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";
import DashboardHeading from "@/common/DashboardHeading";
import TemplateCard from "@/components/content/TemplateCard";

// Template data - using video content
const mockTemplateData = [
    {
        id: "t1",
        title: "Company Update Q3",
        type: "video" as const,
        resolution: "1920 x 1080",
        duration: "120 sec",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        video: "/detailsVideo.mp4",
        assignedTo: ["Main Lobby Display", "Main Gate Entry"],
    },
    {
        id: "t2",
        title: "Company Update Q3",
        type: "video" as const,
        resolution: "1920 x 1080",
        duration: "120 sec",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        video: "/detailsVideo.mp4",
        assignedTo: ["Main Lobby Display", "Main Gate Entry"],
    },
    {
        id: "t3",
        title: "Company Update Q3",
        type: "video" as const,
        resolution: "1920 x 1080",
        duration: "120 sec",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        video: "/detailsVideo.mp4",
        assignedTo: ["Main Lobby Display", "Main Gate Entry"],
    },
];

const TemplateContent = () => {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter templates based on search
    const filteredTemplates = mockTemplateData.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <DashboardHeading title="My Templates" />
                    <p className="text-sm text-textGray mt-1">Upload, create and manage your content</p>
                </div>

                <button className="bg-bgBlue hover:bg-blue-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg flex items-center gap-2 text-sm md:text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out w-full sm:w-auto justify-center shadow-customShadow">
                    <Plus className="w-5 h-5" /> Create Content
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                    type="text"
                    placeholder="Search Device"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-bgBlue focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
            </div>

            {/* Template Grid */}
            {filteredTemplates.length === 0 ? (
                <div className="text-center py-12 bg-navbarBg border border-border rounded-xl">
                    <p className="text-textGray">No templates found matching your search.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((item) => (
                        <TemplateCard key={item.id} item={item} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TemplateContent;
