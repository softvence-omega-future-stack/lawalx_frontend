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

export default function DeviceActionsMenu({ onPreview, onRename, onReport, onRemove }: Props) {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
      <button onClick={onPreview} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3">
        <Eye className="w-4 h-4" /> Preview
      </button>
      <button onClick={onRename} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 border-t">
        <PenLine className="w-4 h-4" /> Rename
      </button>
      <button onClick={onReport} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50 flex items-center gap-3 border-t">
        <CircleHelp className="w-4 h-4" /> Report
      </button>
      <button onClick={onRemove} className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 border-t">
        <Trash2 className="w-4 h-4" /> Remove Device
      </button>
    </div>
  );
}