/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import StepIndicator from "./StepIndicator";
import Step1NameDescription from "./Step1NameDescription";
import Step2ContentSelection from "./Step2ContentSelection";
import Step2LowerThird from "./Step2LowerThird";
import Step3ScreenSelection from "./Step3ScreenSelection";
import Step4ScheduleSettings from "./Step4ScheduleSettings";
import { ContentItem } from "../../_data";
import { FileText, Settings, TvMinimal, Video, X } from "lucide-react";
import { usePostSchedulesMutation } from "@/redux/api/userDashboard/schedules/schedules.api";
import { SchedulePayload } from "@/types/schedule";

interface CreateScheduleDialogProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const STEPS = [
    { number: 1, icon: <FileText />, label: "Name and Description", sublabel: "" },
    { number: 2, icon: <Video />, label: "Content Selection", sublabel: "" },
    { number: 3, icon: <TvMinimal />, label: "Screen Selection", sublabel: "" },
    { number: 4, icon: <Settings />, label: "Schedule Settings", sublabel: "" }
];

const CreateScheduleDialog: React.FC<CreateScheduleDialogProps> = ({ open, setOpen }) => {
    const [createSchedules] = usePostSchedulesMutation();
    const [currentStep, setCurrentStep] = useState(1);
    const [showLowerThird, setShowLowerThird] = useState(false);

    // Form Data State
    const [step1Data, setStep1Data] = useState({ name: "", description: "" });
    const [step2Data, setStep2Data] = useState<{
        contentType: string;
        selectedContent: ContentItem | null;
    }>({ contentType: "image-video", selectedContent: null });

    const [lowerThirdData, setLowerThirdData] = useState({
        selectedContent: null as ContentItem | null,
        lowerThirdConfig: {
            backgroundColor: "#3D3D3D",
            backgroundOpacity: 80,
            enableAnimation: true,
            animationDirection: "left-to-right",
            speed: "medium",
            enableLogo: true,
            position: "bottom",
            textColor: "#FFFFFF",
            fontSize: "24",
            fontFamily: "Inter",
            loop: true,
            message: "This is a demo text"
        }
    });

    const [step3Data, setStep3Data] = useState({ selectedScreens: [] as string[] });
    const [step4Data, setStep4Data] = useState({
        repeat: "run-once",
        selectedDays: [] as string[],
        selectedDates: [] as number[],
        playTime: "03:00",
        endTime: "05:00",
        startDate: "",
        endDate: ""
    });

    const handleContentSelect = (content: ContentItem) => {
        setStep2Data({ ...step2Data, selectedContent: content });
        setLowerThirdData({ ...lowerThirdData, selectedContent: content });
        setShowLowerThird(true);
    };

    const handleNext = () => {
        if (showLowerThird) {
            // Move from Lower Third to Step 3
            setShowLowerThird(false);
            setCurrentStep(3);
        } else if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        } else {
            // Submit form
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (showLowerThird) {
            setShowLowerThird(false);
        } else if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleCancel = () => {
        // Reset all data
        setCurrentStep(1);
        setShowLowerThird(false);
        setStep1Data({ name: "", description: "" });
        setStep2Data({ contentType: "image-video", selectedContent: null });
        setStep3Data({ selectedScreens: [] });
        setStep4Data({ repeat: "run-once", selectedDays: [], selectedDates: [], playTime: "03:00", endTime: "05:00", startDate: "", endDate: "" });
        setOpen(false);
    };

    const handleSubmit = async () => {
        // Determine active content
        const activeContent = showLowerThird ? lowerThirdData.selectedContent : step2Data.selectedContent;

        // Map contentType from form to API payload
        let contentType: "IMAGE_TEXT" | "IMAGE" | "VIDEO" | "TEXT" = "IMAGE";
        if (showLowerThird) {
            contentType = "IMAGE_TEXT";
        } else if (step2Data.contentType === "video") {
            contentType = "VIDEO";
        } else if (step2Data.contentType === "text") {
            contentType = "TEXT";
        }

        // Map fontSize from numeric to named size
        const fontSizeMap: { [key: string]: "Small" | "Medium" | "Large" } = {
            "16": "Small",
            "24": "Medium",
            "32": "Large",
        };

        const fontSize: "Small" | "Medium" | "Large" =
            fontSizeMap[lowerThirdData.lowerThirdConfig.fontSize] || "Medium";

        // Convert play time (HH:MM) to ISO time format
        const [hours, minutes] = step4Data.playTime.split(":").map(Number);
        const [endHours, endMinutes] = step4Data.endTime.split(":").map(Number);

        // Construct ISO format date-time strings
        const startDateTime = step4Data.startDate 
            ? new Date(step4Data.startDate).toISOString().split("T")[0] + `T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00.000Z`
            : undefined;

        const endDateTime = step4Data.endDate
            ? new Date(step4Data.endDate).toISOString().split("T")[0] + `T${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}:00.000Z`
            : undefined;

        // Construct the API payload
        const payload: SchedulePayload = {
            name: step1Data.name,
            description: step1Data.description,
            text: lowerThirdData.lowerThirdConfig.message,
            textColor: lowerThirdData.lowerThirdConfig.textColor,
            fontSize: fontSize,
            font: lowerThirdData.lowerThirdConfig.fontFamily,
            backgroundColor: lowerThirdData.lowerThirdConfig.backgroundColor,
            backgroundOpacity: lowerThirdData.lowerThirdConfig.backgroundOpacity,
            animation: lowerThirdData.lowerThirdConfig.animationDirection,
            loop: lowerThirdData.lowerThirdConfig.loop,
            position: (lowerThirdData.lowerThirdConfig.position.charAt(0).toUpperCase() +
                lowerThirdData.lowerThirdConfig.position.slice(1)) as "Top" | "Middle" | "Bottom",
            contentType: contentType,
            recurrenceType: step4Data.repeat === "run-once" ? undefined : (step4Data.repeat as "daily" | "weekly" | "monthly"),
            startDate: step4Data.startDate,
            endDate: step4Data.endDate,
            startTime: startDateTime,
            endTime: endDateTime,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            daysOfWeek: step4Data.selectedDays as ("Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun")[],
            dayOfMonth: step4Data.selectedDates,
            contentId: activeContent?.id,
            deviceId: step3Data.selectedScreens[0], // First selected screen
        };

        console.log("=== SUBMITTING SCHEDULE PAYLOAD ===");
        console.log(payload);

        try {
            // Call the API mutation
            const result = await createSchedules(payload).unwrap();
            console.log("Schedule created successfully:", result);

            // Show success message
            toast.success("Schedule created successfully!");

            // Close dialog
            handleCancel();
        } catch (error) {
            console.error("Error creating schedule:", error);
            // Show error message
            toast.error("Failed to create schedule. Please try again.");
        }
    };

    const isNextDisabled = () => {
        if (currentStep === 1) return !step1Data.name;
        if (currentStep === 2 && !showLowerThird) return !step2Data.selectedContent;
        if (currentStep === 3) return step3Data.selectedScreens.length === 0;
        if (currentStep === 4) return !step4Data.playTime || !step4Data.startDate || !step4Data.endDate || !step4Data.endTime;
        return false;
    };

    // Prevent background scrolling when dialog is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
            document.documentElement.style.overflow = "unset";
        };
    }, [open]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Darker full-screen backdrop - Click to close */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" onClick={handleCancel} />

            {/* Modal Content container - Adjusted max-height and centering */}
            <div className="relative w-full max-w-4xl max-h-[85vh] bg-navbarBg border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between bg-navbarBg">
                    <div>
                        <h2 className="text-2xl font-bold text-headings">Create New Schedule</h2>
                        <p className="text-sm text-muted mt-1">
                            Schedule when and where your content should play
                        </p>
                    </div>
                    <button
                        onClick={handleCancel}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all cursor-pointer text-muted hover:text-red-500"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-6">
                        {/* Step Indicator */}
                        <StepIndicator currentStep={showLowerThird ? 2 : currentStep} steps={STEPS} />

                        {/* Step Content */}
                        <div className="min-h-[400px]">
                            {currentStep === 1 && (
                                <Step1NameDescription data={step1Data} onChange={setStep1Data} />
                            )}

                            {currentStep === 2 && !showLowerThird && (
                                <Step2ContentSelection
                                    data={step2Data}
                                    onChange={setStep2Data}
                                    onContentSelect={handleContentSelect}
                                />
                            )}

                            {showLowerThird && lowerThirdData.selectedContent && (
                                <Step2LowerThird
                                    data={lowerThirdData as any}
                                    onChange={setLowerThirdData}
                                />
                            )}

                            {currentStep === 3 && !showLowerThird && (
                                <Step3ScreenSelection data={step3Data} onChange={setStep3Data} />
                            )}

                            {currentStep === 4 && (
                                <Step4ScheduleSettings data={step4Data} onChange={setStep4Data} />
                            )}
                        </div>
                    </div>
                </div>


                {/* Footer - Sticky at bottom */}
                <div className="p-6 border-t border-border flex items-center justify-between bg-navbarBg/80 backdrop-blur-md">
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2.5 rounded-xl border border-border text-headings font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer shadow-customShadow"
                    >
                        Cancel
                    </button>

                    <div className="flex items-center gap-3">
                        {/* Always show Back button except on step 1 and not in lower third */}
                        {(currentStep > 1 || showLowerThird) && (
                            <button
                                onClick={handleBack}
                                className="px-6 py-2.5 rounded-xl border border-border text-headings font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-all cursor-pointer shadow-customShadow"
                            >
                                Back
                            </button>
                        )}

                        {/* Always show Next/Create button */}
                        <button
                            onClick={handleNext}
                            disabled={isNextDisabled()}
                            className="px-8 py-2.5 rounded-xl bg-bgBlue text-white font-semibold hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-customShadow transition-all cursor-pointer"
                        >
                            {currentStep === 4 ? "Create Schedule" : "Next"}
                        </button>
                    </div>
                </div>

                <style dangerouslySetInnerHTML={{
                    __html: `
                    /* Ensure Select and other portals appear on top */
                    [data-radix-portal],
                    [data-slot="select-content"],
                    [data-radix-popper-content-wrapper] {
                        z-index: 9999 !important;
                    }
                ` }} />
            </div>
        </div>
    );
};

export default CreateScheduleDialog;
