"use client";

import React, { useState, useMemo } from "react";
import { Search, ChevronDown, Play, X } from "lucide-react";
import Image from "next/image";

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
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const videoData: Video[] = useMemo(
    () => [
      {
        id: "v1",
        category: "Getting Started",
        title: "How to Add Your First Device",
        description:
          "Complete step-by-step guide to connect your first screen in under 5 minutes.",
        thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      },
      {
        id: "v2",
        category: "Getting Started",
        title: "Creating Your First Screen",
        description:
          "Learn how to create and name screens for 101 – perfect for beginners.",
        thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
      },
      {
        id: "v3",
        category: "Device Management",
        title: "Remote Reboot & Control",
        description:
          "Control any device from anywhere – reboot, update, or turn off instantly.",
        thumbnail: "https://img.youtube.com/vi/kXYiU_JCYtU/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/kXYiU_JCYtU",
      },
      {
        id: "v4",
        category: "Device Management",
        title: "Monitor Device Health & Storage",
        description:
          "Keep track of storage, uptime, and performance across all your screens.",
        thumbnail: "https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/jNQXAC9IVRw",
      },
      {
        id: "v5",
        category: "Content & Playlists",
        title: "Upload & Organize Content",
        description:
          "Best practices for uploading videos, images, and creating playlists.",
        thumbnail: "https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/M7lc1UVf-VE",
      },
      {
        id: "v6",
        category: "Content & Playlists",
        title: "Advanced Scheduling Tips",
        description:
          "Master daily, weekly, and conditional scheduling for maximum impact.",
        thumbnail: "https://img.youtube.com/vi/p7HKvqRI_Bo/maxresdefault.jpg",
        videoUrl: "https://www.youtube.com/embed/p7HKvqRI_Bo",
      },
    ],
    []
  );

  const categories = [
    "All Categories",
    ...Array.from(new Set(videoData.map((video) => video.category))),
  ];

  const filteredVideos = useMemo(() => {
    let filtered = videoData;

    if (selectedCategory !== "All Categories") {
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
    <div className="min-h-screen">
      <div className="">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
            Video Tutorials
          </h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Find answers and inspiration on all things tape.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Content"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 border border-border bg-navbarBg rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>

          <div className="relative w-full sm:w-56">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full px-4 py-2.5 sm:py-3 border border-border bg-navbarBg rounded-lg text-left flex items-center justify-between hover:border-border transition-colors text-sm sm:text-base"
            >
              <span className="text-gray-700 dark:text-gray-300 truncate">
                {selectedCategory}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform shrink-0 ml-2 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute top-full left-0 right-0 mt-2 bg-navbarBg border border-border rounded-lg shadow-lg z-20 max-h-64 overflow-y-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelectedCategory(category);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm sm:text-base ${
                        selectedCategory === category
                          ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              onClick={() => openVideoModal(video)}
              className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl dark:hover:shadow-2xl transition-all cursor-pointer group bg-white dark:bg-gray-900"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-black">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 dark:group-hover:bg-black/50 transition-all flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                    <Play
                      className="w-9 h-9 text-gray-900 dark:text-white ml-1"
                      fill="currentColor"
                    />
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="p-5">
                <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg line-clamp-2">
                  {video.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
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
