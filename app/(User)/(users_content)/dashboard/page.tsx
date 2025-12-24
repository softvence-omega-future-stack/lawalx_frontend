// // "use client";

// // import React, { useState } from "react";
// // import {
// //   X,
// //   Monitor,
// //   Wifi,
// //   HardDrive,
// //   Calendar,
// //   Plus,
// //   TrendingUp,
// //   Bell,
// //   Crown,
// //   Radio,
// //   Tv,
// //   Activity,
// //   Video,
// //   Share2,
// //   WifiOff,
// //   ArrowUpRight,
// //   ChevronRight,
// //   ChevronLeft,
// //   Search,
// //   FileText,
// //   Check,
// //   QrCode,
// //   CircleCheckBigIcon,
// //   ScreenShare,
// // } from "lucide-react";
// // import ActionCardButton from "@/common/ActionCardButton";
// // import Dropdown from "@/common/Dropdown";
// // import Image from "next/image";

// // // Modal Component
// // interface CreateScreenModalProps {
// //   isOpen: boolean;
// //   onClose: () => void;
// // }

// // function CreateScreenModal({ isOpen, onClose }: CreateScreenModalProps) {
// //   const [currentStep, setCurrentStep] = useState(1);
// //   const [selectedType, setSelectedType] = useState("video");
// //   const [formData, setFormData] = useState<{
// //     name: string;
// //     description: string;
// //     selectedVideos: number[];
// //     selectedDevices: number[];
// //   }>({
// //     name: "",
// //     description: "",
// //     selectedVideos: [],
// //     selectedDevices: [],
// //   });

// //   // Mock video data
// //   const videos = [
// //     {
// //       id: 1,
// //       name: "Video 1",
// //       size: "40 MB",
// //       thumbnail: "/userDashboard/modal_video.png",
// //     },
// //     {
// //       id: 2,
// //       name: "Video 2",
// //       size: "40 MB",
// //       thumbnail: "/userDashboard/modal_video.png",
// //     },
// //     {
// //       id: 3,
// //       name: "Video 3",
// //       size: "40 MB",
// //       thumbnail: "/userDashboard/modal_video.png",
// //     },
// //     {
// //       id: 4,
// //       name: "Video 4",
// //       size: "40 MB",
// //       thumbnail: "/userDashboard/modal_video.png",
// //     },
// //     {
// //       id: 5,
// //       name: "Video 5",
// //       size: "40 MB",
// //       thumbnail: "/userDashboard/modal_video.png",
// //     },
// //     {
// //       id: 6,
// //       name: "Video 6",
// //       size: "40 MB",
// //       thumbnail: "/userDashboard/modal_video.png",
// //     },
// //     {
// //       id: 7,
// //       name: "Video 7",
// //       size: "40 MB",
// //       thumbnail: "/userDashboard/modal_video.png",
// //     },
// //     {
// //       id: 8,
// //       name: "Video 8",
// //       size: "40 MB",
// //       thumbnail: "/userDashboard/modal_video.png",
// //     },
// //   ];

// //   // Mock device data
// //   const devices = [
// //     {
// //       id: 1,
// //       name: "LG UR75 43 Inch 4K UHD Smart LED TV",
// //       resolution: "3840 × 2160",
// //       online: true,
// //     },
// //     {
// //       id: 2,
// //       name: "LG UR75 43 Inch 4K UHD Smart LED TV",
// //       resolution: "3840 × 2160",
// //       online: false,
// //     },
// //     {
// //       id: 3,
// //       name: "LG UR75 43 Inch 4K UHD Smart LED TV",
// //       resolution: "3840 × 2160",
// //       online: false,
// //     },
// //   ];

// //   const handleNext = () => {
// //     if (currentStep < 3) {
// //       setCurrentStep(currentStep + 1);
// //     }
// //   };

// //   const handlePrevious = () => {
// //     if (currentStep > 1) {
// //       setCurrentStep(currentStep - 1);
// //     }
// //   };

// //   const handleCreate = () => {
// //     console.log("Creating screen with data:", formData);
// //     // Reset and close
// //     setCurrentStep(1);
// //     setFormData({
// //       name: "",
// //       description: "",
// //       selectedVideos: [],
// //       selectedDevices: [],
// //     });
// //     onClose();
// //   };

// //   const toggleVideoSelection = (videoId: number) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       selectedVideos: prev.selectedVideos.includes(videoId)
// //         ? prev.selectedVideos.filter((id) => id !== videoId)
// //         : [...prev.selectedVideos, videoId],
// //     }));
// //   };

// //   const toggleDeviceSelection = (deviceId: number) => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       selectedDevices: prev.selectedDevices.includes(deviceId)
// //         ? prev.selectedDevices.filter((id) => id !== deviceId)
// //         : [...prev.selectedDevices, deviceId],
// //     }));
// //   };

// //   if (!isOpen) return null;

// //   return (
// //     <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-2xl border border-bgGray w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
// //         {/* Header */}
// //         <div className="flex items-center justify-between p-6">
// //           <h2 className="text-3xl font-bold text-[#171717]">
// //             Create New Screen
// //           </h2>
// //           <button
// //             onClick={onClose}
// //             className="text-gray-400 hover:text-gray-600 transition-colors"
// //           >
// //             <X className="w-6 h-6" />
// //           </button>
// //         </div>

