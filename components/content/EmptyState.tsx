import React from "react";
import { Folder, ListMusic, FileVideo, CloudUpload } from "lucide-react";
import ContentButton from "@/common/ContentButton";

interface EmptyStateProps {
  contentFilter: string;
  searchQuery: string;
}

const EmptyState = ({ contentFilter, searchQuery }: EmptyStateProps) => {
  const getEmptyStateContent = () => {
    switch (contentFilter) {
      case "folders":
        return {
          icon: Folder,
          title: "No Folders Found",
          description: searchQuery 
            ? "Try adjusting your search criteria" 
            : "Create your first folder to organize your content"
        };
      case "playlists":
        return {
          icon: ListMusic,
          title: "No Playlists Found",
          description: searchQuery 
            ? "Try adjusting your search criteria" 
            : "Create your first playlist to organize your videos"
        };
      case "files":
        return {
          icon: FileVideo,
          title: "No Files Found",
          description: searchQuery 
            ? "Try adjusting your search criteria" 
            : "Upload your first file to get started"
        };
      default:
        return {
          icon: FileVideo,
          title: "No Content Found",
          description: searchQuery 
            ? "Try adjusting your search or filter criteria" 
            : "Upload content to get started"
        };
    }
  };

  const { icon: Icon, title, description } = getEmptyStateContent();

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-16 flex justify-center">
      <div className="flex flex-col items-center justify-center text-center max-w-md w-full">
        <Icon className="w-20 h-20 text-gray-900 stroke-[1.5] mb-6" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-8">{description}</p>
        <ContentButton icon={CloudUpload} title="Upload Content" />
      </div>
    </div>
  );
};

export default EmptyState;