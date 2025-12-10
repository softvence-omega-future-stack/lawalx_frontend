// "use client";

// import { useParams, useRouter } from "next/navigation";
// import {
//   ArrowLeft,
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   CreditCard,
//   HardDrive,
//   Smartphone,
//   Activity,
//   AlertCircle,
//   CheckCircle,
//   Clock,
//   Edit,
//   MoreVertical,
// } from "lucide-react";

// export default function UserProfilePage() {
//   const params = useParams();
//   const router = useRouter();
//   const userId = params.id as string;

//   // Mock user data - in real app, fetch based on userId
//   const user = {
//     id: userId,
//     name: "Jenny Wilson",
//     email: "olivia@gmail.com",
//     phone: "+1 (555) 123-4567",
//     location: "New York, USA",
//     joinDate: "January 15, 2024",
//     status: "Active",
//     plan: "Starter",
//     avatar: "👤",
//     subscription: {
//       plan: "Starter",
//       price: "$29/month",
//       nextBilling: "January 15, 2025",
//       paymentMethod: "Visa •••• 4242",
//       autoRenewal: true,
//     },
//     usage: {
//       devices: {
//         used: 23,
//         total: 50,
//         percentage: 46,
//       },
//       storage: {
//         used: "75 GB",
//         total: "100 GB",
//         percentage: 75,
//       },
//     },
//     activity: [
//       {
//         action: "Logged in",
//         timestamp: "2 hours ago",
//         status: "success",
//       },
//       {
//         action: "Updated profile",
//         timestamp: "1 day ago",
//         status: "success",
//       },
//       {
//         action: "Payment successful",
//         timestamp: "3 days ago",
//         status: "success",
//       },
//       {
//         action: "Failed login attempt",
//         timestamp: "5 days ago",
//         status: "error",
//       },
//     ],
//     issues: ["Payment due", "5 error logs"],
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       {/* Header */}
//       <div className="mb-6">
//         <button
//           onClick={() => router.push("/admin/user-management")}
//           className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span className="text-sm font-medium">Back to User Management</span>
//         </button>

//         <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
//           <span>🏠</span>
//           <span className="text-gray-400">/</span>
//           <span className="text-blue-500 cursor-pointer" onClick={() => router.push("/user-management")}>
//             User Management
//           </span>
//           <span className="text-gray-400">/</span>
//           <span>{user.name}</span>
//         </div>

//         <div className="flex justify-between items-start">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl">
//               {user.avatar}
//             </div>
//             <div>
//               <h1 className="text-2xl font-semibold text-gray-900">
//                 {user.name}
//               </h1>
//               <p className="text-sm text-gray-500">{user.email}</p>
//               <div className="flex items-center gap-2 mt-2">
//                 <span
//                   className={`px-3 py-1 rounded-full text-xs font-medium ${
//                     user.status === "Active"
//                       ? "bg-green-50 text-green-700"
//                       : "bg-red-50 text-red-700"
//                   }`}
//                 >
//                   {user.status}
//                 </span>
//                 <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
//                   {user.plan}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex gap-3">
//             <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
//               <Edit className="w-4 h-4" />
//               Edit Profile
//             </button>
//             <button className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
//               <MoreVertical className="w-5 h-5 text-gray-600" />
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-3 gap-6">
//         {/* Left Column */}
//         <div className="col-span-2 space-y-6">
//           {/* Basic Information */}
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">
//               Basic Information
//             </h2>
//             <div className="grid grid-cols-2 gap-6">
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gray-100 rounded-lg">
//                   <Mail className="w-5 h-5 text-gray-600" />
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-500">Email Address</div>
//                   <div className="text-sm font-medium text-gray-900">
//                     {user.email}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gray-100 rounded-lg">
//                   <Phone className="w-5 h-5 text-gray-600" />
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-500">Phone Number</div>
//                   <div className="text-sm font-medium text-gray-900">
//                     {user.phone}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gray-100 rounded-lg">
//                   <MapPin className="w-5 h-5 text-gray-600" />
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-500">Location</div>
//                   <div className="text-sm font-medium text-gray-900">
//                     {user.location}
//                   </div>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3">
//                 <div className="p-2 bg-gray-100 rounded-lg">
//                   <Calendar className="w-5 h-5 text-gray-600" />
//                 </div>
//                 <div>
//                   <div className="text-xs text-gray-500">Join Date</div>
//                   <div className="text-sm font-medium text-gray-900">
//                     {user.joinDate}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Usage Statistics */}
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">
//               Usage Statistics
//             </h2>
//             <div className="space-y-6">
//               {/* Devices */}
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <div className="flex items-center gap-2">
//                     <Smartphone className="w-4 h-4 text-gray-600" />
//                     <span className="text-sm font-medium text-gray-900">
//                       Device Usage
//                     </span>
//                   </div>
//                   <span className="text-sm text-gray-600">
//                     {user.usage.devices.used} / {user.usage.devices.total}
//                   </span>
//                 </div>
//                 <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-blue-500"
//                     style={{ width: `${user.usage.devices.percentage}%` }}
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {user.usage.devices.percentage}% of devices used
//                 </p>
//               </div>

