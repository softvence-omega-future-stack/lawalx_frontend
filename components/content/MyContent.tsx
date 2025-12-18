"use client";

import { useState } from "react";
import {
  CloudUpload,
  Grid2X2,
  List,
  Plus,
  Search,
  FolderPlus,
  ListMusic,
} from "lucide-react";

import DashboardHeading from "@/common/DashboardHeading";
import BaseSelect from "@/common/BaseSelect";
import ContentGrid from "./ContentGrid";
import EmptyState from "./EmptyState";
import CreateFolderDialog from "./CreateFolderDialog";
import ActionButton from "../ActionButton";
import BlueSelect from "@/common/BlueSelect";

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
  video?: string;
  audio?: string;
  uploadedDate?: string;
  fileExtension?: string;
  updatedAt?: string;
  assignedDevices?: string[];
  assignedPlaylists?: string[];
  schedules?: string[];
  assignedTo?: string[];
  children?: ContentItem[];
}

// ============================================
// OPTIONS
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
  // ---- Folder with nested videos & playlists ----
  {
    id: "f1",
    title: "Company Update Q3",
    type: "folder",
    size: "45 MB",
    fileCount: 3,
    assignedTo: ["Main Lobby Display", "Main Gate Entry"],
    uploadedDate: "3 days ago",
    updatedAt: "2 days ago",
    children: [
      {
        id: "f1-1",
        title: "Intro Video - Q3",
        type: "video",
        size: "25 MB",
        duration: "1:30",
        thumbnail:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        video: "./detailsVideo.mp4",
        updatedAt: "2 days ago",
      },
      {
        id: "f1-2",
        title: "Q3 Report Graphics",
        type: "image",
        size: "8 MB",
        thumbnail:
          "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=400&h=300&fit=crop",
        updatedAt: "1 day ago",
      },
      {
        id: "f1-3",
        title: "Background Music Pack",
        type: "playlist",
        audio: "./audio.mp3",
        size: "8 Items",
        duration: "12:00",
        updatedAt: "5 days ago",
      },
    ],
  },

  // ---- Top-level videos ----
  {
    id: "v1",
    title: "Tutorial - How to Use Dashboard",
    type: "video",
    size: "50 MB",
    duration: "4:20",
    thumbnail:
      "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=400&h=300&fit=crop",
    video: "./detailsVideo.mp4",
    assignedTo: ["Training Room Screen"],
    uploadedDate: "4 days ago",
    updatedAt: "3 days ago",
  },
  {
    id: "v2",
    title: "Product Demo",
    type: "video",
    size: "120 MB",
    duration: "6:10",
    thumbnail:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop",
    video: "./iceVideo.mp4",
    uploadedDate: "1 week ago",
    updatedAt: "4 days ago",
  },

  // ---- Top-level playlists (music) ----
  {
    id: "p1",
    title: "Office Ambient Mix",
    type: "playlist",
    size: "20 Items",
    duration: "1:20:00",
    audio: "./audio.mp3",
    assignedTo: ["Main Lobby Display"],
    uploadedDate: "1 week ago",
    updatedAt: "5 days ago",
  },
  {
    id: "p2",
    title: "Marketing Assets - Audio",
    type: "playlist",
    size: "10 Items",
    duration: "35:00",
    audio: "./audio.mp3",
    uploadedDate: "5 days ago",
    assignedTo: ["Main Gate Entry"],
    updatedAt: "4 days ago",
  },

  // ---- Another folder with nested playlist + video ----
  {
    id: "f2",
    title: "Campaign Assets",
    type: "folder",
    size: "220 MB",
    fileCount: 4,
    uploadedDate: "2 days ago",
    updatedAt: "1 day ago",
    assignedTo: ["Marketing Screen"],
    children: [
      {
        id: "f2-1",
        title: "Campaign Teaser",
        type: "video",
        size: "80 MB",
        duration: "0:45",
        thumbnail:
          "https://images.unsplash.com/photo-1508873699372-7ae3e3b6b6f6?w=400&h=300&fit=crop",
        video: "./campaign-teaser.mp4",
        updatedAt: "1 day ago",
      },
      {
        id: "f2-2",
        title: "Ad Jingles",
        type: "playlist",
        size: "6 Items",
        audio: "./audio.mp3",
        duration: "4:00",
        updatedAt: "2 days ago",
      },
      {
        id: "f2-3",
        title: "Campaign Poster",
        type: "image",
        size: "3 MB",
        thumbnail:
          "https://images.unsplash.com/photo-1490685451225-4b4b8f0f2c9f?w=400&h=300&fit=crop",
        updatedAt: "3 days ago",
      },
    ],
  },

  // ---- Single image item (top-level) ----
  {
    id: "img1",
    title: "Office Background Image",
    type: "image",
    size: "12 MB",
    thumbnail:
      "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=400&h=300&fit=crop",
    assignedTo: ["Main Lobby Display", "Reception Screen"],
    uploadedDate: "6 days ago",
    updatedAt: "5 days ago",
  },

  // ---- Short demo video ----
  {
    id: "v3",
    title: "Welcome Loop",
    type: "video",
    size: "30 MB",
    duration: "0:30",
    thumbnail:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop",
    video: "./detailsVideo.mp4",
    uploadedDate: "5 days ago",
    updatedAt: "4 days ago",
  },

  // ---- Another playlist ----
  {
    id: "p3",
    title: "Event BGM Collection",
    type: "playlist",
    size: "15 Items",
    duration: "45:00",
    audio: "./audio.mp3",
    assignedTo: ["Event Hall Screen"],
    uploadedDate: "3 days ago",
    updatedAt: "2 days ago",
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

  // FILTER + SORT
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

  // HANDLERS
  const handleItemSelect = (id: string) => console.log("Selected:", id);
  const handleItemMenuClick = (id: string) => console.log("Menu clicked:", id);
  const handleAssignClick = (id: string) => console.log("Assign:", id);

  const handleCreateChange = (value: string) => {
    setCreateOption(value);

    if (value === "new-folder") {
      setOpen(true);
    }
  };

  return (
   <div className="mt-6 md:mt-10 space-y-6 md:space-y-8">
      {/* Header */}
      <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-3 mb-6">
        <DashboardHeading title="My Content" />

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
          {/* UPLOAD BUTTON */}
          <div className="w-full sm:w-[200px]">
            <ActionButton
              title="Upload Content"
              icon={<CloudUpload className="w-5 h-5" />}
              bgColor="#0FA6FF"
              hoverColor="#00A4FF"
            />
          </div>

          {/* Blue Select — Create New */}
          <div className="w-full sm:w-[200px]">
            <BlueSelect
              value={createOption}
              onChange={handleCreateChange}
              options={createNew}
              placeholder="Create New"
              placeholderIcon={<Plus className="w-5 h-5 text-black font-bold" />}
              showLabel={false}
            />
          </div>
        </div>
      </div>

      {/* Search + Filters */}
      <div className="bg-navbarBg border border-border rounded-xl p-4 w-full">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Device"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 md:py-3 bg-bgGray dark:bg-gray-800 border border-borderGray dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          {/* Sorting & Filters */}
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
                icon={<Plus size={18} />}
                showLabel={false}
              />
            </div>

            {/* GRID / LIST */}
            <div className="w-[100px] flex items-center bg-bgGray dark:bg-gray-800 p-1.5 rounded-lg">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex-1 flex items-center justify-center p-2 rounded-md transition ${viewMode === "grid" ? "bg-white dark:bg-gray-700" : ""}`}
              >
                <Grid2X2
                  className={`w-5 h-5 ${viewMode === "grid" ? "text-bgBlue" : "text-textGray dark:text-gray-400"}`}
                />
              </button>

              <button
                onClick={() => setViewMode("list")}
                className={`flex-1 flex items-center justify-center p-2 rounded-md transition ${viewMode === "list" ? "bg-white dark:bg-gray-700" : ""}`}
              >
                <List
                  className={`w-5 h-5 ${viewMode === "list" ? "text-bgBlue" : "text-textGray dark:text-gray-400"}`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Count */}
      <h2 className="text-lg md:text-2xl font-semibold text-Heading dark:text-white">
        All Content ({filteredContent.length})
      </h2>

      {/* CONTENT GRID */}
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
