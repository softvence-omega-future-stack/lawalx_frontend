"use client";

import BaseDialog from "@/common/BaseDialog";
import React, { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";

interface Video {
    id: string;
    name: string;
    size: string;
    thumbnail: string;
}

interface CreateFolderDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const videoList: Video[] = [
    {
        id: "1",
        name: "Video 1",
        size: "40 MB",
        thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=150&fit=crop",
    },
    {
        id: "2",
        name: "Video 2",
        size: "50 MB",
        thumbnail: "https://images.unsplash.com/photo-1593642634315-48f5414c3ad9?w=200&h=150&fit=crop",
    },
    {
        id: "3",
        name: "Video 3",
        size: "60 MB",
        thumbnail: "https://images.unsplash.com/photo-1602524813231-68b35b7d5ab3?w=200&h=150&fit=crop",
    },
];

const CreateFolderDialog = ({ open, setOpen }: CreateFolderDialogProps) => {
    const [folderName, setFolderName] = useState("");
    const [selectedVideos, setSelectedVideos] = useState<string[]>([]);

    const handleCheckboxChange = (videoId: string) => {
        setSelectedVideos((prev) =>
            prev.includes(videoId)
                ? prev.filter((id) => id !== videoId)
                : [...prev, videoId]
        );
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleCreateFolder = () => {
        const data = {
            folderName,
            selectedVideos: videoList.filter((video) =>
                selectedVideos.includes(video.id)
            ),
            selectedVideoIds: selectedVideos,
        };
        console.log("Create Folder Data:", data);
        handleCancel();
    };

    return (
        <BaseDialog
            open={open}
            setOpen={setOpen}
            title="Create a folder"
            description=""
            maxWidth="2xl"
            maxHeight="lg"
        >
            <div className="space-y-4">
                {/* Folder Name Input */}
                <div>
                    <label className="block text-base font-medium text-gray-900 mb-2">
                        Folder Name
                    </label>
                    <input
                        type="text"
                        placeholder="Enter folder name"
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base"
                    />
                </div>

                {/* Video Selection List */}
                <div className="border border-borderGray rounded-xl max-h-[300px] overflow-y-auto scroll-auto">
                    {videoList.map((video) => (
                        <div
                            key={video.id}
                            className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-borderGray last:border-b-0"
                        >
                            {/* Checkbox */}
                            <Checkbox
                                checked={selectedVideos.includes(video.id)}
                                onCheckedChange={() => handleCheckboxChange(video.id)}
                                className="w-5 h-5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                            />

                            {/* Thumbnail */}
                            <div className="shrink-0 rounded-lg overflow-hidden bg-gray-200">
                                <Image
                                    src={video.thumbnail}
                                    alt={video.name}
                                    width={80}
                                    height={60}
                                    className="object-cover rounded-lg"
                                />
                            </div>

                            {/* Video Info */}
                            <div className="flex-1">
                                <div className="font-medium text-gray-900 text-base">
                                    {video.name}
                                </div>
                                <div className="text-sm text-gray-500">{video.size}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between gap-4 pt-2">
                    <button
                        onClick={handleCancel}
                        className="flex-1 px-4 py-3 border border-bgBlue text-gray-900 rounded-lg font-semibold hover:bg-blue-50 text-base cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleCreateFolder}
                        className="flex-1 px-6 py-3 bg-bgBlue text-white rounded-lg font-semibold hover:bg-blue-500 transition-colors text-base cursor-pointer"
                    >
                        Create Folder
                    </button>
                </div>
            </div>
        </BaseDialog>
    );
};

export default CreateFolderDialog;
