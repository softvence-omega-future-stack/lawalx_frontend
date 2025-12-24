"use client";

import { useState } from "react";
import BaseDialog from "@/common/BaseDialog";
import { Search, Clock, ListMusic } from "lucide-react";

interface Schedule {
  id: number;
  title: string;
  description: string;
  content: string;
  days: string;
  time: string;
}

interface AddScheduleDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const defaultSchedules: Schedule[] = [
  {
    id: 1,
    title: "Morning Content",
    description: "Play welcome content during morning hours",
    content: "Play slides and videos",
    days: "Mon, Tue, Wed, Thu, Fri",
    time: "09:00 AM",
  },
  {
    id: 2,
    title: "Afternoon Content",
    description: "Play content in the afternoon",
    content: "Play slides and videos",
    days: "Mon, Tue, Wed, Thu, Fri",
    time: "01:00 PM",
  },
  {
    id: 3,
    title: "Evening Content",
    description: "Play closing content in the evening",
    content: "Play announcements",
    days: "Mon, Tue, Wed, Thu, Fri",
    time: "06:00 PM",
  },
];

const AddScheduleDialog: React.FC<AddScheduleDialogProps> = ({ open, setOpen }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSchedules = defaultSchedules.filter(
    (schedule) =>
      schedule.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BaseDialog
      open={open}
      setOpen={setOpen}
      title="Add Existing Schedule"
      description="Select from your existing schedules to assign to this device."
      maxWidth="xl"
      maxHeight="xl"
    >
      {/* Search Input */}
      <div className="mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 md:py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Schedule List */}
      <div className="space-y-4">
        {filteredSchedules.map((schedule) => (
          <div
            key={schedule.id}
            className="bg-gray-50 rounded-xl border border-gray-200 p-6 flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <h3 className="text-base md:text-xl font-medium text-gray-900 mb-2">
                {schedule.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{schedule.description}</p>

              <div className="flex flex-col md:flex-row md:gap-6 gap-2 items-start md:items-center text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <ListMusic className="w-5 h-5" />
                  <span>{schedule.content}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>
                    {schedule.days} • {schedule.time}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </BaseDialog>
  );
};

export default AddScheduleDialog;
