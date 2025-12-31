"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AuthInput from "./AuthInput";
import Link from "next/link";

const verificationSchema = z.object({
    code: z.string().min(4, "Code must be at least 4 characters"),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

interface VerificationFormProps {
    email: string;
    onNext: (data: VerificationFormData) => void;
    onResend: () => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ email, onNext, onResend }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerificationFormData>({
        resolver: zodResolver(verificationSchema),
    });

    const onSubmit = (data: VerificationFormData) => {
        console.log("Step 2 Data (Verification):", data);
        onNext(data);
    };

    return (
        <div className="w-full space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-headings">Verification Code</h1>
                <p className="text-body">
                    We sent a temporary login code to <br />
                    <span className="text-body font-medium">{email}</span>. Please check your inbox.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <AuthInput
                    label="Verification Code"
                    placeholder="Enter code"
                    required
                    {...register("code")}
                    error={errors.code?.message}
                />

                <button
                    type="submit"
                    className="w-full h-12 bg-bgBlue text-white rounded-xl font-medium hover:bg-[#0EA5E9] transition-colors shadow-customShadow cursor-pointer"
                >
                    Confirm
                </button>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={onResend}
                        className="text-bgBlue font-medium hover:underline cursor-pointer shadow-customShadow"
                    >
                        Resend code
                    </button>
                </div>
            </form>

            <p className="text-center text-muted mt-8">
                Already have an account?{" "}
                <Link href="/signin" className="text-bgBlue font-medium hover:underline">
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default VerificationForm;
