"use client";

import { useState } from "react";
import ScreenCard from "./components/ScreenCard";
import CreateScreenPopup from "./components/CreateScreenPopup";

export default function ScreensPage() {
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const screens = [
    { id: "1", title: "Lobby Screen", subtitle: "Main entrance", contentCount: 5, devicesCount: 3, lastUpdate: "2h ago", active: true },
    { id: "2", title: "Conference Room", subtitle: "Meeting area", contentCount: 2, devicesCount: 1, lastUpdate: "1d ago", active: false },
  ];

  const isEmpty = screens.length === 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">My Screens</h2>
        <button
          onClick={() => setShowCreatePopup(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create New Screen
        </button>
      </div>

      {/* Search + Filters */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search screens..."
          className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
        />
        <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Empty State */}
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-4">
          <p className="text-4xl">📺</p>
          <h3 className="text-xl font-semibold">No screens yet</h3>
          <p>Create screens to display your content</p>
          <button
            onClick={() => setShowCreatePopup(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create New Screen
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {screens.map((screen) => (
            <ScreenCard key={screen.id} {...screen} />
          ))}
        </div>
      )}

      {showCreatePopup && <CreateScreenPopup onClose={() => setShowCreatePopup(false)} />}
    </div>
  );
}
