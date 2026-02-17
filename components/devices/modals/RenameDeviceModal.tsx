import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  deviceName: string;
  onRename: (newName: string) => void;
  isLoading?: boolean;
}

export default function RenameDeviceModal({ isOpen, onClose, deviceName, onRename, isLoading }: Props) {
  const [name, setName] = useState(deviceName);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Rename Device</h2>
          <button onClick={onClose} disabled={isLoading}>
            <X className="w-6 h-6 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors" />
          </button>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white placeholder-gray-500 dark-placeholder dark:placeholder-gray-400 disabled:opacity-50"
          placeholder="Enter device name"
          autoFocus
          disabled={isLoading}
        />

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2.5 shadow-customShadow rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors font-medium disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onRename(name.trim() || deviceName)}
            disabled={isLoading}
            className="px-6 py-2.5 bg-bgBlue hover:bg-blue-600 shadow-customShadow text-white rounded-xl font-medium transition-colors disabled:opacity-70 min-w-[100px] flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}