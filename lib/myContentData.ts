// // ============================================
// // FILE: types/content.types.ts
// // ============================================
// export interface SelectOption {
//   label: string;
//   value: string;
//   icon?: React.ReactNode;
// }

// export interface ContentItem {
//   id: string;
//   title: string;
//   type: "folder" | "playlist" | "video" | "image";
//   size: string;
//   duration?: string;
//   fileCount?: number;
//   thumbnail?: string;
//   assignedTo?: string[];
// }

// export const createNew: SelectOption[] = [
//   { label: "New Folder", value: "new-folder", icon: <FolderPlus size={22} /> },
//   { label: "New Playlist", value: "new-playlist", icon: <ListMusic size={22} /> },
// ];

// export const sortByName: SelectOption[] = [
//   { label: "A-Z", value: "a-z" },
//   { label: "Z-A", value: "z-a" },
// ];

// export const allContent: SelectOption[] = [
//   { label: "All Content", value: "all-content" },
//   { label: "Folders", value: "folders" },
//   { label: "Playlists", value: "playlists" },
//   { label: "Files", value: "files" },
// ];

// export const mockContentData: ContentItem[] = [
//   {
//     id: "1",
//     title: "Company Update Q3",
//     type: "folder",
//     size: "45 MB",
//     fileCount: 12,
//   },
//   {
//     id: "2",
//     title: "Video",
//     type: "video",
//     size: "45 MB",
//     duration: "120 sec",
//     thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
//   },
//   {
//     id: "3",
//     title: "Background Music",
//     type: "playlist",
//     size: "12 Items",
//     duration: "120 sec",
//     assignedTo: ["Main Lobby Display", "Main Gate Entry"],
//   },
//   {
//     id: "4",
//     title: "Playlist 1",
//     type: "folder",
//     size: "120 MB",
//     fileCount: 24,
//   },
//   {
//     id: "5",
//     title: "Image",
//     type: "image",
//     size: "45 MB",
//     thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
//     assignedTo: ["Main Lobby Display", "Main Gate Entry"],
//   },
//   {
//     id: "6",
//     title: "Marketing Assets",
//     type: "playlist",
//     size: "45 MB",
//     duration: "120 sec",
//     assignedTo: ["Main Lobby Display", "Main Gate Entry"],
//   },
//   {
//     id: "7",
//     title: "Tutorial Video",
//     type: "video",
//     size: "45 MB",
//     duration: "120 sec",
//     thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
//     assignedTo: ["Main Lobby Display", "Main Gate Entry"],
//   },
//   {
//     id: "8",
//     title: "Background Image",
//     type: "video",
//     size: "45 MB",
//     duration: "120 sec",
//     thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
//   },
// ];