// //         {/* Steps Indicator */}
// //         <div className="flex items-center justify-between px-6 py-5 border-b border-borderGray">
// //           {/* Step 1 */}
// //           <div className="flex items-center gap-3">
// //             <div
// //               className={`w-12 h-12 rounded-full flex items-center justify-center ${
// //                 currentStep >= 1
// //                   ? "bg-blue-50 border border-bgBlue"
// //                   : "bg-gray-100 border border-gray-300"
// //               }
// //               ${
// //                 currentStep > 1 ? "border-green-300 bg-green-50" : ""
// //               }
// //               `}
// //             >
// //               {currentStep > 1 ? (
// //                 <CircleCheckBigIcon className="w-6 h-6 text-[#22C55E]" />
// //               ) : (
// //                 <FileText
// //                   className={`w-6 h-6 ${
// //                     currentStep >= 1 ? "text-bgBlue border-bgBlue" : "text-gray-400"
// //                   }`}
// //                 />
// //               )}
// //             </div>
// //             <div>
// //               <div
// //                 className={`font-semibold ${
// //                   currentStep >= 1 ? "text-gray-900" : "text-gray-400"
// //                 }`}
// //               >
// //                 Step 1
// //               </div>
// //               <div className="text-sm text-gray-500">Screen Information</div>
// //             </div>
// //           </div>

// //           {/* Step 2 */}
// //           <div className="flex items-center gap-3">
// //             <div
// //               className={`w-12 h-12 rounded-full flex items-center justify-center ${
// //                 currentStep >= 2
// //                   ? "bg-blue-50 border border-bgBlue"
// //                   : "bg-gray-100 border border-gray-300"
// //               }
// //               ${
// //                 currentStep > 2 ? "border-green-300 bg-green-50" : ""
// //               }
// //               `}
// //             >
// //               {currentStep > 2 ? (
// //                 <CircleCheckBigIcon className="w-6 h-6 text-[#22C55E]" />
// //               ) : (
// //                 <Video
// //                   className={`w-6 h-6 ${
// //                     currentStep >= 2 ? "text-bgBlue" : "text-gray-400"
// //                   }`}
// //                 />
// //               )}
// //             </div>
// //             <div>
// //               <div
// //                 className={`font-semibold ${
// //                   currentStep >= 2 ? "text-gray-900" : "text-gray-400"
// //                 }`}
// //               >
// //                 Step 2
// //               </div>
// //               <div className="text-sm text-gray-500">Content Selection</div>
// //             </div>
// //           </div>

// //           {/* Step 3 */}
// //           <div className="flex items-center gap-3">
// //             <div
// //               className={`w-12 h-12 rounded-full flex items-center justify-center ${
// //                 currentStep >= 3
// //                   ? "bg-blue-50 border border-bgBlue"
// //                   : "bg-gray-100 border border-gray-300"
// //               }`}
// //             >
// //               <Monitor
// //                 className={`w-6 h-6 ${
// //                   currentStep >= 3 ? "text-bgBlue" : "text-gray-400"
// //                 }`}
// //               />
// //             </div>
// //             <div>
// //               <div
// //                 className={`font-semibold ${
// //                   currentStep >= 3 ? "text-gray-900" : "text-gray-400"
// //                 }`}
// //               >
// //                 Step 3
// //               </div>
// //               <div className="text-sm text-gray-500">Device Selection</div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Content Area */}
// //         <div className="flex-1 overflow-y-auto p-6">
// //           {/* Step 1: Screen Information */}
// //           {currentStep === 1 && (
// //             <div className="space-y-5">
// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-900 mb-2">
// //                   Name
// //                 </label>
// //                 <input
// //                   type="text"
// //                   value={formData.name}
// //                   onChange={(e) =>
// //                     setFormData({ ...formData, name: e.target.value })
// //                   }
// //                   placeholder="Store A - NYC"
// //                   className="w-full px-4 py-3 border border-borderGray rounded-xl focus:outline-none focus:ring-2 focus:ring-bgBlue focus:border-transparent"
// //                 />
// //               </div>
// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-900 mb-2">
// //                   Description
// //                 </label>
// //                 <textarea
// //                   value={formData.description}
// //                   onChange={(e) =>
// //                     setFormData({ ...formData, description: e.target.value })
// //                   }
// //                   placeholder="Enter screen description"
// //                   rows={6}
// //                   className="w-full px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-bgBlue focus:border-transparent resize-none"
// //                 />
// //               </div>
// //             </div>
// //           )}

// //           {/* Step 2: Content Selection */}
// //           {currentStep === 2 && (
// //             <div className="space-y-4">
// //               <div className="flex items-center gap-3 w-full">
// //                 {/* Search Input (70%) */}
// //                 <div className="relative flex-[0.7]">
// //                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
// //                   <input
// //                     type="text"
// //                     placeholder="Search Content"
// //                     className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                 </div>

// //                 {/* Dropdown (30%) */}
// //                 <div className="flex-[0.3]">
// //                   <Dropdown
// //                     options={[
// //                       { value: "video", label: "Videos" },
// //                       { value: "image", label: "Images" },
// //                       { value: "audio", label: "Audio" },
// //                     ]}
// //                     value={selectedType}
// //                     onChange={(value) => setSelectedType(String(value))}
// //                     className="w-full"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="border border-borderGray rounded-lg max-h-76 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
// //                 {videos.map((video) => (
// //                   <div
// //                     key={video.id}
// //                     className="flex items-center gap-4 p-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
// //                     onClick={() => toggleVideoSelection(video.id)}
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       checked={formData.selectedVideos.includes(video.id)}
// //                       onChange={() => toggleVideoSelection(video.id)}
// //                       className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
// //                     />
// //                     <div className="w-20 h-14 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
// //                       <Image
// //                         src={video.thumbnail}
// //                         alt={video.name}
// //                         width={80}
// //                         height={56}
// //                         className="w-full h-full object-cover"
// //                       />
// //                     </div>
// //                     <div className="flex-1">
// //                       <div className="font-medium text-gray-900">
// //                         {video.name}
// //                       </div>
// //                       <div className="text-sm text-gray-500">{video.size}</div>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* Step 3: Device Selection */}
// //           {currentStep === 3 && (
// //             <div className="space-y-5">
// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-900 mb-3">
// //                   Select Devices
// //                 </label>
// //                 <div className="border border-borderGray rounded-lg divide-y max-h-64 overflow-y-auto">
// //                   {devices.map((device) => (
// //                     <div
// //                       key={device.id}
// //                       className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer"
// //                       onClick={() => toggleDeviceSelection(device.id)}
// //                     >
// //                       <input
// //                         type="checkbox"
// //                         checked={formData.selectedDevices.includes(device.id)}
// //                         onChange={() => toggleDeviceSelection(device.id)}
// //                         className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
// //                       />
// //                       <div className="flex-1">
// //                         <div className="flex items-center gap-2">
// //                           <span className="font-medium text-gray-900">
// //                             {device.name}
// //                           </span>
// //                           <span
// //                             className={`text-xs px-2 py-1 border rounded-md flex items-center gap-1 ${
// //                               device.online
// //                                 ? "bg-green-50 text-green-700 border-green-200"
// //                                 : "bg-red-50 text-red-700 border-red-200"
// //                             }`}
// //                           >
// //                             {device.online ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
// //                             {device.online ? "Online" : "Offline"}
// //                           </span>
// //                         </div>
// //                         <div className="text-sm text-gray-500">
// //                           {device.resolution}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-semibold text-gray-900 mb-3">
// //                   Add New Device
// //                 </label>
// //                 <div className="flex items-center gap-3">
// //                   <input
// //                     type="text"
// //                     placeholder="Enter the PIN or scan the QR code"
// //                     className="flex-1 px-4 py-3 border border-borderGray rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                   />
// //                   <button className="p-3 border border-borderGray rounded-lg hover:bg-gray-50 transition-colors">
// //                     <QrCode className="w-6 h-6 text-gray-600" />
// //                   </button>
// //                   <button className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
// //                     Add
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>

