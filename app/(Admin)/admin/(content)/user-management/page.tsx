// function UserManagement() {
//     return (
//         <div className="p-6">
//             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Management</h1>
//             <p className="mt-2 text-gray-600 dark:text-gray-400">Manage platform users, roles, and permissions</p>
//         </div>
//      );
// }

// export default UserManagement;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import EditUserModal from "@/components/Admin/modals/EditUserModal";
import ResetPasswordModal from "@/components/Admin/modals/ResetPasswordModal";
import SuspendUserModal from "@/components/Admin/modals/SuspendUserModal";
import DeleteUserModal from "@/components/Admin/modals/DeleteUserModal";
// Add LoginAsUserModal if you have one
import {
  Users,
  UserCheck,
  Clock,
  AlertTriangle,
  Search,
  MoreVertical,
  Eye,
  Edit,
  LogIn,
  RotateCcw,
  UserX,
  Trash2,
  X,
  Home,
  ChevronRight,
  UserRoundPlus,
  CloudDownload,
} from "lucide-react";

type Plan = "Starter" | "Professional" | "Business" | "Trial" | "Enterprise";
type Status = "Active" | "Suspended" | "Disabled";

interface User {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  device: string;
  deviceUsage: number;
  storage: string;
  storageUsage: number;
  status: Status;
  issues: string[];
}

const initialUsers: User[] = [
  {
    id: "1",
    name: "Jenny Wilson",
    email: "olivia@gmail.com",
    plan: "Starter",
    device: "23/50",
    deviceUsage: 46,
    storage: "100 GB",
    storageUsage: 75,
    status: "Active",
    issues: ["Payment due", "5 error logs"],
  },
  {
    id: "2",
    name: "Brooklyn Simmons",
    email: "olivia@gmail.com",
    plan: "Professional",
    device: "23/50",
    deviceUsage: 100,
    storage: "100 GB",
    storageUsage: 100,
    status: "Disabled",
    issues: [],
  },
  {
    id: "3",
    name: "Kristin Watson",
    email: "olivia@gmail.com",
    plan: "Professional",
    device: "23/50",
    deviceUsage: 35,
    storage: "100 GB",
    storageUsage: 60,
    status: "Suspended",
    issues: ["Payment due", "5 error logs"],
  },
  {
    id: "4",
    name: "Dianne Russell",
    email: "olivia@gmail.com",
    plan: "Business",
    device: "23/50",
    deviceUsage: 20,
    storage: "100 GB",
    storageUsage: 45,
    status: "Active",
    issues: ["Payment due", "5 error logs"],
  },
  {
    id: "5",
    name: "Floyd Miles",
    email: "olivia@gmail.com",
    plan: "Business",
    device: "23/50",
    deviceUsage: 70,
    storage: "100 GB",
    storageUsage: 65,
    status: "Active",
    issues: ["Payment due", "5 error logs"],
  },
  {
    id: "6",
    name: "Jerome Bell",
    email: "olivia@gmail.com",
    plan: "Trial",
    device: "23/50",
    deviceUsage: 40,
    storage: "100 GB",
    storageUsage: 60,
    status: "Active",
    issues: ["Payment due", "5 error logs"],
  },
];

