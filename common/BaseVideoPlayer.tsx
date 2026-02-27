// eslint-disable-next-line @typescript-eslint/no-explicit-any
"use client";

import React, { useRef, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "plyr-react/plyr.css";
import type { APITypes } from "plyr-react";

// Client-only load
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  rounded?: string;
  onEnded?: () => void;
}

const BaseVideoPlayer = ({
  src,
  poster,
  autoPlay = false,
  rounded = "rounded-xl",
  onEnded,
}: VideoPlayerProps) => {
  const playerRef = useRef<APITypes>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let timer: NodeJS.Timeout;
    let checkCount = 0;
    const maxChecks = 20; // 2 seconds max

    const initPlayer = () => {
      const instance = playerRef.current?.plyr;

      if (instance && typeof instance.on === "function") {
        const handleEnded = () => {
          if (onEnded) onEnded();
        };

        instance.on("ended", handleEnded);

        if (autoPlay) {
          setTimeout(() => {
            const playResult = instance.play?.();
            if (playResult instanceof Promise) {
              playResult.catch(() => {
                console.warn("Autoplay blocked by browser");
              });
            }
          }, 200);
        }

        return () => {
          if (typeof instance.off === "function") {
            instance.off("ended", handleEnded);
          }
          if (typeof instance.pause === "function") {
            instance.pause();
          }
        };
      } else if (checkCount < maxChecks) {
        checkCount++;
        timer = setTimeout(initPlayer, 100);
      }
    };

    const cleanup = initPlayer();

    return () => {
      if (timer) clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, [src, autoPlay, onEnded, isMounted]);

  // Source configuration
  const getSource = () => {
    const isYouTube = src.includes("youtube.com") || src.includes("youtu.be");

    if (isYouTube) {
      return {
        type: "video",
        poster: poster || "",
        sources: [
          {
            src,
            provider: "youtube",
          },
        ],
      } as any; // TypeScript-safe
    }

    // Local MP4 or public folder
    // Check if it's an absolute URL
    const isAbsolute = src.startsWith("http://") || src.startsWith("https://");
    const safeSrc = isAbsolute ? src : (src.startsWith("/") ? src : "/" + src);

    return {
      type: "video",
      poster: poster || "",
      sources: [
        {
          src: safeSrc,
          type: "video/mp4",
        },
      ],
    } as any; // TypeScript-safe
  };

  return (
    <div className={`relative w-full pt-[56.25%] ${rounded} bg-black overflow-hidden`}>
      <div className="absolute inset-0">
        {isMounted ? (
          <Plyr
            ref={playerRef}
            source={getSource()}
            options={{
              controls: [
                "play",
                "progress",
                "current-time",
                "duration",
                "mute",
                "volume",
                "settings",
                "fullscreen",
              ],
            }}
          />
        ) : (
          <div className="w-full h-full bg-black" />
        )}
      </div>
    </div>
  );
};

export default BaseVideoPlayer;












// "use client";

// import React, { useRef, useEffect } from "react";
// import dynamic from "next/dynamic";
// import "plyr-react/plyr.css";
// import type { APITypes } from "plyr-react";

// // Load Plyr client-only
// const Plyr = dynamic(() => import("plyr-react"), { ssr: false });

// interface VideoPlayerProps {
//   src: string;
//   poster?: string;
//   autoPlay?: boolean;
//   rounded?: string;
// }

// const BaseVideoPlayer = ({
//   src,
//   poster,
//   autoPlay = false,
//   rounded = "rounded-xl",
// }: VideoPlayerProps) => {
//   const playerRef = useRef<APITypes>(null);

//   useEffect(() => {
//     const instance = playerRef.current?.plyr;
//     if (!instance) return;

//     let timer: NodeJS.Timeout;

//     if (autoPlay) {
//       timer = setTimeout(() => {
//         const playResult = instance.play?.();
//         if (playResult instanceof Promise) {
//           playResult.catch(() => console.warn("Autoplay blocked by browser"));
//         }
//       }, 300);
//     }

//     return () => {
//       if (timer) clearTimeout(timer);
//       instance.pause?.();
//     };
//   }, [src, autoPlay]);

//   return (
//     <div className={`bg-black overflow-hidden ${rounded}`}>
//       <Plyr
//         ref={playerRef}
//         source={{
//           type: "video",
//           poster: poster,
//           sources: [
//             {
//               src: src,
//               type: "video/mp4",
//             },
//           ],
//         }}
//       />
//     </div>
//   );
// };

// export default BaseVideoPlayer;
