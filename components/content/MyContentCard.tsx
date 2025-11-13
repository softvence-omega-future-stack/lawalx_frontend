"use client";

import React, { useState } from "react";
import {
  Play,
  ChevronRight,
  TvMinimal,
  AudioLines,
  MoreVertical,
  Plus,
  Pencil,
  FolderOpen,
  Trash2,
} from "lucide-react";
import { ContentItem } from "./MyContent";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import Link from "next/link";
import folder from "@/public/icons/folder.svg";
import MenuDropdown from "@/common/MenuDropdown";
import VideoPlayDialog from "./VideoPlayDialog";

interface ContentCardProps {
  item: ContentItem;
  viewMode?: "grid" | "list";
  onSelect?: (id: string) => void;
  onMenuClick?: (id: string, action: string) => void;
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
  const [open, setOpen] = useState(false);

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
          <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
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

  const isAssigned = (item.assignedTo ?? []).length > 0;

  const dropdownOptions =
    viewMode === "list"
      ? [
          {
            label: "Rename",
            value: "rename",
            icon: <Pencil className="w-5 h-5" />,
            onClick: () => onMenuClick?.(item.id, "rename"),
          },
          {
            label: "Move to Folder",
            value: "move",
            icon: <FolderOpen className="w-5 h-5" />,
            onClick: () => onMenuClick?.(item.id, "move"),
          },
          {
            label: "Delete",
            value: "delete",
            icon: <Trash2 className="w-5 h-5 text-red-500" />,
            danger: true,
            onClick: () => onMenuClick?.(item.id, "delete"),
          },
        ]
      : [
          {
            label: "Assign",
            value: "assign",
            icon: <Plus className="w-5 h-5" />,
            onClick: () => onAssignClick?.(item.id),
          },
          {
            label: "Rename",
            value: "rename",
            icon: <Pencil className="w-5 h-5" />,
            onClick: () => onMenuClick?.(item.id, "rename"),
          },
          {
            label: "Move to Folder",
            value: "move",
            icon: <FolderOpen className="w-5 h-5" />,
            onClick: () => onMenuClick?.(item.id, "move"),
          },
          {
            label: "Delete",
            value: "delete",
            icon: <Trash2 className="w-5 h-5 text-red-500" />,
            danger: true,
            onClick: () => onMenuClick?.(item.id, "delete"),
          },
        ];

  return (
    <>
      <VideoPlayDialog item={item} open={open} setOpen={setOpen} />

      {viewMode === "list" ? (
        <>
          <div className="bg-white w-full border-b border-borderGray hover:bg-gray-50 transition-colors">
            <div className="flex flex-col md:flex-row justify-between w-full gap-6 md:gap-12 p-4 items-center">
              <div className="flex items-center gap-4 w-full md:w-[35%]">
                <div className="flex items-center gap-2 shrink-0">
                  <Checkbox
                    onCheckedChange={() => onSelect?.(item.id)}
                    className="w-5 h-5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  {item.type === "folder" && (
                    <ChevronRight
                      className={`w-5 h-5 text-textGray cursor-pointer transition-transform ${expanded ? "rotate-90" : ""}`}
                      onClick={() => setExpanded(!expanded)}
                    />
                  )}
                </div>

                <div className="flex-1 items-center gap-3 min-w-0 flex">
                  {getThumbnailIcon()}
                  <div className="flex-1 min-w-0">
                    <Link href={`/content/${item.id}`}>
                      <h3 className="font-medium text-Heading text-sm md:text-lg truncate hover:text-bgBlue hover:underline">
                        {item.title}
                        {getFileExtension()}
                      </h3>
                    </Link>
                    <div className="flex flex-wrap items-center text-sm text-gray-600 gap-2 mt-1">
                      <span className="text-textGray px-3 py-1 border border-borderGray bg-bgGray rounded-xl text-xs font-medium">
                        {getTypeLabel()}
                      </span>
                      <span>{item.size}</span>
                      {item.duration && <span>• {item.duration}</span>}
                      {item.fileCount && <span>• {item.fileCount} Files</span>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-start w-full md:w-[25%]">
                {isAssigned && (
                  <div>
                    <p className="text-sm font-medium text-Heading mb-1">Assigned To</p>
                    <p className="text-sm text-textGray">{item.assignedTo?.join(", ")}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-start w-full md:w-[25%]">
                {item.uploadedDate && (
                  <div>
                    <p className="text-sm font-medium text-Heading mb-1">Uploaded</p>
                    <p className="text-sm text-textGray">{item.uploadedDate}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 w-full md:w-[15%] justify-end">
                {!isAssigned && (
                  <button
                    onClick={() => onAssignClick?.(item.id)}
                    className="px-4 py-2 bg-bgBlue hover:bg-blue-500 text-white text-sm font-medium rounded-lg flex items-center gap-2"
                  >
                    <TvMinimal className="w-4 h-4" /> Assign
                  </button>
                )}
                <MenuDropdown triggerIcon={<MoreVertical className="w-4 h-4" />} options={dropdownOptions} />
              </div>
            </div>
          </div>

          {expanded && item.children?.length ? (
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
          ) : null}
        </>
      ) : (
        <div className="bg-white border border-borderGray rounded-xl overflow-hidden hover:shadow-md transition-shadow">
          <div className="relative bg-[#F0FAFF] h-48 flex items-center justify-center">
            <div className="absolute top-3 left-3">
              <Checkbox
                onCheckedChange={() => onSelect?.(item.id)}
                className="w-5 h-5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
            </div>

            {item.thumbnail ? (
              <Image src={item.thumbnail} alt={item.title} fill className="object-cover" />
            ) : item.type === "folder" ? (
              <Image src={folder} alt="folder" />
            ) : (
              <div className="relative flex flex-col items-center gap-3">
                <AudioLines className="w-20 h-20 text-bgBlue stroke-[1.5]" />
                <div className="absolute bg-white/90 rounded-full p-2.5 mt-4 cursor-pointer">
                  <Play className="w-8 h-8 text-gray-400 fill-[rgba(255,255,255,0.7)]" />
                </div>
              </div>
            )}

            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  onClick={() => setOpen(true)}
                  className="bg-white/90 rounded-full p-2.5 cursor-pointer"
                >
                  <Play className="w-8 h-8 fill-[rgba(255,255,255,0.7)]" />
                </button>
              </div>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-start justify-between mb-2 gap-2">
              <Link href={`/content/${item.id}`} className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-gray-900 hover:text-bgBlue hover:underline truncate">
                  {item.title}
                </h3>
              </Link>
              <MenuDropdown triggerIcon={<MoreVertical className="w-6 h-6" />} options={dropdownOptions} />
            </div>

            <div className="flex flex-wrap items-center text-sm text-gray-600 mb-3 gap-2">
              <span className="text-textGray px-3 py-1 border border-borderGray bg-bgGray rounded-xl text-xs font-medium">
                {getTypeLabel()}
              </span>
              <span>{item.size}</span>
              {item.duration && <span>• {item.duration}</span>}
              {item.fileCount && <span>• {item.fileCount} Files</span>}
            </div>

            {isAssigned && (
              <div className="pt-3">
                <p className="text-sm font-semibold text-gray-800 mb-1">Assigned To</p>
                <p className="text-sm text-textGray">{item.assignedTo?.join(", ")}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyContentCard;
