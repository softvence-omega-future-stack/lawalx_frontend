"use client"

import ActionCardButton from "@/common/ActionCardButton"
import Button  from "../../../../common/AddButton"
import { Monitor, Wifi, HardDrive, Box, Upload, Clock, Bell } from "lucide-react"
import React from "react"

export default function DashboardPage() {


  const [active, setActive] = React.useState("create");

  // Demo devices data
  const devices = [
    { id: 1, name: "Office 1", location: "LA USA", screen: "Paying Screen 2", status: "offline" },
    { id: 2, name: "Office 1", location: "LA USA", screen: "Paying Screen 5", status: "online" },
    { id: 3, name: "Office 1", location: "LA USA", screen: "0 video assigned", status: "offline" },
  ]

  // Demo activities data
  const activities = [
    {
      id: 1,
      title: "New Device Added",
      description: "Your 'Office 1' device has been added to the server.",
      time: "2 hours ago",
      icon: Monitor,
    },
    {
      id: 2,
      title: "Account Approved",
      description: "Your account has been approved. You can now access all features.",
      time: "1 hour ago",
      icon: Bell,
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="">
        {/* Stats Cards - Made responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {/* Total Devices Card */}
          <div className="p-4 md:p-6 bg-white border border-gray-200 rounded-lg md:rounded-xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-600 font-medium">Total Devices</p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">12</h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <span className="text-green-600">↑</span> 1 New This Week
                </p>
              </div>
              <div className="w-8 md:w-10 h-8 md:h-10 bg-gray-100 rounded border border-gray-300 flex items-center justify-center flex-shrink-0">
                <Monitor className="w-4 md:w-5 h-4 md:h-5 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Online Status div 1 */}
          <div className="p-4 md:p-6 bg-white border border-gray-200 rounded-lg md:rounded-xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-600 font-medium">Online Status</p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">8</h3>
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <span className="text-red-500">⚠</span> 4 Offline
                </p>
              </div>
              <div className="w-8 md:w-10 h-8 md:h-10 bg-green-50 rounded border border-green-300 flex items-center justify-center flex-shrink-0">
                <Wifi className="w-4 md:w-5 h-4 md:h-5 text-green-500" />
              </div>
            </div>
          </div>

          {/* Storage div */}
          <div className="p-4 md:p-6 bg-white border border-gray-200 rounded-lg md:rounded-xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-600 font-medium">Storage</p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">0.5/10 GB</h3>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                </div>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  Upgrade <span className="text-blue-600">↗</span>
                </p>
              </div>
              <div className="w-8 md:w-10 h-8 md:h-10 bg-gray-100 rounded border border-gray-300 flex items-center justify-center flex-shrink-0">
                <HardDrive className="w-4 md:w-5 h-4 md:h-5 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Active Apps div */}
          <div className="p-4 md:p-6 bg-white border border-gray-200 rounded-lg md:rounded-xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-600 font-medium">Active Apps</p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">0</h3>
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <span className="text-red-500">⚠</span> 0 Offline
                </p>
              </div>
              <div className="w-8 md:w-10 h-8 md:h-10 bg-green-50 rounded border border-green-300 flex items-center justify-center flex-shrink-0">
                <Wifi className="w-4 md:w-5 h-4 md:h-5 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Add New Section - Made responsive grid */}
        <div className="p-4 md:p-8 bg-white border border-gray-200 rounded-lg md:rounded-xl mb-6 md:mb-8">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Add New</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* Create Screen */}
            <ActionCardButton
        title="Create Screen"
        subtitle="Create a new screen to play on your devices"
        icon={<Monitor className="w-6 h-6 text-current" />}
        backgroundImage="/common/btnBg.png"
        active={active === "create"}
        onClick={() => setActive("create")}
      />

      <ActionCardButton
        title="Add Device"
        subtitle="Connect a new display to your account"
        icon={<Monitor className="w-6 h-6 text-current" />}
        backgroundImage="/common/btnBg.png"
        active={active === "device"}
        onClick={() => setActive("device")}
      />
            <ActionCardButton
        title="Create Screen"
        subtitle="Create a new screen to play on your devices"
        icon={<Monitor className="w-6 h-6 text-current" />}
        backgroundImage="/common/btnBg.png"
        active={active === "creat"}
        onClick={() => setActive("create")}
      />

      <ActionCardButton
        title="Add Device"
        subtitle="Connect a new display to your account"
        icon={<Monitor className="w-6 h-6 text-current" />}
        backgroundImage="/common/btnBg.png"
        active={active === "devic"}
        onClick={() => setActive("device")}
      />
            
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-base md:text-lg font-semibold text-gray-900">Recent Devices</h2>
              <a href="#" className="text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700">
                View All
              </a>
            </div>

            <div className="space-y-3">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="p-3 md:p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Monitor className="w-4 h-4 text-gray-600 flex-shrink-0" />
                        <h3 className="text-sm md:text-base font-semibold text-gray-900 truncate">{device.name}</h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                            device.status === "online" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {device.status === "online" ? "● Online" : "● Offline"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{device.location}</p>
                      <p className="text-xs text-gray-600">{device.screen}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="p-4 md:p-6 bg-white border border-gray-200 rounded-lg md:rounded-xl">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-base md:text-lg font-semibold text-gray-900">Recent Activities</h2>
              <a href="#" className="text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700">
                View All
              </a>
            </div>

            <div className="space-y-3">
              {activities.map((activity) => {
                const IconComponent = activity.icon
                return (
                  <div
                    key={activity.id}
                    className="p-3 md:p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition"
                  >
                    <div className="flex gap-3">
                      <IconComponent className="w-4 md:w-5 h-4 md:h-5 text-gray-600 flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-base font-semibold text-gray-900">{activity.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
