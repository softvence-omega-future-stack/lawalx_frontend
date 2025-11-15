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
];

const ScreenCardDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const screen = mockScreens.find((s) => s.id === Number(id));

  const [activeTab, setActiveTab] = useState("timeline");

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) video.pause();
    else video.play();

    setIsPlaying(!isPlaying);
  };

  // FIX: Volume mute/unmute logic
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;

    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted && volume === 0) {
      video.volume = 0.7;
      setVolume(0.7);
    }
  };

  // FIX: Volume change should NOT reload video
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    const video = videoRef.current;
    if (!video) return;

    video.volume = newVol;
    video.muted = newVol === 0;

    setVolume(newVol);
    setIsMuted(newVol === 0);
  };

  // FIX: Update progress correctly
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (!video.duration) return;
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, []);

  // FIX: Reset video ONLY when video src changes
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();
    video.currentTime = 0;
    video.volume = volume;
    video.muted = isMuted;

    setIsPlaying(false);
    setProgress(0);
  }, [screen?.video]); // ❌ removed volume & isMuted (was causing reload)

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    document.fullscreenElement ? document.exitFullscreen() : video.requestFullscreen();
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    video.currentTime = (clickX / rect.width) * video.duration;
  };

  if (!screen) return null;

  return (
    <div className="min-h-screen">
      <div className="mx-auto w-full">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push("/screens")}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <ArrowLeft />
          </button>

          <button className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800">
            <Save /> Update Changes
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          {["timeline", "schedule", "settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg border ${activeTab === tab
                ? "bg-white text-bgBlue border-gray-200"
                : "text-textGray hover:bg-gray-100"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* LEFT SECTION */}
          <div className="flex-1">
            {activeTab === "timeline" && <ContentTimeline />}
            {activeTab === "schedule" && <ContentSchedule />}
            {activeTab === "settings" && <ScreenSettings />}
          </div>

          {/* RIGHT SECTION */}
          <div className="w-full md:w-[55%] space-y-6">
            {/* VIDEO */}
            <div className="bg-white border p-6 rounded-xl">
              <div className="relative rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={screen.video}
                  className="w-full rounded-lg"
                  loop
                  playsInline
                />

                {/* Custom Controls */}
                <div className="absolute bottom-3 left-0 w-full px-4 flex items-center gap-3">
                  {/* Play Button */}
                  <button
                    onClick={togglePlay}
                    className="text-white p-2 rounded-full hover:bg-white/20 cursor-pointer"
                  >
                    {isPlaying ? <Pause /> : <Play />}
                  </button>

                  {/* Volume */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={toggleMute}
                      className="text-white p-2 rounded-full hover:bg-white/20 cursor-pointer"
                    >
                      {isMuted || volume === 0 ? <VolumeX /> : <Volume2 />}
                    </button>

                    <div className="relative w-20 h-1.5 cursor-pointer">
                      {/* background track */}
                      <div className="absolute inset-0 bg-white/20 rounded-full" />
                      {/* filled color */}
                      <div
                        className="absolute inset-0 bg-bgBlue rounded-full"
                        style={{ width: `${volume * 100}%`}}
                      />
                      {/* range input */}
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="relative w-full opacity-0 cursor-pointer h-3"
                      />
                    </div>
                  </div>

                  {/* Progress */}
                  <div
                    className="flex-1 h-1.5 bg-white/30 rounded-full cursor-pointer"
                    onClick={handleProgressClick}
                  >
                    <div
                      className="h-full bg-bgBlue rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Fullscreen */}
                  <button
                    onClick={toggleFullscreen}
                    className="text-white p-2 rounded-full hover:bg-white/20 cursor-pointer"
                  >
                    <Fullscreen />
                  </button>
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white border p-4 rounded-xl">
              <h3 className="text-lg font-semibold mb-3">Overview</h3>

              <div className="space-y-3">
                <div className="flex justify-between border-b pb-2">
                  <span className="flex items-center gap-2">
                    <FileText size={18} /> Content
                  </span>
                  <span>{screen.assignedContent}</span>
                </div>

                <div className="flex justify-between border-b pb-2">
                  <span className="flex items-center gap-2">
                    <Tv size={18} /> Devices
                  </span>
                  <span>{screen.devices}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-2">
                    <Clock size={18} /> Last Updated
                  </span>
                  <span>{screen.lastUpdated}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border p-6 rounded-xl">
              <MapLocation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenCardDetails;
