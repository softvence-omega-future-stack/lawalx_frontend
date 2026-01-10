"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AuthInput from "./AuthInput";
import { HelpCircle } from "lucide-react";

const passwordSchema = z.object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

interface SetPasswordFormProps {
    onNext: (data: PasswordFormData) => void;
}

const SetPasswordForm: React.FC<SetPasswordFormProps> = ({ onNext }) => {
    const [strength, setStrength] = useState(0);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
    });

    const password = watch("password", "");

    // Strength logic to match 4 segments
    React.useEffect(() => {
        let score = 0;
        if (password.length >= 6) score++;
        if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;
        if (password.length >= 12) score++;
        setStrength(Math.min(score, 4));
    }, [password]);

    const onSubmit = (data: PasswordFormData) => {
        console.log("Step 3 Data (Password):", data);
        // onNext(data);
        // Navigate to dashboard after successful validation
        router.push("/signin");
    };

    const getStrengthText = () => {
        if (strength === 0) return "Too Short";
        if (strength <= 2) return "Weak";
        if (strength === 3) return "Strong";
        return "Very Strong";
    };

    const getStrengthColor = (index: number) => {
        if (index < strength) {
            return "bg-[#22C55E]"; // Match green in mockup
        }
        return "bg-[#E5E7EB]";
    };

    return (
        <div className="w-full space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-headings">Set Password</h1>
                <p className="text-body">Create a password to login</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <AuthInput
                        label="Password"
                        placeholder="Create password"
                        type="password"
                        required
                        icon={HelpCircle}
                        {...register("password")}
                        error={errors.password?.message}
                    />

                    {/* Strength Indicator - 4 Segments as per Image 2 */}
                    <div className="space-y-2">
                        <div className="flex gap-2 h-1.5 w-full">
                            {[0, 1, 2, 3].map((i) => (
                                <div key={i} className={`flex-1 rounded-full ${getStrengthColor(i)}`} />
                            ))}
                        </div>
                        <p className="text-sm text-muted">
                            Password strength: <span className="font-medium">{getStrengthText()}</span>
                        </p>
                    </div>
                </div>

                <AuthInput
                    label="Confirm Password"
                    placeholder="Re-enter password"
                    type="password"
                    required
                    icon={HelpCircle}
                    {...register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                />
                <button
                    type="submit"
                    className="w-full h-12 bg-bgBlue text-white rounded-xl font-medium hover:bg-[#0EA5E9] transition-colors shadow-customShadow cursor-pointer"
                >
                    Confirm
                </button>


            </form>
        </div>
    );
};

export default SetPasswordForm;
