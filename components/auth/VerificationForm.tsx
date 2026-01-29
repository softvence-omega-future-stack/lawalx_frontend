"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AuthInput from "./AuthInput";
import Link from "next/link";
import { useRegisterVerifyMutation, useRegisterInitiateMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";

const verificationSchema = z.object({
    code: z.string().min(4, "Code must be at least 4 characters"),
});

type VerificationFormData = z.infer<typeof verificationSchema>;

interface VerificationFormProps {
    email: string;
    fullName?: string;
    onNext: (data: VerificationFormData) => void;
    onResend?: () => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ email, fullName, onNext, onResend }) => {
    const [registerVerify, { isLoading }] = useRegisterVerifyMutation();
    const [registerInitiate, { isLoading: isResending }] = useRegisterInitiateMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerificationFormData>({
        resolver: zodResolver(verificationSchema),
    });

    const onSubmit = async (data: VerificationFormData) => {
        try {
            const res = await registerVerify({
                email,
                otp: data.code
            }).unwrap();

            if (res.success) {
                toast.success(res.message || "OTP verified successfully");
                onNext(data);
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Invalid or expired code. Please try again.");
        }
    };

    const handleResend = async () => {
        if (!email) return;
        try {
            const res = await registerInitiate({
                email,
                fullName: fullName || "User"
            }).unwrap();
            if (res.success) {
                toast.success(res.message || "Verification code resent to email");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || "Failed to resend code.");
        }
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
                    disabled={isLoading}
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-12 bg-bgBlue text-white rounded-xl font-medium hover:bg-[#0EA5E9] transition-colors shadow-customShadow cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? "Verifying..." : "Confirm"}
                </button>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={onResend || handleResend}
                        disabled={isResending}
                        className="text-bgBlue font-medium hover:underline cursor-pointer disabled:opacity-50"
                    >
                        {isResending ? "Resending..." : "Resend code"}
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
