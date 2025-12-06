"use client";

import { Clock, Settings2, PowerOff, Power, FilePlay, TvMinimal } from "lucide-react";
import React from "react";
import { ScreenData } from "../../page";
import Link from "next/link";

interface ScreenCardProps {
    screen: ScreenData;
}

const ScreenCard: React.FC<ScreenCardProps> = ({ screen }) => {
    return (
        <div className="group bg-white border border-borderGray dark:bg-cardBg dark:border-borderColor rounded-xl overflow-hidden  hover:shadow-md transition-all">
            {/* Content */}
            <div className="p-4 sm:p-6">
                {/* Image */}
                {/* <div className="relative overflow-hidden rounded-lg">
                    <img
                        src={screen.image}
                        alt={screen.title}
                        className="w-full h-[120px] sm:h-[180px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div> */}
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


                {/* Title & Power Button */}
                <div className="flex flex-row items-start sm:items-center justify-between mt-4 sm:mt-6 gap-2 sm:gap-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{screen.title}</h3>

                    <button
                        className={`p-2 rounded-lg transition-all flex items-center justify-center cursor-pointer ${screen.status === "active"
                            ? "bg-bgBlue hover:bg-blue-500"
                            : "bg-bgRed hover:bg-red-600"
                            } text-white`}
                        title={screen.status === "active" ? "Turn Off" : "Turn On"}
                    >
                        {screen.status === "active" ? (
                            <Power className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                            <PowerOff className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                    </button>
                </div>

                <p className="text-sm sm:text-base text-gray-500  mb-4 sm:mb-6 dark:text-white">{screen.description}</p>

                {/* Info */}
                <div className="space-y-1 sm:space-y-3 mb-4 sm:mb-5 text-sm sm:text-base text-gray-700 dark:text-white">
                    <div className="flex items-center gap-2 sm:gap-3">
                        <FilePlay className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-white" />
                        <span className="text-sm md:text-base">Assigned: {screen.assignedContent}</span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <TvMinimal className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-white" />
                        <span className="text-sm md:text-base">{screen.devices} Device{screen.devices !== 1 ? "s" : ""}</span>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-white" />
                        <span className="text-sm md:text-base">Last Updated: {screen.lastUpdated}</span>
                    </div>
                </div>

                {/* Manage Button */}
                <Link href={`/screens/${screen.id}`}>
                    <button className="w-full shadow-customShadow bg-bgBlue hover:bg-blue-400 text-white font-medium py-2.5 sm:py-3 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base">
                        <Settings2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        Manage
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ScreenCard;
