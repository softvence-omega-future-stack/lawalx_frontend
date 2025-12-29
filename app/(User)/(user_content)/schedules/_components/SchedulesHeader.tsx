import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";

interface SchedulesHeaderProps {
    title: string;
    subtitle: string;
}

const SchedulesHeader: React.FC<SchedulesHeaderProps> = ({ title, subtitle }) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-headings dark:text-white">{title}</h1>
                <p className="text-muted text-sm mt-1">{subtitle}</p>
            </div>
            <Link
                href="/schedules/new"
                className="bg-bgBlue hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-customShadow transition cursor-pointer flex items-center gap-2"
            >
                <Plus className="w-5 h-5" />
                Schedule
            </Link>
        </div>
    );
};

export default SchedulesHeader;
