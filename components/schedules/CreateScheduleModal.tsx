// "use client";

// import React, { useState } from "react";
// import { X, Check, Video, Clock, Calendar, Monitor } from "lucide-react";

// interface Schedule {
//   id?: string;
//   name: string;
//   description: string;
//   content: string[];
//   devices: string[];
//   repeat: "once" | "daily" | "weekly" | "monthly";
//   playTime?: string;
//   days?: string[];
//   active?: boolean;
// }

// interface CreateScheduleModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSave: (schedule: Schedule) => void;
//   initialData?: Schedule | null; // For editing
//   contentItems?: string[];
//   screens?: { name: string; status: "online" | "offline" }[];
// }

// const defaultContent = ["Video 1", "Video 2", "Welcome Video", "Promotion 2025"];
// const defaultScreens: { name: string; status: "online" | "offline" }[] = [
//   { name: "Main Lobby Display", status: "online" },
//   { name: "Building A, Ground Floor", status: "online" },
//   { name: "Building B, 2nd Floor", status: "offline" },
//   { name: "Cafeteria Display", status: "offline" },
// ];

// export default function CreateScheduleModal({
//   isOpen,
//   onClose,
//   onSave,
//   initialData = null,
//   contentItems = defaultContent,
//   screens = defaultScreens,
// }: CreateScheduleModalProps) {
//   const [step, setStep] = useState(1);

//   const [form, setForm] = useState<Partial<Schedule>>(
//     initialData || {
//       name: "",
//       description: "",
//       content: [],
//       devices: [],
//       repeat: "daily",
//       playTime: "09:00 AM",
//       days: [],
//     }
//   );

//   if (!isOpen) return null;

//   const isEditing = !!initialData;

//   const next = () => step < 4 && setStep(step + 1);
//   const prev = () => step > 1 && setStep(step - 1);

//   const handleSave = () => {
//     if (!form.name) return alert("Schedule name is required");

//     onSave({
//       ...form,
//       id: initialData?.id || Date.now().toString(),
//       active: initialData?.active ?? true,
//     } as Schedule);

//     onClose();
//   };

//   const toggleDay = (day: string) => {
//     const days = form.days || [];
//     setForm({
//       ...form,
//       days: days.includes(day) ? days.filter((d) => d !== day) : [...days, day],
//     });
//   };

//   const toggleContent = (item: string) => {
//     const content = form.content || [];
//     setForm({
//       ...form,
//       content: content.includes(item)
//         ? content.filter((c) => c !== item)
//         : [...content, item],
//     });
//   };

//   const toggleDevice = (device: string) => {
//     const devices = form.devices || [];
//     setForm({
//       ...form,
//       devices: devices.includes(device)
//         ? devices.filter((d) => d !== device)
//         : [...devices, device],
//     });
//   };

//   const steps = [
//     { id: 1, title: "Name & Description", icon: Video },
//     { id: 2, title: "Select Content", icon: Video },
//     { id: 3, title: "Choose Screens", icon: Monitor },
//     { id: 4, title: "Schedule Settings", icon: Calendar },
//   ];

//   return (
//     <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-900">
//             {isEditing ? "Edit Schedule" : "Create New Schedule"}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition"
//           >
//             <X className="w-6 h-6" />
//           </button>
//         </div>

//         <div className="p-6 max-h-[calc(90vh-180px)] overflow-y-auto">
//           {/* Vertical Step Progress - Inspired by AddDeviceModal */}
//           <div className="relative mb-10">
//             <div className="absolute left-5 top-12 bottom-12 w-0.5 bg-gray-200 -z-0" />

//             <div className="space-y-8">
//               {steps.map((s, i) => {
//                 const Icon = s.icon;
//                 const isActive = step === s.id;
//                 const isCompleted = step > s.id;