// //         {/* Footer */}
// //         <div className="flex items-center justify-between px-6 py-4 border-t border-borderGray">
// //           <button
// //             onClick={handlePrevious}
// //             disabled={currentStep === 1}
// //             className={`flex items-center gap-2 px-5 py-2.5 border border-borderGray rounded-lg font-medium transition-colors ${
// //               currentStep === 1
// //                 ? "text-gray-400 cursor-not-allowed"
// //                 : "text-gray-700 hover:scale-[1.02] hover:bg-gray-50 cursor-pointer"
// //             }`}
// //           >
// //             <ChevronLeft className="w-5 h-5" />
// //             Previous
// //           </button>

// //           <div className="text-sm text-gray-600">Step {currentStep} of 3</div>

// //           {currentStep < 3 ? (
// //             <button
// //               onClick={handleNext}
// //               className="flex items-center gap-2 px-5 py-2.5 bg-bgBlue text-white rounded-lg font-medium hover:cursor-pointer hover:bg-blue-400 transition-colors"
// //             >
// //               Next
// //               <ChevronRight className="w-5 h-5" />
// //             </button>
// //           ) : (
// //             <button
// //               onClick={handleCreate}
// //               className="px-6 py-2.5 bg-bgBlue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
// //             >
// //               Create
// //             </button>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // Main Dashboard Component
// // export default function Dashboard() {
// //   const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);
// //   const [isModalOpen, setIsModalOpen] = useState(false);

// //   const devices = [
// //     {
// //       name: "Lobby Screen",
// //       online: true,
// //       location: "Head Office",
// //       screen: "Screen 1",
// //     },
// //     {
// //       name: "Conference Room",
// //       online: false,
// //       location: "Floor 2",
// //       screen: "Screen 2",
// //     },
// //     {
// //       name: "Reception Display",
// //       online: true,
// //       location: "USA Branch",
// //       screen: "Screen 5",
// //     },
// //     {
// //       name: "Meeting Room",
// //       online: false,
// //       location: "California Branch",
// //       screen: "Screen 1",
// //     },
// //   ];

// //   const activities = [
// //     {
// //       type: "device",
// //       title: "Lobby Screen added",
// //       description: "New device added to network",
// //       time: "2 hours ago",
// //     },
// //     {
// //       type: "notification",
// //       title: "Content uploaded",
// //       description: "New video content uploaded",
// //       time: "1 day ago",
// //     },
// //     {
// //       type: "device",
// //       title: "Reception Display added",
// //       description: "New device added to network",
// //       time: "5 hours ago",
// //     },
// //     {
// //       type: "notification",
// //       title: "Content uploaded",
// //       description: "New video content uploaded",
// //       time: "1 day ago",
// //     },
// //   ];

// //   const totalDevices = devices.length;
// //   const onlineDevices = devices.filter((d) => d.online).length;
// //   const offlineDevices = devices.filter((d) => !d.online).length;

// //   return (
// //     <div className="min-h-screen">
// //       {/* Upgrade Banner */}
// //       {showUpgradeBanner && (
// //         <div
// //           className="rounded-lg shadow-sm p-4 mb-6 flex items-center justify-between"
// //           style={{
// //             background:
// //               "linear-gradient(270deg, rgba(34, 197, 94, 0) 0%, rgba(34, 197, 94, 0.1) 98.77%), var(--Card-Background, #FFF)",
// //           }}
// //         >
// //           <div className="flex items-center gap-3">
// //             <Crown className="w-5 h-5 text-gray-700 hidden md:block" />
// //             <div>
// //               <h3 className="font-semibold text-gray-900">
// //                 Trial ends in 12 days!
// //               </h3>
// //               <p className="text-sm text-gray-600 hidden md:block">
// //                 Upgrade to Premium for more features.
// //               </p>
// //             </div>
// //           </div>
// //           <div className="flex items-center gap-3">
// //             <button className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 hover:scale-[1.02] transition-transform flex items-center gap-2 cursor-pointer">
// //               Upgrade
// //             </button>
// //             <button
// //               onClick={() => setShowUpgradeBanner(false)}
// //               className="text-gray-400 hover:text-gray-600"
// //             >
// //               <X className="w-5 h-5" />
// //             </button>
// //           </div>
// //         </div>
// //       )}

