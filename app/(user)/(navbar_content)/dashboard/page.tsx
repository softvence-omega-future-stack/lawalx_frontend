"use client";

import React, { useState } from "react";
import {
  X,
  Monitor,
  Wifi,
  HardDrive,
  Calendar,
  Plus,
  TrendingUp,
  Bell,
  Crown,
  Radio,
  TvMinimalIcon,
  ActivityIcon,
  VideoIcon,
  ScreenShareIcon,
  WifiOffIcon,
  ArrowUpRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ActionCardButton from "@/common/ActionCardButton";
import AddButton from "@/common/AddButton";

export default function Dashboard() {
  const router = useRouter();
  const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);

  // Define types for devices and activities so useState can infer correct types
  type Device = {
    name: string;
    online: boolean;
    location?: string;
    screen?: string;
  };

  type Activity = {
    type: "device" | "notification";
    title: string;
    description?: string;
    time?: string;
  };

  const devices: Device[] = [
    // Example device data
    {
      name: "Lobby Screen",
      online: true,
      location: "Head Office",
      screen: "Screen 1",
    },
    {
      name: "Conference Room",
      online: false,
      location: "Floor 2",
      screen: "Screen 2",
    },
    {
      name: "Reception Display",
      online: true,
      location: "USA Branch",
      screen: "Screen 5",
    },
    {
      name: "Meeting Room",
      online: false,
      location: "California Branch",
      screen: "Screen 1",
    },
  ];

  const activities: Activity[] = [
    // Example activity data
    {
      type: "device",
      title: "Lobby Screen added",
      description: "New device added to network",
      time: "2 hours ago",
    },
    {
      type: "notification",
      title: "Content uploaded",
      description: "New video content uploaded",
      time: "1 day ago",
    },
    {
      type: "device",
      title: "Reception Display added",
      description: "New device added to network",
      time: "5 hours ago",
    },
    {
      type: "notification",
      title: "Content uploaded",
      description: "New video content uploaded",
      time: "1 day ago",
    },
  ];

  const totalDevices = devices.length;
  const onlineDevices = devices.filter((d) => d.online).length;
  const offlineDevices = devices.filter((d) => !d.online).length;

  const handleUpgradeClick = () => {
    router.push("/choose-plan"); // navigate to choose plan page
  };

  return (
    <div className="min-h-screen">
      {/* Upgrade Banner */}
      {showUpgradeBanner && (
        <div
          className="rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between"
          style={{
            background:
              "linear-gradient(270deg, rgba(34, 197, 94, 0) 0%, rgba(34, 197, 94, 0.1) 98.77%), var(--Card-Background, #FFF)",
          }}
        >
          <div className="flex items-center gap-3">
            <Crown className="w-5 h-5 text-gray-700 hidden md:block" />
            <div>
              <h3 className="font-semibold text-gray-900">
                Trial ends in 12 days!
              </h3>
              <p className="text-sm text-gray-600 hidden md:block">
                Upgrade to Premium for more features.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleUpgradeClick}
              className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 hover:scale-[1.02] transition-transform flex items-center gap-2 cursor-pointer"
            >
              Upgrade
            </button>
            <button
              onClick={() => setShowUpgradeBanner(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Devices</span>
            <TvMinimalIcon className="w-11 h-11 text-[#404040] border rounded-full border-[#D4D4D4] p-2" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-2">
            {totalDevices}
          </div>
          <div className="text-sm text-green-500 flex items-center gap-1 mb-2">
            <TrendingUp className="w-4 h-4" />
            {totalDevices > 0
              ? `${totalDevices} New This Week`
              : "0 New This Week"}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Online Status</span>
            <Radio className="w-11 h-11 text-green-500 border rounded-full border-[#D4D4D4] p-2" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {onlineDevices}
          </div>
          <div className="text-sm text-red-500 flex items-center gap-1">
            {offlineDevices} Offline ⚠
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Storage</span>
            <HardDrive className="w-11 h-11 text-[#404040] border rounded-full border-[#D4D4D4] p-2" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            5.0/10 <span className="text-sm text-gray-500">GB</span>
          </div>
          <div className="mt-3 w-full flex items-center gap-3">
            {/* Progress Bar */}
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: "50%" }}
              ></div>
            </div>

            {/* Upgrade Button */}
            <button className="text-sm text-[#0FA6FF] hover:text-blue-500">
              Upgrade <ArrowUpRight className="w-4 h-4 inline-block" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Active Apps</span>
            <Radio className="w-11 h-11 text-green-500 border rounded-full border-[#D4D4D4] p-2" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
          <div className="text-sm text-red-500 flex items-center gap-1">
            0 Offline ⚠
          </div>
        </div>
      </div>

      {/* Add New Section */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <ActionCardButton
            title="Create Screen"
            subtitle="Create a new screen to play on your devices"
            icon={<ScreenShareIcon className="w-6 h-6" />}
            onClick={() => {}}
            active={true}
          />
          <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-md hover:border-gray-300 cursor-pointer">
            <TvMinimalIcon className="w-11 h-11 text-[#155DFC] p-2  bg-blue-50 rounded-lg" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Add Device</div>
              <div className="text-[.6rem] md:text-sm text-gray-600">
                Add New Device
              </div>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer">
            <VideoIcon className="w-11 h-11 text-[#155DFC] p-2  bg-blue-50 rounded-lg" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Upload Content</div>
              <div className="text-[.6rem] md:text-sm text-gray-600">
                Add new content
              </div>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer">
            <Calendar className="w-11 h-11 text-[#155DFC] p-2  bg-blue-50 rounded-lg" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Schedule</div>
              <div className="text-[.6rem] md:text-sm text-gray-600">
                Schedule new content
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Devices & Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Devices */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-6 border-b border-[#D4D4D4]">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Devices
            </h2>
            <button className="text-sm text-[#0FA6FF] hover:text-blue-600 cursor-pointer">
              View All
            </button>
          </div>

          {devices.length === 0 ? (
            <div className="text-center py-12 p-6">
              <TvMinimalIcon className="w-16 h-16 text-[#525252] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Devices Yet
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Add your first device to get started
              </p>

              {/* Centered AddButton */}
              <div className="flex justify-center">
                <AddButton
                  onClick={() => {}}
                  text="Add New Device"
                  icon={<Plus className="w-4 h-4" />}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3 p-6">
              {devices.map((device, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg"
                >
                  <Monitor className="w-8 h-8 text-gray-400 mt-0.5 p-2 rounded-md border-2 border-gray-200" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">
                        {device.name}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-2xl flex items-center gap-1  ${
                          device.online
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {device.online ? (
                          <>
                            <Wifi className="w-3 h-3" />
                            Online
                          </>
                        ) : (
                          <>
                            <WifiOffIcon className="w-3 h-3" />
                            Offline
                          </>
                        )}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {device.location}
                    </div>
                    <div className="text-xs text-gray-500">{device.screen}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between border-b p-6 border-[#D4D4D4]">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activities
            </h2>
            <button className="text-sm text-[#0FA6FF] hover:text-blue-600 cursor-pointer">
              View All
            </button>
          </div>

          {activities.length === 0 ? (
            <div className="text-center py-12 p-6">
              <ActivityIcon className="w-16 h-16 text-[#525252] mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Recent Activity
              </h3>
              <p className="text-sm text-gray-600">
                You don&#39;t have any recent activity yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3 p-6">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg"
                >
                  {activity.type === "device" ? (
                    <Monitor className="w-8 h-8 text-gray-400 mt-0.5 p-2 bg-gray-100 rounded-full" />
                  ) : (
                    <Bell className="w-8 h-8 text-gray-400 mt-0.5 p-2 bg-gray-100 rounded-full" />
                  )}
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {activity.title}
                    </div>
                    <div className="text-sm text-gray-600">
                      {activity.description}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
