"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import {
    useGetMyNotificationsQuery,
    useReadAllNotificationsMutation,
    useReadNotificationMutation,
    useSoftDeleteNotificationMutation
} from "@/redux/api/users/notificationApi";
import { User, Monitor, SettingsIcon, Bell, Trash2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import UserDashboardNavbar from "@/components/layout/UserDashboardNavbar";

export default function NotificationsPage() {
    const { data: notificationData, isLoading } = useGetMyNotificationsQuery();
    const [readAllNotifications] = useReadAllNotificationsMutation();
    const [readNotification] = useReadNotificationMutation();
    const [deleteNotification] = useSoftDeleteNotificationMutation();

    const allNotifications = notificationData?.data || [];

    const handleReadAll = async () => {
        try {
            await readAllNotifications().unwrap();
            toast.success("All notifications marked as read");
        } catch (error) {
            toast.error("Failed to mark all as read");
        }
    };

    const handleRead = async (id: string) => {
        try {
            await readNotification(id).unwrap();
        } catch (error) {
            console.error("Failed to mark as read", error);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        try {
            await deleteNotification(id).unwrap();
            toast.success("Notification deleted");
        } catch (error) {
            toast.error("Failed to delete notification");
        }
    };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "USER": return User;
            case "DEVICE": return Monitor;
            case "SYSTEM": return SettingsIcon;
            default: return Bell;
        }
    };

    return (
        <div className="min-h-screen bg-White">
            <UserDashboardNavbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-navbarBg rounded-xl shadow-sm border border-border">
                    <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">All Notifications</h1>
                        <div className="flex gap-2">
                            <button
                                onClick={handleReadAll}
                                className="px-3 py-1.5 text-sm font-medium text-bgBlue dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors cursor-pointer"
                            >
                                Mark all as read
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2 p-3">
                        {isLoading ? (
                            <div className="p-8 text-center text-gray-500">Loading notifications...</div>
                        ) : allNotifications.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                                <p>No notifications yet</p>
                            </div>
                        ) : (
                            allNotifications.map((item: any) => {
                                const Icon = getNotificationIcon(item.notification.actorType);
                                return (
                                    <div
                                        key={item.notificationId}
                                        onClick={() => !item.isRead && handleRead(item.notificationId)}
                                        className={`p-4 rounded-xl flex gap-4 transition-all duration-200 cursor-pointer group border border-border hover:shadow-md hover:scale-[1.005] hover:bg-white dark:hover:bg-gray-700/40 hover:border-border ${!item.isRead ? 'bg-blue-50/50 dark:bg-blue-900/10 border-blue-100/50 dark:border-blue-900/20' : ''}`}
                                    >
                                        <div className={`h-10 w-10 flex items-center justify-center rounded-full border flex-shrink-0 ${!item.isRead ? 'border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800' : 'border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-transparent'}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className={`text-sm font-semibold mb-1 ${!item.isRead ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                                                        {item.notification.title}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                                                        {item.notification.body}
                                                    </p>
                                                </div>
                                                {!item.isRead && (
                                                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between mt-2">
                                                <span className="text-xs text-gray-500 dark:text-gray-500">
                                                    {formatDistanceToNow(new Date(item.notification.createdAt), { addSuffix: true })}
                                                </span>

                                                <div className={`flex items-center gap-2 transition-opacity ${item.isRead ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                                    {!item.isRead && (
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                handleRead(item.notificationId);
                                                            }}
                                                            className="p-1.5 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                                                            title="Mark as read"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={(e) => handleDelete(item.notificationId, e)}
                                                        className="p-1.5 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
