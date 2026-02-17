import { X, Trash2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  deviceName?: string;
  onConfirm?: () => void;
  isLoading?: boolean;
}

export default function RemoveDeviceModal({ isOpen, onClose, deviceName, onConfirm, isLoading }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 dark:bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Remove Device
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8">
          Are you sure you want to remove <strong className="text-gray-900 dark:text-white">{deviceName}</strong>?
          All content will be removed from this device.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-6 py-2.5 shadow-customShadow rounded-xl font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-6 py-2.5 bg-bgRed hover:bg-red-600 shadow-customShadow text-white rounded-xl font-medium flex items-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed min-w-[120px] justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Removing...
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" /> Remove
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}