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
import { useRouter } from "next/navigation";
import { Program } from "@/redux/api/users/programs/programs.type";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface ScreenCardProps {
  program: Program;
}

const ScreenCard: React.FC<ScreenCardProps> = ({ program }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const handleOnClick = () => {
    setLoading(true);
    navigate.push(`/programs/${program.id}`);
  };

  const videos = program.timeline?.filter((t) => t.file?.type === "VIDEO")?.length || 0;
  const images = program.timeline?.filter((t) => t.file?.type === "IMAGE" || t.file?.type === "CONTENT")?.length || 0;

  const getFileUrl = (url: string) => {
    if (!url) return undefined;
    if (url.startsWith("http")) return url;
    const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL || "").replace(/\/api\/v1\/?$/, "");
    return `${baseUrl}/${url.startsWith("/") ? url.slice(1) : url}`;
  };

  const previewVideo = getFileUrl(program.timeline?.[0]?.file?.url || "");
  const lastUpdated = dayjs(program.updated_at).fromNow();
  const isActive = program.status.toLowerCase() === "publish";

  return (
    <div className="group bg-navbarBg border border-border rounded-xl overflow-hidden hover:shadow-md dark:hover:shadow-xl transition-all h-full flex flex-col">
      {/* Video Section (ONLY this has p-3) */}
      <div className="p-3">
        <div className="relative overflow-hidden rounded-lg">
          <video
            src={previewVideo}
            className="w-full h-[120px] sm:h-[180px] object-cover transition-transform duration-300 group-hover:scale-105"
            autoPlay
            muted
            loop
            playsInline
          />
        </div>
      </div>

      {/* Rest of Content (UNCHANGED padding) */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-headings line-clamp-1">
          {program.name}
        </h3>

        <p className="text-sm sm:text-base text-body line-clamp-5 py-1 md:py-2">
          {program.description}
        </p>

        {/* Full-width Divider */}
        <div className="border-t border-borderGray mt-auto mb-6 -mx-4 sm:-mx-6" />

        {/* Info Section */}
        <div className="space-y-2 sm:space-y-3 mb-6 text-sm sm:text-base text-body">
          <div className="flex items-center gap-2">
            <FilePlay className="w-4 h-4 sm:w-5 sm:h-5 text-headings" />
            <span>Assigned: {videos} videos, {images} content</span>
          </div>

          <div className="flex items-center gap-2">
            <TvMinimal className="w-4 h-4 sm:w-5 sm:h-5 text-headings" />
            <span>
              {program.devices?.length || 0} Device{program.devices?.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-headings" />
            <span>Last Updated: {lastUpdated}</span>
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
              ${isActive
                ? "bg-bgBlue hover:bg-blue-500"
                : "bg-bgRed hover:bg-red-600"
              }`}
            title={isActive ? "Turn Off" : "Turn On"}
          >
            {isActive ? (
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
