"use client";

import React from "react";
import BaseSelect from "@/common/BaseSelect";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface Step4Props {
    data: {
        repeat: string;
        selectedDays: string[];
        selectedDates: number[];
        playTime: string;
        startDate: string;
    };
    onChange: (data: any) => void;
}

const Step4ScheduleSettings: React.FC<Step4Props> = ({ data, onChange }) => {
    const repeatOptions = [
        { label: "Run Once", value: "run-once" },
        { label: "Daily", value: "daily" },
        { label: "Weekly", value: "weekly" },
        { label: "Monthly", value: "monthly" }
    ];

    const weekDays = [
        { short: "Mon", full: "Monday" },
        { short: "Tue", full: "Tuesday" },
        { short: "Wed", full: "Wednesday" },
        { short: "Thu", full: "Thursday" },
        { short: "Fri", full: "Friday" },
        { short: "Sat", full: "Saturday" },
        { short: "Sun", full: "Sunday" }
    ];

    const toggleDay = (day: string) => {
        const updatedDays = data.selectedDays.includes(day)
            ? data.selectedDays.filter(d => d !== day)
            : [...data.selectedDays, day];
        onChange({ ...data, selectedDays: updatedDays });
    };

    const toggleDate = (date: number) => {
        const updatedDates = data.selectedDates.includes(date)
            ? data.selectedDates.filter(d => d !== date)
            : [...data.selectedDates, date];
        onChange({ ...data, selectedDates: updatedDates });
    };

    return (
        <div className="space-y-6">
            {/* Repeat Selector */}
            <BaseSelect
                label="Repeat"
                placeholder="Select repeat type"
                options={repeatOptions}
                value={data.repeat}
                onChange={(value) => onChange({ ...data, repeat: value })}
                required
            />

            {/* Weekly Day Selector */}
            {data.repeat === "weekly" && (
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-headings">Select Days</Label>
                    <div className="flex flex-wrap gap-2">
                        {weekDays.map((day) => (
                            <button
                                key={day.short}
                                type="button"
                                onClick={() => toggleDay(day.short)}
                                className={cn(
                                    "px-4 py-2 rounded-lg border transition-all font-medium text-sm",
                                    data.selectedDays.includes(day.short)
                                        ? "bg-bgBlue text-white border-bgBlue"
                                        : "bg-input text-headings border-borderGray hover:border-bgBlue"
                                )}
                            >
                                {day.short}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Monthly Date Selector */}
            {data.repeat === "monthly" && (
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-headings">Select Days</Label>
                    <div className="grid grid-cols-7 gap-2">
                        {Array.from({ length: 30 }, (_, i) => i + 1).map((date) => (
                            <button
                                key={date}
                                type="button"
                                onClick={() => toggleDate(date)}
                                className={cn(
                                    "aspect-square rounded-lg border transition-all font-medium text-sm flex items-center justify-center",
                                    data.selectedDates.includes(date)
                                        ? "bg-bgBlue text-white border-bgBlue"
                                        : "bg-input text-headings border-borderGray hover:border-bgBlue"
                                )}
                            >
                                {date}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Play Time */}
            <div className="space-y-2">
                <Label className="text-sm font-medium text-headings">
                    Play Time <span className="text-red-500">*</span>
                </Label>
                <Input
                    type="time"
                    value={data.playTime}
                    onChange={(e) => onChange({ ...data, playTime: e.target.value })}
                    className="bg-input border-borderGray text-headings"
                />
            </div>

            {/* Start Date Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label className="text-sm font-medium text-headings">
                        {data.repeat === "run-once" ? "Select Date" : "Start Date"} <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        type="date"
                        value={data.startDate}
                        onChange={(e) => onChange({ ...data, startDate: e.target.value })}
                        className="bg-input border-borderGray text-headings"
                    />
                </div>

                {data.repeat !== "run-once" && (
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-headings">
                            Start Date <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            type="date"
                            value={data.startDate}
                            onChange={(e) => onChange({ ...data, startDate: e.target.value })}
                            className="bg-input border-borderGray text-headings"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Step4ScheduleSettings;
