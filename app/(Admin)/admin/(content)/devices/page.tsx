"use client";

import React, { useState, useMemo } from 'react';
import { Monitor, Wifi, WifiOff, Clock, Search, Download, ChevronDown, MoreVertical, X, Trash2, Edit, UserCheck, ChevronRight, HomeIcon } from 'lucide-react';
import PreviewDeviceModal from '@/components/devices/modals/PreviewDeviceModal';
import GoogleMapModal from '@/components/shared/modals/GoogleMapModal';
import Link from 'next/link';

// Generate demo data with dates - ensuring data for each time range
const generateDevicesData = () => {
  const devices = [
    // Last 1 day devices (0-1 days ago)
    { device: 'Reception Display', model: 'TV-001-NYC', customer: 'TechCorp Inc.', location: 'New York, NY', type: 'Android TV', status: 'Online', storage: '8.5 GB / 16 GB', uptime: '99.8%', daysAgo: 0.5, lat: 40.7128, lng: -74.0060 },
    { device: 'Menu Board', model: 'TV-002-LA', customer: 'Restaurant Group', location: 'Los Angeles, CA', type: 'Fire TV', status: 'Online', storage: '3.2 GB / 8 GB', uptime: '98.5%', daysAgo: 0.8, lat: 34.0522, lng: -118.2437 },

    // Last 7 days devices (2-6 days ago)
    { device: 'Lobby Screen', model: 'TV-003-CHI', customer: 'Healthcare Network', location: 'Chicago, IL', type: 'Samsung Tizen', status: 'Offline', storage: '12.8 GB / 16 GB', uptime: '95.2%', daysAgo: 3, lat: 41.8781, lng: -87.6298 },
    { device: 'Store Display', model: 'TV-004-MIA', customer: 'RetailStore Chain', location: 'Miami, FL', type: 'LG webOS', status: 'Syncing', storage: '5.7 GB / 32 GB', uptime: '99.1%', daysAgo: 5, lat: 25.7617, lng: -80.1918 },
    { device: 'Conference Room', model: 'TV-005-BOS', customer: 'Tech Solutions', location: 'Boston, MA', type: 'Android TV', status: 'Online', storage: '4.2 GB / 16 GB', uptime: '97.8%', daysAgo: 6, lat: 42.3601, lng: -71.0589 },

    // Last 30 days devices (8-28 days ago)
    { device: 'Lobby Display', model: 'TV-006-SEA', customer: 'Coffee Chain', location: 'Seattle, WA', type: 'Fire TV', status: 'Online', storage: '6.1 GB / 16 GB', uptime: '99.3%', daysAgo: 15, lat: 47.6062, lng: -122.3321 },
    { device: 'Menu Board', model: 'TV-007-DEN', customer: 'FastFood Group', location: 'Denver, CO', type: 'Samsung Tizen', status: 'Online', storage: '7.8 GB / 16 GB', uptime: '98.9%', daysAgo: 20, lat: 39.7392, lng: -104.9903 },
    { device: 'Waiting Room', model: 'TV-008-PHX', customer: 'Medical Center', location: 'Phoenix, AZ', type: 'LG webOS', status: 'Syncing', storage: '5.3 GB / 32 GB', uptime: '99.5%', daysAgo: 28, lat: 33.4484, lng: -112.0740 },

    // Last 1 year devices (31-364 days ago)
    { device: 'Retail Display', model: 'TV-009-ATL', customer: 'Shopping Mall', location: 'Atlanta, GA', type: 'Android TV', status: 'Online', storage: '9.2 GB / 16 GB', uptime: '96.7%', daysAgo: 45, lat: 33.7490, lng: -84.3880 },
    { device: 'Office Screen', model: 'TV-010-DAL', customer: 'Corporate HQ', location: 'Dallas, TX', type: 'Fire TV', status: 'Online', storage: '5.8 GB / 16 GB', uptime: '98.2%', daysAgo: 90, lat: 32.7767, lng: -96.7970 },
    { device: 'Hotel Lobby', model: 'TV-011-LAS', customer: 'Hotel Chain', location: 'Las Vegas, NV', type: 'Samsung Tizen', status: 'Online', storage: '11.4 GB / 16 GB', uptime: '97.5%', daysAgo: 180, lat: 36.1699, lng: -115.1398 },
    { device: 'Store Front', model: 'TV-012-POR', customer: 'Electronics Store', location: 'Portland, OR', type: 'LG webOS', status: 'Offline', storage: '6.9 GB / 32 GB', uptime: '94.8%', daysAgo: 300, lat: 45.5152, lng: -122.6784 },
  ];

  const now = new Date();
  return devices.map((device, index) => {
    const lastSyncDate = new Date(now.getTime() - device.daysAgo * 24 * 60 * 60 * 1000);

    let lastSync;
    if (device.status === 'Syncing') {
      lastSync = 'Syncing now';
    } else if (device.daysAgo < 1) {
      const minutesAgo = Math.floor(device.daysAgo * 24 * 60);
      if (minutesAgo < 60) {
        lastSync = `${minutesAgo} minutes ago`;
      } else {
        const hours = Math.floor(minutesAgo / 60);
        lastSync = `${hours} hours ago`;
      }
    } else if (device.daysAgo < 7) {
      lastSync = `${Math.floor(device.daysAgo)} days ago`;
    } else if (device.daysAgo < 30) {
      const weeks = Math.floor(device.daysAgo / 7);
      lastSync = `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      const months = Math.floor(device.daysAgo / 30);
      lastSync = `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }

    return {
      id: index + 1,
      ...device,
      lastSyncDate,
      lastSync,
    };
  });
};

