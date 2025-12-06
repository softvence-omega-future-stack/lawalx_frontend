"use client";
import { useState } from "react";
import { Device } from "@/types/device";
import DeviceTable from "@/components/devices/DeviceTable";
import DeviceCard from "@/components/devices/DeviceCard";
import AddDeviceModal from "@/components/dashboard/AddDeviceModal";
import PreviewDeviceModal from "@/components/devices/modals/PreviewDeviceModal";
import RenameDeviceModal from "@/components/devices/modals/RenameDeviceModal";
import ReportDeviceModal from "@/components/devices/modals/ReportDeviceModal";
import RemoveDeviceModal from "@/components/devices/modals/RemoveDeviceModal";
import { TvMinimal, Radio, WifiOff } from "lucide-react";
import Link from "next/link";

export default function DevicesPage() {
  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: "LG UR75 43 Inch 4K UHD Smart LED TV", mac: "a841:c782", location: "Chicago, IL", screen: "Select Screen", status: "In Disconnect", lastSynced: "5 minutes ago", storage: "12.0/42.01 GB" },
    { id: 2, name: "LG UR75 43 Inch 4K UHD Smart LED TV", mac: "a841:c782", location: "Chicago, IL", screen: "Main Lobby Display", status: "Offline", lastSynced: "5 minutes ago", storage: "12.0/42.01 GB" },
    { id: 3, name: "LG UR75 43 Inch 4K UHD Smart LED TV", mac: "a841:c782", location: "Chicago, IL", screen: "Main Lobby Display", status: "Online", lastSynced: "5 minutes ago", storage: "-/50 GB" },
    { id: 4, name: "LG UR75 43 Inch 4K UHD Smart LED TV", mac: "a841:c782", location: "Chicago, IL", screen: "Main Lobby Display", status: "Online", lastSynced: "5 minutes ago", storage: "12.0 GB" },
    { id: 5, name: "LG UR75 43 Inch 4K UHD Smart LED TV", mac: "a841:c782", location: "Chicago, IL", screen: "Main Lobby Display", status: "Online", lastSynced: "5 minutes ago", storage: "12.0 GB" },
    { id: 6, name: "LG UR75 43 Inch 4K UHD Smart LED TV", mac: "a841:c782", location: "Chicago, IL", screen: "Main Lobby Display", status: "Online", lastSynced: "5 minutes ago", storage: "12.0/42.01 GB" },
    { id: 7, name: "LG UR75 43 Inch 4K UHD Smart LED TV", mac: "a841:c782", location: "Chicago, IL", screen: "Main Lobby Display", status: "Online", lastSynced: "5 minutes ago", storage: "12.0/42.01 GB" },
    { id: 8, name: "LG UR75 43 Inch 4K UHD Smart LED TV", mac: "a841:c782", location: "Chicago, IL", screen: "Main Lobby Display", status: "Online", lastSynced: "5 minutes ago", storage: "12.0/42.01 GB" },
  ]);

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<Device | null>(null);
  const [renameDevice, setRenameDevice] = useState<Device | null>(null);
  const [reportDevice, setReportDevice] = useState<Device | null>(null);
  const [removeDevice, setRemoveDevice] = useState<Device | null>(null);

  const online = devices.filter(d => d.status === "Online").length;
  const offline = devices.length - online;

  const toggleSelect = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleAll = () => {
    setSelectedIds(selectedIds.length === devices.length ? [] : devices.map(d => d.id));
  };

  const handleDelete = (device: Device) => {
    setDevices(prev => prev.filter(d => d.id !== device.id));
    setSelectedIds(prev => prev.filter(id => id !== device.id));
  };

  const handleRename = (device: Device, newName: string) => {
    setDevices(prev => prev.map(d => d.id === device.id ? { ...d, name: newName } : d));
  };

  return (
    <div className="min-h-screen">
      {/* Header + Stats */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-Heading dark:text-white mb-1">
          My Devices
        </h1>
        <p className="text-sm text-Heading dark:text-gray-400">
          Screencasts when and where your content should play
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Total Devices */}
        <div className="bg-navbarBg rounded-xl shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full border border-borderGray dark:border-gray-600 flex items-center justify-center">
              <TvMinimal className="w-5 h-5 text-navGray dark:text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Devices</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400">You can add 16 more devices</p>
            <Link href="/choose-plan">
              <button className="py-2 px-4 bg-gray-900 hover:scale-[1.02] transition-transform shadow-customShadow text-white text-sm font-medium text-nowrap rounded-lg hover:bg-gray-800 cursor-pointer">
                Upgrade Plan
              </button>
            </Link>
          </div>
        </div>

        {/* Online Devices */}
        <div className="bg-navbarBg rounded-xl shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
              <Radio className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{online}</p>
            </div>
          </div>
        </div>

        {/* Offline Devices */}
        <div className="bg-navbarBg rounded-xl shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center">
              <WifiOff className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Offline</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">{offline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-Heading dark:text-white">
          {devices.length} Devices
        </h2>
        <button
          onClick={() => setIsAddOpen(true)}
          className="px-6 py-3 cursor-pointer bg-bgBlue text-white rounded-xl flex items-center gap-2 shadow-customShadow hover:scale-105 transition"
        >
          <span className="text-lg">+</span> Add Device
        </button>
      </div>

      <div className="bg-navbarBg rounded-xl shadow-sm border border-border overflow-hidden">
        <DeviceTable
          devices={devices}
          selectedIds={selectedIds}
          onToggle={toggleSelect}
          onToggleAll={toggleAll}
          onPreview={setPreviewDevice}
          onRename={setRenameDevice}
          onReport={setReportDevice}
          onRemove={setRemoveDevice}
        />
        <div className="lg:hidden">
          {devices.map(device => (
            <DeviceCard
              key={device.id}
              device={device}
              isSelected={selectedIds.includes(device.id)}
              onToggle={() => toggleSelect(device.id)}
              onPreview={() => setPreviewDevice(device)}
              onRename={() => setRenameDevice(device)}
              onReport={() => setReportDevice(device)}
              onRemove={() => setRemoveDevice(device)}
            />
          ))}
        </div>
      </div>

      <AddDeviceModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <PreviewDeviceModal isOpen={!!previewDevice} onClose={() => setPreviewDevice(null)} device={previewDevice} />
      <RenameDeviceModal
        isOpen={!!renameDevice}
        onClose={() => setRenameDevice(null)}
        deviceName={renameDevice?.name || ""}
        onRename={(name) => renameDevice && handleRename(renameDevice, name)}
      />
      <ReportDeviceModal isOpen={!!reportDevice} onClose={() => setReportDevice(null)} deviceName={reportDevice?.name || ""} />
      <RemoveDeviceModal
        isOpen={!!removeDevice}
        onClose={() => setRemoveDevice(null)}
        deviceName={removeDevice?.name}
        onConfirm={() => removeDevice && handleDelete(removeDevice)}
      />
    </div>
  );
}