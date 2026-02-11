"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AuthInput from "./AuthInput";
import { HelpCircle, CheckCircle2, Loader2, Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/api/users/authApi";
import { toast } from "sonner";

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  confirmPassword: z.string().min(8, "Confirm password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

const ResetPasswordForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [strength, setStrength] = useState(0);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch("password", "");

  React.useEffect(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (password.length >= 12) score++;
    setStrength(Math.min(score, 4));
  }, [password]);

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Reset link is invalid or incomplete. Please check your email.");
      return;
    }

    try {
      const res = await resetPassword({ password: data.password, token }).unwrap();
      if (res.success) {
        setIsSuccess(true);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to reset password. Please try again.");
      // For development/demo purposes if API fails but we want to show success
      // setIsSuccess(true);
    }
  };

  const getStrengthText = () => {
    if (strength === 0) return "Too Short";
    if (strength <= 2) return "Weak";
    if (strength === 3) return "Strong";
    return "Very Strong";
  };

  const getStrengthColor = (index: number) => {
    if (index < strength) {
      return "bg-[#22C55E]";
    }
    return "bg-[#E5E7EB]";
  };

  if (isSuccess) {
    return (
      <div className="w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Icon matching uploaded_media_1 */}
          <div className="w-24 h-24 bg-[#E6F9F0] rounded-full flex items-center justify-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Check className="w-8 h-8 text-[#22C55E]" />
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-headings">Password Reset Successfully</h1>
            <p className="text-body max-w-sm mx-auto">
              Your password has been reset successfully
            </p>
          </div>

          <button
            onClick={() => router.push("/signin")}
            className="w-full h-12 bg-bgBlue text-white rounded-xl font-medium hover:bg-[#0EA5E9] transition-colors shadow-customShadow cursor-pointer"
          >
            Move to Signin Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
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
            disabled={isLoading}
          />

          {/* Strength Indicator */}
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
          disabled={isLoading}
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-bgBlue text-white rounded-xl font-medium hover:bg-[#0EA5E9] transition-colors shadow-customShadow cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "Confirm"}
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