//               {/* Storage */}
//               <div>
//                 <div className="flex justify-between items-center mb-2">
//                   <div className="flex items-center gap-2">
//                     <HardDrive className="w-4 h-4 text-gray-600" />
//                     <span className="text-sm font-medium text-gray-900">
//                       Storage Usage
//                     </span>
//                   </div>
//                   <span className="text-sm text-gray-600">
//                     {user.usage.storage.used} / {user.usage.storage.total}
//                   </span>
//                 </div>
//                 <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                   <div
//                     className="h-full bg-orange-500"
//                     style={{ width: `${user.usage.storage.percentage}%` }}
//                   />
//                 </div>
//                 <p className="text-xs text-gray-500 mt-1">
//                   {user.usage.storage.percentage}% of storage used
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Recent Activity */}
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">
//               Recent Activity
//             </h2>
//             <div className="space-y-4">
//               {user.activity.map((activity, index) => (
//                 <div key={index} className="flex items-start gap-3">
//                   <div
//                     className={`p-2 rounded-lg ${
//                       activity.status === "success"
//                         ? "bg-green-100"
//                         : "bg-red-100"
//                     }`}
//                   >
//                     {activity.status === "success" ? (
//                       <CheckCircle className="w-4 h-4 text-green-600" />
//                     ) : (
//                       <AlertCircle className="w-4 h-4 text-red-600" />
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <div className="text-sm font-medium text-gray-900">
//                       {activity.action}
//                     </div>
//                     <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
//                       <Clock className="w-3 h-3" />
//                       {activity.timestamp}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Right Column */}
//         <div className="space-y-6">
//           {/* Subscription Details */}
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">
//               Subscription Details
//             </h2>
//             <div className="space-y-4">
//               <div>
//                 <div className="text-xs text-gray-500 mb-1">Current Plan</div>
//                 <div className="flex items-center justify-between">
//                   <span className="text-sm font-medium text-gray-900">
//                     {user.subscription.plan}
//                   </span>
//                   <span className="text-sm font-semibold text-blue-600">
//                     {user.subscription.price}
//                   </span>
//                 </div>
//               </div>

//               <div className="pt-4 border-t border-gray-200">
//                 <div className="flex items-center gap-2 mb-1">
//                   <CreditCard className="w-4 h-4 text-gray-600" />
//                   <span className="text-xs text-gray-500">Payment Method</span>
//                 </div>
//                 <div className="text-sm font-medium text-gray-900">
//                   {user.subscription.paymentMethod}
//                 </div>
//               </div>

//               <div className="pt-4 border-t border-gray-200">
//                 <div className="flex items-center gap-2 mb-1">
//                   <Calendar className="w-4 h-4 text-gray-600" />
//                   <span className="text-xs text-gray-500">Next Billing</span>
//                 </div>
//                 <div className="text-sm font-medium text-gray-900">
//                   {user.subscription.nextBilling}
//                 </div>
//               </div>

//               <div className="pt-4 border-t border-gray-200">
//                 <div className="flex items-center justify-between">
//                   <span className="text-xs text-gray-500">Auto-renewal</span>
//                   <label className="relative inline-flex items-center cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={user.subscription.autoRenewal}
//                       readOnly
//                       className="sr-only peer"
//                     />
//                     <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
//                   </label>
//                 </div>
//               </div>

//               <button className="w-full mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
//                 Manage Subscription
//               </button>
//             </div>
//           </div>