// //       {/* Stats Cards */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
// //         <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
// //           <div className="flex items-center justify-between mb-2">
// //             <span className="text-sm text-gray-600">Total Devices</span>
// //             <span className="mt-0.5 p-2.5 border rounded-full border-gray-200">
// //               <Monitor className="w-7 h-7 text-gray-400" />
// //             </span>
// //           </div>
// //           <div className="text-3xl font-bold text-gray-900 mb-2">
// //             {totalDevices}
// //           </div>
// //           <div className="text-sm text-green-500 flex items-center gap-1 mb-2">
// //             <TrendingUp className="w-4 h-4" />
// //             {totalDevices > 0
// //               ? `${totalDevices} New This Week`
// //               : "0 New This Week"}
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
// //           <div className="flex items-center justify-between mb-2">
// //             <span className="text-sm text-gray-600">Online Status</span>
// //             <span className="mt-0.5 p-2.5 border rounded-full border-gray-200">
// //               <Radio className="w-7 h-7 text-green-500" />
// //             </span>
// //           </div>
// //           <div className="text-3xl font-bold text-gray-900 mb-1">
// //             {onlineDevices}
// //           </div>
// //           <div className="text-sm text-red-500 flex items-center gap-1">
// //             {offlineDevices} Offline ⚠
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
// //           <div className="flex items-center justify-between mb-2">
// //             <span className="text-sm text-gray-600">Storage</span>
// //             <span className="mt-0.5 p-2.5 border rounded-full border-gray-200">
// //               <HardDrive className="w-7 h-7 text-green-500" />
// //             </span>
// //           </div>
// //           <div className="text-3xl font-bold text-gray-900 mb-1">
// //             5.0/10 <span className="text-sm text-gray-500">GB</span>
// //           </div>
// //           <div className="mt-3 w-full flex items-center gap-3">
// //             <div className="flex-1 bg-gray-200 rounded-full h-2">
// //               <div
// //                 className="bg-blue-500 h-2 rounded-full"
// //                 style={{ width: "50%" }}
// //               ></div>
// //             </div>
// //             <button className="text-sm text-bgBlue hover:text-blue-500">
// //               Upgrade <ArrowUpRight className="w-4 h-4 inline-block" />
// //             </button>
// //           </div>
// //         </div>

// //         <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
// //           <div className="flex items-center justify-between mb-2">
// //             <span className="text-sm text-gray-600">Active Apps</span>
// //             <span className="mt-0.5 p-2.5 border rounded-full border-gray-200">
// //               <Radio className="w-7 h-7 text-green-500" />
// //             </span>
// //           </div>
// //           <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
// //           <div className="text-sm text-red-500 flex items-center gap-1">
// //             0 Offline ⚠
// //           </div>
// //         </div>
// //       </div>

// //       {/* Add New Section */}
// //       <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
// //         <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New</h2>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
// //           <ActionCardButton
// //             onClick={() => setIsModalOpen(true)}
// //             icon={<ScreenShare className="text-white" />}
// //             title="Create Screen"
// //             subtitle="Create a new screen to play on your devices"
// //             active
// //           />
// //           <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-md hover:border-gray-300 cursor-pointer transition-colors">
// //             <Tv className="w-11 h-11 text-[#155DFC] p-2 bg-blue-50 rounded-lg" />
// //             <div className="text-left">
// //               <div className="font-medium text-gray-900">Add Device</div>
// //               <div className="text-[.6rem] md:text-sm text-gray-600">
// //                 Add New Device
// //               </div>
// //             </div>
// //           </button>
// //           <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
// //             <Video className="w-11 h-11 text-[#155DFC] p-2 bg-blue-50 rounded-lg" />
// //             <div className="text-left">
// //               <div className="font-medium text-gray-900">Upload Content</div>
// //               <div className="text-[.6rem] md:text-sm text-gray-600">
// //                 Add new content
// //               </div>
// //             </div>
// //           </button>
// //           <button className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-gray-300 cursor-pointer transition-colors">
// //             <Calendar className="w-11 h-11 text-[#155DFC] p-2 bg-blue-50 rounded-lg" />
// //             <div className="text-left">
// //               <div className="font-medium text-gray-900">Schedule</div>
// //               <div className="text-[.6rem] md:text-sm text-gray-600">
// //                 Schedule new content
// //               </div>
// //             </div>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Recent Devices & Activities */}
// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //         {/* Recent Devices */}
// //         <div className="bg-white rounded-lg shadow-sm">
// //           <div className="flex items-center justify-between p-6 border-b border-[#D4D4D4]">
// //             <h2 className="text-lg font-semibold text-gray-900">
// //               Recent Devices
// //             </h2>
// //             <button className="text-sm text-[#0FA6FF] hover:text-blue-500 cursor-pointer">
// //               View All
// //             </button>
// //           </div>

// //           <div className="space-y-3 p-6">
// //             {devices.map((device, index) => (
// //               <div
// //                 key={index}
// //                 className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg"
// //               >
// //                 <span className="mt-0.5 p-2.5 border rounded-sm border-gray-200">
// //                   <Monitor className="w-4 h-4 text-gray-400" />
// //                 </span>
// //                 <div className="flex-1">
// //                   <div className="flex items-center gap-2">
// //                     <span className="font-medium text-gray-900">
// //                       {device.name}
// //                     </span>
// //                     <span
// //                       className={`text-xs px-2 py-0.5 rounded-2xl flex items-center gap-1 ${
// //                         device.online
// //                           ? "bg-green-100 text-green-700"
// //                           : "bg-red-100 text-red-700"
// //                       }`}
// //                     >
// //                       {device.online ? (
// //                         <>
// //                           <Wifi className="w-3 h-3" />
// //                           Online
// //                         </>
// //                       ) : (
// //                         <>
// //                           <WifiOff className="w-3 h-3" />
// //                           Offline
// //                         </>
// //                       )}
// //                     </span>
// //                   </div>
// //                   <div className="text-sm text-gray-600">{device.location}</div>
// //                   <div className="text-xs text-gray-500">{device.screen}</div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>

