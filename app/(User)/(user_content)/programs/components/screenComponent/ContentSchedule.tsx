"use client";

import { Plus, ChevronDown, Clock, Video, Edit, Pause, Play, X, CalendarClock } from "lucide-react";
import { useState } from "react";
import AddExistingDialog from "./AddExistingDialog";

interface Schedule {
  id: number;
  title: string;
  description: string;
  fileName: string;
  days: string;
  time: string;
  status: "playing" | "upcoming" | "stopped";
}

const defaultSchedules: Schedule[] = [
  {
    id: 1,
    title: "Morning Content",
    description: "Welcome content during morning hours",
    fileName: "Welcome.MP4",
    days: "Mon, Tue, Wed, Thu, Fri",
    time: "09:00 AM",
    status: "playing",
  },
  {
    id: 2,
    title: "Morning Content",
    description: "Welcome content during morning hours",
    fileName: "Welcome.MP4",
    days: "Mon, Tue, Wed, Thu, Fri",
    time: "09:00 AM",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Morning Content",
    description: "Welcome content during morning hours",
    fileName: "Welcome.MP4",
    days: "Mon, Tue, Wed, Thu, Fri",
    time: "09:00 AM",
    status: "stopped",
  },
];

const ContentSchedule = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scheduleList, setScheduleList] = useState<Schedule[]>(defaultSchedules);
  const [open, setOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const badges = {
      playing: "bg-blue-100 text-blue-600",
      upcoming: "bg-orange-100 text-orange-600",
      stopped: "bg-red-100 text-red-600",
    };
    const labels = {
      playing: "Playing",
      upcoming: "Will play in 1 hour",
      stopped: "Stopped",
    };
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="w-full">
      <div className="bg-navbarBg rounded-2xl border border-border p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h2 className="text-xl sm:text-2xl font-bold text-headngs">Content Schedule</h2>

          {/* Add Schedule Button with Dropdown */}
          <div className="relative w-full sm:w-auto">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="rounded-lg transition-all flex items-center justify-center gap-2 text-white py-2.5 px-4 cursor-pointer bg-bgBlue hover:bg-[#00A4FF] w-full sm:w-auto font-semibold shadow-customShadow"
            >
              <Plus className="w-5 h-5" />
              Add Schedule
              <ChevronDown className="w-4 h-4" />
            </button>

            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                <div className="absolute right-0 top-12 z-20 bg-navbarBg rounded-lg shadow-xl border border-border py-2 w-full sm:w-48">
                  <button onClick={() => setOpen(true)} className="w-full px-4 py-2.5 text-left text-sm font-medium text-body hover:text-bgBlue transition-colors cursor-pointer">
                    <CalendarClock className="w-4 h-4 md:w-5 md:h-5 inline mr-1" /> Add Existing
                  </button>
                  <div className="border-t border-border my-1" />
                  <button className="w-full px-4 py-2.5 text-left text-sm font-medium text-body hover:text-bgBlue transition-colors cursor-pointer">
                    <Plus className="w-4 h-4 md:w-5 md:h-5 inline mr-1" /> Create New
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Schedule Cards */}
        <div className="space-y-4">
          {scheduleList.map((schedule) => (
            <div
              key={schedule.id}
              className="bg-navbarBg rounded-xl border border-border hover:shadow-sm transition-shadow"
            >
              {/* Card Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 p-4 sm:p-6">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-base sm:text-lg font-semibold text-headings">
                      {schedule.title}
                    </h3>
                    {getStatusBadge(schedule.status)}
                  </div>
                  <p className="text-sm text-muted">{schedule.description}</p>
                </div>

                <button className="rounded-lg transition-all flex items-center justify-center gap-1.5 text-gray-700 hover:text-gray-900 py-2 px-3 cursor-pointer bg-white hover:bg-gray-50 border border-gray-300 font-medium text-sm self-start shadow-customShadow">
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
              </div>

              <div className="border-t border-borderGray"></div>
              {/* Card Content */}
              <div className="space-y-2 p-4 sm:p-6">
                <div className="flex items-center gap-2 text-sm text-body">
                  <Video className="w-4 h-4 text-muted" />
                  <span className="font-medium">Play:</span>
                  <span>{schedule.fileName}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-body">
                  <Clock className="w-4 h-4 text-muted" />
                  <span>
                    {schedule.days} • {schedule.time}
                  </span>
                </div>
              </div>
              <div className="border-t border-borderGray"></div>
              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 p-4 sm:p-6">
                <button
                  className={`shadow-customShadow rounded-full transition-all flex items-center justify-center text-white py-3 px-3 cursor-pointer ${schedule.status === "stopped"
                    ? "bg-bgBlue hover:bg-[#00A4FF]"
                    : "bg-[#F97316] hover:bg-orange-600"
                    }`}
                  title={schedule.status === "stopped" ? "Play" : "Pause"}
                >
                  {schedule.status === "stopped" ? (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </button>

                <button
                  className="rounded-lg transition-all flex items-center justify-center gap-1.5 text-white py-2 px-4 md:py-3 cursor-pointer bg-red-500 hover:bg-red-600 font-medium text-sm shadow-customShadow"
                >
                  <X className="w-4 h-4" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {open && <AddExistingDialog open={open} setOpen={setOpen} />}
    </div>
  );
};

export default ContentSchedule;