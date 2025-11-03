"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Monitor, Video, ToggleRight } from "lucide-react";
import ScreenTabs from "../components/ScreenTabs";

export default function ScreenDetailPage() {
  const router = useRouter();

  // Demo data
  const screen = {
    title: "Lobby Screen",
    subtitle: "Main entrance display",
    video: "Demo Video",
    location: "Building A - Lobby",
    active: true,
    timelineContent: ["Video 1 scheduled", "Image 2 added"],
    scheduleContent: ["Schedule 1", "Schedule 2"],
    settingsContent: "Screen resolution: 1080p, Volume: 70%",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
        >
          <ChevronLeft /> Back
        </button>
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold">{screen.title}</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Update Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Section: Tabs */}
        <div className="lg:col-span-2">
          <ScreenTabs
            timelineContent={screen.timelineContent}
            scheduleContent={screen.scheduleContent}
            settingsContent={screen.settingsContent}
          />
        </div>

        {/* Right Section: Info Card */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-semibold">Device Info</h4>
              <ToggleRight size={24} className={screen.active ? "text-green-500" : "text-gray-400"} />
            </div>
            <div className="flex items-center gap-2 mb-2">
              <Video size={16} />
              <span>{screen.video}</span>
            </div>
            <div className="flex items-center gap-2">
              <Monitor size={16} />
              <span>{screen.location}</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h4 className="font-semibold mb-2">Overview</h4>
            <p className="text-gray-500 text-sm">
              This screen is located in the main lobby and displays scheduled content.
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h4 className="font-semibold mb-2">Locations</h4>
            <p className="text-gray-500 text-sm">{screen.location}</p>
            {/* Could add multiple locations */}
          </div>
        </div>
      </div>
    </div>
  );
}
