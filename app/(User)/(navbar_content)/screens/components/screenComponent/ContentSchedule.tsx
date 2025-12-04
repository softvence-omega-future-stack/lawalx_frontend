"use client";

import { Plus, ChevronDown, Clock, Trash2, PenLine, StretchVertical, ListMusic, CalendarPlus2 } from "lucide-react";
import { useState } from "react";
import AddScheduleDialog from "./AddScheduleDialog";

interface Schedule {
    id: number;
    title: string;
    description: string;
    content: string;
    days: string;
    time: string;
}

interface ContentScheduleProps {
    schedules?: Schedule[];
}

const defaultSchedules: Schedule[] = [
    {
        id: 1,
        title: "Morning Content",
        description: "Play welcome content during morning hours",
        content: "Play welcome content during morning hours",
        days: "Mon, Tue, Wed, Thu, Fri",
        time: "09:00 AM",
    },
];

const ContentSchedule: React.FC<ContentScheduleProps> = ({ schedules = defaultSchedules }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [scheduleList, setScheduleList] = useState<Schedule[]>(schedules);
    const [open, setOpen] = useState(false);

    const handleDeleteSchedule = (id: number) => {
        setScheduleList(scheduleList.filter(schedule => schedule.id !== id));
    };

    const handleUseExisting = () => {
        console.log("Use Existing Schedule");
        setIsDropdownOpen(false);
    };

    return (
        <div className="mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
                {/* Header section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-0">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-900">Content Schedule</h2>

                    {/* Add Schedule Dropdown */}
                    <div className="relative w-full sm:w-auto">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 w-full sm:w-auto justify-center bg-bgBlue hover:bg-blue-500 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm md:text-base font-semibold cursor-pointer transition-colors"
                        >
                            <Plus className="w-6 h-6" />
                            Add Schedule
                            <ChevronDown className="w-6 h-6" />
                        </button>

                        {isDropdownOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                                <div className="absolute right-0 top-12 z-20 bg-white rounded-lg shadow-[0_0_16px_0_rgba(0,0,0,0.15)] py-1 w-full sm:w-56 md:w-60">
                                    <button
                                        onClick={handleUseExisting}
                                        className="w-full px-4 py-2.5 text-left text-sm md:text-base font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                                    >
                                        <CalendarPlus2 className="w-4 h-4 md:w-6 md:h-6 text-gray-700" />
                                        Use Existing Schedule
                                    </button>
                                    <div className="border-t border-gray-100 my-1" />
                                    <button
                                        onClick={() => setOpen(true)}
                                        className="w-full px-4 py-2.5 text-left text-sm md:text-base font-semibold text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                                    >
                                        <Plus className="w-4 h-4 md:w-6 md:h-6 text-gray-700" />
                                        Create New Schedule
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Schedule Cards */}
                <div className="space-y-4">
                    {scheduleList.map(schedule => (
                        <div
                            key={schedule.id}
                            className="bg-gray-100 rounded-xl border border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row justify-between gap-4 sm:gap-6"
                        >
                            <div className="flex-1">
                                <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2">{schedule.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{schedule.description}</p>

                                <div className="space-y-2">
                                    <div className="flex items-start sm:items-center gap-2 text-sm text-gray-700">
                                        <ListMusic className="w-5 h-5" />
                                        <span>{schedule.content}</span>
                                    </div>
                                    <div className="flex items-start sm:items-center gap-2 text-sm text-gray-700">
                                        <Clock className="w-5 h-5" />
                                        <span>{schedule.days} • {schedule.time}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="shrink-0 flex gap-3 sm:gap-6">
                                <button>
                                    <StretchVertical className="w-5 h-5 md:w-6 md:h-6 text-green-500" />
                                </button>
                                <button>
                                    <PenLine className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
                                </button>
                                <button onClick={() => handleDeleteSchedule(schedule.id)}>
                                    <Trash2 className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Schedule Dialog */}
            {open && <AddScheduleDialog open={open} setOpen={setOpen} />}
        </div>
    );
};

export default ContentSchedule;
