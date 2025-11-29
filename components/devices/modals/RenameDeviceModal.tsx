import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  deviceName: string;
  onRename: (newName: string) => void;
}

export default function RenameDeviceModal({ isOpen, onClose, deviceName, onRename }: Props) {
  const [name, setName] = useState(deviceName);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Rename Device</h2>
          <button onClick={onClose}><X className="w-6 h-6 text-gray-400" /></button>
        </div>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-6 py-2.5 shadow-customShadow rounded-xl hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={() => {
              onRename(name.trim() || deviceName);
              onClose();
            }}
            className="px-6 py-2.5 bg-bgBlue shadow-customShadow text-white rounded-xl hover:bg-blue-500"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}