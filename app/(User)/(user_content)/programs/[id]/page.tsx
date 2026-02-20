"use client"

import { useState } from "react";
import {
  Clock,
  FileText,
  ListTree,
  Power,
  PowerOff,
  Tv,
  CalendarClock,
  Settings,
} from "lucide-react";
import { useParams } from "next/navigation";
import ContentTimeline from "../components/screenComponent/ContentTimeline";
import ContentSchedule from "../components/screenComponent/ContentSchedule";
import ScreenSettings from "../components/screenComponent/ScreenSettings";
import MapLocation from "../components/screenComponent/MapLocation";
import BaseVideoPlayer from "@/common/BaseVideoPlayer";
import Breadcrumb from "@/common/BreadCrumb";
import ActionButton from "@/components/ActionButton";
import { useGetSingleProgramDataQuery } from "@/redux/api/users/programs/programs.api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Loader2 } from "lucide-react";

dayjs.extend(relativeTime);

const ScreenCardDetails = () => {
  const { id } = useParams();
  const { data: programResponse, isLoading } = useGetSingleProgramDataQuery({ id: String(id) });
  const program = programResponse?.data;

  const [activeTab, setActiveTab] = useState<"timeline" | "schedule" | "settings">(
    "timeline"
  );

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-400">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p>Loading program details...</p>
      </div>
    );
  }

  if (!program) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-400">
        <p>Program not found.</p>
      </div>
    );
  }

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
  const isActive = program.status.toLowerCase() === "publish" || program.status === "active" || program.status === "PUBLISH";
  const assignedContent = `${videos} videos, ${images} content`;

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Programs", href: "/programs" },
            { label: program.name },
          ]}
        />
      </div>
      <div className="mx-auto w-full">
        {/* Header */}
        <div className="sm:items-start justify-between mb-6 sm:mb-8 gap-6 md:gap-10 border border-t-0 border-r-0 border-l-0 border-border pb-6 md:pb-8 rounded-t-xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <h1 className="text-lg sm:text-2xl md:text-[30px] font-semibold text-headings">
              {program.name}
            </h1>

            <button
              className="bg-bgBlue hover:bg-blue-500 text-white px-6 py-2.5 md:px-8 md:py-3.5 rounded-lg text-sm md:text-base font-semibold cursor-pointer transition-all duration-300 ease-in-out shadow-customShadow whitespace-nowrap shrink-0 sm:mt-1"
            >
              Save Changes
            </button>
          </div>
          <p className="text-sm sm:text-base text-muted mt-2 md:mt-6 leading-relaxed">
            {program.description}
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-navbarBg rounded-full border border-border p-1 mb-6 inline-flex overflow-x-auto max-w-full">
          {(["timeline", "schedule", "settings"] as const).map((tab) => {
            const isActiveTab = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm sm:text-base rounded-full mr-2 font-medium whitespace-nowrap transition-all duration-200 cursor-pointer shrink-0 ${isActiveTab
                  ? "bg-blue-50 dark:bg-blue-900/20 shadow-customShadow"
                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
              >
                <span
                  className={`flex items-center gap-2 ${isActiveTab ? "text-bgBlue" : "text-muted hover:text-gray-900 dark:hover:text-white"
                    }`}
                >
                  {tab === "timeline" && <ListTree className="w-4 h-4" />}
                  {tab === "schedule" && <CalendarClock className="w-4 h-4" />}
                  {tab === "settings" && <Settings className="w-4 h-4" />}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </span>
              </button>
            );
          })}
        </div>
        {/* Main layout */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Left side */}
          <div className="flex-1 w-full">
            {activeTab === "timeline" && <ContentTimeline timeline={program.timeline || []} />}
            {activeTab === "schedule" && <ContentSchedule schedules={program.schedules || []} />}
            {activeTab === "settings" && <ScreenSettings program={program} />}
          </div>

          {/* Right side */}
          <div className="w-full md:w-[55%] space-y-6">
            {/* Video Section */}
            <div className=" border border-border p-4 sm:p-6 rounded-xl overflow-hidden bg-navbarBg">
              <BaseVideoPlayer
                src={previewVideo || ""}
                poster={undefined}
                autoPlay={false}
                rounded="rounded-lg"
              />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 sm:mt-6 gap-3 sm:gap-0">
                <h3 className="text-xl md:text-2xl font-semibold text-headings">
                  {program.name}
                </h3>
                <button
                  className={`shadow-customShadow rounded-full transition-all flex items-center justify-center text-white py-3 sm:py-3.5 px-3 sm:px-3.5 cursor-pointer
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

              <p className="text-sm sm:text-base text-muted mt-2">
                Playing: {program.description}
              </p>
            </div>

            {/* Overview */}
            <div className="rounded-xl border border-border p-4 sm:p-6 bg-navbarBg">
              <h3 className="text-xl md:text-2xl font-semibold text-headings mb-3 sm:mb-4">
                Overview
              </h3>

              <div className="space-y-3 sm:space-y-4">
                {/* Content */}
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <div className="flex items-center gap-2 sm:gap-3 w-[60%]">
                    <FileText className="w-5 h-5 text-body" />
                    <span className="text-sm sm:text-base text-body truncate">
                      Content
                    </span>
                  </div>
                  <div className="text-sm sm:text-base font-medium text-body text-right w-[40%] truncate">
                    {assignedContent}
                  </div>
                </div>

                {/* Total Devices */}
                <div className="flex justify-between items-center py-2 border-b border-borderGray">
                  <div className="flex items-center gap-2 sm:gap-3 w-[60%]">
                    <Tv className="w-5 h-5 text-body" />
                    <span className="text-sm sm:text-base text-body truncate">
                      Total Devices
                    </span>
                  </div>
                  <div className="text-sm sm:text-base font-medium text-body text-right w-[40%] truncate">
                    {program.devices?.length || 0}
                  </div>
                </div>

                {/* Last Updated */}
                <div className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-2 sm:gap-3 w-[60%]">
                    <Clock className="w-5 h-5 text-body" />
                    <span className="text-sm sm:text-base text-body truncate">
                      Last Updated
                    </span>
                  </div>
                  <div className="text-sm sm:text-base font-medium text-body text-right w-[40%] truncate">
                    {lastUpdated}
                  </div>
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="rounded-xl border border-border p-4 sm:p-6 bg-navbarBg">
              <MapLocation />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenCardDetails;
