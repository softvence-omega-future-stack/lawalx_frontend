"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { mockScreens, Screen } from "../../_data";

interface Step3Props {
    data: {
        selectedScreens: string[];
    };
    onChange: (data: { selectedScreens: string[] }) => void;
}

const Step3ScreenSelection: React.FC<Step3Props> = ({ data, onChange }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredScreens = mockScreens.filter((screen) =>
        screen.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        screen.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleScreen = (screenId: string) => {
        const updatedScreens = data.selectedScreens.includes(screenId)
            ? data.selectedScreens.filter(id => id !== screenId)
            : [...data.selectedScreens, screenId];

        onChange({ selectedScreens: updatedScreens });
    };

    return (
        <div className="space-y-4">
            {/* Search Field */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
                <Input
                    type="text"
                    placeholder="Search Screen"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-input border-borderGray text-headings"
                />
            </div>

            {/* Screen List */}
            <div className="max-h-[350px] overflow-y-auto pr-2 space-y-2">
                {filteredScreens.length === 0 ? (
                    <div className="text-center py-8 text-muted">
                        No screens found
                    </div>
                ) : (
                    filteredScreens.map((screen) => (
                        <div
                            key={screen.id}
                            onClick={() => toggleScreen(screen.id)}
                            className="flex items-center gap-3 p-4 rounded-lg border border-borderGray bg-input hover:border-bgBlue hover:bg-blue-50 dark:hover:bg-blue-950/20 cursor-pointer transition-all"
                        >
                            <Checkbox
                                id={screen.id}
                                checked={data.selectedScreens.includes(screen.id)}
                                onCheckedChange={() => toggleScreen(screen.id)}
                                className="cursor-pointer"
                            />

                            <div className="flex-1">
                                <Label htmlFor={screen.id} className="font-medium text-headings cursor-pointer">
                                    {screen.name}
                                </Label>
                                <p className="text-sm text-muted">
                                    {screen.location}
                                </p>
                            </div>

                            {/* Status Indicator */}
                            <div className={`w-2 h-2 rounded-full ${screen.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                        </div>
                    ))
                )}
            </div>

            {/* Selected Count */}
            {data.selectedScreens.length > 0 && (
                <div className="text-sm text-bgBlue font-medium">
                    {data.selectedScreens.length} screen{data.selectedScreens.length !== 1 ? 's' : ''} selected
                </div>
            )}
        </div>
    );
};

export default Step3ScreenSelection;
