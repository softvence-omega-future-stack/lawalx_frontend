"use client";

import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface ContentButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  icon?: LucideIcon; // optional icon
}

const ContentButton = ({ title, icon: Icon, ...rest }: ContentButtonProps) => {
  return (
    <button
      {...rest} // <-- now onclick, disabled, type, etc. all work
      className={`border-2 border-[rgba(255,255,255,0.12)] flex items-center gap-2 text-sm md:text-base w-full py-2 md:py-3 px-4 md:px-6 text-white rounded-xl transition-all duration-300 hover:scale-[1.03] hover:opacity-90 cursor-pointer ${rest.className ?? ""}`}
      style={{
        background:
          "linear-gradient(44deg, rgba(255,255,255,0.12) 8.25%, rgba(255,255,255,0.00) 90.05%), var(--Primary-Action, #0FA6FF)",
        boxShadow:
          "0 1px 1px 0 rgba(42,42,42,0.08), 0 3px 4px -1px rgba(42,42,42,0.14), 0 -3px 3px 0 rgba(0,0,0,0.10) inset, 0 3px 3px 0 rgba(255,255,255,0.10) inset, 0 0 0 1px rgba(0,0,0,0.20) inset",
        ...rest.style,
      }}
    >
      {Icon && <Icon className="w-5 h-5" />}

      {title && (
        <span className="text-sm md:text-base font-semibold">{title}</span>
      )}
    </button>
  );
};

export default ContentButton;
