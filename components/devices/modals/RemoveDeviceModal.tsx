import { X, Trash2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  deviceName?: string;
  onConfirm?: () => void;
}

export default function RemoveDeviceModal({ isOpen, onClose, deviceName, onConfirm }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Remove Device</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="text-sm sm:text-base text-gray-600 mb-8">
          Are you sure you want to remove <strong>{deviceName}</strong>? All content will be removed from this device.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 shadow-customShadow rounded-xl font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm?.();
              onClose();
            }}
            className="px-6 py-2.5 bg-bgRed shadow-customShadow text-white rounded-xl font-medium hover:bg-red-500 flex items-center gap-2 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}