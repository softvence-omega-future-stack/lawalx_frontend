"use client";

import { useState } from "react";
import { Mail, ArrowLeft, LogIn } from "lucide-react";
import EmailStep from "./EmailStep";
import PasswordStep from "./PasswordStep";
import CodeStep from "./CodeStep";

export default function SignInPage() {
  const [step, setStep] = useState<"email" | "password" | "code">("email");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {step !== "email" && (
          <button
            onClick={() => setStep("email")}
            className="flex items-center gap-2 text-gray-500 mb-4 hover:text-gray-700"
          >
            <ArrowLeft size={18} /> Back
          </button>
        )}

        {step === "email" && (
          <EmailStep email={email} setEmail={setEmail} setStep={setStep} />
        )}

        {step === "password" && (
          <PasswordStep email={email} setStep={setStep} />
        )}

        {step === "code" && <CodeStep email={email} />}
      </div>
    </div>
  );
}
