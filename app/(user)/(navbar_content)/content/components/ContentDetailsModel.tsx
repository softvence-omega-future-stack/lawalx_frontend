"use client";

interface Props {
  title: string;
  subtitle: string;
  onClose: () => void;
}

export default function ContentDetailsModal({ title, subtitle, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        <p className="text-gray-500 mb-4">{subtitle}</p>
        <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition mb-2">
          Assign / Edit
        </button>
        <button className="w-full border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition mb-2">
          Delete
        </button>
        <button
          onClick={onClose}
          className="w-full border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
