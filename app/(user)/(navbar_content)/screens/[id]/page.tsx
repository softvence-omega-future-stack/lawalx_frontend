/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Clock,
  FileText,
  ListTree,
  Settings2,
  Save,
  Power,
  PowerOff,
  Play,
  Pause,
  Fullscreen,
  Tv,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import type { ScreenData } from "../page";
import ContentTimeline from "../components/screenComponent/ContentTimeline";
import ContentSchedule from "../components/screenComponent/ContentSchedule";
import ScreenSettings from "../components/screenComponent/ScreenSettings";
import MapLocation from "../components/screenComponent/MapLocation";

// Mock screens
const mockScreens: ScreenData[] = [
  {
    id: 1,
    title: "Main Lobby Display",
    description: "Shows the menu",
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
    status: "active",
    assignedContent: "1 video, 2 content",
    devices: 1,
    lastUpdated: "15m ago",
    video: "./iceVideo.mp4",
  },
];

const ScreenCardDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const screen = mockScreens.find((s) => s.id === Number(id)); // ✅ Dynamic data based on route id

  const [activeTab, setActiveTab] = useState<
    "timeline" | "schedule" | "settings"
  >("timeline");

  // Video state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.7); // Default volume (0 to 1)
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) video.pause();
    else video.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    
    const video = videoRef.current;
    if (video) {
      video.volume = newVolume;
      video.muted = newVolume === 0;
    }
  };

  // Update progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (!video.duration) return;
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [screen?.video]);

  // Reset when src changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      video.volume = volume; // Set initial volume
      video.muted = isMuted;
      setIsPlaying(false);
      setProgress(0);
    }
  }, [screen?.video, volume, isMuted]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  // Seek on click
  const handleProgressClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPos = e.clientX - rect.left;
    const newTime = (clickPos / rect.width) * video.duration;
    video.currentTime = newTime;
  };

  // ✅ Early return removed — assume valid id always exists
  if (!screen) return null;

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-9 gap-4">
          <div className="flex items-start gap-3">
            <button
              onClick={() => router.push("/screens")}
              className="hover:bg-gray-100 rounded-lg transition-colors mt-1 p-1 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-lg sm:text-2xl md:text-[30px] font-semibold text-gray-900">
                {screen.title}
              </h1>
              <p className="text-sm sm:text-base text-textGray mt-1">
                {screen.description}
              </p>
            </div>
          </div>

          <button className="flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors">
            <Save className="w-4 h-4 sm:w-5 sm:h-5" /> Update Changes
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-start gap-2 sm:gap-4 mb-6">
          {["timeline", "schedule", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex items-center gap-2 capitalize cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base font-medium rounded-lg transition-all duration-200 border ${
                activeTab === tab
                  ? "text-bgBlue border-gray-200 bg-white"
                  : "text-textGray hover:text-gray-700 hover:bg-gray-100 border-transparent"
              }`}
            >
              {tab === "timeline" && <Clock className="w-4 h-4" />}
              {tab === "schedule" && <ListTree className="w-4 h-4" />}
              {tab === "settings" && <Settings2 className="w-4 h-4" />}
              <span>{tab}</span>
            </button>
          ))}
        </div>

        {/* Main layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Left side */}
          <div className="flex-1 w-full">
            {activeTab === "timeline" && <ContentTimeline />}
            {activeTab === "schedule" && <ContentSchedule />}
            {activeTab === "settings" && <ScreenSettings />}
          </div>

          {/* Right side */}
          <div className="w-full md:w-[55%] space-y-6">
            {/* Video Section */}
            <div className="bg-white border border-borderGray p-4 sm:p-6 rounded-xl overflow-hidden">
              <div className="relative rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={screen.video}
                  className="w-full h-full object-cover"
                  // Removed muted attribute to enable sound
                  loop
                  playsInline
                />
                {/* Controls */}
                <div className="absolute bottom-3 left-0 w-full px-3 sm:px-4 flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={togglePlay}
                    className="text-white p-2 sm:p-2.5 rounded-full hover:bg-white/20 transition cursor-pointer"
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  </button>

                  {/* Volume Control */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="text-white p-1.5 rounded-full hover:bg-white/20 transition cursor-pointer"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX size={16} />
                      ) : (
                        <Volume2 size={16} />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="w-16 sm:w-20 h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    />
                  </div>

                  <div
                    className="flex-1 h-1 sm:h-1.5 bg-white/30 rounded-full relative cursor-pointer"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full rounded-full bg-bgBlue"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  <button
                    onClick={toggleFullscreen}
                    className="text-white p-2 sm:p-2.5 rounded-full hover:bg-white/20 transition cursor-pointer"
                  >
                    <Fullscreen size={18} />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 sm:mt-6 gap-3 sm:gap-0">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-900">
                  {screen.title}
                </h3>
                <button
                  className={`p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer ${
                    screen.status === "active"
                      ? "bg-bgBlue hover:bg-blue-500"
                      : "bg-[#EF4444] hover:bg-red-600"
                  } text-white`}
                >
                  {screen.status === "active" ? (
                    <Power className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <PowerOff className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>
              </div>

              <p className="text-sm sm:text-base text-gray-500 mt-2">
                Playing: {screen.description}
              </p>
            </div>

            {/* Overview */}
            <div className="bg-white rounded-xl border border-borderGray p-4 sm:p-6">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 sm:mb-4">
                Overview
              </h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between py-2 border-b border-borderGray">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FileText className="w-5 h-5 text-gray-800" />
                    <span className="text-sm sm:text-base text-gray-600">
                      Content
                    </span>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    {screen.assignedContent}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-borderGray">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Tv className="w-5 h-5 text-gray-800" />
                    <span className="text-sm sm:text-base text-gray-600">
                      Total Devices
                    </span>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    {screen.devices}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Clock className="w-5 h-5 text-gray-800" />
                    <span className="text-sm sm:text-base text-gray-600">
                      Last Updated
                    </span>
                  </div>
                  <span className="text-sm sm:text-base font-medium text-gray-900">
                    {screen.lastUpdated}
                  </span>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-xl border border-borderGray p-4 sm:p-6">
              <MapLocation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenCardDetails;