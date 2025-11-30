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

export default function DeviceRow({
  device,
  isSelected,
  onToggle,
  onPreview,
  onRename,
  onReport,
  onRemove,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <tr className="hover:bg-gray-50 relative">
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onToggle}
          className="w-4 h-4 rounded border-gray-300"
        />
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-sm font-medium text-gray-900">{device.name}</p>
            <p className="text-xs text-gray-500">{device.mac}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" /> {device.location}
        </div>
      </td>
      <td className="px-4 py-4">
        <select className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500">
          <option>{device.screen}</option>
        </select>
      </td>
      <td className="px-4 py-4">
        {device.status === "Online" ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs rounded-full">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
          </span>
        ) : device.status === "Offline" ? (
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs rounded-full">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Offline
          </span>
        ) : (
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
            In Disconnect
          </span>
        )}
      </td>
      <td className="px-4 py-4 text-sm text-gray-600">{device.lastSynced}</td>
      <td className="px-4 py-4 text-sm text-gray-900">{device.storage}</td>

      {/* Actions Menu Cell */}
      <td className="px-4 py-4 relative">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 hover:bg-gray-100 rounded transition"
        >
          <svg
            className="w-5 h-5 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>

        {/* Dropdown Menu - Positioned to the LEFT */}
        {menuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setMenuOpen(false)}
            />

            {/* Menu - anchored to the left of the button */}
            <div className="absolute right-16 top-[-60] mt-1 z-50">
              <DeviceActionsMenu
                device={device}
                onPreview={onPreview}
                onRename={onRename}
                onReport={onReport}
                onRemove={onRemove}
                onClose={() => setMenuOpen(false)} // optional: pass close handler
              />
            </div>
          </>
        )}
      </td>
    </tr>
  );
}