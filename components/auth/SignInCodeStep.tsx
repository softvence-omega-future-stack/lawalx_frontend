"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AuthInput from "./AuthInput";
import Link from "next/link";
import Image from "next/image";

const codeSchema = z.object({
    code: z.string().min(4, "Code is required"),
});

type CodeFormData = z.infer<typeof codeSchema>;

interface SignInCodeStepProps {
    email: string;
    onLogin: (data: CodeFormData) => void;
    onResend: () => void;
}

const SignInCodeStep: React.FC<SignInCodeStepProps> = ({ email, onLogin, onResend }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CodeFormData>({
        resolver: zodResolver(codeSchema),
    });

    const onSubmit = (data: CodeFormData) => {
        console.log("Code login:", data);
        onLogin(data);
    };

    return (
        <div className="w-full space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-headings">Login Code</h1>
                <p className="text-body">
                    We sent a temporary login code to <br />
                    <span className="text-headings font-medium">{email || "l***l@gmail.com"}</span>. Please check your inbox.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <AuthInput
                    label="Login Code"
                    placeholder="Enter code"
                    required
                    {...register("code")}
                    error={errors.code?.message}
                />

                <button
                    type="submit"
                    className="w-full h-12 bg-bgBlue text-white rounded-xl font-medium hover:bg-[#0EA5E9] transition-colors shadow-customShadow cursor-pointer"
                >
                    Sign In
                </button>

                <div className="text-center">
                    <button
                        type="button"
                        onClick={onResend}
                        className="text-bgBlue font-bold hover:underline cursor-pointer"
                    >
                        Resend code
                    </button>
                </div>

                <div className="h-px bg-gray-200 my-4" />

                <button
                    type="button"
                    className="w-full h-12 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors shadow-customShadow cursor-pointer"
                >
                    <Image
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        width={20}
                        height={20}
                    />
                    Continue with Google
                </button>
            </form>

            <p className="text-center text-muted">
                Don&apos;t have an Account?{" "}
                <Link href="/signup" className="text-bgBlue font-medium hover:underline cursor-pointer">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default SignInCodeStep;
