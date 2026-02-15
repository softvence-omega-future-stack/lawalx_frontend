export interface SelectOption {
    label: string;
    value: string;
    icon?: React.ReactNode;
}

export interface ContentItem {
    id: string;
    title: string;
    type: "folder" | "playlist" | "video" | "image";
    size: string;
    duration?: string;
    fileCount?: number;
    thumbnail?: string;
    video?: string;
    audio?: string;
    uploadedDate?: string;
    fileExtension?: string;
    updatedAt?: string;
    assignedDevices?: string[];
    assignedPlaylists?: string[];
    schedules?: string[];
    assignedTo?: string[];
    children?: ContentItem[];
}
