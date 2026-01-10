"use client";

import {
  Clock,
  Settings2,
  PowerOff,
  Power,
  FilePlay,
  TvMinimal,
  Loader2,
} from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { ScreenData } from "../../page";
import { useRouter } from "next/navigation";

interface ScreenCardProps {
  screen: ScreenData;
}



const ScreenCard: React.FC<ScreenCardProps> = ({ screen }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const handleOnClick = () => {
    setLoading(true);
    navigate.push(`/programs/${screen.id}`);
  }

  return (
    <div className="group bg-navbarBg border border-border rounded-xl overflow-hidden hover:shadow-md dark:hover:shadow-xl transition-all">
      {/* Video Section (ONLY this has p-3) */}
      <div className="p-3">
        <div className="relative overflow-hidden rounded-lg">
          <video
            src={screen.video}
            className="w-full h-[120px] sm:h-[180px] object-cover transition-transform duration-300 group-hover:scale-105"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>

      {/* Rest of Content (UNCHANGED padding) */}
      <div className="p-4 sm:p-6">
        {/* Title */}
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
          {screen.title}
        </h3>

        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          {screen.description}
        </p>

        {/* Full-width Divider */}
        <div className="border-t border-borderGray my-6 -mx-4 sm:-mx-6" />

        {/* Info Section */}
        <div className="space-y-2 sm:space-y-3 mb-6 text-sm sm:text-base text-gray-700 dark:text-gray-300">
          <div className="flex items-center gap-2">
            <FilePlay className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
            <span>Assigned: {screen.assignedContent}</span>
          </div>

          <div className="flex items-center gap-2">
            <TvMinimal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
            <span>
              {screen.devices} Device{screen.devices !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
            <span>Last Updated: {screen.lastUpdated}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Manage Button */}
          <button
            onClick={handleOnClick}
            disabled={loading}
            className="w-full shadow-customShadow bg-bgBlue hover:bg-blue-500 text-white font-medium py-2.5 sm:py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm sm:text-base cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                Managing...
              </>
            ) : (
              <>
                <Settings2 className="w-4 h-4 sm:w-5 sm:h-5" />
                Manage
              </>
            )}
          </button>

          {/* Power Button */}
          <button
            className={`shadow-customShadow rounded-full transition-all flex items-center justify-center text-white
              py-3 sm:py-3.5 px-3 sm:px-3.5 cursor-pointer
              ${screen.status === "active"
                ? "bg-bgBlue hover:bg-blue-500"
                : "bg-bgRed hover:bg-red-600"
              }`}
            title={screen.status === "active" ? "Turn Off" : "Turn On"}
          >
            {screen.status === "active" ? (
              <Power className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <PowerOff className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScreenCard;
