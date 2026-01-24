"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AuthInput from "./AuthInput";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const passwordSchema = z.object({
    password: z.string().min(1, "Password is required"),
});

type PasswordFormData = z.infer<typeof passwordSchema>;

interface SignInPasswordStepProps {
    email: string;
    onLogin: (data: PasswordFormData) => void;
    onSwitchToCode: () => void;
}

const SignInPasswordStep: React.FC<SignInPasswordStepProps> = ({ email, onLogin, onSwitchToCode }) => {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
    });

    const onSubmit = (data: PasswordFormData) => {
        onLogin(data);
    };

    return (
        <div className="w-full space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-headings">Password</h1>
                <p className="text-body">Type your password to login</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="relative">
                    <AuthInput
                        label="Password"
                        placeholder="Type your password"
                        type={showPassword ? "text" : "password"}
                        required
                        {...register("password")}
                        error={errors.password?.message}
                        className="pr-12"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-[38px] text-muted hover:text-bgBlue transition-colors focus:outline-none"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>


                <button
                    type="submit"
                    className="w-full h-12 bg-bgBlue text-white rounded-xl font-medium hover:bg-[#0EA5E9] transition-colors shadow-customShadow cursor-pointer"
                >
                    Sign In
                </button>

                <button
                    type="button"
                    onClick={onSwitchToCode}
                    className="w-full h-12 bg-white border border-bgBlue text-bgBlue rounded-xl font-medium hover:bg-blue-50 transition-colors shadow-none cursor-pointer"
                >
                    Sign in with code
                </button>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="remember"
                            className="w-4 h-4 rounded border-gray-300 text-bgBlue focus:ring-bgBlue"
                        />
                        <label htmlFor="remember" className="text-sm text-headings cursor-pointer">
                            Remember for 30 days
                        </label>
                    </div>
                    <Link href="/reset-password" className="text-sm text-bgBlue font-medium hover:underline">
                        Forget Password
                    </Link>
                </div>

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

export default SignInPasswordStep;