// //         {/* Recent Activities */}
// //         <div className="bg-white rounded-lg shadow-sm">
// //           <div className="flex items-center justify-between border-b p-6 border-[#D4D4D4]">
// //             <h2 className="text-lg font-semibold text-gray-900">
// //               Recent Activities
// //             </h2>
// //             <button className="text-sm text-[#0FA6FF] hover:text-blue-500 cursor-pointer">
// //               View All
// //             </button>
// //           </div>

// //           <div className="space-y-3 p-6">
// //             {activities.map((activity, index) => (
// //               <div
// //                 key={index}
// //                 className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg"
// //               >
// //                 {activity.type === "device" ? (
// //                   <span className="mt-0.5 p-2.5 border rounded-full border-gray-200 bg-gray-50">
// //                     <Monitor className="w-4 h-4 text-gray-400" />
// //                   </span>
// //                 ) : (
// //                   <span className="mt-0.5 p-2.5 border rounded-full border-gray-200 bg-gray-50">
// //                     <Bell className="w-4 h-4 text-gray-400" />
// //                   </span>
// //                 )}
// //                 <div className="flex-1">
// //                   <div className="font-medium text-gray-900">
// //                     {activity.title}
// //                   </div>
// //                   <div className="text-sm text-gray-600">
// //                     {activity.description}
// //                   </div>
// //                   <div className="text-xs text-gray-500 mt-1">
// //                     {activity.time}
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* Modal */}
// //       <CreateScreenModal
// //         isOpen={isModalOpen}
// //         onClose={() => setIsModalOpen(false)}
// //       />
// //     </div>
// //   );
// // }
// "use client";

// import React, { useState } from "react";
// import {
//   Monitor,
//   Wifi,
//   HardDrive,
//   Calendar,
//   TrendingUp,
//   Bell,
//   Tv,
//   Video,
//   ArrowUpRight,
//   ScreenShare,
//   WifiOff,
//   TriangleAlertIcon,
// } from "lucide-react";

// import ActionCardButton from "@/common/ActionCardButton";
// import CreateScreenModal from "@/components/dashboard/CreateScreenModal";
// import AddDeviceModal from "@/components/dashboard/AddDeviceModal";
// import Image from "next/image";
// import Link from "next/link";
// import ScheduleModal from "@/components/schedules/CreateScheduleModal";

// export default function Dashboard() {
//   // const [showUpgradeBanner, setShowUpgradeBanner] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);

//   const devices = [
//     {
//       name: "Lobby Screen",
//       online: true,
//       location: "Head Office",
//       screen: "Screen 1",
//     },
//     {
//       name: "Conference Room",
//       online: false,
//       location: "Floor 2",
//       screen: "Screen 2",
//     },
//     {
//       name: "Reception Display",
//       online: true,
//       location: "USA Branch",
//       screen: "Screen 5",
//     },
//     {
//       name: "Meeting Room",
//       online: false,
//       location: "California Branch",
//       screen: "Screen 1",
//     },
//   ];

//   const activities = [
//     {
//       type: "device",
//       title: "Lobby Screen added",
//       description: "New device added to network",
//       time: "2 hours ago",
//     },
//     {
//       type: "notification",
//       title: "Content uploaded",
//       description: "New video content uploaded",
//       time: "1 day ago",
//     },
//     {
//       type: "device",
//       title: "Reception Display added",
//       description: "New device added to network",
//       time: "5 hours ago",
//     },
//     {
//       type: "notification",
//       title: "Content uploaded",
//       description: "New video content uploaded",
//       time: "1 day ago",
//     },
//   ];

//   const totalDevices = devices.length;
//   const onlineDevices = devices.filter((d) => d.online).length;
//   const offlineDevices = devices.filter((d) => !d.online).length;

//   const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

//   function handleSaveSchedule(data: unknown): void {
//     // Placeholder: handle saving the schedule (e.g. call API, update state)
//     console.log("Saved schedule:", data);
//     // close the modal after saving
//     setIsScheduleModalOpen(false);
//   }
//   return (
//     <div className="min-h-screen">
//       {/* Upgrade Banner */}
//       {/* {showUpgradeBanner && (
//         <div
//           className="rounded-xl shadow-sm p-4 mb-6 flex items-center justify-between"
//           style={{
//             background:
//               "linear-gradient(270deg, rgba(34, 197, 94, 0) 0%, rgba(34, 197, 94, 0.1) 98.77%), var(--Card-Background, #FFF)",
//           }}
//         >
//           <div className="flex items-center gap-3">
//             <Crown className="w-5 h-5 text-gray-700 hidden md:block" />
//             <div>
//               <h3 className="font-semibold text-gray-900">
//                 Trial ends in 12 days!
//               </h3>
//               <p className="text-sm text-gray-600 hidden md:block">
//                 Upgrade to Premium for more features.
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <button className="bg-gray-900 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-gray-800 hover:scale-[1.02] transition-transform flex items-center gap-2 cursor-pointer">
//               Upgrade
//             </button>
//             <button
//               onClick={() => setShowUpgradeBanner(false)}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       )} */}

//       <div className="flex items-center justify-center md:justify-between mb-6 dashboard-header-bg p-6 rounded-xl">
//         <div className="ml-0 space-y-1.5 md:ml-0 lg:ml-10">
//           <h1 className="text-2xl font-bold text-white">
//             Go Live on Any Screen Instantly
//           </h1>
//           <p className="text-sm text-gray-200">
//             Create your first screen and start displaying your content in
//             minutes.
//           </p>
//           <button className="bg-bgBlue shadow-customShadow px-4 py-2 rounded-lg text-white mt-4 hover:bg-gray-400 transition-colors text-sm font-medium cursor-pointer">
//             Upload Content
//           </button>
//         </div>
//         <div className="md:mr-2 lg:mr-4 xl:mr-10 md:block hidden">
//           <Image
//             src="/userDashboard/img3.webp"
//             alt="Dashboard Header"
//             height={165}
//             width={165}
//             style={{ transform: "scale(1.05)" }}
//           />
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         <div className="bg-[#EFF6FF] rounded-xl shadow-sm p-6 flex flex-col gap-6 justify-between">
//           <div className="flex items-center mb-2">
//             <span className="mt-0.5 p-2.5 border rounded-full border-bgBlue mr-2 bg-white">
//               <Monitor className="w-7 h-7 text-bgBlue" />
//             </span>
//             <span className="text-sm text-gray-600">Total Devices</span>
//           </div>
//           <div className="flex items-center justify-between text-gray-900 mb-2">
//             <span className="text-2xl font-semibold">{totalDevices}</span>
//             <div className="text-sm text-green-500 flex items-center gap-1 mb-2">
//               <TrendingUp className="w-4 h-4" />
//               {totalDevices > 0
//                 ? `${totalDevices} New This Week`
//                 : "0 New This Week"}
//             </div>
//           </div>
//         </div>

