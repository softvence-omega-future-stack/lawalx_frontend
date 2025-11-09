// "use client";

// import { useState } from "react";
// import DeviceCard from "./components/DeviceCard";
// import DeviceTable from "./components/DeviceTable";
// import DeviceDetailsPopup from "./components/DeviceDetailsPopup";

// export default function DevicesPage() {
// const [selectedDevice, setSelectedDevice] = useState<null | { id: string; name: string; location: string; status: string }>(null);

// const devices = [
//   { id: "1", name: "Lobby Display", location: "Building A", status: "Active" },
//   { id: "2", name: "Conference Room", location: "Building B", status: "Inactive" },
//   { id: "3", name: "Reception", location: "Building A", status: "Active" },
// ];

// return (
// <div className="space-y-6">
//   {/* Header */}
//   <div className="flex justify-between items-center">
//     <div>
//       <h2 className="text-2xl font-semibold">My Devices</h2>
//       <p className="text-gray-500 text-sm">Manage all your connected devices</p>
//     </div>
//     <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
//       Add Device
//     </button>
//   </div>

//   {/* Summary Cards */}
//   <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//     <DeviceCard title="Total Devices" value={devices.length} />
//     <DeviceCard title="Active Devices" value={devices.filter(d => d.status === "Active").length} />
//     <DeviceCard title="Inactive Devices" value={devices.filter(d => d.status === "Inactive").length} />
//   </div>

//   {/* Device Table */}
//   <DeviceTable devices={devices} onRowClick={setSelectedDevice} />

//   {/* Device Details Popup */}
//   {selectedDevice && <DeviceDetailsPopup device={selectedDevice} onClose={() => setSelectedDevice(null)} />}
// </div>
//     <div className="flex items-center justify-center">
//       Devices page
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import {
  Monitor,
  MapPin,
  MoreVertical,
  QrCode,
  ChevronDown,
  X,
  Wifi,
  Eye,
  RotateCcw,
  Trash2,
} from "lucide-react";

import AddDeviceModal from "@/components/dashboard/AddDeviceModal";

// Remove Device Modal
function RemoveDeviceModal({
  isOpen,
  onClose,
  deviceName,
}: {
  isOpen: boolean;
  onClose: () => void;
  deviceName?: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-gray-200">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Remove
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-sm sm:text-base text-gray-600">
            Are you sure you want to remove this device from the account? All
            content will be removed from this device.
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 px-5 sm:px-6 py-4 sm:py-5 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-5 sm:px-6 py-2 sm:py-2.5 border border-gray-300 rounded-lg font-medium text-sm sm:text-base text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              console.log("Removing device:", deviceName);
              onClose();
            }}
            className="px-5 sm:px-6 py-2 sm:py-2.5 bg-red-500 text-white rounded-lg font-medium text-sm sm:text-base hover:bg-red-600 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

