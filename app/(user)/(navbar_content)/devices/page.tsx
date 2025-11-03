"use client";

import { useState } from "react";
import DeviceCard from "./components/DeviceCard";
import DeviceTable from "./components/DeviceTable";
import DeviceDetailsPopup from "./components/DeviceDetailsPopup";

export default function DevicesPage() {
  const [selectedDevice, setSelectedDevice] = useState<null | { id: string; name: string; location: string; status: string }>(null);

  const devices = [
    { id: "1", name: "Lobby Display", location: "Building A", status: "Active" },
    { id: "2", name: "Conference Room", location: "Building B", status: "Inactive" },
    { id: "3", name: "Reception", location: "Building A", status: "Active" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">My Devices</h2>
          <p className="text-gray-500 text-sm">Manage all your connected devices</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Add Device
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <DeviceCard title="Total Devices" value={devices.length} />
        <DeviceCard title="Active Devices" value={devices.filter(d => d.status === "Active").length} />
        <DeviceCard title="Inactive Devices" value={devices.filter(d => d.status === "Inactive").length} />
      </div>

      {/* Device Table */}
      <DeviceTable devices={devices} onRowClick={setSelectedDevice} />

      {/* Device Details Popup */}
      {selectedDevice && <DeviceDetailsPopup device={selectedDevice} onClose={() => setSelectedDevice(null)} />}
    </div>
  );
}
