"use client";

interface Device {
  id: string;
  name: string;
  location: string;
  status: string;
}

interface Props {
  devices: Device[];
  onRowClick: (device: Device) => void;
}

export default function DeviceTable({ devices, onRowClick }: Props) {
  return (
    <table className="min-w-full bg-white rounded-xl shadow-sm overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">Device Name</th>
          <th className="px-4 py-2 text-left">Location</th>
          <th className="px-4 py-2 text-left">Status</th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => (
          <tr
            key={device.id}
            className="hover:bg-gray-50 cursor-pointer"
            onClick={() => onRowClick(device)}
          >
            <td className="px-4 py-2">{device.name}</td>
            <td className="px-4 py-2">{device.location}</td>
            <td className="px-4 py-2">{device.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
