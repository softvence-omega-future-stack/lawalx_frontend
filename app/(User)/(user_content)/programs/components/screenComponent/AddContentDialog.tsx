"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Play } from "lucide-react";
import BaseDialog from "@/common/BaseDialog";
import BaseSelect from "@/common/BaseSelect";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import img from "@/public/images/addContent.png";

interface ContentItem {
  id: string;
  name: string;
  type: "MP4" | "PNG" | "JPG" | "PDF";
  size: string;
  thumbnail: string;
}

interface AddContentDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddContentDialog = ({ open, setOpen }: AddContentDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const contentItems: ContentItem[] = [
    {
      id: "1",
      name: "Playlist 1",
      type: "MP4",
      size: "45 MB",
      thumbnail: img.src,
    },
    {
      id: "2",
      name: "Image.PNG",
      type: "PNG",
      size: "1 MB",
      thumbnail: img.src,
    },
    {
      id: "3",
      name: "Playlist 2",
      type: "MP4",
      size: "45 MB",
      thumbnail: img.src,
    },
  ];

  const filterOptions = [
    { label: "All Content", value: "all" },
    { label: "Videos", value: "video" },
    { label: "Images", value: "image" },
    { label: "Documents", value: "document" },
  ];

  const handleSelectItem = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleClearSelection = () => {
    setSelectedItems([]);
    setOpen(false);
  };

  const handleAddContent = () => {
    console.log("Selected items:", selectedItems);
    setOpen(false);
  };

  const filteredContent = contentItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <BaseDialog
      open={open}
      setOpen={setOpen}
      title="Add Content to Program"
      description="Select videos, images, or documents to add to your screen timeline."
      maxWidth="xl"
      maxHeight="xl"
    >
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted w-5 h-5" />
          <input
            type="text"
            placeholder="Search content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 md:py-2.5 bg-input border border-border rounded-lg"
          />
        </div>
        <div className="w-full md:w-36">
          <BaseSelect
            placeholder="All Content"
            options={filterOptions}
            value={selectedFilter}
            onChange={setSelectedFilter}
            showLabel={false}
            className="min-w-[150px]"
          />
        </div>
      </div>

      {/* Content List */}
      <div className="divide-y divide-border max-h-[400px] overflow-y-auto pr-2">
        {filteredContent.map((item) => {
          const isSelected = selectedItems.includes(item.id);
          return (
            <div
              key={item.id}
              className="flex items-center gap-3 px-3 md:py-4 cursor-pointer transition-all duration-150 "
              onClick={() => handleSelectItem(item.id)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => handleSelectItem(item.id)}
                  className="h-5 w-5 cursor-pointer data-[state=checked]:bg-bgBlue data-[state=checked]:border-bgBlue hover:bg-transparent hover:border-gray-300"
                />
              </div>

              {/* Thumbnail */}
              <div className="relative w-20 h-16 bg-gray-200 rounded overflow-hidden shrink-0">
                <Image
                  src={item.thumbnail}
                  alt={item.name}
                  width={80}
                  height={64}
                  className="w-full h-full object-cover"
                />
                {item.type === "MP4" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-8 h-8 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                      <Play
                        className="h-4 w-4 text-gray-700 ml-0.5"
                        fill="currentColor"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm md:text-lg font-medium text-headings truncate">
                    {item.name}
                  </h4>
                  <span className="text-xs px-2 py-0.5 rounded-md text-muted font-medium border border-border bg-cardBackground">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-muted mt-0.5">
                  {item.size}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t mt-4">
        <Button
          variant="outline"
          onClick={handleClearSelection}
          disabled={selectedItems.length === 0}
          className="border-bgBlue font-semibold text-base hover:bg-bgBlue hover:text-white"
        >
          Cancel
        </Button>
        <Button
          onClick={handleAddContent}
          disabled={selectedItems.length === 0}
          className="bg-bgBlue hover:bg-blue-500 font-semibold text-base text-white"
        >
          Add content
        </Button>
      </div>
    </BaseDialog>
  );
};

export default AddContentDialog;
