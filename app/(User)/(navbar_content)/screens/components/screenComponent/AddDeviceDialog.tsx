"use client";

import { useState } from "react";
import BaseDialog from "@/common/BaseDialog";
import { QrCode, WifiOff } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

interface Device {
    id: number;
    name: string;
    online: boolean;
    resolution: string;
}

interface AddDeviceDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const AddDeviceDialog = ({ open, setOpen }: AddDeviceDialogProps) => {
    const [devices] = useState<Device[]>([
        { id: 1, name: "LG UR75 43 Inch 4K UHD Smart LED TV", online: true, resolution: "1920x1080" },
        { id: 2, name: "LG UR75 43 Inch 4K UHD Smart LED TV", online: false, resolution: "1280x720" },
    ]);

    const [formData, setFormData] = useState<{ selectedDevices: number[] }>({
        selectedDevices: [],
    });

    const [newDevicePin, setNewDevicePin] = useState("");

    const toggleDeviceSelection = (id: number) => {
        setFormData((prev) => {
            const selected = prev.selectedDevices.includes(id)
                ? prev.selectedDevices.filter((d) => d !== id)
                : [...prev.selectedDevices, id];
            return { ...prev, selectedDevices: selected };
        });
    };

    const handleAddDevice = () => {
        if (!newDevicePin) return;
        console.log("Adding device with PIN:", newDevicePin);
        setNewDevicePin("");
    };

    return (
        <BaseDialog
            open={open}
            setOpen={setOpen}
            title="Add Device"
            description=""
            maxWidth="xl"
            maxHeight="lg"
        >
            <div className="flex flex-col">
                {/* Top border under title */}
                <div className="border-t border-borderGray"></div>

                {/* Main content */}
                <div className="border-b border-borderGray pb-6 mt-5 space-y-6">
                    {/* Select Devices */}
                    <div>
                        <label className="block text-base font-semibold text-gray-900 mb-3">
                            Select Devices
                        </label>
                        <div className="border border-borderGray rounded-xl divide-y">
                            {devices.map((device) => {
                                const isSelected = formData.selectedDevices.includes(device.id);
                                return (
                                    <div
                                        key={device.id}
                                        className={`flex flex-row items-start gap-3 sm:gap-4 p-4 sm:p-6 cursor-pointer transition-colors ${isSelected ? "bg-gray-50" : ""
                                            }`}
                                        onClick={() => toggleDeviceSelection(device.id)}
                                    >
                                        <div
                                            className="flex items-center"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <Checkbox
                                                checked={isSelected}
                                                onCheckedChange={() => toggleDeviceSelection(device.id)}
                                                className="border-borderGray data-[state=checked]:bg-bgBlue data-[state=checked]:border-bgBlue cursor-pointer"
                                            />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 sm:gap-4">
                                                <span className="font-semibold text-sm sm:text-base text-gray-900">
                                                    {device.name}
                                                </span>
                                                <span
                                                    className={`text-xs px-2 py-1 border rounded-md flex items-center gap-1 ${device.online
                                                            ? "bg-green-50 text-green-700 border-green-200"
                                                            : "bg-red-50 text-red-700 border-red-200"
                                                        }`}
                                                >
                                                    {device.online ? (
                                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                    ) : (
                                                        <WifiOff className="w-3 h-3" />
                                                    )}
                                                    {device.online ? "Online" : "Offline"}
                                                </span>
                                            </div>
                                            <div className="text-xs text-gray-500 truncate mt-1 sm:mt-0">
                                                {device.resolution}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Add New Device */}
                    <div className="px-1">
                        <label className="block text-sm font-semibold text-gray-900 mb-3">
                            Add New Device
                        </label>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                            <input
                                type="text"
                                placeholder="Enter the PIN or scan the QR code"
                                value={newDevicePin}
                                onChange={(e) => setNewDevicePin(e.target.value)}
                                className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm sm:text-base text-gray-900"
                            />
                            <div className="flex gap-3 w-full sm:w-auto">
                                <button className="flex-1 sm:flex-none p-3 border border-borderGray rounded-lg bg-bgGray cursor-pointer">
                                    <QrCode className="w-6 h-6 text-gray-800 mx-auto" />
                                </button>
                                <button
                                    onClick={handleAddDevice}
                                    disabled={!newDevicePin.trim()}
                                    className="flex-1 sm:flex-none px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer buttons */}
                <div className="mt-6 flex flex-col sm:flex-row justify-end sm:justify-between gap-3 sm:gap-4">
                    <button className="w-full sm:w-auto px-4 md:px-5 py-2 md:py-3 text-gray-900 border border-textGray rounded-lg hover:bg-gray-100 font-semibold text-sm md:text-base cursor-pointer">
                        Cancel
                    </button>
                    <button className="w-full sm:w-auto px-4 md:px-5 py-2 md:py-3 text-white bg-bgBlue border border-bgBlue rounded-lg hover:bg-blue-500 font-semibold text-sm md:text-base cursor-pointer">
                        Add Device
                    </button>
                </div>
            </div>
        </BaseDialog>
    );
};

export default AddDeviceDialog;
