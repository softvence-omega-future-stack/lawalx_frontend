"use client";

import React, { useState } from "react";
import SignInEmailStep from "./SignInEmailStep";
import SignInPasswordStep from "./SignInPasswordStep";
import SignInCodeStep from "./SignInCodeStep";

type Step = "EMAIL" | "PASSWORD" | "CODE";

const SignInForm = () => {
    const [step, setStep] = useState<Step>("EMAIL");
    const [email, setEmail] = useState("");

    const handleEmailSubmit = (emailData: string) => {
        setEmail(emailData);
        setStep("PASSWORD");
    };

    const handleLogin = (data: any) => {
        console.log("Logging in with:", data);
        // Execute login logic here
        // router.push('/dashboard');
    };

    const steps = {
        EMAIL: <SignInEmailStep onNext={handleEmailSubmit} />,
        PASSWORD: (
            <SignInPasswordStep
                email={email}
                onLogin={handleLogin}
                onSwitchToCode={() => setStep("CODE")}
            />
        ),
        CODE: (
            <SignInCodeStep
                email={email}
                onLogin={handleLogin}
                onResend={() => console.log("Resend code")}
            />
        ),
    };

    return (
        <div className="w-full animate-in fade-in slide-in-from-right-4 duration-500">
            {steps[step]}
        </div>
    );
};

export default SignInForm;
