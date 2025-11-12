"use client";

import React, { useState } from "react";
import {
    Play,
    MoreVertical,
    ChevronRight,
    TvMinimal,
    AudioLines,
} from "lucide-react";
import { ContentItem } from "./MyContent";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import folder from "@/public/icons/folder.svg";

interface ContentCardProps {
    item: ContentItem;
    viewMode?: "grid" | "list";
    onSelect?: (id: string) => void;
    onMenuClick?: (id: string) => void;
    onAssignClick?: (id: string) => void;
}

const MyContentCard = ({
    item,
    viewMode = "grid",
    onSelect,
    onMenuClick,
    onAssignClick,
}: ContentCardProps) => {
    const [expanded, setExpanded] = useState(false);

    const getTypeLabel = () => {
        switch (item.type) {
            case "folder":
                return "Folder";
            case "playlist":
                return "Playlist";
            case "video":
                return "Video";
            case "image":
                return "PNG";
            default:
                return "File";
        }
    };

    const getFileExtension = () => {
        switch (item.type) {
            case "video":
                return ".MP4";
            case "image":
                return ".PNG";
            default:
                return "";
        }
    };

    const getThumbnailIcon = () => {
        if (item.thumbnail) {
            return (
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                    />
                    {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                            <Play className="w-5 h-5 text-white fill-white" />
                        </div>
                    )}
                </div>
            );
        }

        switch (item.type) {
            case "folder":
                return (
                    <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                        <Image src={folder} alt="folder" />
                    </div>
                );
            case "playlist":
                return (
                    <div className="relative flex flex-col items-center gap-3 w-14 h-14 shrink-0">
                        <AudioLines className="w-14 h-14 text-bgBlue stroke-[1.5]" />
                        <div className="absolute bg-white/90 rounded-full p-1.5 mt-2 cursor-pointer">
                            <Play className="w-6 h-6 text-gray-400 fill-[rgba(255,255,255,0.7)] drop-shadow-[0_0_8px_rgba(0,0,0,0.25)]" />
                        </div>
                    </div>
                );
            default:
                return (
                    <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                        <div className="flex flex-col gap-1">
                            <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
                            <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
                            <div className="w-1 h-4 bg-gray-300 rounded-full"></div>
                        </div>
                    </div>
                );
        }
    };

    const isAssigned = item.assignedTo && item.assignedTo.length > 0;

    // LIST VIEW
    if (viewMode === "list") {
        return (
            <>
                <div className="bg-white border-b border-borderGray hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4">
                        {/* Checkbox & Expand Arrow */}
                        <div className="flex items-center gap-2 self-start md:self-auto">
                            <Checkbox
                                onCheckedChange={() => onSelect?.(item.id)}
                                className="w-4 h-4 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition-colors"
                            />
                            {item.type === "folder" && (
                                <ChevronRight
                                    className={`w-5 h-5 text-gray-400 cursor-pointer transition-transform ${expanded ? "rotate-90" : ""
                                        }`}
                                    onClick={() => setExpanded(!expanded)}
                                />
                            )}
                        </div>

                        {/* Thumbnail & Info */}
                        <div className="flex flex-1 items-start md:items-center gap-3 min-w-0 flex-wrap md:flex-nowrap">
                            {getThumbnailIcon()}

                            <div className="flex-1 min-w-0">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4 mb-1 flex-wrap">
                                    <Link href={`/content/${item.id}`}>
                                        <h3 className="font-semibold text-Heading truncate hover:text-bgBlue hover:underline line-clamp-1 transition-colors duration-150">
                                            {item.title}
                                            {getFileExtension()}
                                        </h3>
                                    </Link>
                                </div>

                                <div className="flex flex-wrap items-center text-sm text-gray-600 gap-2">
                                    <span className="text-textGray px-3 py-1 border border-borderGray bg-bgGray rounded-xl text-xs font-medium">
                                        {getTypeLabel()}
                                    </span>
                                    <span className="h-1 w-1 rounded-full bg-[#A3A3A3]"></span>
                                    <span className="flex items-center flex-wrap gap-2">
                                        <span>{item.size}</span>
                                        {item.duration && (
                                            <>
                                                <span className="h-1 w-1 rounded-full bg-[#A3A3A3]"></span>
                                                <span>{item.duration}</span>
                                            </>
                                        )}
                                        {item.fileCount && (
                                            <>
                                                <span className="h-1 w-1 rounded-full bg-[#A3A3A3]"></span>
                                                <span>{item.fileCount} Files</span>
                                            </>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Upload Date or Assigned To */}
                        <div className="shrink-0 w-full md:w-[250px] mt-2 md:mt-0">
                            {isAssigned ? (
                                <div>
                                    <p className="text-xs font-medium text-gray-500 mb-1">
                                        Assigned To
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        {item.assignedTo!.join(", ")}
                                    </p>
                                </div>
                            ) : (
                                <div>
                                    <p className="text-xs font-medium text-gray-500 mb-1">
                                        Uploaded
                                    </p>
                                    <p className="text-sm text-gray-700">8/24/2025 08:00 AM</p>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-wrap md:flex-nowrap items-center gap-2 mt-2 md:mt-0">
                            {!isAssigned && (
                                <button
                                    onClick={() => onAssignClick?.(item.id)}
                                    className="px-6 py-2 md:py-3 bg-bgBlue hover:bg-blue-500 text-white text-sm md:text-base font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                                >
                                    <TvMinimal className="w-5 h-5" />
                                    Assign
                                </button>
                            )}
                            <button
                                onClick={() => onMenuClick?.(item.id)}
                                className="text-gray-400 hover:text-gray-600 transition-colors p-1 cursor-pointer"
                            >
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Nested Children */}
                {expanded && item.children && item.children.length > 0 && (
                    <div className="border-l ml-6 md:ml-12 border-borderGray">
                        {item.children.map((child) => (
                            <MyContentCard
                                key={child.id}
                                item={child}
                                viewMode="list"
                                onSelect={onSelect}
                                onMenuClick={onMenuClick}
                                onAssignClick={onAssignClick}
                            />
                        ))}
                    </div>
                )}
            </>
        );
    }

    // GRID VIEW
    return (
        <div className="bg-white border border-borderGray rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            {/* Thumbnail/Icon */}
            <div className="relative bg-[#F0FAFF] h-48 flex items-center justify-center">
                <div className="absolute top-3 left-3">
                    <Checkbox
                        onCheckedChange={() => onSelect?.(item.id)}
                        className="w-5 h-5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                </div>

                {item.thumbnail ? (
                    <Image
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className="object-cover"
                    />
                ) : item.type === "folder" ? (
                    <Image src={folder} alt="folder" />
                ) : (
                    <div className="relative flex flex-col items-center gap-3">
                        <AudioLines className="w-20 h-20 text-bgBlue stroke-[1.5]" />
                        <div className="absolute bg-white/90 rounded-full p-2.5 mt-4 cursor-pointer">
                            <Play className="w-8 h-8 text-gray-400 fill-[rgba(255,255,255,0.7)] drop-shadow-[0_0_8px_rgba(0,0,0,0.25)] " />
                        </div>
                    </div>
                )}

                {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 rounded-full p-2.5 cursor-pointer">
                            <Play className="w-8 h-8 fill-[rgba(255,255,255,0.7)] drop-shadow-[0_0_8px_rgba(0,0,0,0.25)]" />
                        </div>
                    </div>
                )}
            </div>

            {/* Content Info */}
            <div className="p-4">
                <div className="flex flex-row items-start sm:items-center justify-between mb-2 gap-2">
                    <Link href={`/content/${item.id}`} className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg md:text-xl text-gray-900 hover:text-bgBlue hover:underline line-clamp-1 transition-colors duration-150">
                            {item.title}
                        </h3>
                    </Link>

                    <button
                        onClick={() => onMenuClick?.(item.id)}
                        className="text-textGray hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3 gap-2">
                    <span className="text-textGray px-3 py-1 border border-borderGray bg-bgGray rounded-xl text-xs font-medium">
                        {getTypeLabel()}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-[#A3A3A3]"></span>

                    <span className="flex items-center gap-2 flex-wrap">
                        <span>{item.size}</span>
                        {item.duration && (
                            <>
                                <span className="h-1 w-1 rounded-full bg-[#A3A3A3]"></span>
                                <span>{item.duration}</span>
                            </>
                        )}
                        {item.fileCount && (
                            <>
                                <span className="h-1 w-1 rounded-full bg-[#A3A3A3]"></span>
                                <span>{item.fileCount} Files</span>
                            </>
                        )}
                    </span>
                </div>

                {item.assignedTo && item.assignedTo.length > 0 && (
                    <div className="pt-3">
                        <p className="text-sm md:text-base font-semibold text-gray-800 mb-1">
                            Assigned To
                        </p>
                        <p className="text-sm text-textGray">{item.assignedTo.join(", ")}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyContentCard;
