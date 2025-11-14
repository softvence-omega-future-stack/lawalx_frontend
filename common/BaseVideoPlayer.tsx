"use client";

import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import "plyr-react/plyr.css";

import type { APITypes, PlyrSource } from "plyr-react";

// SSR-safe dynamic import
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  rounded?: string;
}

const BaseVideoPlayer = ({
  src,
  poster,
  autoPlay = false,  // default false
  rounded = "rounded-xl",
}: VideoPlayerProps) => {
  const playerRef = useRef<APITypes>(null);

  const plyrSource: PlyrSource = {
    type: "video",
    sources: [
      {
        src,
        type: "video/mp4",
      },
    ],
    poster,
  };

  useEffect(() => {
    const plyrInstance = playerRef.current?.plyr;
    if (!plyrInstance) return;

    let timeout: NodeJS.Timeout;

    if (autoPlay) {
      timeout = setTimeout(() => {
        const playResult = plyrInstance.play?.();
        if (playResult instanceof Promise) {
          playResult.catch(() => console.warn("Autoplay prevented by browser"));
        }
      }, 300);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
      plyrInstance.pause?.();
    };
  }, [src, autoPlay]);

  return (
    <div className={`bg-black overflow-hidden ${rounded}`}>
      <Plyr ref={playerRef} source={plyrSource} />
    </div>
  );
};

export default BaseVideoPlayer;
