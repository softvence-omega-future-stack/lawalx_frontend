"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Edit2,
  Trash2,
  Clock,
  Calendar,
  Monitor,
  Video,
} from "lucide-react";
import Link from "next/link";
import ScheduleModal from "@/components/schedules/CreateScheduleModal";

interface ContentItem {
  id: string;
  type: "video" | "image" | "html" | "other";
  src?: string;
  durationSeconds?: number;
  metadata?: Record<string, unknown>;
}

interface Schedule {
  id: string;
  name: string;
  description: string;
  content: ContentItem[];
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

// Delete Confirmation Modal — Dark Mode Ready
const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  scheduleName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  scheduleName: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 dark:bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl max-w-sm w-full p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Delete Schedule
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{scheduleName}</span>? This action
          cannot be undone.
        </p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition shadow-customShadow"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState<Schedule | null>(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("schedules");
    if (saved) setSchedules(JSON.parse(saved));
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (schedules.length > 0) {
      localStorage.setItem("schedules", JSON.stringify(schedules));
    } else {
      localStorage.removeItem("schedules");
    }
  }, [schedules]);

  const handleSave = (data: Partial<Schedule>) => {
    if (editingSchedule) {
      setSchedules((prev) =>
        prev.map((s) => (s.id === editingSchedule.id ? { ...s, ...data } : s))
      );
    } else {
      const newSchedule: Schedule = {
        id: Date.now().toString(),
        name: data.name || "Untitled",
        description: data.description || "",
        content: data.content || [],
        devices: data.devices || [],
        repeat: data.repeat || "daily",
        days: data.days || [],
        monthlyDays: data.monthlyDays || [],
        playTime: data.playTime || "",
        startDate: data.startDate || "",
        startTime: data.startTime || "",
        endDate: data.endDate || "",
        endTime: data.endTime || "",
        active: true,
      };
      setSchedules((prev) => [...prev, newSchedule]);
    }
    setIsModalOpen(false);
    setEditingSchedule(null);
  };

  const toggleActive = (id: string) => {
    setSchedules((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: !s.active } : s))
    );
  };

  const deleteSchedule = (id: string) => {
    setSchedules((prev) => prev.filter((s) => s.id !== id));
  };

  const openEdit = (schedule: Schedule) => {
    setEditingSchedule(schedule);
    setIsModalOpen(true);
  };

  const openDeleteConfirm = (schedule: Schedule) => {
    setScheduleToDelete(schedule);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (scheduleToDelete) {
      deleteSchedule(scheduleToDelete.id);
      setScheduleToDelete(null);
      setIsDeleteModalOpen(false);
    }
  };

  // Helper to always provide a clean editing object (fixes TS error)
  const getEditingScheduleForModal = (): Schedule | undefined => {
    if (!editingSchedule) return undefined;

    return {
      ...editingSchedule,
      days: editingSchedule.days || [],
      monthlyDays: editingSchedule.monthlyDays || [],
      content: editingSchedule.content || [],
      devices: editingSchedule.devices || [],
      playTime: editingSchedule.playTime || "",
      startDate: editingSchedule.startDate || "",
      startTime: editingSchedule.startTime || "",
      endDate: editingSchedule.endDate || "",
      endTime: editingSchedule.endTime || "",
    };
  };

  return (
    <div className="min-h-screen">
      <div className="">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 lg:mb-10 gap-4">
          <div className="w-full sm:w-auto">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-Heading dark:text-white">
              Content Scheduling
            </h3>
            <p className="text-Heading dark:text-gray-400 mt-1 sm:mt-2 text-sm">
              Manage when and where your content plays across devices
            </p>
          </div>
          <button
            onClick={() => {
              setEditingSchedule(null);
              setIsModalOpen(true);
            }}
            className="bg-bgBlue hover:bg-blue-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold shadow-customShadow transition w-full sm:w-auto text-sm sm:text-base whitespace-nowrap"
          >
            + Create Schedule
          </button>
        </div>

        {schedules.length === 0 ? (
          <div className="flex flex-col gap-4 sm:gap-6 items-center justify-center text-center py-12 sm:py-16 lg:py-20 px-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3">
              No schedules yet
            </h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-bgBlue text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-blue-500 shadow-customShadow transition text-sm sm:text-base w-full sm:w-auto max-w-xs"
            >
              + Create New Schedule
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-5 lg:gap-6">
            {schedules.map((sch) => (
              <Link href={`/schedules/${sch.id}`} key={sch.id}>
                <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-300 dark:border-gray-700 p-4 sm:p-6 lg:p-8 hover:shadow-md dark:hover:shadow-xl transition-all cursor-pointer">
                  <div className="flex items-center justify-between flex-wrap gap-4 sm:gap-6 lg:gap-8">
                    <div className="flex-1 min-w-0 w-full">
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white truncate">
                        {sch.name}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1 sm:mt-2 line-clamp-2">
                        {sch.description || "No description"}
                      </p>

                      <div className="mt-4 sm:mt-5 lg:mt-6 space-y-3 sm:space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 lg:gap-8 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                          <div className="flex items-center gap-2 sm:gap-3 min-w-0 w-full sm:w-auto">
                            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 shrink-0" />
                            <span className="font-medium truncate">
                              {sch.playTime ? (
                                <>
                                  {sch.repeat === "weekly" &&
                                    sch.days &&
                                    sch.days.length > 0 && (
                                      <span className="mr-1 sm:mr-2">
                                        {sch.days.join(", ")} •{" "}
                                      </span>
                                    )}
                                  {sch.repeat === "daily" && (
                                    <span className="mr-1 sm:mr-2">
                                      Every day •{" "}
                                    </span>
                                  )}
                                  {sch.playTime}
                                </>
                              ) : (
                                "No time set"
                              )}
                            </span>
                          </div>

                          <div className="flex items-center gap-2 sm:gap-3">
                            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 shrink-0" />
                            <span className="font-medium capitalize text-sm sm:text-base">
                              {sch.repeat}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <Monitor className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 shrink-0" />
                            <span className="font-medium">
                              {sch.devices.length} Device
                              {sch.devices.length !== 1 ? "s" : ""}
                            </span>
                          </div>

                          {sch.content.length > 0 && (
                            <div className="flex items-center gap-2 sm:gap-3">
                              <Video className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 dark:text-gray-400 shrink-0" />
                              <span className="text-sm">
                                {sch.content.length} item
                                {sch.content.length > 1 ? "s" : ""}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 lg:gap-6 shrink-0">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleActive(sch.id);
                        }}
                        className="p-2 sm:p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition touch-manipulation cursor-pointer"
                        aria-label={sch.active ? "Pause schedule" : "Play schedule"}
                      >
                        {sch.active ? (
                          <Play className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-green-600" />
                        ) : (
                          <Pause className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-400 dark:text-gray-500" />
                        )}
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          openEdit(sch);
                        }}
                        className="p-2 sm:p-2.5 lg:p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition touch-manipulation cursor-pointer"
                        aria-label="Edit schedule"
                      >
                        <Edit2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          openDeleteConfirm(sch);
                        }}
                        className="p-2 sm:p-2.5 lg:p-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition touch-manipulation cursor-pointer"
                        aria-label="Delete schedule"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Create / Edit Modal – Fixed prop typing */}
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingSchedule(null);
        }}
        onSave={handleSave}
        editingSchedule={getEditingScheduleForModal()}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setScheduleToDelete(null);
        }}
        onConfirm={confirmDelete}
        scheduleName={scheduleToDelete?.name || ""}
      />
    </div>
  );
}