import React from "react";
import { Video, Clock, Play, Pause, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { Schedule } from "@/redux/api/users/schedules/schedules.type";
import { cn } from "@/lib/utils";

interface SchedulesTableProps {
    schedules: Schedule[];
    totalFiltered: number;
    currentPage: number;
    totalPages: number;
    setCurrentPage: (page: number | ((p: number) => number)) => void;
}

/**
 * Format an epoch-based ISO time string (e.g. "1970-01-01T08:00:00.000Z")
 * into a human-readable "HH:MM AM/PM" format.
 */
const formatTime = (isoTime: string): string => {
    try {
        const date = new Date(isoTime);
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const ampm = hours >= 12 ? "PM" : "AM";
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${String(minutes).padStart(2, "0")} ${ampm}`;
    } catch {
        return isoTime;
    }
};

const SchedulesTable: React.FC<SchedulesTableProps> = ({
    schedules,
    totalFiltered,
    currentPage,
    totalPages,
    setCurrentPage,
}) => {
    return (
        <div className="bg-navbarBg border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-border bg-bgGray/50 dark:bg-gray-800/50">
                            <th className="px-6 py-4 text-sm font-semibold text-muted">Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-muted">Play</th>
                            <th className="px-6 py-4 text-sm font-semibold text-muted">Schedule Time</th>
                            <th className="px-6 py-4 text-sm font-semibold text-muted">Assigned Screens</th>
                            <th className="px-6 py-4 text-sm font-semibold text-muted text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {schedules.map((schedule) => (
                            <tr key={schedule.id} className="hover:bg-bgGray/30 dark:hover:bg-gray-800/30 transition-colors">
                                <td className="px-6 py-5">
                                    <div className="font-bold text-headings dark:text-white">{schedule.name}</div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2 text-sm text-headings">
                                        <Video className="w-4 h-4 text-muted" />
                                        <span>{schedule.file?.originalName || "No content"}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-2 text-sm text-headings">
                                        <Clock className="w-4 h-4 text-muted" />
                                        <span>{formatTime(schedule.startTime)} - {formatTime(schedule.endTime)}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex flex-col gap-1">
                                        {schedule.programs && schedule.programs.length > 0 ? (
                                            schedule.programs.map((program) => (
                                                <div key={program.id} className="text-sm text-muted">
                                                    {program.name}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-sm text-muted">No programs assigned</div>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-5">
                                    <div className="flex items-center justify-end gap-3">
                                        <button className={cn("p-2 rounded-lg transition-colors cursor-pointer", schedule.isActive ? "text-muted hover:bg-gray-100" : "text-green-500 hover:bg-green-100")}>
                                            {schedule.isActive ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                                        </button>
                                        <Link href={`/schedules/${schedule.id}`} className="p-2 text-muted hover:text-bgBlue hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                                            <Edit2 className="w-5 h-5" />
                                        </Link>
                                        <button className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 md:p-6 border-t border-border">
                <div className="text-sm text-muted">
                    Showing {schedules.length} of {totalFiltered} schedules
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg font-medium shadow-customShadow cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-bgBlue transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg font-medium shadow-customShadow cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-bgBlue transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SchedulesTable;
