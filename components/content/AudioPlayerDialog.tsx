"use client";

import { motion, AnimatePresence } from "framer-motion";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { ContentItem } from "@/types/content";
import { X } from "lucide-react";

interface AudioPlayerDialogProps {
  item: ContentItem; // item.audio should hold the audio URL
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

const AudioPlayerDialog = ({ item, open, setOpen }: AudioPlayerDialogProps) => {
  // Extract audio filename from URL
  const getAudioFileName = (url: string) => {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const fileName = pathname.split("/").pop() || url;
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
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => setOpen(false)}
        >
          {/* Stop click from closing modal when clicking inside */}
          <motion.div
            className="bg-white rounded-xl overflow-hidden max-w-md w-full relative"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with audio name and close button */}
            <div className="bg-gray-900 px-4 py-4 flex items-center justify-between">
              <h3 className="text-white text-sm md:text-base font-medium truncate pr-8">
                {item.audio ? getAudioFileName(item.audio) : "Audio"}
              </h3>
              <button
                className="absolute top-3 right-3 text-white bg-black/50 rounded-full w-8 h-8 flex items-center justify-center transition cursor-pointer hover:bg-red-500"
                onClick={() => setOpen(false)}
              >
                <X />
              </button>
            </div>

            {/* Modal content */}
            <div className="p-4 sm:p-6 mt-1 shadow-2xl">
              {item.audio && (
                <AudioPlayer
                  src={item.audio}
                  autoPlay={false}
                  showJumpControls={false}
                  customAdditionalControls={[]}
                  layout="stacked"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AudioPlayerDialog;