export default function UserManagementPage() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [planFilter, setPlanFilter] = useState("All Plans");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [storageFilter, setStorageFilter] = useState(">80% Storage");
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // To pass data to modals

  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "user@example.com",
    password: "",
    plan: "Demo (For developers)",
    deviceLimit: "50",
    storageLimit: "200",
    price: "$5000",
    advanceCustomization: false,
    imageLimit: "1000",
    maxImageSize: "20MB",
    imageFormat: "JPG, PNG, WEBP",
    videoLimit: "1000",
    maxVideoSize: "200MB",
    videoFormat: "MP4, MKV",
    audioLimit: "1000",
    maxAudioSize: "50MB",
    audioFormat: "MP3",
    enableCustomBranding: false,
    companyName: "",
    industryType: "Select industry",
    website: "https://example.com",
    locationType: "City, Country",
  });

  const toggleSelectAll = () => {
    if (selectedUsers.size === users.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(users.map((u) => u.id)));
    }
  };

  const toggleSelectUser = (id: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedUsers(newSelected);
  };

  const handleBulkAction = (action: "suspend" | "deactivate") => {
    setUsers(
      users.map((user) => {
        if (selectedUsers.has(user.id)) {
          return {
            ...user,
            status: action === "suspend" ? "Suspended" : "Disabled",
          };
        }
        return user;
      })
    );
    setSelectedUsers(new Set());
  };

  const handleAddUser = () => {
    const newUser: User = {
      id: Date.now().toString(),
      name: formData.fullName,
      email: formData.email,
      plan: formData.plan.includes("Enterprise")
        ? "Professional"
        : formData.plan.includes("Demo")
        ? "Trial"
        : "Starter",
      device: `0/${formData.deviceLimit}`,
      deviceUsage: 0,
      storage: `${formData.storageLimit} GB`,
      storageUsage: 0,
      status: "Active",
      issues: [],
    };
    setUsers([newUser, ...users]);
    setIsModalOpen(false);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = planFilter === "All Plans" || user.plan === planFilter;
    const matchesStatus =
      statusFilter === "All Status" || user.status === statusFilter;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
          <Home className="w-4 h-4" />
          <ChevronRight className="w-4 h-4" />
          <span className="text-blue-500 dark:text-blue-400">
            User Management
          </span>
        </div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              User Management
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Manage user accounts, subscriptions, and permissions
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 shadow-customShadow cursor-pointer bg-white dark:bg-gray-800 text-nowrap rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors">
              <CloudDownload className="w-4 h-4" />
              <span className="hidden lg:block"> Export User Report</span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 shadow-customShadow cursor-pointer bg-blue-500 hover:bg-blue-600 text-nowrap text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
            >
              <UserRoundPlus className="w-4 h-4" />
              <span className="hidden lg:block">Add New User</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-navbarBg p-4 rounded-lg border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <Users className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Total Users
            </span>
          </div>
          <div className="text-3xl font-semibold text-gray-900 dark:text-white">
            1,100
          </div>
          <div className="text-sm text-red-500 dark:text-red-400 flex items-center gap-1 mt-1">
            <span>↓ -8.2 %</span>
            <span className="text-gray-500 dark:text-gray-400">
              From Last Month
            </span>
          </div>
        </div>

        <div className="bg-navbarBg p-4 rounded-lg border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <UserCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Active Users
            </span>
          </div>
          <div className="text-3xl font-semibold text-gray-900 dark:text-white">
            1,100
          </div>
          <div className="text-sm text-green-500 dark:text-green-400 flex items-center gap-1 mt-1">
            <span>↑ +8.2 %</span>
            <span className="text-gray-500 dark:text-gray-400">
              From Last Month
            </span>
          </div>
        </div>

        <div className="bg-navbarBg p-4 rounded-lg border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <Clock className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Trial Users
            </span>
          </div>
          <div className="text-3xl font-semibold text-gray-900 dark:text-white">
            1,100
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
            <span>45 %</span>
            <span className="text-gray-500 dark:text-gray-400">
              Conversion rate
            </span>
          </div>
        </div>

        <div className="bg-navbarBg p-4 rounded-lg border border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Need Attention
            </span>
          </div>
          <div className="text-3xl font-semibold text-gray-900 dark:text-white">
            12
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Overdue, Offline, Errors
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-navbarBg rounded-lg border border-border">
        {/* Table Header */}
        <div className="p-4 border-b border-border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {selectedUsers.size > 0
                ? `Selected (${selectedUsers.size})`
                : `All Users (1112)`}
            </h2>
            {selectedUsers.size > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkAction("deactivate")}
                  className="px-4 cursor-pointer py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => handleBulkAction("suspend")}
                  className="px-4 cursor-pointer py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium"
                >
                  Suspend
                </button>
              </div>
            )}
          </div>

          {/* Search and Filters */}
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder="Search by name, email, or user ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={planFilter}
              onChange={(e) => setPlanFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            >
              <option>All Plans</option>
              <option>Starter</option>
              <option>Professional</option>
              <option>Business</option>
              <option>Trial</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Suspended</option>
              <option>Disabled</option>
            </select>
            <select
              value={storageFilter}
              onChange={(e) => setStorageFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
            >
              <option>80% Storage</option>
              <option>50% Storage</option>
              <option>90% Storage</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto scrollbar-hide">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.size === users.length}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 dark:border-gray-600"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Report Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Plan
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Device
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Storage (GB)
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Issues
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.has(user.id)}
                      onChange={() => toggleSelectUser(user.id)}
                      className="rounded border-gray-300 dark:border-gray-600"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white text-nowrap">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {user.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 dark:text-white mb-1">
                      {user.device}
                    </div>
                    <div className="w-32 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          user.deviceUsage > 80
                            ? "bg-red-500"
                            : user.deviceUsage > 60
                            ? "bg-orange-500"
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${user.deviceUsage}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm text-gray-900 dark:text-white mb-1">
                      {user.storage}
                    </div>
                    <div className="w-32 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          user.storageUsage > 80
                            ? "bg-red-500"
                            : user.storageUsage > 60
                            ? "bg-orange-500"
                            : "bg-blue-500"
                        }`}
                        style={{ width: `${user.storageUsage}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`flex items-center gap-1 w-fit px-3 py-1 rounded-full text-xs font-medium border ${
                        user.status === "Active"
                          ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
                          : user.status === "Suspended"
                          ? "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.status === "Active"
                            ? "bg-green-500"
                            : user.status === "Suspended"
                            ? "bg-red-500"
                            : "bg-gray-500"
                        }`}
                      />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {user.issues.length > 0 ? (
                      <div className="flex gap-2">
                        {user.issues.map((issue, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded text-xs text-nowrap"
                          >
                            {issue}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        No issues
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setOpenActionMenu(
                            openActionMenu === user.id ? null : user.id
                          )
                        }
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors cursor-pointer"
                      >
                        <MoreVertical className="w-5 h-5 text-gray-400 dark:text-gray-500" />
                      </button>
                      {openActionMenu === user.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                          {/* <button
                            onClick={() => router.push(`/admin/user-management/${user.id}`)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View Profile
                          </button> */}
                          <button
                            onClick={() => {
                              // Pass user data as query params or use router state
                              router.push(
                                `/admin/user-management/${
                                  user.id
                                }?name=${encodeURIComponent(
                                  user.name
                                )}&email=${encodeURIComponent(
                                  user.email
                                )}&plan=${user.plan}&status=${
                                  user.status
                                }&device=${user.device}&storage=${
                                  user.storage
                                }&deviceUsage=${
                                  user.deviceUsage
                                }&storageUsage=${user.storageUsage}`
                              );
                            }}
                            className="w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                            View Profile
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsEditModalOpen(true);
                              setOpenActionMenu(null);
                            }}
                            className="w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                            Edit User
                          </button>

                          <button
                            onClick={() => {
                              alert("Login as user clicked");
                              setOpenActionMenu(null);
                            }}
                            className="w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                          >
                            <LogIn className="w-4 h-4" />
                            Login as user
                          </button>

                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsResetPasswordOpen(true);
                              setOpenActionMenu(null);
                            }}
                            className="w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                          >
                            <RotateCcw className="w-4 h-4" />
                            Reset Password
                          </button>

                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsSuspendModalOpen(true);
                              setOpenActionMenu(null);
                            }}
                            className="w-full cursor-pointer px-4 py-2 text-left text-sm text-orange-600 dark:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                          >
                            <UserX className="w-4 h-4" />
                            Suspend User
                          </button>

                          <button
                            onClick={() => {
                              setSelectedUser(user);
                              setIsDeleteModalOpen(true);
                              setOpenActionMenu(null);
                            }}
                            className="w-full cursor-pointer px-4 py-2 text-left text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete User
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-border flex justify-between items-center bg-navbarBg rounded-b-lg">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing 6 of 6 users
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-customShadow">
              Previous
            </button>
            <button className="px-4 py-2 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 shadow-customShadow">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 dark:bg-white/30 flex items-center justify-center z-50 p-4">
          <div className="bg-White rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
            <div className="p-6 border-b border-gray-200 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Add New User
                  </h2>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Create a new user account with subscription and profile
                  details
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* User Credentials */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  🛡️ User Credentials
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full px-3 py-2 border dark:text-white border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 border dark:text-white border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      placeholder="Enter secure password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full px-3 py-2 border dark:text-white border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Subscription Plan */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  💳 Subscription Plan
                </h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                    Choose Plan
                  </label>
                  <select
                    value={formData.plan}
                    onChange={(e) =>
                      setFormData({ ...formData, plan: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option>Demo (For developers)</option>
                    <option>Basic</option>
                    <option>Pro</option>
                    <option>Enterprise</option>
                  </select>
                </div>

                {formData.plan === "Enterprise" && (
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        Device Limit
                      </label>
                      <input
                        type="text"
                        value={formData.deviceLimit}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            deviceLimit: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        Storage Limit (GB)
                      </label>
                      <input
                        type="text"
                        value={formData.storageLimit}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            storageLimit: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                        Price
                      </label>
                      <input
                        type="text"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Advance Customization */}
              {formData.plan === "Enterprise" && (
                <div>
                  <div className="flex items-center justify-between p-3 bg-navbarBg rounded-lg mb-4">
                    <div className="flex items-center gap-2">
                      <span>🔧</span>
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Advance Customization
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.advanceCustomization}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            advanceCustomization: e.target.checked,
                          })
                        }
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring peer-focus:ring-blue-300 dark:peer-focus:ring-gray-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  {formData.advanceCustomization && (
                    <div className="space-y-4 pl-4">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Image Limit
                          </label>
                          <input
                            type="text"
                            value={formData.imageLimit}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                imageLimit: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Max Image Size
                          </label>
                          <input
                            type="text"
                            value={formData.maxImageSize}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                maxImageSize: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Format
                          </label>
                          <select
                            value={formData.imageFormat}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                imageFormat: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>JPG, PNG, WEBP</option>
                            <option>JPG, PNG</option>
                            <option>All Formats</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Video Limit
                          </label>
                          <input
                            type="text"
                            value={formData.videoLimit}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                videoLimit: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Max Video Size
                          </label>
                          <input
                            type="text"
                            value={formData.maxVideoSize}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                maxVideoSize: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Format
                          </label>
                          <select
                            value={formData.videoFormat}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                videoFormat: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>MP4, MKV</option>
                            <option>MP4</option>
                            <option>All Formats</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Audio
                          </label>
                          <input
                            type="text"
                            value={formData.audioLimit}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                audioLimit: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Max Video Size
                          </label>
                          <input
                            type="text"
                            value={formData.maxAudioSize}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                maxAudioSize: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Format
                          </label>
                          <select
                            value={formData.audioFormat}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                audioFormat: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>MP3</option>
                            <option>WAV</option>
                            <option>All Formats</option>
                          </select>
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50 border border-border dark:bg-blue-900 rounded-lg">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.enableCustomBranding}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                enableCustomBranding: e.target.checked,
                              })
                            }
                            className="rounded border-gray-300 dark:border-gray-600"
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              Enable Custom Branding
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Allow custom logo, colors, and white-label
                              features
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Company Info */}
              {formData.plan === "Enterprise" &&
                formData.advanceCustomization && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      🏢 Company Info
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Company Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter company name"
                            value={formData.companyName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                companyName: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Industry Type
                          </label>
                          <select
                            value={formData.industryType}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                industryType: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option>Select industry</option>
                            <option>Technology</option>
                            <option>Healthcare</option>
                            <option>Finance</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Website
                          </label>
                          <input
                            type="text"
                            value={formData.website}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                website: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-400 mb-1">
                            Location Type
                          </label>
                          <input
                            type="text"
                            value={formData.locationType}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                locationType: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border border-border dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-border dark:border-gray-700 flex justify-between">
              <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-border rounded-lg text-sm font-medium hover:bg-gray-200">
                Label
              </button>
              <button
                onClick={handleAddUser}
                className="px-6 py-2 bg-blue-500 text-white dark:text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center gap-2"
              >
                <span>+</span> Add User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reusable Modals */}
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userData={selectedUser}
        onSave={(updatedData) => {
          console.log("User updated:", updatedData);
          // Update users array here if needed
          setIsEditModalOpen(false);
        }}
      />

      <ResetPasswordModal
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
        userName={selectedUser?.name || ""}
        onConfirm={(newPassword) => {
          console.log(
            "Password reset for",
            selectedUser?.name,
            "to",
            newPassword
          );
          setIsResetPasswordOpen(false);
        }}
      />

      <SuspendUserModal
        isOpen={isSuspendModalOpen}
        onClose={() => setIsSuspendModalOpen(false)}
        userName={selectedUser?.name || ""}
        onConfirm={() => {
          // Update user status to Suspended
          setUsers(
            users.map((u) =>
              u.id === selectedUser?.id
                ? { ...u, status: "Suspended" as Status }
                : u
            )
          );
          setIsSuspendModalOpen(false);
        }}
      />

      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        userName={selectedUser?.name || ""}
        onConfirm={() => {
          // Remove user from list
          setUsers(users.filter((u) => u.id !== selectedUser?.id));
          setIsDeleteModalOpen(false);
        }}
      />
    </div>
  );
}
