"use client";

interface Props {
  onClose: () => void;
}

export default function CreateContentPopup({ onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">Create New Content</h3>
        <input
          type="text"
          placeholder="Content Name"
          className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Description"
          className="w-full border border-gray-300 rounded-lg py-2 px-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition mb-2">
          Create Content
        </button>
        <button
          onClick={onClose}
          className="w-full border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
