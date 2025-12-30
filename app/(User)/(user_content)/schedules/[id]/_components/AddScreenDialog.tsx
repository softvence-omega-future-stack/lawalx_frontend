import React, { useState } from "react";
import { Search, Monitor } from "lucide-react";
import BaseDialog from "@/common/BaseDialog";
import { mockScreens } from "../../_data";

interface AddScreenDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddScreenDialog: React.FC<AddScreenDialogProps> = ({ isOpen, onClose }) => {
    const [search, setSearch] = useState("");

    return (
        <BaseDialog
            open={isOpen}
            setOpen={onClose}
            title="Add Screen"
            description="Select screens to assign to this schedule"
            className="max-w-2xl"
        >
            <div className="space-y-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search screen..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg"
                    />
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {mockScreens.map((screen) => (
                        <div key={screen.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-bgGray/30 transition-colors">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                    <Monitor className="w-5 h-5 text-bgBlue" />
                                </div>
                                <div>
                                    <div className="font-bold text-headings dark:text-white">{screen.name}</div>
                                    <div className="text-xs text-muted">{screen.location}</div>
                                </div>
                            </div>
                            <input type="checkbox" className="w-5 h-5 accent-bgBlue rounded border-gray-300 cursor-pointer" />
                        </div>
                    ))}
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-border">
                    <button onClick={onClose} className="px-6 py-2.5 text-muted hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition cursor-pointer shadow-customShadow">
                        Cancel
                    </button>
                    <button onClick={onClose} className="px-6 py-2.5 bg-bgBlue text-white rounded-lg font-semibold hover:bg-blue-500 transition shadow-customShadow cursor-pointer">
                        Add Screens
                    </button>
                </div>
            </div>
        </BaseDialog>
    );
};

export default AddScreenDialog;
