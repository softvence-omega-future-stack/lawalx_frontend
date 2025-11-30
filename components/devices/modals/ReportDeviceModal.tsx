import { X } from "lucide-react";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  deviceName: string;
}

export default function ReportDeviceModal({ isOpen, onClose, deviceName }: Props) {
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Report Issue</h2>
          <button onClick={onClose}><X className="w-6 h-6 text-gray-400" /></button>
        </div>
        <p className="text-sm text-gray-600 mb-4">Device: <strong>{deviceName}</strong></p>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe the problem..."
          rows={6}
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-6 py-2.5 shadow-customShadow rounded-xl hover:bg-gray-50 cursor-pointer">
            Cancel
          </button>
          <button
            onClick={() => {
              alert("Report sent! Thank you.");
              onClose();
            }}
            className="px-6 py-2.5 bg-bgRed shadow-customShadow text-white rounded-xl hover:bg-red-500 cursor-pointer"
          >
            Send Report
          </button>
        </div>
      </div>
    </div>
  );
}