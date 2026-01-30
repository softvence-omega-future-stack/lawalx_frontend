"use client";

import { useState } from "react";
import {
    Play,
    MoreVertical,
    Pencil,
    Trash2,
    ScreenShare,
    CalendarClock,
    Eye,
} from "lucide-react";
import Image from "next/image";
import MenuDropdown from "@/common/MenuDropdown";
import VideoPlayDialog from "./VideoPlayDialog";
import RenameDialog from "./RenameDialog";

interface TemplateItem {
    id: string;
    title: string;
    type: "video" | "image";
    duration?: string;
    thumbnail?: string;
    video?: string;
    resolution?: string;
    assignedTo?: string[];
}

interface TemplateCardProps {
    item: TemplateItem;
}

const TemplateCard = ({ item }: TemplateCardProps) => {
    const [openVideo, setOpenVideo] = useState(false);
    const [openRename, setOpenRename] = useState(false);

    // Template-specific dropdown options (based on image 5)
    const dropdownOptions = [
        {
            label: "Assign to Program",
            value: "assign",
            icon: <ScreenShare className="w-5 h-5 text-headings" />,
            onClick: () => console.log("Assign to Program", item.id)
        },
        {
            label: "Edit",
            value: "edit",
            icon: <Pencil className="w-5 h-5" />,
            onClick: () => console.log("Edit", item.id)
        },
        {
            label: "Schedule",
            value: "schedule",
            icon: <CalendarClock className="w-5 h-5 text-headings" />,
            onClick: () => console.log("Schedule", item.id)
        },
        {
            label: "Rename",
            value: "rename",
            icon: <Pencil className="w-5 h-5" />,
            onClick: () => setOpenRename(true)
        },
        {
            label: "Delete",
            value: "delete",
            icon: <Trash2 className="w-5 h-5 text-red-500" />,
            danger: true,
            onClick: () => console.log("Delete", item.id)
        },
    ];

    const isAssigned = (item.assignedTo ?? []).length > 0;

    return (
        <>
            {/* Video Play Dialog */}
            {openVideo && item.video && (
                <VideoPlayDialog
                    item={{
                        id: item.id,
                        title: item.title,
                        type: "video",
                        video: item.video,
                        thumbnail: item.thumbnail,
                        size: "",
                    }}
                    open={openVideo}
                    setOpen={setOpenVideo}
                />
            )}

            {openRename && (
                <RenameDialog
                    open={openRename}
                    setOpen={setOpenRename}
                    itemName={item.title}
                    itemType={item.type}
                    onRename={(newName) => console.log(`Renaming template ${item.id} to ${newName}`)}
                />
            )}


            <div className="bg-navbarBg border border-border rounded-xl overflow-hidden hover:shadow-md dark:hover:shadow-xl transition-shadow">
                <div className="relative bg-[#F0FAFF] dark:bg-gray-800 h-48 flex items-center justify-center group"
                    onClick={() => item.type === "video" && setOpenVideo(true)}
                >
                    {item.thumbnail ? (
                        <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
                    ) : null}

                    {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setOpenVideo(true);
                                }}
                                className="bg-white/90 dark:bg-gray-900/90 rounded-full p-2.5 hover:bg-white dark:hover:bg-gray-900 transition-colors cursor-pointer"
                            >
                                <Play className="w-8 h-8 fill-[rgba(255,255,255,0.7)]" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="p-4">
                    <div className="flex items-start justify-between mb-2 gap-2">
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">
                                {item.title}
                            </h3>
                        </div>
                        <MenuDropdown
                            triggerIcon={<MoreVertical className="w-6 h-6 text-muted" />}
                            options={dropdownOptions}
                        />
                    </div>

                    <div className="flex flex-wrap items-center text-sm text-gray-600 dark:text-gray-400 mb-3 gap-2">
                        <span className="text-textGray dark:text-gray-300 px-3 py-1 border border-borderGray dark:border-gray-600 bg-bgGray dark:bg-gray-800 rounded-xl text-xs font-medium">
                            Template
                        </span>
                        {item.resolution && <span>• {item.resolution}</span>}
                        {item.duration && <span>• {item.duration}</span>}
                    </div>

                    {isAssigned && (
                        <div className="pt-3">
                            <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Assigned To</p>
                            <p className="text-sm text-textGray dark:text-gray-400">{item.assignedTo?.join(", ")}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TemplateCard;
