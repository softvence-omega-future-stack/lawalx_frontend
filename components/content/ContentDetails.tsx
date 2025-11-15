"use client";

import {
  ArrowLeft,
  Edit2,
  UserPlus,
  Trash2,
  AudioLines,
  FolderOpen,
  ChevronRight,
  Image as ImageIcon,
} from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import BaseVideoPlayer from "@/common/BaseVideoPlayer";

interface ContentItem {
  id: string;
  title: string;
  type: "folder" | "playlist" | "video" | "image";
  size?: string;
  duration?: string;
  thumbnail?: string;
  video?: string;
  audio?: string;
  fileCount?: number;
  assignedTo?: string[];
  uploadedDate?: string;
  updatedAt?: string;
  children?: ContentItem[];
}

interface ContentDetailsProps {
  content: ContentItem;
}

const ContentDetails = ({ content }: ContentDetailsProps) => {
  const router = useRouter();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  // Toggle folder expansion
  const toggleFolder = (folderId: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  // Display file type label
  const getFileTypeDisplay = () => {
    switch (content.type) {
      case "video":
        return "Video (.MP4)";
      case "image":
        return "Image (.PNG/.JPG)";
      case "playlist":
        return "Audio Playlist";
      case "folder":
        return "Folder";
      default:
        return "File";
    }
  };

  // Get icon for child items
  const getChildIcon = (type: string) => {
    switch (type) {
      case "folder":
        return <FolderOpen className="w-5 h-5 text-blue-500" />;
      case "video":
        return <AudioLines className="w-5 h-5 text-purple-500" />;
      case "playlist":
        return <AudioLines className="w-5 h-5 text-green-500" />;
      case "image":
        return <ImageIcon className="w-5 h-5 text-orange-500" />;
      default:
        return <div className="w-5 h-5 bg-gray-400 rounded" />;
    }
  };

  // Render nested children recursively
  const renderChildren = (children: ContentItem[], level = 0) => {
    return (
      <div className={`space-y-2 ${level > 0 ? "ml-6 border-l-2 border-gray-200 pl-4" : ""}`}>
        {children.map((child) => (
          <div key={child.id} className="py-2">
            <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors group">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {child.type === "folder" && child.children && child.children.length > 0 ? (
                  <button
                    onClick={() => toggleFolder(child.id)}
                    className="shrink-0 hover:bg-gray-200 p-1 rounded transition-colors"
                  >
                    <ChevronRight
                      className={`w-4 h-4 text-gray-500 transition-transform ${expandedFolders.has(child.id) ? "rotate-90" : ""}`}
                    />
                  </button>
                ) : (
                  <div className="w-6" />
                )}
                <div className="shrink-0">{getChildIcon(child.type)}</div>
                <div className="flex-1 min-w-0">
                  <button
                    onClick={() => router.push(`/content/${child.id}`)}
                    className="text-sm font-medium text-gray-900 hover:text-blue-600 hover:underline truncate block text-left w-full"
                  >
                    {child.title}
                  </button>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                    <span>{child.size}</span>
                    {child.duration && <span>• {child.duration}</span>}
                  </div>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {child.type}
              </span>
            </div>
            {child.type === "folder" && child.children && child.children.length > 0 && expandedFolders.has(child.id) && renderChildren(child.children, level + 1)}
          </div>
        ))}
      </div>
    );
  };

  // Placeholder actions
  const onRename = () => console.log("Rename:", content.id);
  const onAssign = () => console.log("Assign:", content.id);
  const onDelete = () => console.log("Delete:", content.id);

  const isFolder = content.type === "folder";

  console.log(content);


  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="flex items-start gap-3">
          <button
            onClick={() => router.push("/content")}
            className="hover:bg-gray-100 rounded-xl transition-colors mt-1 p-1 cursor-pointer shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-900">
              {content.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              {isFolder
                ? `Folder containing ${content.fileCount || content.children?.length || 0} files`
                : "Professional content suitable for conference rooms and meeting areas"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
          <button onClick={onRename} className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors text-gray-700">
            <Edit2 className="w-4 h-4" /> Rename
          </button>
          <button onClick={onAssign} className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium transition-colors text-gray-700">
            <UserPlus className="w-4 h-4" /> Assign to
          </button>
          <button onClick={onDelete} className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-colors">
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </div>
      </div>

      {/* Main Content */}
      {isFolder ? (
        <div className="space-y-6">
          {/* Folder Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="shrink-0">
                <div className="bg-linear-to-br from-blue-50 to-indigo-50 p-8 rounded-xl flex flex-col items-center justify-center w-full md:w-48 h-48">
                  <FolderOpen className="w-20 h-20 text-blue-500 mb-3" />
                  <h3 className="text-base font-semibold text-gray-900">Folder</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {content.fileCount || content.children?.length || 0} files
                  </p>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Overview</h2>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-sm text-gray-600">Type:</span><span className="text-sm font-medium text-gray-900">Folder</span></div>
                  <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-sm text-gray-600">Total Size:</span><span className="text-sm font-medium text-gray-900">{content.size || "—"}</span></div>
                  <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-sm text-gray-600">Files:</span><span className="text-sm font-medium text-gray-900">{content.fileCount || content.children?.length || 0}</span></div>
                  {content.uploadedDate && <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-sm text-gray-600">Uploaded:</span><span className="text-sm font-medium text-gray-900">{content.uploadedDate}</span></div>}
                  {content.updatedAt && <div className="flex justify-between py-2 border-b border-gray-100"><span className="text-sm text-gray-600">Last Updated:</span><span className="text-sm font-medium text-gray-900">{content.updatedAt}</span></div>}
                  {content.assignedTo && content.assignedTo.length > 0 && (
                    <div className="py-2">
                      <div className="flex justify-between mb-2"><span className="text-sm text-gray-600">Assigned Devices:</span><span className="text-sm font-medium text-gray-900">{content.assignedTo.length}</span></div>
                      <div className="space-y-1 mt-2">{content.assignedTo.map((device, index) => (<div key={index} className="text-sm text-gray-700 bg-gray-50 px-3 py-1.5 rounded">{index + 1}. {device}</div>))}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Folder Contents */}
          {content.children && content.children.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Folder Contents ({content.children.length})</h2>
              <div className="bg-gray-50 rounded-lg p-4">{renderChildren(content.children)}</div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Preview</h2>

            {content.type === "video" && content.video ? (
  <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
    <BaseVideoPlayer
      src={content.video || ""}
      poster={content.thumbnail}
      autoPlay={false}
      rounded="rounded-lg"
    />
  </div>
) : content.type === "playlist" && content.audio ? (
  <div className="bg-linear-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
    <div className="flex flex-col items-center justify-center mb-6">
      <AudioLines className="w-24 h-24 text-blue-500 mb-4" />
      <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
        {content.title}
      </h3>
      <p className="text-sm text-gray-600">
        {content.size}
        {content.duration && ` • ${content.duration}`}
      </p>
    </div>
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <AudioPlayer
        src={content.audio}
        autoPlay={false}
        showJumpControls={false}
        customAdditionalControls={[]}
        layout="stacked"
      />
    </div>
  </div>
) : content.type === "image" && content.thumbnail ? (
  <div className="rounded-lg overflow-hidden">
    <Image
      src={content.thumbnail}
      alt={content.title}
      width={600}
      height={400}
      className="rounded-lg object-cover w-full"
    />
  </div>
) : (
  <div className="aspect-video flex items-center justify-center bg-gray-200 rounded-lg">
    <span className="text-gray-500">No Preview Available</span>
  </div>
)}

          </div>

          {/* Right Side */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 lg:p-6">
            <h2 className="text-base font-semibold text-gray-900 mb-6">Overview</h2>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">File Type:</span>
                <span className="text-sm font-medium text-gray-900">{getFileTypeDisplay()}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-100">
                <span className="text-sm text-gray-600">File Size:</span>
                <span className="text-sm font-medium text-gray-900">{content.size || "—"}</span>
              </div>
              {content.duration && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Duration:</span>
                  <span className="text-sm font-medium text-gray-900">{content.duration}</span>
                </div>
              )}
              {content.uploadedDate && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Uploaded:</span>
                  <span className="text-sm font-medium text-gray-900">{content.uploadedDate}</span>
                </div>
              )}
              {content.updatedAt && (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-3 border-b border-gray-100">
                  <span className="text-sm text-gray-600">Last Updated:</span>
                  <span className="text-sm font-medium text-gray-900">{content.updatedAt}</span>
                </div>
              )}
              {content.assignedTo && content.assignedTo.length > 0 && (
                <div className="py-3 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2">
                    <span className="text-sm text-gray-600">Assigned Devices:</span>
                    <span className="text-sm font-medium text-gray-900">{content.assignedTo.length}</span>
                  </div>
                  <div className="space-y-2 mt-3">
                    {content.assignedTo.map((device, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded-lg">
                        <span className="font-medium text-gray-500">{index + 1}.</span>
                        {device}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentDetails;