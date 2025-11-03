"use client";

import { useRouter } from "next/navigation";
import { ToggleRight, Video, Folder } from "lucide-react";

interface Props {
  id: string;
  title: string;
  subtitle: string;
  contentCount: number;
  devicesCount: number;
  lastUpdate: string;
  active: boolean;
}

export default function ScreenCard({
  id,
  title,
  subtitle,
  contentCount,
  devicesCount,
  lastUpdate,
  active,
}: Props) {
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer"
      onClick={() => router.push(`/screens/${id}`)}
    >
      <img
        src="https://via.placeholder.com/300x150"
        alt={title}
        className="rounded-lg w-full mb-2"
      />
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-semibold">{title}</h4>
        <ToggleRight size={24} className={active ? "text-green-500" : "text-gray-400"} />
      </div>
      <p className="text-gray-500 text-sm">{subtitle}</p>
      <div className="flex justify-between mt-2 text-gray-500 text-xs">
        <div className="flex items-center gap-1">
          <Video size={12} /> {contentCount}
        </div>
        <div className="flex items-center gap-1">
          <Folder size={12} /> {devicesCount}
        </div>
        <span>{lastUpdate}</span>
      </div>
    </div>
  );
}
