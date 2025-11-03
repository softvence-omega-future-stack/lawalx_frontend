"use client";

interface Props {
  device: { id: string; name: string; location: string; status: string };
  onClose: () => void;
}

export default function DeviceDetailsPopup({ device, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full space-y-4">
        <h3 className="text-xl font-semibold">{device.name}</h3>
        <p className="text-gray-500">Location: {device.location}</p>
        <p className="text-gray-500">Status: {device.status}</p>

        <div className="space-y-2">
          <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition">
            Control Device
          </button>
          <button
            onClick={onClose}
            className="w-full border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
