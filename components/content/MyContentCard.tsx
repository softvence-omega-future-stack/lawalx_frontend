import React from "react";
import {
    Folder,
    Play,
    MoreVertical,
    ChevronRight,
    Headphones,
    List,
    TvMinimal,
} from "lucide-react";
import { ContentItem } from "./MyContent";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import Link from "next/link";

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
                <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100">
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
                    <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Folder className="w-8 h-8 text-gray-400 stroke-[1.5]" />
                    </div>
                );
            case "playlist":
                return (
                    <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center">
                        <Headphones className="w-8 h-8 text-gray-400 stroke-[1.5]" />
                    </div>
                );
            default:
                return (
                    <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center">
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

    // 🧩 LIST VIEW
    if (viewMode === "list") {
        return (
            <div className="bg-white border-b border-borderGray hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4 p-4">
                    {/* Checkbox & Expand Arrow */}
                    <div className="flex items-center gap-2">
                        {item.type === "folder" && (
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        )}
                        <Checkbox
                            onCheckedChange={() => onSelect?.(item.id)}
                            className="w-4 h-4 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 transition-colors"
                        />
                    </div>

                    {/* Thumbnail & Info */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        {getThumbnailIcon()}

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 md:gap-4 mb-1">
                                <h3 className="font-semibold text-gray-900 truncate">
                                    {item.title}
                                    {getFileExtension()}
                                </h3>
                                <span className="text-textGray px-3 py-1 border border-borderGray bg-bgGray rounded-xl text-xs font-medium">
                                    {getTypeLabel()}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <span>{item.size}</span>
                                {item.duration && <span>{item.duration}</span>}
                                {item.fileCount && <span>{item.fileCount} Files</span>}
                            </div>
                        </div>
                    </div>

                    {/* Upload Date or Assigned To */}
                    <div className="hidden md:block min-w-[250px]">
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
                    <div className="flex items-center gap-2">
                        {!isAssigned && (
                            <button
                                onClick={() => onAssignClick?.(item.id)}
                                className="px-6 py-2 md:py-3 bg-bgBlue hover:bg-blue-500 text-white text-sm md:text-base font-medium rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
                            >
                                <TvMinimal className="w-5 h-5"/>
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
        );
    }

    // GRID VIEW (original unchanged)
    return (
        <Link href={`/content/${item.id}`} className="bg-white border border-borderGray rounded-xl overflow-hidden hover:shadow-md transition-shadow">
            {/* Thumbnail/Icon Area */}
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
                    <Folder className="w-20 h-20 text-textGray stroke-[1.5]" />
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <List className="w-20 h-20 text-textGray stroke-[1.5]" />
                    </div>
                )}

                {item.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 rounded-full p-3">
                            <Play className="w-8 h-8 text-gray-900 fill-gray-900" />
                        </div>
                    </div>
                )}
            </div>

            {/* Content Info */}
            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 md:gap-4">
                        <h3 className="font-semibold text-lg md:text-xl text-gray-900 flex-1">
                            {item.title}
                        </h3>
                        <span className="text-textGray px-3 py-1 border border-borderGray bg-bgGray rounded-xl text-xs font-medium">
                            {getTypeLabel()}
                        </span>
                    </div>
                    <button
                        onClick={() => onMenuClick?.(item.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <MoreVertical className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                    <span>{item.size}</span>
                    {item.duration && <span>{item.duration}</span>}
                    {item.fileCount && <span>{item.fileCount} Files</span>}
                </div>

                {item.assignedTo && item.assignedTo.length > 0 && (
                    <div className="pt-3 border-t border-gray-100">
                        <p className="text-xs font-medium text-gray-500 mb-1">
                            Assigned To
                        </p>
                        <p className="text-sm text-gray-700">{item.assignedTo.join(", ")}</p>
                    </div>
                )}
            </div>
        </Link>
    );
};

export default MyContentCard;
