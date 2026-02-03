"use client";

import React from "react";
import { formatDistanceToNow } from "date-fns";
import { Activity, Trash2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useGetAllActivitiesQuery, useDeleteActivityMutation } from "@/redux/api/users/dashboard/activityApi";
import UserDashboardNavbar from "@/components/layout/UserDashboardNavbar";

export default function ActivityPage() {
    const { data: activityData, isLoading } = useGetAllActivitiesQuery();
    const [deleteActivity] = useDeleteActivityMutation();

    const activities = activityData?.data || [];

    // Sort activities by date (newest first)
    const sortedActivities = [...activities].sort((a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const handleDelete = async (id: string) => {
        try {
            await deleteActivity(id).unwrap();
            toast.success("Activity deleted successfully");
        } catch (error) {
            toast.error("Failed to delete activity");
            console.error("Delete error:", error);
        }
    };

    return (
        <div className="min-h-screen bg-White">
            <UserDashboardNavbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="bg-navbarBg rounded-xl shadow-sm border border-border">
                    <div className="px-6 py-5 border-b border-border flex items-center gap-4">
                        <Link href="/dashboard" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Activity Log</h1>
                    </div>

                    <div className="space-y-2 p-3">
                        {isLoading ? (
                            <div className="p-8 text-center text-gray-500">Loading activities...</div>
                        ) : sortedActivities.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                <Activity className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
                                <p>No activities found</p>
                            </div>
                        ) : (
                            sortedActivities.map((activity: any) => (
                                <div
                                    key={activity.id}
                                    className="p-4 rounded-xl flex gap-4 transition-all duration-200 group border border-border hover:shadow-md hover:scale-[1.005] hover:bg-white dark:hover:bg-gray-700/40 hover:border-border bg-white dark:bg-gray-800"
                                >
                                    <div className="h-10 w-10 flex items-center justify-center rounded-full border flex-shrink-0 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-gray-800">
                                        <Activity className="w-5 h-5" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-sm font-semibold mb-1 text-gray-900 dark:text-white">
                                                    {activity.actionType}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2">
                                                    {activity.description}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => handleDelete(activity.id)}
                                                className="p-1.5 text-gray-500 hover:text-red-600 dark:hover:text-red-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                                                title="Delete Activity"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-xs text-gray-500 dark:text-gray-500">
                                                {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
