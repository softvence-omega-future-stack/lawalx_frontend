'use client';

import { ArrowLeft, Trash2, Play, Pause } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Schedule = {
  id: string;
  name: string;
  description: string;
  content: string[];
  devices: { name: string; status: string }[];
  repeat: string;
  startTime: string;
  endTime: string;
  days: string[];
  active: boolean;
};

const schedules: Record<string, Schedule> = {
  '1': {
    id: '1',
    name: 'Morning Content',
    description: 'Play welcome content during morning hours',
    content: ['Video 1', 'Welcome Video'],
    devices: [
      { name: 'Main Lobby Display', status: 'online' },
      { name: 'Building A, Ground Floor', status: 'online' },
      { name: 'Building B, 2nd Floor', status: 'offline' },
      { name: 'Cafeteria Display', status: 'offline' },
    ],
    repeat: 'Weekly',
    startTime: '09:00 AM',
    endTime: '06:00 PM',
    days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    active: true,
  },
};

export default function ScheduleDetailPage({ params }: { params: { id: string } }) {
  const schedule = schedules[params.id];

  if (!schedule) notFound();

  const allDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <>
      <div className="min-h-screen">
        <div className="">
          {/* Top Bar */}
          <div className="">
            <div className="flex items-center justify-between">
              <Link href="/schedules" className="flex items-center gap-3 text-gray-700 hover:text-gray-900">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-lg font-medium">{schedule.name}</span>
              </Link>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-5 py-2.5  font-medium border border-bgBlue hover:bg-blue-50 rounded-lg transition">
                  {schedule.active ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  <span className='text-bgBlue'>{schedule.active ? 'Pause Schedule' : 'Resume Schedule'}</span>
                </button>
                <button className="bg-bgBlue hover:bg-blue-400 shadow-customShadow border border-blue-100 text-white px-8 py-2.5 rounded-lg font-medium">
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6 mt-6">
            {/* Basic Information */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold mb-6">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input type="text" defaultValue={schedule.name} className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea defaultValue={schedule.description} rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none" />
                </div>
              </div>
            </section>

            {/* Content */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Content</h2>
                <button className="text-blue-600 font-medium hover:underline">+ Add Content</button>
              </div>
              {schedule.content.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No content added yet</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {schedule.content.map((item: string) => (
                    <div key={item} className="aspect-video bg-gray-200 border-2 border-dashed rounded-xl" />
                  ))}
                </div>
              )}
            </section>

            {/* Schedule Time */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold mb-6">Schedule Time</h2>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Repeat</label>
                  <select defaultValue={schedule.repeat} className="w-full px-1/2 px-4 py-3 border rounded-lg">
                    <option>Once</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                  <input type="text" defaultValue={schedule.startTime} className="w-full px-4 py-3 border rounded-lg" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                  <input type="text" defaultValue={schedule.endTime} className="w-full px-4 py-3 border rounded-lg" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Days</label>
                <div className="flex flex-wrap gap-3">
                  {allDays.map(day => (
                    <button
                      key={day}
                      type="button"
                      className={`px-6 py-2 rounded-lg font-medium transition ${
                        schedule.days.includes(day)
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Device Assignment */}
            <section className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-xl font-semibold mb-6">Device Assignment</h2>
              <p className="text-sm text-gray-600 mb-4">Select Devices</p>
              <div className="space-y-3">
                {schedule.devices.map((device: { name: string; status: string }) => {
                  const isOnline = String(device.status).toLowerCase() === 'online';
                  return (
                    <label key={device.name} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-4">
                        <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" defaultChecked />
                        <span className="font-medium">{device.name}</span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isOnline ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {String(device.status)}
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>

            {/* Delete Schedule */}
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
              <Trash2 className="w-6 h-6 text-red-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-red-900">Delete Schedule</h3>
                <p className="text-sm text-red-700 mt-1">
                  This action cannot be undone. Please proceed with caution.
                </p>
                <button className="mt-4 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium">
                  Delete Schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}