"use client";

import { useState } from "react";
import ResetEmailStep from "./ResetEmailStep";
import NewPasswordStep from "./NewPasswordStep";
import Image from "next/image";

type Step = "EMAIL" | "NEW_PASSWORD";

const ResetPasswordForm = () => {
  const [step, setStep] = useState<Step>("EMAIL");
  const [email, setEmail] = useState("");

  const handleEmailSubmit = (emailData: string) => {
    setEmail(emailData);
    setStep("NEW_PASSWORD");
  };

  const handleReset = (data: any) => {
    console.log("Resetting password:", data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-4 md:p-12 rounded-2xl border border-border">
        <div className="flex justify-center mb-6">
          <Image
            src="/tape.svg"
            alt="Tape logo"
            width={100}
            height={34}
            className="h-9 w-auto"
          />
        </div>

        {step === "EMAIL" ? (
          <ResetEmailStep onNext={handleEmailSubmit} />
        ) : (
          <NewPasswordStep email={email} onReset={handleReset} />
        )}
      </div>
    </div>
  );
};

export default ResetPasswordForm;
