"use client";

interface Props {
  title: string;
  subtitle: string;
  onClick?: () => void;
}

export default function ContentCard({ title, subtitle, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer"
    >
      <div className="h-32 bg-gray-200 rounded-lg mb-2 flex items-center justify-center">
        📁
      </div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-gray-500 text-sm">{subtitle}</p>
    </div>
  );
}
