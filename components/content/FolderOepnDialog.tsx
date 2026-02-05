"use client";

import { useState } from "react";
import { Search, Folder } from "lucide-react";
import BaseDialog from "@/common/BaseDialog";
import ContentButton from "@/common/ContentButton";

interface ContentItem {
  id: string;
  title: string;
  audio?: string;
}

interface FolderDialogProps {
  item: ContentItem;
  openFolder: boolean;
  setOpenFolder: (open: boolean) => void;
}

interface Folder {
  id: string;
  name: string;
}

const FolderOpenDialog = ({ item, openFolder, setOpenFolder }: FolderDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  // Mock folder data
  const folders: Folder[] = [
    { id: "1", name: "Work Projects" },
    { id: "2", name: "Personal" },
    { id: "3", name: "Archive" },
    { id: "4", name: "Favorites" },
    { id: "5", name: "Client Work" },
  ];

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMoveToFolder = () => {
    if (selectedFolder) {
      console.log(`Moving item ${item.id} to folder ${selectedFolder}`);
      setOpenFolder(false);
      setSelectedFolder(null);
      setSearchQuery("");
    }
  };

  const handleCancel = () => {
    setOpenFolder(false);
    setSelectedFolder(null);
    setSearchQuery("");
  };

  return (
    <BaseDialog
      open={openFolder}
      setOpen={setOpenFolder}
      title="Move to a folder"
      description="Select a folder from the list below"
      maxWidth="md"
      maxHeight="lg"
    >
      {/* Search Bar */}
      <div className="relative mb-6 px-0.5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search Folder"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-1 focus:ring-gray-300 outline-none transition-all"
        />
      </div>

      {/* Folder List */}
      <div className="border border-gray-200 rounded-xl p-2 bg-gray-50">
        <div className="space-y-3 max-h-60 overflow-y-auto p-1">
          {filteredFolders.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              No folders found
            </div>
          ) : (
            filteredFolders.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all cursor-pointer ${
                  selectedFolder === folder.id
                    ? "bg-blue-50 border-blue-500 shadow-sm"
                    : "bg-white hover:bg-gray-100 border-gray-200 hover:border-gray-300"
                }`}
              >
                <Folder
                  className={`w-5 h-5 ${
                    selectedFolder === folder.id ? "text-blue-600" : "text-purple-500"
                  }`}
                  fill="currentColor"
                />
                <span
                  className={`font-medium text-sm ${
                    selectedFolder === folder.id ? "text-blue-900" : "text-gray-900"
                  }`}
                >
                  {folder.name}
                </span>

                {selectedFolder === folder.id && (
                  <div className="ml-auto w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Footer Buttons - PROPERLY FIXED */}
      <div className="flex items-center justify-between gap-4 pt-6">
        <button
          onClick={handleCancel}
          className="py-2.5 px-6 hover:bg-gray-100 border-2 border-bgBlue rounded-xl font-semibold text-Heading bg-white  transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <div className="">
          <ContentButton
            onClick={handleMoveToFolder}
            title="Move to Folder"
            disabled={!selectedFolder}
            className="w-full"
          />
        </div>
      </div>
    </BaseDialog>
  );
};

export default FolderOpenDialog;