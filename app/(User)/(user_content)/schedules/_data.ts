export interface ContentItem {
    id: string;
    name: string;
    type: "video" | "image" | "audio";
    thumbnail: string;
    size?: string;
    duration?: string;
    url?: string;
}

export interface Screen {
    id: string;
    name: string;
    location: string;
    status: "online" | "offline";
    lastSync: string;
}

export interface Schedule {
    id: string;
    name: string;
    description: string;
    contentType: "Image or Video" | "HTML Content" | "Playlist";
    content: ContentItem[];
    repeat: "Run Once" | "Daily" | "Weekly" | "Monthly";
    scheduleTime: string;
    days?: string[];
    playTime: string;
    startDate?: string;
    assignedScreens: {
        groupId: string;
        groupName: string;
        screens: Screen[];
    }[];
    active: boolean;
    createdAt: string;
    video?: string;
    thumbnail?: string;
}

export const mockContent: ContentItem[] = [
    {
        id: "v1",
        name: "Video 1",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
        size: "40 MB",
        duration: "00:30",
    },
    {
        id: "v2",
        name: "Welcome.MP4",
        type: "video",
        thumbnail: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=200",
        size: "25 MB",
        duration: "00:15",
    },
    {
        id: "img1",
        name: "Background Image",
        type: "image",
        thumbnail: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&q=80&w=200",
        size: "2.5 MB",
    },
    {
        id: "img2",
        name: "Promo Banner",
        type: "image",
        thumbnail: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?auto=format&fit=crop&q=80&w=200",
        size: "1.8 MB",
    },
    {
        id: "a1",
        name: "Audio",
        type: "audio",
        thumbnail: "",
        size: "40 MB",
        duration: "03:45",
    },
    {
        id: "a2",
        name: "Audio",
        type: "audio",
        thumbnail: "",
        size: "40 MB",
        duration: "02:30",
    },
    {
        id: "a3",
        name: "Audio",
        type: "audio",
        thumbnail: "",
        size: "40 MB",
        duration: "05:15",
    }
];

export const mockScreens: Screen[] = [
    { id: "s1", name: "LG UR75 43 Inch 4K UHD Smart LED TV", location: "Store A - NYC", status: "online", lastSync: "2 mins ago" },
    { id: "s2", name: "Samsung Crystal UHD", location: "Store B - LA", status: "online", lastSync: "5 mins ago" },
    { id: "s3", name: "Sony BRAVIA", location: "Store C - Chicago", status: "offline", lastSync: "1 hour ago" },
];

