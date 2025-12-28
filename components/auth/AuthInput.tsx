"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface AuthInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: LucideIcon;
}

const AuthInput = React.forwardRef<HTMLInputElement, AuthInputProps>(
    ({ label, error, icon: Icon, className, ...props }, ref) => {
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
                        className={`
              w-full h-[52px] px-4 py-2 border border-border rounded-xl outline-none transition-all duration-200 text-muted placeholder:text-muted bg-input
              ${error ? "border-red-500 bg-red-50" : "border-border bg-input focus:border-bgBlue focus:ring-4 focus:ring-bgBlue/10"}
              ${Icon ? "pr-12" : ""}
              ${className}
            `}
                        {...props}
                    />
                    {Icon && (
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
