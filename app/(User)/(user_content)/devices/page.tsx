"use client";

import React, { useState, useMemo, useEffect } from "react";
import { TvMinimal, Radio, WifiOff, Search, ChevronDown, MoreVertical, X, Trash2, Edit, Monitor, UserCheck, Clock } from "lucide-react";
import Link from "next/link";
import AddDeviceModal from "@/components/dashboard/AddDeviceModal";
import PreviewDeviceModal from "@/components/devices/modals/PreviewDeviceModal";
import GoogleMapModal from "@/components/shared/modals/GoogleMapModal";

// Local types to match admin page logic
type Device = {
  id: number;
  device: string;
  model: string;
  location: string;
  type: string;
  status: 'Online' | 'Offline' | 'Syncing' | string;
  storage: string;
  daysAgo: number;
  lastSyncDate?: Date;
  lastSync?: string;
  lat: number;
  lng: number;
};

// Generate demo data with dates
const generateDevicesData = (): Device[] => {
  const devices = [
    { device: 'Lobby Display', model: 'LG-43-4K', location: 'Chicago, IL', type: 'LG webOS', status: 'Online', storage: '12.0/42.0 GB', daysAgo: 0.5, lat: 41.8781, lng: -87.6298 },
    { device: 'Menu Board', model: 'SS-55-HD', location: 'Los Angeles, CA', type: 'Samsung Tizen', status: 'Offline', storage: '3.2/8.0 GB', daysAgo: 0.8, lat: 34.0522, lng: -118.2437 },
    { device: 'Office Screen', model: 'AV-32-HD', location: 'New York, NY', type: 'Android TV', status: 'Online', storage: '8.5/16.0 GB', daysAgo: 1.2, lat: 40.7128, lng: -74.0060 },
    { device: 'Reception Display', model: 'FTV-50-4K', location: 'Miami, FL', type: 'Fire TV', status: 'Syncing', storage: '5.7/32.0 GB', daysAgo: 2.5, lat: 25.7617, lng: -80.1918 },
    { device: 'Conference Room', model: 'LG-65-4K', location: 'Boston, MA', type: 'LG webOS', status: 'Online', storage: '14.2/64.0 GB', daysAgo: 4, lat: 42.3601, lng: -71.0589 },
    { device: 'Waiting Area', model: 'SS-43-HD', location: 'Seattle, WA', type: 'Samsung Tizen', status: 'Offline', storage: '6.1/16.0 GB', daysAgo: 10, lat: 47.6062, lng: -122.3321 },
    { device: 'Staff Room', model: 'AV-24-HD', location: 'Dallas, TX', type: 'Android TV', status: 'Online', storage: '4.8/8.0 GB', daysAgo: 20, lat: 32.7767, lng: -96.7970 },
    { device: 'Garage Display', model: 'FTV-43-4K', location: 'Phoenix, AZ', type: 'Fire TV', status: 'Online', storage: '7.8/16.0 GB', daysAgo: 45, lat: 33.4484, lng: -112.0740 },
  ];

  const now = new Date();
  return devices.map((item, index) => {
    const lastSyncDate = new Date(now.getTime() - item.daysAgo * 24 * 60 * 60 * 1000);
    let lastSync;
    if (item.status === 'Syncing') {
      lastSync = 'Syncing now';
    } else if (item.daysAgo < 1) {
      const mins = Math.floor(item.daysAgo * 24 * 60);
      lastSync = mins < 60 ? `${mins} minutes ago` : `${Math.floor(mins / 60)} hours ago`;
    } else {
      lastSync = `${Math.floor(item.daysAgo)} days ago`;
    }
    return { ...item, id: index + 1, lastSyncDate, lastSync };
  });
};

