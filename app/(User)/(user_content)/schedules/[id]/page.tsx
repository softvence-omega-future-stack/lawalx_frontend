"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { mockSchedules } from "../_data";

// Components
import DetailHeader from "./_components/DetailHeader";
import BasicInfoForm from "./_components/BasicInfoForm";
import ContentSection from "./_components/ContentSection";
import ScheduleTimeSection from "./_components/ScheduleTimeSection";
import AssignedScreensSection from "./_components/AssignedScreensSection";
import ContentPreview from "./_components/ContentPreview";
import AddScreenDialog from "./_components/AddScreenDialog";

export default function ScheduleDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const isNew = id === "new";

  const initialSchedule =
    mockSchedules.find((s) => s.id === id) || {
      id: "new",
      name: "",
      description: "",
      contentType: "Image or Video" as const,
      content: [],
      repeat: "Daily" as const,
      scheduleTime: "",
      playTime: "",
      assignedScreens: [],
      active: true,
      createdAt: new Date().toISOString(),
      video: "",
      thumbnail: "",
    };

  const [schedule, setSchedule] = useState(initialSchedule);
  const [isAddScreenOpen, setIsAddScreenOpen] = useState(false);

  const handleSave = () => {
    router.push("/schedules");
  };

  return (
    <div className="space-y-6 pb-20">
      <DetailHeader
        isNew={isNew}
        name={schedule.name}
        onSave={handleSave}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-6">
          <BasicInfoForm
            name={schedule.name}
            setName={(name) => setSchedule({ ...schedule, name })}
            description={schedule.description}
            setDescription={(description) =>
              setSchedule({ ...schedule, description })
            }
          />

          <ContentSection
            contentType={schedule.contentType}
            setContentType={(contentType: any) =>
              setSchedule({ ...schedule, contentType })
            }
            content={schedule.content}
          />

          <ScheduleTimeSection
            repeat={schedule.repeat}
            setRepeat={(repeat: any) =>
              setSchedule({ ...schedule, repeat })
            }
          />

          <AssignedScreensSection
            assignedScreens={schedule.assignedScreens}
            onAddScreen={() => setIsAddScreenOpen(true)}
          />
        </div>

        {/* Right Column: Preview */}
        <ContentPreview
          content={schedule.content[0]}
          scheduleTime={schedule.scheduleTime}
          video={schedule.video}
          thumbnail={schedule.thumbnail}
        />
      </div>

      <AddScreenDialog
        isOpen={isAddScreenOpen}
        onClose={() => setIsAddScreenOpen(false)}
      />
    </div>
  );
}
