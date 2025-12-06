// components/devices/DeviceActionsMenu.tsx
import { Eye, PenLine, CircleHelp, Trash2 } from "lucide-react";
import { Device } from "@/types/device";

interface Props {
  device: Device;
  onPreview: () => void;
  onRename: () => void;
  onReport: () => void;
  onRemove: () => void;
  onClose: () => void;
}

export default function DeviceActionsMenu({
  onPreview,
  onRename,
  onReport,
  onRemove,
  onClose,
}: Props) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
      <button
        onClick={() => {
          onPreview();
          onClose();
        }}
        className="w-full px-4 py-2 text-left text-sm text-Heading dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 transition-colors"
      >
        <Eye className="w-4 h-4 text-gray-500 dark:text-gray-400" /> Preview
      </button>

      <button
        onClick={() => {
          onRename();
          onClose();
        }}
        className="w-full px-4 py-2 text-left text-sm text-Heading dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 border-t border-gray-200 dark:border-gray-700 transition-colors"
      >
        <PenLine className="w-4 h-4 text-gray-500 dark:text-gray-400" /> Rename
      </button>

      <button
        onClick={() => {
          onReport();
          onClose();
        }}
        className="w-full px-4 py-2 text-left text-sm text-Heading dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-3 border-t border-gray-200 dark:border-gray-700 transition-colors"
      >
        <CircleHelp className="w-4 h-4 text-gray-500 dark:text-gray-400" /> Report
      </button>

      <button
        onClick={() => {
          onRemove();
          onClose();
        }}
        className="w-full px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 border-t border-gray-200 dark:border-gray-700 transition-colors"
      >
        <Trash2 className="w-4 h-4" /> Remove Device
      </button>
    </div>
  );
}