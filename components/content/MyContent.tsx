"use client";

import { useState, useRef, useEffect } from "react";
import {
    CloudUpload,
    Grid2X2,
    List,
    Plus,
    Search,
    FolderPlus,
    ListMusic,
    ChevronDown,
} from "lucide-react";
import ContentButton from "@/common/ContentButton";
import DashboardHeading from "@/common/DashboardHeading";
import BaseSelect from "@/common/BaseSelect";
import ContentGrid from "./ContentGrid";
import EmptyState from "./EmptyState";
import CreateFolderDialog from "./CreateFolderDialog";

// ============================================
// TYPES
// ============================================
export interface SelectOption {
    label: string;
    value: string;
    icon?: React.ReactNode;
}

export interface ContentItem {
    id: string;
    title: string;
    type: "folder" | "playlist" | "video" | "image";
    size: string;
    duration?: string;
    fileCount?: number;
    thumbnail?: string;
    assignedTo?: string[];
    children?: ContentItem[];
}

// ============================================
// OPTIONS & MOCK DATA
// ============================================
export const createNew: SelectOption[] = [
    { label: "New Folder", value: "new-folder", icon: <FolderPlus size={22} /> },
    { label: "New Playlist", value: "new-playlist", icon: <ListMusic size={22} /> },
];

export const sortByName: SelectOption[] = [
    { label: "A-Z", value: "a-z" },
    { label: "Z-A", value: "z-a" },
];

export const allContent: SelectOption[] = [
    { label: "All Content", value: "all-content" },
    { label: "Folders", value: "folders" },
    { label: "Playlists", value: "playlists" },
    { label: "Files", value: "files" },
];

export const mockContentData: ContentItem[] = [
    {
        id: "1",
        title: "Company Update Q3",
        type: "folder",
        size: "45 MB",
        fileCount: 2,
        assignedTo: ["Main Lobby Display", "Main Gate Entry"],
        children: [
            {
                id: "1-1",
                title: "Intro Video",
                type: "video",
                size: "25 MB",
                duration: "90 sec",
                thumbnail:
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
            },
            {
                id: "1-2",
                title: "Report Image",
                type: "image",
                size: "15 MB",
                thumbnail:
                    "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=400&h=300&fit=crop",
            },
        ],
    },
    {
        id: "2",
        title: "Video",
        type: "video",
        size: "45 MB",
        duration: "120 sec",
        thumbnail:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    },
    {
        id: "3",
        title: "Background Music",
        type: "playlist",
        size: "12 Items",
        duration: "120 sec",
        assignedTo: ["Main Lobby Display", "Main Gate Entry"],
    },
    {
        id: "4",
        title: "Playlist 1",
        type: "folder",
        size: "120 MB",
        fileCount: 24,
        children: [
            {
                id: "1-1",
                title: "Intro Video",
                type: "video",
                size: "25 MB",
                duration: "90 sec",
                thumbnail:
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
            },
            {
                id: "1-2",
                title: "Report Image",
                type: "image",
                size: "15 MB",
                thumbnail:
                    "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=400&h=300&fit=crop",
            },
        ],
    },
    {
        id: "5",
        title: "Image",
        type: "image",
        size: "45 MB",
        thumbnail:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        assignedTo: ["Main Lobby Display", "Main Gate Entry"],
    },
    {
        id: "6",
        title: "Marketing Assets",
        type: "playlist",
        size: "45 MB",
        duration: "120 sec",
        assignedTo: ["Main Lobby Display", "Main Gate Entry"],
    },
    {
        id: "7",
        title: "Tutorial Video",
        type: "video",
        size: "45 MB",
        duration: "120 sec",
        thumbnail:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        assignedTo: ["Main Lobby Display", "Main Gate Entry"],
    },
    {
        id: "8",
        title: "Background Image",
        type: "video",
        size: "45 MB",
        duration: "120 sec",
        thumbnail:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    },
];


