import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const CalendarView: React.FC = () => {
    const [activeDate, setActiveDate] = useState(new Date());
    const [viewType, setViewType] = useState<"Day" | "Week" | "Month">("Month");

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    // Navigation logic
    const navigatePrev = () => {
        const next = new Date(activeDate);
        if (viewType === "Month") next.setMonth(next.getMonth() - 1);
        else if (viewType === "Week") next.setDate(next.getDate() - 7);
        else next.setDate(next.getDate() - 1);
        setActiveDate(next);
    };

    const navigateNext = () => {
        const next = new Date(activeDate);
        if (viewType === "Month") next.setMonth(next.getMonth() + 1);
        else if (viewType === "Week") next.setDate(next.getDate() + 7);
        else next.setDate(next.getDate() + 1);
        setActiveDate(next);
    };

    const setToday = () => setActiveDate(new Date());

    const getHeaderLabel = () => {
        if (viewType === "Month") {
            return activeDate.toLocaleString("default", { month: "short", year: "numeric" });
        } else if (viewType === "Week") {
            const start = new Date(activeDate);
            start.setDate(activeDate.getDate() - activeDate.getDay());
            const end = new Date(start);
            end.setDate(start.getDate() + 6);
            return `${start.toLocaleString("default", { month: "short", day: "numeric" })} - ${end.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" })}`;
        } else {
            return activeDate.toLocaleString("default", { month: "short", day: "numeric", year: "numeric" });
        }
    };

    // Month Logic
    const firstDayOfMonth = new Date(activeDate.getFullYear(), activeDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(activeDate.getFullYear(), activeDate.getMonth() + 1, 0).getDate();

    const renderMonth = () => {
        const days = [];
        const prevMonthLastDay = new Date(activeDate.getFullYear(), activeDate.getMonth(), 0).getDate();
        for (let i = firstDayOfMonth - 1; i >= 0; i--) days.push({ day: prevMonthLastDay - i, current: false });
        for (let i = 1; i <= daysInMonth; i++) days.push({ day: i, current: true });
        const remaining = 42 - days.length;
        for (let i = 1; i <= remaining; i++) days.push({ day: i, current: false });

        return (
            <div className="grid grid-cols-7 border-b border-border">
                {days.map((item, i) => {
                    const isToday = item.current && item.day === new Date().getDate() && activeDate.getMonth() === new Date().getMonth();
                    return (
                        <div key={i} className={cn(
                            "min-h-[120px] p-2 border-r border-b border-border last:border-r-0 relative hover:bg-bgGray/20 transition-colors",
                            !item.current && "bg-bgGray/10"
                        )}>
                            <span className={cn(
                                "text-sm font-medium w-8 h-8 flex items-center justify-center rounded-full",
                                isToday ? "bg-bgBlue text-white" : "text-muted",
                                !item.current && "text-gray-300"
                            )}>{item.day}</span>
                            {item.current && item.day === 17 && (
                                <Link href="/schedules/1" className="block mt-2 px-3 py-1 bg-bgBlue text-white text-[10px] rounded-lg truncate">Schedule 1</Link>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderWeek = () => {
        const start = new Date(activeDate);
        start.setDate(activeDate.getDate() - activeDate.getDay());
        return (
            <div className="grid grid-cols-7 border-b border-border">
                {Array.from({ length: 7 }).map((_, i) => {
                    const day = new Date(start);
                    day.setDate(start.getDate() + i);
                    const isToday = day.toDateString() === new Date().toDateString();
                    return (
                        <div key={i} className={cn("min-h-[400px] p-2 border-r border-border last:border-r-0 transition-colors", isToday && "bg-blue-50/30")}>
                            <div className="text-center mb-4">
                                <div className="text-[10px] font-bold text-muted uppercase tracking-wider">{daysOfWeek[i].slice(0, 3)}</div>
                                <div className={cn("text-lg font-bold w-10 h-10 flex items-center justify-center rounded-full mx-auto mt-1", isToday ? "bg-bgBlue text-white" : "text-headings")}>{day.getDate()}</div>
                            </div>
                            {i === 2 && (
                                <Link href="/schedules/1" className="block p-2 bg-bgBlue/10 border-l-2 border-bgBlue rounded text-xs font-bold text-bgBlue hover:bg-bgBlue/20 transition-colors">
                                    Morning Content
                                </Link>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    const renderDay = () => {
        const hours = Array.from({ length: 24 }).map((_, i) => i);
        return (
            <div className="divide-y divide-border">
                {hours.map((hour) => (
                    <div key={hour} className="flex min-h-[60px] hover:bg-bgGray/20 transition-colors">
                        <div className="w-16 p-4 text-right text-[10px] font-bold text-muted border-r border-border">
                            {hour === 0 ? "12 AM" : hour < 12 ? `${hour} AM` : hour === 12 ? "12 PM" : `${hour - 12} PM`}
                        </div>
                        <div className="flex-1 p-2 relative">
                            {hour === 10 && (
                                <Link href="/schedules/1" className="block p-3 bg-bgBlue text-white rounded-lg text-xs font-bold w-3/4 hover:bg-blue-600 transition-colors">
                                    Morning Ad Campaign
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-2">
                <div className="flex items-center gap-4">
                    <h2 className="text-lg font-bold text-headings dark:text-white">Schedule Calendar</h2>
                    <div className="flex items-center gap-2">
                        <button onClick={setToday} className="px-3 py-1 text-sm font-medium border border-border rounded-lg hover:bg-gray-50 transition shadow-sm">Today</button>
                        <div className="flex items-center gap-1 ml-2">
                            <button onClick={navigatePrev} className="p-1.5 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
                            <button onClick={navigateNext} className="p-1.5 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
                        </div>
                        <span className="text-sm font-semibold text-headings dark:text-white ml-2 min-w-[120px]">{getHeaderLabel()}</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 border border-border rounded-lg p-1 bg-bgGray dark:bg-gray-800">
                    {["Day", "Week", "Month"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setViewType(type as any)}
                            className={cn(
                                "px-4 py-1.5 text-sm font-medium rounded-md transition-all",
                                viewType === type ? "bg-white dark:bg-gray-700 text-bgBlue shadow-sm" : "text-gray-500"
                            )}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-navbarBg border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="grid grid-cols-7 border-b border-border bg-bgGray/30 dark:bg-gray-800/30">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="px-4 py-3 text-center text-sm font-semibold text-muted border-r border-border last:border-r-0">
                            {day}
                        </div>
                    ))}
                </div>
                {viewType === "Month" && renderMonth()}
                {viewType === "Week" && renderWeek()}
                {viewType === "Day" && renderDay()}
            </div>
        </div>
    );
};

export default CalendarView;