export const mockSchedules: Schedule[] = [
    {
        id: "1",
        name: "Morning Content",
        description: "Play welcome content during morning hours",
        contentType: "Image or Video",
        content: [mockContent[1]],
        repeat: "Daily",
        scheduleTime: "Daily • 05:00 PM",
        playTime: "05:00 PM",
        assignedScreens: [
            {
                groupId: "g1",
                groupName: "Main Lobby Display(5)",
                screens: [mockScreens[0], mockScreens[1]]
            }
        ],
        active: true,
        createdAt: "2025-12-28T10:00:00Z",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
        video: "https://youtu.be/RgA9bjbkIMI?si=vrI3B55dfry-LAe0"
    },
    {
        id: "2",
        name: "Evening Content",
        description: "Atmospheric content for evening visitors",
        contentType: "Image or Video",
        content: [mockContent[0]],
        repeat: "Weekly",
        scheduleTime: "Mon, Tue, Wed, Thu, Fri • 09:00 AM",
        playTime: "09:00 AM",
        days: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        assignedScreens: [
            {
                groupId: "g1",
                groupName: "Main Lobby Display(5)",
                screens: [mockScreens[0]]
            }
        ],
        active: false,
        createdAt: "2025-12-27T15:00:00Z",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
        video: "https://youtu.be/sYHSGbo-hE4?si=l7MVWGfMu8l6Pk0j"
    },
    {
        id: "3",
        name: "Lunch Break Promo",
        description: "Special promotions during lunch hours",
        contentType: "Image or Video",
        content: [mockContent[1]],
        repeat: "Daily",
        scheduleTime: "Daily • 12:00 PM",
        playTime: "12:00 PM",
        assignedScreens: [{ groupId: "g2", groupName: "Cafeteria(3)", screens: [mockScreens[2]] }],
        active: true,
        createdAt: "2025-12-26T12:00:00Z",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
        video: "https://youtu.be/wZqEqoR6Vpk?si=4TC1bFZhjK2TQQ9F"
    },
    {
        id: "4",
        name: "Weekend Special",
        description: "Content for weekend shoppers",
        contentType: "Image or Video",
        content: [mockContent[0]],
        repeat: "Weekly",
        scheduleTime: "Sat, Sun • 10:00 AM",
        playTime: "10:00 AM",
        days: ["Sat", "Sun"],
        assignedScreens: [{ groupId: "g1", groupName: "Main Lobby Display(5)", screens: [mockScreens[0], mockScreens[1]] }],
        active: true,
        createdAt: "2025-12-25T10:00:00Z",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
        video: "https://youtu.be/6pWZG6XpQ4o?si=4TC1bFZhjK2TQQ9F"
    },
    {
        id: "5",
        name: "Night Owls",
        description: "Subtle content for late night hours",
        contentType: "Image or Video",
        content: [mockContent[0]],
        repeat: "Daily",
        scheduleTime: "Daily • 11:00 PM",
        playTime: "11:00 PM",
        assignedScreens: [{ groupId: "g1", groupName: "Main Lobby Display(5)", screens: [mockScreens[1]] }],
        active: false,
        createdAt: "2025-12-24T23:00:00Z",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
        video: "https://youtu.be/6pWZG6XpQ4o?si=4TC1bFZhjK2TQQ9F"
    },
    {
        id: "6",
        name: "Flash Sale Alert",
        description: "High energy sales alerts",
        contentType: "Image or Video",
        content: [mockContent[1]],
        repeat: "Run Once",
        scheduleTime: "Once • 02:00 PM",
        playTime: "02:00 PM",
        assignedScreens: [{ groupId: "g3", groupName: "Window Displays(2)", screens: [mockScreens[0]] }],
        active: true,
        createdAt: "2025-12-23T14:00:00Z",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
        video: "https://youtu.be/6pWZG6XpQ4o?si=4TC1bFZhjK2TQQ9F"
    },
    {
        id: "7",
        name: "Holiday Greetings",
        description: "Seasonal wishing content",
        contentType: "Image or Video",
        content: [mockContent[0]],
        repeat: "Monthly",
        scheduleTime: "Monthly • 08:00 AM",
        playTime: "08:00 AM",
        assignedScreens: [{ groupId: "g1", groupName: "Main Lobby Display(5)", screens: [mockScreens[0], mockScreens[1], mockScreens[2]] }],
        active: true,
        createdAt: "2025-12-22T08:00:00Z",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
        video: "https://youtu.be/6pWZG6XpQ4o?si=4TC1bFZhjK2TQQ9F"
    },
    {
        id: "8",
        name: "Employee Spotlight",
        description: "Internal communication for staff",
        contentType: "Image or Video",
        content: [mockContent[1]],
        repeat: "Weekly",
        scheduleTime: "Wed • 03:00 PM",
        playTime: "03:00 PM",
        days: ["Wed"],
        assignedScreens: [{ groupId: "g4", groupName: "Staff Room(1)", screens: [mockScreens[2]] }],
        active: false,
        createdAt: "2025-12-21T15:00:00Z",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
        video: "https://youtu.be/6pWZG6XpQ4o?si=4TC1bFZhjK2TQQ9F"
    },
    {
        id: "9",
        name: "New Inventory Showcase",
        description: "Highlights of new products",
        contentType: "Image or Video",
        content: [mockContent[0]],
        repeat: "Daily",
        scheduleTime: "Daily • 11:00 AM",
        playTime: "11:00 AM",
        assignedScreens: [{ groupId: "g3", groupName: "Window Displays(2)", screens: [mockScreens[0], mockScreens[1]] }],
        active: true,
        createdAt: "2025-12-20T11:00:00Z",
        thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=200",
        video: "https://youtu.be/6pWZG6XpQ4o?si=4TC1bFZhjK2TQQ9F"
    },
    {
        id: "10",
        name: "Safety Instructions",
        description: "Periodic safety reminders",
        contentType: "Image or Video",
        content: [mockContent[1]],
        repeat: "Daily",
        scheduleTime: "Daily • 07:00 AM",
        playTime: "07:00 AM",
        assignedScreens: [{ groupId: "g1", groupName: "Main Lobby Display(5)", screens: [mockScreens[0], mockScreens[1], mockScreens[2]] }],
        active: true,
        createdAt: "2025-12-19T07:00:00Z",
        video: "https://youtu.be/6pWZG6XpQ4o?si=4TC1bFZhjK2TQQ9F"
    },
    {
        id: "11",
        name: "Customer Reviews",
        description: "Positive feedback from customers",
        contentType: "Image or Video",
        content: [mockContent[0]],
        repeat: "Weekly",
        scheduleTime: "Tue, Thu • 01:00 PM",
        playTime: "01:00 PM",
        days: ["Tue", "Thu"],
        assignedScreens: [{ groupId: "g1", groupName: "Main Lobby Display(5)", screens: [mockScreens[0]] }],
        active: true,
        createdAt: "2025-12-18T13:00:00Z",
        video: "https://youtu.be/6pWZG6XpQ4o?si=4TC1bFZhjK2TQQ9F"
    },
    {
        id: "12",
        name: "Upcoming Events",
        description: "Details about next week's events",
        contentType: "Image or Video",
        content: [mockContent[1]],
        repeat: "Weekly",
        scheduleTime: "Fri • 04:00 PM",
        playTime: "04:00 PM",
        days: ["Fri"],
        assignedScreens: [{ groupId: "g1", groupName: "Main Lobby Display(5)", screens: [mockScreens[1]] }],
        active: true,
        createdAt: "2025-12-17T16:00:00Z",
        video: "https://youtu.be/6pWZG6XpQ4o?si=4TC1bFZhjK2TQQ9F"
    },
    {
        id: "13",
        name: "Brand Story",
        description: "The history and values of our brand",
        contentType: "Image or Video",
        content: [mockContent[0]],
        repeat: "Monthly",
        scheduleTime: "Monthly • 10:00 AM",
        playTime: "10:00 AM",
        assignedScreens: [{ groupId: "g1", groupName: "Main Lobby Display(5)", screens: [mockScreens[0], mockScreens[1]] }],
        active: false,
        createdAt: "2025-12-16T10:00:00Z",
        video: "https://youtu.be/6pWZG6XpQ4o?si=4TC1bFZhjK2TQQ9F"
    },
    {
        id: "14",
        name: "Weather & News",
        description: "Live updates for visitors",
        contentType: "Image or Video",
        content: [mockContent[1]],
        repeat: "Daily",
        scheduleTime: "Daily • 06:00 AM",
        playTime: "06:00 AM",
        assignedScreens: [{ groupId: "g1", groupName: "Main Lobby Display(5)", screens: [mockScreens[0], mockScreens[1], mockScreens[2]] }],
        active: true,
        createdAt: "2025-12-15T06:00:00Z",
        video: "https://youtu.be/6pWZG6XpQ4o?si=4TC1bFZhjK2TQQ9F"
    }
];
