// "use client";

// import Image from "next/image";
// import React from "react";
// import { cn } from "@/lib/utils"; // optional helper if you're using shadcn; otherwise remove it.

// interface ActionCardButtonProps {
//   title: string;
//   subtitle?: string;
//   icon?: React.ReactNode;
//   onClick?: () => void;
//   backgroundImage?: string; // dynamic background
//   className?: string;
// }

// const ActionCardButton: React.FC<ActionCardButtonProps> = ({
//   title,
//   subtitle,
//   icon,
//   onClick,
//   backgroundImage = "/common/btnBg.png", // default bg image
//   className,
// }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={cn(
//         "relative overflow-hidden bg-gray-800 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-5 text-left p-4 md:p-6 w-full transition-transform duration-300 hover:scale-[1.02] shadow-sm",
//         "text-white",
//         className
//       )}
//     >
//       {/* Background image */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src={backgroundImage}
//           alt="Button Background"
//           fill
//           className="object-cover"
//           sizes="100vw"
//           priority
//         />
//         {/* <div className="absolute inset-0 bg-black/20" /> subtle overlay */}
//       </div>

//       {/* Icon (optional) */}
//       {icon && (
//         <div className="bg-white/15 p-3 rounded-xl flex items-center justify-center backdrop-blur-sm">
//           {icon}
//         </div>
//       )}

//       {/* Text */}
//       <div className="flex flex-col">
//         <span className="font-semibold text-base md:text-lg">{title}</span>
//         {subtitle && (
//           <span className="text-sm text-white/80 mt-0.5">{subtitle}</span>
//         )}
//       </div>
//     </button>
//   );
// };

// export default ActionCardButton;


"use client";

import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils"; // remove if not using shadcn

interface ActionCardButtonProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  backgroundImage?: string;
  active?: boolean; // ✅ new prop
  className?: string;
}

const ActionCardButton: React.FC<ActionCardButtonProps> = ({
  title,
  subtitle,
  icon,
  onClick,
  backgroundImage = "/common/btnBg.png",
  active = false,
  className,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative overflow-hidden rounded-lg flex items-center gap-3 md:gap-5 text-left p-3 md:p-4 w-full transition-all duration-300 shadow-sm",
        active
          ? "text-white scale-[1.02] bg-gray-900 shadow-lg"
          : "bg-white text-gray-900 border border-gray-200",
        className
      )}
    >
      {/* Background image layer */}
      <div
        className={cn(
          "absolute inset-0 -z-10 transition-opacity duration-500",
          active ? "opacity-100" : "opacity-0 hover:opacity-100"
        )}
      >
        <Image
          src={backgroundImage}
          alt="Button Background"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>

      {/* Icon */}
      {icon && (
        <div
          className={cn(
            "p-3 rounded-xl flex items-center justify-center transition-all duration-300",
            active
              ? "bg-white/20 backdrop-blur-sm"
              : "bg-gray-100 hover:bg-white/15"
          )}
        >
          {icon}
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col">
        <span
          className={cn(
            "font-semibold transition-colors duration-300",
            active ? "text-white" : "text-gray-900"
          )}
        >
          {title}
        </span>
        {subtitle && (
          <span
            className={cn(
              "text-[.6rem] md:text-sm mt-0.5 transition-colors duration-300",
              active ? "text-white/80" : "text-gray-600"
            )}
          >
            {subtitle}
          </span>
        )}
      </div>
    </button>
  );
};

export default ActionCardButton;