// Reusable Dropdown Component (matching admin style)
const Dropdown = ({ value, options, onChange, icon: Icon }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer flex items-center gap-2 px-4 py-2 text-black dark:text-white bg-navbarBg border border-border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
      >
        {Icon && <Icon className="w-4 h-4" />}
        {value}
        <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-2 w-48 bg-navbarBg border border-border rounded-lg shadow-lg z-20">
            {options.map((option: string) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg text-gray-900 dark:text-white"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

// Action Menu Component (matching admin style)
const ActionMenu = ({ device, onAction, isLastRows, isFirstRows }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const actions = [
    { label: 'View Details', icon: Monitor, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Edit', icon: Edit, color: 'text-gray-600 dark:text-gray-400' },
    { label: 'Report Issue', icon: UserCheck, color: 'text-orange-600 dark:text-orange-400' },
    { label: 'Remove Device', icon: Trash2, color: 'text-red-600 dark:text-red-400' },
  ];

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 cursor-pointer">
        <MoreVertical className="w-5 h-5" />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className={`absolute right-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 ${isLastRows ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
            {actions.map((action) => (
              <button
                key={action.label}
                onClick={() => {
                  onAction(action.label, device);
                  setIsOpen(false);
                }}
                className={`w-full cursor-pointer text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg flex items-center gap-2 ${action.color}`}
              >
                <action.icon className="w-4 h-4" />
                {action.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default function DevicesPage() {
  const [allDevices] = useState(generateDevicesData());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<Device | null>(null);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; label: string; device: Device | null }>({ lat: 0, lng: 0, label: '', device: null });

  // Filtering
  const filteredDevices = useMemo(() => {
    return allDevices.filter(d => {
      const matchesSearch = d.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.model.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'All Status' || d.status === statusFilter;
      const matchesType = typeFilter === 'All Types' || d.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [allDevices, searchQuery, statusFilter, typeFilter]);

  // Pagination
  const paginatedDevices = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredDevices.slice(start, start + itemsPerPage);
  }, [filteredDevices, currentPage]);

  useEffect(() => { setCurrentPage(1); }, [searchQuery, statusFilter, typeFilter]);

  const online = allDevices.filter(d => d.status === "Online").length;
  const offline = allDevices.filter(d => d.status === "Offline").length;

  const handleAction = (action: string, device: Device) => {
    if (action === 'View Details') setPreviewDevice(device);
    // Add logic for other actions if needed
  };

  const statusStyles: any = {
    Online: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    Offline: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    Syncing: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2 justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-Heading dark:text-white mb-1">My Devices</h1>
        <p className="text-sm text-Heading dark:text-gray-400">Screencasts when and where your content should play</p>
        </div>
        <button
          onClick={() => setIsAddOpen(true)}
          className="px-6 py-1.5 cursor-pointer bg-bgBlue text-white rounded-xl flex items-center gap-2 shadow-customShadow hover:scale-105 transition"
        >
          <span className="text-lg">+</span> Add Device
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-navbarBg rounded-xl shadow-sm p-6 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full border border-borderGray dark:border-gray-600 flex items-center justify-center">
              <TvMinimal className="w-5 h-5 text-navGray dark:text-gray-400" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Devices</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{allDevices.length}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-500 dark:text-gray-400">You can add 16 more devices</p>
            <Link href="/choose-plan">
              <button className="py-2 px-4 bg-gray-900 hover:scale-[1.02] transition-transform shadow-customShadow text-white text-sm font-medium rounded-lg hover:bg-gray-800 cursor-pointer">
                Upgrade Plan
              </button>
            </Link>
          </div>
        </div>

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

      {/* Title + Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-Heading dark:text-white">{filteredDevices.length} Devices</h2>
      </div>

      {/* Main Container (Management + Table) */}
      <div className="bg-navbarBg rounded-xl border border-border">
        {/* Filtering section matching admin */}
        <div className="p-6 border-b border-border">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search devices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-navbarBg text-gray-900 dark:text-white"
              />
            </div>
            <Dropdown value={statusFilter} options={['All Status', 'Online', 'Offline', 'Syncing']} onChange={setStatusFilter} />
            <Dropdown value={typeFilter} options={['All Types', 'Android TV', 'Fire TV', 'Samsung Tizen', 'LG webOS']} onChange={setTypeFilter} />
          </div>
        </div>

        {/* Table styled like admin but with requested columns */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Device</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Storage</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Sync</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedDevices.map((device, index) => (
                <tr key={device.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{device.device}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{device.model}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => {
                        setSelectedLocation({ lat: device.lat, lng: device.lng, label: device.location, device: device });
                        setMapModalOpen(true);
                      }}
                      className="text-bgBlue hover:underline cursor-pointer transition-all"
                    >
                      {device.location}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{device.type}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[device.status] || ''}`}>
                      {device.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{device.storage}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{device.lastSync}</td>
                  <td className="px-6 py-4 text-right">
                    <ActionMenu device={device} onAction={handleAction} isLastRows={index >= paginatedDevices.length - 2} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {paginatedDevices.length === 0 && (
            <div className="p-8 text-center text-gray-500">No devices found.</div>
          )}
        </div>

        {/* Pagination matching admin */}
        <div className="p-4 border-t border-border flex justify-between items-center bg-navbarBg rounded-b-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredDevices.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
            {Math.min(currentPage * itemsPerPage, filteredDevices.length)} of {filteredDevices.length} devices
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredDevices.length / itemsPerPage)))}
              disabled={currentPage >= Math.ceil(filteredDevices.length / itemsPerPage)}
              className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm disabled:opacity-50 cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddDeviceModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
      <PreviewDeviceModal isOpen={!!previewDevice} onClose={() => setPreviewDevice(null)} device={previewDevice as any} />
      <GoogleMapModal
        isOpen={mapModalOpen}
        onClose={() => setMapModalOpen(false)}
        lat={selectedLocation.lat}
        lng={selectedLocation.lng}
        label={selectedLocation.label}
        device={selectedLocation.device}
      />
    </div>
  );
}