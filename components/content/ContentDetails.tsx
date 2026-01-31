// components/content/ContentDetails.tsx
"use client";

import {
  ArrowLeft,
  Trash2,
  AudioLines,
  Image as ImageIcon,
  PencilLine,
  Search,
  Grid2X2,
  List,
  ChevronDown,
  Plus,
  CloudUpload,
  Loader2,
} from "lucide-react";
import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import BaseVideoPlayer from "@/common/BaseVideoPlayer";
import BaseSelect from "@/common/BaseSelect";
import ContentGrid from "./ContentGrid";
import RenameDialog from "./RenameDialog";
import AssignToDialog from "./AssignToDialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortByName, allContent } from "./MyContent";
import { useUploadFileMutation } from "@/redux/api/users/content/content.api";
import { toast } from "sonner";

export interface ContentItem {
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
  assignedDevices?: string[];
  assignedPlaylists?: string[];
  schedules?: string[];
  uploadedDate?: string;
  updatedAt?: string;
  fileExtension?: "mp4" | "mp3" | "jpg" | "png" | "folder" | string;
  children?: ContentItem[];
}

interface ContentDetailsProps {
  content: ContentItem;
}

const ContentDetails = ({ content }: ContentDetailsProps) => {
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [contentFilter, setContentFilter] = useState("all-content");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [openRename, setOpenRename] = useState(false);
  const [openAssign, setOpenAssign] = useState(false);

  const isFolder = content.type === "folder";

  // Filter children if it's a folder
  const filteredChildren = (content.children || [])
    .filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
      let matchesType = true;

      if (contentFilter === "folders") matchesType = item.type === "folder";
      else if (contentFilter === "playlists") matchesType = item.type === "playlist";
      else if (contentFilter === "files")
        matchesType = item.type === "video" || item.type === "image";

      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortOption === "a-z") return a.title.localeCompare(b.title);
      if (sortOption === "z-a") return b.title.localeCompare(a.title);
      return 0;
    });

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

  // UPLOAD HANDLER
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    if (isLoading) return; // prevent opening picker while uploading
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Build FormData
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append("file", files[i]);
    }

    // If we are inside a folder, tell backend to attach files to that parent
    if (isFolder && content.id) {
      formData.append("parentId", content.id);
    }

    try {
      const res = await uploadFile(formData).unwrap();
      // console.log(res);

      toast.success(res?.message || "File(s) uploaded successfully");
      // reset file input so same file can be re-selected later
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err: any) {
      console.error("Upload failed:", err);
      toast.error(err?.data?.message || "Upload failed. Please try again.");
    }
  };

  return (
    <div className="">
      {/* Hidden file input for Upload */}
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />

      {openRename && (
        <RenameDialog
          open={openRename}
          setOpen={setOpenRename}
          itemName={content.title}
          itemType={content.type}
          onRename={(newName) => console.log("Rename:", newName)}
        />
      )}

      {openAssign && (
        <AssignToDialog
          open={openAssign}
          setOpen={setOpenAssign}
          onAssign={(ids) => console.log("Assigned to screens:", ids)}
        />
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/content")}
            className="p-2 border border-border hover:border-bgBlue rounded-lg shadow-customShadow transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 text-headings" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-headings leading-tight">
              {content.title}
            </h1>
            <p className="text-sm font-medium text-textGray uppercase tracking-wide">
              {content.type}
            </p>
          </div>
        </div>

        {isFolder && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpenRename(true)}
              className="group flex items-center gap-2 px-6 py-2.5 border border-[#3CA9F3] text-[#3CA9F3] rounded-lg text-base font-semibold transition-all hover:bg-[#3CA9F3] hover:text-white shadow-customShadow bg-white cursor-pointer outline-none"
            >
              <PencilLine className="w-5 h-5 transition-colors group-hover:text-white" /> Rename
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-6 py-2.5 border border-border text-headings rounded-lg text-base font-semibold transition-all hover:bg-gray-50 shadow-customShadow bg-white cursor-pointer outline-none">
                  <Plus className="w-5 h-5 text-bgBlue" /> Add <ChevronDown className="w-4 h-4 ml-1" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg p-1 z-50">
                <DropdownMenuItem
                  onClick={() => console.log("Add Existing")}
                  className="group flex items-center gap-3 px-4 py-3 text-sm text-headings hover:bg-bgBlue hover:text-white transition-colors cursor-pointer rounded-lg focus:bg-bgBlue focus:text-white outline-none"
                >
                  <Plus className="w-5 h-5 text-bgBlue group-hover:text-white group-focus:text-white transition-colors" /> Add Existing
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleUploadClick}
                  disabled={isLoading}
                  className={`group flex items-center gap-3 px-4 py-3 text-sm text-headings border-t border-border transition-colors cursor-pointer rounded-lg focus:bg-bgBlue focus:text-white outline-none ${isLoading ? "opacity-60 pointer-events-none" : "hover:bg-bgBlue hover:text-white"}`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-bgBlue" />
                      <span>Uploading</span>
                    </div>
                  ) : (
                    <>
                      <CloudUpload className="w-5 h-5 text-bgBlue group-hover:text-white group-focus:text-white transition-colors " /> Upload
                    </>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <button className="flex items-center gap-2 px-6 py-2.5 bg-[#F94D4D] text-white rounded-lg text-base font-semibold transition-all hover:bg-[#e04444] shadow-customShadow cursor-pointer">
              <Trash2 className="w-5 h-5" /> Remove
            </button>
          </div>
        )}

        {!isFolder && (
          <button onClick={() => setOpenAssign(true)} className="flex items-center gap-2 px-4 py-2 sm:py-3 border border-border rounded-lg text-sm sm:text-base font-medium text-headings cursor-pointer shadow-customShadow">
            <Plus className="w-5 h-5 text-headings" /> Assign To
          </button>
        )}
      </div>

      {/* Main Content */}
      {isFolder ? (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-navbarBg border border-border rounded-xl p-4 w-full">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search Files"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 md:py-3 bg-input dark:bg-gray-800 border border-border dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-slate-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              {/* Sorting & Filters */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
                <div className="w-full sm:w-[155px]">
                  <BaseSelect
                    value={sortOption}
                    onChange={setSortOption}
                    options={sortByName}
                    placeholder="Sort by name"
                    showLabel={false}
                  />
                </div>

                <div className="w-full sm:w-[155px]">
                  <BaseSelect
                    value={contentFilter}
                    onChange={setContentFilter}
                    options={allContent}
                    placeholder="All Content"
                    icon={<Plus size={18} />}
                    showLabel={false}
                  />
                </div>

                {/* GRID / LIST */}
                <div className="w-[100px] flex gap-2 items-center bg-bgGray dark:bg-gray-800 p-1.5 rounded-lg">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex-1 flex items-center justify-center p-2 rounded-md transition shadow-customShadow cursor-pointer ${viewMode === "grid" ? "bg-white dark:bg-gray-700" : ""}`}
                  >
                    <Grid2X2
                      className={`w-5 h-5 ${viewMode === "grid" ? "text-bgBlue" : "text-textGray dark:text-gray-400"}`}
                    />
                  </button>

                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex-1 flex items-center justify-center p-2 rounded-md transition shadow-customShadow cursor-pointer ${viewMode === "list" ? "bg-white dark:bg-gray-700" : ""}`}
                  >
                    <List
                      className={`w-5 h-5 ${viewMode === "list" ? "text-bgBlue" : "text-textGray dark:text-gray-400"}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Folder Contents */}
          <div className={viewMode === "list" ? "bg-navbarBg rounded-xl border border-border overflow-hidden" : ""}>
            {viewMode === "list" && (
              <div className="hidden md:flex items-center justify-between px-4 py-4 border-b border-border bg-[#F9FAFB] dark:bg-gray-800/50 md:gap-12">
                <div className="w-[30%] text-xs font-bold text-textGray uppercase tracking-widest">File Name</div>
                <div className="w-[15%] text-xs font-bold text-textGray uppercase tracking-widest">File Type</div>
                <div className="w-[25%] text-xs font-bold text-textGray uppercase tracking-widest">Assigned To</div>
                <div className="w-[20%] text-xs font-bold text-textGray uppercase tracking-widest">Uploaded</div>
                <div className="w-[10%] text-xs font-bold text-textGray uppercase tracking-widest text-right">Actions</div>
              </div>
            )}
            <ContentGrid
              items={filteredChildren.map(child => ({ ...child, size: child.size || "" })) as any}
              viewMode={viewMode}
              onItemSelect={(id: string) => router.push(`/content/${id}`)}
              onItemMenuClick={(id: string, action: string) => console.log("Menu:", id, action)}
              onAssignClick={(id: string) => console.log("Assign:", id)}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side: Preview */}
          <div className="bg-navbarBg rounded-xl md:rounded-[12px] h-fit border border-border p-4 md:p-6">
            <h2 className="text-lg md:text-2xl font-semibold text-headings mb-4">Preview</h2>

            {content.type === "video" && content.video ? (
              <div className="w-full relative rounded-lg overflow-hidden">
                <BaseVideoPlayer
                  src={content.video || ""}
                  poster={content.thumbnail}
                  autoPlay={false}
                  rounded=""
                />
              </div>
            ) : content.type === "playlist" && content.audio ? (
              <div className="bg-linear-to-br from-blue-50 to-purple-50 p-6 rounded-xl">
                <div className="flex flex-col items-center justify-center mb-6 bg-navbarBg p-4 rounded-xl">
                  <AudioLines className="w-24 h-24 text-headings mb-4" />
                  <h3 className="text-lg font-semibold text-headings mb-2 text-center">
                    {content.title}
                  </h3>
                  <p className="text-sm text-muted">
                    {content.size}
                    {content.duration && ` • ${content.duration}`}
                  </p>
                </div>
                <div className="bg-navbarBg rounded-lg p-4 shadow-sm">
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

          {/* Right Side: Overview */}
          <div className="bg-navbarBg rounded-xl border h-fit border-border p-4 sm:p-6">
            <h2 className="text-lg md:text-2xl font-semibold text-headings">Overview</h2>

            <div className="space-y-0">
              {/* File Type */}
              <div className="flex items-center justify-between py-4 border-b border-border">
                <span className="text-sm md:text-base text-textGray">File Type:</span>
                <span className="px-3 py-1 text-body text-xs md:text-sm rounded shadow-customShadow">
                  {getFileTypeDisplay()}
                </span>
              </div>

              {/* File Size */}
              <div className="flex items-center justify-between py-4 border-b border-border">
                <span className="text-sm md:text-base text-muted">File Size:</span>
                <span className="text-muted text-xs md:text-sm">{content.size}</span>
              </div>

              {/* Duration */}
              {content.duration && (
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <span className="text-sm md:text-base text-muted">Duration:</span>
                  <span className="text-muted text-xs md:text-sm">{content.duration}</span>
                </div>
              )}

              {/* Total Assigned Devices */}
              <div className="py-4 border-b border-border">
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <div className="flex flex-row sm:flex-col sm:space-y-2 mb-3 sm:mb-0 gap-2 sm:gap-0 items-center sm:items-start">
                    <span className="text-sm md:text-base text-headings">Total Assigned Devices:</span>
                    <span className="text-Heading text-base md:text-lg font-medium">{content.assignedDevices?.length || 0}</span>
                  </div>
                  <div className="space-y-2">
                    {(content.assignedDevices || []).map((device, index) => (
                      <div key={index} className="text-muted text-xs md:text-sm">
                        <span className="font-medium">{index + 1}.</span> {device}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total Assigned Playlists */}
              <div className="py-4 border-b border-border">
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <div className="flex flex-row sm:flex-col sm:space-y-2 mb-3 sm:mb-0 gap-2 sm:gap-0 items-center sm:items-start">
                    <span className="text-sm md:text-base text-headings">Total Assigned Playlists:</span>
                    <span className="text-Heading text-base md:text-lg font-medium">{content.assignedPlaylists?.length || 0}</span>
                  </div>

                  <div className="space-y-2">
                    {(content.assignedPlaylists || []).map((playlist, index) => (
                      <div key={index} className="text-muted text-xs md:text-sm">
                        <span className="font-medium">{index + 1}.</span> {playlist}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Schedules */}
              <div className="pt-4">
                <div className="flex flex-col sm:flex-row items-start justify-between">
                  <div className="flex flex-row sm:flex-col sm:space-y-2 mb-3 sm:mb-0 gap-2 sm:gap-0 items-center sm:items-start">
                    <span className="text-sm md:text-base text-headings">Schedules:</span>
                    <span className="text-Heading text-base md:text-lg font-medium">{content.schedules?.length || 0}</span>
                  </div>
                  <div className="space-y-2">
                    {(content.schedules || []).map((schedule, index) => (
                      <div key={index} className="text-muted text-xs md:text-sm">
                        <span className="">{index + 1}.</span> {schedule}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentDetails;
