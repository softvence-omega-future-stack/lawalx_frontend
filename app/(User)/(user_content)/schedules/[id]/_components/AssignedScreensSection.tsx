import React from "react";
import { Plus, ChevronLeft, X, Trash2 } from "lucide-react";
import { Schedule } from "../../_data";

interface AssignedScreensSectionProps {
    assignedScreens: Schedule["assignedScreens"];
    onAddScreen: () => void;
}

const AssignedScreensSection: React.FC<AssignedScreensSectionProps> = ({ assignedScreens, onAddScreen }) => {
    return (
        <section className="bg-navbarBg border border-border rounded-xl p-6 space-y-4 shadow-sm">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold text-headings dark:text-white">Assigned Screens</h2>
                <button
                    onClick={onAddScreen}
                    className="flex items-center gap-2 px-4 py-2 bg-bgBlue text-white text-sm font-semibold rounded-lg hover:bg-blue-500 transition cursor-pointer shadow-customShadow"
                >
                    <Plus className="w-4 h-4" />
                    Add Screen
                </button>
            </div>

            <div className="divide-y divide-border">
                {assignedScreens.map((group) => (
                    <div key={group.groupId} className="py-4 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ChevronLeft className="w-4 h-4 text-gray-400 -rotate-90 cursor-pointer" />
                                <span className="font-bold text-headings dark:text-white">{group.groupName}</span>
                            </div>
                            <button className="text-red-500 hover:text-red-600 cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="pl-6 space-y-2">
                            {group.screens.map((screen) => (
                                <div key={screen.id} className="flex items-center gap-3">
                                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-bgBlue rounded border-gray-300 cursor-pointer" />
                                    <span className="text-sm text-muted">{screen.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Warning Section */}
            <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-xl">
                <p className="text-sm text-red-600 dark:text-red-400">These actions cannot be undone. Please proceed with caution.</p>
                <div className="flex justify-end">
                    <button className="mt-4 flex items-center justify-center gap-2 w-full sm:w-1/4 py-2.5 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition shadow-customShadow cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                        Delete Schedule
                    </button>
                </div>
            </div>
        </section>
    );
};

export default AssignedScreensSection;
