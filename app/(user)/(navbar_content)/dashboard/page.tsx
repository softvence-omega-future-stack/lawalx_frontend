// import { Button } from "@/components/ui/button"
// import { Monitor, Wifi, HardDrive, Plus, Box, Upload, Clock, Activity } from "lucide-react"

// export default function DashboardPage() {
//   return (
//     <main className="min-h-screen bg-gray-50 p-6">
//       <div className="">
//         {/* Stats divs */}
//         <div className="grid grid-cols-4 gap-4 mb-8">
//           {/* Total Devices div */}
//           <div className="p-6 bg-white border rounded-xl border-gray-200">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <p className="text-sm text-gray-600 font-medium">Total Devices</p>
//                 <h3 className="text-3xl font-bold text-gray-900 mt-2">0</h3>
//                 <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
//                   <span className="text-green-600">↑</span> 0 New This Week
//                 </p>
//               </div>
//               <div className="w-10 h-10 bg-gray-100 rounded border border-gray-300 flex items-center justify-center">
//                 <Monitor className="w-5 h-5 text-gray-600" />
//               </div>
//             </div>
//           </div>

//           {/* Online Status div 1 */}
//           <div className="p-6 bg-white border rounded-xl border-gray-200">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <p className="text-sm text-gray-600 font-medium">Online Status</p>
//                 <h3 className="text-3xl font-bold text-gray-900 mt-2">0</h3>
//                 <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
//                   <span className="text-red-500">⚠</span> 0 Offline
//                 </p>
//               </div>
//               <div className="w-10 h-10 bg-green-50 rounded border border-green-300 flex items-center justify-center">
//                 <Wifi className="w-5 h-5 text-green-500" />
//               </div>
//             </div>
//           </div>

//           {/* Storage div */}
//           <div className="p-6 bg-white border rounded-xl border-gray-200">
//             <div className="flex justify-between items-start mb-4">
//               <div className="flex-1">
//                 <p className="text-sm text-gray-600 font-medium">Storage</p>
//                 <h3 className="text-3xl font-bold text-gray-900 mt-2">0.0/10 GB</h3>
//                 <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
//                   <div className="bg-gray-300 h-2 rounded-full" style={{ width: "0%" }}></div>
//                 </div>
//                 <p className="text-xs text-blue-600 mt-2 font-medium">
//                   Upgrade <span className="text-blue-600">↗</span>
//                 </p>
//               </div>
//               <div className="w-10 h-10 bg-gray-100 rounded border border-gray-300 flex items-center justify-center">
//                 <HardDrive className="w-5 h-5 text-gray-600" />
//               </div>
//             </div>
//           </div>

//           {/* Online Status div 2 */}
//           <div className="p-6 bg-white border rounded-xl border-gray-200">
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <p className="text-sm text-gray-600 font-medium">Online Status</p>
//                 <h3 className="text-3xl font-bold text-gray-900 mt-2">0</h3>
//                 <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
//                   <span className="text-red-500">⚠</span> 0 Offline
//                 </p>
//               </div>
//               <div className="w-10 h-10 bg-green-50 rounded border border-green-300 flex items-center justify-center">
//                 <Wifi className="w-5 h-5 text-green-500" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Add New Section */}
//         <div className="p-8 bg-white border rounded-xl border-gray-200 mb-8">
//           <h2 className="text-lg font-semibold text-gray-900 mb-6">Add New</h2>
//           <div className="grid grid-cols-4 gap-4">
//             {/* Create Screen */}
//             <Button className="h-auto py-4 px-4 bg-slate-900 hover:bg-slate-800 text-white flex flex-col items-start gap-2 justify-start rounded-lg">
//               <div className="flex items-center gap-2">
//                 <Monitor className="w-5 h-5" />
//                 <span className="font-semibold">Create Screen</span>
//               </div>
//               <span className="text-xs font-normal opacity-90">Create a new screen to play on your devices</span>
//             </Button>

//             {/* Add Device */}
//             <Button
//               variant="outline"
//               className="h-auto py-4 px-4 border-blue-200 bg-blue-50 hover:bg-blue-100 text-slate-900 flex flex-col items-start gap-2 justify-start rounded-lg"
//             >
//               <div className="flex items-center gap-2">
//                 <Box className="w-5 h-5 text-blue-600" />
//                 <span className="font-semibold text-slate-900">Add Device</span>
//               </div>
//               <span className="text-xs font-normal text-slate-700">Add New Device</span>
//             </Button>

