"use client";

import { useParams } from "next/navigation";
import type { ScreenData } from "../page";
import ScreenCardDetails from "../components/screenComponent/ScreenCardDetails";

const mockScreens: ScreenData[] = [
  {
    id: 1,
    title: "Main Lobby Display",
    description: "Shows the menu",
    status: "inactive",
    assignedContent: "2 videos, 1 content",
    devices: 4,
    lastUpdated: "2h ago",
    video: "/detailsVideo.mp4",
  },
  {
    id: 2,
    title: "Conference Hall Display",
    description: "Corporate slides & event schedule",
    status: "active",
    assignedContent: "3 videos, 2 content",
    devices: 2,
    lastUpdated: "1h ago",
    video: "/iceVideo.mp4",
  },
  {
    id: 3,
    title: "Reception Display",
    description: "Welcome messages and announcements",
    status: "inactive",
    assignedContent: "1 video, 1 content",
    devices: 3,
    lastUpdated: "3h ago",
    video: "/detailsVideo.mp4",
  },
];

const ScreenDetailsPage = () => {
  const { id } = useParams();
  const screen = mockScreens.find((s) => s.id === Number(id));

  if (!screen) {
    return (
      <div className="p-10 text-center text-gray-500">
        Screen not found
      </div>
    );
  }

  return <ScreenCardDetails screen={screen} />;
};

export default ScreenDetailsPage;
