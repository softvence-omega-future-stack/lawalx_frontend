"use client";

import AddButton from "@/common/AddButton";
import BaseSelect from "@/common/BaseSelect";
import DashboardHeading from "@/common/DashboardHeading";
import { Monitor, ScreenShare, Search } from "lucide-react";
import { useState } from "react";
import ScreenCard from "./components/screenComponent/ScreenCard";
import screen from "@/public/images/screen.png";


export type SortOption = {
  value: string;
  label: string;
}

export type ScreenData = {
  id: number;
  title: string;
  description: string;
  image?: string;
  status: "active" | "inactive";
  assignedContent: string;
  devices: number;
  lastUpdated: string;
  video?: string
}

const MyScreensPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<string>("all");

  const sortOptions: SortOption[] = [
    { value: "all", label: "All" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "recent", label: "Recently Added" },
  ];

  const mockScreens: ScreenData[] = [
    {
      id: 1,
      title: "Main Lobby Display",
      description: "Shows the menu",
      image: screen.src,
      status: "inactive",
      assignedContent: "2 videos, 1 content",
      devices: 4,
      lastUpdated: "2h ago",
      video: "./detailsVideo.mp4",
    },
    {
      id: 2,
      title: "Conference Hall Display",
      description: "Corporate slides & event schedule",
      image: screen.src,
      status: "active",
      assignedContent: "3 videos, 2 content",
      devices: 2,
      lastUpdated: "1h ago",
      video: "./iceVideo.mp4",
    },
    {
      id: 3,
      title: "Reception Display",
      description: "Welcome messages and announcements",
      image: screen.src,
      status: "inactive",
      assignedContent: "1 video, 1 content",
      devices: 3,
      lastUpdated: "3h ago",
      video: "./detailsVideo.mp4",
    },
    {
      id: 4,
      title: "Cafeteria Display",
      description: "Daily menu & announcements",
      image: screen.src,
      status: "active",
      assignedContent: "2 videos, 2 content",
      devices: 1,
      lastUpdated: "30m ago",
      video: "./iceVideo.mp4",
    },
    {
      id: 5,
      title: "Lobby TV Display",
      description: "Company updates & news",
      image: screen.src,
      status: "inactive",
      assignedContent: "3 videos, 1 content",
      devices: 2,
      lastUpdated: "4h ago",
      video: "./detailsVideo.mp4",
    },
    {
      id: 6,
      title: "Executive Lounge Display",
      description: "Private messages & schedules",
      image: screen.src,
      status: "active",
      assignedContent: "1 video, 2 content",
      devices: 1,
      lastUpdated: "15m ago",
      video: "./iceVideo.mp4",
    },
  ];



  const [hasScreens] = useState(true);
  const screens = hasScreens ? mockScreens : [];

  const filteredScreens = screens.filter((screen) => {
    const matchesSearch = screen.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSort =
      sortOption === "all" ||
      screen.status === sortOption ||
      (sortOption === "recent" && screen.id <= 2); // Simple recent filter logic
    return matchesSearch && matchesSort;
  });

  return (
    <div className="flex flex-col items-center justify-start w-full mt-4 md:mt-0">
      <div className="w-full mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between md:flex-nowrap mb-6 gap-3">
          <DashboardHeading title="My Screens" />
          <AddButton icon={<ScreenShare />} text="Create New Screen" />
        </div>

        {/* Search + Filter Bar */}
        <div className="bg-white border border-borderGray rounded-xl p-4 mb-6 w-full">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search screen..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-1.5 md:py-3 bg-bgGray border border-borderGray rounded-lg focus:ring-2 focus:ring-slate-500 focus:border-transparent"
              />
            </div>

            <div className="w-full sm:w-48">
              <BaseSelect
                value={sortOption}
                onChange={setSortOption}
                options={sortOptions}
                placeholder="All"
                showLabel={false}
              />
            </div>
          </div>
        </div>

        {/* Content Area */}
        {filteredScreens.length === 0 ? (
          <div className="bg-white border border-borderGray rounded-xl p-16 flex justify-center">
            <div className="flex flex-col items-center justify-center text-center max-w-md w-full">
              <Monitor className="w-20 h-20 text-gray-900 stroke-[1.5] mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Screens Found
              </h3>
              <p className="text-gray-500 text-sm mb-8">
                {searchQuery || sortOption !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Create your first screen to get started"}
              </p>
              <AddButton icon={<ScreenShare />} text="Create New Screen" />
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScreens.map((screen) => (
              <ScreenCard key={screen.id} screen={screen} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyScreensPage;