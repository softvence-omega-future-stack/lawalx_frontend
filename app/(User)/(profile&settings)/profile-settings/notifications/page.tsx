"use client";

import React from "react";

export default function Notifications() {
    const [emailNotifs, setEmailNotifs] = React.useState(false);
    const [deviceAlerts, setDeviceAlerts] = React.useState(false);
    const [videoUploads, setVideoUploads] = React.useState(false);
    const [scheduleUpdates, setScheduleUpdates] = React.useState(false);

    return (
        <div className="space-y-8 border border-border bg-navbarBg rounded-xl p-4 md:p-6">

            <div className="border border-border rounded-xl p-6">
                <h2 className="text-lg md:text-xl font-bold text-headings mb-6">Notification Preferences</h2>

                <div className="space-y-6">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between pb-6 border-b border-border">
                        <div>
                            <h3 className="text-sm font-semibold text-headings mb-1">Email Notifications</h3>
                            <p className="text-xs text-muted">Receive email notifications for important events</p>
                        </div>
                        <button
                            onClick={() => setEmailNotifs(!emailNotifs)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${emailNotifs ? 'bg-bgBlue' : 'bg-gray-200'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${emailNotifs ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    {/* Device Alerts */}
                    <div className="flex items-center justify-between pb-6 border-b border-border">
                        <div>
                            <h3 className="text-sm font-semibold text-headings mb-1">Device Alerts</h3>
                            <p className="text-xs text-muted">Get notified when devices go offline or have issues</p>
                        </div>
                        <button
                            onClick={() => setDeviceAlerts(!deviceAlerts)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${deviceAlerts ? 'bg-bgBlue' : 'bg-gray-200'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${deviceAlerts ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    {/* Video Upload Complete */}
                    <div className="flex items-center justify-between pb-6 border-b border-border">
                        <div>
                            <h3 className="text-sm font-semibold text-headings mb-1">Video Upload Complete</h3>
                            <p className="text-xs text-muted">Get notified when video uploads are completed</p>
                        </div>
                        <button
                            onClick={() => setVideoUploads(!videoUploads)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${videoUploads ? 'bg-bgBlue' : 'bg-gray-200'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${videoUploads ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>

                    {/* Schedule Updates */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-semibold text-headings mb-1">Schedule Updates</h3>
                            <p className="text-xs text-muted">Receive notifications about schedule changes</p>
                        </div>
                        <button
                            onClick={() => setScheduleUpdates(!scheduleUpdates)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${scheduleUpdates ? 'bg-bgBlue' : 'bg-gray-200'}`}
                        >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${scheduleUpdates ? 'translate-x-6' : 'translate-x-1'}`} />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}