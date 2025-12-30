"use client";

import React, { useState } from "react";
import { Search, Image as ImageIcon, Video, Music } from "lucide-react";
import BaseSelect from "@/common/BaseSelect";
import { mockContent, ContentItem } from "../../_data";
import { Input } from "@/components/ui/input";

interface Step2Props {
    data: {
        contentType: string;
        selectedContent: ContentItem | null;
    };
    onChange: (data: { contentType: string; selectedContent: ContentItem | null }) => void;
    onContentSelect: (content: ContentItem) => void;
}

const Step2ContentSelection: React.FC<Step2Props> = ({ data, onChange, onContentSelect }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const contentTypeOptions = [
        { label: "Image or Video", value: "image-video", icon: <Video className="w-4 h-4" /> },
        { label: "Audio", value: "audio", icon: <Music className="w-4 h-4" /> }
    ];

    // Filter content based on selected type and search query
    const filteredContent = mockContent.filter((item) => {
        const matchesType =
            data.contentType === "image-video"
                ? item.type === "image" || item.type === "video"
                : item.type === "audio";

        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());

        return matchesType && matchesSearch;
    });

    return (
        <div className="space-y-4">
            {/* Content Type Selector */}
            <BaseSelect
                label="Content Type"
                placeholder="Select content type"
                options={contentTypeOptions}
                value={data.contentType}
                onChange={(value) => onChange({ ...data, contentType: value, selectedContent: null })}
                required
            />

            {/* Search Field */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <Input
                    type="text"
                    placeholder="Search Content"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-input border-borderGray text-headings"
                />
            </div>

            {/* Content Grid */}
            <div className="max-h-[300px] overflow-y-auto pr-2 space-y-2">
                {filteredContent.length === 0 ? (
                    <div className="text-center py-8 text-muted">
                        No content found
                    </div>
                ) : (
                    filteredContent.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => onContentSelect(item)}
                            className="flex items-center gap-3 p-3 rounded-lg border border-borderGray bg-input hover:border-bgBlue hover:bg-blue-50 dark:hover:bg-blue-950/20 cursor-pointer transition-all group"
                        >
                            {/* Thumbnail or Icon */}
                            <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden flex-shrink-0">
                                {item.type === "audio" ? (
                                    <Music className="w-6 h-6 text-bgBlue" />
                                ) : item.type === "video" ? (
                                    item.thumbnail ? (
                                        <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <Video className="w-6 h-6 text-bgBlue" />
                                    )
                                ) : (
                                    item.thumbnail ? (
                                        <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <ImageIcon className="w-6 h-6 text-bgBlue" />
                                    )
                                )}
                            </div>

                            {/* Content Info */}
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-headings group-hover:text-bgBlue transition-colors truncate">
                                    {item.name}
                                </p>
                                <p className="text-sm text-muted">
                                    {item.size}
                                    {item.duration && ` • ${item.duration}`}
                                </p>
                            </div>

                            {/* Action Icon */}
                            <div className="w-8 h-8 rounded-full bg-bgBlue text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Step2ContentSelection;