//                 return (
//                   <div key={s.id} className="flex items-center gap-5">
//                     <div
//                       className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
//                         isCompleted
//                           ? "bg-green-100 text-green-700"
//                           : isActive
//                           ? "bg-blue-100 text-blue-700 ring-4 ring-blue-100"
//                           : "bg-gray-100 text-gray-400"
//                       }`}
//                     >
//                       {isCompleted ? <Check className="w-5 h-5" /> : i + 1}
//                     </div>
//                     <div className="flex-1">
//                       <p className={`font-medium ${isActive || isCompleted ? "text-gray-900" : "text-gray-500"}`}>
//                         {s.title}
//                       </p>
//                     </div>
//                     {i < steps.length - 1 && <div className="w-full h-0.5 bg-gray-200" />}
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Step Content */}
//           <div className="space-y-6">
//             {/* Step 1: Name & Description */}
//             {step === 1 && (
//               <>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Name</label>
//                   <input
//                     type="text"
//                     value={form.name || ""}
//                     onChange={(e) => setForm({ ...form, name: e.target.value })}
//                     placeholder="e.g. Morning Welcome"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
//                   <textarea
//                     value={form.description || ""}
//                     onChange={(e) => setForm({ ...form, description: e.target.value })}
//                     placeholder="Describe what this schedule does..."
//                     rows={4}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none outline-none transition"
//                   />
//                 </div>
//               </>
//             )}

//             {/* Step 2: Content Selection */}
//             {step === 2 && (
//               <div>
//                 <h3 className="text-lg font-semibold mb-4">Select Content</h3>
//                 <div className="space-y-3">
//                   {contentItems.map((item) => (
//                     <label
//                       key={item}
//                       className="flex items-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition"
//                     >
//                       <input
//                         type="checkbox"
//                         checked={form.content?.includes(item)}
//                         onChange={() => toggleContent(item)}
//                         className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
//                       />
//                       <div className="w-16 h-16 bg-gray-200 border-2 border-dashed rounded ml-4" />
//                       <div className="ml-4 flex-1">
//                         <p className="font-medium text-gray-900">{item}</p>
//                         <p className="text-sm text-gray-500">Video • 40 MB</p>
//                       </div>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Screen Selection */}
//             {step === 3 && (
//               <div>
//                 <h3 className="text-lg font-semibold mb-4">Select Screens</h3>
//                 <div className="space-y-3">
//                   {screens.map((screen) => (
//                     <label
//                       key={screen.name}
//                       className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition"
//                     >
//                       <div className="flex items-center">
//                         <input
//                           type="checkbox"
//                           checked={form.devices?.includes(screen.name)}
//                           onChange={() => toggleDevice(screen.name)}
//                           className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
//                         />
//                         <span className="ml-4 font-medium">{screen.name}</span>
//                       </div>
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-medium ${
//                           screen.status === "online"
//                             ? "bg-green-100 text-green-700"
//                             : "bg-red-100 text-red-700"
//                         }`}
//                       >
//                         {screen.status}
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Step 4: Schedule Settings */}
//             {step === 4 && (
//               <div className="space-y-6">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-3">Repeat</label>
//                   <select
//                     value={form.repeat}
//                     onChange={(e) => setForm({ ...form, repeat: e.target.value as any })}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                   >
//                     <option value="once">Run Once</option>
//                     <option value="daily">Daily</option>
//                     <option value="weekly">Weekly</option>
//                     <option value="monthly">Monthly</option>
//                   </select>
//                 </div>

//                 {form.repeat === "weekly" && (
//                   <div>
//                     <p className="text-sm font-medium text-gray-700 mb-4">Select Days</p>
//                     <div className="grid grid-cols-7 gap-3">
//                       {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
//                         <button
//                           key={day}
//                           type="button"
//                           onClick={() => toggleDay(day)}
//                           className={`py-3 rounded-lg font-medium transition ${
//                             form.days?.includes(day)
//                               ? "bg-blue-600 text-white"
//                               : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                           }`}
//                         >
//                           {day}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {(form.repeat === "daily" || form.repeat === "weekly") && (
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-3">Play Time</label>
//                     <input
//                       type="text"
//                       value={form.playTime || ""}
//                       onChange={(e) => setForm({ ...form, playTime: e.target.value })}
//                       placeholder="09:00 AM"
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
//                     />
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between px-6 py-5 border-t border-gray-200 bg-gray-50">
//           <button
//             onClick={prev}
//             disabled={step === 1}
//             className="px-6 py-3 text-gray-700 font-medium disabled:opacity-50"
//           >
//             ← Previous
//           </button>

//           <div className="flex items-center gap-4">
//             <span className="text-sm text-gray-500">Step {step} of 4</span>
//             {step < 4 ? (
//               <button
//                 onClick={next} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition">
//                 Next →
//               </button>
//             ) : (
//               <button
//                 onClick={handleSave}
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition"
//               >
//                 {isEditing ? "Update Schedule" : "Create Schedule"}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }