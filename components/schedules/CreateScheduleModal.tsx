// components/schedules/CreateScheduleModal.tsx
"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  FileText,
  Video,
  Monitor,
  Clock,
  CircleCheckBigIcon,
  ChevronLeft,
  ChevronRight,
  Calendar,
} from "lucide-react";

interface ScheduleData {
  name: string;
  description: string;
  content: string[];
  devices: string[];
  repeat: "once" | "daily" | "weekly" | "monthly";
  days: string[];
  monthlyDays: string[];
  playTime: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: ScheduleData) => void;
  editingSchedule?: ScheduleData | null;
}

const steps = [
  { id: 1, title: "Schedule Info", icon: FileText },
  { id: 2, title: "Select Content", icon: Video },
  { id: 3, title: "Select Screens", icon: Monitor },
  { id: 4, title: "Set Timing", icon: Clock },
];

export default function ScheduleModal({
  isOpen,
  onClose,
  onSave,
  editingSchedule,
}: ScheduleModalProps) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState<ScheduleData>({
    name: "",
    description: "",
    content: [],
    devices: [],
    repeat: "daily",
    days: [],
    monthlyDays: [],
    playTime: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
  });

  // Critical: Populate form when editing
  useEffect(() => {
    if (editingSchedule) {
      setForm({
        name: editingSchedule.name || "",
        description: editingSchedule.description || "",
        content: editingSchedule.content || [],
        devices: editingSchedule.devices || [],
        repeat: editingSchedule.repeat || "daily",
        days: editingSchedule.days || [],
        monthlyDays: editingSchedule.monthlyDays || [],
        playTime: editingSchedule.playTime || "",
        startDate: editingSchedule.startDate || "",
        startTime: editingSchedule.startTime || "",
        endDate: editingSchedule.endDate || "",
        endTime: editingSchedule.endTime || "",
      });
    } else {
      setForm({
        name: "",
        description: "",
        content: [],
        devices: [],
        repeat: "daily",
        days: [],
        monthlyDays: [],
        playTime: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
      });
    }
    setStep(1);
  }, [editingSchedule, isOpen]);

  // Dummy data - unchanged
  const contentItems = ["Morning Promo", "Product Launch", "Welcome Video", "Sale Banner"];
  const screens = [
    { name: "Main Lobby Display", status: "online" },
    { name: "Store Entrance TV", status: "online" },
    { name: "Conference Room", status: "offline" },
  ];

  const next = () => step < 4 && setStep(step + 1);
  const prev = () => step > 1 && setStep(step - 1);
  const save = () => {
    onSave(form);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl border border-bgGray w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-start sm:items-center justify-between p-6 gap-4 sm:gap-0">
          <h2 className="text-xl sm:text-3xl font-bold text-Headings text-nowrap">
            {editingSchedule ? "Edit Schedule" : "Create New Schedule"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors self-end sm:self-auto"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Steps Indicator - EXACT same as CreateScreenModal */}
        <div className="flex items-center justify-center md:justify-between px-6 py-5 border-b border-borderGray gap-4">
          {steps.map((s, i) => (
            <React.Fragment key={s.id}>
              <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    step > s.id
                      ? "bg-green-50 border border-green-300"
                      : step === s.id
                      ? "bg-blue-50 border border-bgBlue"
                      : "bg-gray-100 border border-gray-300"
                  }`}
                >
                  {step > s.id ? (
                    <CircleCheckBigIcon className="w-6 h-6 text-[#22C55E]" />
                  ) : (
                    <s.icon
                      className={`w-6 h-6 ${
                        step >= s.id ? "text-bgBlue" : "text-gray-400"
                      }`}
                    />
                  )}
                </div>
                <div>
                  <div
                    className={`sm:font-semibold font-normal text-xs sm:text-base ${
                      step >= s.id ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    Step {s.id}
                  </div>
                  <div className="text-sm text-gray-500 hidden sm:block">
                    {s.title}
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`hidden md:block flex-1 h-0.5 mx-4 ${
                    step > s.id + 1 ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Step 1: Schedule Info */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Morning Welcome"
                  className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Enter schedule description"
                  rows={6}
                  className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue focus:border-transparent resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Select Content */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                <input
                  type="text"
                  placeholder="Search Content"
                  className="flex-1 px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue"
                />
                <select className="w-full sm:w-48 px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue">
                  <option>Videos</option>
                  <option>Images</option>
                  <option>Playlists</option>
                </select>
              </div>

              <div className="border border-borderGray rounded-lg max-h-76 overflow-y-auto">
                {contentItems.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={form.content.includes(item)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setForm({ ...form, content: [...form.content, item] });
                        } else {
                          setForm({ ...form, content: form.content.filter((c) => c !== item) });
                        }
                      }}
                      className="w-5 h-5 rounded border-gray-300 text-bgBlue focus:ring-bgBlue"
                    />
                    <div className="w-20 h-14 bg-gray-200 rounded-lg border-2 border-dashed" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item}</div>
                      <div className="text-sm text-gray-500">40 MB • 1:20</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Select Screens */}
          {step === 3 && (
            <div className="space-y-5">
              <input
                type="text"
                placeholder="Search Screens"
                className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue"
              />
              <div className="border border-borderGray rounded-lg divide-y max-h-64 overflow-y-auto">
                {screens.map((screen) => (
                  <label
                    key={screen.name}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={form.devices.includes(screen.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setForm({ ...form, devices: [...form.devices, screen.name] });
                          } else {
                            setForm({ ...form, devices: form.devices.filter((d) => d !== screen.name) });
                          }
                        }}
                        className="w-5 h-5 rounded border-gray-300 text-bgBlue focus:ring-bgBlue"
                      />
                      <span className="font-medium text-gray-900">{screen.name}</span>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        screen.status === "online"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {screen.status}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Set Timing - 100% Your Original Code */}
          {step === 4 && (
            <div className="space-y-8">
              {/* Repeat */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Repeat</label>
                <select
                  value={form.repeat}
                  onChange={(e) => setForm({ ...form, repeat: e.target.value as ScheduleData["repeat"] })}
                  className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue focus:border-transparent text-gray-900"
                >
                  <option value="once">Run Once</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>

              {/* Weekly: Select Days */}
              {form.repeat === "weekly" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-4">Select Days</label>
                  <div className="grid grid-cols-7 gap-3">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <button
                        key={day}
                        type="button"
                        onClick={() => {
                          const updated = form.days.includes(day)
                            ? form.days.filter((d) => d !== day)
                            : [...form.days, day];
                          setForm({ ...form, days: updated });
                        }}
                        className={`py-3 rounded-lg font-medium text-sm transition-all ${
                          form.days.includes(day)
                            ? "bg-bgBlue text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Monthly: Select Days (1–31) */}
              {form.repeat === "monthly" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-4">Select Days</label>
                  <div className="grid grid-cols-7 md:grid-cols-16  gap-3">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => {
                          const day = num.toString();
                          const updated = form.monthlyDays?.includes(day)
                            ? form.monthlyDays.filter((d) => d !== day)
                            : [...(form.monthlyDays || []), day];
                          setForm({ ...form, monthlyDays: updated });
                        }}
                        className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                          form.monthlyDays?.includes(num.toString())
                            ? "bg-bgBlue text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Play Time - Show for Daily & Weekly */}
              {(form.repeat === "daily" || form.repeat === "weekly" || form.repeat === "monthly") && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Play Time</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={form.playTime}
                      onChange={(e) => setForm({ ...form, playTime: e.target.value })}
                      placeholder="09:00 AM"
                      className="w-full pl-4 pr-12 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue focus:border-transparent"
                    />
                    <Clock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Run Once: Only Date & Time */}
              {form.repeat === "once" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Select Date</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={form.startDate || ""}
                          onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue"
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-3">Play Time</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={form.playTime}
                          onChange={(e) => setForm({ ...form, playTime: e.target.value })}
                          placeholder="09:00 AM"
                          className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue"
                        />
                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Date & Time Range - Always show for recurring schedules */}
              {form.repeat !== "once" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-4">Select Range</label>
                  <div className="grid grid-cols-2 gap-6">
                    {/* Start */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-gray-600">Start Date</label>
                        <div className="relative mt-2">
                          <input
                            type="text"
                            value={form.startDate || ""}
                            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue"
                          />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      {/* <div>
                        <label className="text-xs text-gray-600">Start Time</label>
                        <div className="relative mt-2">
                          <input
                            type="text"
                            value={form.startTime || ""}
                            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
                            placeholder="09:00 AM"
                            className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue"
                          />
                          <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div> */}
                    </div>

                    {/* End */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-gray-600">End Date</label>
                        <div className="relative mt-2">
                          <input
                            type="text"
                            value={form.endDate || ""}
                            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                            placeholder="MM/YY"
                            className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue"
                          />
                          <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                      {/* <div>
                        <label className="text-xs text-gray-600">End Time</label>
                        <div className="relative mt-2">
                          <input
                            type="text"
                            value={form.endTime || ""}
                            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
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
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center md:justify-between px-6 py-4 border-t border-borderGray gap-3">
          <button
            onClick={prev}
            disabled={step === 1}
            className={`flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 border border-borderGray rounded-lg font-medium transition-colors ${
              step === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700 hover:scale-[1.02] hover:bg-gray-50 cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="hidden md:block">Previous</span>
          </button>

          <div className="text-sm text-gray-600">Step {step} of 4</div>

          {step < 4 ? (
            <button
              onClick={next}
              className="flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 bg-bgBlue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              <span className="hidden md:block">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={save}
              className="px-6 py-2.5 bg-bgBlue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              {editingSchedule ? "Update Schedule" : "Create Schedule"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}