//           {/* Issues & Alerts */}
//           {user.issues.length > 0 && (
//             <div className="bg-white rounded-lg border border-orange-200 p-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <AlertCircle className="w-5 h-5 text-orange-600" />
//                 <h2 className="text-lg font-semibold text-gray-900">
//                   Issues & Alerts
//                 </h2>
//               </div>
//               <div className="space-y-2">
//                 {user.issues.map((issue, index) => (
//                   <div
//                     key={index}
//                     className="p-3 bg-orange-50 border border-orange-200 rounded-lg"
//                   >
//                     <div className="text-sm font-medium text-orange-900">
//                       {issue}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <button className="w-full mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600">
//                 Resolve Issues
//               </button>
//             </div>
//           )}

//           {/* Quick Actions */}
//           <div className="bg-white rounded-lg border border-gray-200 p-6">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">
//               Quick Actions
//             </h2>
//             <div className="space-y-2">
//               <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 text-left">
//                 Reset Password
//               </button>
//               <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 text-left">
//                 Login as User
//               </button>
//               <button className="w-full px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 text-left">
//                 View Audit Log
//               </button>
//               <button className="w-full px-4 py-2 bg-orange-50 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-100 text-left">
//                 Suspend User
//               </button>
//               <button className="w-full px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 text-left">
//                 Delete User
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building2,
  User,
  ChevronRight,
  TrendingUp,
  DollarSign,
  Maximize2,
  HardDrive,
  CheckCircle,
  MoreVertical,
  X,
  RotateCcw,
  Edit2,
  Shuffle,
  Trash2,
  UserX,
  Home,
  Download,
  Users,
} from "lucide-react";

type TabType = "Monitoring" | "Subscription & Billing" | "Content" | "Devices" | "Activity Logs";