//         <div className="bg-[#F7FEFB] rounded-xl shadow-sm p-6 flex flex-col gap-6 justify-between">
//           <div className="flex items-center mb-2">
//             <span className="mt-0.5 p-2.5 border rounded-full border-bgGreen mr-2 bg-white">
//               <Wifi className="w-7 h-7 text-bgGreen" />
//             </span>
//             <span className="text-sm text-gray-600">Online Status</span>
//           </div>
//           <div className="flex items-center justify-between text-gray-900 mb-1">
//             <span className="text-2xl font-semibold">{onlineDevices}</span>
//             <div className="text-sm text-red-500 flex items-center gap-1">
//               {offlineDevices} Offline <TriangleAlertIcon className="w-4 h-4" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-[#FEF7F7] rounded-xl shadow-sm p-6 flex flex-col gap-6 justify-between">
//           <div className="flex items-center mb-2">
//             <span className="mt-0.5 p-2.5 border rounded-full border-bgRed mr-2 bg-white">
//               <WifiOff className="w-7 h-7 text-bgRed" />
//             </span>
//             <span className="text-sm text-gray-600">Offline Status</span>
//           </div>
//           <div className="flex items-center justify-between text-gray-900 mb-1">
//             <span className="text-2xl font-semibold">{onlineDevices}</span>
//             <div className="text-sm text-red-500 flex items-center gap-1">
//               {offlineDevices} Offline <TriangleAlertIcon className="w-4 h-4" />
//             </div>
//           </div>
//         </div>

//         <div className="bg-white border border-bgGray rounded-xl shadow-sm p-6 flex flex-col gap-6 justify-between">
//           <div className="flex items-center mb-2">
//             <span className="mt-0.5 p-2.5 border rounded-full border-gray-600 mr-2 bg-white ">
//               <HardDrive className="w-7 h-7 text-gray-600" />
//             </span>
//             <span className="text-sm text-gray-600">Storage</span>
//           </div>
//           <div className="flex items-center justify-between text-gray-900 mb-1">
//             <span className="text-xl font-semibold">5.0/10 GB</span>
//             <Link
//               href="/choose-plan"
//               className="text-sm text-bgBlue hover:text-blue-500"
//             >
//               Upgrade <ArrowUpRight className="w-4 h-4 inline-block" />
//             </Link>
//             {/* <div className="flex-1 bg-gray-200 rounded-full h-2">
//               <div
//                 className="bg-blue-500 h-2 rounded-full"
//                 style={{ width: "50%" }}
//               ></div>
//             </div> */}
//           </div>
//         </div>
//       </div>

//       {/* Add New Section */}
//       <div className="bg-white rounded-xl shadow-sm p-6 mb-6 add-bg-img">
//         <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
//           <ActionCardButton
//             onClick={() => setIsModalOpen(true)}
//             icon={<ScreenShare className="text-white w-4 h-4" />}
//             title="Create Screen"
//             subtitle="Create a new screen to play on your devices"
//             active
//           />
//           <button
//             onClick={() => setIsAddDeviceModalOpen(true)}
//             className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white  cursor-pointer transition-colors"
//           >
//             <Tv className="w-8 h-8 text-[#155DFC] p-2 bg-blue-50 rounded-md" />
//             <div className="text-left">
//               <div className="font-medium text-gray-900">Add Device</div>
//               <div className="text-[.6rem] md:text-sm text-gray-600">
//                 Add New Device
//               </div>
//             </div>
//           </button>
//           <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white  cursor-pointer transition-colors">
//             <Video className="w-8 h-8 text-[#155DFC] p-2 bg-blue-50 rounded-md" />
//             <div className="text-left">
//               <div className="font-medium text-gray-900">Upload Content</div>
//               <div className="text-[.6rem] md:text-sm text-gray-600">
//                 Add new content
//               </div>
//             </div>
//           </button>
//           <button
//             onClick={() => setIsScheduleModalOpen(true)}
//             className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-white  cursor-pointer transition-colors"
//           >
//             <Calendar className="w-8 h-8 text-[#155DFC] p-2 bg-blue-50 rounded-md" />
//             <div className="text-left">
//               <div className="font-medium text-gray-900">Schedule</div>
//               <div className="text-[.6rem] md:text-sm text-gray-600">
//                 Schedule new content
//               </div>
//             </div>
//           </button>
//         </div>
//       </div>

//       {/* Recent Devices & Activities */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Recent Devices */}
//         <div className="bg-white rounded-xl shadow-sm">
//           <div className="flex items-center justify-between p-6 border-b border-borderGray">
//             <h2 className="text-lg font-semibold text-gray-900">
//               Recent Devices
//             </h2>
//             <button className="text-sm text-bgBlue hover:text-blue-500 cursor-pointer">
//               View All
//             </button>
//           </div>

