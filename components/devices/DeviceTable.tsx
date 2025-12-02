import DeviceRow from "./DeviceRow";
import { Device } from "@/types/device";

interface Props {
  devices: Device[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  onToggleAll: () => void;
  onPreview: (d: Device) => void;
  onRename: (d: Device) => void;
  onReport: (d: Device) => void;
  onRemove: (d: Device) => void;
}

export default function DeviceTable({
  devices,
  selectedIds,
  onToggle,
  onToggleAll,
  onPreview,
  onRename,
  onReport,
  onRemove,
}: Props) {
  const allSelected = devices.length > 0 && selectedIds.length === devices.length;

  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full table-auto border-collapse">
        <thead className="bg-[#F0FAFF] dark:bg-gray-800 border-b border-borderGray dark:border-gray-700">
          <tr>
            <th className="p-5 text-left">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={onToggleAll}
                className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-bgBlue focus:ring-bgBlue"
              />
            </th>
            <th className="p-5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">
              Device Name
            </th>
            <th className="p-5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">
              Location
            </th>
            <th className="p-5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">
              Screen Playing
            </th>
            <th className="p-5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">
              Status
            </th>
            <th className="p-5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">
              Last Synced
            </th>
            <th className="p-5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">
              Storage Usage
            </th>
            <th className="p-5 text-left text-xs font-semibold text-gray-600 dark:text-gray-400">
              More
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {devices.map((device) => (
            <DeviceRow
              key={device.id}
              device={device}
              isSelected={selectedIds.includes(device.id)}
              onToggle={() => onToggle(device.id)}
              onPreview={() => onPreview(device)}
              onRename={() => onRename(device)}
              onReport={() => onReport(device)}
              onRemove={() => onRemove(device)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}