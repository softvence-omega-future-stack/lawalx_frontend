"use client";

import React, { useState } from "react";
import {
  Search,
  FileImage,
  FileVideo,
  FileText,
  Music,
  Download,
  Play,
  LayoutGrid,
  List as ListIcon,
  ChevronDown,
  Trash2,
  MoreVertical,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Dropdown from "@/components/shared/Dropdown";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- Types ---
type ContentType = "Video" | "Image" | "Audio" | "Document" | "Folder";
type ContentStatus = "Active" | "Archived" | "Inactive";

interface ContentItem {
  id: string;
  name: string;
  type: ContentType;
  size: string;
  duration?: string; // For audio/video
  uploadDate: string;
  assignedTo: string;
  status: ContentStatus;
  thumbnail?: string; // URL or placeholder
  url?: string; // For playback
}

// --- Demo Data ---
const storageData = [
  { name: "Free Space", value: 5.0, color: "#E0E7FF" }, // Indigo 100
  { name: "Audio", value: 7.5, color: "#C084FC" }, // Purple 400
  { name: "Image", value: 17.5, color: "#8B5CF6" }, // Violet 500
  { name: "Video", value: 20.0, color: "#6D28D9" }, // Violet 700
];

const statsData = [
  { label: "Total Videos", value: 123, total: 123 },
  { label: "Total Images", value: 123, total: 123 },
  { label: "Total Audios", value: 123, total: 123 },
  { label: "Total Screens", value: 123, total: 123 },
  { label: "Total Schedules", value: 123, total: 123 },
  { label: "Total Templates", value: 123, total: 123 },
];

const initialContentData: ContentItem[] = [
  {
    id: "1",
    name: "Video.MP4",
    type: "Video",
    size: "45 MB",
    duration: "120 sec",
    uploadDate: "December 15, 2024",
    assignedTo: "Main Lobby Display, Main Gate Entry",
    status: "Active",
    url: "https://www.w3schools.com/html/mov_bbb.mp4", // Demo Video
  },
  {
    id: "2",
    name: "Audio.mp3",
    type: "Audio",
    size: "45 MB",
    duration: "120 sec",
    uploadDate: "December 15, 2024",
    assignedTo: "Main Lobby Display, Main Gate Entry",
    status: "Active",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", // Demo Audio
  },
  {
    id: "3",
    name: "Image.png",
    type: "Image",
    size: "45 MB",
    duration: "120 sec",
    uploadDate: "December 15, 2024",
    assignedTo: "Main Lobby Display, Main Gate Entry",
    status: "Active",
  },
  {
    id: "4",
    name: "Video.MP4",
    type: "Video",
    size: "45 MB",
    duration: "120 sec",
    uploadDate: "December 15, 2024",
    assignedTo: "Main Lobby Display, Main Gate Entry",
    status: "Active",
    url: "https://www.w3schools.com/html/movie.mp4",
  },
  {
    id: "5",
    name: "Image.png",
    type: "Image",
    size: "45 MB",
    duration: "120 sec",
    uploadDate: "December 15, 2024",
    assignedTo: "Main Lobby Display, Main Gate Entry",
    status: "Active",
  },
  {
    id: "6",
    name: "Audio.mp3",
    type: "Audio",
    size: "45 MB",
    duration: "120 sec",
    uploadDate: "December 15, 2024",
    assignedTo: "Main Lobby Display, Main Gate Entry",
    status: "Active",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
];

// --- Sub-components ---

const StorageChart = () => {
  return (
    <div className="flex items-center gap-8">
      <div className="relative w-40 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={storageData}
              innerRadius={50}
              outerRadius={70}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              startAngle={90}
              endAngle={-270}
            >
              {storageData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <span className="text-gray-500 text-xs">Total</span>
          <span className="text-gray-900 dark:text-white font-bold text-lg">50GB</span>
        </div>
      </div>

      <div className="space-y-2">
        {storageData.map((item, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-600 dark:text-gray-300">
              {item.name} ({item.value} GB)
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-sm border border-gray-300 bg-white" />
             <span className="text-gray-600 dark:text-gray-300">
               Video (20.00GB)
             </span>
        </div>
      </div>
    </div>
  );
};

const MediaModal = ({
  isOpen,
  onClose,
  item,
}: {
  isOpen: boolean;
  onClose: () => void;
  item: ContentItem | null;
}) => {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{item.name}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl leading-none">&times;</button>
        </div>
        <div className="bg-black flex-1 flex items-center justify-center min-h-[300px] w-full">
          {item.type === "Video" && item.url && (
            <video controls autoPlay className="max-w-full w-full">
              <source src={item.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
           {item.type === "Audio" && item.url && (
             <div className="w-full max-w-md p-8 bg-gray-900 rounded-lg flex flex-col items-center gap-4">
                <Music className="w-16 h-16 text-white mb-4" />
                <audio controls autoPlay className="w-full">
                  <source src={item.url} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
             </div>
          )}
          {item.type === "Image" && (
             <div className="flex flex-col items-center text-white">
                <FileImage className="w-20 h-20 mb-4 text-gray-400" />
                <p>Image Preview (Placeholder)</p>
             </div>
          )}
           {(!item.url && (item.type === 'Video' || item.type === 'Audio')) && (
                <div className="text-white">No media source available for demo.</div>
           )}
        </div>
      </div>
    </div>
  );
};


// --- Main Component ---
export default function ContentTab() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortOrder, setSortOrder] = useState<"name" | "date" | "size">("name");
  const [filterType, setFilterType] = useState<ContentType | "All">("All");

  const [playingItem, setPlayingItem] = useState<ContentItem | null>(null);

  const filteredData = initialContentData
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => (filterType === "All" ? true : item.type === filterType))
    .sort((a, b) => {
        if (sortOrder === "name") return a.name.localeCompare(b.name);
        if (sortOrder === "date") return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        // Simple size sort (string comparision for now as size is a string "45 MB")
        if (sortOrder === "size") return a.size.localeCompare(b.size);
        return 0;
    });

  const handleDownload = (item: ContentItem) => {
    // Robust download handler
    const link = document.createElement('a');
    link.href = item.url || '#';
    link.download = item.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    if(!item.url) {
        // Fallback or visual feedback if no real URL
        console.log(`Simulated download for ${item.name}`);
    }
  };

  const handleDownloadAll = () => {
    alert("Downloading all content (feature pending backend)...");
  };

  const getTypeBadge = (type: ContentType) => {
     switch (type) {
      case "Video":
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">MP4</span>
      case "Audio":
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">MP3</span>
       case "Image":
        return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">PNG</span>
       default:
         return <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600">FILE</span>
     }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Top Section: Storage & Stats */}
      <div className="bg-navbarBg rounded-xl border border-border shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 border-b border-border p-4">
          Storage & Content
        </h3>
        
        <div className="flex flex-col lg:flex-row gap-12 p-4">
            {/* Chart Section */}
            <div className="flex-shrink-0 border-r border-border pr-12 lg:w-auto w-full flex justify-center lg:block">
                <StorageChart />
            </div>

            {/* Stats Grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-y-6 gap-x-12">
                {statsData.map((stat, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-border pb-2">
                         <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</span>
                         <span className="text-sm font-bold text-gray-900 dark:text-white">
                            {stat.value} <span className="text-gray-400 font-normal">/{stat.total}</span>
                         </span>
                    </div>
                ))}
            </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 p-4 border border-border rounded-xl bg-navbarBg">
            <div className="relative flex-1 max-w-2xl ">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search Files"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-navbarBg border border-border rounded-lg text-sm text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm placeholder:text-gray-400"
                />
            </div>
            <div className="flex gap-3">
                  {/* Sort Dropdown */}
                  <Dropdown
                    label="Sort by"
                    value={sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)}
                    options={["Name", "Date", "Size"]}
                    onChange={(val) => setSortOrder(val.toLowerCase() as any)}
                  />

                  {/* Filter Dropdown */}
                  <Dropdown
                    value={filterType === 'All' ? 'All Content' : filterType}
                    options={["All Content", "Video", "Audio", "Image"]}
                    onChange={(val) => setFilterType(val === 'All Content' ? 'All' : val as any)}
                  />

                 {/* View Toggle */}
                 <div className="flex bg-navbarBg rounded-lg p-1 border border-border">
                     <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 text-primary-action shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                     >
                        <LayoutGrid className="w-4 h-4" />
                     </button>
                     <button 
                         onClick={() => setViewMode('list')}
                         className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 text-primary-action shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                     >
                        <ListIcon className="w-4 h-4" />
                     </button>
                 </div>
            </div>
         </div>

      {/* Bottom Section: Content List */}
      <div className="bg-navbarBg rounded-xl border border-border shadow-sm min-h-[500px]">
         {/* Header */}
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border p-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Content ({filteredData.length})
            </h3>
            <button 
                onClick={handleDownloadAll}
                className="px-4 shadow-customShadow py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600 flex items-center gap-2 transition-colors cursor-pointer"
            >
                Download All
            </button>
         </div>

         {/* Content View */}
         {viewMode === 'list' ? (
             <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-border">
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">File Type</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Uploaded Date</th>
                            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assigned To</th>
                            <th className="px-6 py-3 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filteredData.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-start gap-3">
                                        <div className={`
                                            w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                                            ${item.type === 'Video' || item.type === 'Image' ? 'bg-cover bg-center' : 'bg-gray-100 dark:bg-gray-700'}
                                        `}>
                                            {item.type === 'Image' ? (
                                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-500">
                                                    <FileImage className="w-5 h-5" />
                                                </div>
                                            ) : item.type === 'Video' ? (
                                                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-500">
                                                    <FileVideo className="w-5 h-5" />
                                                </div>
                                            ) : item.type === 'Audio' ? (
                                                <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center text-pink-500">
                                                    <Music className="w-5 h-5" />
                                                </div>
                                            ) : (
                                                <FileText className="w-5 h-5 text-gray-400" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors cursor-pointer" onClick={() => setPlayingItem(item)}>
                                                {item.name}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-0.5">
                                                {item.size} • {item.duration}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {getTypeBadge(item.type)}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                                    {item.uploadDate}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 max-w-[200px]">
                                        {item.assignedTo}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button 
                                            onClick={() => setPlayingItem(item)}
                                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-all cursor-pointer"
                                            title="Play"
                                        >
                                            <Play className="w-4 h-4 fill-current" />
                                        </button>
                                        <button 
                                            onClick={() => handleDownload(item)}
                                            className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all cursor-pointer"
                                            title="Download"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
         ) : (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 bg-navbarBg p-4 rounded-xl">
                {filteredData.map((item) => (
                    <div key={item.id} className="group relative bg-navbarBg rounded-xl p-4 border border-border hover:border-blue-200 dark:hover:border-blue-800 transition-all hover:shadow-md cursor-pointer" onClick={() => setPlayingItem(item)}>
                        <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-3 flex items-center justify-center relative overflow-hidden">
                             {item.type === 'Image' ? (
                                 <FileImage className="w-12 h-12 text-blue-400" />
                             ) : item.type === 'Video' ? (
                                  <FileVideo className="w-12 h-12 text-purple-400" />
                             ) : item.type === 'Audio' ? (
                                  <Music className="w-12 h-12 text-pink-400" />
                             ) : (
                                  <FileText className="w-12 h-12 text-gray-400" />
                             )}
                             
                             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                <button 
                                    onClick={(e) => { e.stopPropagation(); setPlayingItem(item); }}
                                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/40 transition-colors"
                                >
                                    <Play className="w-5 h-5 fill-current" />
                                </button>
                             </div>
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white truncate" title={item.name}>{item.name}</h4>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">{item.size}</span>
                            <span className="text-xs text-gray-400">{item.uploadDate}</span>
                        </div>
                        
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <button onClick={(e) => e.stopPropagation()} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                                        <MoreVertical className="w-4 h-4 text-gray-500" />
                                    </button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDownload(item); }}>
                                        <Download className="w-4 h-4 mr-2" /> Download
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>
                                        <Trash2 className="w-4 h-4 mr-2" /> Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                             </DropdownMenu>
                        </div>
                    </div>
                ))}
             </div>
         )}
         
         {filteredData.length === 0 && (
             <div className="text-center py-12 text-gray-500">
                 No content found matching &quot;{searchTerm}&quot;
             </div>
         )}
      </div>
      
      {/* Media Modal */}
      <MediaModal 
        isOpen={!!playingItem} 
        onClose={() => setPlayingItem(null)} 
        item={playingItem} 
      />

    </div>
  );
}