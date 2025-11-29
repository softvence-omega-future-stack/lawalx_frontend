import { Monitor, MapPin } from "lucide-react";
import { Device } from "@/types/device";
import DeviceActionsMenu from "./DeviceActionsMenu";
import { useState } from "react";

interface Props {
  device: Device;
  isSelected: boolean;
  onToggle: () => void;
  onPreview: () => void;
  onRename: () => void;
  onReport: () => void;
  onRemove: () => void;
}

export default function DeviceCard({ device, isSelected, onToggle, onPreview, onRename, onReport, onRemove }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <input type="checkbox" checked={isSelected} onChange={onToggle} className="w-4 h-4 rounded border-gray-300 mt-1" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Monitor className="w-4 h-4 text-gray-400" />
              <p className="text-sm font-medium text-gray-900">{device.name}</p>
            </div>
            <p className="text-xs text-gray-500 mb-2">{device.mac}</p>
            <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
              <MapPin className="w-3 h-3" /> {device.location}
            </div>
            <div className="mb-2">
              {device.status === "Online" ? (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
                </span>
              ) : device.status === "Offline" ? (
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Offline
                </span>
              ) : (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">In Disconnect</span>
              )}
            </div>
            <p className="text-xs text-gray-500">Last synced: {device.lastSynced}</p>
            <p className="text-xs text-gray-900 mt-1">Storage: {device.storage}</p>
          </div>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 hover:bg-gray-100 rounded">
          <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)}></div>
          <div className="mt-3 bg-gray-50 rounded-lg p-3 z-50 relative">
            <DeviceActionsMenu device={device} onPreview={onPreview} onRename={onRename} onReport={onReport} onRemove={onRemove} onClose={() => setMenuOpen(false)} />
          </div>
        </>
      )}
    </div>
  );
}