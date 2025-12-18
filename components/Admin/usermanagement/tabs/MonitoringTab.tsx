"use client";

import React from "react";

export default function MonitoringTab() {
  return (
    <div className="space-y-6">
      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Uptime Trend */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Uptime Trend
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                System uptime percentage over time
              </p>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-b from-purple-100 to-purple-50 dark:from-purple-900/40 dark:to-purple-900/20 rounded-lg relative overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 600 250">
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#c4b5fd" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#c4b5fd" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <path
                d="M 0 200 Q 60 100, 120 120 T 240 100 T 360 80 T 480 90 T 600 70"
                fill="url(#gradient1)"
                stroke="rgb(168, 85, 247)"
                strokeWidth="2"
              />
            </svg>
            <div className="absolute bottom-2 left-0 right-0 flex justify-between px-6 text-xs text-gray-500 dark:text-gray-400">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Resource Growth */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                Resource Growth
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Screens and content growth over time
              </p>
            </div>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-blue-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Active Screens</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-purple-500"></div>
                <span className="text-gray-600 dark:text-gray-400">Content Items</span>
              </div>
            </div>
          </div>
          <div className="h-64 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <svg className="w-full h-full" viewBox="0 0 600 250">
              {/* Grid */}
              {[50, 100, 150, 200].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="600"
                  y2={y}
                  stroke="#e5e7eb"
                  className="dark:stroke-gray-700"
                />
              ))}

              {/* Active Screens - Blue */}
              <polyline
                points="0,180 120,160 240,150 360,140 480,120 600,110"
                fill="none"
                stroke="rgb(59,130,246)"
                strokeWidth="2"
              />
              {[0, 120, 240, 360, 480, 600].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={[180, 160, 150, 140, 120, 110][i]}
                  r="3"
                  fill="rgb(59,130,246)"
                />
              ))}

              {/* Content Items - Purple */}
              <polyline
                points="0,200 120,190 240,185 360,180 480,175 600,170"
                fill="none"
                stroke="rgb(168,85,247)"
                strokeWidth="2"
              />
              {[0, 120, 240, 360, 480, 600].map((x, i) => (
                <circle
                  key={i}
                  cx={x}
                  cy={[200, 190, 185, 180, 175, 170][i]}
                  r="3"
                  fill="rgb(168,85,247)"
                />
              ))}
            </svg>
            <div className="absolute bottom-2 left-0 right-0 flex justify-between px-6 text-xs text-gray-500 dark:text-gray-400">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Content Usage by Type */}
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Content Usage by Type
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Breakdown of content library
            </p>
          </div>
          <div className="h-64 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6 flex items-end justify-center gap-8">
            {[
              { label: "Images", count: 140, size: 60 },
              { label: "Videos", count: 110, size: 90 },
              { label: "Audio", count: 90, size: 10 },
              { label: "Docs", count: 100, size: 5 },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="flex flex-col justify-end" style={{ height: "200px" }}>
                  <div
                    className="w-16 bg-blue-500 rounded-t"
                    style={{ height: `${item.count}px` }}
                  ></div>
                  <div
                    className="w-16 bg-purple-500"
                    style={{ height: `${item.size}px` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <div className="flex gap-6 mt-4 text-xs justify-center">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500"></div>
              <span className="text-gray-600 dark:text-gray-400">File Count</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500"></div>
              <span className="text-gray-600 dark:text-gray-400">Size (GB)</span>
            </div>
          </div>
        </div>

        {/* Device Status */}
        <div>
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Device Status Distribution
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Current status of all devices
            </p>
          </div>
          <div className="h-64 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8 flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="20"
                  strokeDasharray="175.93 251.33"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="20"
                  strokeDasharray="37.70 251.33"
                  strokeDashoffset="-175.93"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="20"
                  strokeDasharray="37.70 251.33"
                  strokeDashoffset="-213.63"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">25</div>
              </div>
            </div>
          </div>
          <div className="flex gap-6 mt-6 text-xs justify-center flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Online 70%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Idle 15%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600 dark:text-gray-400">Offline 15%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}