"use client";

interface Props {
  title: string;
  value: string | number;
}

export default function DeviceCard({ title, value }: Props) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <h4 className="text-gray-500 text-sm">{title}</h4>
      <p className="text-xl font-semibold">{value}</p>
    </div>
  );
}
