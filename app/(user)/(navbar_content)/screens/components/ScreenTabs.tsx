"use client";

import { useState } from "react";

const tabs = ["timeline", "schedule", "settings"] as const;
type Tab = typeof tabs[number];

interface Props {
  timelineContent: string[];
  scheduleContent: string[];
  settingsContent: string;
}

export default function ScreenTabs({ timelineContent, scheduleContent, settingsContent }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("timeline");

  return (
    <div className="mt-4 bg-white rounded-xl p-4 shadow-sm">
      {/* Tabs */}
      <div className="flex gap-4 mb-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 font-semibold ${
              activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "timeline" && (
          <div>
            {timelineContent.length === 0 ? (
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Add Content
              </button>
            ) : (
              timelineContent.map((item, idx) => (
                <p key={idx} className="py-1 border-b">{item}</p>
              ))
            )}
          </div>
        )}

        {activeTab === "schedule" && (
          <div>
            {scheduleContent.length === 0 ? (
              <p className="text-gray-400">No scheduled content</p>
            ) : (
              scheduleContent.map((item, idx) => <p key={idx} className="py-1 border-b">{item}</p>)
            )}
          </div>
        )}

        {activeTab === "settings" && <p>{settingsContent}</p>}
      </div>
    </div>
  );
}
