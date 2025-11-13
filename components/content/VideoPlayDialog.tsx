"use client";

import { useEffect, useRef, useState } from "react";
import { ContentItem } from "./MyContent";
import BaseDialog from "@/common/BaseDialog";

// Icons (you'll need to install these or replace with your own)
const Play = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z"/>
  </svg>
);

const Pause = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
  </svg>
);

const Fullscreen = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
  </svg>
);

interface VideoPlayDialogProps {
  item: ContentItem;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const VideoPlayDialog = ({ item, open, setOpen }: VideoPlayDialogProps) => {
  // Video state
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  console.log("all item data show here ",item);
  

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
  }, [item.video]); // Fixed: use item.video instead of screen?.video

  // Reset when src changes
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
      setProgress(0);
    }
  }, [item.video]); // Fixed: use item.video instead of screen?.video

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
    if (!video || !video.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPos = e.clientX - rect.left;
    const newTime = (clickPos / rect.width) * video.duration;
    video.currentTime = newTime;
  };

  return (
    <BaseDialog
      open={open}
      setOpen={setOpen}
      title={item.title}
      description="Watch the video"
      maxWidth="4xl"
      maxHeight="xl"
    >
      <div className="bg-white border border-borderGray p-4 sm:p-6 rounded-xl overflow-hidden">
        <div className="relative rounded-lg overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={item.video}
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
                className="h-full rounded-full bg-blue-500"
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
    </BaseDialog>
  );
};

export default VideoPlayDialog;