// Reusable Dropdown Component
type DropdownProps = {
  value: string;
  options: string[];
  onChange: (value: string) => void;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const Dropdown = ({ value, options, onChange, icon: Icon }: DropdownProps) => {
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
            {options.map((option) => (
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

// Reusable Modal Component
type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full mx-4 p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Stat Card Component
type StatCardProps = {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  trend?: string;
};

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, icon: Icon, trend }) => (
  <div className="bg-navbarBg p-6 rounded-xl border border-border">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
      <Icon className="w-5 h-5 text-gray-400" />
    </div>
    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</div>
    <div className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</div>
  </div>
);

// Action Menu Component
type Device = {
  id: number;
  device: string;
  model: string;
  customer: string;
  location: string;
  type: string;
  status: 'Online' | 'Offline' | 'Syncing' | string;
  storage: string;
  uptime: string;
  daysAgo: number;
  lastSyncDate?: Date;
  lastSync?: string;
  lat: number;
  lng: number;
};

type ActionMenuProps = {
  device: Device;
  onAction: (action: string, device: Device) => void;
  isLastRows: boolean;
  isFirstRows?: boolean;
};

const ActionMenu: React.FC<ActionMenuProps> = ({ device, onAction, isLastRows, isFirstRows }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { label: 'View Details', icon: Monitor, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Edit', icon: Edit, color: 'text-gray-600 dark:text-gray-400' },
    { label: 'Suspend Account', icon: UserCheck, color: 'text-orange-600 dark:text-orange-400' },
    { label: 'Delete Client', icon: Trash2, color: 'text-red-600 dark:text-red-400' },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1 cursor-pointer"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className={`absolute right-0 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 ${isFirstRows ? 'right-full mr-2' :
            isLastRows ? 'bottom-full mb-2' : 'top-full mt-2'
            }`}>
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

export default function GlobalDevices() {
  const [timeRange, setTimeRange] = useState('Last 30 days');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [modalContent, setModalContent] = useState<{ title: string; device: Device | null; action: string }>({ title: '', device: null, action: '' });
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; label: string; device: Device | null }>({ lat: 0, lng: 0, label: '', device: null });

  // All devices data
  const allDevices = useMemo(() => generateDevicesData(), []);

  // Get days from time range
  type TimeRange = 'Last 1 day' | 'Last 7 days' | 'Last 30 days' | 'Last 1 year';

  interface RangeMap {
    'Last 1 day': number;
    'Last 7 days': number;
    'Last 30 days': number;
    'Last 1 year': number;
  }

  const getDaysFromRange = (range: TimeRange | string): number => {
    const rangeMap: RangeMap = {
      'Last 1 day': 1,
      'Last 7 days': 7,
      'Last 30 days': 30,
      'Last 1 year': 365
    };
    return rangeMap[(range as TimeRange)] ?? 30;
  };

  // Filter devices by time range
  const devicesInRange = useMemo(() => {
    const days = getDaysFromRange(timeRange);
    return allDevices.filter(device => device.daysAgo <= days);
  }, [allDevices, timeRange]);

  // Calculate stats based on filtered devices
  const stats = useMemo(() => {
    const total = devicesInRange.length;
    const online = devicesInRange.filter(d => d.status === 'Online').length;
    const offline = devicesInRange.filter(d => d.status === 'Offline').length;
    const uptimes = devicesInRange.map(d => parseFloat(d.uptime.replace('%', '')));
    const avgUptime = uptimes.length > 0
      ? (uptimes.reduce((a, b) => a + b, 0) / uptimes.length).toFixed(1) + '%'
      : '0%';

    // Calculate trend (comparing to previous period)
    const previousDays = getDaysFromRange(timeRange);
    const previousDevices = allDevices.filter(d =>
      d.daysAgo > previousDays && d.daysAgo <= previousDays * 2
    );
    const trend = total - previousDevices.length;
    const trendText = trend > 0 ? `+${trend} from last period` : trend < 0 ? `${trend} from last period` : 'No change';

    return { total, online, offline, avgUptime, trendText };
  }, [devicesInRange, allDevices, timeRange]);

  // Filter devices by search and filters
  const filteredDevices = useMemo(() => {
    return devicesInRange.filter(device => {
      const matchesSearch =
        device.device.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        device.model.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus = statusFilter === 'All Status' || device.status === statusFilter;
      const matchesType = typeFilter === 'All Types' || device.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [devicesInRange, searchQuery, statusFilter, typeFilter]);

  // Pagination logic
  const paginatedDevices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredDevices.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredDevices, currentPage]);

  // Reset to first page when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, typeFilter, timeRange]);

  interface ModalContent {
    title: string;
    device: Device | null;
    action: string;
  }

  const handleAction = (action: string, device: Device): void => {
    const content: ModalContent = { title: action, device, action };
    setModalContent(content);
    setModalOpen(true);
  };

  type StatusBadgeMap = {
    Online: string;
    Offline: string;
    Syncing: string;
    [key: string]: string;
  };

  const getStatusBadge = (status: Device['status']): string => {
    const styles: StatusBadgeMap = {
      Online: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
      Offline: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
      Syncing: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    };
    return styles[status] ?? '';
  };

  const renderModalContent = () => {
    if (!modalContent.device) return null;

    switch (modalContent.action) {
      case 'View Details':
        return (
          <>
            <PreviewDeviceModal isOpen={modalOpen} device={modalContent.device as any} onClose={() => setModalOpen(false)} />
          </>
        );

      case 'Edit':
        return (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Device Name"
              defaultValue={modalContent.device.device}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <input
              type="text"
              placeholder="Location"
              defaultValue={modalContent.device.location}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        );

      case 'Suspend Account':
        return (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to suspend {modalContent.device.device}? The device will be temporarily disabled.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Suspend
              </button>
            </div>
          </div>
        );

      case 'Delete Client':
        return (
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Are you sure you want to delete {modalContent.device.device}? This action cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/admin/dashboard">
            <HomeIcon className="w-4 h-4 cursor-pointer hover:text-bgBlue" />
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-blue-500 dark:text-blue-400">
            Devices
          </span>
        </div>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Global Devices</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Monitor and manage all connected devices across customers</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Dropdown
              value={timeRange}
              options={['Last 1 day', 'Last 7 days', 'Last 30 days', 'Last 1 year']}
              onChange={setTimeRange}
            />
            <button className=" cursor-pointer flex items-center gap-2 px-4 py-2 bg-bgBlue text-white rounded-lg hover:bg-blue-500 transition-colors text-sm">
              <Download className="w-4 h-4" />
              Export Financial Report
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Devices"
            value={stats.total.toLocaleString()}
            subtitle={stats.trendText}
            icon={Monitor}
          />
          <StatCard
            title="Online Devices"
            value={stats.online.toLocaleString()}
            subtitle={`${((stats.online / stats.total) * 100).toFixed(1)}% Online`}
            icon={Wifi}
          />
          <StatCard
            title="Offline Devices"
            value={stats.offline}
            subtitle="Requires attention"
            icon={WifiOff}
          />
          <StatCard
            title="Average Uptime"
            value={stats.avgUptime}
            subtitle={timeRange}
            icon={Clock}
          />
        </div>

        {/* Device Management */}
        <div className="bg-navbarBg rounded-xl border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Device Management</h2>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search devices..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-navbarBg text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
              <Dropdown
                value={statusFilter}
                options={['All Status', 'Online', 'Offline', 'Syncing']}
                onChange={setStatusFilter}
              />
              <Dropdown
                value={typeFilter}
                options={['All Types', 'Android TV', 'Fire TV', 'Samsung Tizen', 'LG webOS']}
                onChange={setTypeFilter}
              />
            </div>
          </div>



          {/* Table */}
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Device</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Storage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Last Sync</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Uptime</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedDevices.length > 0 ? (
                  paginatedDevices.map((device, index) => {
                    const isLastRows = index >= paginatedDevices.length - 2;
                    const isFirstRows = index < 2;
                    return (
                      <tr key={device.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{device.device}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">{device.model}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{device.customer}</td>
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
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(device.status)}`}>
                            {device.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{device.storage}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{device.lastSync}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            <span className="text-sm text-gray-900 dark:text-white">{device.uptime}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <ActionMenu device={device} onAction={handleAction} isLastRows={isLastRows} isFirstRows={isFirstRows} />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={9} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                      No devices found for the selected time range and filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-border flex justify-between items-center bg-navbarBg rounded-b-lg">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {filteredDevices.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, filteredDevices.length)} of {filteredDevices.length} devices
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-customShadow disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredDevices.length / itemsPerPage)))}
                disabled={currentPage >= Math.ceil(filteredDevices.length / itemsPerPage)}
                className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-customShadow disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
      >
        {renderModalContent()}
      </Modal>

      <GoogleMapModal
        isOpen={mapModalOpen}
        onClose={() => setMapModalOpen(false)}
        lat={selectedLocation.lat}
        lng={selectedLocation.lng}
        label={selectedLocation.label}
        device={selectedLocation.device}
      />
    </div >
  );
}