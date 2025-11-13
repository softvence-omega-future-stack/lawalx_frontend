// app/content/[id]/page.tsx
import ContentDetails from "@/components/content/ContentDetails";
import { ContentItem } from "@/components/content/MyContent";

export const mockContentData: ContentItem[] = [
    {
        id: "1",
        title: "Company Update Q3",
        type: "folder",
        size: "45 MB",
        fileCount: 2,
        assignedTo: ["Main Lobby Display", "Main Gate Entry"],
        children: [
            {
                id: "1-1",
                title: "Intro Video",
                type: "video",
                size: "25 MB",
                duration: "90 sec",
                thumbnail:
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
            },
            {
                id: "1-2",
                title: "Report Image",
                type: "image",
                size: "15 MB",
                thumbnail:
                    "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=400&h=300&fit=crop",
            },
        ],
    },
    {
        id: "2",
        title: "Video",
        type: "video",
        size: "45 MB",
        duration: "120 sec",
        video: "./detailsVideo.mp4",
    },
    {
        id: "3",
        title: "Background Music",
        type: "playlist",
        size: "12 Items",
        duration: "120 sec",
        assignedTo: ["Main Lobby Display", "Main Gate Entry"],
    },
    {
        id: "4",
        title: "Playlist 1",
        type: "folder",
        size: "120 MB",
        fileCount: 24,
        assignedTo: ["Main Lobby Display", "Main Gate Entry"],
        uploadedDate: "3 days ago",
        children: [
            {
                id: "4-1",
                title: "Intro Video",
                type: "video",
                size: "25 MB",
                duration: "90 sec",
                thumbnail:
                    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
            },
            {
                id: "4-2",
                title: "Report Image",
                type: "image",
                size: "15 MB",
                thumbnail:
                    "https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?w=400&h=300&fit=crop",
            },
        ],
    },
    {
        id: "5",
        title: "Image",
        type: "image",
        size: "45 MB",
        video:
            "./detailsVideo.mp4",
        assignedTo: ["Main Lobby Display", "Main Gate Entry"],
    },
    {
        id: "6",
        title: "Marketing Assets",
        type: "playlist",
        size: "45 MB",
        duration: "120 sec",
        assignedTo: ["Main Lobby Display", "Main Gate Entry"],
        uploadedDate: "3 days ago",
    },
    {
        id: "7",
        title: "Tutorial Video",
        type: "video",
        size: "45 MB",
        duration: "120 sec",
        thumbnail:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
        assignedTo: ["Main Lobby Display", "Main Gate Entry"],
    },
    {
        id: "8",
        title: "Background Image",
        type: "image", // Changed from "video" to "image"
        size: "45 MB",
        thumbnail:
            "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop",
    },
];

interface ContentDetailsPageProps {
    params: {
        id: string;
    };
}

const ContentDetailsPage = ({ params }: ContentDetailsPageProps) => {
    // Find the content item by ID from URL params
    const content = mockContentData.find(item => item.id === params.id);

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
                <ContentDetails content={content}/>
            </div>
        </>
     );
}

export default ContentDetailsPage;