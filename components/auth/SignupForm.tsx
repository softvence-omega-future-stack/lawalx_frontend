"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AuthInput from "./AuthInput";
import Image from "next/image";
import Link from "next/link";
import { User, Mail } from "lucide-react";

const signupSchema = z.object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
});

type SignupFormData = z.infer<typeof signupSchema>;

interface SignupFormProps {
    onNext: (data: SignupFormData) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onNext }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const onSubmit = (data: SignupFormData) => {
        console.log("Step 1 Data:", data);
        onNext(data);
    };

    return (
        <div className="w-full space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-semibold text-headings">Create Account</h1>
                <p className="text-body">Let&apos;s Create account for enter into tape Website.</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <AuthInput
                    label="Full Name"
                    placeholder="Lawal"
                    required
                    icon={User}
                    {...register("fullName")}
                    error={errors.fullName?.message}
                />

                <AuthInput
                    label="Email"
                    placeholder="lawal@tape.com"
                    type="email"
                    required
                    icon={Mail}
                    {...register("email")}
                    error={errors.email?.message}
                />

                <button
                    type="submit"
                    className="w-full h-12 bg-bgBlue text-white rounded-xl font-medium hover:bg-[#0EA5E9] transition-colors shadow-customShadow mt-2 cursor-pointer"
                >
                    Sign Up
                </button>

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
                Already have an account?{" "}
                <Link href="/signin" className="text-bgBlue font-medium hover:underline cursor-pointer">
                    Sign In
                </Link>
            </p>
        </div>
    );
};

export default SignupForm;