//             {/* Upload Content */}
//             <Button
//               variant="outline"
//               className="h-auto py-4 px-4 border-gray-200 bg-white hover:bg-gray-50 text-slate-900 flex flex-col items-start gap-2 justify-start rounded-lg"
//             >
//               <div className="flex items-center gap-2">
//                 <Upload className="w-5 h-5 text-slate-600" />
//                 <span className="font-semibold text-slate-900">Upload Content</span>
//               </div>
//               <span className="text-xs font-normal text-slate-700">Add new content</span>
//             </Button>

//             {/* Schedule */}
//             <Button
//               variant="outline"
//               className="h-auto py-4 px-4 border-gray-200 bg-white hover:bg-gray-50 text-slate-900 flex flex-col items-start gap-2 justify-start rounded-lg"
//             >
//               <div className="flex items-center gap-2">
//                 <Clock className="w-5 h-5 text-slate-600" />
//                 <span className="font-semibold text-slate-900">Schedule</span>
//               </div>
//               <span className="text-xs font-normal text-slate-700">Schedule a new content</span>
//             </Button>
//           </div>
//         </div>

//         {/* Recent Devices and Activities */}
//         <div className="grid grid-cols-2 gap-6">
//           {/* Recent Devices */}
//           <div className="p-6 bg-white border rounded-xl border-gray-200">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-lg font-semibold text-gray-900">Recent Devices</h2>
//               <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
//                 View All
//               </a>
//             </div>

//             <div className="flex flex-col items-center justify-center py-12">
//               <Monitor className="w-12 h-12 text-gray-400 mb-4" strokeWidth={1.5} />
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">No Devices Yet</h3>
//               <p className="text-sm text-gray-600 text-center mb-6">Add your first device to get started</p>
//               <Button className="bg-slate-900 hover:bg-slate-800 text-white gap-2">
//                 <Plus className="w-4 h-4" />
//                 Add New Device
//               </Button>
//             </div>
//           </div>

//           {/* Recent Activities */}
//           <div className="p-6 bg-white border rounded-xl border-gray-200">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
//               <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700">
//                 View All
//               </a>
//             </div>

//             <div className="flex flex-col items-center justify-center py-12">
//               <Activity className="w-12 h-12 text-gray-400 mb-4" strokeWidth={1.5} />
//               <h3 className="text-lg font-semibold text-gray-900 mb-2">There is no activity</h3>
//               <p className="text-sm text-gray-600 text-center">You don&apos;t have any recent activity yet.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }



import { Button } from "@/components/ui/button"
import { Monitor, Wifi, HardDrive, Box, Upload, Clock, Bell } from "lucide-react"

