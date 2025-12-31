/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import AuthLayout from "@/components/auth/AuthLayout";
import SignupForm from "@/components/auth/SignupForm";
import VerificationForm from "@/components/auth/VerificationForm";
import SetPasswordForm from "@/components/auth/SetPasswordForm";
import PlanSelection from "@/components/auth/PlanSelection";
import CustomEnterpriseForm from "@/components/auth/CustomEnterpriseForm";
import { CheckCircle2 } from "lucide-react";

type SignupStep = "details" | "verification" | "password" | "plans" | "enterprise" | "success";

const SignUpPage = () => {
    const [step, setStep] = useState<SignupStep>("details");
    const [formData, setFormData] = useState<any>({});
    // const [showSuccess, setShowSuccess] = useState(false);

    const handleNext = (stepData: any) => {
        const updatedData = { ...formData, ...stepData };
        setFormData(updatedData);

        // As per prompt: console.log data on button clicks
        if (step === "details") {
            console.log("Signup Button Clicked - Step 1 Data:", stepData);
            setStep("verification");
        } else if (step === "verification") {
            console.log("Confirm Button Clicked - Step 2 Data:", stepData);
            setStep("password");
        } else if (step === "password") {
            console.log("Confirm Button Clicked - Step 3 Data:", stepData);
            setStep("plans");
        }
    };

    const handlePlanSelect = (plan: string) => {
        const finalData = { ...formData, selectedPlan: plan };
        console.log("Plan Selected:", plan);
        console.log("Successfully Completed Signup. Final Data:", finalData);
        // setStep("success");
        // setShowSuccess(true);
    };

    const handleEnterpriseSubmit = (enterpriseData: any) => {
        const finalData = { ...formData, ...enterpriseData };
        console.log("Enterprise Request Submit Button Clicked");
        console.log("Final Enterprise Request Data:", finalData);
        // setStep("success");
        // setShowSuccess(true);
    };

    const renderStep = () => {
        switch (step) {
            case "details":
                return <SignupForm onNext={handleNext} />;
            case "verification":
                return (
                    <VerificationForm
                        email={formData.email || "lawal@tape.com"}
                        onNext={handleNext}
                        onResend={() => console.log("Resend Code Clicked")}
                    />
                );
            case "password":
                return <SetPasswordForm onNext={handleNext} />;
            case "plans":
                return (
                    <div className="w-screen h-screen fixed inset-0 bg-navbarBg z-100 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <PlanSelection
                            onSelect={handlePlanSelect}
                            onContactUs={() => setStep("enterprise")}
                        />
                    </div>
                );
            case "enterprise":
                return (
                    <div className="w-screen h-screen fixed inset-0 bg-navbarBg z-110 overflow-y-auto animate-in fade-in slide-in-from-right-4 duration-500">
                        <CustomEnterpriseForm
                            onClose={() => setStep("plans")}
                            onSubmit={handleEnterpriseSubmit}
                        />
                    </div>
                );
            case "success":
                return (
                    <div className="text-center space-y-8 animate-in fade-in zoom-in duration-700">
                        <div className="flex justify-center">
                            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center shadow-xl shadow-green-100/50">
                                <CheckCircle2 size={56} className="text-bgGreen" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-4xl font-bold text-Heading">All Set!</h2>
                            <p className="text-gray-500 text-lg">Your account has been created successfully.</p>
                        </div>
                        <div className="pt-4">
                            <button
                                className="w-full h-[52px] bg-bgBlue text-white rounded-2xl font-bold text-lg hover:opacity-90 transition-all shadow-xl shadow-bgBlue/20 active:scale-95"
                                onClick={() => window.location.href = "/"}
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                );
            default:
                return <SignupForm onNext={handleNext} />;
        }
    };

    // Steps that use the split AuthLayout
    const useLayout = ["details", "verification", "password", "success"].includes(step);

    if (!useLayout) return renderStep();

    return (
        <AuthLayout>
            {renderStep()}
        </AuthLayout>
    );
};

export default SignUpPage;
