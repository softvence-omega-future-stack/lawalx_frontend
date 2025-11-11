"use client";

import { FilePlay, TvMinimal, HardDrive } from "lucide-react";

const stats = [
  {
    title: "Total Files",
    value: 12,
    icon: FilePlay,
    color: "#404040", // custom gray
  },
  {
    title: "Assigned",
    value: 8,
    icon: TvMinimal,
    color: "text-green-500",
  },
  {
    title: "Storage Used",
    value: "0.0/10 GB",
    icon: HardDrive,
    color: "text-red-500",
  },
];

const ContentCard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((item, index) => {
        const Icon = item.icon;
        return (
          <div
            key={index}
            className="flex items-center p-6 gap-3 border rounded-xl bg-white"
          >
            <span className="p-3 rounded-full border border-borderGray">
              {/* Conditional color logic */}
              {typeof item.color === "string" && item.color.startsWith("text-") ? (
                <Icon className={`w-6 h-6 ${item.color}`} />
              ) : (
                <Icon className="w-6 h-6" style={{ color: item.color }} />
              )}
            </span>
            <div>
              <h3 className="text-sm md:text-base text-textGray">{item.title}</h3>
              <p className="text-2xl md:text-[32px] font-semibold text-gray-900 mt-1">
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContentCard;
