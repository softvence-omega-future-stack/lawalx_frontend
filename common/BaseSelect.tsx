"use client "

import type { ReactNode } from "react";
import { cn } from "../lib/utils";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";



interface Option {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface BaseSelectProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  description?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  showLabel?: boolean;
  showDescription?: boolean;
  showError?: boolean;
  className?: string;
}

const BaseSelect = ({
  label,
  placeholder = "Select an option",
  options,
  value,
  onChange,
  description,
  error,
  disabled = false,
  required = false,
  showLabel = true,
  showDescription = true,
  showError = true,
  className = "",
}: BaseSelectProps) => {
  const hasError = Boolean(error);

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {/* Label */}
      {showLabel && label && (
        <Label className="text-sm font-medium text-gray-800">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      {/* Select Wrapper */}
      <Select onValueChange={onChange} value={value} disabled={disabled}>
        <SelectTrigger
          className={cn(
            "w-full bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-offset-1 focus:ring-gray-200",
            hasError && "border-red-500 focus:ring-red-400",
            disabled && "cursor-not-allowed opacity-60"
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((opt, idx) => (
            <SelectItem key={idx} value={opt.value}>
              <div className="flex items-center gap-2">
                {opt.icon && opt.icon}
                <span>{opt.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Description */}
      {showDescription && description && !hasError && (
        <p className="text-xs text-gray-500 mt-1">{description}</p>
      )}

      {/* Error Message */}
      {showError && hasError && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default BaseSelect;
