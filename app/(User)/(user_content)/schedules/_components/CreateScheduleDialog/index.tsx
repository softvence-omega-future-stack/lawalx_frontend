"use client";

import React, { useState } from "react";
import BaseDialog from "@/common/BaseDialog";
import StepIndicator from "./StepIndicator";
import Step1NameDescription from "./Step1NameDescription";
import Step2ContentSelection from "./Step2ContentSelection";
import Step2LowerThird from "./Step2LowerThird";
import Step3ScreenSelection from "./Step3ScreenSelection";
import Step4ScheduleSettings from "./Step4ScheduleSettings";
import { ContentItem } from "../../_data";
import { FileText, Settings, TvMinimal, Video } from "lucide-react";

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
            message: "This is a demo text"
        }
    });

    const [step3Data, setStep3Data] = useState({ selectedScreens: [] as string[] });
    const [step4Data, setStep4Data] = useState({
        repeat: "run-once",
        selectedDays: [] as string[],
        selectedDates: [] as number[],
        playTime: "03:00",
        startDate: ""
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
        setStep4Data({ repeat: "run-once", selectedDays: [], selectedDates: [], playTime: "03:00", startDate: "" });
        setOpen(false);
    };

    const handleSubmit = () => {
        console.log("Form submitted:", {
            step1Data,
            step2Data,
            lowerThirdData,
            step3Data,
            step4Data
        });
        // TODO: Handle form submission
        handleCancel();
    };

    const isNextDisabled = () => {
        if (currentStep === 1) return !step1Data.name;
        if (currentStep === 2 && !showLowerThird) return !step2Data.selectedContent;
        if (currentStep === 3) return step3Data.selectedScreens.length === 0;
        if (currentStep === 4) return !step4Data.playTime || !step4Data.startDate;
        return false;
    };

    return (
        <BaseDialog
            open={open}
            setOpen={setOpen}
            title="Create New Schedule"
            description="Schedule when and where your content should play"
            maxWidth="4xl"
            maxHeight="xl"
        >
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

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-borderGray mt-6">
                <button
                    onClick={handleCancel}
                    className="px-6 py-2 rounded-lg border border-borderGray text-headings hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                    Cancel
                </button>

                <div className="flex items-center gap-3">
                    {(currentStep > 1 || showLowerThird) && (
                        <button
                            onClick={handleBack}
                            className="px-6 py-2 rounded-lg border border-borderGray text-headings hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                            Back
                        </button>
                    )}

                    <button
                        onClick={handleNext}
                        disabled={isNextDisabled()}
                        className="px-6 py-2 rounded-lg bg-bgBlue text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    >
                        {currentStep === 4 ? "Create Schedule" : "Next"}
                    </button>
                </div>
            </div>
        </BaseDialog>
    );
};

export default CreateScheduleDialog;