//           <div className="space-y-3 p-6">
//             {devices.map((device, index) => (
//               <div
//                 key={index}
//                 className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl"
//               >
//                 <span className="mt-0.5 p-2.5 border rounded-sm border-gray-200">
//                   <Monitor className="w-4 h-4 text-gray-400" />
//                 </span>
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2">
//                     <span className="font-medium text-gray-900">
//                       {device.name}
//                     </span>
//                     <span
//                       className={`text-xs px-2 py-0.5 rounded-md border flex items-center gap-1 ${
//                         device.online
//                           ? "bg-green-50 text-green-700 border-green-200"
//                           : "bg-red-50 text-red-700 border-red-200"
//                       }`}
//                     >
//                       {device.online ? (
//                         <>
//                           <Wifi className="w-3 h-3" />
//                           Online
//                         </>
//                       ) : (
//                         <>
//                           <WifiOff className="w-3 h-3" />
//                           Offline
//                         </>
//                       )}
//                     </span>
//                   </div>
//                   <div className="text-sm text-gray-600">{device.location}</div>
//                   <div className="text-xs text-gray-500">{device.screen}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Recent Activities */}
//         <div className="bg-white rounded-xl shadow-sm">
//           <div className="flex items-center justify-between border-b p-6 border-borderGray">
//             <h2 className="text-lg font-semibold text-gray-900">
//               Recent Activities
//             </h2>
//             <button className="text-sm text-bgBlue hover:text-blue-500 cursor-pointer">
//               View All
//             </button>
//           </div>

//           <div className="space-y-3 p-6">
//             {activities.map((activity, index) => (
//               <div
//                 key={index}
//                 className="flex items-start gap-3 p-3 border border-gray-200 rounded-xl"
//               >
//                 {activity.type === "device" ? (
//                   <span className="mt-0.5 p-2.5 border rounded-full border-gray-200 bg-gray-50">
//                     <Monitor className="w-4 h-4 text-gray-400" />
//                   </span>
//                 ) : (
//                   <span className="mt-0.5 p-2.5 border rounded-full border-gray-200 bg-gray-50">
//                     <Bell className="w-4 h-4 text-gray-400" />
//                   </span>
//                 )}
//                 <div className="flex-1">
//                   <div className="font-medium text-gray-900">
//                     {activity.title}
//                   </div>
//                   <div className="text-sm text-gray-600">
//                     {activity.description}
//                   </div>
//                   <div className="text-xs text-gray-500 mt-1">
//                     {activity.time}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Create Screen Modal */}
//       <CreateScreenModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       />

//       {/* Add Device Modal */}
//       <AddDeviceModal
//         isOpen={isAddDeviceModalOpen}
//         onClose={() => setIsAddDeviceModalOpen(false)}
//       />

//       <ScheduleModal 
//       isOpen={isScheduleModalOpen}
//         onClose={() => setIsScheduleModalOpen(false)}
//         onSave={handleSaveSchedule}
//       />
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import {
  Monitor,
  Wifi,
  HardDrive,
  Calendar,
  TrendingUp,
  Bell,
  Tv,
  Video,
  ArrowUpRight,
  ScreenShare,
  WifiOff,
  TriangleAlertIcon,
} from "lucide-react";

