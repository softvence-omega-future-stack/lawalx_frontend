"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import BaseVideoPlayer from "@/common/BaseVideoPlayer";
import { ContentItem } from "./MyContent";
import { X } from "lucide-react";

interface VideoPlayDialogProps {
  item: ContentItem;
  open: boolean;
  setOpen: (open: boolean) => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const VideoPlayDialog = ({ item, open, setOpen }: VideoPlayDialogProps) => {
  // Extract video filename from URL
  const getVideoFileName = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const fileName = pathname.split('/').pop() || url;
      return decodeURIComponent(fileName);
    } catch {
      return url;
    }
  };

  return (
    <AnimatePresence>
      {open && (
        // Backdrop
        <motion.div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center max-[767px]:px-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setOpen(false)}
        >
          {/* Stop click from closing modal when clicking inside */}
          <motion.div
            className="bg-white rounded-xl overflow-hidden max-w-4xl w-full relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with video name and close button */}
            <div className="bg-black px-4 py-4 flex items-center justify-between">
              <h3 className="text-white text-sm md:text-base font-medium truncate pr-8">
                {item.video ? getVideoFileName(item.video) : 'Video'}
              </h3>
              <button
                className="absolute top-3 right-3 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center transition cursor-pointer hover:bg-red-500"
                onClick={() => setOpen(false)}
              >
                <X/>
              </button>
            </div>

            {/* Modal content */}
            <div className="p-4 sm:p-6 shadow-2xl">
              <BaseVideoPlayer
                src={item.video ?? ""}
                poster={item.thumbnail}
                autoPlay={open}
                rounded="rounded-lg"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoPlayDialog;