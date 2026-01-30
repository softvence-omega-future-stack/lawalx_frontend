"use client";

import React, { useState } from "react";
import { LucideIcon, Eye, EyeOff } from "lucide-react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: LucideIcon;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
    ({ label, error, icon: Icon, className, type, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);

        const isPassword = type === "password";
        const inputType = isPassword ? (showPassword ? "text" : "password") : type;

        return (
            <div className="w-full space-y-2">
                {label && (
                    <label className="text-sm font-medium text-headings">
                        {label} {props.required && <span className="text-red-500">*</span>}
                    </label>
                )}
                <div className="relative group">
                    <input
                        ref={ref}
                        type={inputType}
                        className={`
              w-full h-[52px] px-4 py-2 border border-border rounded-xl outline-none transition-all duration-200 text-muted placeholder:text-muted bg-input
              ${error ? "border-red-500 bg-red-50" : "border-border bg-input focus:border-bgBlue focus:ring-4 focus:ring-bgBlue/10"}
              ${Icon || isPassword ? "pr-12" : ""}
              ${className}
            `}
                        {...props}
                    />
                    {isPassword ? (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-bgBlue transition-colors focus:outline-none"
                        >
                            {showPassword ? <EyeOff size={20} strokeWidth={1.5} /> : <Eye size={20} strokeWidth={1.5} />}
                        </button>
                    ) : Icon && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted group-focus-within:text-bgBlue">
                            <Icon size={20} strokeWidth={1.5} />
                        </div>
                    )}
                </div>
                {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            </div>
        );
    }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
