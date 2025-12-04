// components/CreateScreenModal.tsx
"use client";

import React, { useState } from "react";
import {
  X,
  FileText,
  Video,
  Monitor,
  CircleCheckBigIcon,
  Wifi,
  WifiOff,
  Search,
  QrCode,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Dropdown from "@/common/Dropdown";
import Image from "next/image";

interface CreateScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateScreenModal({
  isOpen,
  onClose,
}: CreateScreenModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState("video");
  const [formData, setFormData] = useState<{
    name: string;
    description: string;
    selectedVideos: number[];
    selectedDevices: number[];
  }>({
    name: "",
    description: "",
    selectedVideos: [],
    selectedDevices: [],
  });

  const videos = [
    { id: 1, name: "Video 1", size: "40 MB", thumbnail: "/userDashboard/modal_video.png" },
    { id: 2, name: "Video 2", size: "40 MB", thumbnail: "/userDashboard/modal_video.png" },
    { id: 3, name: "Video 3", size: "40 MB", thumbnail: "/userDashboard/modal_video.png" },
    { id: 4, name: "Video 4", size: "40 MB", thumbnail: "/userDashboard/modal_video.png" },
    { id: 5, name: "Video 5", size: "40 MB", thumbnail: "/userDashboard/modal_video.png" },
    { id: 6, name: "Video 6", size: "40 MB", thumbnail: "/userDashboard/modal_video.png" },
    { id: 7, name: "Video 7", size: "40 MB", thumbnail: "/userDashboard/modal_video.png" },
    { id: 8, name: "Video 8", size: "40 MB", thumbnail: "/userDashboard/modal_video.png" },
  ];

  const devices = [
    { id: 1, name: "LG UR75 43 Inch 4K UHD Smart LED TV", resolution: "3840 × 2160", online: true },
    { id: 2, name: "LG UR75 43 Inch 4K UHD Smart LED TV", resolution: "3840 × 2160", online: false },
    { id: 3, name: "LG UR75 43 Inch 4K UHD Smart LED TV", resolution: "3840 × 2160", online: false },
  ];

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleCreate = () => {
    console.log("Creating screen with data:", formData);
    setCurrentStep(1);
    setFormData({ name: "", description: "", selectedVideos: [], selectedDevices: [] });
    onClose();
  };

  const toggleVideoSelection = (videoId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedVideos: prev.selectedVideos.includes(videoId)
        ? prev.selectedVideos.filter((id) => id !== videoId)
        : [...prev.selectedVideos, videoId],
    }));
  };

  const toggleDeviceSelection = (deviceId: number) => {
    setFormData((prev) => ({
      ...prev,
      selectedDevices: prev.selectedDevices.includes(deviceId)
        ? prev.selectedDevices.filter((id) => id !== deviceId)
        : [...prev.selectedDevices, deviceId],
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-bgGray dark:border-gray-700 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="flex items-start sm:items-center justify-between p-6 gap-4 sm:gap-0">
          <h2 className="text-xl sm:text-3xl font-bold text-Headings dark:text-white text-nowrap">
            Create New Screen
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors self-end sm:self-auto"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center justify-center md:justify-between px-6 py-5 border-b border-borderGray dark:border-gray-700 gap-4">
          {/* Step 1 */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                currentStep >= 1
                  ? "bg-blue-50 dark:bg-blue-900/20 border border-bgBlue dark:border-blue-700"
                  : "bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
              } ${currentStep > 1 ? "border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-900/20" : ""}`}
            >
              {currentStep > 1 ? (
                <CircleCheckBigIcon className="w-6 h-6 text-bgGreen" />
              ) : (
                <FileText
                  className={`w-6 h-6 ${
                    currentStep >= 1 ? "text-bgBlue" : "text-gray-400 dark:text-gray-500"
                  }`}
                />
              )}
            </div>
            <div>
              <div className={`sm:font-semibold font-normal text-xs sm:text-base ${currentStep >= 1 ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>
                Step 1
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                Screen Information
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                currentStep >= 2
                  ? "bg-blue-50 dark:bg-blue-900/20 border border-bgBlue dark:border-blue-700"
                  : "bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
              } ${currentStep > 2 ? "border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-900/20" : ""}`}
            >
              {currentStep > 2 ? (
                <CircleCheckBigIcon className="w-6 h-6 text-bgGreen" />
              ) : (
                <Video
                  className={`w-6 h-6 ${
                    currentStep >= 2 ? "text-bgBlue" : "text-gray-400 dark:text-gray-500"
                  }`}
                />
              )}
            </div>
            <div>
              <div className={`sm:font-semibold font-normal text-xs sm:text-base ${currentStep >= 2 ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>
                Step 2
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                Content Selection
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${
                currentStep >= 3
                  ? "bg-blue-50 dark:bg-blue-900/20 border border-bgBlue dark:border-blue-700"
                  : "bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600"
              }`}
            >
              <Monitor
                className={`w-6 h-6 ${
                  currentStep >= 3 ? "text-bgBlue" : "text-gray-400 dark:text-gray-500"
                }`}
              />
            </div>
            <div>
              <div className={`sm:font-semibold font-normal text-xs sm:text-base ${currentStep >= 3 ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"}`}>
                Step 3
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 hidden sm:block">
                Device Selection
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1 */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Store A - NYC"
                  className="w-full px-4 py-3 border border-borderGray dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter screen description"
                  rows={6}
                  className="w-full px-4 py-3 border border-borderGray dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue focus:border-transparent resize-none text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>
          )}

          {/* Step 2 */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search Content"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  />
                </div>

                <div className="w-full sm:w-[200px]">
                  <Dropdown
                    options={[
                      { value: "video", label: "Videos" },
                      { value: "image", label: "Images" },
                      { value: "audio", label: "Audio" },
                    ]}
                    value={selectedType}
                    onChange={(value) => setSelectedType(String(value))}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="border border-borderGray dark:border-gray-600 rounded-lg max-h-76 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {videos.map((video) => (
                  <div
                    key={video.id}
                    className="flex items-center gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => toggleVideoSelection(video.id)}
                  >
                    <input
                      type="checkbox"
                      checked={formData.selectedVideos.includes(video.id)}
                      onChange={() => toggleVideoSelection(video.id)}
                      className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                    <div className="w-20 h-14 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                      <Image
                        src={video.thumbnail}
                        alt={video.name}
                        width={80}
                        height={56}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-white truncate">
                        {video.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{video.size}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Select Devices
                </label>
                <div className="border border-borderGray dark:border-gray-600 rounded-lg divide-y dark:divide-gray-700 max-h-64 overflow-y-auto">
                  {devices.map((device) => (
                    <div
                      key={device.id}
                      className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                      onClick={() => toggleDeviceSelection(device.id)}
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedDevices.includes(device.id)}
                        onChange={() => toggleDeviceSelection(device.id)}
                        className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-500 focus:ring-blue-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-gray-900 dark:text-white truncate">
                            {device.name}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 border rounded-md flex items-center gap-1 ${
                              device.online
                                ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                                : "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
                            }`}
                          >
                            {device.online ? (
                              <Wifi className="w-3 h-3" />
                            ) : (
                              <WifiOff className="w-3 h-3" />
                            )}
                            {device.online ? "Online" : "Offline"}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {device.resolution}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Add New Device
                </label>
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex flex-1 min-w-[200px] gap-2">
                    <input
                      type="text"
                      placeholder="Enter the PIN or scan the QR code"
                      className="flex-1 px-4 py-3 border border-borderGray dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <button className="p-3 border border-borderGray dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shrink-0">
                      <QrCode className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>

                  <div className="w-full sm:w-auto flex justify-end">
                    <button className="px-6 py-3 bg-gray-900 dark:bg-gray-800 text-white hover:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center md:justify-between px-6 py-4 border-t border-borderGray dark:border-gray-700 gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 border border-borderGray dark:border-gray-600 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? "text-gray-400 dark:text-gray-500 cursor-not-allowed"
                : "text-gray-700 dark:text-gray-300 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden md:block">Previous</span>
          </button>

          <div className="text-sm text-gray-600 dark:text-gray-400">Step {currentStep} of 3</div>

          {currentStep < 3 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 bg-bgBlue hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              <span className="hidden md:block">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleCreate}
              className="px-6 py-2.5 bg-bgBlue hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
            >
              Create
            </button>
          )}
        </div>
      </div>
    </div>
  );
}