export default function UserProfilePage() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<TabType>("Monitoring");
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isChangePlanOpen, setIsChangePlanOpen] = useState(false);
  const [isDeleteUserOpen, setIsDeleteUserOpen] = useState(false);

  const [editFormData, setEditFormData] = useState({
    fullName: "John Smith",
    email: "john.smith@techcorp.com",
    password: "",
    plan: "Enterprise",
    deviceLimit: "30",
    storageLimit: "200",
    price: "$299",
    advanceCustomization: true,
    imageLimit: "1000",
    maxImageSize: "20MB",
    imageFormat: "JPG, PNG, WEBP",
    videoLimit: "1000",
    maxVideoSize: "200MB",
    videoFormat: "MP4, MKV",
    audioLimit: "1000",
    maxAudioSize: "50MB",
    audioFormat: "MP3",
    enableCustomBranding: true,
    companyName: "TechCorp Inc.",
    industryType: "Technology",
    website: "https://techcorp.com",
    locationType: "San Francisco, CA",
  });

  const [newPassword, setNewPassword] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Enterprise");
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const user = {
    id: "U28XKH",
    name: "John Smith",
    email: "john.smith@techcorp.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    joinDate: "January 15, 2025",
    organization: "TechCorp Inc.",
    role: "Administrator",
    plan: "Enterprise",
    status: "Active",
    activeScreens: { used: 25, total: 30, percentage: 83 },
    storage: { used: "85.2GB", total: "200GB", percentage: 43 },
    uptime: "99.8%",
    uptimeInfo: "Above SLA target Last 30 days",
    revenue: "$299",
    revenueInfo: "+2.4% vs last month",
  };

  const paymentHistory = [
    { invoice: "INV-2023-1245", amount: "$299.00", status: "Paid", date: "Nov 15, 2025" },
    { invoice: "INV-2023-1245", amount: "$299.00", status: "Paid", date: "Oct 15, 2024" },
    { invoice: "INV-2023-1245", amount: "$299.00", status: "Failed", date: "Sep 15, 2024" },
    { invoice: "INV-2023-1245", amount: "$299.00", status: "Paid", date: "Aug 15, 2024" },
  ];

  const handleResetPassword = () => {
    if (newPassword.trim()) {
      console.log("Password reset:", newPassword);
      setIsResetPasswordOpen(false);
      setNewPassword("");
    }
  };

  const handleChangePlan = () => {
    console.log("Plan changed to:", selectedPlan);
    setIsChangePlanOpen(false);
  };

  const handleDeleteUser = () => {
    if (deleteConfirmText === "DELETE") {
      console.log("User deleted");
      setIsDeleteUserOpen(false);
      router.push("/user-management");
    }
  };

  const handleEditUser = () => {
    console.log("User updated:", editFormData);
    setIsEditModalOpen(false);
  };

  return (
    <div className="min-h-screen mx-4 pt-4">
      <div className="">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Home className="w-4 h-4" />
          <ChevronRight className="w-4 h-4" />
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => router.push("/admin/user-management")}
          >
            User Management
          </span>
          <ChevronRight className="w-4 h-4" />
          <span>{user.name}</span>
        </div>

        {/* Header */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 text-lg font-semibold">
                JS
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-sm text-gray-500">ID: {user.id}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
              >
                <Edit2 className="w-4 h-4" />
                Edit User
              </button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center gap-2">
                Login as user
              </button>
              <div className="relative">
                <button
                  onClick={() => setIsActionMenuOpen(!isActionMenuOpen)}
                  className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
                {isActionMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    <button
                      onClick={() => {
                        setIsResetPasswordOpen(true);
                        setIsActionMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset Password
                    </button>
                    <button
                      onClick={() => {
                        setIsChangePlanOpen(true);
                        setIsActionMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Shuffle className="w-4 h-4" />
                      Change Plan
                    </button>
                    <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <UserX className="w-4 h-4" />
                      Suspend User
                    </button>
                    <button
                      onClick={() => {
                        setIsDeleteUserOpen(true);
                        setIsActionMenuOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-b-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete User
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </div>
            <div className="text-sm font-medium text-gray-900 break-all">{user.email}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
              <Phone className="w-4 h-4" />
              <span>Phone</span>
            </div>
            <div className="text-sm font-medium text-gray-900">{user.phone}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
              <MapPin className="w-4 h-4" />
              <span>Location</span>
            </div>
            <div className="text-sm font-medium text-gray-900">{user.location}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
              <Calendar className="w-4 h-4" />
              <span>Join Date</span>
            </div>
            <div className="text-sm font-medium text-gray-900">{user.joinDate}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
              <Building2 className="w-4 h-4" />
              <span>Organization</span>
            </div>
            <div className="text-sm font-medium text-gray-900">{user.organization}</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 text-gray-500 text-xs mb-2">
              <User className="w-4 h-4" />
              <span>Role</span>
            </div>
            <div className="text-sm font-medium text-gray-900">{user.role}</div>
          </div>
        </div>

        {/* Plan & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 mb-2">Plan</div>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
              {user.plan}
            </span>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 mb-2">Status</div>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {user.status}
            </span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm text-gray-600">Active Screens</span>
              <Maximize2 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {user.activeScreens.used}/{user.activeScreens.total}
            </div>
            <div className="text-sm text-gray-500 mb-3">{user.activeScreens.percentage}% utilization</div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-900 rounded-full"
                style={{ width: `${user.activeScreens.percentage}%` }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm text-gray-600">Storage Usage</span>
              <HardDrive className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{user.storage.used}</div>
            <div className="text-sm text-gray-500 mb-3">of {user.storage.total}</div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gray-900 rounded-full"
                style={{ width: `${user.storage.percentage}%` }}
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm text-gray-600">Uptime</span>
              <TrendingUp className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-3">{user.uptime}</div>
            <div className="text-sm text-green-600 flex items-center gap-1">
              <CheckCircle className="w-4 h-4" />
              {user.uptimeInfo}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm text-gray-600">Monthly Revenue</span>
              <DollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{user.revenue}</div>
            <div className="text-sm text-gray-500">{user.revenueInfo}</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex overflow-x-auto">
              {["Monitoring", "Subscription & Billing", "Content", "Devices", "Activity Logs"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as TabType)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "Monitoring" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Uptime Trend */}
                  <div className="bg-gradient-to-b from-purple-50 to-white rounded-lg p-6 border border-purple-100">
                    <h3 className="text-lg font-semibold mb-1">Uptime Trend</h3>
                    <p className="text-sm text-gray-600 mb-6">System uptime percentage over time</p>
                    <div className="h-64">
                      <svg className="w-full h-full" viewBox="0 0 600 250" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#c4b5fd" stopOpacity={0.4} />
                            <stop offset="100%" stopColor="#c4b5fd" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <path
                          d="M 0 180 Q 100 120, 200 140 T 400 100 T 600 80"
                          fill="url(#gradient1)"
                          stroke="none"
                        />
                        <path
                          d="M 0 180 Q 100 120, 200 140 T 400 100 T 600 80"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="2"
                        />
                      </svg>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                          <span key={m}>{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Resource Growth */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-1">Resource Growth</h3>
                        <p className="text-sm text-gray-600">Screens and content growth over time</p>
                      </div>
                      <div className="flex gap-4 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-0.5 bg-blue-500"></div>
                          <span className="text-gray-600">Active Screens</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-0.5 bg-purple-500"></div>
                          <span className="text-gray-600">Content Items</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-64">
                      <svg className="w-full h-full" viewBox="0 0 600 220" preserveAspectRatio="none">
                        {/* Grid lines */}
                        <line x1="0" y1="0" x2="600" y2="0" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="0" y1="55" x2="600" y2="55" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="0" y1="110" x2="600" y2="110" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="0" y1="165" x2="600" y2="165" stroke="#e5e7eb" strokeWidth="1" />
                        <line x1="0" y1="220" x2="600" y2="220" stroke="#e5e7eb" strokeWidth="1" />
                        
                        {/* Blue line */}
                        <polyline
                          points="0,165 120,140 240,120 360,100 480,75 600,60"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                        />
                        {/* Blue dots */}
                        <circle cx="0" cy="165" r="3" fill="#3b82f6" />
                        <circle cx="120" cy="140" r="3" fill="#3b82f6" />
                        <circle cx="240" cy="120" r="3" fill="#3b82f6" />
                        <circle cx="360" cy="100" r="3" fill="#3b82f6" />
                        <circle cx="480" cy="75" r="3" fill="#3b82f6" />
                        <circle cx="600" cy="60" r="3" fill="#3b82f6" />
                        
                        {/* Purple line */}
                        <polyline
                          points="0,190 120,185 240,182 360,180 480,178 600,175"
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="2"
                        />
                        {/* Purple dots */}
                        <circle cx="0" cy="190" r="3" fill="#a855f7" />
                        <circle cx="120" cy="185" r="3" fill="#a855f7" />
                        <circle cx="240" cy="182" r="3" fill="#a855f7" />
                        <circle cx="360" cy="180" r="3" fill="#a855f7" />
                        <circle cx="480" cy="178" r="3" fill="#a855f7" />
                        <circle cx="600" cy="175" r="3" fill="#a855f7" />
                      </svg>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m) => (
                          <span key={m}>{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Content Usage by Type */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold mb-1">Content Usage by Type</h3>
                    <p className="text-sm text-gray-600 mb-6">Breakdown of content library</p>
                    <div className="h-64 flex items-end justify-around gap-4">
                      {[
                        { label: "Images", file: 35, size: 22, fileColor: "#3b82f6", sizeColor: "#a855f7" },
                        { label: "Videos", file: 28, size: 35, fileColor: "#3b82f6", sizeColor: "#a855f7" },
                        { label: "Audio", file: 18, size: 5, fileColor: "#3b82f6", sizeColor: "#a855f7" },
                        { label: "Docs", file: 15, size: 8, fileColor: "#3b82f6", sizeColor: "#a855f7" },
                      ].map((item) => (
                        <div key={item.label} className="flex-1 flex flex-col items-center">
                          <div className="w-full flex gap-2 items-end mb-2">
                            <div
                              className="flex-1 rounded-t"
                              style={{ backgroundColor: item.fileColor, height: `${item.file * 5}px` }}
                            />
                            <div
                              className="flex-1 rounded-t"
                              style={{ backgroundColor: item.sizeColor, height: `${item.size * 5}px` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-center gap-6 mt-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded"></div>
                        <span className="text-gray-600">File Count</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded"></div>
                        <span className="text-gray-600">Size (GB)</span>
                      </div>
                    </div>
                  </div>

                  {/* Device Status Distribution */}
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold mb-1">Device Status Distribution</h3>
                    <p className="text-sm text-gray-600 mb-6">Current status of all devices</p>
                    <div className="h-64 flex items-center justify-center">
                      <div className="relative w-48 h-48">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                          {/* Online - 78% */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="20"
                            strokeDasharray="195 250"
                            strokeDashoffset="0"
                          />
                          {/* Maintenance - 9% */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#f59e0b"
                            strokeWidth="20"
                            strokeDasharray="22 250"
                            strokeDashoffset="-195"
                          />
                          {/* Offline - 13% */}
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth="20"
                            strokeDasharray="33 250"
                            strokeDashoffset="-217"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span className="text-gray-600">Online</span>
                        </div>
                        <span className="font-medium">78%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded"></div>
                          <span className="text-gray-600">Maintenance</span>
                        </div>
                        <span className="font-medium">9%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                          <span className="text-gray-600">Offline</span>
                        </div>
                        <span className="font-medium">13%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Subscription & Billing" && (
              <div className="space-y-6">
                {/* Current Plan */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Current Plan</h3>
                      <p className="text-sm text-gray-600">Active subscription details</p>
                    </div>
                    <button
                      onClick={() => setIsChangePlanOpen(true)}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Shuffle className="w-4 h-4" />
                      Change Plan
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Plan</div>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                        Enterprise
                      </span>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Price</div>
                      <div className="text-sm font-medium text-gray-900">$299/month</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Billing Cycle</div>
                      <div className="text-sm font-medium text-gray-900">Monthly</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Next Billing</div>
                      <div className="text-sm font-medium text-gray-900">December 15, 2024</div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Auto Renew</div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Enabled
                        </span>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Billing Status</div>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment History */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Payment History</h3>
                      <p className="text-sm text-gray-600">Recent billing transactions</p>
                    </div>
                    <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Invoices
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Invoice
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Amount
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Status
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Date
                          </th>
                          <th className="px-4 py-3"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {paymentHistory.map((payment, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{payment.invoice}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{payment.amount}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  payment.status === "Paid"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                }`}
                              >
                                {payment.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{payment.date}</td>
                            <td className="px-4 py-3">
                              <button className="p-1 hover:bg-gray-100 rounded">
                                <MoreVertical className="w-4 h-4 text-gray-400" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Content" && (
              <div className="text-center py-16 text-gray-500">
                <p>Content management features coming soon</p>
              </div>
            )}

            {activeTab === "Devices" && (
              <div className="text-center py-16 text-gray-500">
                <p>Device management features coming soon</p>
              </div>
            )}

            {activeTab === "Activity Logs" && (
              <div className="text-center py-16 text-gray-500">
                <p>Activity logs coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-2xl my-8">
            <div className="p-6 border-b border-gray-200 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">Edit User</h2>
                </div>
                <p className="text-sm text-gray-500">Update user account and subscription details</p>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 max-h-[calc(90vh-200px)] overflow-y-auto">
              {/* User Credentials */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  🛡️ User Credentials
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editFormData.fullName}
                      onChange={(e) => setEditFormData({ ...editFormData, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={editFormData.email}
                      onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      type="password"
                      placeholder="Leave blank to keep current"
                      value={editFormData.password}
                      onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Subscription Plan */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  💳 Subscription Plan
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Choose Plan</label>
                  <select
                    value={editFormData.plan}
                    onChange={(e) => setEditFormData({ ...editFormData, plan: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Demo (For developers)</option>
                    <option>Basic</option>
                    <option>Pro</option>
                    <option>Enterprise</option>
                  </select>
                </div>

                {editFormData.plan === "Enterprise" && (
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Device Limit</label>
                      <input
                        type="text"
                        value={editFormData.deviceLimit}
                        onChange={(e) => setEditFormData({ ...editFormData, deviceLimit: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Storage Limit (GB)
                      </label>
                      <input
                        type="text"
                        value={editFormData.storageLimit}
                        onChange={(e) => setEditFormData({ ...editFormData, storageLimit: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="text"
                        value={editFormData.price}
                        onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Advance Customization */}
              {editFormData.plan === "Enterprise" && (
                <div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-4">
                    <div className="flex items-center gap-2">
                      <span>🔧</span>
                      <span className="text-sm font-medium text-gray-900">Advance Customization</span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={editFormData.advanceCustomization}
                        onChange={(e) =>
                          setEditFormData({ ...editFormData, advanceCustomization: e.target.checked })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {editFormData.advanceCustomization && (
                    <div className="space-y-4 pl-4 border-l-2 border-gray-200">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image Limit
                          </label>
                          <input
                            type="text"
                            value={editFormData.imageLimit}
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, imageLimit: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Max Image Size
                          </label>
                          <input
                            type="text"
                            value={editFormData.maxImageSize}
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, maxImageSize: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                          <select
                            value={editFormData.imageFormat}
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, imageFormat: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>JPG, PNG, WEBP</option>
                            <option>JPG, PNG</option>
                            <option>All Formats</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Video Limit
                          </label>
                          <input
                            type="text"
                            value={editFormData.videoLimit}
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, videoLimit: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Max Video Size
                          </label>
                          <input
                            type="text"
                            value={editFormData.maxVideoSize}
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, maxVideoSize: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                          <select
                            value={editFormData.videoFormat}
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, videoFormat: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>MP4, MKV</option>
                            <option>MP4</option>
                            <option>All Formats</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Audio Limit</label>
                          <input
                            type="text"
                            value={editFormData.audioLimit}
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, audioLimit: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Max Audio Size
                          </label>
                          <input
                            type="text"
                            value={editFormData.maxAudioSize}
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, maxAudioSize: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                          <select
                            value={editFormData.audioFormat}
                            onChange={(e) =>
                              setEditFormData({ ...editFormData, audioFormat: e.target.value })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>MP3</option>
                            <option>WAV</option>
                            <option>All Formats</option>
                          </select>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editFormData.enableCustomBranding}
                            onChange={(e) =>
                              setEditFormData({
                                ...editFormData,
                                enableCustomBranding: e.target.checked,
                              })
                            }
                            className="rounded border-gray-300"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              Enable Custom Branding
                            </div>
                            <div className="text-xs text-gray-500">
                              Allow custom logo, colors, and white-label features
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Company Info */}
              {editFormData.plan === "Enterprise" && editFormData.advanceCustomization && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    🏢 Company Info
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Name
                        </label>
                        <input
                          type="text"
                          placeholder="Enter company name"
                          value={editFormData.companyName}
                          onChange={(e) =>
                            setEditFormData({ ...editFormData, companyName: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Industry Type
                        </label>
                        <select
                          value={editFormData.industryType}
                          onChange={(e) =>
                            setEditFormData({ ...editFormData, industryType: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>Select industry</option>
                          <option>Technology</option>
                          <option>Healthcare</option>
                          <option>Finance</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                        <input
                          type="text"
                          value={editFormData.website}
                          onChange={(e) =>
                            setEditFormData({ ...editFormData, website: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Location Type
                        </label>
                        <input
                          type="text"
                          value={editFormData.locationType}
                          onChange={(e) =>
                            setEditFormData({ ...editFormData, locationType: e.target.value })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleEditUser}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reset Password Modal */}
      {isResetPasswordOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Reset Password</h2>
              <button
                onClick={() => setIsResetPasswordOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setIsResetPasswordOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Plan Modal */}
      {isChangePlanOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-lg w-full max-w-2xl my-8">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Change Plan</h2>
              <button
                onClick={() => setIsChangePlanOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Choose Plan</label>
              <select
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
              >
                <option>Demo (For developers)</option>
                <option>Basic</option>
                <option>Pro</option>
                <option>Enterprise</option>
              </select>

              {selectedPlan === "Enterprise" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Device Limit
                      </label>
                      <input
                        type="text"
                        defaultValue="50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Storage Limit (GB)
                      </label>
                      <input
                        type="text"
                        defaultValue="200"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                      <input
                        type="text"
                        defaultValue="$5000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setIsChangePlanOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePlan}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
              >
                Change Plan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {isDeleteUserOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-red-600">Delete User</h2>
              <button
                onClick={() => setIsDeleteUserOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-600 mb-4">
                This action cannot be undone. This will permanently delete the user account and all
                associated data.
              </p>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type <span className="font-bold text-red-600">DELETE</span> to confirm
              </label>
              <input
                type="text"
                placeholder="Type DELETE"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteUserOpen(false)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteUser}
                disabled={deleteConfirmText !== "DELETE"}
                className={`px-6 py-2 rounded-lg text-sm font-medium ${
                  deleteConfirmText === "DELETE"
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}