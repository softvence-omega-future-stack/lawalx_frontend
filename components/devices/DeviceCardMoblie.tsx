// "use client";

// import React from "react";
// import {
//   Monitor,
//   MapPin,
//   MoreVertical,
//   Eye,
//   Trash2,
//   PenLine,
//   CircleHelp,
// } from "lucide-react";
// import { Device } from "./types";

// interface Props {
//   device: Device;
//   isSelected: boolean;
//   onSelect: () => void;
//   openMenuId: number | null;
//   setOpenMenuId: (id: number | null) => void;
//   onPreview: (device: Device) => void;
//   onRename: (device: Device) => void;
//   onReport: (device: Device) => void;
//   onRemove: (device: Device) => void;
// }

// export default function DeviceCardMobile({
//   device,
//   isSelected,
//   onSelect,
//   openMenuId,
//   setOpenMenuId,
//   onPreview,
//   onRename,
//   onReport,
//   onRemove,
// }: Props) {
//   return (
//     <div className="p-4 lg:hidden">
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex items-start gap-3 flex-1">
//           <input
//             type="checkbox"
//             checked={isSelected}
//             onChange={onSelect}
//             className="w-4 h-4 rounded border-gray-300 mt-1"
//           />
//           <div className="flex-1">
//             <div className="flex items-center gap-2 mb-1">
//               <Monitor className="w-4 h-4 text-gray-400" />
//               <p className="text-sm font-medium text-gray-900">{device.name}</p>
//             </div>
//             <p className="text-xs text-gray-500 mb-2">{device.mac}</p>

//             <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
//               <MapPin className="w-3 h-3" />
//               {device.location}
//             </div>

//             {device.status === "Online" ? (
//               <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full mb-2">
//                 <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
//                 Online
//               </span>
//             ) : device.status === "Offline" ? (
//               <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-full mb-2">
//                 <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
//                 Offline
//               </span>
//             ) : (
//               <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg mb-2">
//                 In Disconnect
//               </span>
//             )}

//             <p className="text-xs text-gray-500">
//               Last synced: {device.lastSynced}
//             </p>
//             <p className="text-xs text-gray-900 mt-1">Storage: {device.storage}</p>
//           </div>
//         </div>

//         <button
//           onClick={() =>
//             setOpenMenuId(openMenuId === device.id ? null : device.id)
//           }
//           className="p-1 hover:bg-gray-100 rounded"
//         >
//           <MoreVertical className="w-5 h-5 text-gray-400" />
//         </button>
//       </div>

//       {openMenuId === device.id && (
//         <>
//           <div
//             className="fixed inset-0 z-10"
//             onClick={() => setOpenMenuId(null)}
//           ></div>
//           <div className="mt-2 bg-gray-50 rounded-lg p-2 space-y-1 relative z-20">
//             <button
//               onClick={() => onPreview(device)}
//               className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-white rounded flex items-center gap-2"
//             >
//               <Eye className="w-4 h-4" />
//               Preview
//             </button>
//             <button
//               onClick={() => onRename(device)}
//               className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-white rounded flex items-center gap-2"
//             >
//               <PenLine className="w-4 h-4" />
//               Rename
//             </button>
//             <button
//               onClick={() => onReport(device)}
//               className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-white rounded flex items-center gap-2"
//             >
//               <CircleHelp className="w-4 h-4" />
//               Report
//             </button>
//             <button
//               onClick={() => onRemove(device)}
//               className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-white rounded flex items-center gap-2"
//             >
//               <Trash2 className="w-4 h-4" />
//               Remove Device
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
