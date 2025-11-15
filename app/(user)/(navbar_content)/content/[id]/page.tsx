// app/content/[id]/page.tsx
import ContentDetails from "@/components/content/ContentDetails";
import { ContentItem } from "@/components/content/MyContent";

export const mockContentData: ContentItem[] = [
    // ---- Folder with nested videos & playlists ----
    {
        id: "f1",
        title: "Company Update Q3",
        type: "folder",
        size: "45 MB",
        fileCount: 3,
        assignedTo: ["Main Lobby Display", "Main Gate Entry"],
        uploadedDate: "3 days ago",
        updatedAt: "2 days ago",
        children: [
            {
                id: "f1-1",
                title: "Intro Video - Q3",
                type: "video",
                size: "25 MB",
                duration: "1:30",
                thumbnail:
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
                video: "./detailsVideo.mp4",
                updatedAt: "2 days ago",
            },
            {
                id: "f1-2",
                title: "Q3 Report Graphics",
                type: "image",
                size: "8 MB",
                thumbnail:
                    "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=400&h=300&fit=crop",
                updatedAt: "1 day ago",
            },
            {
                id: "f1-3",
                title: "Background Music Pack",
                type: "playlist",
                audio: "./audio.mp3",
                size: "8 Items",
                duration: "12:00",
                updatedAt: "5 days ago",
            },
        ],
    },

    // ---- Top-level videos ----
    {
        id: "v1",
        title: "Tutorial - How to Use Dashboard",
        type: "video",
        size: "50 MB",
        duration: "4:20",
        thumbnail:
            "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=400&h=300&fit=crop",
        video: "./detailsVideo.mp4",
        assignedTo: ["Training Room Screen"],
        uploadedDate: "4 days ago",
        updatedAt: "3 days ago",
    },
    {
        id: "v2",
        title: "Product Demo",
        type: "video",
        size: "120 MB",
        duration: "6:10",
        thumbnail:
            "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop",
        video: "./iceVideo.mp4",
        uploadedDate: "1 week ago",
        updatedAt: "4 days ago",
    },

    // ---- Top-level playlists (music) ----
    {
        id: "p1",
        title: "Office Ambient Mix",
        type: "playlist",
        size: "20 Items",
        duration: "1:20:00",
        audio: "./audio.mp3",
        assignedTo: ["Main Lobby Display"],
        uploadedDate: "1 week ago",
        updatedAt: "5 days ago",
    },
    {
        id: "p2",
        title: "Marketing Assets - Audio",
        type: "playlist",
        size: "10 Items",
        duration: "35:00",
        audio: "./audio.mp3",
        uploadedDate: "5 days ago",
        assignedTo: ["Main Gate Entry"],
        updatedAt: "4 days ago",
    },

    // ---- Another folder with nested playlist + video ----
    {
        id: "f2",
        title: "Campaign Assets",
        type: "folder",
        size: "220 MB",
        fileCount: 4,
        uploadedDate: "2 days ago",
        updatedAt: "1 day ago",
        assignedTo: ["Marketing Screen"],
        children: [
            {
                id: "f2-1",
                title: "Campaign Teaser",
                type: "video",
                size: "80 MB",
                duration: "0:45",
                thumbnail:
                    "https://images.unsplash.com/photo-1508873699372-7ae3e3b6b6f6?w=400&h=300&fit=crop",
                video: "./campaign-teaser.mp4",
                updatedAt: "1 day ago",
            },
            {
                id: "f2-2",
                title: "Ad Jingles",
                type: "playlist",
                size: "6 Items",
                audio: "./audio.mp3",
                duration: "4:00",
                updatedAt: "2 days ago",
            },
            {
                id: "f2-3",
                title: "Campaign Poster",
                type: "image",
                size: "3 MB",
                thumbnail:
                    "https://images.unsplash.com/photo-1490685451225-4b4b8f0f2c9f?w=400&h=300&fit=crop",
                updatedAt: "3 days ago",
            },
        ],
    },

    // ---- Single image item (top-level file) ----
    {
        id: "img1",
        title: "Office Background Image",
        type: "image",
        size: "12 MB",
        thumbnail:
            "https://images.unsplash.com/photo-1508780709619-79562169bc64?w=400&h=300&fit=crop",
        assignedTo: ["Main Lobby Display", "Reception Screen"],
        uploadedDate: "6 days ago",
        updatedAt: "5 days ago",
    },

    // ---- Small video file used for details/example ----
    {
        id: "v3",
        title: "Welcome Loop",
        type: "video",
        size: "30 MB",
        duration: "0:30",
        thumbnail:
            "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=300&fit=crop",
        video: "./detailsVideo.mp4",
        uploadedDate: "5 days ago",
        updatedAt: "4 days ago",
    },

    // ---- Another playlist top-level ----
    {
        id: "p3",
        title: "Event BGM Collection",
        type: "playlist",
        size: "15 Items",
        duration: "45:00",
        audio: "./audio.mp3",
        assignedTo: ["Event Hall Screen"],
        uploadedDate: "3 days ago",
        updatedAt: "2 days ago",
    },
];

interface ContentDetailsPageProps {
    params: {
        id: string;
    };
}

// Recursive function to find content by ID (searches nested children too)
const findContentById = (items: ContentItem[], id: string): ContentItem | null => {
    for (const item of items) {
        // Check if current item matches
        if (item.id === id) {
            return item;
        }
        
        // If item has children, search recursively
        if (item.children && item.children.length > 0) {
            const found = findContentById(item.children, id);
            if (found) {
                return found;
            }
        }
    }
    return null;
};

const ContentDetailsPage = ({ params }: ContentDetailsPageProps) => {
    // Find the content item by ID (searches nested items too)
    const content = findContentById(mockContentData, params.id);

    // If content not found, show error
    if (!content) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Content Not Found</h1>
                    <p className="text-gray-600">The requested content could not be found.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div>
                <ContentDetails content={content} />
            </div>
        </>
    );
}

export default ContentDetailsPage;