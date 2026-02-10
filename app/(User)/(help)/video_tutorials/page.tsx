"use client";

import { useState, useMemo } from "react";
import { Play, X } from "lucide-react";
import Image from "next/image";
import HelpCenterHeader from '@/components/help/HelpCenterHeader';
import CategoryTabs from '@/components/help/CategoryTabs';

interface Video {
  id: string;
  category: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
}

const VideoTutorials = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const categories = [
    "All",
    "Device Management",
    "Content & Playlists",
    "Schedule",
    "Billing & Subscriptions"
  ];

  const videoData: Video[] = useMemo(
    () => [
      {
        id: "v1",
        category: "Device Management",
        title: "Tutorial 1",
        description: "You will learn how to add a new device",
        thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: "v2",
        category: "Device Management",
        title: "Tutorial 1",
        description: "You will learn how to add a new device",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
      },
      {
        id: "v3",
        category: "Content & Playlists",
        title: "Tutorial 1",
        description: "You will learn how to add a new device",
        thumbnail: "https://images.unsplash.com/photo-1549488352-3083d2762e67?q=80&w=800&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
      },
      {
        id: "v4",
        category: "Schedule",
        title: "Tutorial 1",
        description: "You will learn how to add a new device",
        thumbnail: "https://images.unsplash.com/photo-1596704017382-3053790d1c97?q=80&w=800&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
      },
      {
        id: "v5",
        category: "Billing & Subscriptions",
        title: "Tutorial 1",
        description: "You will learn how to add a new device",
        thumbnail: "https://images.unsplash.com/photo-1496307667263-eb4471aad150?q=80&w=800&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/embed/p7HKvqRI_Bo",
      },
      {
        id: "v6",
        category: "Content & Playlists",
        title: "Tutorial 1",
        description: "You will learn how to add a new device",
        thumbnail: "https://images.unsplash.com/photo-1517433456452-f96cb9365b72?q=80&w=800&auto=format&fit=crop",
        videoUrl: "https://www.youtube.com/embed/kXYiU_JCYtU",
      },
    ],
    []
  );

  const filteredVideos = useMemo(() => {
    let filtered = videoData;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (video) => video.category === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (video) =>
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory, videoData]); // fixed

  const openVideoModal = (video: Video) => {
    setSelectedVideo(video);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    document.body.style.overflow = "unset";
  };

  return (
    <div className="min-h-screen w-full max-w-[1920px] mx-auto pb-12">

      <HelpCenterHeader
        title="Video Tutorials"
        description="Find answers and inspiration on all things tape."
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="px-4 sm:px-6 lg:px-8 mb-8">
        <CategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => openVideoModal(video)}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/80 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 ml-1 fill-current" />
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-4 sm:p-5">
                <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg mb-1">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 dark:bg-white/50 animate-fadeIn">
            <div className="absolute inset-0" onClick={closeVideoModal} />
            <div className="relative w-full max-w-5xl bg-navbarBg rounded-xl overflow-hidden shadow-2xl animate-scaleIn">
              <button
                onClick={closeVideoModal}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black dark:bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full flex items-center justify-center transition-all"
              >
                <X className="w-6 h-6 text-white dark:text-black" />
              </button>

              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  src={`${selectedVideo.videoUrl}?autoplay=1`}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>

              <div className="p-6 bg-gray-900">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {selectedVideo.title}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base">
                  {selectedVideo.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default VideoTutorials;