// Main Devices Page
export default function Devices() {
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<{
    id: number;
    name: string;
    mac: string;
    location: string;
    screen: string;
    status: string;
    lastSynced: string;
    storage: string;
  } | null>(null);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [selectedDevices, setSelectedDevices] = useState<number[]>([]);

  const devices = [
    {
      id: 1,
      name: "LG UR75 43 Inch 4K UHD Smart LED TV",
      mac: "a841:c782",
      location: "Chicago, IL",
      screen: "Select Screen",
      status: "In Disconnect",
      lastSynced: "5 minutes ago",
      storage: "12.0/42.01 GB",
    },
    {
      id: 2,
      name: "LG UR75 43 Inch 4K UHD Smart LED TV",
      mac: "a841:c782",
      location: "Chicago, IL",
      screen: "Main Lobby Display",
      status: "Offline",
      lastSynced: "5 minutes ago",
      storage: "12.0/42.01 GB",
    },
    {
      id: 3,
      name: "LG UR75 43 Inch 4K UHD Smart LED TV",
      mac: "a841:c782",
      location: "Chicago, IL",
      screen: "Main Lobby Display",
      status: "Online",
      lastSynced: "5 minutes ago",
      storage: "-/50 GB",
    },
    {
      id: 4,
      name: "LG UR75 43 Inch 4K UHD Smart LED TV",
      mac: "a841:c782",
      location: "Chicago, IL",
      screen: "Main Lobby Display",
      status: "Online",
      lastSynced: "5 minutes ago",
      storage: "12.0 GB",
    },
    {
      id: 5,
      name: "LG UR75 43 Inch 4K UHD Smart LED TV",
      mac: "a841:c782",
      location: "Chicago, IL",
      screen: "Main Lobby Display",
      status: "Online",
      lastSynced: "5 minutes ago",
      storage: "12.0 GB",
    },
    {
      id: 6,
      name: "LG UR75 43 Inch 4K UHD Smart LED TV",
      mac: "a841:c782",
      location: "Chicago, IL",
      screen: "Main Lobby Display",
      status: "Online",
      lastSynced: "5 minutes ago",
      storage: "12.0/42.01 GB",
    },
    {
      id: 7,
      name: "LG UR75 43 Inch 4K UHD Smart LED TV",
      mac: "a841:c782",
      location: "Chicago, IL",
      screen: "Main Lobby Display",
      status: "Online",
      lastSynced: "5 minutes ago",
      storage: "12.0/42.01 GB",
    },
    {
      id: 8,
      name: "LG UR75 43 Inch 4K UHD Smart LED TV",
      mac: "a841:c782",
      location: "Chicago, IL",
      screen: "Main Lobby Display",
      status: "Online",
      lastSynced: "5 minutes ago",
      storage: "12.0/42.01 GB",
    },
  ];

  const toggleDeviceSelection = (deviceId: number) => {
    setSelectedDevices((prev) =>
      prev.includes(deviceId)
        ? prev.filter((id) => id !== deviceId)
        : [...prev, deviceId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedDevices.length === devices.length) {
      setSelectedDevices([]);
    } else {
      setSelectedDevices(devices.map((d) => d.id));
    }
  };

  interface Device {
    id: number;
    name: string;
    mac: string;
    location: string;
    screen: string;
    status: string;
    lastSynced: string;
    storage: string;
  }

  const handleRemove = (device: Device): void => {
    setSelectedDevice(device);
    setIsRemoveModalOpen(true);
    setOpenMenuId(null);
  };

  const totalDevices = devices.length;
  const onlineDevices = devices.filter((d) => d.status === "Online").length;
  const offlineDevices = devices.filter(
    (d) => d.status === "Offline" || d.status === "In Disconnect"
  ).length;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          My Devices
        </h1>
        <p className="text-sm text-gray-500">
          Screencasts when and where your content should play
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Total Devices */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-borderGray">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-borderGray flex items-center justify-center">
              <Monitor className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Devices</p>
              <p className="text-2xl font-bold text-gray-900">{totalDevices}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">You can add 16 more devices</p>
          <button className="mt-3 w-full py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
            Upgrade Plan
          </button>
        </div>

        {/* Online Status */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-borderGray">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
              <Wifi className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Online Status</p>
              <p className="text-2xl font-bold text-gray-900">
                {onlineDevices}
              </p>
            </div>
          </div>
        </div>

        {/* Offline */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-borderGray">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <Monitor className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Offline</p>
              <p className="text-2xl font-bold text-gray-900">
                {offlineDevices}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Devices Table */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-900">
          {totalDevices} Devices
        </h2>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
        >
          <span className="text-lg leading-none">+</span> Add Device
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-borderGray overflow-hidden">
        {/* Table - Desktop */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[#F0FAFF] border-b border-borderGray">
              <tr>
                <th className="p-5 text-left"></th>
                <th className="p-5 text-left text-xs font-semibold text-gray-600">
                  Device Name
                </th>
                <th className="p-5 text-left text-xs font-semibold text-gray-600">
                  Location
                </th>
                <th className="p-5 text-left text-xs font-semibold text-gray-600">
                  Screen Playing
                </th>
                <th className="p-5 text-left text-xs font-semibold text-gray-600">
                  Status
                </th>
                <th className="p-5 text-left text-xs font-semibold text-gray-600">
                  Last Synced
                </th>
                <th className="p-5 text-left text-xs font-semibold text-gray-600">
                  Storage Usage
                </th>
                <th className="p-5 text-left text-xs font-semibold text-gray-600">
                  More
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {devices.map((device) => (
                <tr key={device.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedDevices.includes(device.id)}
                      onChange={() => toggleDeviceSelection(device.id)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <Monitor className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {device.name}
                        </p>
                        <p className="text-xs text-gray-500">{device.mac}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {device.location}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>{device.screen}</option>
                    </select>
                  </td>
                  <td className="px-4 py-4">
                    {device.status === "Online" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Online
                      </span>
                    ) : device.status === "Offline" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        Offline
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                        In Disconnect
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">
                    {device.lastSynced}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">
                    {device.storage}
                  </td>
                  <td className="px-4 py-4">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenMenuId(
                            openMenuId === device.id ? null : device.id
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-400" />
                      </button>

                      {openMenuId === device.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenMenuId(null)}
                          ></div>
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              Preview
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                              <RotateCcw className="w-4 h-4" />
                              Restart
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2">
                              <Wifi className="w-4 h-4" />
                              Remove Device
                            </button>
                            <button
                              onClick={() => handleRemove(device)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="lg:hidden divide-y divide-gray-200">
          {devices.map((device) => (
            <div key={device.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedDevices.includes(device.id)}
                    onChange={() => toggleDeviceSelection(device.id)}
                    className="w-4 h-4 rounded border-gray-300 mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Monitor className="w-4 h-4 text-gray-400" />
                      <p className="text-sm font-medium text-gray-900">
                        {device.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{device.mac}</p>

                    <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
                      <MapPin className="w-3 h-3" />
                      {device.location}
                    </div>

                    {device.status === "Online" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full mb-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Online
                      </span>
                    ) : device.status === "Offline" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full mb-2">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        Offline
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg mb-2">
                        In Disconnect
                      </span>
                    )}

                    <p className="text-xs text-gray-500">
                      Last synced: {device.lastSynced}
                    </p>
                    <p className="text-xs text-gray-900 mt-1">
                      Storage: {device.storage}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setOpenMenuId(openMenuId === device.id ? null : device.id)
                  }
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {openMenuId === device.id && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setOpenMenuId(null)}
                  ></div>
                  <div className="mt-2 bg-gray-50 rounded-lg p-2 space-y-1 relative z-20">
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-white rounded flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Preview
                    </button>
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-white rounded flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Restart
                    </button>
                    <button className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-white rounded flex items-center gap-2">
                      <Wifi className="w-4 h-4" />
                      Remove Device
                    </button>
                    <button
                      onClick={() => handleRemove(device)}
                      className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-white rounded flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      <AddDeviceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <RemoveDeviceModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        deviceName={selectedDevice?.name}
      />
    </div>
  );
}
