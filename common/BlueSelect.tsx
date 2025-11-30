"use client";

import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Option {
  label: string;
  value: string;
  icon?: ReactNode;
}

interface BlueSelectProps {
  label?: string;
  placeholder?: string;
  placeholderIcon?: ReactNode; // ⬅ NEW
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

const BlueSelect = ({
  label,
  placeholder = "Select an option",
  placeholderIcon,
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
}: BlueSelectProps) => {
  const hasError = Boolean(error);

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {/* Label */}
      {showLabel && label && (
        <Label className="text-sm font-medium" style={{ color: "#0FA6FF" }}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      {/* Select Component */}
      <Select onValueChange={onChange} value={value} disabled={disabled}>
        <SelectTrigger
          className={cn(
            "w-full rounded-lg md:rounded-[10px] px-4 py-2 md:py-3 flex items-center gap-2",
            "focus:ring-2 focus:ring-offset-1 focus:ring-bgBlue",
            "text-gray-700 bg-transparent",
            disabled && "cursor-not-allowed opacity-60"
          )}
          style={{
            borderColor: hasError ? "#EF4444" : "#0FA6FF",
          }}
        >
          {/* Placeholder with Icon */}
          {!value ? (
            <div className="flex items-center gap-2 text-black">
              {placeholderIcon && <span >{placeholderIcon}</span>}
              <span className="text-bgBlue text-sm md:text-base font-semibold">{placeholder}</span>
            </div>
          ) : (
            <SelectValue />
          )}
        </SelectTrigger>

        {/* Dropdown List */}
        <SelectContent>
          {options.map((opt, idx) => (
            <SelectItem key={idx} value={opt.value}>
              <div className="flex items-center gap-2 text-gray-700">
                {opt.icon && opt.icon}
                <span>{opt.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Description */}
      {showDescription && description && !hasError && (
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      )}

      {/* Error */}
      {showError && hasError && (
        <p className="text-sm text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default BlueSelect;






// "use client";

// import type { ReactNode } from "react";
// import { cn } from "../lib/utils";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// interface Option {
//   label: string;
//   value: string;
//   icon?: ReactNode;
// }

// interface BlueSelectProps {
//   label?: string;
//   placeholder?: string;
//   options: Option[];
//   value?: string;
//   onChange?: (value: string) => void;
//   description?: string;
//   error?: string;
//   disabled?: boolean;
//   required?: boolean;
//   showLabel?: boolean;
//   showDescription?: boolean;
//   showError?: boolean;
//   className?: string;
//   icon?: ReactNode;
// }

// const BlueSelect = ({
//   label,
//   placeholder = "Select an option",
//   options,
//   value,
//   onChange,
//   description,
//   error,
//   disabled = false,
//   required = false,
//   showLabel = true,
//   showDescription = true,
//   showError = true,
//   className = "",
//   icon,
// }: BlueSelectProps) => {
//   const hasError = Boolean(error);

//   return (
//     <div className={cn("flex flex-col gap-2 w-full", className)}>
//       {/* Label */}
//       {showLabel && label && (
//         <Label className="text-sm font-medium" style={{ color: "#0FA6FF" }}>
//           {label}
//           {required && <span className="text-red-500 ml-1">*</span>}
//         </Label>
//       )}

//       {/* Select */}
//       <Select onValueChange={onChange} value={value} disabled={disabled}>
//         <SelectTrigger
//           className={cn(
//             "w-full rounded-lg px-4 py-2 md:py-3 flex items-center gap-2 bg-transparent",
//             "focus:ring-2 focus:ring-offset-1 focus:ring-bgBlue",
//             "text-gray-700",
//             disabled && "cursor-not-allowed opacity-60"
//           )}
//           style={{
//             borderColor: hasError ? "#EF4444" : "#0FA6FF",
//           }}
//         >
//           {icon && !value && <span className="text-gray-500">{icon}</span>}
//           <SelectValue placeholder={placeholder} />
//         </SelectTrigger>

//         <SelectContent>
//           {options.map((opt, idx) => (
//             <SelectItem key={idx} value={opt.value}>
//               <div className="flex items-center gap-2 text-gray-700">
//                 {opt.icon && opt.icon}
//                 <span>{opt.label}</span>
//               </div>
//             </SelectItem>
//           ))}
//         </SelectContent>
//       </Select>

//       {/* Description */}
//       {showDescription && description && !hasError && (
//         <p className="text-sm text-gray-500 mt-1">{description}</p>
//       )}

//       {/* Error */}
//       {showError && hasError && (
//         <p className="text-sm text-red-500 mt-1">{error}</p>
//       )}
//     </div>
//   );
// };

// export default BlueSelect;
