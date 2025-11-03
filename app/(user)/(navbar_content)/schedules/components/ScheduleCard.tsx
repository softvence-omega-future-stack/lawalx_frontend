"use client";

interface Props {
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export default function ScheduleCard({ title, subtitle, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer"
    >
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  );
}
