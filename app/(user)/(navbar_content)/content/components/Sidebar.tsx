"use client";

interface Props {
  selected: "uploaded" | "create";
  setSelected: (value: "uploaded" | "create") => void;
}

export default function Sidebar({ selected, setSelected }: Props) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-4 w-64">
      <button
        onClick={() => setSelected("uploaded")}
        className={`text-left px-3 py-2 rounded-lg ${
          selected === "uploaded" ? "bg-blue-100 font-semibold" : ""
        }`}
      >
        Uploaded Files
      </button>
      <button
        onClick={() => setSelected("create")}
        className={`text-left px-3 py-2 rounded-lg ${
          selected === "create" ? "bg-blue-100 font-semibold" : ""
        }`}
      >
        Create Content
      </button>
    </div>
  );
}
