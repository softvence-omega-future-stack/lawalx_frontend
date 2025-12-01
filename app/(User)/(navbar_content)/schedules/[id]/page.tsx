// app/schedules/[id]/page.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Pause,
  Play,
  Trash2,
  Clock,
  Calendar,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { notFound } from "next/navigation";

interface Schedule {
  id: string;
  name: string;
  description: string;
  content: string[];
  devices: string[];
  repeat: "once" | "daily" | "weekly" | "monthly";
  days?: string[];
  monthlyDays?: string[];
  playTime?: string;
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
  active: boolean;
}

const allDevices = [
  "Main Lobby Display",
  "Building A, Ground Floor",
  "Building A, 2nd Floor",
  "Building B, Ground Floor",
  "Cafeteria Display",
];

const deviceStatus = {
  "Main Lobby Display": "online",
  "Building A, Ground Floor": "online",
  "Building A, 2nd Floor": "offline",
  "Building B, Ground Floor": "offline",
  "Cafeteria Display": "offline",
} as const;

export default function ScheduleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [showToast, setShowToast] = useState(false);

  const saveToStorage = (sched?: Schedule | null) => {
    const toSave = sched ?? schedule;
    if (!toSave) return;
    const all = JSON.parse(localStorage.getItem("schedules") || "[]");
    const updated = all.map((s: Schedule) => (s.id === toSave.id ? toSave : s));
    localStorage.setItem("schedules", JSON.stringify(updated));

    // Show toast
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
  };

  useEffect(() => {
    const saved = localStorage.getItem("schedules");
    if (saved) {
      const all: Schedule[] = JSON.parse(saved);
      const found = all.find((s) => s.id === params.id);
      if (found) setSchedule(found);
      else notFound();
    } else {
      notFound();
    }
  }, [params.id]);

  // Don't attempt to render the page until the schedule is loaded
  if (!schedule) return null;

  const toggleActive = () => {
    setSchedule((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, active: !prev.active };
      saveToStorage(updated);
      return updated;
    });
  };

  const deleteSchedule = () => {
    const all = JSON.parse(localStorage.getItem("schedules") || "[]");
    localStorage.setItem(
      "schedules",
      JSON.stringify(all.filter((s: Schedule) => s.id !== schedule.id))
    );
    router.push("/schedules");
  };

  return (
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <Link
            href="/schedules"
            className="flex items-start gap-3 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-6 h-6 mt-1" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {schedule.name}
              </h1>
              <p className="text-sm text-gray-500">
                {schedule.description || "No description"}
              </p>
            </div>
          </Link>
          <div className="flex gap-4">
            <button
              onClick={toggleActive}
              className="flex items-center gap-2 px-5 py-2.5 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50"
            >
              {schedule.active ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              {schedule.active ? "Pause Schedule" : "Resume Schedule"}
            </button>
            <button
              onClick={() => saveToStorage()}
              className="relative bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 shadow-md transition"
            >
              Save Changes
            </button>

            {/* Beautiful Toast Popup */}
            {showToast && (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300">
                <div className="bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="font-medium">
                    All changes saved successfully!
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-8 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          {/* Basic Info */}
          <section className="">
            <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  value={schedule.name}
                  onChange={(e) =>
                    setSchedule((p) => (p ? { ...p, name: e.target.value } : p))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={schedule.description}
                  onChange={(e) =>
                    setSchedule((p) =>
                      p ? { ...p, description: e.target.value } : p
                    )
                  }
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Content</h2>
              <button className="text-blue-600 font-medium hover:underline">
                + Add Content
              </button>
            </div>
            {schedule.content.length === 0 ? (
              <p className="text-center py-12 text-gray-500">
                No content added yet
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {schedule.content.map((item, i) => (
                  <div key={i} className="relative group">
                    <div className="aspect-video bg-gray-200 border-2 border-dashed rounded-xl flex items-center justify-center">
                      <div className="text-center text-xs">
                        <div className="w-12 h-12 bg-gray-300 rounded-lg mx-auto mb-2" />
                        <p className="font-medium">{item}</p>
                        <p className="text-gray-500">40 MB</p>
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        setSchedule((p) =>
                          p
                            ? {
                                ...p,
                                content: p.content.filter((_, x) => x !== i),
                              }
                            : p
                        )
                      }
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-white rounded-full p-1.5 shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* YOUR ORIGINAL SCHEDULE TIME CODE — 100% UNTOUCHED & NOW WORKS */}
          <section className="">
            <h2 className="text-xl font-semibold mb-6">Schedule Time</h2>
            <div className="space-y-8">
              {/* Repeat */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Repeat
                </label>
                <select
                  value={schedule.repeat}
                  onChange={(e) =>
                    setSchedule((p) =>
                      p ? { ...p, repeat: e.target.value as Schedule['repeat'] } : p
                    )
                  }
                  className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue focus:border-transparent text-gray-900"
                >
                  <option value="once">Run Once</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              {/* Weekly Days */}
              {schedule.repeat === "weekly" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-4">
                    Select Days
                  </label>
                  <div className="grid grid-cols-7 gap-3">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                      (day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => {
                            setSchedule((p) => {
                              if (!p) return p;
                              const updated = p.days?.includes(day)
                                ? p.days.filter((d) => d !== day)
                                : [...(p.days || []), day];
                              return { ...p, days: updated };
                            });
                          }}
                          className={`py-3 rounded-lg font-medium text-sm transition-all ${
                            schedule.days?.includes(day)
                              ? "bg-bgBlue text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {day}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Monthly Days */}
              {schedule.repeat === "monthly" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-4">
                    Select Days
                  </label>
                  <div className="grid grid-cols-7 md:grid-cols-16 gap-3">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((num) => {
                      const day = num.toString();
                      return (
                        <button
                          key={num}
                          type="button"
                          onClick={() => {
                            setSchedule((p) => {
                              if (!p) return p;
                              const updated = p.monthlyDays?.includes(day)
                                ? p.monthlyDays.filter((d) => d !== day)
                                : [...(p.monthlyDays || []), day];
                              return { ...p, monthlyDays: updated };
                            });
                          }}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                            schedule.monthlyDays?.includes(day)
                              ? "bg-bgBlue text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {num}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Play Time */}
              {(schedule.repeat === "daily" ||
                schedule.repeat === "weekly" || schedule.repeat === "monthly") && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Play Time
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={schedule.playTime || ""}
                      onChange={(e) =>
                        setSchedule((p) =>
                          p ? { ...p, playTime: e.target.value } : p
                        )
                      }
                      placeholder="09:00 AM"
                      className="w-full pl-4 pr-12 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue focus:border-transparent"
                    />
                    <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Run Once */}
              {schedule.repeat === "once" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Select Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={schedule.startDate || ""}
                        onChange={(e) =>
                          setSchedule((p) =>
                            p ? { ...p, startDate: e.target.value } : p
                          )
                        }
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue"
                      />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      Play Time
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={schedule.playTime || ""}
                        onChange={(e) =>
                          setSchedule((p) =>
                            p ? { ...p, playTime: e.target.value } : p
                          )
                        }
                        placeholder="09:00 AM"
                        className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue"
                      />
                      <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              )}

              {/* Recurring Range */}
              {schedule.repeat !== "once" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-4">
                    Select Range
                  </label>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-gray-600">
                          Start Date
                        </label>
                        <div className="relative mt-2">
                          <input
                            type="text"
                            value={schedule.startDate || ""}
                            onChange={(e) =>
                              setSchedule((p) =>
                                p ? { ...p, startDate: e.target.value } : p
                              )
                            }
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue"
                          />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      {/* <div>
                        <label className="text-xs text-gray-600">
                          Start Time
                        </label>
                        <div className="relative mt-2">
                          <input
                            type="text"
                            value={schedule.startTime || ""}
                            onChange={(e) =>
                              setSchedule((p) =>
                                p ? { ...p, startTime: e.target.value } : p
                              )
                            }
                            placeholder="09:00 AM"
                            className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue"
                          />
                          <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div> */}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-gray-600">
                          End Date
                        </label>
                        <div className="relative mt-2">
                          <input
                            type="text"
                            value={schedule.endDate || ""}
                            onChange={(e) =>
                              setSchedule((p) =>
                                p ? { ...p, endDate: e.target.value } : p
                              )
                            }
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue"
                          />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      {/* <div>
                        <label className="text-xs text-gray-600">
                          End Time
                        </label>
                        <div className="relative mt-2">
                          <input
                            type="text"
                            value={schedule.endTime || ""}
                            onChange={(e) =>
                              setSchedule((p) =>
                                p ? { ...p, endTime: e.target.value } : p
                              )
                            }
                            placeholder="09:00 AM"
                            className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue"
                          />
                          <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Device Assignment - NOW SAVES */}
          <section className="">
            <h2 className="text-xl font-semibold mb-6">Device Assignment</h2>
            <p className="text-sm text-gray-600 mb-6">Select Devices</p>
            <div className="space-y-4">
              {allDevices.map((device) => (
                <label
                  key={device}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={schedule.devices.includes(device)}
                      onChange={(e) => {
                        setSchedule((p) => {
                          if (!p) return p;
                          if (e.target.checked) {
                            return { ...p, devices: [...p.devices, device] };
                          } else {
                            return {
                              ...p,
                              devices: p.devices.filter((d) => d !== device),
                            };
                          }
                        });
                      }}
                      className="w-5 h-5 text-bgBlue rounded focus:ring-bgBlue"
                    />
                    <span className="font-medium text-gray-900">{device}</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      deviceStatus[device as keyof typeof deviceStatus] ===
                      "online"
                        ? "bg-green-50 text-green-700 border border-green-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {deviceStatus[device as keyof typeof deviceStatus]}
                  </span>
                </label>
              ))}
            </div>
          </section>

          {/* Delete */}
          <div className="bg-red-50 border border-red-100 rounded-xl p-8 flex items-start gap-5">
            <Trash2 className="w-8 h-8 text-red-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-red-900 mb-2">
                Delete Schedule
              </h3>
              <p className="text-sm text-red-700 mb-6">
                This action cannot be undone. Please proceed with caution.
              </p>
              <button
                onClick={deleteSchedule}
                className="bg-bgRed hover:bg-red-500 text-white px-8 py-3 rounded-lg font-medium shadow-customShadow transition"
              >
                Delete Schedule
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