// ============================================
// COMPONENT
// ============================================
const MyContent = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [createOption, setCreateOption] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [contentFilter, setContentFilter] = useState("all-content");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    // ✅ Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Filter & Sort logic
    const filteredContent = mockContentData
        .filter((item) => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
            let matchesType = true;
            if (contentFilter === "folders") matchesType = item.type === "folder";
            else if (contentFilter === "playlists") matchesType = item.type === "playlist";
            else if (contentFilter === "files")
                matchesType = item.type === "video" || item.type === "image";
            return matchesSearch && matchesType;
        })
        .sort((a, b) => {
            if (sortOption === "a-z") return a.title.localeCompare(b.title);
            if (sortOption === "z-a") return b.title.localeCompare(a.title);
            return 0;
        });

    // Handlers
    const handleItemSelect = (id: string) => console.log("Item selected:", id);
    const handleItemMenuClick = (id: string) => console.log("Menu clicked for:", id);
    const handleAssignClick = (id: string) => console.log("Assign clicked for:", id);

    const handleCreateChange = (value: string) => {
        setCreateOption(value);
        setDropdownOpen(false);
        if (value === "new-folder") setOpen(true);
    };

    return (
        <div className="mt-6 md:mt-10 space-y-6 md:space-y-8">
            {/* Header */}
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3 mb-6">
                <DashboardHeading title="My Content" />

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
                    <div className="w-full sm:w-[200px]">
                        <ContentButton title="Upload Content" icon={CloudUpload} />
                    </div>

                    {/* Custom Dropdown */}
                    <div className="relative w-full sm:w-[200px]" ref={dropdownRef}>
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="w-full flex items-center justify-between bg-white border border-bgBlue rounded-xl px-6 py-3 text-gray-800 focus:ring-2 focus:ring-bgBlue transition cursor-pointer font-semibold text-sm md:text-base"
                        >
                            <span className="flex items-center gap-2">
                                <Plus className="w-5 h-5 text-black font-semibold" />
                                {createOption
                                    ? createNew.find((o) => o.value === createOption)?.label
                                    : "Create New"}
                            </span>
                            <ChevronDown
                                className={`w-5 h-5 text-black transition-transform duration-200 font-semibold ${dropdownOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {dropdownOpen && (
                            <div className="absolute z-10 mt-2 w-full bg-white border-2 border-bgBlue rounded-xl shadow-lg overflow-hidden">
                                {createNew.map((option) => (
                                    <button
                                        key={option.value}
                                        onClick={() => handleCreateChange(option.value)}
                                        className="w-full text-left px-4 py-2 hover:bg-bgBlue/10 text-gray-800 text-sm md:text-base cursor-pointer"
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Search + Filter Bar */}
            <div className="bg-white border border-borderGray rounded-xl p-4 w-full">
                <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search Device"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 md:py-3 bg-bgGray border border-borderGray rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
                        />
                    </div>

                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
                        <div className="w-full sm:w-[155px]">
                            <BaseSelect
                                value={sortOption}
                                onChange={setSortOption}
                                options={sortByName}
                                placeholder="Sort by name"
                                showLabel={false}
                            />
                        </div>

                        <div className="w-full sm:w-[155px]">
                            <BaseSelect
                                value={contentFilter}
                                onChange={setContentFilter}
                                options={allContent}
                                placeholder="All Content"
                                showLabel={false}
                            />
                        </div>

                        <div className="w-[100px] flex items-center bg-bgGray p-1.5 rounded-lg">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`flex-1 flex items-center justify-center p-2 rounded-md transition cursor-pointer ${viewMode === "grid" ? "bg-white" : ""
                                    }`}
                            >
                                <Grid2X2
                                    className={`w-5 h-5 ${viewMode === "grid" ? "text-bgBlue" : "text-textGray"
                                        }`}
                                />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`flex-1 flex items-center justify-center p-2 rounded-md transition cursor-pointer ${viewMode === "list" ? "bg-white" : ""
                                    }`}
                            >
                                <List
                                    className={`w-5 h-5 ${viewMode === "list" ? "text-bgBlue" : "text-textGray"
                                        }`}
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* All Content Title */}
            <h2 className="text-lg md:text-2xl font-semibold text-gray-900">
                All Content ({filteredContent.length})
            </h2>

            {/* Content Display */}
            {filteredContent.length === 0 ? (
                <EmptyState contentFilter={contentFilter} searchQuery={searchQuery} />
            ) : (
                <ContentGrid
                    items={filteredContent}
                    viewMode={viewMode}
                    onItemSelect={handleItemSelect}
                    onItemMenuClick={handleItemMenuClick}
                    onAssignClick={handleAssignClick}
                />
            )}

            {open && <CreateFolderDialog open={open} setOpen={setOpen} />}
        </div>
    );
};

export default MyContent;