export default function DashboardPage() {
  // Demo devices data
  const devices = [
    { id: 1, name: "Office 1", location: "LA USA", screen: "Paying Screen 2", status: "offline" },
    { id: 2, name: "Office 1", location: "LA USA", screen: "Paying Screen 5", status: "online" },
    { id: 3, name: "Office 1", location: "LA USA", screen: "0 video assigned", status: "offline" },
  ]

  // Demo activities data
  const activities = [
    {
      id: 1,
      title: "New Device Added",
      description: "Your 'Office 1' device has been added to the server.",
      time: "2 hours ago",
      icon: Monitor,
    },
    {
      id: 2,
      title: "Account Approved",
      description: "Your account has been approved. You can now access all features.",
      time: "1 hour ago",
      icon: Bell,
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="">
        {/* Stats Cards - Made responsive grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {/* Total Devices Card */}
          <div className="p-4 md:p-6 bg-white border border-gray-200 rounded-lg md:rounded-xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-600 font-medium">Total Devices</p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">12</h3>
                <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                  <span className="text-green-600">↑</span> 1 New This Week
                </p>
              </div>
              <div className="w-8 md:w-10 h-8 md:h-10 bg-gray-100 rounded border border-gray-300 flex items-center justify-center flex-shrink-0">
                <Monitor className="w-4 md:w-5 h-4 md:h-5 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Online Status div 1 */}
          <div className="p-4 md:p-6 bg-white border border-gray-200 rounded-lg md:rounded-xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-600 font-medium">Online Status</p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">8</h3>
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <span className="text-red-500">⚠</span> 4 Offline
                </p>
              </div>
              <div className="w-8 md:w-10 h-8 md:h-10 bg-green-50 rounded border border-green-300 flex items-center justify-center flex-shrink-0">
                <Wifi className="w-4 md:w-5 h-4 md:h-5 text-green-500" />
              </div>
            </div>
          </div>

          {/* Storage div */}
          <div className="p-4 md:p-6 bg-white border border-gray-200 rounded-lg md:rounded-xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-600 font-medium">Storage</p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">0.5/10 GB</h3>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: "5%" }}></div>
                </div>
                <p className="text-xs text-blue-600 mt-2 font-medium">
                  Upgrade <span className="text-blue-600">↗</span>
                </p>
              </div>
              <div className="w-8 md:w-10 h-8 md:h-10 bg-gray-100 rounded border border-gray-300 flex items-center justify-center flex-shrink-0">
                <HardDrive className="w-4 md:w-5 h-4 md:h-5 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Active Apps div */}
          <div className="p-4 md:p-6 bg-white border border-gray-200 rounded-lg md:rounded-xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs md:text-sm text-gray-600 font-medium">Active Apps</p>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">0</h3>
                <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                  <span className="text-red-500">⚠</span> 0 Offline
                </p>
              </div>
              <div className="w-8 md:w-10 h-8 md:h-10 bg-green-50 rounded border border-green-300 flex items-center justify-center flex-shrink-0">
                <Wifi className="w-4 md:w-5 h-4 md:h-5 text-green-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Add New Section - Made responsive grid */}
        <div className="p-4 md:p-8 bg-white border border-gray-200 rounded-lg md:rounded-xl mb-6 md:mb-8">
          <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-4 md:mb-6">Add New</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {/* Create Screen */}
            <Button className="h-auto py-3 md:py-4 px-3 md:px-4 bg-slate-900 hover:bg-slate-800 text-white flex flex-col items-start gap-2 justify-start rounded-lg">
              <div className="flex items-center gap-2">
                <Monitor className="w-4 md:w-5 h-4 md:h-5" />
                <span className="font-semibold text-sm md:text-base">Create Screen</span>
              </div>
              <span className="text-xs font-normal opacity-90">Create a new screen to play on your devices</span>
            </Button>

            {/* Add Device */}
            <Button
              variant="outline"
              className="h-auto py-3 md:py-4 px-3 md:px-4 border-blue-200 bg-blue-50 hover:bg-blue-100 text-slate-900 flex flex-col items-start gap-2 justify-start rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Box className="w-4 md:w-5 h-4 md:h-5 text-blue-600" />
                <span className="font-semibold text-slate-900 text-sm md:text-base">Add Device</span>
              </div>
              <span className="text-xs font-normal text-slate-700">Add New Device</span>
            </Button>

            {/* Upload Content */}
            <Button
              variant="outline"
              className="h-auto py-3 md:py-4 px-3 md:px-4 border-gray-200 bg-white hover:bg-gray-50 text-slate-900 flex flex-col items-start gap-2 justify-start rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Upload className="w-4 md:w-5 h-4 md:h-5 text-slate-600" />
                <span className="font-semibold text-slate-900 text-sm md:text-base">Upload Content</span>
              </div>
              <span className="text-xs font-normal text-slate-700">Add new content</span>
            </Button>

            {/* Schedule */}
            <Button
              variant="outline"
              className="h-auto py-3 md:py-4 px-3 md:px-4 border-gray-200 bg-white hover:bg-gray-50 text-slate-900 flex flex-col items-start gap-2 justify-start rounded-lg"
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 md:w-5 h-4 md:h-5 text-slate-600" />
                <span className="font-semibold text-slate-900 text-sm md:text-base">Schedule</span>
              </div>
              <span className="text-xs font-normal text-slate-700">Schedule a new content</span>
            </Button>
          </div>
        </div>

        {/* Recent Devices and Activities - Made responsive grid and added demo data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Recent Devices */}
          <div className="p-4 md:p-6 bg-white border border-gray-200 rounded-lg md:rounded-xl">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-base md:text-lg font-semibold text-gray-900">Recent Devices</h2>
              <a href="#" className="text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700">
                View All
              </a>
            </div>

            <div className="space-y-3">
              {devices.map((device) => (
                <div
                  key={device.id}
                  className="p-3 md:p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Monitor className="w-4 h-4 text-gray-600 flex-shrink-0" />
                        <h3 className="text-sm md:text-base font-semibold text-gray-900 truncate">{device.name}</h3>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${
                            device.status === "online" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                          }`}
                        >
                          {device.status === "online" ? "● Online" : "● Offline"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{device.location}</p>
                      <p className="text-xs text-gray-600">{device.screen}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="p-4 md:p-6 bg-white border border-gray-200 rounded-lg md:rounded-xl">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h2 className="text-base md:text-lg font-semibold text-gray-900">Recent Activities</h2>
              <a href="#" className="text-xs md:text-sm font-medium text-blue-600 hover:text-blue-700">
                View All
              </a>
            </div>

            <div className="space-y-3">
              {activities.map((activity) => {
                const IconComponent = activity.icon
                return (
                  <div
                    key={activity.id}
                    className="p-3 md:p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition"
                  >
                    <div className="flex gap-3">
                      <IconComponent className="w-4 md:w-5 h-4 md:h-5 text-gray-600 flex-shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-base font-semibold text-gray-900">{activity.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                        <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