import ActionCardButton from "@/common/ActionCardButton";
import CreateScreenModal from "@/components/dashboard/CreateScreenModal";
import AddDeviceModal from "@/components/dashboard/AddDeviceModal";
import Image from "next/image";
import Link from "next/link";
import ScheduleModal from "@/components/schedules/CreateScheduleModal";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddDeviceModalOpen, setIsAddDeviceModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const devices = [
    { name: "Lobby Screen", online: true, location: "Head Office", screen: "Screen 1" },
    { name: "Conference Room", online: false, location: "Floor 2", screen: "Screen 2" },
    { name: "Reception Display", online: true, location: "USA Branch", screen: "Screen 5" },
    { name: "Meeting Room", online: false, location: "California Branch", screen: "Screen 1" },
  ];

  const activities = [
    { type: "device", title: "Lobby Screen added", description: "New device added to network", time: "2 hours ago" },
    { type: "notification", title: "Content uploaded", description: "New video content uploaded", time: "1 day ago" },
    { type: "device", title: "Reception Display added", description: "New device added to network", time: "5 hours ago" },
    { type: "notification", title: "Content uploaded", description: "New video content uploaded", time: "1 day ago" },
  ];

  const totalDevices = devices.length;
  const onlineDevices = devices.filter((d) => d.online).length;
  const offlineDevices = devices.filter((d) => !d.online).length;

  function handleSaveSchedule(data: unknown): void {
    console.log("Saved schedule:", data);
    setIsScheduleModalOpen(false);
  }

  return (
    <div className="min-h-screen">
      {/* Header Section - Keeps your gradient & images */}
      <div className="flex items-center justify-center md:justify-between mb-6 dashboard-header-bg p-6 rounded-xl">
        <div className="ml-0 space-y-1.5 md:ml-0 lg:ml-10">
          <h1 className="text-2xl font-bold text-white">
            Go Live on Any Screen Instantly
          </h1>
          <p className="text-sm text-gray-200">
            Create your first screen and start displaying your content in minutes.
          </p>
          <button className="bg-bgBlue shadow-customShadow px-4 py-2 rounded-lg text-white mt-4 hover:bg-gray-400 transition-colors text-sm font-medium cursor-pointer">
            Upload Content
          </button>
        </div>
        <div className="md:mr-2 lg:mr-4 xl:mr-10 md:block hidden">
          <Image
            src="/userDashboard/img3.webp"
            alt="Dashboard Header"
            height={165}
            width={165}
            style={{ transform: "scale(1.05)" }}
          />
        </div>
      </div>

      {/* Stats Cards - Same colors in light, dark-adapted */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-info-bg border border-border rounded-xl shadow-sm p-6 flex flex-col gap-6 justify-between">
          <div className="flex items-center mb-2">
            <span className="mt-0.5 p-2.5 border rounded-full border-bgBlue mr-2 bg-white dark:bg-gray-800">
              <Monitor className="w-7 h-7 text-bgBlue" />
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Total Devices</span>
          </div>
          <div className="flex items-center justify-between text-gray-900 dark:text-white mb-2">
            <span className="text-2xl font-semibold">{totalDevices}</span>
            <div className="text-sm text-green-500 dark:text-green-400 flex items-center gap-1 mb-2">
              <TrendingUp className="w-4 h-4" />
              {totalDevices > 0 ? `${totalDevices} New This Week` : "0 New This Week"}
            </div>
          </div>
        </div>

        <div className="bg-success-bg rounded-xl border border-border p-6 flex flex-col gap-6 justify-between">
          <div className="flex items-center mb-2">
            <span className="mt-0.5 p-2.5 border rounded-full border-bgGreen mr-2 bg-white dark:bg-gray-800">
              <Wifi className="w-7 h-7 text-bgGreen" />
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Online Status</span>
          </div>
          <div className="flex items-center justify-between text-gray-900 dark:text-white mb-1">
            <span className="text-2xl font-semibold">{onlineDevices}</span>
            <div className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
              {offlineDevices} Offline <TriangleAlertIcon className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="bg-destructive-bg border border-border rounded-xl shadow-sm p-6 flex flex-col gap-6 justify-between">
          <div className="flex items-center mb-2">
            <span className="mt-0.5 p-2.5 border rounded-full border-bgRed mr-2 bg-white dark:bg-gray-800">
              <WifiOff className="w-7 h-7 text-bgRed" />
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Offline Status</span>
          </div>
          <div className="flex items-center justify-between text-gray-900 dark:text-white mb-1">
            <span className="text-2xl font-semibold">{onlineDevices}</span>
            <div className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
              {offlineDevices} Offline <TriangleAlertIcon className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="bg-card-bg border border-border dark:border-gray-700 rounded-xl shadow-sm p-6 flex flex-col gap-6 justify-between">
          <div className="flex items-center mb-2">
            <span className="mt-0.5 p-2.5 border rounded-full border-gray-600 dark:border-gray-500 mr-2 bg-white dark:bg-gray-800">
              <HardDrive className="w-7 h-7 text-gray-600 dark:text-gray-400" />
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-300">Storage</span>
          </div>
          <div className="flex items-center justify-between text-gray-900 dark:text-white mb-1">
            <span className="text-xl font-semibold">5.0/10 GB</span>
            <Link href="/choose-plan" className="text-sm text-bgBlue hover:text-blue-400">
              Upgrade <ArrowUpRight className="w-4 h-4 inline-block" />
            </Link>
          </div>
        </div>
      </div>

      {/* Add New Section - Background image preserved */}
      <div className="rounded-xl shadow-sm p-6 mb-6 add-bg-img">
        <h2 className="text-lg font-semibold newAdd mb-4">Add New</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          <ActionCardButton
            onClick={() => setIsModalOpen(true)}
            icon={<ScreenShare className="text-white w-4 h-4" />}
            title="Create Screen"
            subtitle="Create a new screen to play on your devices"
            active
          />
          <button
            onClick={() => setIsAddDeviceModalOpen(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-navbarBg cursor-pointer transition-colors hover:shadow-md"
          >
            <Tv className="w-8 h-8 text-[#155DFC] p-2 bg-blue-50 dark:bg-blue-900/50 rounded-md" />
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">Add Device</div>
              <div className="text-[.6rem] md:text-sm text-gray-600 dark:text-gray-400">
                Add New Device
              </div>
            </div>
          </button>
          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-navbarBg cursor-pointer transition-colors hover:shadow-md">
            <Video className="w-8 h-8 text-[#155DFC] p-2 bg-blue-50 dark:bg-blue-900/50 rounded-md" />
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">Upload Content</div>
              <div className="text-[.6rem] md:text-sm text-gray-600 dark:text-gray-400">
                Add new content
              </div>
            </div>
          </button>
          <button
            onClick={() => setIsScheduleModalOpen(true)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl bg-navbarBg cursor-pointer transition-colors hover:shadow-md"
          >
            <Calendar className="w-8 h-8 text-[#155DFC] p-2 bg-blue-50 dark:bg-blue-900/50 rounded-md" />
            <div className="text-left">
              <div className="font-medium text-gray-900 dark:text-white">Schedule</div>
              <div className="text-[.6rem] md:text-sm text-gray-600 dark:text-gray-400">
                Schedule new content
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Recent Devices & Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Devices */}
        <div className="bg-navbarBg rounded-xl shadow-sm border border-border">
          <div className="flex items-center justify-between p-6 border-b border-borderGray dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Devices
            </h2>
            <button className="text-sm text-bgBlue hover:text-blue-400 cursor-pointer">
              View All
            </button>
          </div>

          <div className="space-y-3 p-6">
            {devices.map((device, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-navbarBg"
              >
                <span className="mt-0.5 p-2.5 border rounded-sm border-gray-200 dark:border-gray-600">
                  <Monitor className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {device.name}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md border flex items-center gap-1 ${
                        device.online
                          ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                          : "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                      }`}
                    >
                      {device.online ? (
                        <>
                          <Wifi className="w-3 h-3" />
                          Online
                        </>
                      ) : (
                        <>
                          <WifiOff className="w-3 h-3" />
                          Offline
                        </>
                      )}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{device.location}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">{device.screen}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-navbarBg rounded-xl shadow-sm border border-border">
          <div className="flex items-center justify-between border-b p-6 border-borderGray dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Activities
            </h2>
            <button className="text-sm text-bgBlue hover:text-blue-400 cursor-pointer">
              View All
            </button>
          </div>

          <div className="space-y-3 p-6">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-navbarBg"
              >
                {activity.type === "device" ? (
                  <span className="mt-0.5 p-2.5 border rounded-full border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                    <Monitor className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </span>
                ) : (
                  <span className="mt-0.5 p-2.5 border rounded-full border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800">
                    <Bell className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                  </span>
                )}
                <div className="flex-1">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {activity.title}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {activity.description}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modals */}
      <CreateScreenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <AddDeviceModal isOpen={isAddDeviceModalOpen} onClose={() => setIsAddDeviceModalOpen(false)} />
      <ScheduleModal 
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        onSave={handleSaveSchedule}
      />
    </div>
  );
}