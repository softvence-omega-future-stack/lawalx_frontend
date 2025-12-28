"use client";

import { Puzzle } from "lucide-react";

export default function Integrations() {
    return (
        <div className="space-y-8 border border-border bg-navbarBg rounded-xl p-4 md:p-6 min-h-[60vh] flex items-center justify-center">
            <div className="text-center">
                <div className="w-20 h-20 bg-input border border-border rounded-full flex items-center justify-center mx-auto mb-6">
                    <Puzzle className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-headings mb-2">Integrations Coming Soon</h2>
                <p className="text-muted max-w-md mx-auto">
                    We are working on bringing you powerful integrations with your favorite tools. Stay tuned for updates!
                </p>
            </div>
        </div>
    );
}