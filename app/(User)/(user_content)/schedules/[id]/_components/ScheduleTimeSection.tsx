import React from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import BaseSelect from "@/common/BaseSelect";

interface ScheduleTimeSectionProps {
    repeat: string;
    setRepeat: (val: string) => void;
}

const ScheduleTimeSection: React.FC<ScheduleTimeSectionProps> = ({ repeat, setRepeat }) => {
    return (
        <section className="bg-navbarBg border border-border rounded-xl p-6 space-y-4 shadow-sm">
            <h2 className="text-lg font-bold text-headings dark:text-white">Schedule Time</h2>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-sm font-semibold text-headings dark:text-white">Repeat *</label>
                    <BaseSelect
                        value={repeat}
                        onChange={setRepeat}
                        options={[
                            { label: "Run Once", value: "Run Once" },
                            { label: "Daily", value: "Daily" },
                            { label: "Weekly", value: "Weekly" },
                            { label: "Monthly", value: "Monthly" },
                        ]}
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-headings dark:text-white">Select Date *</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="MM/YY"
                                className="w-full pl-4 pr-10 py-3 bg-input border border-border rounded-lg "
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-headings dark:text-white">Play Time *</label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="09:00 AM"
                                className="w-full pl-4 pr-10 py-3 bg-input border border-border rounded-lg"
                            />
                            <Clock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ScheduleTimeSection;
