/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { FC, useState, useEffect } from "react";
import { Trash2, Loader2 } from "lucide-react";
import AddDeviceDialog from "./AddDeviceDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import DeleteConfirmationModal from "@/components/Admin/modals/DeleteConfirmationModal";

import { Program, Device } from "@/redux/api/users/programs/programs.type";
import { useDeleteProgramMutation } from "@/redux/api/users/programs/programs.api";

interface ScreenSettingsProps {
    program: Program;
    name: string;
    setName: (name: string) => void;
    description: string;
    setDescription: (desc: string) => void;
}

const ScreenSettings: FC<ScreenSettingsProps> = ({
    program,
    name,
    setName,
    description: desc,
    setDescription: setDesc,
}) => {
    const router = useRouter();
    const [deleteProgram, { isLoading: isDeleting }] = useDeleteProgramMutation();
    const [connectedDevices, setConnectedDevices] = useState<Device[]>([]);
    const [open, setOpen] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    useEffect(() => {
        if (program) {
            setConnectedDevices(program.devices || []);
        }
    }, [program]);

    // const handleRemoveDevice = (id: string) => {
    //     setConnectedDevices(connectedDevices.filter((device) => device.id !== id));
    // };

    const handleDeleteProgram = async () => {
        try {
            const res = await deleteProgram({ id: program.id }).unwrap();
            toast.success(res.message || "Program deleted successfully");
            router.push("/programs");
        } catch (error: any) {
            toast.error(error.message || "Failed to delete program");
        }
    };

    return (
        <div className="mx-auto min-h-screen">
            <div className="bg-navbarBg rounded-xl border border-borderGray p-4 sm:p-6">
                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-headings mb-2">Screen Settings</h2>
                    <p className="text-sm sm:text-base text-muted">
                        Manage device configuration and connected screens
                    </p>
                </div>

                <div className="mb-6">
                    <label className="block text-sm sm:text-base font-medium text-headings mb-2">Screen Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Conference Room Display"
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm sm:text-base text-gray-900 bg-input placeholder:text-muted"
                    />
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-sm sm:text-base font-medium text-headings mb-2">Description</label>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Display for meeting room presentations and schedules"
                        rows={3}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-sm sm:text-base text-gray-900 resize-none placeholder:text-muted bg-input"
                    />
                </div>

                {/* Connected Devices */}
                {/* <div className="mb-6">
                    <h3 className="text-base sm:text-xl font-medium text-headings mb-2">Connected Devices</h3>
                    <p className="text-sm sm:text-base text-muted mb-4">
                        Manage devices connected to this screen
                    </p>

                    <div className="space-y-3 mb-6">
                        {connectedDevices.map((device) => (
                            <div
                                key={device.id}
                                className="flex  items-start sm:items-center gap-3 sm:gap-4 p-4 sm:p-6 bg-bgGray border border-borderGray rounded-xl hover:border-gray-300 transition-colors"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                                        <span className="font-semibold text-base sm:text-lg text-headings">{device.name}</span>
                                        {device.status === "ONLINE" && (
                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs sm:text-sm font-medium rounded-full w-fit">
                                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                                Online
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm sm:text-base text-muted">{device.location || "No location"}</p>
                                </div>
                                <button
                                    onClick={() => handleRemoveDevice(device.id)}
                                    className="shrink-0 p-2 border border-border bg-white cursor-pointer hover:bg-gray-200 rounded-lg shadow-customShadow transition-colors"
                                >
                                    <Trash2 className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => setOpen(true)}
                        className="w-full py-2.5 border-2 border-bgBlue text-bgBlue hover:bg-gray-100 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                        <Plus className="w-4 sm:w-6 h-4 sm:h-6 text-bgBlue font-semibold" />
                        Add Devices
                    </button>
                </div> */}

                {/* Delete Screen */}
                <div className="mt-6 p-4 sm:p-6 rounded-xl bg-red-50">
                    <div className="p-3 rounded-lg flex items-start">
                        <p className="text-sm sm:text-base text-[#991B1B]">
                            These actions cannot be undone. Please proceed with caution.
                        </p>
                    </div>
                    <button
                        onClick={() => setOpenDeleteDialog(true)}
                        disabled={isDeleting}
                        className="w-full sm:w-auto px-4 sm:px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-customShadow disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="w-4 sm:w-5 h-4 sm:h-5 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            <>
                                <Trash2 className="w-4 sm:w-5 h-4 sm:h-5" />
                                Delete Screen
                            </>
                        )}
                    </button>
                </div>
            </div>
            {open && <AddDeviceDialog open={open} setOpen={setOpen} />}
            <DeleteConfirmationModal
                isOpen={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
                onConfirm={handleDeleteProgram}
                title="Delete Program"
                description="Are you sure you want to delete this program? This action cannot be undone."
                itemName={program.name}
            />
        </div>
    );
};

export default ScreenSettings;
