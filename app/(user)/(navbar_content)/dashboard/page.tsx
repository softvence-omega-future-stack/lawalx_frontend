import { Button } from "@/components/ui/button"
import { Monitor, Wifi, HardDrive, Plus, Box, Upload, Clock, Activity } from "lucide-react"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {/* Total Devices Card */}
          <div className="p-6 bg-white border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Devices</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">0</h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <span className="text-green-600">↑</span> 0 New This Week
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded border border-gray-300 flex items-center justify-center">
                <Monitor className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Online Status div 1 */}
          <div className="p-6 bg-white border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Online Status</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">0</h3>
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <span className="text-red-500">⚠</span> 0 Offline
                </p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded border border-green-300 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>

          {/* Storage div */}
          <div className="p-6 bg-white border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-medium">Storage</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">0.0/10 GB</h3>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gray-300 h-2 rounded-full" style={{ width: "0%" }}></div>
                </div>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  Upgrade <span className="text-blue-600">↗</span>
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-100 rounded border border-gray-300 flex items-center justify-center">
                <HardDrive className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Online Status div 2 */}
          <div className="p-6 bg-white border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-600 font-medium">Online Status</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">0</h3>
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <span className="text-red-500">⚠</span> 0 Offline
                </p>
              </div>
              <div className="w-10 h-10 bg-green-50 rounded border border-green-300 flex items-center justify-center">
                <Wifi className="w-5 h-5 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Add New Section */}
        <div className="p-8 bg-white border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Add New</h2>
          <div className="grid grid-cols-4 gap-4">
            {/* Create Screen */}
            <Button className="h-auto py-4 px-4 bg-slate-900 hover:bg-slate-800 text-white flex flex-col items-start gap-2 justify-start rounded-lg">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5" />
                <span className="font-semibold">Create Screen</span>
              </div>
              <span className="text-xs font-normal opacity-90">Create a new screen to play on your devices</span>
            </Button>

            {/* Add Device */}
            <Button
              variant="outline"
              className="h-auto py-4 px-4 border-blue-200 bg-blue-50 hover:bg-blue-100 text-slate-900 flex flex-col items-start gap-2 justify-start rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Box className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-slate-900">Add Device</span>
              </div>
              <span className="text-xs font-normal text-slate-700">Add New Device</span>
            </Button>

            {/* Upload Content */}
            <Button
              variant="outline"
              className="h-auto py-4 px-4 border-gray-200 bg-white hover:bg-gray-50 text-slate-900 flex flex-col items-start gap-2 justify-start rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-slate-600" />
                <span className="font-semibold text-slate-900">Upload Content</span>
              </div>
              <span className="text-xs font-normal text-slate-700">Add new content</span>
            </Button>

            {/* Schedule */}
            <Button
              variant="outline"
              className="h-auto py-4 px-4 border-gray-200 bg-white hover:bg-gray-50 text-slate-900 flex flex-col items-start gap-2 justify-start rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-600" />
                <span className="font-semibold text-slate-900">Schedule</span>
              </div>
              <span className="text-xs font-normal text-slate-700">Schedule a new content</span>
            </Button>
          </div>
        </div>

        {/* Recent Devices and Activities */}
        <div className="grid grid-cols-2 gap-6">
          {/* Recent Devices */}
          <div className="p-6 bg-white border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Devices</h2>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View All
              </a>
            </div>

            <div className="flex flex-col items-center justify-center py-12">
              <Monitor className="w-12 h-12 text-gray-400 mb-4" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Devices Yet</h3>
              <p className="text-sm text-gray-600 text-center mb-6">Add your first device to get started</p>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
                <Plus className="w-4 h-4" />
                Add New Device
              </Button>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="p-6 bg-white border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
                View All
              </a>
            </div>

            <div className="flex flex-col items-center justify-center py-12">
              <Activity className="w-12 h-12 text-gray-400 mb-4" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">There is no activity</h3>
              <p className="text-sm text-gray-600 text-center">You don&apos;t have any recent activity yet.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
