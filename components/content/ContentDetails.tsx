"use client";

import {
  ArrowLeft,
  Edit2,
  UserPlus,
  Trash2,
  Play,
  Pause,
  Fullscreen,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { ContentItem } from "./MyContent";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ContentDetailsProps {
  content: ContentItem;
}

const ContentDetails = ({ content }: ContentDetailsProps) => {
  const router = useRouter();

  // Video player state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // Toggle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) video.pause();
    else video.play();
    setIsPlaying(!isPlaying);
  };

  // Update progress
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      if (!video.duration) return;
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, [content.video]);

  // Reset when src changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
    }
  }, [content.video]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  // Seek on click
  const handleProgressClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPos = e.clientX - rect.left;
    const newTime = (clickPos / rect.width) * video.duration;
    video.currentTime = newTime;
  };

  // Display file type label
  const getFileTypeDisplay = () => {
    switch (content.type) {
      case "video":
        return "Video (.MP4)";
      case "image":
        return "Image (.JPG)";
      case "playlist":
        return "Playlist";
      case "folder":
        return "Folder";
      default:
        return "File";
    }
  };

  // Placeholder actions
  const onRename = () => console.log("Rename:", content.id);
  const onAssign = () => console.log("Assign:", content.id);
  const onDelete = () => console.log("Delete:", content.id);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-start gap-3">
          <button
            onClick={() => router.push("/content")}
            className="hover:bg-gray-100 rounded-lg transition-colors mt-1 p-1 cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
              {content.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Professional content suitable for conference rooms and meeting
              areas
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
          <button
            onClick={onRename}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors text-gray-700"
          >
            <Edit2 className="w-4 h-4" />
            Rename
          </button>
          <button
            onClick={onAssign}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors text-gray-700"
          >
            <UserPlus className="w-4 h-4" />
            Assign to
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Preview Panel */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-base font-semibold text-gray-900 mb-4">
              Preview
            </h2>

            {content.type === "video" && content.video ? (
              <div className="bg-white border border-borderGray p-4 sm:p-6 rounded-xl overflow-hidden">
                <div className="relative rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    src={content.video}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                  />
                  {/* Controls */}
                  <div className="absolute bottom-3 left-0 w-full px-3 sm:px-4 flex items-center gap-3 sm:gap-4">
                    <button
                      onClick={togglePlay}
                      className="text-white p-2 sm:p-2.5 rounded-full hover:bg-white/20 transition cursor-pointer"
                    >
                      {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                    </button>

                    <div
                      className="flex-1 h-1 sm:h-1.5 bg-white/30 rounded-full relative cursor-pointer"
                      onClick={handleProgressClick}
                    >
                      <div
                        className="h-full rounded-full bg-bgBlue"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <button
                      onClick={toggleFullscreen}
                      className="text-white p-2 sm:p-2.5 rounded-full hover:bg-white/20 transition cursor-pointer"
                    >
                      <Fullscreen size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ) : content.type === "image" && content.thumbnail ? (
              <Image
                src={content.thumbnail}
                alt={content.title}
                width={600}
                height={340}
                className="rounded-lg object-cover w-full"
              />
            ) : (
              <div className="aspect-video flex items-center justify-center bg-gray-200 rounded-lg">
                No Preview Available
              </div>
            )}
          </div>
        </div>

        {/* Overview Panel */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-6">
              Overview
            </h2>

            <div className="space-y-6">
              {/* File Type */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">File Type:</span>
                <span className="text-sm font-medium text-gray-900">
                  {getFileTypeDisplay()}
                </span>
              </div>

              {/* File Size */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">File Size:</span>
                <span className="text-sm font-medium text-gray-900">
                  {content.size || "—"}
                </span>
              </div>

              {/* Duration */}
              {content.duration && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Duration:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {content.duration}
                  </span>
                </div>
              )}

              {/* Assigned Devices */}
              {content.assignedTo && content.assignedTo.length > 0 && (
                <div className="py-3 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                    <span className="text-sm text-gray-600">
                      Assigned Devices:
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {content.assignedTo.length}
                    </span>
                  </div>
                  <div className="space-y-1 mt-2 pl-0 sm:pl-4">
                    {content.assignedTo.map((device, index) => (
                      <div
                        key={index}
                        className="text-sm text-gray-700 flex items-center"
                      >
                        {index + 1}. {device}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Children for folders */}
              {content.children && content.children.length > 0 && (
                <div className="py-3">
                  <span className="text-sm text-gray-600 mb-2 block">
                    Files in Folder:
                  </span>
                  <div className="space-y-2 pl-0 sm:pl-4">
                    {content.children.map((child) => (
                      <div
                        key={child.id}
                        className="flex items-center justify-between text-sm text-gray-700"
                      >
                        <span>{child.title}</span>
                        <span className="text-gray-500">{child.size}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentDetails;
