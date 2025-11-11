"use client";

import { LucideIcon } from "lucide-react";

interface ContentButtonProps {
    title: string;
    icon: LucideIcon; // Accepts any lucide-react icon
}

const ContentButton = ({ title, icon: Icon }: ContentButtonProps) => {
    return (
        <button className="flex items-center gap-2 text-sm md:text-base py-2 md:py-3 px-4 md:px-6 bg-bgBlue hover:bg-blue-500 text-white rounded-lg hover:opacity-90 transition cursor-pointer">
            <Icon className="w-5 h-5" />
            <span className="text-sm md:text-base font-medium">{title}</span>
        </button>
    );
};

export default ContentButton;
