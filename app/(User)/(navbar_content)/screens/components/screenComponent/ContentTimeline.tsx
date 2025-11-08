import { Plus } from "lucide-react";
import { useState } from "react";
import AddContentDialog from "./AddContentDialog";

interface TimelineItem {
  id: number;
  title: string;
  duration: string; // e.g., "10 min 20 sec"
}

interface ContentTimelineProps {
  timelineData?: TimelineItem[]; // optional
}

const ContentTimeline: React.FC<ContentTimelineProps> = ({ timelineData }) => {

  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-2xl font-semibold text-gray-900">
          Timeline
        </h2>
        <p className="text-sm text-textGray">
          Total:{" "}
          {timelineData && timelineData.length > 0
            ? timelineData
                .map((item) => item.duration)
                .join(" + ") // example, can sum duration if needed
            : "00 min 00 sec"}
        </p>
      </div>

      {/* Button */}
      <button onClick={() => setOpen(true)} className="flex items-center gap-2 bg-bgBlue hover:bg-blue-500 text-white px-6 py-3 rounded-lg text-sm md:text-base font-semibold transition-colors cursor-pointer">
        <Plus className="w-4 h-4 md:w-5 md:h-5" /> Add Content
      </button>

      {/* Timeline content */}
      <div>
        {timelineData && timelineData.length > 0 ? (
          <ul className="space-y-2">
            {timelineData.map((item) => (
              <li
                key={item.id}
                className="text-sm text-gray-700 border-b border-gray-100 pb-2"
              >
                {item.title} - {item.duration}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-base text-textGray">No content</p>
        )}
      </div>
      {open && <AddContentDialog open={open} setOpen={setOpen} />}
    </div>
  );
};

export default ContentTimeline;
