"use client";

import { useState } from "react";
import ScheduleCard from "./components/ScheduleCard";
import ScheduleDetailsPopup from "./components/ScheduleDetailsPopup";

export default function SchedulesPage() {
  const [showDetails, setShowDetails] = useState(false);

  const schedules = [
    { title: "Morning Schedule", subtitle: "Lobby screen 8am-12pm" },
    { title: "Afternoon Schedule", subtitle: "Conference room 1pm-5pm" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">Content Scheduling</h2>
          <p className="text-gray-500 text-sm">Manage all scheduled content</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Create Schedule
        </button>
      </div>

      {/* Schedule Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {schedules.map((schedule, idx) => (
          <ScheduleCard
            key={idx}
            title={schedule.title}
            subtitle={schedule.subtitle}
            onClick={() => setShowDetails(true)}
          />
        ))}
      </div>

      {showDetails && (
        <ScheduleDetailsPopup
          title="Schedule Details"
          subtitle="Details for selected schedule"
          onClose={() => setShowDetails(false)}
        />
      )}
    </div>
  );
}
