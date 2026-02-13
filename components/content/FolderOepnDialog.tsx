/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Search, Folder } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMoveToFolderMutation } from "@/redux/api/users/content/content.api";
import { toast } from "sonner";

interface ContentItem {
  id: string;
  title: string;
  audio?: string;
}

interface Folder {
  id: string;
  name: string;
}

interface FolderDialogProps {
  item: ContentItem;
  openFolder: boolean;
  setOpenFolder: (open: boolean) => void;
  folders: Folder[];
}

const FolderOpenDialog = ({ item, openFolder, setOpenFolder, folders }: FolderDialogProps) => {
  const [moveToFolder, { isLoading }] = useMoveToFolderMutation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMoveToFolder = async () => {
    if (selectedFolder) {
      try {
        const res = await moveToFolder({ id: item.id, targetFolderId: selectedFolder }).unwrap();
        if (res.success) {
          toast.success(res.message || "Moved to folder successfully");
          setOpenFolder(false);
          setSelectedFolder(null);
          setSearchQuery("");
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Something went wrong");
      }
    }
  };

  const handleCancel = () => {
    setOpenFolder(false);
    setSelectedFolder(null);
    setSearchQuery("");
  };

  return (
    <Dialog open={openFolder} onOpenChange={setOpenFolder}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 rounded-2xl overflow-hidden border-none bg-navbarBg">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold text-headings">Move to Folder</DialogTitle>
          <DialogDescription className="text-base text-body mt-1">Select a folder from the list below</DialogDescription>
        </DialogHeader>

        {/* Search Bar */}
        <div className="relative mb-6 px-6">
          <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search Folder"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-input border border-gray-200 rounded-xl text-headings placeholder-gray-500 focus:ring-1 focus:ring-gray-300 outline-none transition-all"
          />
        </div>

        {/* Folder List */}
        <div className="px-6 pb-4">
          <div className="border border-border rounded-xl p-2 bg-navbarBg">
            <div className="space-y-3 overflow-y-auto p-1">
              {filteredFolders.length === 0 ? (
                <div className="text-center py-8 text-headings text-sm">No folders found</div>
              ) : (
                filteredFolders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border transition-all cursor-pointer ${selectedFolder === folder.id
                      ? "bg-blue-50 border-blue-500 shadow-sm"
                      : "bg-navbarBg text-headings hover:bg-gray-100 border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <Folder
                      className={`w-5 h-5 ${selectedFolder === folder.id ? "text-blue-600" : "text-purple-500"
                        }`}
                      fill="currentColor"
                    />
                    <span className={`font-medium text-sm ${selectedFolder === folder.id ? "text-blue-900" : "text-headings"}`}>
                      {folder.name}
                    </span>

                    {selectedFolder === folder.id && (
                      <div className="ml-auto w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 flex flex-row gap-4 sm:justify-between sm:space-x-0">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 h-12 rounded-lg text-base font-bold text-body border-border shadow-customShadow hover:bg-gray-50"
          >
            Cancel
          </Button>

          <Button
            onClick={handleMoveToFolder}
            disabled={!selectedFolder || isLoading}
            className="flex-1 h-12 rounded-lg text-base font-bold bg-bgBlue hover:bg-[#0095FF] text-white transition-colors shadow-customShadow"
          >
            {isLoading ? "Moving..." : "Move to Folder"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FolderOpenDialog;